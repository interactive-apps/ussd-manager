import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { CreateComponent } from "./create/create.component";
import { UssdExistsGuards } from "./guards/ussds.exisit";
import { SimulateComponent } from "./simulate/simulate.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    pathMatch: "full",
  },
  {
    path: "create",
    canActivate: [UssdExistsGuards],
    component: CreateComponent,
  },
  
  {
    path: "simulate/:id",
    canActivate: [UssdExistsGuards],
    component: SimulateComponent,
  },
  {
    path: "**",
    component: HomeComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
