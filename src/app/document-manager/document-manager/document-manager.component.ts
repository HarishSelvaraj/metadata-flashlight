import { Component, OnInit, ViewChild, Input, Output, EventEmitter, ComponentFactoryResolver } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { ResponseData } from '../helpers.data';
import { Router, ActivatedRoute } from '@angular/router';
import { MasterDocumentComponent } from '../master-document.component';
import { ComponentLoaderDirective } from '../../directives/component-loader.directive';
import { ListTableComponent } from '../../shared/list-table/list-table.component';
import { CompenentInterface } from '../../shared/component.interface';

@Component({
  selector: 'app-document-manager',
  templateUrl: './document-manager.component.html',
  styleUrls: ['./document-manager.component.scss']
})
export class DocumentManagerComponent implements OnInit {
  displayedColumns = ['userId', 'userName', 'progress', 'color'];
  rows: Array<any> = [];
  showResponsiveTableCode;
  @ViewChild(ComponentLoaderDirective) appComponentLoader: ComponentLoaderDirective;
  @ViewChild(MatPaginator) paginator1: MatPaginator;
  pageLength = 0;
  pageSize = 3;
  //helpers = ResponseData;
  @Input() components;
  @Input() status;
  @Input() actionStatus;
  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Output() view = new EventEmitter();
  @Output() page = new EventEmitter();
  @Output() sort = new EventEmitter();
  @Output() dup = new EventEmitter();
  constructor(private router: Router, private route: ActivatedRoute, private componentFactoryResolver: ComponentFactoryResolver) {
  }



  ngOnInit() {

    this.loadComponent();
    //this.getRows();
  }

  loadComponent() {

    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.components.component);
    let viewContainerRef = this.appComponentLoader.viewContainerRef;
    viewContainerRef.clear();
    let componentRef = viewContainerRef.createComponent(componentFactory);
    (<CompenentInterface>componentRef.instance).helpers = this.components.data;
  }

  //next(event) {
  //  this.rows = [];
  //  for (var i = 1 * event.pageIndex * event.pageSize; i < event.pageSize + event.pageIndex * event.pageSize; i++) {
  //    this.rows = [...this.rows, this.helpers.rows[i]];
  //  }
  //}
  //getRows() {
  //  for (var i = 0; i < this.pageSize; i++) {
  //    this.rows = [...this.rows, this.helpers.rows[i]];
  //  }
  //  this.pageLength = this.helpers.rows.length;
  //}
  sortData(val) {
  }

  addNewDocument() {
    this.router.navigate(['/document-manager/addnew']);
  }

}
