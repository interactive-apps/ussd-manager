import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { MenuActions, MenuActionTypes } from '../actions/menu.actions';
import {UssdMenu} from '../../shared/models/menu';

export interface State extends EntityState<UssdMenu> {
  // additional entities state properties
  selectedMenuId: string;
  loading: boolean;
  loaded: boolean;
  next_menus: string[];
}

export const adapter: EntityAdapter<UssdMenu> = createEntityAdapter<UssdMenu>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  selectedMenuId: null,
  loading: false,
  loaded: false,
  next_menus: []
});

export function reducer(
  state = initialState,
  action: MenuActions
): State {
  switch (action.type) {
    case MenuActionTypes.ADD_MENU: {
      return adapter.addOne(action.payload.menu, state);
    }

    case MenuActionTypes.UPSERT_MENU: {
      return adapter.upsertOne(action.payload.menu, state);
    }

    case MenuActionTypes.ADD_MENUS: {
      return adapter.addMany(action.payload.menus, state);
    }

    case MenuActionTypes.UPSERT_MENUS: {
      return adapter.upsertMany(action.payload.menus, state);
    }

    case MenuActionTypes.UPDATE_MENU: {
      return adapter.updateOne(action.payload.menu, state);
    }

    case MenuActionTypes.UPDATE_MENUS: {
      return adapter.updateMany(action.payload.menus, state);
    }

    case MenuActionTypes.DELETE_MENU: {
      return adapter.removeOne(action.payload.id, state);
    }

    case MenuActionTypes.DELETE_MENUS: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case MenuActionTypes.LOAD_MENUS: {
      return adapter.addAll(action.payload.menus, state);
    }

    case MenuActionTypes.CLEAR_MENUS: {
      return adapter.removeAll({ ...state, selectedMenuId: null });
    }

    case MenuActionTypes.SET_SELECTED_MENU: {
      return { ...state, selectedMenuId: action.payload };
    }

    case MenuActionTypes.SET_NEXT_MENUS: {
      return { ...state, next_menus: action.payload };
    }

    default: {
      return state;
    }
  }
}

export const getSelectedMenuId = (state: State) => state.selectedMenuId;
export const getLoading = (state: State) => state.loading;
export const getLoaded = (state: State) => state.loaded;
export const getNextMenus = (state: State) => state.next_menus;

export const {
  // select the array of menu ids
  selectIds: selectMenuIds,

  // select the dictionary of menu entities
  selectEntities: selectMenuEntities,

  // select the array of menus
  selectAll: selectAllMenus,

  // select the total menu count
  selectTotal: selectMenuTotal
} = adapter.getSelectors();
