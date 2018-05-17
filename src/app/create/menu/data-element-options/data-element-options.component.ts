import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UssdMenu } from '../../../shared/models/menu';
import * as _ from 'lodash';

@Component({
  selector: 'app-data-element-options',
  templateUrl: './data-element-options.component.html',
  styleUrls: ['./data-element-options.component.css']
})
export class DataElementOptionsComponent implements OnInit {
  @Input() options;
  @Input() menu;
  @Input() menus;
  @Output() changeOptionStatus = new EventEmitter();
  searchOptionQuery: string = null;

  constructor() {}

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

  trackItem(index, item) {
    return item ? item.id : undefined;
  }
}
