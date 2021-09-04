import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from 'src/app/modules/material.module';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgotpassword/forgotpassword.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'login/signup', component: SignupComponent },
    { path: 'login/forgot-password', component: ForgotPasswordComponent }
];

@NgModule({
    declarations: [
        LoginComponent,
        SignupComponent,
        ForgotPasswordComponent
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
