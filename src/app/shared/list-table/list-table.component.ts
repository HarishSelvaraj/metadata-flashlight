import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { MatPaginator, MatSort, MatDialogRef, MatDialog } from '@angular/material';
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
import { ModalComponent } from '../modal/modal.component';

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

  constructor(private service: GeneralServiceService, public dialog: MatDialog, private documentManagerService: DocumentManagerService) {

  }
  tableShow = false;
  ngOnInit() {
    // this.getRows();

    this.service.langUpdated.subscribe(
      (lang) => {
        let searchInfo = this.documentManagerService.getSearchObject();
        this.service.getUserData('searchUsesData', searchInfo, 'searchList').subscribe
          (response => {
            this.tableShow = true;
            this.tabledata.row = response['items'].metaDataResult;
          });
      }
    );

    this.service.add.subscribe(
      (lang) => {
        this.service.closeModalAfterAdd();
        let addUserInfo = this.documentManagerService.getSearchObject();

        this.service.getUserData('addUsesData ', addUserInfo, 'addUserList').subscribe
          (response => {

          });


        let baseTblName = addUserInfo['baseTable'];

        addUserInfo = this.documentManagerService.clearSearchObject();

        this.documentManagerService.searchData['baseTable'] = baseTblName;


        this.service.getUserData('searchUsesData', addUserInfo, 'searchList').subscribe
          (response => {
            this.tableShow = true;
            this.tabledata.row = response['items'].metaDataResult;
          });
      }
    );

    this.service.edit.subscribe(
      (lang) => {
        this.service.closeModalAfterAdd();
        let editUserInfo = this.documentManagerService.getSearchObject();
        let condition = {
          "CustID": editUserInfo["CustID"]
        };
        this.service.editUserData('editUsesData', editUserInfo, condition, 'editList').subscribe
          (response => {

          });
        let baseTblName = editUserInfo['baseTable'];
        editUserInfo = this.documentManagerService.clearSearchObject();
        this.documentManagerService.searchData['baseTable'] = baseTblName;

        this.service.getUserData('searchUsesData', editUserInfo, 'searchList').subscribe
          (response => {
            this.tableShow = true;
            this.tabledata.row = response['items'].metaDataResult;
          });
      }
    );


    for (let key in this.helpers.details) {
      this.tabledata.header.push({ th: this.helpers.details[key]._fl_elem_label, field: this.helpers.details[key]._fl_elem_name })
    }
    let reqDataList = {

      "dbModel": "sqlModel",
      "database": "mssql",
      "tablename": this.helpers._fl_base_table
    }

    let reqDataSearch = {

      "dbModel": "sqlModel",
      "database": "mssql",
      "tablename": "CustomerMaster",
      "params": {
        "CustID": "1"
      }
    }
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

  editRecord(row, index) {
    this.helpers.isEdit = true;
    // bind
    for (let key in this.helpers.details) {
      if (row[this.helpers.details[key]._fl_elem_name]) {
        this.helpers.details[key]._fl_default_value = row[this.helpers.details[key]._fl_elem_name];
      }
    }
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '300px',
      height: '500px',
      data: this.helpers,
      disableClose: true
    });
  }
}
