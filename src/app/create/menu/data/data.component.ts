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

  setMessage(message) {
    this.messageValue.emit(message);
  }

  setDataType(type) {
    this.dataType = type;
    this.dataLists = [];
    this.selected_group = null;
    if (type === 'datasets') {
      this.groups = this.datasets;
    } else if (type === 'programs') {
      this.groups = this.programs;
    }
  }

  alreadySelected(id) {
    return this.selectedDatas.indexOf(id) !== -1;
  }

  setSubmit(value) {
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

  setSelectedGroup(value) {
    if (this.dataType === 'datasets') {
      const datasets = this.getItemById(this.datasets, value);
      const items = [];
      datasets.dataElements.map(dataelem => {
        items.push(
          ...dataelem.categoryCombos.map(cat => {
            return {
              id: dataelem.id + '.' + cat.id,
              dataElementId: dataelem.id,
              categoryId: cat.id,
              optionSets: dataelem.optionSets,
              valueType: dataelem.valueType,
              name:
                cat.name === 'default'
                  ? dataelem.name
                  : dataelem.name + ' ' + cat.name
            };
          })
        );
      });
      this.dataLists = items;
    } else if (this.dataType === 'programs') {
      this.selectedProgram = value;
      const program = this.getItemById(this.programs, value);
      this.selected_group = program;
      const { programStages } = program;
      if (programStages && programStages.length > 0 && programStages[0].id) {
        this.setDataElementFromStage(programStages[0].id);
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

  setData(data) {
    const ValueTypeWithDefaultOptions = ['BOOLEAN', 'TRUE_ONLY'];
    this.options = [];
    if (data.optionSets) {
      data.optionSets.map(option => {
        this.options.push({
          id: option.id,
          name: option.name,
          code: option.code,
          inReverseOrder: false,
          next_menu: '',
          checked: this.hasOptionInMenuOptions(option, this.menu.options)
        });
      });
    }
    if (ValueTypeWithDefaultOptions.indexOf(data.valueType) > -1) {
      const options = this.getDefaultOptions(data.valueType);
      this.options = _.concat([], options);
    }
    let menu = null;
    if (this.dataType === 'datasets') {
      menu = <UssdMenu>{
        ...this.menu,
        title: data.name,
        data_element: data.dataElementId,
        category_combo: data.categoryId,
        dataType: 'aggregate',
        data_name: data.name,
        data_id: data.id,
        options: data.id === this.menu.data_id ? this.menu.options : []
      };
    } else if (this.dataType === 'programs') {
      menu = <UssdMenu>{
        ...this.menu,
        title: data.name,
        data_element: data.id,
        program: this.selectedProgram,
        program_stage: this.selected_group.id,
        dataType: 'event',
        data_name: data.name,
        data_id: data.id,
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
        newOptions.push(newOption);
      });
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

  setDataElementFromStage(value) {
    const stage = this.getItemById(this.selected_group.programStages, value);
    this.dataLists = stage.dataElements.map(dx => {
      return {
        id: dx.id,
        optionSets: dx.optionSets,
        valueType: dx.valueType,
        stage: value,
        name: dx.name,
        program: this.selectedProgram
      };
    });
    if (this.menu.data_id) {
      const { data_id } = this.menu;
      const matchedData = _.find(this.dataLists, data => {
        return data.id === data_id;
      });
      if (matchedData && matchedData.id) {
        this.setData(matchedData);
      }
    }
  }

  getItemById(array, id) {
    const matchItem = _.find(array, item => {
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

  trackItem(index, item) {
    return item ? item.id : undefined;
  }
}
