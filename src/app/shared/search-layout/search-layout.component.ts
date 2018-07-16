import { Component, OnInit, Input, Inject, ViewChild, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InputTextComponent } from '../input-text/input-text.component';
import { SelectComponent } from '../select/select.component';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { ButtonComponent } from '../button/button.component';
import { TextareaComponent } from '../textarea/textarea.component';
import { LabelComponent } from '../label/label.component';
import { NumberComponent } from '../number/number.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GeneralServiceService } from '../../services/general-service.service';
import { ListTableComponent } from '../list-table/list-table.component';


export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-search-layout',
  templateUrl: './search-layout.component.html',
  styleUrls: ['./search-layout.component.scss']
})
export class SearchLayoutComponent implements OnInit {

  componentsData: Array<any> = [];
  helpers;
  searchData;
  animal: string;
  name: string;
  flex = 25;
  btn: boolean = false;
  formInputs = {};
  @Input() _opts;
  @Input() formType;
  metaData = {};
  @Output() btnCmpClick = new EventEmitter();
  @Output() navClick = new EventEmitter();
  constructor(private http: HttpClient, public dialog: MatDialog, private generalService: GeneralServiceService) { }


  btnClick = () => {
    debugger;
    this.searchData;
    //for (var i in this.searchData) {
    //  this.formInputs[this.searchData[i].data.elementName] = this.searchData[i].data.dafaultValue ? this.searchData[i].data.dafaultValue:"";
    //}
    debugger;
    this.btnCmpClick.emit(this.searchData);
    
  }

  addnew = () => {

    this.navClick.emit();
  }
  ngAfterViewInit() {
    // child is set
   
  }
  ngOnInit() {

    let _lrenderSearch = (err, tObj) => {
      // whatever

      console.log('tObj');
      console.log(tObj);
      let searchObj = tObj.metaData.detail.results.rows;
      this.searchData = searchObj;
      for (let key in searchObj) {
        searchObj[key].data = {
          dafaultValue: searchObj[key]._fl_default_value,
          placeHolder: searchObj[key]._fl_elem_label,
          elementName: searchObj[key]._fl_elem_name
        };
        if (searchObj[key]._fl_elem_type == "SELECT") {
          
          this.componentsData.push({
            component: SelectComponent,
            data: searchObj[key].data
          });
        }
        if (searchObj[key]._fl_elem_type == "TEXT") {
          this.componentsData.push({
            component: InputTextComponent,
            data: searchObj[key].data
          });
        }
        if (searchObj[key]._fl_elem_type == "LABEL") {
          this.componentsData.push({
            component: LabelComponent,
            data: searchObj[key].data
          });
        }
        if (searchObj[key]._fl_elem_type == "TEXTAREA") {
          this.componentsData.push({
            component: TextareaComponent,
            data: searchObj[key].data
          });
        }
        if (searchObj[key]._fl_elem_type == "DATE" || searchObj[key]._fl_elem_type == "DATETIME") {
          this.componentsData.push({
            component: DatePickerComponent,
            data: searchObj[key].data
          });
        }
        if (searchObj[key]._fl_elem_type == "NUMBER") {
          this.componentsData.push({
            component: NumberComponent,
            data: searchObj[key].data
          });
        }
        if (searchObj[key]._fl_elem_type == "BUTTON") {
          this.componentsData.push({
            component: ButtonComponent,
            data: searchObj[key].data
          });
        }
        //this.componentsData.push({ component: SelectComponent,data:[] });
      }

      this.componentsData.push({
        component: ButtonComponent,
        data: {
          dafaultValue: '',
          placeHolder: this.formType,
          searchDetailsInd: true
        },
        onAction: this.btnClick
      });

    }

    //for (let key in this.helpers.details) {
    //  if (this.helpers.details[key]._fl_elem_type == "SELECT") {
    //    var code;
    //    if (this.helpers.details[key].code) {
    //      code = this.helpers.details[key].code;
    //    }
    //    this.componentsData.push({ component: SelectComponent, data: { dafaultValue: this.helpers.details[key]._fl_default_value, placeHolder: this.helpers.details[key]._fl_elem_label, elementName: this.helpers.details[key]._fl_elem_name, baseTable: this.helpers['_fl_base_table'], options: code } });
    //  }
    //  if (this.helpers.details[key]._fl_elem_type == "TEXT") {
    //    this.componentsData.push({ component: InputTextComponent, data: { dafaultValue: this.helpers.details[key]._fl_default_value, placeHolder: this.helpers.details[key]._fl_elem_label, elementName: this.helpers.details[key]._fl_elem_name,baseTable:this.helpers['_fl_base_table'] } });
    //  }
    //  if (this.helpers.details[key]._fl_elem_type == "LABEL") {
    //    this.componentsData.push({ component: LabelComponent, data: { dafaultValue: this.helpers.details[key]._fl_default_value, placeHolder: this.helpers.details[key]._fl_elem_label, elementName: this.helpers.details[key]._fl_elem_name,baseTable:this.helpers['_fl_base_table'] } });
    //  }
    //  if (this.helpers.details[key]._fl_elem_type == "TEXTAREA") {
    //    this.componentsData.push({ component: TextareaComponent, data: { dafaultValue: this.helpers.details[key]._fl_default_value, placeHolder: this.helpers.details[key]._fl_elem_label, elementName: this.helpers.details[key]._fl_elem_name,baseTable:this.helpers['_fl_base_table'] } });
    //  }
    //  if (this.helpers.details[key]._fl_elem_type == "DATE" || this.helpers.details[key]._fl_elem_type == "DATETIME") {
    //    this.componentsData.push({ component: DatePickerComponent, data: { dafaultValue: this.helpers.details[key]._fl_default_value, placeHolder: this.helpers.details[key]._fl_elem_label, elementName: this.helpers.details[key]._fl_elem_name, baseTable: this.helpers['_fl_base_table'] } });
    //  }
    //  if (this.helpers.details[key]._fl_elem_type == "NUMBER") {
    //    this.componentsData.push({ component: NumberComponent, data: { dafaultValue: this.helpers.details[key]._fl_default_value, placeHolder: this.helpers.details[key]._fl_elem_label, elementName: this.helpers.details[key]._fl_elem_name, baseTable: this.helpers['_fl_base_table'] } });
    //  }
    //  if (this.helpers.details[key]._fl_elem_type == "BUTTON") {
    //    this.componentsData.push({ component: ButtonComponent, data: { dafaultValue: this.helpers.details[key]._fl_default_value, placeHolder: this.helpers.details[key]._fl_elem_label, elementName: this.helpers.details[key]._fl_elem_name,baseTable:this.helpers['_fl_base_table'] } });
    //  } else {
    //    this.btn = true;
    //  }
    //}
    //if (this.btn) {
    //  this.componentsData.push({ component: ButtonComponent, data: { dafaultValue: '', placeHolder: 'Search', searchDetailsInd: true } });
    //}
    //this.helpers.details;

    let _lcallback = function (err, tObj, retObj, _callback) {
      tObj.generalService.getMetaSearch(tObj._opts, 'search').subscribe(response => {
        tObj.metaData[retObj] = tObj.generalService.getResult(response);

        if (typeof (_callback) === "function") {
          tObj._opts.reqbody.lookup = "META_DETAIL";
          _callback(null, tObj, "detail", function (err, tObj) {
            _lrenderSearch(err, tObj);
          });
        }
      });

    }

    _lcallback(null, this, "master", _lcallback);

    //this.http.get("./assets/files/sample-components.json").subscribe
    //  (repsonse => {
    //    this.helpers = repsonse['components'];
    //    this.flex = repsonse['flex'];
    //    for (let key of this.helpers) {
    //      if (key.name == "input") {
    //        this.componentsData.push({ component: InputTextComponent });
    //      }
    //      if (key.name == "select") {
    //        this.componentsData.push({ component: SelectComponent });
    //      }
    //      if (key.name == "date") {
    //        this.componentsData.push({ component: DatePickerComponent });
    //      }
    //      if (key.name == "button") {
    //        this.componentsData.push({ component: ButtonComponent });
    //      }
    //    }
    //  });
  }
}

