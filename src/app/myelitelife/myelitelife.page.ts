import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { HTTP } from '@ionic-native/http/ngx/index';
@Component({
  selector: 'app-myelitelife',
  templateUrl: './myelitelife.page.html',
  styleUrls: ['./myelitelife.page.scss'],
})
export class MyelitelifePage implements OnInit {
  notifi_email = false;
  el_magazine = false;
  constructor(
    public navCtrl:NavController,
    public api:ApiService,
    public httpCordova:HTTP,
  ) { 
    // this.api.showLoader()
  }

  ngOnInit() {
  }
  ionViewWillEnter(){

    if(localStorage.getItem('setiing')){
      var data =  JSON.parse(localStorage.getItem('setiing'))
      this.el_magazine = data.magzine
      this.notifi_email = data.notify
    }
  }

  sendDetail(){
        const option ={
          magzine:this.el_magazine,
          notify:this.notifi_email
        }
        localStorage.setItem('setiing',JSON.stringify(option))
         this.api.getData('https://www.elitelife.com.au/getdata.php?type=user_app_setting&user_id='+localStorage.getItem('user')+'&el_magazine='+this.el_magazine+'&notifi_email='+this.notifi_email).subscribe(res =>{
          console.log('res',res)
        })
    return
    this.httpCordova.get('https://www.elitelife.com.au/getdata.php?type=user_app_setting&&user_id='+localStorage.getItem('user')+'&el_magazine='+this.el_magazine+'&notifi_email='+this.notifi_email,{},{}).then(res =>{
      console.log(JSON.parse(res.data))
      // this.contant = JSON.parse(res.data)
      this.api.dismissLoading()
    }).catch(err =>{
      this.api.dismissLoading()
      console.log('err',err)
    })
  }

}
