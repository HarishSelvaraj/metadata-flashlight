import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  topping = new FormControl();
  toppingLists = [];

  constructor() { }
  helpers;
  ngOnInit() {
  //  debugger;
    this.helpers;
  }

}
