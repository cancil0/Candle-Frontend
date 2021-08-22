import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from 'src/app/modules/material.module';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'login/signup', component: SignupComponent }
];

@NgModule({
    declarations: [
        LoginComponent,
        SignupComponent
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
export class LoginModule { }
