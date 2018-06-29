import { Component, OnInit, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { MatPaginator } from '@angular/material';
//import { ResponsiveTableHelpers } from './helpers.data';
//import { Router, ActivatedRoute } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';
import { ResponseData } from './helpers.data';
import {PageHeaderComponent} from '../shared/page-header/page-header.component';
import {ListTableComponent} from '../shared/list-table/list-table.component';
import { DocumentManagerComponent } from './document-manager/document-manager.component';
import { GeneralServiceService } from '../services/general-service.service';

@Component({
  selector: 'app-master-document',
  templateUrl: './master-document.component.html',
  styleUrls: ['./master-document.component.scss']
})
export class MasterDocumentComponent implements OnInit {
  @Input() componentsData: Array<any> = [];
  //helpers = ResponseData;
  helpers
  apiref: string
  constructor(public generalService: GeneralServiceService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.apiref = params['apiLink'];
    });
  }

  ngOnInit() {
    this.generalService.getSourceData(this.apiref).subscribe
      (repsonse => {
        this.helpers = repsonse;
        for (let key in this.helpers.searchedResult) {
          if (key == "header") {
            this.componentsData.push({ component: PageHeaderComponent, data: this.helpers.searchedResult[key] });
          }
          if (key == "body") {
            for (let item in this.helpers.searchedResult.body) {
              if (this.helpers.searchedResult.body[item]['element']._fl_elem_type == "table") {
                this.componentsData.push({ component: ListTableComponent, data: this.helpers.searchedResult.body[item] });
              }
            }
          }
        }
      });


    //this.helpers.forEach(items => {

    //});

  }
}
