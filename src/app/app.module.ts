import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { HTTP } from '@ionic-native/http/ngx/index';
import { FirebaseMessaging } from '@ionic-native/firebase-messaging/ngx';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';

@NgModule({
  declarations: [
    AppComponent,
  ],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    HTTP,
    FirebaseMessaging,
    FCM,
    { 
    provide: RouteReuseStrategy, 
    useClass: IonicRouteStrategy ,
  }],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule {}
