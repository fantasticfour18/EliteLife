import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { ApiService } from '../api.service';
import { HTTP } from '@ionic-native/http/ngx/index';
import { NavController ,AlertController} from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-card-inside',
  templateUrl: './card-inside.page.html',
  styleUrls: ['./card-inside.page.scss'],
})
export class CardInsidePage implements OnInit {
  postDetail;
  postId;

  constructor(
    public api:ApiService,
    public httpCordova:HTTP,
    public navCtrl:NavController,
    public alertCtrl:AlertController,
    public route: ActivatedRoute,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.route.queryParams.subscribe((params) => {
      if (params && params.id) {
        this.postId= params.id
       this.getDetail(params.id)
      }
    });
  }
  getDetail(id){
    var url = 'https://www.elitelife.com.au/getdata.php?type=post_detail&post_id='+id
     this.api.getData(url).subscribe(res =>{
      console.log('res',res)
      this.postDetail = res[0]
    })
    return
    /* this.httpCordova.get(url,{},{}).then(data =>{
     console.log(JSON.parse(data.data))
      this.api.dismissLoading()
      var  postDetail = JSON.parse(data.data)
      this.postDetail = postDetail[0]
    }).catch(err =>{
      this.api.dismissLoading()
      this.api.presentAlert()
      console.log('err',err)
    }) */
  }
}
