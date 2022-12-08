import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactformPage } from './contactform.page';

const routes: Routes = [
  {
    path: '',
    component: ContactformPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactformPageRoutingModule {}
