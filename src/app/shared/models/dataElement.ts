export interface DataElement {
  id: string;
  name: string;
  shortName: string;
  displayName?: string;
  categoryCombos?: {
    id: string,
    name: string
  }[];
  optionSets?: {
    id: string,
    name: string
  }[];
}
