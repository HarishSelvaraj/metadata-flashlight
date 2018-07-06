import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class GeneralServiceService {
  //10.91.16.195:3002/meta/getMetaTableInfo

  langUpdated = new EventEmitter();

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
  getDocList(api, requestData) {
    return this.http.post(environment.apiUrl + api, requestData);
  }
  getSourceDetails(api, requestData) {
    return this.http.post(environment.apiUrl + api, requestData);
  }
  getUserData(api, requestData,searchtype) {
    let reqData;
    if(searchtype=='searchList'){
     reqData = {

      "dbModel": "sqlModel",
      "database": "mssql",
      "tablename": requestData.baseTable,
      "params": {}

    }

    for (let key in requestData) {
      if (key != "baseTable") {
        if(requestData[key]!=""){
        reqData['params'][key] = requestData[key];
      }

      }

    }
  }else{
    reqData=requestData;
  }
   // debugger;
    return this.http.post(environment.apiUrl + api, reqData);
  }
  searchUsesData(api, requestData) {
    return this.http.post(environment.apiUrl + api, requestData);
  }
  searchTable() {
    this.langUpdated.emit('search');
  }
}
