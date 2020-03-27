import { Component, OnInit } from '@angular/core';
import { Constants } from '../../utils/constants';
import { UserInfoModel } from '../../models/user-info.model';

@Component({
  selector: 'lcu-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss']
})
export class DataGridComponent implements OnInit {

  public UserData: Array<UserInfoModel>;

  public DisplayedColumns: Array<string>;

  constructor() {
    this.UserData = Constants.USER_DATA;
    this.DisplayedColumns = ['Email', 'Username', 'FreeTrialSignUp', 'ExpirationDate', 'PaidSignUpDate'];
   }

  ngOnInit(): void {
    
  }

}
