import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GeneralServiceService } from '../../services/general-service.service';
//import { SearchLayoutComponent } from '../search-layout/search-layout.component';
import { SelectComponent } from '../select/select.component';
import { InputTextComponent } from '../input-text/input-text.component';
import { LabelComponent } from '../label/label.component';
import { TextareaComponent } from '../textarea/textarea.component';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { NumberComponent } from '../number/number.component';
import { ButtonComponent } from '../button/button.component';
import { DocumentManagerService } from '../../document-manager/services/document-manager.service';
import { ListTableComponent } from '../list-table/list-table.component';
@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss']
})
export class DriverComponent implements OnInit {
  baseName;
  searchData;
  metaData;
  _opts;
  listdata;
  inputData: any = [];
  formType = 'search';
  @Input() componentsData: Array<any> = [];
  @ViewChild(ListTableComponent) listCmp: ListTableComponent;
  // @Input() inputData: Array<any> = [];
  constructor(private router: Router, private route: ActivatedRoute, private generalService: GeneralServiceService, private documentManagerService: DocumentManagerService) {
    this.route.params.subscribe(params => {
      this.baseName = params['baseName'];
    });

  }
  triggerNav = () => {

    this.router.navigate(['/driver', this.baseName, 'add']);
  }
  tiggerBtnClick = (obj) => {
    debugger;
    this.listCmp.doSomething(obj);
  }
  ngOnInit() {
    //  1 Primary Base Name
    // Primary Operation
    // Filter Condition

    this._opts = {
      "reqbody": {
        "oper": "list",
        "lookup": "META_MASTER",
        "filter": [{ "t": "@eq", "k": "_fl_doc_name", "v": [this.baseName + "_SEARCH"] }]
      }
    }

    this.metaData = {};
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
    //      placeHolder: 'search',
    //      searchDetailsInd: true
    //    }
    //  });

    //}

    //let _lcallback = function (err, tObj, retObj, _callback) {
    //  tObj.generalService.getMetaSearch(tObj._opts, 'search').subscribe(response => {
    //    tObj.metaData[retObj] = tObj.generalService.getResult(response);

    //    if (typeof (_callback) === "function") {
    //      tObj._opts.reqbody.lookup = "META_DETAIL";
    //      _callback(null, tObj, "detail", function (err, tObj) {
    //        _lrenderSearch(err, tObj);
    //      });
    //    }
    //  });

    //}

    //_lcallback(null, this, "master", _lcallback);

    this.generalService.langUpdated.subscribe(
      (lang) => {
        let searchInfo = this.documentManagerService.getSearchObject();
        this._opts.reqbody.filter = [];

        for (let key in this.searchData) {
          if (searchInfo[this.searchData[key]._fl_elem_name]) {
            console.log(this.searchData[key]._fl_elem_name);
            console.log(searchInfo[this.searchData[key]._fl_elem_name]);
            //  "t": "@eq", "k": "_fl_doc_name", "v": [this.baseName + "_SEARCH"] 
            //this.helpers.details[key]._fl_default_value = row[this.helpers.details[key]._fl_elem_name];
            let _val = [];
            _val.push(searchInfo[this.searchData[key]._fl_elem_name]);
      
            this._opts.reqbody.filter.push({
              "t": "@eq",
              "k": this.searchData[key]._fl_elem_name,
              "v": _val
            });
          }
        }
        this._opts.reqbody.lookup = this.baseName;
        //this._opts.reqbody.filter = [];
        this.generalService.getMetaSearch(this._opts, 'search').subscribe
          (response => {
            console.log(' this.componentsData before');
            console.log(this.componentsData);
            this.inputData = response['results'];
            //this.componentsData.push({ component: ListTableComponent, data: response['results'] });
            this.listdata = this.generalService.getResult(response).results.rows;
            console.log(' this.componentsData after');
            console.log(this.componentsData);
          });
      }
    );



  }

}
