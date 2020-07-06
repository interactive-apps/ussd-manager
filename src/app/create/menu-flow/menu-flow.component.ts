import { Component, OnInit, Input } from "@angular/core";
import * as _ from "lodash";
import * as go from "gojs";

@Component({
  selector: "menu-flow",
  templateUrl: "./menu-flow.component.html",
  styleUrls: ["./menu-flow.component.css"]
})
export class MenuFlowComponent implements OnInit {
  constructor() {}

  @Input() allMenus: any[];

  public selectedNode = null;
  public model: go.TreeModel;

  flowArray: any[] = [];

  ngOnInit(): void {
    //process all menus
    _.each(this.allMenus, menuJson => {
      let menu = {
        key: menuJson["id"],
        name: menuJson["title"]
      };

      menuJson["previous_menu"]
        ? (menu["parent"] = menuJson["previous_menu"])
        : "";

      this.flowArray.push(menu);
    });

    console.log(this.flowArray);

    this.model = new go.TreeModel(this.flowArray);
  }

  public setSelectedNode(node) {
    this.selectedNode = node;
  }
}
