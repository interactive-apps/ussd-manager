import { Injectable } from "@angular/animations";
import { CanActivate, ActivatedRouteSnapshot } from "@angular/router";

import { Store } from "@ngrx/store";

import { Observable } from "rxjs/Observable";
import { tap, map, filter, take, switchMap, catchError } from "rxjs/operators";

import { of } from "rxjs/observable/of";
import { Go } from "../store/actions/router.action";
import { selectUssdLoaded } from "../store/selectors/ussd.selectors";
import { ApplicationState } from "../store/reducers/index";

@Injectable()
export class UssdExistsGuards implements CanActivate {
  constructor(private store: Store<ApplicationState>) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap((data) => {
        if (data) {
          return of(true);
        } else {
          this.store.dispatch(new Go({ path: [""] }));
          return of(false);
        }
      }),
      catchError(() => {
        this.store.dispatch(new Go({ path: [""] }));
        return of(false);
      })
    );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(selectUssdLoaded).pipe(take(1));
  }
}
