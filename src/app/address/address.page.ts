import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { HTTP } from '@ionic-native/http/ngx/index';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit {
  showDiv = false
  deliveryForm: FormGroup;
  billingForm: FormGroup;

  constructor(
    public navCtrl:NavController,
    public httpCordova:HTTP,
    public api:ApiService,
    private cd: ChangeDetectorRef
  ) 
  { 
    this.deliveryForm = new FormGroup({
      'delivery_address_1': new FormControl('',Validators.required),
      'delivery_city': new FormControl('',Validators.required),
      'delivery_state': new FormControl('',Validators.required),
      'delivery_area_code': new FormControl('',Validators.required),
      'delivery_country': new FormControl('',Validators.required),
    })

    this.billingForm = new FormGroup({
      'billing_address_1': new FormControl('',Validators.required),
      'billing_city': new FormControl('',Validators.required),
      'billing_state': new FormControl('',Validators.required),
      'billing_area_code': new FormControl('',Validators.required),
      'billing_country': new FormControl('',Validators.required),
    })
  }

  ngOnInit() {
  }

  change(ev) 
  {
    this.showDiv = ev.target.checked;
    this.cd.detectChanges();
  }

  ionViewWillEnter() {
    this.getAddress();
  }

  getAddress()
  {
    this.api.showLoader();
    this.api.getData('https://elitelife.com.au/getdata.php?type=getaddress&user_id='+localStorage.getItem('user')).subscribe(res =>{
      console.log('res',res)
     
      if(res['billing_address'] == res['delivery_address'] &&
        res['billing_city'] == res['delivery_city'] &&
        res['billing_state1'] == res['delivery_state'] &&
        res['billing_area_code'] == res['delivery_area_code'])
      {
        var check = document.getElementById('checkboxadd')
        check['checked'] = true
        
        console.log(document.getElementById('checkboxadd'));
      }

      this.deliveryForm.patchValue({
        'delivery_address_1': res['delivery_address'],
        'delivery_city': res['delivery_city'],
        'delivery_state': res['delivery_state'],
        'delivery_area_code': res['delivery_area_code'],
        'delivery_country': res['delivery_country'],
      });

      this.billingForm.patchValue({
        'billing_address_1': res['billing_address'],
        'billing_city': res['billing_city'],
        'billing_state': res['billing_state1'],
        'billing_area_code': res['billing_area_code'],
        'billing_country': res['billing_country'],
      });

      this.api.dismissLoading();
      
    })
  }

  updateAdd()
  {
    this.api.showLoader();
    if(this.showDiv){
      console.log('1')
      var option ={
        'delivery_address_1': this.deliveryForm.value.delivery_address_1,
        'delivery_city': this.deliveryForm.value.delivery_city,
        'delivery_state': this.deliveryForm.value.delivery_state,
        'delivery_area_code': this.deliveryForm.value.delivery_area_code,
        'delivery_country': this.deliveryForm.value.delivery_country,
        'billing_address_1': this.deliveryForm.value.delivery_address_1,
        'billing_city': this.deliveryForm.value.delivery_city,
        'billing_state': this.deliveryForm.value.delivery_state,
        'billing_area_code': this.deliveryForm.value.delivery_area_code,
        'billing_country': this.deliveryForm.value.delivery_country,
      }
    }else
    {
      console.log('2')
      var option ={
        'delivery_address_1': this.deliveryForm.value.delivery_address_1,
        'delivery_city': this.deliveryForm.value.delivery_city,
        'delivery_state': this.deliveryForm.value.delivery_state,
        'delivery_area_code': this.deliveryForm.value.delivery_area_code,
        'delivery_country': this.deliveryForm.value.delivery_country,
        'billing_address_1': this.billingForm.value.billing_address_1,
        'billing_city': this.billingForm.value.billing_city,
        'billing_state': this.billingForm.value.billing_state,
        'billing_area_code': this.billingForm.value.billing_area_code,
        'billing_country': this.billingForm.value.billing_country,
      }
    }

    if(this.showDiv){
      var data = '&user_id='+localStorage.getItem('user')+'&delivery_address_1='+option.delivery_address_1+'&delivery_city='+option.delivery_city+'&delivery_state='+option.delivery_state+'&delivery_area_code='+option.delivery_area_code+'&delivery_country='+option.delivery_country+'&billing_address_1='+option.delivery_address_1+'&billing_city='+option.delivery_city+'&billing_state='+option.delivery_state+'&billing_area_code='+option.delivery_area_code+'&billing_country='+option.delivery_country
    }else{
      var data = '&user_id='+localStorage.getItem('user')+'&delivery_address_1='+option.delivery_address_1+'&delivery_city='+option.delivery_city+'&delivery_state='+option.delivery_state+'&delivery_area_code='+option.delivery_area_code+'&delivery_country='+option.delivery_country+'&billing_address_1='+option.billing_address_1+'&billing_city='+option.billing_city+'&billing_state='+option.billing_state+'&billing_area_code='+option.billing_area_code+'&billing_country='+option.billing_country
    }
   this.api.getData('https://elitelife.com.au/getdata.php?type=address'+data).subscribe(res =>{
    console.log('res',res)
    this.api.dismissLoading();
    this.api.presentAlert(res['msg']);
    }
  )
  
  }


}
