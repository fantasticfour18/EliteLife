import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardInsidePage } from './card-inside.page';

const routes: Routes = [
  {
    path: '',
    component: CardInsidePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardInsidePageRoutingModule {}
