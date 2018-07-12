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

  }

  buttonAction() {

    if (this.helpers.editDetailsInd == true) {
      const dialogRef = this.dialog.open(ModalComponent, {
        width: '800px',
        height: '400px',
        data: this.helpers.editDetails,
        disableClose: true
      });
    } else if (this.helpers.searchDetailsInd == true) {
      debugger;
      this.service.searchTable();
    } else if (this.helpers.addUserInd == true) {
      this.service.addUser();
    } else if(this.helpers.editUserInd == true) {
      this.service.editUser();
    }
  }
}
