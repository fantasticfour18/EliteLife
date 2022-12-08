import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  adminval;
  constructor(
    public navCtrl:NavController

  ) {
  }
  call(){
    this.adminval = JSON.parse(localStorage.getItem('adminval'));
    var a = document.createElement('a');
        a.href = "tel:"+this.adminval.phone;
        a.click()
  }
  goto(val){
    this.navCtrl.navigateForward(val)
  }
}
