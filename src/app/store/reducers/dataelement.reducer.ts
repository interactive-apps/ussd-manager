import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { DataelementActions, DataelementActionTypes } from '../actions/dataelement.actions';
import { DataElement } from '../../shared/models/dataElement';

export interface State extends EntityState<DataElement> {
  // additional entities state properties
  selectedDataelementId: string | null;
  loading: boolean;
  loaded: boolean;
}

export const adapter: EntityAdapter<DataElement> = createEntityAdapter<DataElement>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  selectedDataelementId: null,
  loading: false,
  loaded: false
});

export function reducer(
  state = initialState,
  action: DataelementActions
): State {
  switch (action.type) {
    case DataelementActionTypes.ADD_DATAELEMENT: {
      return adapter.addOne(action.payload.dataelement, state);
    }

    case DataelementActionTypes.ADD_DATAELEMENTS: {
      return adapter.addMany(action.payload.dataelements, state);
    }

    case DataelementActionTypes.LOAD_DATAELEMENTS: {
      return adapter.setAll(action.payload.dataelements, state);
    }

    case DataelementActionTypes.CLEAR_DATAELEMENTS: {
      return adapter.removeAll({ ...state, selectedDataelementId: null });
    }

    case DataelementActionTypes.SET_SELECTED_DATAELEMENT: {
      return { ...state, selectedDataelementId: action.payload.id };
    }

    default: {
      return state;
    }
  }
}

export const getSelectedDataelementId = (state: State) => state.selectedDataelementId;
export const getLoading = (state: State) => state.loading;
export const getLoaded = (state: State) => state.loaded;

export const {
  // select the array of dataelement ids
  selectIds: selectDataelementIds,

  // select the dictionary of dataelement entities
  selectEntities: selectDataelementEntities,

  // select the array of dataelements
  selectAll: selectAllDataelements,

  // select the total dataelement count
  selectTotal: selectDataelementTotal
} = adapter.getSelectors();
