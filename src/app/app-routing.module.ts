import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BasicModule } from './components/basic/basic.module';
import { LoginModule } from './components/login/login.module';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    LoginModule,
    BasicModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
