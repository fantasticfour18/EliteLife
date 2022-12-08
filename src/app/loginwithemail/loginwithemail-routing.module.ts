import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginwithemailPage } from './loginwithemail.page';

const routes: Routes = [
  {
    path: '',
    component: LoginwithemailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginwithemailPageRoutingModule {}
