export interface DataElement {
  id: string;
  name: string;
  displayName?: string;
  valueType?: string;
  categoryCombos?: {
    id: string;
    name: string;
  }[];
  optionSets?: {
    id: string;
    name: string;
  }[];
}
