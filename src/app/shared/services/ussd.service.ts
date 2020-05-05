import { Injectable } from "@angular/core";
import { UssdMenu } from "../models/menu";
import { Setting } from "../models/settings";
import { Ussd } from "../models/ussd";
import { AddUssd, DoneLoadingUssds } from "../../store/actions/ussd.actions";
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";
import { ApplicationState } from "../../store/reducers/index";
import { HttpClientService } from "./http-client.service";
import { DataSet } from "../models/dataSet";
import { Program } from "../models/program";
import { DataElement } from "../models/dataElement";
import { AddDataelements } from "../../store/actions/dataelement.actions";
import { AddDatasets } from "../../store/actions/dataset.actions";
import { LoadPrograms } from "../../store/actions/program.actions";
import { AddTrackedEntityTypes } from "../../store/actions/trackedentitytype.actions";

@Injectable()
export class UssdService {
  _ussds: Ussd[] = [];
  _datasets: DataSet[] = [];
  _programs: Program[] = [];
  _dataelements: DataElement[] = [];
  _trackedEntityTypes: any = [];

  trackedEntityTypesUrl =
    "trackedEntityTypes.json?fields=id,name,trackedEntityTypeAttributes[id,name]&paging=false";
  datasetUrl =
    "dataSets.json?fields=id,name,periodType,dataSetElements[dataElement[id,name,shortName,displayName,valueType,optionSet[id,name,options[id,name]],categoryCombo[id,name,categoryOptionCombos[id,name]]]]&paging=false";
  programUrl =
    "programs.json?fields=id,name,displayName,programStages[id,name,programStageDataElements[dataElement[id,name,shortName,displayName,valueType,optionSet[id,name,options[id,name,code]]]]]&paging=false";

  constructor(
    private store: Store<ApplicationState>,
    private http: HttpClientService
  ) {}

  // generate a random list of Id for use as scorecard id
  makeid(): string {
    let text = "";
    const possible_combinations =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 31; i++) {
      text += possible_combinations.charAt(
        Math.floor(Math.random() * possible_combinations.length)
      );
    }
    return text;
  }

  make_session_id(): string {
    let text = "";
    const possible_combinations = "123456789";
    for (let i = 0; i < 9; i++) {
      text += possible_combinations.charAt(
        Math.floor(Math.random() * possible_combinations.length)
      );
    }
    return text;
  }

  loadAll(): Observable<any> {
    return this.http.get("dataStore/ussd");
  }

  getEmptyUssdConfiguration(id: string) {
    const menuId = this.makeid();
    const inititialSettings = this.getStartingSettings(id);
    inititialSettings.starting_menu = menuId;
    const menus: UssdMenu = {
      id: menuId,
      title: "Untitled menu",
      type: "",
      options: [],
      previous_menu: "",
      data_id: "",
      next_menu: "",
      dataType: "",
      data_name: "",
      auth_key: "",
      fail_message: "",
      retry_message: ""
    };
    const menuObject = {};
    menuObject[menuId] = menus;
    return {
      id: id,
      menus: menuObject,
      settings: inititialSettings
    };
  }

  load(id: string): Observable<any> {
    return this.http.get(`dataStore/ussd/${id}`);
  }

  getAllUssds() {
    if (this._ussds.length !== 0) {
      this.store.dispatch(new DoneLoadingUssds());
    } else {
      this.loadAll().subscribe(
        ussds => {
          let ussd_count = 0;
          ussds.forEach(ussd_key => {
            // loading ussd details
            this.load(ussd_key).subscribe(
              ussd_details => {
                ussd_count++;
                const ussd: Ussd = {
                  id: ussd_details.id,
                  settings: ussd_details.settings,
                  menus: ussd_details.menus
                };
                this._ussds.push(ussd);
                this.store.dispatch(new AddUssd({ ussd }));
                if (ussd_count === ussds.length) {
                  this.store.dispatch(new DoneLoadingUssds());
                }
              },
              // catch error if anything happens when loading ussd details
              () => {
                ussd_count++;
                if (ussd_count === ussds.length) {
                  this.store.dispatch(new DoneLoadingUssds());
                }
              }
            );
          });
        },
        // catch error when there is no ussd setupd
        errorResponse => {
          const { error } = errorResponse;
          if (error && error.httpStatusCode && error.httpStatusCode === 404) {
            const id = this.makeid();
            const data = this.getEmptyUssdConfiguration(id);
            data.settings.dataStoreKey = "idsr";
            const ussd: Ussd = {
              id: id,
              settings: data.settings,
              menus: data.menus
            };
            this._ussds.push(ussd);
            this.store.dispatch(new AddUssd({ ussd }));
            this.store.dispatch(new DoneLoadingUssds());
          } else {
            this.store.dispatch(new DoneLoadingUssds());
          }
        }
      );
    }
  }

  getMetaData() {
    // get the datasets and its metadata
    if (this._datasets.length === 0) {
      this.http.get(this.datasetUrl).subscribe(
        data => {
          data.dataSets.forEach((dataset: any) => {
            this._datasets.push({
              id: dataset.id,
              name: dataset.name,
              periodType: dataset.periodType,
              dataElementsIds: dataset.dataSetElements.map(
                (dataSetElement: any) => dataSetElement.dataElement.id
              )
            });
            this._dataelements.push(
              ...dataset.dataSetElements.map((dataSetElement: any) => {
                const { dataElement } = dataSetElement;
                const {
                  id,
                  valueType,
                  name,
                  displayName,
                  shortName,
                  optionSet,
                  categoryCombo
                } = dataElement;
                return <DataElement>{
                  id,
                  valueType,
                  name,
                  displayName,
                  shortName,
                  categoryCombo,
                  optionSet: optionSet ? optionSet.options : []
                };
              })
            );
          });
          this.store.dispatch(
            new AddDataelements({ dataelements: this._dataelements })
          );
          this.store.dispatch(new AddDatasets({ datasets: this._datasets }));
        },
        error => {
          console.log(error);
        }
      );
    }
    // get programs and its metadata
    if (this._programs.length === 0) {
      this.http.get(this.programUrl).subscribe(data => {
        const dataelements: DataElement[] = [];
        data.programs.forEach((program: any) => {
          this._programs.push({
            id: program.id,
            name: program.name,
            displayName: program.displayName,
            programStages: program.programStages.map((programStage: any) => {
              const { id, name, programStageDataElements } = programStage;
              return {
                id,
                name,
                dataElementIds: programStageDataElements.map(
                  (programStageDataElement: any) =>
                    programStageDataElement.dataElement.id
                )
              };
            })
          });
          program.programStages.forEach((programStage: any) => {
            dataelements.push(
              ...programStage.programStageDataElements.map(
                (programStageDataElement: any) => {
                  const { dataElement } = programStageDataElement;
                  const {
                    id,
                    valueType,
                    name,
                    shortName,
                    displayName,
                    optionSet
                  } = dataElement;
                  return <DataElement>{
                    id,
                    valueType,
                    name,
                    shortName,
                    displayName,
                    optionSets:
                      optionSet && optionSet.options ? optionSet.options : []
                  };
                }
              )
            );
          });
        });
        this.store.dispatch(new LoadPrograms({ programs: this._programs }));
        this.store.dispatch(new AddDataelements({ dataelements }));
      });
    }

    if (this._trackedEntityTypes.length === 0) {
      this.http.get(this.trackedEntityTypesUrl).subscribe(data => {
        this.store.dispatch(
          new AddTrackedEntityTypes({
            trackedEntityTypes: data.trackedEntityTypes
          })
        );
      });
    }
  }

  getStartingSettings(id: string): Setting {
    return {
      id: id,
      name: "Untitled Ussd",
      description: "",
      session_key: "sessionid",
      user_response: "USSDRequest",
      dataStoreKey: "",
      request_type: {
        key: "USSDType",
        first_request: "NR",
        Continue_request: "CR",
        terminated_by_provider: "UC",
        timed_out: "T"
      },
      phone_number_key: "msisdn",
      no_user_message: "This phone number has no associated user",
      starting_menu: ""
    };
  }

  getStartingMenu(id: string, ussdId: string): any {
    return {
      id: id,
      ussdId: ussdId,
      title: "",
      accept_input: false,
      is_last_menu: false,
      has_options: false,
      options: [],
      collect_data: false,
      data_element: "",
      category_combo: "",
      authentication: false,
      authentication_value: "",
      authentication_field: "",
      is_period_filter: false,
      period_type: "",
      use_for_year: false,
      possible_period_values: "",
      next_menu: ""
    };
  }
}
