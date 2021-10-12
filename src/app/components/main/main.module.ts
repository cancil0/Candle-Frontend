import { NgModule } from '@angular/core';
import { MainComponent } from './main/main.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from 'src/app/modules/material.module';
import { MainCenterComponent } from './main-center/main-center.component';
import { MainLeftComponent } from './main-left/main-left.component';
import { DiscoverComponent } from './discover/discover.component';
import { ProfileComponent } from './profile/profile.component';
import { ShareBoxComponent } from './share-box/share-box.component';


const routes: Routes = [
  {path: 'main', component: MainComponent},
  {path: 'discover', component: DiscoverComponent},
  {path: 'profile', component: ProfileComponent}
];

@NgModule({
  declarations: [
    MainComponent,
    MainCenterComponent,
    MainLeftComponent,
    DiscoverComponent,
    ProfileComponent,
    ShareBoxComponent
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
