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
   // debugger;
    this.documentManagerService['searchData'][this.helpers.elementName] = this.helpers.dafaultValue;
  }
  setInput() {
    console.log('in i/p componenet');
    let input = { [this.helpers.elementName]: (<HTMLInputElement>event.target).value }
    this.documentManagerService['searchData'][this.helpers.elementName] = (<HTMLInputElement>event.target).value;
  }

}
