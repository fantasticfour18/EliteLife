import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { HTTP } from '@ionic-native/http/ngx/index';
import { BehaviorSubject } from 'rxjs';
let apiURL = 'https://elitelife.com.au/';
@Injectable({
  providedIn: 'root'
})

export class ApiService {
  loading
  pushChange: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  pushChange$ = this.pushChange.asObservable();
  
  constructor(
    public http: HttpClient,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public toastController:ToastController,
    public platform: Platform,
    public httpCordova:HTTP
    )  {
     }
  async presentAlert(msg: string = '') {
  if(msg == '' || msg ==null || msg == undefined){
    msg = 'Something Went Wrong'
  }
  let alert = await this.alertCtrl.create({
    // header: 'Alert',
    message: msg,
    buttons: [{
      text: 'OK',
      handler: () => {

      }
    }]
  })
  await alert.present();
  }
  async dismissLoading() {
    if(this.loading){
      await this.loading.dismiss();
    }
  }
  async showLoader(msg: string = '') {
    if (msg == '') {
      msg = 'Please wait...';
    }
    this.loading = await this.loadingCtrl.create({ message: msg });
    await this.loading.present();
  }
  async presentToast(msg: string = '') {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      position:'bottom'
    });
    toast.present();
  }
    getData(endPoint) {
    //   this.httpCordova.sendRequest(apiURL + endPoint,
    //   {
    //     method: 'get',
    //     data: {},
    //     headers: { Authorization: 'OAuth2: token' },
    //     timeout: 5000
    //   }
    // )
    //   .then(response => {
    //     // prints 200
    //     console.log(response);
    //   })
    //   .catch(response => {
    //     // prints 403
    //     console.log('catch',response);

    //     // prints Permission denied
    //     console.log('catch err',response);
    //   });
      // if(this.platform.is('cordova')){
        // return this.httpCordova.get(apiURL + endPoint, data,{headers:{
        //   'Access-Control-Allow-Origin': '*'
        // }})
      // }else{
        return this.http.get(endPoint)
  }
  sendData(endPoint, data) {
    if(this.platform.is('cordova')){
      return this.httpCordova.post(apiURL + endPoint, data,{headers:{
        'Access-Control-Allow-Origin': '*',
      }})
    }else{
      return this.http.post(apiURL + endPoint, data)
    }
  }

  navigateToOffer() {
    this.pushChange.next({});
  }
}
