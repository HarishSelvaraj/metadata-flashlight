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
  add = new EventEmitter();
  edit = new EventEmitter();
  closeModal = new EventEmitter();


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
  getUserData(api, requestData, searchtype) {
    let reqData;
    if (searchtype == 'searchList' || searchtype == 'addUserList') {
      reqData = {
        "dbModel": "sqlModel",
        "database": "mssql",
        "tablename": requestData.baseTable,
        "params": {},
        "condition": {}
      }

      for (let key in requestData) {
        if (key != "baseTable") {
          if (requestData[key] != "") {
            reqData['params'][key] = requestData[key];
          }
        }
      }
    } else {
      reqData = requestData;
    }
    return this.http.post(environment.apiUrl + api, reqData);
  }
  searchUsesData(api, requestData) {
    return this.http.post(environment.apiUrl + api, requestData);
  }
  searchTable() {
    this.langUpdated.emit('search');
  }

  addUser() {
    this.add.emit('add');
  }

  editUser() {
    this.edit.emit('edit');
  }

  closeModalAfterAdd() {
    this.closeModal.emit('close');
  }

  editUserData(api, requestData, conditionData, searchtype) {
    let reqData;
    if (searchtype == 'editList') {
      reqData = {
        "dbModel": "sqlModel",
        "database": "mssql",
        "tablename": requestData.baseTable,
        "params": {},
        "condition": {}
      }

      for (let key in requestData) {
        if (key != "baseTable") {
          if (requestData[key] != "") {
            reqData['params'][key] = requestData[key];
          }
        }
      }

      for (let key in conditionData) {
        console.log('i am in condition data inside service');
        console.log(requestData[key]);
        if (key != "baseTable") {
          if (requestData[key] != "") {
            reqData['condition'][key] = conditionData[key];
          }
        }
      }

    } else {
      reqData = requestData;
    }
    console.log('end of service');
    console.log(reqData);
    // return reqData;
    return this.http.post(environment.apiUrl + api, reqData);
  }
}
