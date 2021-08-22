import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from 'src/app/modules/material.module';

import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';


const routes: Routes = [];

@NgModule({
    declarations: [
        NavbarComponent,
        SidebarComponent,
    ],
    imports: [
        RouterModule.forChild(routes),
        TranslateModule.forChild(),
        BrowserModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: []
})
export class BasicModule { }
