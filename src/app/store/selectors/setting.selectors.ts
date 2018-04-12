import {createSelector} from '@ngrx/store';
import * as fromSetting from '../reducers/settings.reducer';
import {selectSettingState} from '../reducers/index';


export const selectSettingIds = createSelector(selectSettingState, fromSetting.selectSettingIds);
export const selectSettingEntities = createSelector(selectSettingState, fromSetting.selectSettingEntities);
export const selectAllSettings = createSelector(selectSettingState, fromSetting.selectAllSettings);
export const selectSettingTotal = createSelector(selectSettingState, fromSetting.selectSettingTotal);
export const selectCurrentSettingId = createSelector(selectSettingState, fromSetting.getSelectedSettingId);
export const selectSettingLoading = createSelector(selectSettingState, fromSetting.getLoading);
export const selectSettingLoaded = createSelector(selectSettingState, fromSetting.getLoading);

export const selectCurrentSetting = createSelector(
  selectSettingEntities,
  selectCurrentSettingId,
  (settingEntities, settingId) => settingEntities[settingId]
);
