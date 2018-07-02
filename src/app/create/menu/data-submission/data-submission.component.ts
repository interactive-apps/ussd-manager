import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UssdMenu } from '../../../shared/models/menu';
import { Store } from '@ngrx/store';
import { ApplicationState } from '../../../store/reducers/index';
import * as menuActions from '../../../store/actions/menu.actions';
import { UpdateMenu } from '../../../store/actions/menu.actions';
import { UssdService } from '../../../shared/services/ussd.service';

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
  options;
  constructor(
    private store: Store<ApplicationState>,
    private ussdService: UssdService
  ) {}

  ngOnInit() {
    if (this.menu) {
      const { submit_data } = this.menu;
      const { options } = this.menu;
      this.options =
        options && options.length > 0 ? options : this.getDefaultOptions();
      this.submit_data = submit_data;
    }
  }

  getDefaultOptions() {
    const options = [
      {
        id: this.ussdService.makeid(),
        title: 'Yes',
        response: 1
      },
      {
        id: this.ussdService.makeid(),
        title: 'No',
        response: 0
      }
    ];
    return options;
  }

  setNextMenu() {
    this.nextMenu.emit({
      current_menu_id: this.menu.id,
      next_menu_id: this.menu.next_menu,
      option: null
    });
  }

  setOptionValue(value, current_option) {
    this.options = this.options.map(option => {
      const title =
        current_option.response === option.response ? value : option.title;
      return {
        ...option,
        title
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

  setValueByKey(key, value) {
    this.store.dispatch(
      new menuActions.UpdateMenu({
        menu: {
          id: this.menu.id,
          changes: {
            [key]: value
          }
        }
      })
    );
  }

  setSubmit(value) {
    this.store.dispatch(
      new menuActions.UpdateMenu({
        menu: {
          id: this.menu.id,
          changes: {
            title: 'Data Submission',
            submit_data: value
          }
        }
      })
    );
  }
}
