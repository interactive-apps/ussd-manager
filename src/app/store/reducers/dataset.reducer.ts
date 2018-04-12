import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { DatasetActions, DatasetActionTypes } from '../actions/dataset.actions';
import { DataSet } from '../../shared/models/dataSet';

export interface State extends EntityState<DataSet> {
  // additional entities state properties
  selectedDatasetId: string | null;
  loading: boolean;
  loaded: boolean;
}

export const adapter: EntityAdapter<DataSet> = createEntityAdapter<DataSet>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  selectedDatasetId: null,
  loading: false,
  loaded: false
});

export function reducer(
  state = initialState,
  action: DatasetActions
): State {
  switch (action.type) {
    case DatasetActionTypes.ADD_DATASET: {
      return adapter.addOne(action.payload.dataset, state);
    }

    case DatasetActionTypes.ADD_DATASETS: {
      return adapter.addMany(action.payload.datasets, state);
    }

    case DatasetActionTypes.LOAD_DATASETS: {
      return adapter.addAll(action.payload.datasets, state);
    }

    case DatasetActionTypes.CLEAR_DATASETS: {
      return adapter.removeAll({ ...state, selectedDatasetId: null });
    }

    case DatasetActionTypes.SET_SELECTED_DATASET: {
      return { ...state, selectedDatasetId: action.payload.id };
    }

    default: {
      return state;
    }
  }
}

export const getSelectedDatasetId = (state: State) => state.selectedDatasetId;
export const getLoading = (state: State) => state.loading;
export const getLoaded = (state: State) => state.loaded;

export const {
  // select the array of dataset ids
  selectIds: selectDatasetIds,

  // select the dictionary of dataset entities
  selectEntities: selectDatasetEntities,

  // select the array of datasets
  selectAll: selectAllDatasets,

  // select the total dataset count
  selectTotal: selectDatasetTotal
} = adapter.getSelectors();
