import {ActionReducerMap, createFeatureSelector, MetaReducer} from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import * as fromSetting from '../reducers/settings.reducer';
import * as fromMenu from '../reducers/menu.reducer';
import * as fromProgram from '../reducers/program.reducer';
import * as fromDataElement from '../reducers/dataelement.reducer';
import * as fromDataset from '../reducers/dataset.reducer';
import * as fromUssd from '../reducers/ussd.reducer';
import {storeFreeze} from 'ngrx-store-freeze';
import {uiReducer, UiState} from './ui.reducer';
import {RouterStateUrl} from './router.reducer';
import {environment} from '../../../environments/environment';
import {userReducer, UserState} from './user.reducer';

export  interface ApplicationState {
  user: UserState;
  uiState: UiState;
  settings: fromSetting.State;
  menus: fromMenu.State;
  ussd: fromUssd.State;
  dataelements: fromDataElement.State;
  datasets: fromDataset.State;
  programs: fromProgram.State;
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
}
export const reducers: ActionReducerMap<ApplicationState> = {
  user: userReducer,
  uiState: uiReducer,
  settings: fromSetting.reducer,
  menus: fromMenu.reducer,
  ussd: fromUssd.reducer,
  programs: fromProgram.reducer,
  datasets: fromDataset.reducer,
  dataelements: fromDataElement.reducer,
  routerReducer: fromRouter.routerReducer,
};

export const metaReducers: MetaReducer<ApplicationState>[] = !environment.production ? [storeFreeze] : [];

export const getRouterState = createFeatureSelector<fromRouter.RouterReducerState<RouterStateUrl>>('routerReducer');
export const getUiState = createFeatureSelector<UiState>('uiState');
export const getUserState = createFeatureSelector<UserState>('user');
export const selectSettingState = createFeatureSelector<fromSetting.State>('settings');
export const selectMenuState = createFeatureSelector<fromMenu.State>('menus');
export const selectUssdState = createFeatureSelector<fromUssd.State>('ussd');
export const selectProgramState = createFeatureSelector<fromProgram.State>('programs');
export const selectDataelementState = createFeatureSelector<fromDataElement.State>('dataelements');
export const selectDatasetState = createFeatureSelector<fromDataset.State>('datasets');

