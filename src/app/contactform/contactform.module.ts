import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactformPageRoutingModule } from './contactform-routing.module';

import { ContactformPage } from './contactform.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactformPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ContactformPage]
})
export class ContactformPageModule {}
