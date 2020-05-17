import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { ApplicationState } from "../store/reducers/index";
import { Observable } from "rxjs";
import { Setting } from "../shared/models/settings";
import * as ussdSelectors from "../store/selectors/ussd.selectors";
import * as settingsActions from "../store/actions/settings.actions";
import { Go } from "../store/actions/router.action";
import { Ussd } from "../shared/models/ussd";
import { GetUssds, AddUssd } from "../store/actions/ussd.actions";
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
import * as go from "gojs";

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
  public model: go.TreeModel = new go.TreeModel([
    { key: 1, name: "Afya", title: "Afya Menu" },
    { key: 2, name: "Referal", title: "Referal Menu" },
    { key: 3, name: "Test eIDSR Menu (Afya)", title: "eIDSR Afya", parent: 1 },
    { key: 4, name: "Test eIDSR Menu (Referal)", title: "eIDSR Referal", parent: 2 },
    { key: 5, name: "Simulation Server", title: "Server", parent: 4 },
    { key: 6, name: "Phone Number to use", title: "Server", parent: 4 },
    { key: 7, name: "Simulation Server", title: "Server", parent: 3 },
    { key: 8, name: "Phone Number to use", title: "Server", parent: 3 },
    { key: 9, name: "Create Menu", title: "Add Menu" },
    { key: 10, name: "Menu Configurations", title: "Configurations", parent: 9 },
    { key: 11, name: "Menu Options", title: "Options", parent: 10 },
    { key: 12, name: "Authentication Menu", title: "Authentication", parent: 10 },
    { key: 13, name: "Menu for Period", title: "Period", parent: 10 },
    { key: 14, name: "Menu for collection", title: "Collection", parent: 10 },
    { key: 15, name: "Menu for data submission", title: "Data Submission", parent: 10 },
    { key: 16, name: "Show Message", title: "Message", parent: 10 },

  ]);
}
