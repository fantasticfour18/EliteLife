import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyelitelifePageRoutingModule } from './myelitelife-routing.module';

import { MyelitelifePage } from './myelitelife.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyelitelifePageRoutingModule
  ],
  declarations: [MyelitelifePage]
})
export class MyelitelifePageModule {}
