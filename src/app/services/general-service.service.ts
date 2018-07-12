import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { _ } from 'underscore';

@Injectable()
export class GeneralServiceService {
  //10.91.16.195:3002/meta/getMetaTableInfo

  langUpdated = new EventEmitter();
  add = new EventEmitter();
  edit = new EventEmitter();
  closeModal = new EventEmitter();

   // raji added
   request = {
    "reqbody": {
      "db": { "model": "sqlModel", "type": "mssql" },
      "oper": "list",
      "lookup": "META_TABLES",
      "type": "JSLIM",
      "filter": [],
      "startrow": 1,
      "maxrows": 100
    }
  }


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

  getData(api) {
    return this.http.post(environment.apiUrl + api, this.request);
  }

  getResult(res) {

    let isSlim = false;
    if (res.api.type === "JSLIM")
      isSlim = true;

    if (isSlim) {
      res.results.rowOrig = [];
      _.extend(res.results.rowOrig, res.results.rows);
    }

    let rRow = [];

    for (let r = 0; r < res.results.rows.length; r++) {
      let tRow = {};
      let cRow = res.results.rows[r];
      for (let c = 0; c < res.results.cols.length; c++) {
        let cName = res.results.cols[c];
        let cPos = res.results.cpos[c];
        tRow[cName] = cRow[cPos];
      }
      rRow.push(tRow);
    }

    res.results.rows = rRow;
    return res;
  }
}
