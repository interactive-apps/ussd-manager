import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { ProgramActions, ProgramActionTypes } from "../actions/program.actions";
import { Program } from "../../shared/models/program";

export interface State extends EntityState<Program> {
  // additional entities state properties
  selectedProgramId: string | null;
  loading: boolean;
  loaded: boolean;
}

export const adapter: EntityAdapter<Program> = createEntityAdapter<Program>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  selectedProgramId: null,
  loading: false,
  loaded: false
});

export function reducer(state = initialState, action: ProgramActions): State {
  switch (action.type) {
    case ProgramActionTypes.ADD_PROGRAM: {
      return adapter.addOne(action.payload.program, state);
    }

    case ProgramActionTypes.ADD_PROGRAMS: {
      return adapter.addMany(action.payload.programs, state);
    }

    case ProgramActionTypes.LOAD_PROGRAMS: {
      return adapter.setAll(action.payload.programs, state);
    }

    case ProgramActionTypes.CLEAR_PROGRAMS: {
      return adapter.removeAll({ ...state, selectedProgramId: null });
    }

    case ProgramActionTypes.SET_SELECTED_PROGRAM: {
      return { ...state, selectedProgramId: action.payload.id };
    }

    default: {
      return state;
    }
  }
}

export const getSelectedProgramId = (state: State) => state.selectedProgramId;
export const getLoading = (state: State) => state.loading;
export const getLoaded = (state: State) => state.loaded;

export const {
  // select the array of program ids
  selectIds: selectProgramIds,

  // select the dictionary of program entities
  selectEntities: selectProgramEntities,

  // select the array of programs
  selectAll: selectAllPrograms,

  // select the total program count
  selectTotal: selectProgramTotal
} = adapter.getSelectors();
