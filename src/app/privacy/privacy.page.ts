import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { HTTP } from '@ionic-native/http/ngx/index';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.page.html',
  styleUrls: ['./privacy.page.scss'],
})
export class PrivacyPage implements OnInit {
  contant
  
  constructor(
    public navCtrl:NavController,
    public api:ApiService,
    public httpCordova:HTTP



  ) { 
    this.api.showLoader()
  }

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.getContant()
  }
  getContant(){
    const option ={
      type:'privacy',
    }
    this.httpCordova.get('https://elitelife.com.au/getdata.php?type=privacy',{},{}).then(res =>{
      this.contant = JSON.parse(res.data)
      this.api.dismissLoading()
    }).catch(err =>{
      console.log('err',err)
    })
  }
}
