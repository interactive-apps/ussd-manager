import {Injectable} from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {USSDActionTypes} from '../actions/ussd.actions';
import {HttpClientService} from '../../shared/services/http-client.service';
import {UssdService} from '../../shared/services/ussd.service';

@Injectable()
export class UssdEffect {
  constructor (private actions$: Actions, private ussdService: UssdService) {}

  @Effect({dispatch: false})
  loadGroups$ = this.actions$.ofType(USSDActionTypes.GET_USSDS).pipe(
    tap( () => {
      this.ussdService.getAllUssds();
      this.ussdService.getMetaData();
    })
  );
}
