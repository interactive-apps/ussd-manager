import {Action} from '@ngrx/store';
import {Update} from '@ngrx/entity';
import {Ussd} from '../../shared/models/ussd';

export enum USSDActionTypes {
  LOAD_USSDS = '[USSD] Load Ussds',
  ADD_USSD = '[USSD] Add Ussd',
  UPSERT_USSD = '[USSD] Upsert Ussd',
  ADD_USSDS = '[USSD] Add Ussds',
  UPSERT_USSDS = '[USSD] Upsert Ussds',
  UPDATE_USSD = '[USSD] Update Ussd',
  UPDATE_USSDS = '[USSD] Update Ussds',
  DELETE_USSD = '[USSD] Delete Ussd',
  DELETE_USSDS = '[USSD] Delete Ussds',
  CLEAR_USSDS = '[USSD] Clear Ussds',
  GET_USSDS = '[USSD] Get Ussds',
  DONE_LOADING_USSDS = '[USSD] Done Loading Ussds'
}

export class LoadUssds implements Action {
  readonly type = USSDActionTypes.LOAD_USSDS;

  constructor(public payload: { ussds: Ussd[] }) {}
}

export class AddUssd implements Action {
  readonly type = USSDActionTypes.ADD_USSD;

  constructor(public payload: { ussd: Ussd }) {}
}

export class UpsertUssd implements Action {
  readonly type = USSDActionTypes.UPSERT_USSD;

  constructor(public payload: { ussd: Ussd }) {}
}

export class AddUssds implements Action {
  readonly type = USSDActionTypes.ADD_USSDS;

  constructor(public payload: { ussds: Ussd[] }) {}
}

export class UpsertUssds implements Action {
  readonly type = USSDActionTypes.UPSERT_USSDS;

  constructor(public payload: { ussds: Ussd[] }) {}
}

export class UpdateUssd implements Action {
  readonly type = USSDActionTypes.UPDATE_USSD;

  constructor(public payload: { ussd: Update<Ussd> }) {}
}

export class UpdateUssds implements Action {
  readonly type = USSDActionTypes.UPDATE_USSDS;

  constructor(public payload: { ussds: Update<Ussd>[] }) {}
}

export class DeleteUssd implements Action {
  readonly type = USSDActionTypes.DELETE_USSD;

  constructor(public payload: { id: string }) {}
}

export class DeleteUssds implements Action {
  readonly type = USSDActionTypes.DELETE_USSDS;

  constructor(public payload: { ids: string[] }) {}
}

export class DoneLoadingUssds implements Action {
  readonly type = USSDActionTypes.DONE_LOADING_USSDS;
}

export class ClearUssds implements Action {
  readonly type = USSDActionTypes.CLEAR_USSDS;
}

export class GetUssds implements Action {
  readonly type = USSDActionTypes.GET_USSDS;
}

export type USSDActions =
  LoadUssds
  | AddUssd
  | UpsertUssd
  | AddUssds
  | UpsertUssds
  | UpdateUssd
  | UpdateUssds
  | DeleteUssd
  | DeleteUssds
  | ClearUssds
  | GetUssds
  | DoneLoadingUssds;
