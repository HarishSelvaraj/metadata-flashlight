import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { DocumentManagerService } from '../../document-manager/services/document-manager.service';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss']
})
export class InputTextComponent implements OnInit, OnChanges {
  inputValue;
  helpers;
  constructor(private documentManagerService: DocumentManagerService) {
    if (this.helpers) {
      alert(this.helpers.dafaultValue);
    }
  }
  ngOnInit() {
    //this.documentManagerService.setSearchObject(input);
    // setInterval(() => {
    //   this.setInput();
    // }, 500);
    this.documentManagerService['searchData'][this.helpers.elementName] = this.helpers.dafaultValue;
 
  }
  ngOnChanges(changes: SimpleChanges) {
   
  }

  setInput() {
   
    this.documentManagerService['searchData'][this.helpers.elementName] = this.helpers.dafaultValue;
  }
}
