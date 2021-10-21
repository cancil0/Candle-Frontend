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
import { LoginGuard } from 'src/app/common/guard/loginGuard';


const routes: Routes = [
  {path: 'main', component: MainComponent,canActivate: [LoginGuard]},
  {path: 'discover', component: DiscoverComponent, canActivate: [LoginGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [LoginGuard]}
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
