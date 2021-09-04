import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from 'src/app/modules/material.module';

import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DialogComponent } from './dialog/dialog.component';
import { CapitalizeLetterPipe } from 'src/app/pipes/capitalizeletter.pipe';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';


const routes: Routes = [
    {path: '**', component: PageNotFoundComponent}
];

const _components = [
    NavbarComponent,
    SidebarComponent,
    DialogComponent,
    PageNotFoundComponent,
    CapitalizeLetterPipe
]

@NgModule({
    declarations: [
        ..._components
    ],
    imports: [
        RouterModule.forChild(routes),
        TranslateModule.forChild(),
        BrowserModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        ..._components
    ]
})
export class BasicModule { }
