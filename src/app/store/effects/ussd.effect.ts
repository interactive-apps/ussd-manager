// import {Injectable} from '@angular/core';
// import { createEffect, Actions ,ofType} from '@ngrx/effects';
// import {catchError, map, switchMap, tap} from 'rxjs/operators';
// import {of} from 'rxjs/observable/of';
// import {USSDActionTypes} from '../actions/ussd.actions';
// import {HttpClientService} from '../../shared/services/http-client.service';
// import {UssdService} from '../../shared/services/ussd.service';

// @Injectable()
// export class UssdEffect {
//   constructor(private actions$: Actions, private ussdService: UssdService) {}

//   @Effect({dispatch: false})
//   loadGroups$ = createEffect(() => this.actions$.pipe(
//     ofType(USSDActionTypes.GET_USSDS),
//     tap(() => {
//       this.ussdService.getAllUssds();
//       this.ussdService.getMetaData();
//     })
//   ), { dispatch: false });
// }
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects'; // Import createEffect and ofType
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs'; // Import from 'rxjs' instead of 'rxjs/observable/of'
import { USSDActionTypes } from '../actions/ussd.actions';
import { HttpClientService } from '../../shared/services/http-client.service';
import { UssdService } from '../../shared/services/ussd.service';

@Injectable()
export class UssdEffect {
  constructor(private actions$: Actions, private ussdService: UssdService) {}

  loadGroups$ = createEffect(() => this.actions$.pipe(
    ofType(USSDActionTypes.GET_USSDS),
    tap(() => {
      this.ussdService.getAllUssds();
      this.ussdService.getMetaData();
    })
  ), { dispatch: false });
}
