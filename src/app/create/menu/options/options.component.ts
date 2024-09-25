// import {
//   Component,
//   EventEmitter,
//   Input,
//   OnChanges,
//   OnInit,
//   Output,
// } from "@angular/core";
// import { UssdMenu } from "../../../shared/models/menu";
// import { Store } from "@ngrx/store";
// import { ApplicationState } from "../../../store/reducers/index";
// import { UpdateMenu } from "../../../store/actions/menu.actions";
// import {
//   fadeIn,
//   fadeOut,
//   fadeSmooth,
//   listStateTrigger
// } from '../../../shared/animations/basic-animations';
// import { Observable } from 'rxjs';
// import { UssdService } from '../../../shared/services/ussd.service';

// @Component({
//   selector: "app-options",
//   templateUrl: "./options.component.html",
//   styleUrls: ["./options.component.css"],
//   animations: [fadeIn, fadeOut, listStateTrigger, fadeSmooth],
// })
// export class OptionsComponent implements OnInit, OnChanges {
//   @Input() menu: UssdMenu;
//   @Input() menus: { [id: string]: UssdMenu };
//   @Input() nextmenus: string[];
//   @Output() nextMenuValue: EventEmitter<any> = new EventEmitter<any>();
//   @Output()
//   deletedMenuValue: EventEmitter<UssdMenu> = new EventEmitter<UssdMenu>();
//   options: any = [];
//   deleting: boolean[] = [];
//   enableItemdragOperation = true;
//   constructor(
//     private store: Store<ApplicationState>,
//     private ussdService: UssdService
//   ) {}

//   ngOnInit() {
//     this.setOptions();
//   }

//   setOptions() {
//     this.options = this.menu.options.slice();
//   }

//   activeItem(option) {
//     return this.nextmenus.indexOf(option.next_menu) !== -1;
//   }

//   ngOnChanges() {
//     this.setOptions();
//   }

//   setOptionValue(value, current_option) {
//     this.options = this.options.map((option) => {
//       const title =
//         current_option.response === option.response ? value : option.title;
//       return {
//         ...option,
//         title,
//       };
//     });
//     this.updateMenu();
//   }

//   setValue(key, value) {
//     this.store.dispatch(
//       new UpdateMenu({
//         menu: {
//           id: this.menu.id,
//           changes: {
//             [key]: value,
//           },
//         },
//       })
//     );
//   }

//   SetNextMenu(option = null) {
//     this.nextMenuValue.emit({
//       current_menu_id: this.menu.id,
//       next_menu_id: option.next_menu,
//       option,
//     });
//   }

//   trackItem(index, item) {
//     return item ? item.id : index;
//   }

//   onDropSuccess() {
//     let index = 0;
//     this.options = this.options.map((option) => {
//       index += 1;
//       return {
//         ...option,
//         response: index + "",
//       };
//     });
//     this.updateMenu();
//   }

//   updateMenu() {
//     this.store.dispatch(
//       new UpdateMenu({
//         menu: {
//           id: this.menu.id,
//           changes: {
//             options: [...this.options],
//           },
//         },
//       })
//     );
//   }

//   addOption() {
//     const index = this.options.length + 1;
//     const newOption = {
//       id: this.ussdService.makeid(),
//       title: "New Option",
//       response: index + "",
//       next_menu: "",
//     };
//     this.options.push(newOption);
//     this.updateMenu();
//   }

//   deleteOption(option) {
//     this.deleting = [];
//     this.options = this.options.filter((item) => {
//       return item.response !== option.response;
//     });
//     this.onDropSuccess();
//   }
// }
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from "@angular/core";
import { UssdMenu } from "../../../shared/models/menu";
import { Store } from "@ngrx/store";
import { ApplicationState } from "../../../store/reducers/index";
import { UpdateMenu } from "../../../store/actions/menu.actions";
import {
  fadeIn,
  fadeOut,
  fadeSmooth,
  listStateTrigger
} from '../../../shared/animations/basic-animations';
import { Observable } from 'rxjs';
import { UssdService } from '../../../shared/services/ussd.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: "app-options",
  templateUrl: "./options.component.html",
  styleUrls: ["./options.component.css"],
  animations: [fadeIn, fadeOut, listStateTrigger, fadeSmooth],
})
export class OptionsComponent implements OnInit, OnChanges {
  @Input() menu: UssdMenu;
  @Input() menus: { [id: string]: UssdMenu };
  @Input() nextmenus: string[];
  @Output() nextMenuValue: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  deletedMenuValue: EventEmitter<UssdMenu> = new EventEmitter<UssdMenu>();
  options: any = [];
  deleting: boolean[] = [];
  enableItemdragOperation = true;
  constructor(
    private store: Store<ApplicationState>,
    private ussdService: UssdService
  ) {}

  ngOnInit() {
    this.setOptions();
  }

  setOptions() {
    this.options = this.menu.options.slice();
  }

  activeItem(option) {
    return this.nextmenus.indexOf(option.next_menu) !== -1;
  }

  ngOnChanges() {
    this.setOptions();
  }

  setOptionValue(value, current_option) {
    this.options = this.options.map((option) => {
      const title =
        current_option.response === option.response ? value : option.title;
      return {
        ...option,
        title,
      };
    });
    this.updateMenu();
  }

  setValue(key, value) {
    this.store.dispatch(
      new UpdateMenu({
        menu: {
          id: this.menu.id,
          changes: {
            [key]: value,
          },
        },
      })
    );
  }

  SetNextMenu(option = null) {
    this.nextMenuValue.emit({
      current_menu_id: this.menu.id,
      next_menu_id: option.next_menu,
      option,
    });
  }

  trackItem(index, item) {
    return item ? item.id : index;
  }

  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.options, event.previousIndex, event.currentIndex);
    this.updateMenu();
  }

  updateMenu() {
    this.store.dispatch(
      new UpdateMenu({
        menu: {
          id: this.menu.id,
          changes: {
            options: [...this.options],
          },
        },
      })
    );
  }

  addOption() {
    const index = this.options.length + 1;
    const newOption = {
      id: this.ussdService.makeid(),
      title: "New Option",
      response: index + "",
      next_menu: "",
    };
    this.options.push(newOption);
    this.updateMenu();
  }

  deleteOption(option) {
    this.deleting = [];
    this.options = this.options.filter((item) => {
      return item.response !== option.response;
    });
    this.updateMenu();
  }
}