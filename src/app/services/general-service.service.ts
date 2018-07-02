import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class GeneralServiceService {
  //10.91.16.195:3002/meta/getMetaTableInfo

  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();

  constructor(public http: HttpClient) { }
  params = {
    "dbModel": "sqlModel",
    "database": "mssql"
  }
  GetMenuList(): Observable<any> {
    return this.http.post(environment.apiUrl + 'getMetaTableInfo', this.params);
  }
  source = {
    "documenttype": "L",
    "documentname": "MASTER_DATA"
  }
  getSourceData(api) {
    return this.http.post(environment.apiUrl + api, this.source);
  }

  changeMessage(message: string) {
    this.messageSource.next(message)
  }
  getDocList(api,requestData) {
    return this.http.post(environment.apiUrl + api, requestData);
  }
}
