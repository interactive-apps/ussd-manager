import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApplicationState } from '../store/reducers/index';
import { Observable } from 'rxjs';
import { Setting } from '../shared/models/settings';
import * as ussdSelectors from '../store/selectors/ussd.selectors';
import * as settingsActions from '../store/actions/settings.actions';
import { Go } from '../store/actions/router.action';
import { Ussd } from '../shared/models/ussd';
import { GetUssds, AddUssd } from '../store/actions/ussd.actions';
import {
  AddMenu,
  ClearMenus,
  SetNextMenus,
} from "../store/actions/menu.actions";
import {
  AddSetting,
  ClearSettings,
  SetSelectedSetting,
} from "../store/actions/settings.actions";
import { visibilityChanged } from "../shared/animations/basic-animations";
import { UssdService } from "../shared/services/ussd.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
  animations: [visibilityChanged],
})
export class HomeComponent implements OnInit {
  ussd_items$: Observable<Ussd[]>;
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;
  constructor(
    private store: Store<ApplicationState>,
    private ussdService: UssdService
  ) {
    this.store.dispatch(new GetUssds());
    this.ussd_items$ = store.select(ussdSelectors.selectAllUssds);
    this.loading$ = store.select(ussdSelectors.selectUssdLoading);
    this.loaded$ = store.select(ussdSelectors.selectUssdLoaded);
  }

  ngOnInit() {}

  create() {
    const id = this.ussdService.makeid();
    const data = this.ussdService.getEmptyUssdConfiguration(id);
    const ussd: Ussd = {
      id: id,
      settings: data.settings,
      menus: data.menus,
    };
    this.store.dispatch(new AddUssd({ ussd }));
    this.editMenu(ussd);
  }

  editMenu(item) {
    this.store.dispatch(new ClearMenus());
    this.store.dispatch(new ClearSettings());
    setTimeout(() => {
      this.store.dispatch(
        new AddSetting({ setting: { ...item.settings, id: item.id } })
      );
      this.store.dispatch(new SetSelectedSetting({ id: item.id }));
      Object.keys(item.menus).forEach((key) => {
        const menu = {
          ...item.menus[key],
          options: item.menus[key].hasOwnProperty("options")
            ? item.menus[key].options
            : [],
          next_menu: item.menus[key].hasOwnProperty("next_menu")
            ? item.menus[key].next_menu
            : "",
        };
        this.store.dispatch(new AddMenu({ menu }));
      });
      if (item.settings.starting_menu !== "") {
        this.store.dispatch(new SetNextMenus([item.settings.starting_menu]));
      }
      this.store.dispatch(new Go({ path: ["create"] }));
    });
  }

  simulate(item) {
    this.store.dispatch(new ClearMenus());
    this.store.dispatch(new ClearSettings());
    setTimeout(() => {
      this.store.dispatch(
        new AddSetting({ setting: { ...item.settings, id: item.id } })
      );
      this.store.dispatch(new SetSelectedSetting({ id: item.id }));
      Object.keys(item.menus).forEach((key) => {
        const menu = {
          ...item.menus[key],
          options: item.menus[key].hasOwnProperty("options")
            ? item.menus[key].options
            : [],
          next_menu: item.menus[key].hasOwnProperty("next_menu")
            ? item.menus[key].next_menu
            : "",
        };
        this.store.dispatch(new AddMenu({ menu }));
      });
      if (item.settings.starting_menu !== "") {
        this.store.dispatch(new SetNextMenus([item.settings.starting_menu]));
      }
    });
    console.log("item:", item.settings.dataStoreKey);
    this.store.dispatch(
      new Go({ path: ["simulate", item.settings.dataStoreKey] })
    );
  }
}
