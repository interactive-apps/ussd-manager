import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { of } from "rxjs";
import { USSDActionTypes } from "../actions/ussd.actions";
import { HttpClientService } from "../../shared/services/http-client.service";
import { UssdService } from "../../shared/services/ussd.service";

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
