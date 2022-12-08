import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { HTTP } from '@ionic-native/http/ngx/index';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  allPost
  q
  spinnerLoader = false
  constructor(
    public navCtrl:NavController,
    public api:ApiService,
    public httpCordova:HTTP
  ) { 
  }
  ionViewWillEnter(){
  }
  ngOnInit() {
  }
  search(){
    setTimeout(() => {
      this.spinnerLoader = true
          this.api.getData('https://elitelife.com.au/getdata.php?type=search&keyword='+this.q).subscribe(res =>{
            this.spinnerLoader = false
            this.allPost = res
            console.log(res)
    },err =>{
      this.spinnerLoader = false
      this.api.dismissLoading()
      console.log('err',err)
    })
    return
      this.httpCordova.get('https://elitelife.com.au/getdata.php?type=search&keyword='+this.q,{},{}).then(data =>{
        this.spinnerLoader = false
        console.log(JSON.parse(data.data))
        this.allPost = JSON.parse(data.data)
      
      }).catch(err =>{
         this.spinnerLoader = false
        this.api.dismissLoading()
        console.log('err',err)
      })
    }, 500);
  }
  gotode(id){
    console.log(id)
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: id,
      }
    };
    this.navCtrl.navigateForward(['/tabs/main/cardinside'], navigationExtras);
  }
}
