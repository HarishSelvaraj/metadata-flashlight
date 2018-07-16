import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MasterModule } from './master/master.module';
import { HttpClientModule } from '@angular/common/http';
import { GeneralServiceService } from './services/general-service.service';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
//import { ComponentLoaderDirective } from './directives/component-loader.directive';

@NgModule({
  declarations: [
    AppComponent,
    //ComponentLoaderDirective
  ],
  imports: [
    RouterModule,
    BrowserModule,
    BrowserAnimationsModule,
    MasterModule,
    HttpClientModule,
    NgxSpinnerModule,
    ToastModule.forRoot()
  ],
  providers: [GeneralServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
