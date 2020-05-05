import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import {
  TrackedEntityTypeActions,
  TrackedEntityTypeActionTypes
} from "../actions/trackedentitytype.actions";
import { TrackedEntityType } from "../../shared/models/trackedEntityType";

export interface State extends EntityState<TrackedEntityType> {
  // additional entities state properties
  selectedTrackedEntityTypeId: string | null;
  loading: boolean;
  loaded: boolean;
}

export const adapter: EntityAdapter<TrackedEntityType> = createEntityAdapter<
  TrackedEntityType
>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  selectedTrackedEntityTypeId: null,
  loading: false,
  loaded: false
});

export function reducer(
  state = initialState,
  action: TrackedEntityTypeActions
): State {
  switch (action.type) {
    case TrackedEntityTypeActionTypes.ADD_TRACKED_ENTITY_TYPE: {
      return adapter.addOne(action.payload.trackedEntityType, state);
    }

    case TrackedEntityTypeActionTypes.ADD_TRACKED_ENTITY_TYPES: {
      return adapter.addMany(action.payload.trackedEntityTypes, state);
    }

    case TrackedEntityTypeActionTypes.LOAD_TRACKED_ENTITY_TYPES: {
      return adapter.addAll(action.payload.trackedEntityTypes, state);
    }

    case TrackedEntityTypeActionTypes.CLEAR_TRACKED_ENTITY_TYPES: {
      return adapter.removeAll({ ...state, selectedTrackedEntityTypeId: null });
    }

    case TrackedEntityTypeActionTypes.SET_SELECTED_TRACKED_ENTITY_TYPE: {
      return { ...state, selectedTrackedEntityTypeId: action.payload.id };
    }

    default: {
      return state;
    }
  }
}

export const getSelectedTrackedEntityTypeId = (state: State) =>
  state.selectedTrackedEntityTypeId;
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
