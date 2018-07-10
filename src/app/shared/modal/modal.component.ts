import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SelectComponent } from '../select/select.component';
import { InputTextComponent } from '../input-text/input-text.component';
import { LabelComponent } from '../label/label.component';
import { TextareaComponent } from '../textarea/textarea.component';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { NumberComponent } from '../number/number.component';
import { ButtonComponent } from '../button/button.component';
import { GeneralServiceService } from '../../services/general-service.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() componentsData: Array<any> = [];
  helpers;
  btn: boolean = false;

  constructor(public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private service: GeneralServiceService) { }

  ngOnInit() {

    console.log('im in modal compoenet');
    //console.log(this.helpers);

    for (let key in this.data.details) {
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

    this.service.closeModal.subscribe(
      (lang) => {
        this.dialogRef.close();
      });
  }

  close() {
    for (let key in this.data.details) {
      this.data.details[key]._fl_default_value = '';
    }
    this.dialogRef.close();
  }

}
