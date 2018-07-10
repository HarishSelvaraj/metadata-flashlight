import { Component, OnInit } from '@angular/core';
import { DocumentManagerService } from '../../document-manager/services/document-manager.service';

@Component({
  selector: 'app-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.scss']
})
export class NumberComponent implements OnInit {

  constructor(private documentManagerService: DocumentManagerService) { }
  helpers
  ngOnInit() {
    this.documentManagerService['searchData'][this.helpers.elementName] = this.helpers.dafaultValue;
  }
  setInput() {
    let input = { [this.helpers.elementName]: (<HTMLInputElement>event.target).value }
    this.documentManagerService['searchData'][this.helpers.elementName] = (<HTMLInputElement>event.target).value;
  }

}
