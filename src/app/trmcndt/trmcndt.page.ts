import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { HTTP } from '@ionic-native/http/ngx/index';
@Component({
  selector: 'app-trmcndt',
  templateUrl: './trmcndt.page.html',
  styleUrls: ['./trmcndt.page.scss'],
})
export class TrmcndtPage implements OnInit {

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
      type:'tandc',
    }
    // this.api.getData('https://elitelife.com.au/getdata.php?type=tandc').subscribe(res =>{
    //   console.log('res',res)
    // })
    // return
    this.httpCordova.get('https://elitelife.com.au/getdata.php?type=tandc',option,{}).then(res =>{
      this.contant = JSON.parse(res.data)
      console.log(res)
      this.api.dismissLoading()
    }).catch(err =>{
      this.api.dismissLoading()
      console.log('err',err)
    })
  }
}
