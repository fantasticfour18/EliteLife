import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrmcndtPage } from './trmcndt.page';

const routes: Routes = [
  {
    path: '',
    component: TrmcndtPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrmcndtPageRoutingModule {}
