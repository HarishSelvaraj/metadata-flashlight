import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { CompenentInterface } from '../component.interface';
import { ExampleDataSource, ExampleDatabase } from './helper.data';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import { SelectionModel } from '@angular/cdk/collections';
import { SearchLayoutComponent } from '../search-layout/search-layout.component';
import { SearchComponent } from '../../document-manager/document-details/search/search.component';
import { GeneralServiceService } from '../../services/general-service.service';
import { MatTableDataSource } from '@angular/material';
import { ButtonComponent } from '../button/button.component';
import { DocumentManagerService } from '../../document-manager/services/document-manager.service';

@Component({
  selector: 'app-list-table',
  templateUrl: './list-table.component.html',
  styleUrls: ['./list-table.component.scss']
})
export class ListTableComponent implements OnInit, CompenentInterface {

  rows: Array<any> = [];
  @Input() helpers;
  @ViewChild(MatPaginator) paginator1: MatPaginator;
  pageLength = 0;
  pageSize = 5;
  tabledata: any = { header: [], row: [] };
  reqData = {

    "dbModel": "sqlModel",
    "database": "mssql",
    "tablename": ""

  }
  // raji added
  @Input() componentsData: Array<any> = [];
  displayedColumns = ['userId', 'userName', 'progress', 'color'];
  selection = new SelectionModel<string>(true, []);
  dataSource: ExampleDataSource | null;
  exampleDatabase = new ExampleDatabase();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  @Output() messageEvent = new EventEmitter<string>();
  message = 'ChangeView';

  constructor(private service: GeneralServiceService, private documentManagerService: DocumentManagerService) {

  }
  tableShow = false;
  ngOnInit() {
    // this.getRows();

    this.service.langUpdated.subscribe(
      (lang) => {
        let searchInfo = this.documentManagerService.getSearchObject();
        this.service.getUserData('searchUsesData', searchInfo,'searchList').subscribe
          (response => {
            debugger;
            this.tableShow = true;

            this.tabledata.row = response['items'].metaDataResult;
          });
      }
    );



    for (let key in this.helpers.details) {
      this.tabledata.header.push({ th: this.helpers.details[key]._fl_elem_label, field: this.helpers.details[key]._fl_elem_name })
    }
    debugger;
    let reqDataList = {

      "dbModel": "sqlModel",
      "database": "mssql",
      "tablename": this.helpers._fl_base_table
    }
    //this.service.getUserData('listRecords', reqDataList,'initList').subscribe
    //  (response => {
    //    this.tabledata.row = response['documents'].metaDataResult;
    //  });

    // after search
    console.log('in list tbm compo');
    let reqDataSearch = {

      "dbModel": "sqlModel",
      "database": "mssql",
      "tablename": "CustomerMaster",
      "params": {
        "CustID": "1"
      }

    }
    // let searchInfo = this.documentManagerService.getSearchObject();
    // this.service.getUserData('searchUsesData', searchInfo).subscribe
    //   (response => {
    //     this.tabledata.row = response['documents'].metaDataResult;
    //   });
    //  }

  }

  isAllSelected(): boolean {
    if (!this.dataSource) { return false; }
    if (this.selection.isEmpty()) { return false; }

    if (this.filter.nativeElement.value) {
      return this.selection['selected'].length == this.dataSource.renderedData.length;
    } else {
      return this.selection['selected'].length == this.exampleDatabase.data.length;
    }
  }

  next(event) {
    this.rows = [];
    for (var i = 1 * event.pageIndex * event.pageSize; i < event.pageSize + event.pageIndex * event.pageSize; i++) {
      this.rows = [...this.rows, this.helpers.records.rows[i]];
    }
  }
  getRows() {
    for (var i = 0; i < this.pageSize; i++) {
      this.rows = [...this.rows, this.helpers.records.rows[i]];
    }
    this.pageLength = this.helpers.records.rows.length;
  }
  sortData(val) {
  }
}
