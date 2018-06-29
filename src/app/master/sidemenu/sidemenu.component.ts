import { Component, OnInit, Input } from '@angular/core';
import { menus } from './menu-element';
import { GeneralServiceService } from '../../services/general-service.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {

    @Input() iconOnly:boolean = false;
    public menus = menus;

    constructor(public generalService: GeneralServiceService) { }

    ngOnInit() {
      this.generalService.GetMenuList().subscribe
        (repsonse => {
        this.menus = repsonse.metaDataRelatedTables;
      });
    }

}
