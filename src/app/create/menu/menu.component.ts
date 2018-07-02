import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UssdMenu } from '../../shared/models/menu';
import { Store } from '@ngrx/store';
import * as menuActions from '../../store/actions/menu.actions';
import { ApplicationState } from '../../store/reducers/index';
import {
  AddMenu,
  SetNextMenus,
  UpdateMenu
} from '../../store/actions/menu.actions';
import { fadeOut } from '../../shared/animations/basic-animations';
import { UssdService } from '../../shared/services/ussd.service';
import { DataSet } from '../../shared/models/dataSet';
import { Program } from '../../shared/models/program';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  animations: [fadeOut]
})
export class MenuComponent implements OnInit {
  @Input() menus: { [id: string]: UssdMenu };
  @Input() menu: UssdMenu = null;
  @Input() datasets: DataSet[] = [];
  @Input() datasetEntities: any = {};
  @Input() programs: Program[] = [];
  @Input() programEntities: any = {};
  @Input() next_menus: string[] = [];
  @Input() selectedDatas: string[] = [];
  @Input() authAvailable = false;
  @Input() isDataReady = false;
  @Output() nextMenuValue: EventEmitter<any> = new EventEmitter<any>();
  next_menu: UssdMenu = null;
  deleteEnabled = false;
  isPreviousMenuForDataConfirmation: boolean;

  constructor(
    private store: Store<ApplicationState>,
    private ussdService: UssdService
  ) {
    this.isPreviousMenuForDataConfirmation = false;
  }

  ngOnInit() {
    if (this.menu.hasOwnProperty('next_menu') && this.menu.next_menu !== '') {
      setTimeout(() => {
        this.addNextMenu(this.menu.id, this.menu.next_menu);
      });
    }
    const { previous_menu } = this.menu;
    if (previous_menu && this.menus[previous_menu]) {
      const { type } = this.menus[previous_menu];
      if (type && type === 'data-submission') {
        this.isPreviousMenuForDataConfirmation = true;
      }
    }
  }

  addNextMenu(current_menu_id, next_menu_id) {
    const currentNext = [...this.next_menus];
    const index = currentNext.indexOf(current_menu_id);
    if (index !== -1) {
      const arr = [...currentNext.slice(0, index + 1), next_menu_id];
      this.store.dispatch(new SetNextMenus(arr));
    }
  }

  setNextMenu(event) {
    const { current_menu_id, next_menu_id, option } = event;
    if (next_menu_id === '') {
      this.createNewMenu(option);
    } else {
      if (this.menus.hasOwnProperty(next_menu_id)) {
        this.addNextMenu(current_menu_id, next_menu_id);
      } else {
        this.createNewMenu(option);
      }
    }
  }

  createNewMenu(option = null) {
    const newMenu: UssdMenu = {
      id: this.ussdService.makeid(),
      title: 'New Menu',
      type: '',
      options: [],
      next_menu: '',
      data_id: '',
      previous_menu: this.menu.id
    };
    this.store.dispatch(new AddMenu({ menu: newMenu }));
    if (option) {
      const options = this.menu.options.map(item => {
        if (option.response === item.response) {
          return {
            ...item,
            next_menu: newMenu.id
          };
        }
        return { ...item };
      });
      this.store.dispatch(
        new menuActions.UpdateMenu({
          menu: {
            id: this.menu.id,
            changes: {
              options
            }
          }
        })
      );
    } else {
      this.store.dispatch(
        new menuActions.UpdateMenu({
          menu: {
            id: this.menu.id,
            changes: {
              next_menu: newMenu.id
            }
          }
        })
      );
    }
    setTimeout(() => {
      this.addNextMenu(this.menu.id, newMenu.id);
    });
  }

  setType(type: string) {
    this.store.dispatch(
      new menuActions.UpdateMenu({
        menu: { id: this.menu.id, changes: { type } }
      })
    );
    if (type === 'data-submission') {
      const title = 'You are about to submit data, are you sure?';
      this.store.dispatch(
        new menuActions.UpdateMenu({
          menu: {
            id: this.menu.id,
            changes: { title: title }
          }
        })
      );
    }
    if (type === 'period') {
      this.store.dispatch(
        new menuActions.UpdateMenu({
          menu: {
            id: this.menu.id,
            changes: { retry_message: '', fail_message: '' }
          }
        })
      );
    }
  }

  setMessage(message: string) {
    this.store.dispatch(
      new menuActions.UpdateMenu({
        menu: {
          id: this.menu.id,
          changes: {
            title: message
          }
        }
      })
    );
  }

  isMenuInitialized() {
    return this.menu.type !== '';
  }

  activateMenu(menu) {
    this.store.dispatch(new menuActions.SetSelectedMenu(menu.id));
  }

  showDelete() {
    return (
      !this.deleteEnabled &&
      this.menu.next_menu === '' &&
      ((this.menu.options && this.menu.options.length === 0) ||
        (this.menu.type === 'data' || this.menu.type === 'data-submission'))
    );
  }

  // Deleting menu means any menu or option attached to this menu has to be deleted too
  deleteMenu(menu, next = false) {
    const previousMenu = this.menus[menu.previous_menu];
    if (previousMenu && previousMenu.next_menu === menu.id) {
      this.store.dispatch(
        new menuActions.UpdateMenu({
          menu: {
            id: previousMenu.id,
            changes: {
              next_menu: ''
            }
          }
        })
      );
    }
    if (
      previousMenu &&
      previousMenu.options.map(option => option.next_menu).indexOf(menu.id) !==
        -1
    ) {
      const options = previousMenu.options.map(option => {
        if (option.next_menu === menu.id) {
          return {
            ...option,
            next_menu: ''
          };
        } else {
          return {
            ...option
          };
        }
      });
      this.store.dispatch(
        new UpdateMenu({
          menu: {
            id: previousMenu.id,
            changes: {
              options
            }
          }
        })
      );
    }
    this.store.dispatch(new menuActions.DeleteMenu({ id: menu.id }));
    this.store.dispatch(
      new SetNextMenus(
        this.next_menus.slice(0, this.next_menus.indexOf(menu.id))
      )
    );
  }
}
