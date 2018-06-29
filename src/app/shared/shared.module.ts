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
  MatDividerModule, MatCheckboxModule, MatSidenavModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ListTableComponent } from './list-table/list-table.component';
import { PageHeaderComponent } from './page-header/page-header.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};



@NgModule({

  declarations: [
    ListTableComponent,
    PageHeaderComponent
  ],

  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatSortModule,
    MatChipsModule,
    MatTooltipModule,
    MatTableModule,
    FlexLayoutModule
  ],
  exports: [    
    ListTableComponent,
    PageHeaderComponent
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})

export class SharedModule { }