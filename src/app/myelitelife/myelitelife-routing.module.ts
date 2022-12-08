import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyelitelifePage } from './myelitelife.page';

const routes: Routes = [
  {
    path: '',
    component: MyelitelifePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyelitelifePageRoutingModule {}
