import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { ApiService } from '../api.service';
import { HTTP } from '@ionic-native/http/ngx/index';
import { NavController ,AlertController} from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginbynumber: FormGroup;
  loginField = false
  verifybynumber:FormGroup
  number = Number
  constructor(
    private api:ApiService,
    public httpCordova:HTTP,
    public navCtrl:NavController,
    public alertCtrl:AlertController
  ) {
    this.loginbynumber = new FormGroup({
      'number': new FormControl('',Validators.required)
    })
    this.verifybynumber = new FormGroup({
      'otp': new FormControl('',Validators.required)
    })
   }

  ngOnInit() {
  }
  save(){
  }
  login(data){
    localStorage.setItem('number',data.number)
    this.api.showLoader()
    const option ={
      type:'phone',
      number:'+61'+data.number,
      country_code:'61'
    }
    this.api.getData('https://elitelife.com.au/getdata.php?type=phone&number='+data.number+'&country_code=61').subscribe(res =>{
      this.api.dismissLoading()
      var data2:any = res
      if(data2.msg == 'Number not registerd'){
        this.api.presentAlert(data2.msg)
        }else if(data2.msg == 'Phone number is invalid'){
        this.api.presentAlert(data2.msg)
        }else if(data2.success == false){
          this.api.presentAlert(data2.userMessage)
        }else{
        this.loginField = true
        }
      console.log('res',res)
    },err =>{
      this.api.dismissLoading()
      this.api.presentAlert(err)
      console.log('err',err)
    })
    return
    this.httpCordova.get('https://elitelife.com.au/getdata.php?type=phone&number='+data.number+'&country_code=61',{},{}).then(res =>{
      this.api.dismissLoading()
      console.log(res)
      var data2 = JSON.parse(res.data)
      if(data2.msg == 'Number not registerd'){
      this.api.presentAlert(data2.msg)
      }else if(data2.msg == 'Phone number is invalid'){
      this.api.presentAlert(data2.msg)
      }else if(data2.success == false){
        this.api.presentAlert(data2.userMessage)
      }else{
      this.loginField = true
      }
    }).catch(err =>{
      this.api.dismissLoading()
      this.api.presentAlert()
      console.log('err',err)
    })
  }
  async presentAlertInput() {
    let alert = await this.alertCtrl.create({
      backdropDismiss: false,
      inputs: [
        {
          name: 'OTP',
          placeholder: 'OTP',
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {

          }
        },
        {
          text: 'Verify',
          handler: data => {
              this.verify(data)
          }
        },
      ]
    });
    await alert.present();
  }
  verify(data){
    this.api.showLoader()
    const option = {
      type:'phone',
      number:'+61'+localStorage.getItem('number'),
      country_code:'61',
      otp:data.otp
    }
    this.api.getData('https://elitelife.com.au/getdata.php?type=verify&number='+localStorage.getItem('number')+'&country_code=61&otp='+data.otp).subscribe(res =>{
      this.api.dismissLoading()
      var res2:any = res
      console.log('res',res)
      if(res2 && res2.user_id){
        localStorage.setItem('user',res['user_id'])
        this.loginField = false
        this.api.dismissLoading()
        this.navCtrl.navigateForward('tabs/main')
      }else{
        this.api.dismissLoading()
        this.api.presentAlert(res2.userMessage)
      }
    },err =>{
      this.api.dismissLoading()
      this.api.presentAlert(err)
      console.log('err',err)
    })
    return
    this.httpCordova.get('https://elitelife.com.au/getdata.php?type=verify&number='+localStorage.getItem('number')+'&country_code=61&otp='+data.otp,{},{}).then(res =>{
      console.log(res)
      var res2 = JSON.parse(res.data)
      console.log(res2)
      if(res2.invalidOtp == false){
        localStorage.setItem('user','1')
        this.loginField = false
        this.api.dismissLoading()
        this.navCtrl.navigateForward('tabs/main')
      }else{
        this.api.dismissLoading()
        this.api.presentAlert(res2.userMessage)
      }
    }).catch(err =>{
      this.api.dismissLoading()
      this.api.presentAlert()
      console.log('err',err)
    })
  }
  loginFieldShow(){
    this.loginField = false
  }
}
