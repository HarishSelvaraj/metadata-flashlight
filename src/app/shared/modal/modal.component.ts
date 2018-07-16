import { Component, OnInit, Input, Inject, ViewContainerRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SelectComponent } from '../select/select.component';
import { InputTextComponent } from '../input-text/input-text.component';
import { LabelComponent } from '../label/label.component';
import { TextareaComponent } from '../textarea/textarea.component';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { NumberComponent } from '../number/number.component';
import { ButtonComponent } from '../button/button.component';
import { GeneralServiceService } from '../../services/general-service.service';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';
import { DocumentManagerService } from '../../document-manager/services/document-manager.service';
import { ListTableComponent } from '../list-table/list-table.component';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() componentsData: Array<any> = [];
  helpers;
  btn: boolean = false;
  addObject;
  searchData;
  metaData;
  _opts;
  baseName;
  addData;
  generalService: any;
  formType = 'Add';
  _reqOpts: any;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private service: GeneralServiceService,
    private documentManagerService: DocumentManagerService,
    public toastr: ToastsManager, vcr: ViewContainerRef,
    private loader: NgxSpinnerService) {
    this.route.params.subscribe(params => {
      this.baseName = params.baseName;
    });
    this.toastr.setRootViewContainerRef(vcr);
  }
    
tiggerBtnClick = (obj) => {
  debugger;
  this.loader.show();
  let formObj = obj;
  this._reqOpts.reqbody.data_cols = [];
  this._reqOpts.reqbody.data = [];
  this._reqOpts.reqbody.lookup = this.baseName;
  let _val = []
  for (var key in obj) {
    this._reqOpts.reqbody.data_cols.push(obj[key].data.elementName);
    _val.push(obj[key].data.dafaultValue ? obj[key].data.dafaultValue : "");  
    //this.formInputs[obj[i].data.elementName] = obj[i].data.dafaultValue ? tobj[i].data.dafaultValue : "";
  }
  //for (var key in obj) {    
  //  this._reqOpts.reqbody.data_cols.push(key);
  //  _val.push(obj[key]);    
  //}
  debugger;
  this._reqOpts.reqbody.data.push(_val);
  this.service.createUser(this._reqOpts, 'create').subscribe
    (response => {
      this.loader.hide();
      for (var key in formObj) {
        //this._reqOpts.reqbody.data_cols.push(key);
        formObj[key].data.dafaultValue = "";
      }
      this.router.navigate(['/driver', this.baseName]);
      this.toastr.success('Data Added Successfully');
    });
}
ngOnInit() {
  console.log('im in modal compoenet');
  this._reqOpts = {
    "reqbody": {
      "db": { "model": "sqlModel", "type": "mssql" },
      "lookup": "ACCOUNT_MASTER_",
      "oper": "edit",
      "data_cols": [],
      "data_key": [],
      "key_values": [],
      "data": [],

      "data_audit": {
        "created_by": "CustCreatedBy", "created_date": "CustCreatedDate", "updated_by": "CustUpdatedBy", "updated_date": "CustUpdatedDate"
      }
    }
  };
  this._opts = {
    "reqbody": {
      "oper": "list",
      "lookup": "META_MASTER",
      "filter": [{ "t": "@eq", "k": "_fl_doc_name", "v": [this.baseName + "_SEARCH"] }]
    }
  }

  //this.metaData = {};
  //let _lrenderSearch = (err, tObj) => {
  //  // whatever

  //  console.log('tObj');
  //  console.log(tObj);
  //  let searchObj = tObj.metaData.detail.results.rows;
  //  this.searchData = searchObj;
  //  for (let key in searchObj) {
  //    if (searchObj[key]._fl_elem_type == "SELECT") {
  //      this.componentsData.push({
  //        component: SelectComponent,
  //        data: {
  //          dafaultValue: searchObj[key]._fl_default_value,
  //          placeHolder: searchObj[key]._fl_elem_label,
  //          elementName: searchObj[key]._fl_elem_name
  //        }
  //      });
  //    }
  //    if (searchObj[key]._fl_elem_type == "TEXT") {
  //      this.componentsData.push({
  //        component: InputTextComponent,
  //        data: {
  //          dafaultValue: searchObj[key]._fl_default_value,
  //          placeHolder: searchObj[key]._fl_elem_label,
  //          elementName: searchObj[key]._fl_elem_name
  //        }
  //      });
  //    }
  //    if (searchObj[key]._fl_elem_type == "LABEL") {
  //      this.componentsData.push({
  //        component: LabelComponent,
  //        data: {
  //          dafaultValue: searchObj[key]._fl_default_value,
  //          placeHolder: searchObj[key]._fl_elem_label,
  //          elementName: searchObj[key]._fl_elem_name
  //        }
  //      });
  //    }
  //    if (searchObj[key]._fl_elem_type == "TEXTAREA") {
  //      this.componentsData.push({
  //        component: TextareaComponent,
  //        data: {
  //          dafaultValue: searchObj[key]._fl_default_value,
  //          placeHolder: searchObj[key]._fl_elem_label,
  //          elementName: searchObj[key]._fl_elem_name
  //        }
  //      });
  //    }
  //    if (searchObj[key]._fl_elem_type == "DATE" || searchObj[key]._fl_elem_type == "DATETIME") {
  //      this.componentsData.push({
  //        component: DatePickerComponent,
  //        data: {
  //          dafaultValue: searchObj[key]._fl_default_value,
  //          placeHolder: searchObj[key]._fl_elem_label,
  //          elementName: searchObj[key]._fl_elem_name
  //        }
  //      });
  //    }
  //    if (searchObj[key]._fl_elem_type == "NUMBER") {
  //      this.componentsData.push({
  //        component: NumberComponent,
  //        data: {
  //          dafaultValue: searchObj[key]._fl_default_value,
  //          placeHolder: searchObj[key]._fl_elem_label,
  //          elementName: searchObj[key]._fl_elem_name
  //        }
  //      });
  //    }
  //    if (searchObj[key]._fl_elem_type == "BUTTON") {
  //      this.componentsData.push({
  //        component: ButtonComponent,
  //        data: {
  //          dafaultValue: searchObj[key]._fl_default_value,
  //          placeHolder: searchObj[key]._fl_elem_label,
  //          elementName: searchObj[key]._fl_elem_name
  //        }
  //      });
  //    }
  //    //this.componentsData.push({ component: SelectComponent,data:[] });
  //  }

  //  this.componentsData.push({
  //    component: ButtonComponent,
  //    data: {
  //      dafaultValue: '',
  //      placeHolder: 'Add',
  //      searchDetailsInd: true
  //    }
  //  });

  //}

  //let _lcallback = function (err, tObj, retObj, _callback) {
  //  tObj.service.getMetaSearch(tObj._opts, 'search').subscribe(response => {
  //    tObj.metaData[retObj] = tObj.service.getResult(response);

  //    if (typeof (_callback) === "function") {
  //      tObj._opts.reqbody.lookup = "META_DETAIL";
  //      _callback(null, tObj, "detail", function (err, tObj) {
  //        _lrenderSearch(err, tObj);
  //      });
  //    }
  //  });

  //}

  //_lcallback(null, this, "master", _lcallback);

  //this.service.addData(this._opts, 'search').subscribe(
  //  (lang) => {
  //    let searchInfo = this.documentManagerService.getSearchObject();
  //    this._opts.reqbody.filter = [];

  //    for (let key in this.searchData) {
  //      if (searchInfo[this.searchData[key]._fl_elem_name]) {
  //        console.log(this.searchData[key]._fl_elem_name);
  //        console.log(searchInfo[this.searchData[key]._fl_elem_name]);
  //        //  "t": "@eq", "k": "_fl_doc_name", "v": [this.baseName + "_SEARCH"] 
  //        //this.helpers.details[key]._fl_default_value = row[this.helpers.details[key]._fl_elem_name];
  //        // this._opts.reqbody.filter.push({
  //        //   "t": "@eq",
  //        //   "k": this.searchData[key]._fl_elem_name,
  //        //   "v": searchInfo[this.searchData[key]._fl_elem_name]
  //        // });
  //      }
  //    }
  //    this._opts.reqbody.lookup = this.baseName;
  //    //this._opts.reqbody.filter = [];
  //    this.service.addData(this._opts, 'search').subscribe
  //      (response => {
  //        console.log(' this.componentsData before');
  //        console.log(this.componentsData);
  //        // this.componentsData.push({ component: ListTableComponent, data: response['results'] });
  //        this.addData = this.generalService.getResult(response).results.rows;
  //        console.log(' this.componentsData after');
  //        console.log(this.componentsData);
  //      });
  //  }
  //);



  //console.log(this.helpers);

  /* for (let key in this.data.details) {
    // if (this.data.details[key]._fl_elem_type == "TEXT") {
    //   this.componentsData.push({ component: InputTextComponent, data: { dafaultValue: this.data.details[key]._fl_default_value, placeHolder: this.data.details[key]._fl_elem_label, elementName: this.data.details[key]._fl_elem_name } });
    // }

    if (this.data.details[key]._fl_elem_type == "SELECT") {
      this.componentsData.push({ component: SelectComponent, data: { dafaultValue: this.data.details[key]._fl_default_value, placeHolder: this.data.details[key]._fl_elem_label, elementName: this.data.details[key]._fl_elem_name } });
    }
    if (this.data.details[key]._fl_elem_type == "TEXT") {
      this.componentsData.push({ component: InputTextComponent, data: { dafaultValue: this.data.details[key]._fl_default_value, placeHolder: this.data.details[key]._fl_elem_label, elementName: this.data.details[key]._fl_elem_name } });
    }
    if (this.data.details[key]._fl_elem_type == "LABEL") {
      this.componentsData.push({ component: LabelComponent, data: { dafaultValue: this.data.details[key]._fl_default_value, placeHolder: this.data.details[key]._fl_elem_label, elementName: this.data.details[key]._fl_elem_name } });
    }
    if (this.data.details[key]._fl_elem_type == "TEXTAREA") {
      this.componentsData.push({ component: TextareaComponent, data: { dafaultValue: this.data.details[key]._fl_default_value, placeHolder: this.data.details[key]._fl_elem_label, elementName: this.data.details[key]._fl_elem_name } });
    }
    if (this.data.details[key]._fl_elem_type == "DATE" || this.data.details[key]._fl_elem_type == "DATETIME") {
      this.componentsData.push({ component: DatePickerComponent, data: { dafaultValue: this.data.details[key]._fl_default_value, placeHolder: this.data.details[key]._fl_elem_label, elementName: this.data.details[key]._fl_elem_name } });
    }
    if (this.data.details[key]._fl_elem_type == "NUMBER") {
      this.componentsData.push({ component: NumberComponent, data: { dafaultValue: this.data.details[key]._fl_default_value, placeHolder: this.data.details[key]._fl_elem_label, elementName: this.data.details[key]._fl_elem_name } });
    }
    if (this.data.details[key]._fl_elem_type == "BUTTON") {
      this.componentsData.push({ component: ButtonComponent, data: { dafaultValue: this.data.details[key]._fl_default_value, placeHolder: this.data.details[key]._fl_elem_label, elementName: this.data.details[key]._fl_elem_name } });
    } else {
      if (this.data.isEdit) {
        this.btn = false;
      } else {
        this.btn = true;
      }
    }
  }
  if (this.btn) {
    this.componentsData.push({ component: ButtonComponent, data: { dafaultValue: '', placeHolder: 'Add', addUserInd: true } });
  } else {
    this.componentsData.push({ component: ButtonComponent, data: { dafaultValue: '', placeHolder: 'Edit', editUserInd: true } });
  }

  // this.service.closeModal.subscribe(
  //   (lang) => {
  //     this.dialogRef.close();
  //   });
}

close() {
  // for (let key in this.data.details) {
  //   this.data.details[key]._fl_default_value = '';
  // }
  // this.dialogRef.close();
} */
}

}
