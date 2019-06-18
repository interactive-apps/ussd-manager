export interface DataElement {
  id: string;
  name: string;
  shortName?: string;
  valueType?: string;
  displayName?: string;
  categoryCombo?: {
    id: string;
    name: string;
    categoryOptionCombos: { id: string; name: string }[];
  };
  optionSets?: {
    id: string;
    name: string;
  }[];
}
