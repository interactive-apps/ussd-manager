import { createSelector } from '@ngrx/store';
import * as fromProgram from '../reducers/program.reducer';
import * as fromDataset from '../reducers/dataset.reducer';
import * as fromDataelement from '../reducers/dataelement.reducer';
import {selectDataelementState, selectDatasetState, selectProgramState} from '../reducers/index';

export const selectDataelementIds = createSelector(selectDataelementState, fromDataelement.selectDataelementIds);
export const selectDataelementEntities = createSelector(selectDataelementState, fromDataelement.selectDataelementEntities);
export const selectAllDataelements = createSelector(selectDataelementState, fromDataelement.selectAllDataelements);
export const selectDataelementTotal = createSelector(selectDataelementState, fromDataelement.selectDataelementTotal);
export const selectCurrentDataelementId = createSelector(selectDataelementState, fromDataelement.getSelectedDataelementId);
export const selectDataelementLoading = createSelector(selectDataelementState, fromDataelement.getLoading);
export const selectDataelementLoaded = createSelector(selectDataelementState, fromDataelement.getLoading);

export const selectDatasetIds = createSelector(selectDatasetState, fromDataset.selectDatasetIds);
export const selectDatasetEntities = createSelector(selectDatasetState, fromDataset.selectDatasetEntities);
export const selectAllDatasets = createSelector(selectDatasetState, fromDataset.selectAllDatasets);
export const selectDatasetTotal = createSelector(selectDatasetState, fromDataset.selectDatasetTotal);
export const selectCurrentDatasetId = createSelector(selectDatasetState, fromDataset.getSelectedDatasetId);
export const selectDatasetLoading = createSelector(selectDatasetState, fromDataset.getLoading);
export const selectDatasetLoaded = createSelector(selectDatasetState, fromDataset.getLoading);
export const getDataSets = createSelector(selectAllDatasets, selectDataelementEntities,
  (datasets, dataelements) => {
   return datasets.map((dataset) => {
     const dataElements = dataset.dataElementsIds.map(id => dataelements[id]);
     return {
       ...dataset,
       dataElements
     };
   });
  });
export const selectProgramIds = createSelector(selectProgramState, fromProgram.selectProgramIds);
export const selectProgramEntities = createSelector(selectProgramState, fromProgram.selectProgramEntities);
export const selectAllPrograms = createSelector(selectProgramState, fromProgram.selectAllPrograms);
export const selectProgramTotal = createSelector(selectProgramState, fromProgram.selectProgramTotal);
export const selectCurrentProgramId = createSelector(selectProgramState, fromProgram.getSelectedProgramId);
export const selectProgramLoading = createSelector(selectProgramState, fromProgram.getLoading);
export const selectProgramLoaded = createSelector(selectProgramState, fromProgram.getLoading);
export const getPrograms = createSelector(selectAllPrograms, selectDataelementEntities,
  (programs, dataelements) => {
    return programs.map((program) => {
      const programStages = program.programStages.map((stage) => {
        return {
          ...stage,
          dataElements: stage.dataElementIds.map((de) => dataelements[de])
        };
      });
      return {
        ...program,
        programStages
      };
    });
  });
