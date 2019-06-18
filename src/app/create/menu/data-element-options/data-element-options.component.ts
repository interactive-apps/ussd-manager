import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import { Store } from '@ngrx/store';
import { ApplicationState } from '../../../store/reducers/index';
import { UpdateMenu } from '../../../store/actions/menu.actions';
import {
  fadeIn,
  fadeOut,
  fadeSmooth,
  listStateTrigger
} from '../../../shared/animations/basic-animations';
import { UssdService } from '../../../shared/services/ussd.service';

@Component({
  selector: 'app-data-element-options',
  templateUrl: './data-element-options.component.html',
  styleUrls: ['./data-element-options.component.css'],
  animations: [fadeIn, fadeOut, listStateTrigger, fadeSmooth]
})
export class DataElementOptionsComponent implements OnInit {
  @Input() options: any[] = [];
  @Input() menu;
  @Input() menus;
  @Output() changeOptionStatus = new EventEmitter();
  searchOptionQuery: string = null;
  enableItemdragOperation = true;
  constructor(private store: Store<ApplicationState>) {}

  ngOnInit() {}

  getSelectedMenu(optionId) {
    let selected = '';
    if (this.menu && this.menu.options) {
      const matchOption = _.find(this.menu.options, optionObj => {
        return optionObj.id === optionId;
      });
      if (matchOption && matchOption.next_menu) {
        const menu = this.menus[matchOption.next_menu];
        selected = menu.title;
      }
    }
    return selected;
  }

  updateOptions(option) {
    this.changeOptionStatus.emit(option);
  }

  updateOptionNextMenu(nextMenuId, optionId) {
    this.options.forEach(option => {
      if (option.id === optionId) {
        option.next_menu = nextMenuId;
      }
    });
    const matchOption = _.find(this.options, optionObj => {
      return optionObj.id === optionId;
    });
    if (matchOption && matchOption.id) {
      this.updateOptions(matchOption);
    }
  }

  getMenuSelections(menus) {
    const menuSelections = [];
    menuSelections.push({ id: '', name: 'select next menu' });
    Object.keys(menus).map(menuId => {
      if (this.menu.id !== menuId) {
        const menuObject = menus[menuId];
        menuSelections.push({ id: menuId, name: menuObject.title });
      }
    });
    return menuSelections;
  }

  onDropSuccess() {
    let index = 0;
    this.options = this.options.map(option => {
      index += 1;
      return {
        ...option,
        response: index + ''
      };
    });
    this.updateMenu();
  }
  updateMenu() {
    this.store.dispatch(
      new UpdateMenu({
        menu: {
          id: this.menu.id,
          changes: {
            options: [...this.options]
          }
        }
      })
    );
  }

  trackItem(index, item) {
    return item ? item.id : index;
  }
}
