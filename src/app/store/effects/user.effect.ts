import {Injectable} from '@angular/core';
import { createEffect, Actions } from '@ngrx/effects';
import {LOAD_USER, LoadUserFailure, LoadUserSuccess} from '../actions/user.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable()
export class UserEffect {
  constructor(private actions$: Actions) { }

  // @Effect()
  // loadUser$ = this.actions$.ofType(LOAD_USER).pipe(
  //   switchMap( () => {
  //     return this.dataService.getUserInformation().pipe(
  //       map( (user) => new LoadUserSuccess(user)),
  //       catchError(error => of(new LoadUserFailure(error)))
  //     );
  //   })
  // );
}
