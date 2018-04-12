import {Action} from '@ngrx/store';
import {Program} from '../../shared/models/program';

export enum ProgramActionTypes {
  LOAD_PROGRAMS = '[Program] Load Programs',
  ADD_PROGRAM = '[Program] Add Program',
  CLEAR_PROGRAMS = '[Program] Clear Programs',
  ADD_PROGRAMS = '[Program] Add Programs',
  SET_SELECTED_PROGRAM = '[Program] Set Selected Programs'
}

export class LoadPrograms implements Action {
  readonly type = ProgramActionTypes.LOAD_PROGRAMS;

  constructor(public payload: { programs: Program[] }) {}
}

export class AddProgram implements Action {
  readonly type = ProgramActionTypes.ADD_PROGRAM;

  constructor(public payload: { program: Program }) {}
}

export class AddPrograms implements Action {
  readonly type = ProgramActionTypes.ADD_PROGRAMS;

  constructor(public payload: { programs: Program[] }) {}
}

export class ClearPrograms implements Action {
  readonly type = ProgramActionTypes.CLEAR_PROGRAMS;
}

export class SetSelectedProgram implements Action {
  readonly type = ProgramActionTypes.SET_SELECTED_PROGRAM;
  constructor(public payload: { id: string }) {}
}

export type ProgramActions =
  LoadPrograms
  | AddProgram
  | AddPrograms
  | ClearPrograms
  | SetSelectedProgram;
