import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ModalComponent } from '../modal/modal.component';
import { GeneralServiceService } from '../../services/general-service.service';
import { ListTableComponent } from '../list-table/list-table.component';
import { DocumentManagerService } from '../../document-manager/services/document-manager.service';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  constructor(public dialog: MatDialog, private service: GeneralServiceService, private documentManagerService: DocumentManagerService) { }
  helpers;

  searchData: any;

  ngOnInit() {
    //  console.log('i am in btn component');
    // console.log(this.helpers);

    // this.documentManagerService.getSearchObject().subscribe(
    //   (data) => {
    //     this.searchData = data;
    //   });
  }

  buttonAction() {
    if (this.helpers.editDetailsInd == true) {
      const dialogRef = this.dialog.open(ModalComponent, {
        width: '700px',
        height: '500px',
        data: { name: 'Details of the form:' }
      });
    } else if (this.helpers.searchDetailsInd == true) {
      this.service.searchTable();
      //this.documentManagerService.searchEvent();
      

    }
  }
}
