import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Setting } from "../../shared/models/settings";
import { Store } from "@ngrx/store";
import { ApplicationState, getRouterState } from "../../store/reducers/index";
import * as settingsActions from "../../store/actions/settings.actions";
import { UssdMenu } from "../../shared/models/menu";
import { ClearMenus } from "../../store/actions/menu.actions";
import { ClearSettings } from "../../store/actions/settings.actions";
import { Go } from "../../store/actions/router.action";
import { Ussd } from "../../shared/models/ussd";
import { HttpClientService } from "../../shared/services/http-client.service";
import { UpdateUssd, UpsertUssd } from "../../store/actions/ussd.actions";
import { fadeIn } from "../../shared/animations/basic-animations";
import * as _ from "lodash";

@Component({
  selector: "app-basic",
  templateUrl: "./basic.component.html",
  styleUrls: ["./basic.component.css"],
  animations: [fadeIn],
})
export class BasicComponent implements OnInit {
  @Input() setting: Setting;
  @Input() menus: { [id: string]: UssdMenu };
  saving = false;
  saving_success = false;
  saving_failed = false;
  editting_is_on: false;
  constructor(
    private store: Store<ApplicationState>,
    private http: HttpClientService
  ) {}

  ngOnInit() {}

  setValue(key, event) {
    this.store.dispatch(
      new settingsActions.UpdateSetting({
        setting: {
          id: this.setting.id,
          changes: { [key]: event.target.value },
        },
      })
    );
  }

  setTypeValue(key, event) {
    const request_type = {
      ...this.setting.request_type,
      [key]: event.target.value,
    };
    this.store.dispatch(
      new settingsActions.UpdateSetting({
        setting: { id: this.setting.id, changes: { request_type } },
      })
    );
  }

  handlingSuccessSaving(ussdItem: Ussd) {
    this.saving = false;
    this.saving_success = true;
    setTimeout(() => {
      this.saving_success = false;
    }, 3000);
    setTimeout(() => {
      this.store.dispatch(new Go({ path: [""] }));
    }, 2000);
    this.store.dispatch(
      new UpdateUssd({
        ussd: {
          id: ussdItem.id,
          changes: { ...ussdItem },
        },
      })
    );
  }

  hadlingFailSaving() {
    this.saving_success = false;
    this.saving = false;
    this.saving_failed = true;
    setTimeout(() => {
      this.saving_failed = false;
    }, 2000);
  }

  save() {
    this.saving = true;
    const ussdItem: Ussd = {
      id: this.setting.id,
      settings: { ...this.setting },
      menus: { ...this.menus },
    };
    let { dataStoreKey } = ussdItem.settings;
    if (ussdItem.settings.dataStoreKey === "") {
      dataStoreKey = _.camelCase(ussdItem.settings.name);
      ussdItem.settings.dataStoreKey = dataStoreKey;
    }
    this.http.put(`dataStore/ussd/${dataStoreKey}`, ussdItem).subscribe(
      (data) => {
        this.handlingSuccessSaving(ussdItem);
      },
      (errorResponse) => {
        const { error } = errorResponse;
        if (error && error.httpStatusCode && error.httpStatusCode === 404) {
          this.http.post(`dataStore/ussd/${dataStoreKey}`, ussdItem).subscribe(
            (data) => {
              this.handlingSuccessSaving(ussdItem);
            },
            (errorResponsePosting) => {
              this.hadlingFailSaving();
            }
          );
        } else {
          this.hadlingFailSaving();
        }
      }
    );
  }
  cancel() {
    this.store.dispatch(new Go({ path: [""] }));
  }
}
