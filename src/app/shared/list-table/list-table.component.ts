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
  constructor(private service : GeneralServiceService) {

  }

  ngOnInit() {
    // this.getRows();
    //  console.log('i am in list table component.');
    //  console.log(this.helpers);
    this.service.currentMessage.subscribe(message => this.message = message);

    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) { return; }
        this.dataSource.filter = this.filter.nativeElement.value;
      });

  }

  isAllSelected(): boolean {
    if (!this.dataSource) { return false; }
    if (this.selection.isEmpty()) { return false; }

    if (this.filter.nativeElement.value) {
      return this.selection.selected.length == this.dataSource.renderedData.length;
    } else {
      return this.selection.selected.length == this.exampleDatabase.data.length;
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

  viewList() {
   // this.service.changeView();
   this.service.changeMessage("changeView");
  }
}
