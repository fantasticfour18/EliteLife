import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { ApiService } from '../api.service';
import { HTTP } from '@ionic-native/http/ngx/index';
import { NavController ,AlertController} from '@ionic/angular';

@Component({
  selector: 'app-loginwithemail',
  templateUrl: './loginwithemail.page.html',
  styleUrls: ['./loginwithemail.page.scss'],
})
export class LoginwithemailPage implements OnInit {
  loginbyemail: FormGroup;

  constructor(
    public api:ApiService,
    public httpCordova:HTTP,
    public navCtrl:NavController,
    public alertCtrl:AlertController
  ) { 
    this.loginbyemail = new FormGroup({
      'username': new FormControl('',Validators.required),
      'password': new FormControl('',Validators.required)

    })
  }

  ngOnInit() {
  }
  login(data){
    this.api.showLoader()
    
    // var url = 'https://elitelife.com.au/getdata.php?type=login&username=testapi&password=Google@!123'
    var url = 'https://elitelife.com.au/getdata.php?type=login&username='+data.username+'&password='+data.password
     this.api.getData(url).subscribe(res =>{
      console.log('res',res)
      var data2:any = res
      if(data2.msg == 'Login error'){
      this.api.presentAlert(data2.msg)
      }else{
        localStorage.setItem('user',data2.user_id)
        this.api.dismissLoading()
        this.navCtrl.navigateForward('tabs/main')
      }
    },err =>{
      this.api.dismissLoading()
      this.api.presentAlert()
      console.log('err',err)
    })
    return
    this.httpCordova.get(url,{},{}).then(res =>{
      this.api.dismissLoading()
      console.log(res)
      var data2 = JSON.parse(res.data)
      if(data2.msg == 'Login error'){
      this.api.presentAlert(data2.msg)
      }else{
        localStorage.setItem('user',data.user_id)
        this.api.dismissLoading()
        this.navCtrl.navigateForward('tabs/main')

      }
    }).catch(err =>{
      this.api.dismissLoading()
      this.api.presentAlert()
      console.log('err',err)
    })
  }
}
