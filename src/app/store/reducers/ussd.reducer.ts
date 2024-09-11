import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import {USSDActions, USSDActionTypes} from '../actions/ussd.actions';
import {Ussd} from '../../shared/models/ussd';

export interface State extends EntityState<Ussd> {
  // additional entities state properties
  selectedUssdId: number | null;
  loading: boolean;
  loaded: boolean;
}

export const adapter: EntityAdapter<Ussd> = createEntityAdapter<Ussd>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  selectedUssdId: null,
  loading: false,
  loaded: false
});

export function reducer(
  state = initialState,
  action: USSDActions
): State {
  switch (action.type) {
    case USSDActionTypes.ADD_USSD: {
      return adapter.addOne(action.payload.ussd, state);
    }

    case USSDActionTypes.UPSERT_USSD: {
      return adapter.upsertOne(action.payload.ussd, state);
    }

    case USSDActionTypes.ADD_USSDS: {
      return adapter.addMany(action.payload.ussds, state);
    }

    case USSDActionTypes.UPSERT_USSDS: {
      return adapter.upsertMany(action.payload.ussds, state);
    }

    case USSDActionTypes.UPDATE_USSD: {
      return adapter.updateOne(action.payload.ussd, state);
    }

    case USSDActionTypes.UPDATE_USSDS: {
      return adapter.updateMany(action.payload.ussds, state);
    }

    case USSDActionTypes.DELETE_USSD: {
      return adapter.removeOne(action.payload.id, state);
    }

    case USSDActionTypes.DELETE_USSDS: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case USSDActionTypes.LOAD_USSDS: {
      return adapter.setAll(action.payload.ussds, state);
    }

    case USSDActionTypes.CLEAR_USSDS: {
      return adapter.removeAll({ ...state, selectedUssdId: null });
    }

    case USSDActionTypes.GET_USSDS: {
      return { ...state, loading: true, loaded: false };
    }

    case USSDActionTypes.DONE_LOADING_USSDS: {
      return { ...state, loading: false, loaded: true };
    }

    default: {
      return state;
    }
  }
}

export const getSelectedUssdId = (state: State) => state.selectedUssdId;
export const getLoading = (state: State) => state.loading;
export const getLoaded = (state: State) => state.loaded;

export const {
  selectIds: selectUssdIds,

  selectEntities: selectUssdEntities,

  selectAll: selectAllUssds,

  selectTotal: selectUssdTotal
} = adapter.getSelectors();
