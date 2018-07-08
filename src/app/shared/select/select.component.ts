import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DocumentManagerService } from '../../document-manager/services/document-manager.service';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  topping = new FormControl();
  toppingLists = [];

  constructor(private documentManagerService: DocumentManagerService) { }
  helpers;
  ngOnInit() {
    this.helpers;
  }
  setInput() {
    console.log('in i/p componenet');
    let input = { [this.helpers.elementName]: (<HTMLInputElement>event.target).value }
    this.documentManagerService['searchData'][this.helpers.elementName] = (<HTMLInputElement>event.target).value;
  }

}
