import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CardInsidePageRoutingModule } from './card-inside-routing.module';

import { CardInsidePage } from './card-inside.page';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CardInsidePageRoutingModule,
    SwiperModule
  ],
  declarations: [CardInsidePage]
})
export class CardInsidePageModule {}
