import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { ApiService } from '../api.service';
import { HTTP } from '@ionic-native/http/ngx/index';
import { NavController ,AlertController} from '@ionic/angular';
import { FirebaseMessaging } from '@ionic-native/firebase-messaging/ngx';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profile
  firstAmount: any = 0;
  secAmount: any = 0;
  constructor(
    public api:ApiService,
    public httpCordova:HTTP,
    public navCtrl:NavController,
    public alertCtrl:AlertController,
    public firebaseMessaging:FirebaseMessaging
  ) { 
    this.api.showLoader()
  }

  ngOnInit() {
    this.getProfile()
  }
  getProfile(){
    var url = 'https://www.elitelife.com.au/getdata.php?type=profile&user_id='+localStorage.getItem('user')
     this.api.getData(url).subscribe(res =>{
      this.api.dismissLoading()
      console.log('res',res)
      this.profile = res
      if(this.profile.balance){
        var statementBal = this.profile.balance.split('.')
        this.firstAmount = statementBal[0]
        this.secAmount = statementBal[1]
      }
    })
    return
    this.httpCordova.get(url,{},{}).then(data =>{
      console.log(data)
      this.api.dismissLoading()
      var res = JSON.parse(data.data)
      this.profile = res
      if(this.profile.balance){
        var statementBal = this.profile.balance.split('.')
        this.firstAmount = statementBal[0]
        this.secAmount = statementBal[1]
      }
   
    }).catch(err =>{
      this.api.dismissLoading()
      this.api.presentAlert()
      console.log('err',err)
    })
  }
  logout(){
    localStorage.clear();
    this.navCtrl.navigateForward('login');
    //this.firebaseMessaging.deleteToken()
  }
}
