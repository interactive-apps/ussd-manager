import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/animations";
import { UssdMenu } from "../../../shared/models/menu";
import { Store } from "@ngrx/store";
import { ApplicationState } from "../../../store/reducers/index";
import * as menuActions from "../../../store/actions/menu.actions";

@Component({
  selector: "app-authentication",
  templateUrl: "./authentication.component.html",
  styleUrls: ["./authentication.component.css"],
})
export class AuthenticationComponent implements OnInit {
  @Input() menu: UssdMenu;
  @Output() nextMenu: EventEmitter<any> = new EventEmitter<any>();
  constructor(private store: Store<ApplicationState>) {}

  ngOnInit() {}

  setNextMenu() {
    this.nextMenu.emit({
      current_menu_id: this.menu.id,
      next_menu_id: this.menu.next_menu,
      option: null,
    });
  }

  setAuthValue(key, value) {
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
}
