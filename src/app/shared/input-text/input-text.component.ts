import { Component, OnInit } from '@angular/core';
import { DocumentManagerService } from '../../document-manager/services/document-manager.service';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss']
})
export class InputTextComponent implements OnInit {
  inputValue;
  constructor(private documentManagerService: DocumentManagerService) { }
  helpers;
  ngOnInit() {
    //this.documentManagerService.setSearchObject(input);
   // console.log(this.helpers.masterData);
  }

  setInput() {
    console.log('in i/p componenet');
    let input = { [this.helpers.elementName]: (<HTMLInputElement>event.target).value }
    this.documentManagerService['searchData'][this.helpers.elementName] = (<HTMLInputElement>event.target).value;
  }

}
