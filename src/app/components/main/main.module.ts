import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from 'src/app/modules/material.module';


const routes: Routes = [
  {path: '', component: MainComponent}
];

const _components = [
  MainComponent
]

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
