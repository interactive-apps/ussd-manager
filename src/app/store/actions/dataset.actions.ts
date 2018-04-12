import {Action} from '@ngrx/store';
import {DataSet} from '../../shared/models/dataSet';

export enum DatasetActionTypes {
  LOAD_DATASETS = '[Dataset] Load Datasets',
  ADD_DATASET = '[Dataset] Add Dataset',
  CLEAR_DATASETS = '[Dataset] Clear Datasets',
  ADD_DATASETS = '[Dataset] Add Datasets',
  SET_SELECTED_DATASET = '[Dataset] Set Selected Datasets'
}

export class LoadDatasets implements Action {
  readonly type = DatasetActionTypes.LOAD_DATASETS;

  constructor(public payload: { datasets: DataSet[] }) {}
}

export class AddDataset implements Action {
  readonly type = DatasetActionTypes.ADD_DATASET;

  constructor(public payload: { dataset: DataSet }) {}
}

export class AddDatasets implements Action {
  readonly type = DatasetActionTypes.ADD_DATASETS;

  constructor(public payload: { datasets: DataSet[] }) {}
}

export class ClearDatasets implements Action {
  readonly type = DatasetActionTypes.CLEAR_DATASETS;
}

export class SetSelectedDataset implements Action {
  readonly type = DatasetActionTypes.SET_SELECTED_DATASET;
  constructor(public payload: { id: string }) {}
}

export type DatasetActions =
  LoadDatasets
  | AddDataset
  | AddDatasets
  | ClearDatasets
  | SetSelectedDataset;
