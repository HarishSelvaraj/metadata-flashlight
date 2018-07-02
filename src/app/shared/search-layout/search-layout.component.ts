import { Component, OnInit, Input, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InputTextComponent } from '../input-text/input-text.component';
import { SelectComponent } from '../select/select.component';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { ButtonComponent } from '../button/button.component';
import { TextareaComponent } from '../textarea/textarea.component';
import { LabelComponent } from '../label/label.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


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
  animal: string;
  name: string;
  flex = 25;
  btn: boolean = false;
  constructor(private http: HttpClient, public dialog: MatDialog) { }

  ngOnInit() {
    debugger;
    for (let key in this.helpers.details) {

      if (this.helpers.details[key]._fl_elem_type == "SELECT") {
        this.componentsData.push({ component: SelectComponent, data: { dafaultValue: this.helpers.details[key]._fl_default_value, placeHolder: this.helpers.details[key]._fl_elem_label} });
      }
      if (this.helpers.details[key]._fl_elem_type == "TEXT") {
        this.componentsData.push({ component: InputTextComponent, data: { dafaultValue: this.helpers.details[key]._fl_default_value, placeHolder: this.helpers.details[key]._fl_elem_label } });
      }
      if (this.helpers.details[key]._fl_elem_type == "LABEL") {
        this.componentsData.push({ component: LabelComponent, data: { dafaultValue: this.helpers.details[key]._fl_default_value, placeHolder: this.helpers.details[key]._fl_elem_label } });
      }
      if (this.helpers.details[key]._fl_elem_type == "TEXTAREA") {
        this.componentsData.push({ component: TextareaComponent, data: { dafaultValue: this.helpers.details[key]._fl_default_value, placeHolder: this.helpers.details[key]._fl_elem_label } });
      }
      if (this.helpers.details[key]._fl_elem_type == "BUTTON") {
        this.componentsData.push({ component: ButtonComponent, data: { dafaultValue: this.helpers.details[key]._fl_default_value, placeHolder: this.helpers.details[key]._fl_elem_label } });
      } else {
        this.btn = true;
      }
    }
    if (this.btn){
      this.componentsData.push({ component: ButtonComponent, data: { dafaultValue: '', placeHolder: 'search' } });
    }
    this.helpers.details;
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

  openModal(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

}


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
