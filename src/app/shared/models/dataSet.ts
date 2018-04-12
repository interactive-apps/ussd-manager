import {DataElement} from './dataElement';
export interface DataSet {
  id: string;
  name: string;
  periodType: string;
  dataElements?: DataElement[];
  dataElementsIds: string[];
}
