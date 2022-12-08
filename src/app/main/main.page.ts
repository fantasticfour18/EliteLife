import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { HTTP } from '@ionic-native/http/ngx/index';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  category;
  allPost;
  allCategory;
  navExtras: any;

  constructor(
    public navCtrl:NavController,
    public api:ApiService,
    public httpCordova:HTTP,
    public ref: ChangeDetectorRef,
  ) 
  {}

  ngOnInit() {
    this.navigateToOffer();
  }

  navigateToOffer() {
    this.api.pushChange$.subscribe(() => {
      this.navExtras = JSON.parse(localStorage.getItem('onTapNavigate'));
      if(this.navExtras) 
      {
        localStorage.removeItem('onTapNavigate');
        this.navCtrl.navigateForward('tabs/main');
        this.navCtrl.navigateForward(['/tabs/main/cardinside'], this.navExtras);
      }
    });
  }

  ionViewWillEnter(){
    this.getCategory()
    this.getAllPost(11)
  }
  getallCategorypost(){
    this.api.getData('https://elitelife.com.au/getdata.php?type=getallpost').subscribe(res =>{
      this.allPost = res
      this.api.dismissLoading()
      this.ref.detectChanges()

      // console.log(res)
    })
    return
    this.httpCordova.get('https://elitelife.com.au/getdata.php?type=getallpost',{},{}).then(res =>{
      console.log(res)
      this.api.dismissLoading()
      this.allPost = JSON.parse(res.data)
    }).catch(err =>{
      this.api.dismissLoading()
      console.log('err',err)
    })
  }
  getCategory(){
    this.api.getData('https://elitelife.com.au/getdata.php?type=categories').subscribe(res =>{
      this.category = res
      this.ref.detectChanges()
      // console.log(res)
    })
    return
    this.httpCordova.get('https://elitelife.com.au/getdata.php?type=categories',{},{}).then(res =>{
      console.log(res)
      this.api.dismissLoading()
      this.category = JSON.parse(res.data)
    }).catch(err =>{
      this.api.dismissLoading()
      console.log('err',err)
    })
  }
  getAllPost(val){
    this.api.showLoader()
    if(val == 11){
        this.getallCategorypost()
    }else{
      this.api.getData('https://elitelife.com.au/getdata.php?type=getcatpost&cat_id='+val).subscribe(res =>{
        this.api.dismissLoading()
        this.allPost = res
      this.ref.detectChanges()

      })
    }
    return
    this.httpCordova.get('https://elitelife.com.au/getdata.php?type=getcatpost&cat_id='+val,{},{}).then(data =>{
      this.api.dismissLoading()
      this.allPost = JSON.parse(data.data)
      console.log(this.allPost)
    }).catch(err =>{
      this.api.dismissLoading()
      console.log('err',err)
    })
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
