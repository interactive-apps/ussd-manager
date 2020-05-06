import { DataElement } from "./dataElement";

export interface Program {
  id: string;
  name: string;
  type?: string;
  trackedEntityTypeId?: string;
  displayName: string;
  programStages: {
    id: string;
    name: string;
    dataElementIds: string[];
    dataElements: DataElement[];
  }[];
}
