import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
//import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
//import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule, MatTooltipModule,
  MatChipsModule, MatTableModule,
  MatPaginatorModule, MatSortModule,
  MatInputModule, MatSelectModule,
  MatDividerModule, MatCheckboxModule, MatDialogModule, MatSidenavModule, MatCardModule, MatButtonToggleModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ListTableComponent } from './list-table/list-table.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { SearchLayoutComponent, DialogOverviewExampleDialog } from './search-layout/search-layout.component';
import { InputTextComponent } from './input-text/input-text.component';
import { SelectComponent } from './select/select.component';
import { SearchDocumentComponent } from './search-document/search-document.component';
import { ComponentLoaderDirective } from '../directives/component-loader.directive';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { ButtonComponent } from './button/button.component';
//import { DocListComponent } from './doc-list/doc-list.component'; 
  import { LabelComponent } from './label/label.component';
import { TextareaComponent } from './textarea/textarea.component';
import { NumberComponent } from './number/number.component';



const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};



@NgModule({

  declarations: [
    ListTableComponent,
    PageHeaderComponent,
    SearchLayoutComponent,
    InputTextComponent,
    SelectComponent,
    SearchDocumentComponent,
    ComponentLoaderDirective,
    DatePickerComponent,
    ButtonComponent,
    DialogOverviewExampleDialog,
    LabelComponent,
    TextareaComponent,
    NumberComponent
  ],

  imports: [
    CommonModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSortModule,
    MatDialogModule,
    MatChipsModule,
    MatTooltipModule,
    MatTableModule,
    FlexLayoutModule,
    MatPaginatorModule,
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonToggleModule,
    MatInputModule,
    MatListModule,
    MatChipsModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  exports: [    
    ListTableComponent,
    PageHeaderComponent,
    SearchLayoutComponent,
    ComponentLoaderDirective
  ],
  entryComponents: [DialogOverviewExampleDialog,SearchLayoutComponent, InputTextComponent, 
    SelectComponent, DatePickerComponent, ButtonComponent, LabelComponent, TextareaComponent, NumberComponent],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})

export class SharedModule { }