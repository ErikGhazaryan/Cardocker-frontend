import { CarDetailsComponent } from './components/car-details/car-details.component';
import { CarListComponent } from './components/car-list/car-list.component';

import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule, Router} from '@angular/router';
import { FormsModule } from '@angular/forms';


import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';
import { OktaAuth } from '@okta/okta-auth-js';
import { SearchCriteriaComponent } from './components/search-criteria/search-criteria.component';
import { NgbModule, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import {OKTA_CONFIG, OktaAuthModule, OktaCallbackComponent} from '@okta/okta-angular';

import myAppConfig from './config/my-app-config';

import { BrowserModule } from '@angular/platform-browser';
import { CarForSaleComponent } from './components/car-for-sale/car-for-sale.component';



const oktaConfig = Object.assign({

  onAuthRequired: (injector) => {
    const router = injector.get(Router);
    // Redirect the user to your custom login page
    router.navigate(['/login']);

  }

}, myAppConfig.oidc);


const oktaAuth = new OktaAuth(oktaConfig);



const routes: Routes = [
  
  {path: 'addyourcartosale', component: CarForSaleComponent},
  {path: 'carsmakes', component: CarListComponent},
  {path: 'carsmakes/:id', component: CarDetailsComponent},
  {path: 'login/callback', component: OktaCallbackComponent},
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: '/carsmakes', pathMatch: 'full'},
  {path: '**', redirectTo: '/carsmakes', pathMatch: 'full'}
];



@NgModule({

  declarations: [

    AppComponent,
    SearchCriteriaComponent,
    LoginComponent,
    CarListComponent,
    LoginStatusComponent,
    LoginStatusComponent,
    SearchCriteriaComponent,
    CarDetailsComponent,
    CarForSaleComponent

  ],

    imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    OktaAuthModule
  ],
  exports: [CarDetailsComponent],
  providers: [ { provide: OKTA_CONFIG, useValue: {oktaAuth} }],
  bootstrap: [AppComponent,CarDetailsComponent]

})

export class AppModule { }