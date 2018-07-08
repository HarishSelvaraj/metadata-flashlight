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
   // console.log(this.helpers.masterData);
    setInterval(() => {
      this.setInput();
    }, 500);
  }
  ngOnChanges(changes: SimpleChanges) {
    debugger;
    console.log('in i/p componenet');
    console.log(changes);
  }

  //ngAfterViewChecked() {
  //  this.setInput();
  //}
 
  setInput() {
    
    //console.log((<HTMLInputElement>event.target).value);
    //let input = { [this.helpers.elementName]: (<HTMLInputElement>event.target).value }
    //let input = { [this.helpers.elementName]: this.helpers.dafaultValue }
    this.documentManagerService['searchData'][this.helpers.elementName] = this.helpers.dafaultValue;
  }

}
