import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
//import { ResponsiveTableHelpers } from '../../helpers.data';
import { DocumentManagerService } from '../../services/document-manager.service';

@Component({
  selector: 'app-document-details',
  templateUrl: './document-details.component.html',
  styleUrls: ['./document-details.component.scss']
})
export class DocumentDetailsComponent implements OnInit {

  constructor(private router: Router, private documentManagerService : DocumentManagerService) { }

  ngOnInit() {
  }
  editDocument() {
    this.router.navigate(['/document-manager/addnew']);
  }

}
