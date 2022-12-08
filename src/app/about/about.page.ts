import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { HTTP } from '@ionic-native/http/ngx/index';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  contant
  
  constructor(
    public navCtrl:NavController,
    public api:ApiService,
    public httpCordova:HTTP,
  ) { 
    this.api.showLoader()
  }

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.getContant()
  }
  getContant(){
    this.api.getData('https://elitelife.com.au/getdata.php?type=aboutus').subscribe(res =>{
      this.api.dismissLoading()
      this.contant = res
    })
    return
    this.httpCordova.get('https://elitelife.com.au/getdata.php?type=aboutus',{},{}).then(res =>{
      console.log(JSON.parse(res.data))
      this.contant = JSON.parse(res.data)
      this.api.dismissLoading()
    }).catch(err =>{
      this.api.dismissLoading()
      console.log('err',err)
    })
  }

}
