import { Injectable } from "@angular/animations";
import { Effect, Actions } from "@ngrx/effects";
import {
  LOAD_USER,
  LoadUserFailure,
  LoadUserSuccess,
} from "../actions/user.actions";
import { catchError, map, switchMap } from "rxjs/operators";
import { of } from "rxjs/observable/of";

@Injectable()
export class UserEffect {
  constructor(private actions$: Actions) {}

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
