import {Action} from '@ngrx/store';
import {Update} from '@ngrx/entity';
import {Setting} from '../../shared/models/settings';

export enum SettingActionTypes {
  LOAD_SETTINGS = '[Setting] Load Settings',
  ADD_SETTING = '[Setting] Add Setting',
  UPSERT_SETTING = '[Setting] Upsert Setting',
  ADD_SETTINGS = '[Setting] Add Settings',
  UPSERT_SETTINGS = '[Setting] Upsert Settings',
  UPDATE_SETTING = '[Setting] Update Setting',
  UPDATE_SETTINGS = '[Setting] Update Settings',
  DELETE_SETTING = '[Setting] Delete Setting',
  DELETE_SETTINGS = '[Setting] Delete Settings',
  CLEAR_SETTINGS = '[Setting] Clear Settings',
  SET_SELECTED_SETTING = '[Setting] Set Selected Settings'
}

export class LoadSettings implements Action {
  readonly type = SettingActionTypes.LOAD_SETTINGS;

  constructor(public payload: { settings: Setting[] }) {}
}

export class AddSetting implements Action {
  readonly type = SettingActionTypes.ADD_SETTING;

  constructor(public payload: { setting: Setting }) {}
}

export class UpsertSetting implements Action {
  readonly type = SettingActionTypes.UPSERT_SETTING;

  constructor(public payload: { setting: Setting }) {}
}

export class AddSettings implements Action {
  readonly type = SettingActionTypes.ADD_SETTINGS;

  constructor(public payload: { settings: Setting[] }) {}
}

export class UpsertSettings implements Action {
  readonly type = SettingActionTypes.UPSERT_SETTINGS;

  constructor(public payload: { settings: Setting[] }) {}
}

export class UpdateSetting implements Action {
  readonly type = SettingActionTypes.UPDATE_SETTING;

  constructor(public payload: { setting: Update<Setting> }) {}
}

export class UpdateSettings implements Action {
  readonly type = SettingActionTypes.UPDATE_SETTINGS;

  constructor(public payload: { settings: Update<Setting>[] }) {}
}

export class DeleteSetting implements Action {
  readonly type = SettingActionTypes.DELETE_SETTING;

  constructor(public payload: { id: string }) {}
}

export class DeleteSettings implements Action {
  readonly type = SettingActionTypes.DELETE_SETTINGS;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearSettings implements Action {
  readonly type = SettingActionTypes.CLEAR_SETTINGS;
}

export class SetSelectedSetting implements Action {
  readonly type = SettingActionTypes.SET_SELECTED_SETTING;
  constructor(public payload: { id: string }) {}
}

export type SettingActions =
  LoadSettings
  | AddSetting
  | UpsertSetting
  | AddSettings
  | UpsertSettings
  | UpdateSetting
  | UpdateSettings
  | DeleteSetting
  | DeleteSettings
  | ClearSettings
  | SetSelectedSetting;
