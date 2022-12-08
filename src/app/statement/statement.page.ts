import { Component, OnInit } from '@angular/core';
import { LoadingController,NavController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { HTTP } from '@ionic-native/http/ngx/index';
import { NavigationExtras } from '@angular/router';
// https://www.elitelife.com.au/getdata.php?type=statement&user_id=12
@Component({
  selector: 'app-statement',
  templateUrl: './statement.page.html',
  styleUrls: ['./statement.page.scss'],
})
export class StatementPage implements OnInit {
  slideOpts = {
    slidesPerView: 1.75,
    spaceBetween: 10 
  };
  loading
  showdata =true
  allStatement :any
  constructor(
    public loadingController:LoadingController,
    public nav:NavController,
    public api:ApiService,
    public httpCordova:HTTP

  ) { }
  ionViewWillEnter(){
    this.getStatment()
  }
  ngOnInit() {
  }
  getStatment(){
    this.api.getData('https://www.elitelife.com.au/getdata.php?type=statement&user_id='+localStorage.getItem('user')).subscribe(res =>{
      console.log(res)
      this.allStatement = res
      setTimeout(() => {
      this.showclass(0)
      }, 500);
    })
    return
    this.httpCordova.get('https://www.elitelife.com.au/getdata.php?type=statement&user_id='+localStorage.getItem('user'),{},{}).then(res =>{
      console.log(res)
      this.api.dismissLoading()
      this.allStatement = JSON.parse(res.data)
      setTimeout(() => {
        this.showclass(0)
        }, 500);
    }).catch(err =>{
      this.api.dismissLoading()
      console.log('err',err)
    })
  }
  showclass(id){
    var data2 = document.getElementsByClassName('show')
    if(data2.length == 0){
      var data = document.getElementById(id)
      data.classList.toggle('show')
    }else{
      var id2 = data2[0].id
      if(id2 != id){
        var data = document.getElementById(id2)
        data.classList.toggle('show')
      }
      var data3 = document.getElementById(id)
      data3.classList.toggle('show')
    }
}
  async reload(){
    this.showdata  =false
    this.loading = await this.loadingController.create({
      message: 'Please wait...',
    })
    await this.loading.present()
    setTimeout(() => {
      this.showdata =true
    this.loading.dismiss()
    }, 1000);

  }
}
