import { Action } from "@ngrx/store";
import { TrackedEntityType } from "../../shared/models/trackedEntityType";

export enum TrackedEntityTypeActionTypes {
  LOAD_TRACKED_ENTITY_TYPES = "[TrackedEntityType] Load TrackedEntityType",
  ADD_TRACKED_ENTITY_TYPE = "[TrackedEntityType] Add TrackedEntityType",
  CLEAR_TRACKED_ENTITY_TYPES = "[TrackedEntityType] Clear TrackedEntityTypes",
  ADD_TRACKED_ENTITY_TYPES = "[TrackedEntityType] Add TrackedEntityTypes",
  SET_SELECTED_TRACKED_ENTITY_TYPE = "[TrackedEntityType] Set Selected TrackedEntityTypes"
}

export class LoadTrackedEntityType implements Action {
  readonly type = TrackedEntityTypeActionTypes.LOAD_TRACKED_ENTITY_TYPES;

  constructor(public payload: { trackedEntityTypes: TrackedEntityType[] }) {}
}

export class AddTrackedEntityType implements Action {
  readonly type = TrackedEntityTypeActionTypes.ADD_TRACKED_ENTITY_TYPE;

  constructor(public payload: { trackedEntityType: TrackedEntityType }) {}
}

export class AddTrackedEntityTypes implements Action {
  readonly type = TrackedEntityTypeActionTypes.ADD_TRACKED_ENTITY_TYPES;

  constructor(public payload: { trackedEntityTypes: TrackedEntityType[] }) {}
}

export class ClearTrackedEntityTypes implements Action {
  readonly type = TrackedEntityTypeActionTypes.CLEAR_TRACKED_ENTITY_TYPES;
}

export class SetTrackedEntityType implements Action {
  readonly type = TrackedEntityTypeActionTypes.SET_SELECTED_TRACKED_ENTITY_TYPE;
  constructor(public payload: { id: string }) {}
}

export type TrackedEntityTypeActions =
  | LoadTrackedEntityType
  | AddTrackedEntityType
  | AddTrackedEntityTypes
  | ClearTrackedEntityTypes
  | SetTrackedEntityType;
