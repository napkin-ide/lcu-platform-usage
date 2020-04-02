import { Component, OnInit, Input } from '@angular/core';
import { Constants } from '../../utils/constants';
import { UserInfoModel } from '../../models/user-info.model';
import { DataGridModel } from '../../models/data-grid.model';

@Component({
  selector: 'lcu-data-grid-1',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss']
})
export class DataGridComponent implements OnInit {
  
  @Input('data-grid') DataGrid: DataGridModel;


  constructor() {
   }

  ngOnInit(): void {
    console.log("Data Grid: ", this.DataGrid);
    
  }

}
