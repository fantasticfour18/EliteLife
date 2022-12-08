import { Component } from '@angular/core';
import { ModalController, NavController, Platform } from '@ionic/angular';
import { Router ,NavigationExtras, NavigationEnd} from '@angular/router';
import { ApiService } from './api.service';
import { FirebaseMessaging } from '@ionic-native/firebase-messaging/ngx';
import { SplashPage } from './splash/splash.page';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  navigationSubscription
  pagevalue
  isNotifTapped: boolean;

  constructor(
    public nav:NavController,
    private router: Router,
    private platform: Platform,
    public api:ApiService,
    public firebaseMessaging:FirebaseMessaging,
    public model:ModalController,
    private fcm: FCM
  ) 
  {
    this.opensplash();
    //this.nav.navigateForward('login');

    this.firebaseMessaging.requestPermission();
    platform.ready().then(() => {
      this.initAndroidPush();
    }); 

    this.getSet();
    
    this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.pagevalue = e.urlAfterRedirects;
      }
    });

    this.platform.backButton.subscribe(() => {
      if(this.pagevalue == '/login'){
      navigator["app"].exitApp();
      }else if(this.pagevalue == '/tabs/main'){
        return false;
      }else{
        this.nav.back();
      }
    });
    
  }

  navigateHome(isNotificationTapped = false, navExtras: NavigationExtras = null)
  {
    if(localStorage.getItem('user'))
    {
      if(isNotificationTapped) {
        localStorage.setItem('onTapNavigate', JSON.stringify(navExtras));
        this.api.navigateToOffer();
      }
      
      if(!this.isNotifTapped) 
      {
        this.isNotifTapped = false;
        this.nav.navigateForward('tabs/main');
      }
    }
    else {
      this.nav.navigateForward('login');
    }
  }

  getSet(){
    this.api.getData('https://www.elitelife.com.au/getdata.php?type=app_setting').subscribe(res =>{
     console.log('res',res);
     var data:any  = res;
     localStorage.setItem('adminval',JSON.stringify(data));
   })
 }

  async opensplash() {
    const models = await this.model.create({
      component:SplashPage
    })
    await models.present();
  }

  // Initialize Android Push Notifications
  initAndroidPush()
  {
    // Check if app is closed
    this.fcm?.getInitialPushPayload().then(data => {
      if(data?.wasTapped) {
        if(data.type == 'post_detail') 
        {
          let navigationExtras: NavigationExtras = {
            queryParams: {
              id: data.id,
            }
          };

          this.navigateHome(true, navigationExtras);
        }
      }
      else {  // Navigate Normally
        this.navigateHome();
      }
    });
    
    // Only when app is in foreground and background
    this.fcm?.onNotification().subscribe(data => {
      if(data.wasTapped) 
      {
        if(data.type == 'post_detail') 
        {
          this.isNotifTapped = true;
          let navigationExtras: NavigationExtras = {
            queryParams: {
              id: data.id,
            }
          };

          this.navigateHome(true, navigationExtras);
        }
      }
      else 
      {
        // Handle Foreground
      }
    });
  }
  
}
