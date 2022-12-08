import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginwithemailPageRoutingModule } from './loginwithemail-routing.module';

import { LoginwithemailPage } from './loginwithemail.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginwithemailPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [LoginwithemailPage]
})
export class LoginwithemailPageModule {}
