import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxPaginationModule } from 'ngx-pagination';
import { DndModule } from 'ng2-dnd';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { services } from './shared/services/index';
import {
  RouterStateSerializer,
  StoreRouterConnectingModule, DefaultRouterStateSerializer
} from '@ngrx/router-store';
import { CustomSerializer } from './store/reducers/router.reducer';
import { AppRoutingModule } from './app-routing.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { effects } from './store/effects/index';
import { EffectsModule } from '@ngrx/effects';
import { metaReducers, reducers } from './store/reducers/index';
import { StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuModule } from './shared/components/menu/menu.module';
import { CreateComponent } from './create/create.component';
import { BasicComponent } from './create/basic/basic.component';
import { MenuComponent } from './create/menu/menu.component';
import { MessageComponent } from './create/menu/message/message.component';
import { AuthenticationComponent } from './create/menu/authentication/authentication.component';
import { DataComponent } from './create/menu/data/data.component';
import { PeriodComponent } from './create/menu/period/period.component';
import { OptionsComponent } from './create/menu/options/options.component';
import { guards } from './guards/index';
import { FilterByNamePipe } from './shared/filter-by-name.pipe';
import { SimulateComponent } from './simulate/simulate.component';
import { DataSubmissionComponent } from './create/menu/data-submission/data-submission.component';
import { DataElementOptionsComponent } from './create/menu/data-element-options/data-element-options.component';
import { OrganisationUnitComponent } from './create/menu/organisation-unit/organisation-unit.component';
import { FlowchartComponent } from './flowchart/flowchart.component';
import { InspectorComponent } from './inspector/inspector.component';
import { MenuFlowComponent } from './create/menu-flow/menu-flow.component';

// Add a function, that returns a “TranslateHttpLoader” and export it (needed by AoT)
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateComponent,
    BasicComponent,
    MenuComponent,
    MessageComponent,
    AuthenticationComponent,
    DataComponent,
    PeriodComponent,
    OptionsComponent,
    FilterByNamePipe,
    SimulateComponent,
    DataSubmissionComponent,
    DataElementOptionsComponent,
    OrganisationUnitComponent,
    FlowchartComponent,
    InspectorComponent,
    MenuFlowComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MenuModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    DndModule.forRoot(),
    StoreModule.forRoot(reducers, { metaReducers, runtimeChecks: { strictStateImmutability: true, strictActionImmutability: true } }),
    StoreRouterConnectingModule.forRoot({ serializer: DefaultRouterStateSerializer }),
    EffectsModule.forRoot(effects),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    !environment.production
      ? StoreDevtoolsModule.instrument({ maxAge: 100 })
      : [],
    AppRoutingModule
  ],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomSerializer },
    ...services,
    ...guards
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
