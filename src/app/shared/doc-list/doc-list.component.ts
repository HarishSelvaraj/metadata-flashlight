import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { GeneralServiceService } from '../../services/general-service.service';
import { Router } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
@Component({
  selector: 'app-doc-list',
  templateUrl: './doc-list.component.html',
  styleUrls: ['./doc-list.component.scss']
})
export class DocListComponent implements OnInit {
  metaDoclist; rows; dataSource;
  displayedColumns = ['sno', 'basename'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sorts: MatSort;
  pageLength = 0;
  pageSize = 3;
  @Input() status;
  @Input() actionStatus;
  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Output() view = new EventEmitter();
  @Output() page = new EventEmitter();
  @Output() sort = new EventEmitter();
  @Output() dup = new EventEmitter();
  constructor(private generalService: GeneralServiceService, private router: Router) { }
  requestDocList = {

    "dbModel": "sqlModel",
    "database": "mssql"

  }
  ngOnInit() {
    
    this.generalService.getDocList('listBaseName', this.requestDocList).subscribe
      (response => {
        this.metaDoclist = response['baseName'].metaDataResult;
        console.log(this.metaDoclist);
        for (var i = 0; i < this.metaDoclist.length; i++) {
          this.metaDoclist[i].sno = i + 1;
        }
        this.getRows();
      });
  }
  next(event) {
    this.rows = [];
    for (var i = 1 * event.pageIndex * event.pageSize; i < event.pageSize + event.pageIndex * event.pageSize; i++) {
      this.rows = [...this.rows, this.metaDoclist[i]];
      this.dataSource = new MatTableDataSource(this.metaDoclist);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sorts;
    }
  }
  getRows() {
    for (var i = 0; i < this.pageSize; i++) {
      // this.rows = [...this.rows, this.metaDoclist[i]];
      this.dataSource = new MatTableDataSource(this.metaDoclist);
      debugger;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sorts;
      debugger;

    }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  detailsData() {
    this.router.navigate(['/document-manager', 'Accounts']);

  }

}
