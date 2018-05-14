import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UssdMenu } from '../../../shared/models/menu';
import { Store } from '@ngrx/store';
import { ApplicationState } from '../../../store/reducers/index';
import * as menuActions from '../../../store/actions/menu.actions';

@Component({
  selector: 'app-data-submission',
  templateUrl: './data-submission.component.html',
  styleUrls: ['./data-submission.component.css']
})
export class DataSubmissionComponent implements OnInit {
  @Input() menu: UssdMenu;
  @Input() isDataReady = false;
  @Output() nextMenu: EventEmitter<any> = new EventEmitter<any>();

  submit_data = false;
  constructor(private store: Store<ApplicationState>) {}

  ngOnInit() {}

  setNextMenu() {
    this.nextMenu.emit({
      current_menu_id: this.menu.id,
      next_menu_id: this.menu.next_menu,
      option: null
    });
  }

  setSubmit(value) {
    this.store.dispatch(
      new menuActions.UpdateMenu({
        menu: {
          id: this.menu.id,
          changes: {
            submit_data: value
          }
        }
      })
    );
  }
}
