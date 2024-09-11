import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { UssdMenu } from "../../../shared/models/menu";
import { Store } from "@ngrx/store";
import { ApplicationState } from "../../../store/reducers/index";
import * as menuActions from "../../../store/actions/menu.actions";

const PERIOD_TYPE: Array<any> = [
  { value: "Weekly", name: "Weekly", shown: true, possible: "0 to 52" },
  { value: "Monthly", name: "Monthly", shown: true, possible: "1 to 12" },
  { value: "BiMonthly", name: "BiMonthly", shown: true, possible: "1 to 6" },
  { value: "Quarterly", name: "Quarterly", shown: true, possible: "1 to 4" },
];

@Component({
  selector: "app-period",
  templateUrl: "./period.component.html",
  styleUrls: ["./period.component.css"],
})
export class PeriodComponent implements OnInit {
  @Input() menu: UssdMenu;
  @Input() menus: any;
  @Input() isDataReady = false;
  @Output() nextMenu: EventEmitter<any> = new EventEmitter<any>();
  periods = PERIOD_TYPE;
  collection_method = "Period Number";
  limits = {
    Weekly: "0 to 52",
    Monthly: "1 to 12",
    BiMonthly: "1 to 6",
    Quarterly: "1 to 4",
  };
  maximums = {
    Weekly: 52,
    Monthly: 12,
    BiMonthly: 6,
    Quarterly: 4,
  };
  submit_data = false;
  constructor(private store: Store<ApplicationState>) {}

  ngOnInit() {
    if (this.menu.use_for_year) {
      this.collection_method = "Year";
    }
    const { submit_data } = this.menu;
    this.submit_data = submit_data;
  }

  setPeriodType(period: string) {
    this.store.dispatch(
      new menuActions.UpdateMenu({
        menu: {
          id: this.menu.id,
          changes: {
            period_type: period,
            maximum_value: this.maximums[period],
          },
        },
      })
    );
  }

  setValueByKey(key, value) {
    this.store.dispatch(
      new menuActions.UpdateMenu({
        menu: {
          id: this.menu.id,
          changes: {
            [key]: value,
          },
        },
      })
    );
  }

  onSetCollectionType(event) {
    this.collection_method = event.target.value;
    this.store.dispatch(
      new menuActions.UpdateMenu({
        menu: {
          id: this.menu.id,
          changes: {
            use_for_year: event.target.value === "Year",
          },
        },
      })
    );
  }

  setNextMenu() {
    this.nextMenu.emit({
      current_menu_id: this.menu.id,
      next_menu_id: this.menu.next_menu,
      option: null,
    });
  }

  setSubmit(value) {
    this.store.dispatch(
      new menuActions.UpdateMenu({
        menu: {
          id: this.menu.id,
          changes: {
            submit_data: value,
          },
        },
      })
    );
  }

  trackItem(index, item) {
    return item ? item.id : index;
  }
}
