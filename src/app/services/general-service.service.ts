import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class GeneralServiceService {
  //10.91.16.195:3002/meta/getMetaTableInfo
  constructor(public http: HttpClient) { }
  params = {
    "dbModel": "sqlModel",
    "database": "mssql"
  }
  GetMenuList(): Observable<any> {
    return this.http.post(environment.apiUrl + '/getMetaTableInfo', this.params);
  }
  source = {
    "documenttype": "L",
    "documentname": "ACCOUNT_MASTER_LIST"
  }
  getSourceData() {
    return this.http.post(environment.apiUrl + '/documentmanager', this.source);
  }

}
