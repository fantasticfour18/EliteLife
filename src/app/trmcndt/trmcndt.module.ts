import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrmcndtPageRoutingModule } from './trmcndt-routing.module';

import { TrmcndtPage } from './trmcndt.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrmcndtPageRoutingModule
  ],
  declarations: [TrmcndtPage]
})
export class TrmcndtPageModule {}
