import {Setting} from './settings';
import {UssdMenu} from './menu';
export interface Ussd {
  id: string;
  settings: Setting;
  menus: {[id: string]: UssdMenu};
}
