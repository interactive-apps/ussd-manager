import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MenuComponent } from './menu.component';
import {FilterPipe} from './filter.pipe';
import {FormsModule} from '@angular/forms';
import {MenuService} from './menu.service';

@NgModule({ declarations: [MenuComponent, FilterPipe],
    exports: [MenuComponent], imports: [CommonModule,
        FormsModule], providers: [MenuService, provideHttpClient(withInterceptorsFromDi())] })
export class MenuModule { }
