import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UssdMenu} from '../../../shared/models/menu';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../../../store/reducers/index';
import {UpdateMenu} from '../../../store/actions/menu.actions';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input() menu: UssdMenu;
  @Input() isDataReady = false;
  @Output() messageValue: EventEmitter<string> = new EventEmitter<string>();
  submit_data =  false;

  constructor(private store: Store<ApplicationState>) { }

  ngOnInit() {
  }

  setMessage(message) {
    this.messageValue.emit(message);
  }

  setSubmit(value) {
    this.store.dispatch(new UpdateMenu({
      menu: {
        id: this.menu.id,
        changes: {
          submit_data: value
        }
      }
    }));
  }
}
