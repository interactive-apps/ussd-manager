import {Action} from '@ngrx/store';
import {DataElement} from '../../shared/models/dataElement';

export enum DataelementActionTypes {
  LOAD_DATAELEMENTS = '[Dataelement] Load Dataelements',
  ADD_DATAELEMENT = '[Dataelement] Add Dataelement',
  CLEAR_DATAELEMENTS = '[Dataelement] Clear Dataelements',
  ADD_DATAELEMENTS = '[Dataelement] Add Dataelements',
  SET_SELECTED_DATAELEMENT = '[Dataelement] Set Selected Dataelements'
}

export class LoadDataelements implements Action {
  readonly type = DataelementActionTypes.LOAD_DATAELEMENTS;

  constructor(public payload: { dataelements: DataElement[] }) {}
}

export class AddDataelement implements Action {
  readonly type = DataelementActionTypes.ADD_DATAELEMENT;

  constructor(public payload: { dataelement: DataElement }) {}
}

export class AddDataelements implements Action {
  readonly type = DataelementActionTypes.ADD_DATAELEMENTS;

  constructor(public payload: { dataelements: DataElement[] }) {}
}

export class ClearDataelements implements Action {
  readonly type = DataelementActionTypes.CLEAR_DATAELEMENTS;
}

export class SetSelectedDataelement implements Action {
  readonly type = DataelementActionTypes.SET_SELECTED_DATAELEMENT;
  constructor(public payload: { id: string }) {}
}

export type DataelementActions =
  LoadDataelements
  | AddDataelement
  | AddDataelements
  | ClearDataelements
  | SetSelectedDataelement;
