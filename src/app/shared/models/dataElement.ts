export interface DataElement {
  id: string;
  name: string;
  displayName?: string;
  valueType?: string;
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
