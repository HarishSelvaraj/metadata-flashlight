import { Component, OnInit, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { MatPaginator } from '@angular/material';
//import { ResponsiveTableHelpers } from './helpers.data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test-document',
  templateUrl: './test.component.html'
})
export class TestComponent implements OnInit {
  @Input() componentsData: Array<any> = [];
  
  constructor() { }

  ngOnInit() {
    alert("in");
  }
}
