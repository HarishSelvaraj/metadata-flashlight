import { Component, OnInit, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { MatPaginator } from '@angular/material';
//import { ResponsiveTableHelpers } from './helpers.data';
//import { Router, ActivatedRoute } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';
import { ResponseData } from './helpers.data';
import { PageHeaderComponent } from '../shared/page-header/page-header.component';
import { ListTableComponent } from '../shared/list-table/list-table.component';
import { DocumentManagerComponent } from './document-manager/document-manager.component';
import { GeneralServiceService } from '../services/general-service.service';
import { SearchLayoutComponent } from '../shared/search-layout/search-layout.component';


@Component({
  selector: 'app-master-document',
  templateUrl: './master-document.component.html',
  styleUrls: ['./master-document.component.scss']
})
export class MasterDocumentComponent implements OnInit {
  @Input() componentsData: Array<any> = [];
  requestDetail = {

    "dbModel": "sqlModel",
    "database": "mssql",
    "basename": ""

  };
  documentData: any;

  //helpers = ResponseData;
  helpers;
  sample_data = [
    { fxFlex: 35, fxLayoutGap: '10px' }
  ];

  apiref: string;
  message: string;
  @ViewChild(ListTableComponent) child;

  constructor(public generalService: GeneralServiceService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      debugger;
      this.requestDetail.basename = params['baseName'];
    });
  }

  ngOnInit() {
    
    this.generalService.getSourceDetails('listDocuments', this.requestDetail).subscribe
      (repsonse => {
        debugger;
        this.documentData = repsonse['documents'];
        for (let key in this.documentData['master']) {

          if (this.documentData['details'].length > 0) {
            this.documentData['master'][key].details = []
            for (let items in this.documentData['details']) {
              if (this.documentData['details'][items]._fl_doc_name == this.documentData['master'][key]._fl_doc_name) {
                this.documentData['master'][key].details.push(this.documentData['details'][items]);
              }
            }
          }
          debugger;
          if (this.documentData['master'][key]._fl_doc_type == 'S') {
            this.componentsData.push({ component: SearchLayoutComponent, data: this.documentData['master'][key]  });
          }
          if (this.documentData['master'][key]._fl_doc_type == 'L') {
            this.componentsData.push({ component: ListTableComponent, data: this.documentData['master'][key] });
          }
        }

        //this.componentsData.push({ component: ListTableComponent });
      });
    //this.componentsData.push({ component: SearchLayoutComponent, data: this.sample_data });
    //this.componentsData.push({ component: ListTableComponent });

    this.generalService.currentMessage.subscribe(message => this.message = message)
    console.log('in parent componenet');
    console.log(this.message);

    // this.componentsData.push({ component: ListTableComponent});
    // this.generalService.getSourceData(this.apiref).subscribe
    //   (repsonse => {
    //     this.helpers = repsonse;
    //     console.log('i am in master document component');
    //     console.log(this.helpers);
    //     for (let key in this.helpers.searchedResult) {
    //       if (key == "header") {
    //         //this.componentsData.push({ component: PageHeaderComponent, data: this.helpers.searchedResult[key] });
    //         this.componentsData.push({ component: SearchComponent, data: this.helpers.searchedResult[key] });
    //       }
    //       if (key == "body") {
    //         for (let item in this.helpers.searchedResult.body) {
    //           if (this.helpers.searchedResult.body[item]['element']._fl_elem_type == "table") {
    //             this.componentsData.push({ component: ListTableComponent, data: this.helpers.searchedResult.body[item] });
    //           }
    //         }
    //       }
    //     }
    //   });
  }

  viewList() {
    alert('test');
  }
}
