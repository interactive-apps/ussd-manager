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

  setData(data) {
    console.log(data);
    let menu = null;
    if (this.dataType === 'datasets') {
      menu = <UssdMenu>{
        ...this.menu,
        title: data.name,
        data_element: data.dataElementId,
        category_combo: data.categoryId,
        dataType: 'aggregate',
        data_name: data.name,
        data_id: data.id
      };
    } else if (this.dataType === 'programs') {
      menu = <UssdMenu>{
        ...this.menu,
        title: data.name,
        data_element: data.id,
        program: this.selectedProgram,
        program_stage: this.selected_group.id,
        dataType: 'tracker',
        data_name: data.name,
        data_id: data.id
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
