import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { SettingActions, SettingActionTypes } from '../actions/settings.actions';
import {Setting} from '../../shared/models/settings';

export interface State extends EntityState<Setting> {
  // additional entities state properties
  selectedSettingId: string | null;
  loading: boolean;
  loaded: boolean;
}

export const adapter: EntityAdapter<Setting> = createEntityAdapter<Setting>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  selectedSettingId: null,
  loading: false,
  loaded: false
});

export function reducer(
  state = initialState,
  action: SettingActions
): State {
  switch (action.type) {
    case SettingActionTypes.ADD_SETTING: {
      return adapter.addOne(action.payload.setting, state);
    }

    case SettingActionTypes.UPSERT_SETTING: {
      return adapter.upsertOne(action.payload.setting, state);
    }

    case SettingActionTypes.ADD_SETTINGS: {
      return adapter.addMany(action.payload.settings, state);
    }

    case SettingActionTypes.UPSERT_SETTINGS: {
      return adapter.upsertMany(action.payload.settings, state);
    }

    case SettingActionTypes.UPDATE_SETTING: {
      return adapter.updateOne(action.payload.setting, state);
    }

    case SettingActionTypes.UPDATE_SETTINGS: {
      return adapter.updateMany(action.payload.settings, state);
    }

    case SettingActionTypes.DELETE_SETTING: {
      return adapter.removeOne(action.payload.id, state);
    }

    case SettingActionTypes.DELETE_SETTINGS: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case SettingActionTypes.LOAD_SETTINGS: {
      return adapter.addAll(action.payload.settings, state);
    }

    case SettingActionTypes.CLEAR_SETTINGS: {
      return adapter.removeAll({ ...state, selectedSettingId: null });
    }

    case SettingActionTypes.SET_SELECTED_SETTING: {
      return { ...state, selectedSettingId: action.payload.id };
    }

    default: {
      return state;
    }
  }
}

export const getSelectedSettingId = (state: State) => state.selectedSettingId;
export const getLoading = (state: State) => state.loading;
export const getLoaded = (state: State) => state.loaded;

export const {
  // select the array of setting ids
  selectIds: selectSettingIds,

  // select the dictionary of setting entities
  selectEntities: selectSettingEntities,

  // select the array of settings
  selectAll: selectAllSettings,

  // select the total setting count
  selectTotal: selectSettingTotal
} = adapter.getSelectors();
