import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { ApplicationState } from "../store/reducers/index";
import { Observable } from "rxjs";
import { Setting } from "../shared/models/settings";
import * as settingSelectors from "../store/selectors/setting.selectors";
import * as menuSelectors from "../store/selectors/menu.selectors";
import * as dataSelectors from "../store/selectors/data.selectors";
import * as settingsActions from "../store/actions/settings.actions";
import * as menuActions from "../store/actions/menu.actions";
import { UssdService } from "../shared/services/ussd.service";
import { UssdMenu } from "../shared/models/menu";
import { Dictionary } from "@ngrx/entity/src/models";
import { listStateTrigger } from "../shared/animations/basic-animations";
import { DataSet } from "../shared/models/dataSet";
import { Program } from "../shared/models/program";
import { TrackedEntityType } from "../shared/models/trackedEntityType";

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.css"],
  animations: [listStateTrigger]
})
export class CreateComponent implements OnInit {
  settings$: Observable<Setting>;
  menus$: Observable<Dictionary<UssdMenu>>;
  selectedMenu$: Observable<UssdMenu>;
  startingMenu$: Observable<UssdMenu>;
  nextmenus$: Observable<string[]>;
  authAlreadySelected$: Observable<boolean>;
  is_data_ready$: Observable<boolean>;
  datasets$: Observable<DataSet[]>;
  datasetEntities$: Observable<any>;
  programs$: Observable<Program[]>;
  TrackedEntityTypes$: Observable<any>;
  programsEntities$: Observable<any>;
  selectedDatas$: Observable<string[]>;
  selectedId: string = null;
  constructor(
    private store: Store<ApplicationState>,
    private ussdService: UssdService
  ) {
    this.settings$ = store.select(settingSelectors.selectCurrentSetting);
    this.menus$ = store.select(menuSelectors.selectMenuEntities);
    this.selectedMenu$ = store.select(menuSelectors.selectCurrentMenu);
    this.startingMenu$ = store.select(menuSelectors.selectStartingMenu);
    this.nextmenus$ = store.select(menuSelectors.selectNextMenu);
    this.selectedDatas$ = store.select(menuSelectors.selectedDatas);
    this.authAlreadySelected$ = store.select(menuSelectors.isAuthAvailable);
    this.is_data_ready$ = store.select(menuSelectors.is_data_ready);
    this.is_data_ready$.subscribe(value => {
      // sconsole.log(value)
    });
    this.datasets$ = store.select(dataSelectors.getDataSets);
    this.programs$ = store.select(dataSelectors.getPrograms);
    this.programsEntities$ = store.select(dataSelectors.selectProgramEntities);
    this.datasetEntities$ = store.select(dataSelectors.selectDatasetEntities);
    this.TrackedEntityTypes$ = store.select(
      dataSelectors.selectTrackedEntityTypeEntities
    );

    store
      .select(settingSelectors.selectCurrentSettingId)
      .subscribe(id => (this.selectedId = id));
  }

  ngOnInit() {}

  addStartingMenu() {
    const createdId = this.ussdService.makeid();
    const newStartingMenu: UssdMenu = this.ussdService.getStartingMenu(
      createdId,
      this.selectedId
    );
    this.store.dispatch(new menuActions.AddMenu({ menu: newStartingMenu }));
    this.store.dispatch(
      new settingsActions.UpdateSetting({
        setting: { id: this.selectedId, changes: { starting_menu: createdId } }
      })
    );
  }

  setNextMenu(event) {
    const { current_menu_id, next_menu_id } = event;
  }

  trackItem(index, item) {
    return item ? item : index;
  }
}
