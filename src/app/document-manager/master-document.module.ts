import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule, MatTooltipModule, MatChipsModule, MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule, MatSelectModule, MatDividerModule, MatCheckboxModule } from '@angular/material';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DocumentDetailsComponent } from './document-details/document-details/document-details.component';
import { SearchComponent } from './document-details/search/search.component';
import { ListComponent } from './document-details/list/list.component';
import { EditComponent } from './document-details/edit/edit.component';
import { PortfolioComponent } from './document-details/portfolio/portfolio.component';
import { DocumentManagerComponent } from './document-manager/document-manager.component';
import { CreateDocumentComponent } from './create-document/create-document.component';
import { MasterDocumentComponent } from './master-document.component';
import { DocumentManagerService } from './services/document-manager.service';
import { SharedModule } from '../shared/shared.module';
import { ListTableComponent } from '../shared/list-table/list-table.component';
import {PageHeaderComponent} from '../shared/page-header/page-header.component';
import {ComponentLoaderDirective} from '../directives/component-loader.directive';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

// export const appRoutes: Routes = [
//   { path: '', component: DocumentManagerComponent },
//   { path: 'addnew', component: CreateDocumentComponent },
// ]

// export const appRoutes: Routes = [{
//   path: '', component: MasterDocumentComponent, children: [
//     { path: '', component: DocumentManagerComponent},
//     { path: 'addnew', component: CreateDocumentComponent },
//   ]
// }
// ]


export const appRoutes: Routes = [
  {
    path: '', component: MasterDocumentComponent,
    children: [
      { path: '', component: DocumentManagerComponent },
      { path: 'addnew', component: CreateDocumentComponent },
      { path: 'details', component: DocumentDetailsComponent }
    ]
  },
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes),
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatSidenavModule,
    PerfectScrollbarModule,
    MatTooltipModule,
    MatChipsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatDividerModule,
    FlexLayoutModule,
    SharedModule
  ],
  declarations: [MasterDocumentComponent,
    DocumentManagerComponent,
    CreateDocumentComponent,
    DocumentDetailsComponent,
    SearchComponent,
    ListComponent,
    EditComponent,
    PortfolioComponent,
    ComponentLoaderDirective],
  entryComponents: [PageHeaderComponent,ListTableComponent],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    DocumentManagerService,
  ]
})
export class MasterDocumentModule { }
