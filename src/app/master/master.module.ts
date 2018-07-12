import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule, MatSidenavModule, MatCheckboxModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MasterComponent } from './master.component';
import { SidemenuItemComponent } from './sidemenu-item/sidemenu-item.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { ListComponent } from './list/list.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { DocListComponent } from '../shared/doc-list/doc-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { DriverComponent } from '../shared/driver/driver.component';
import { SharedModule } from '../shared/shared.module';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

// export const appRoutes: Routes = [{ 
//   path:'',component: MasterComponent, children: [
//     {path: 'document-manager', component: DocumentManagerComponent},
//      {path: 'addnew', component: CreateDocumentComponent},
//      {path: 'details', component: DocumentDetailsComponent},
//   ]}
// ]

export const appRoutes: Routes = [{
  path: '', component: MasterComponent, children: [
    { path: 'document-list', component: DocListComponent },
    //{ path: 'document-manager/:apiLink', loadChildren: '../document-manager/master-document.module#MasterDocumentModule' },
    { path: 'document-manager/:baseName', loadChildren: '../document-manager/master-document.module#MasterDocumentModule' },
    { path: 'driver/:baseName', component: DriverComponent },
  ]
}
]

@NgModule({

  declarations: [
    MasterComponent,
    SidemenuComponent,
    SidemenuItemComponent,
    ListComponent,
    ToolbarComponent,
    UserMenuComponent,
    DocListComponent
  ],

  imports: [
    RouterModule.forRoot(appRoutes),
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatChipsModule,
    MatListModule,
    MatCheckboxModule,
    CommonModule,
    FlexLayoutModule,
    PerfectScrollbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,MatSortModule,SharedModule

  ],
  exports: [RouterModule],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})

export class MasterModule { }