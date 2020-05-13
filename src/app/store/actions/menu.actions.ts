import {Action} from '@ngrx/store';
import {Update} from '@ngrx/entity';
import {UssdMenu} from '../../shared/models/menu';

export enum MenuActionTypes {
  LOAD_MENUS = '[Menu] Load Menus',
  ADD_MENU = '[Menu] Add Menu',
  UPSERT_MENU = '[Menu] Upsert Menu',
  ADD_MENUS = '[Menu] Add Menus',
  UPSERT_MENUS = '[Menu] Upsert Menus',
  UPDATE_MENU = '[Menu] Update Menu',
  UPDATE_MENUS = '[Menu] Update Menus',
  DELETE_MENU = '[Menu] Delete Menu',
  DELETE_MENUS = '[Menu] Delete Menus',
  CLEAR_MENUS = '[Menu] Clear Menus',
  SET_SELECTED_MENU = '[Menu] Set Selected Menu',
  SET_NEXT_MENUS = '[Menu] Set Next Menus'
}

export class LoadMenus implements Action {
  readonly type = MenuActionTypes.LOAD_MENUS;

  constructor(public payload: { menus: UssdMenu[] }) {}
}

export class AddMenu implements Action {
  readonly type = MenuActionTypes.ADD_MENU;

  constructor(public payload: { menu: UssdMenu }) {}
}

export class UpsertMenu implements Action {
  readonly type = MenuActionTypes.UPSERT_MENU;

  constructor(public payload: { menu: any }) {}
}

export class AddMenus implements Action {
  readonly type = MenuActionTypes.ADD_MENUS;

  constructor(public payload: { menus: UssdMenu[] }) {}
}

export class UpsertMenus implements Action {
  readonly type = MenuActionTypes.UPSERT_MENUS;

  constructor(public payload: { menus: any }) {}
}

export class UpdateMenu implements Action {
  readonly type = MenuActionTypes.UPDATE_MENU;

  constructor(public payload: { menu: Update<UssdMenu> }) {}
}

export class UpdateMenus implements Action {
  readonly type = MenuActionTypes.UPDATE_MENUS;

  constructor(public payload: { menus: Update<UssdMenu>[] }) {}
}

export class DeleteMenu implements Action {
  readonly type = MenuActionTypes.DELETE_MENU;

  constructor(public payload: { id: string }) {}
}

export class SetSelectedMenu implements Action {
  readonly type = MenuActionTypes.SET_SELECTED_MENU;

  constructor(public payload: string) {}
}

export class DeleteMenus implements Action {
  readonly type = MenuActionTypes.DELETE_MENUS;

  constructor(public payload: { ids: string[] }) {}
}

export class SetNextMenus implements Action {
  readonly type = MenuActionTypes.SET_NEXT_MENUS;

  constructor(public payload: string[]) {}
}

export class ClearMenus implements Action {
  readonly type = MenuActionTypes.CLEAR_MENUS;
}

export type MenuActions =
  LoadMenus
  | AddMenu
  | UpsertMenu
  | AddMenus
  | UpsertMenus
  | UpdateMenu
  | UpdateMenus
  | DeleteMenu
  | DeleteMenus
  | ClearMenus
  | SetSelectedMenu
  | SetNextMenus;


  /*
import {Action} from '@ngrx/store';
import {Update} from '@ngrx/entity';
import {UssdMenu} from '../../shared/models/menu';

export enum MenuActionTypes {
  LOAD_MENUS = '[Menu] Load Menus',
  ADD_MENU = '[Menu] Add Menu',
  UPSERT_MENU = '[Menu] Upsert Menu',
  ADD_MENUS = '[Menu] Add Menus',
  UPSERT_MENUS = '[Menu] Upsert Menus',
  UPDATE_MENU = '[Menu] Update Menu',
  UPDATE_MENUS = '[Menu] Update Menus',
  DELETE_MENU = '[Menu] Delete Menu',
  DELETE_MENUS = '[Menu] Delete Menus',
  CLEAR_MENUS = '[Menu] Clear Menus',
  SET_SELECTED_MENU = '[Menu] Set Selected Menu',
  SET_NEXT_MENUS = '[Menu] Set Next Menus'
}

export class LoadMenus implements Action {
  readonly type = MenuActionTypes.LOAD_MENUS;

  constructor(public payload: { menus: UssdMenu[] }) {}
}

export class AddMenu implements Action {
  readonly type = MenuActionTypes.ADD_MENU;

  constructor(public payload: { menu: UssdMenu }) {}
}

export class UpsertMenu implements Action {
  readonly type = MenuActionTypes.UPSERT_MENU;

  constructor(public payload: { menu: Update<UssdMenu> }) {}
}

export class AddMenus implements Action {
  readonly type = MenuActionTypes.ADD_MENUS;

  constructor(public payload: { menus: UssdMenu[] }) {}
}

export class UpsertMenus implements Action {
  readonly type = MenuActionTypes.UPSERT_MENUS;

  constructor(public payload: { menus: Update<UssdMenu>[] }) {}
}

export class UpdateMenu implements Action {
  readonly type = MenuActionTypes.UPDATE_MENU;

  constructor(public payload: { menu: Update<UssdMenu> }) {}
}

export class UpdateMenus implements Action {
  readonly type = MenuActionTypes.UPDATE_MENUS;

  constructor(public payload: { menus: Update<UssdMenu>[] }) {}
}

export class DeleteMenu implements Action {
  readonly type = MenuActionTypes.DELETE_MENU;

  constructor(public payload: { id: string }) {}
}

export class SetSelectedMenu implements Action {
  readonly type = MenuActionTypes.SET_SELECTED_MENU;

  constructor(public payload: string) {}
}

export class DeleteMenus implements Action {
  readonly type = MenuActionTypes.DELETE_MENUS;

  constructor(public payload: { ids: string[] }) {}
}

export class SetNextMenus implements Action {
  readonly type = MenuActionTypes.SET_NEXT_MENUS;

  constructor(public payload: string[]) {}
}

export class ClearMenus implements Action {
  readonly type = MenuActionTypes.CLEAR_MENUS;
}

export type MenuActions =
  LoadMenus
  | AddMenu
  | UpsertMenu
  | AddMenus
  | UpsertMenus
  | UpdateMenu
  | UpdateMenus
  | DeleteMenu
  | DeleteMenus
  | ClearMenus
  | SetSelectedMenu
  | SetNextMenus;
  */
