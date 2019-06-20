import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UssdMenu } from '../../../shared/models/menu';
import { DataSet } from '../../../shared/models/dataSet';
import { Program } from '../../../shared/models/program';
import { listStateTrigger } from '../../../shared/animations/basic-animations';
import { Store } from '@ngrx/store';
import { ApplicationState } from '../../../store/reducers/index';
import { UpdateMenu } from '../../../store/actions/menu.actions';
import { UssdService } from '../../../shared/services/ussd.service';
import * as _ from 'lodash';
import * as menuActions from '../../../store/actions/menu.actions';
import { DataElement } from '../../../shared/models/dataElement';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css'],
  animations: [listStateTrigger]
})
export class DataComponent implements OnInit {
  @Input() menus: { [id: string]: UssdMenu };
  @Input() menu: UssdMenu = null;
  @Input() datasets: DataSet[] = [];
  @Input() datasetEntities: any = {};
  @Input() programs: Program[] = [];
  @Input() programEntities: any = {};
  @Input() selectedDatas: string[] = [];
  @Input() isDataReady = false;
  @Output() nextMenu: EventEmitter<any> = new EventEmitter<any>();
  @Output() messageValue: EventEmitter<string> = new EventEmitter<string>();

  dataType = 'datasets';
  groups: any[] = [];
  dataLists: any[] = [];
  options: any[] = [];
  selected_group: any;
  searchQuery: string = null;
  selectedProgram = '';
  selectedProgramStage = '';
  selectedDataset = '';
  submit_data = true;
  constructor(
    private store: Store<ApplicationState>,
    private ussdService: UssdService
  ) {}

  ngOnInit() {
    this.groups = this.datasets;
    const { dataType } = this.menu;
    if (dataType) {
      if (dataType === 'event') {
        this.setDataType('programs');
      } else if (dataType === 'aggregate') {
        this.setDataType('datasets');
      }
    }
  }

  setMessage(message: string) {
    this.messageValue.emit(message);
  }

  setDataType(type: string) {
    this.dataType = type;
    this.dataLists = [];
    this.selected_group = null;
    if (type === 'datasets') {
      this.groups = this.datasets;
      setTimeout(() => {
        if (
          this.menu.dataSet &&
          this.menu.dataSet !== '' &&
          this.selectedDatas &&
          this.datasets
        ) {
          this.setSelectedGroup(this.menu.dataSet);
        }
      }, 100);
    } else if (type === 'programs') {
      this.groups = this.programs;
      setTimeout(() => {
        if (
          this.menu.program &&
          this.menu.program !== '' &&
          this.selectedDatas &&
          this.programs
        ) {
          this.setSelectedGroup(this.menu.program);
        }
      }, 100);
    }
  }

  alreadySelected(id: string) {
    return this.selectedDatas.indexOf(id) !== -1;
  }

  setSubmit(value: boolean) {
    this.store.dispatch(
      new UpdateMenu({
        menu: {
          id: this.menu.id,
          changes: {
            submit_data: value
          }
        }
      })
    );
  }

  setSelectedGroup(value: string) {
    if (this.dataType === 'datasets') {
      const dataset = this.getItemById(this.datasets, value);
      const items = [];
      if (dataset && dataset.dataElements) {
        dataset.dataElements.map((dataelement: DataElement) => {
          if (dataelement && dataelement.categoryCombo) {
            items.push(
              ...dataelement.categoryCombo.categoryOptionCombos.map(
                (categoryOptionCombo: { id: string; name: string }) => {
                  const shortName = this.getCustomFieldShortName(
                    dataelement.shortName,
                    categoryOptionCombo.name
                  );
                  return {
                    id: dataelement.id + '.' + categoryOptionCombo.id,
                    dataElementId: dataelement.id,
                    shortName,
                    displayName: dataelement.displayName,
                    categoryId: categoryOptionCombo.id,
                    optionSets: dataelement.optionSets,
                    valueType: dataelement.valueType,
                    name:
                      categoryOptionCombo.name === 'default'
                        ? dataelement.name
                        : dataelement.name + ' ' + categoryOptionCombo.name
                  };
                }
              )
            );
          }
        });
      }
      this.selectedDataset = value;
      this.dataLists = items;
    } else if (this.dataType === 'programs') {
      this.selectedProgram = value;
      const program = this.getItemById(this.programs, value);
      this.selected_group = program;
      const { programStages } = program;
      if (this.menu.program_stage && this.menu.program_stage !== '') {
        this.setDataElementFromStage(programStages[0].id);
      } else if (
        programStages &&
        programStages.length > 0 &&
        programStages[0].id
      ) {
        this.setDataElementFromStage(programStages[0].id);
      }
    }
  }

  getCustomFieldShortName(shortName: string, categoryOptionComboName?: string) {
    shortName =
      categoryOptionComboName && categoryOptionComboName !== 'default'
        ? `${shortName || ''} ${categoryOptionComboName.split(',').join('')}`
        : shortName;
    // return shortname without double spaces
    return shortName.replace(/\s\s+/g, ' ');
  }

  setDataElementFromStage(selectedProgramStage: string) {
    const programStage = this.getItemById(
      this.selected_group.programStages,
      selectedProgramStage
    );
    this.selectedProgramStage = selectedProgramStage;
    this.dataLists = programStage.dataElements.map(
      (dataElement: DataElement) => {
        const {
          id,
          valueType,
          optionSets,
          name,
          shortName,
          displayName
        } = dataElement;
        const customShortName = this.getCustomFieldShortName(shortName);
        return {
          id,
          shortName: customShortName,
          displayName,
          optionSets,
          valueType,
          name,
          stage: selectedProgramStage,
          program: this.selectedProgram
        };
      }
    );
    if (this.menu.data_id) {
      const { data_id } = this.menu;
      const matchedData = _.find(this.dataLists, data => {
        return data.id === data_id;
      });
      if (matchedData && matchedData.id) {
        this.setData(matchedData, this.menu.title);
      }
    }
  }

  updateOptions(option) {
    const options = this.menu.options;
    let newOptions = [];

    if (option && option.checked) {
      const newOption = {
        id: option.id,
        title: option.name,
        response: '' + newOptions.length,
        value: option.code
      };
      if (option.next_menu && option.next_menu !== '') {
        newOption['next_menu'] = option.next_menu;
      }
      newOptions.push(newOption);
    }
    options.map(optionObj => {
      if (optionObj && optionObj.id !== option.id) {
        const newOption = {
          id: optionObj.id,
          title: optionObj.title,
          response: '' + newOptions.length,
          value: optionObj.value
        };
        if (optionObj.next_menu && optionObj.next_menu !== '') {
          newOption['next_menu'] = optionObj.next_menu;
        }
        newOptions.push(newOption);
      }
    });
    newOptions = _.sortBy(newOptions, ['title']);
    if (option.inReverseOrder) {
      newOptions = _.reverse(newOptions);
    }
    let count = 0;
    newOptions.forEach(newOption => {
      count++;
      newOption.response = '' + count;
    });

    this.store.dispatch(
      new UpdateMenu({
        menu: {
          id: this.menu.id,
          changes: { options: newOptions }
        }
      })
    );
  }

  getDefaultOptions(valueType) {
    return [
      {
        id: this.ussdService.makeid(),
        name: 'Yes',
        code: true,
        inReverseOrder: true,
        next_menu: '',
        checked: true
      },
      {
        id: this.ussdService.makeid(),
        name: 'No',
        code: valueType === 'BOOLEAN' ? false : '',
        inReverseOrder: true,
        next_menu: '',
        checked: true
      }
    ];
  }

  getSelectedMenu(menuId) {
    let selected = '';
    if (menuId && menuId !== '') {
      const menu = this.menus[menuId];
      selected = menu && menu.title ? menu.title : '';
    }
    return selected;
  }

  updateNextMenu(next_menu: string) {
    if (next_menu && next_menu !== '') {
      this.nextMenu.emit({
        current_menu_id: this.menu.id,
        next_menu_id: next_menu,
        option: null
      });
    }
  }

  hasOptionInMenuOptions(option, optionList) {
    const matchOption = _.find(optionList, optionObj => {
      return optionObj.id === option.id;
    });
    return matchOption && matchOption.id ? true : false;
  }

  getMenuSelections(menus) {
    const menuSelections = [];
    menuSelections.push({ id: '', name: 'select next menu' });
    Object.keys(menus).map(menuId => {
      if (this.menu.id !== menuId) {
        const menuObject = this.menus[menuId];
        menuSelections.push({ id: menuId, name: menuObject.title });
      }
    });
    return menuSelections;
  }

  setData(data: any, title?: string) {
    const { valueType, shortName, optionSets } = data;
    const ValueTypeWithDefaultOptions = ['BOOLEAN', 'TRUE_ONLY'];
    this.options = [];
    if (optionSets) {
      optionSets.map((option: any) => {
        const matchOption = _.find(this.menu.options, optionObj => {
          return optionObj.id === option.id;
        });
        this.options.push({
          id: option.id,
          name: option.name,
          code: option.code,
          inReverseOrder: false,
          next_menu:
            matchOption && matchOption.next_menu ? matchOption.next_menu : '',
          checked: matchOption && matchOption.id ? true : false
        });
      });
    }
    if (ValueTypeWithDefaultOptions.indexOf(data.valueType) > -1) {
      const options = this.getDefaultOptions(data.valueType);
      options.map(option => {
        const matchOption = _.find(this.menu.options, optionObj => {
          return optionObj.value === option.code;
        });
        this.options.push({
          id: matchOption && matchOption.id ? matchOption.id : option.id,
          name: option.name,
          code: option.code,
          inReverseOrder: false,
          next_menu:
            matchOption && matchOption.next_menu ? matchOption.next_menu : '',
          checked: matchOption && matchOption.id ? true : false
        });
      });
    }
    let menu = null;
    if (this.dataType === 'datasets') {
      menu = <UssdMenu>{
        ...this.menu,
        title: title ? title : data.name,
        data_element: data.dataElementId,
        category_combo: data.categoryId,
        dataType: 'aggregate',
        dataSet: this.selectedDataset,
        data_name: data.name,
        data_id: data.id,
        field_value_type: valueType,
        field_short_name: shortName,
        options: data.id === this.menu.data_id ? this.menu.options : []
      };
    } else if (this.dataType === 'programs') {
      menu = <UssdMenu>{
        ...this.menu,
        title: title ? title : data.name,
        data_element: data.id,
        program: this.selectedProgram,
        program_stage: this.selectedProgramStage,
        dataType: 'event',
        data_name: data.name,
        data_id: data.id,
        field_value_type: valueType,
        field_short_name: shortName,
        options: data.id === this.menu.data_id ? this.menu.options : []
      };
    }
    this.store.dispatch(
      new UpdateMenu({
        menu: {
          id: this.menu.id,
          changes: { ...menu }
        }
      })
    );
    if (ValueTypeWithDefaultOptions.indexOf(data.valueType) > -1) {
      const newOptions = [];
      this.options.map(option => {
        const newOption = {
          id: option.id,
          title: option.name,
          response: '' + newOptions.length,
          value: option.code
        };
        if (option.next_menu && option.next_menu !== '') {
          newOption['next_menu'] = option.next_menu;
        }
        newOptions.push(newOption);
      });
      let count = 0;
      newOptions.forEach(newOption => {
        count++;
        newOption.response = `${count}`;
      });
      this.store.dispatch(
        new UpdateMenu({
          menu: {
            id: this.menu.id,
            changes: { options: newOptions }
          }
        })
      );
    }
  }

  unsetMenu() {
    const menu = <UssdMenu>{
      ...this.menu,
      title: '',
      data_element: '',
      category_combo: '',
      program: '',
      program_stage: '',
      dataType: '',
      data_name: '',
      data_id: ''
    };
    this.store.dispatch(
      new UpdateMenu({
        menu: {
          id: this.menu.id,
          changes: { ...menu }
        }
      })
    );
  }

  getItemById(array: any[], id: string) {
    const matchItem = _.find(array, (item: any) => {
      return item.id === id;
    });
    return matchItem;
  }

  setNextMenu() {
    this.nextMenu.emit({
      current_menu_id: this.menu.id,
      next_menu_id: this.menu.next_menu,
      option: null
    });
  }

  trackItem(index: string, item: any) {
    return item ? item.id : index;
  }

  setDataValue(key: string, value: any) {
    this.store.dispatch(
      new menuActions.UpdateMenu({
        menu: {
          id: this.menu.id,
          changes: {
            [key]: value
          }
        }
      })
    );
  }
}
