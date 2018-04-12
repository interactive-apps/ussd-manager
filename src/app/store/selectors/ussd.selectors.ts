import {createSelector} from '@ngrx/store';
import * as fromUssd from '../reducers/ussd.reducer';
import {selectUssdState} from '../reducers/index';


export const selectUssdIds = createSelector(selectUssdState, fromUssd.selectUssdIds);
export const selectUssdEntities = createSelector(selectUssdState, fromUssd.selectUssdEntities);
export const selectAllUssds = createSelector(selectUssdState, fromUssd.selectAllUssds);
export const selectUssdTotal = createSelector(selectUssdState, fromUssd.selectUssdTotal);
export const selectCurrentUssdId = createSelector(selectUssdState, fromUssd.getSelectedUssdId);
export const selectUssdLoading = createSelector(selectUssdState, fromUssd.getLoading);
export const selectUssdLoaded = createSelector(selectUssdState, fromUssd.getLoaded);

export const selectCurrentUssd = createSelector(
  selectUssdEntities,
  selectCurrentUssdId,
  (ussdEntities, ussdId) => ussdEntities[ussdId]
);
