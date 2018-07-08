import { Component, OnInit } from '@angular/core';
import { DocumentManagerService } from '../../document-manager/services/document-manager.service';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent implements OnInit {

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
