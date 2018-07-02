import { Component, OnInit } from '@angular/core';
import {GeneralServiceService} from '../../services/general-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doc-list',
  templateUrl: './doc-list.component.html',
  styleUrls: ['./doc-list.component.scss']
})
export class DocListComponent implements OnInit {

  constructor(private generalService: GeneralServiceService, private router: Router) { }
  requestDocList = {

    "dbModel": "sqlModel",
    "database": "mssql"

  }
  ngOnInit() {
    this.generalService.getDocList('listBaseName', this.requestDocList).subscribe
      (repsonse => {
        debugger;
    });
  }
  detailsData() {
    this.router.navigate(['/document-manager','Accounts']);

  }

}
