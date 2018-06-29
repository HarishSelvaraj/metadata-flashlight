import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MasterModule } from './master/master.module';
import { ReportsComponent } from './reports/reports.component';
import { HttpClientModule } from '@angular/common/http';
import { GeneralServiceService } from './services/general-service.service';
//import { ComponentLoaderDirective } from './directives/component-loader.directive';

@NgModule({
  declarations: [
    AppComponent,
    ReportsComponent,
    //ComponentLoaderDirective
  ],
  imports: [
    RouterModule,
    BrowserModule,
    BrowserAnimationsModule,
    MasterModule,
    HttpClientModule
  ],
  providers: [GeneralServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
