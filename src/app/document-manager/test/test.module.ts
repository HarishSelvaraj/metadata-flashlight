import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import {TestComponent} from './test.component';



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
    path: '', component: TestComponent,
  },
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes),
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ],
  declarations: [],
  providers: []
})
export class TestModule { }
