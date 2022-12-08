import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { HTTP } from '@ionic-native/http/ngx/index';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-contactform',
  templateUrl: './contactform.page.html',
  styleUrls: ['./contactform.page.scss'],
})
export class ContactformPage implements OnInit {
  contact: FormGroup;
  postId
  constructor(
    public navCtrl:NavController,
    public httpCordova:HTTP,
    public api:ApiService,
    public route: ActivatedRoute,
  ) { 
    this.contact = new FormGroup({
      'message': new FormControl('',Validators.required)
    })
    this.postId = this.route.snapshot.parent.paramMap.get('id');

  }

  ngOnInit() {
  }
  ionViewWillEnter(){
  }
  sendmsg(val){
    this.api.showLoader()
    var url = 'user_id='+localStorage.getItem('user')+'&post_id='+this.postId+'&message='+val.message
        this.api.getData('https://elitelife.com.au/getdata.php?type=chat_request&'+url).subscribe(res =>{
      console.log('res',res)
      if(res['msg'] == 'Email sent Successfully'){
        this.api.dismissLoading()
        this.api.presentAlert(res['msg'])
        this.navCtrl.back()
      }else{
        this.api.dismissLoading()
        this.api.presentAlert(res['msg'])
      }
    })
    return
    this.httpCordova.post('https://elitelife.com.au/getdata.php?type=chat_request&'+url,{},{}).then(data =>{
      console.log(data)
      this.api.dismissLoading()
      var res = JSON.parse(data.data)
      if(res['msg'] == 'Email sent Successfully'){
        this.api.dismissLoading()
        this.api.presentAlert(res['msg'])
      }else{
        this.api.dismissLoading()
        this.api.presentAlert()
      }
    }).catch(err =>{
      this.api.dismissLoading()
      this.api.presentAlert()
      console.log('err',err)
    })
  }
}
