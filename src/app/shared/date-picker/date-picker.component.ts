import { Component, OnInit } from '@angular/core';
import { DocumentManagerService } from '../../document-manager/services/document-manager.service';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {

  helpers;
  constructor(private documentManagerService: DocumentManagerService) { }

  ngOnInit() {
    console.log('date picker compoenent');
    console.log(this.helpers);
    this.documentManagerService['searchData'][this.helpers.elementName] = this.helpers.dafaultValue;
  }

  setInput() {
    console.log('set input ()');
    console.log(this.helpers.elementName);
    this.documentManagerService['searchData'][this.helpers.elementName] = this.helpers.dafaultValue;
  }

}
