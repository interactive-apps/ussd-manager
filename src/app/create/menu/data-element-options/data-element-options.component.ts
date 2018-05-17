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
  @Output() changeOptionStatus = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  updateOptions(option) {
    this.changeOptionStatus.emit(option);
  }

  updateOptionNextMenu(nextMenuId, optionId) {
    console.log(nextMenuId, optionId);
  }

  trackItem(index, item) {
    return item ? item.id : undefined;
  }
}
