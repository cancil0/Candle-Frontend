import { NgModule } from '@angular/core';
import { MainComponent } from './main/main.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from 'src/app/modules/material.module';
import { AuthGuard } from 'src/app/services/auth/auth.guard';


const routes: Routes = [
  {path: 'main', component: MainComponent, canActivate : [AuthGuard]}
];

@NgModule({
  declarations: [
    MainComponent
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
      MainComponent
  ]
})
export class MainModule { }
