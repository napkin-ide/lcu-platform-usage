import { Component, OnInit, Injector } from '@angular/core';
import { LCUElementContext, LcuElementComponent, DataPipeConstants } from '@lcu/common';
import { Constants } from '../../utils/constants';
import { UserInfoModel } from '../../models/user-info.model';
import { DataGridModel } from '../../models/data-grid.model';
import { ColumnDefinition,  DataGridPagination, DataGridFeatures, DataGridConfig } from '@lowcodeunit/data-grid';
import { of } from 'rxjs/internal/observable/of';

export class LcuPlatformUsagePlatformUsageElementState { }

export class LcuPlatformUsagePlatformUsageContext extends LCUElementContext<LcuPlatformUsagePlatformUsageElementState> { }

export const SELECTOR_LCU_PLATFORM_USAGE_PLATFORM_USAGE_ELEMENT = 'lcu-platform-usage-platform-usage-element';

@Component({
  selector: SELECTOR_LCU_PLATFORM_USAGE_PLATFORM_USAGE_ELEMENT,
  templateUrl: './platform-usage.component.html',
  styleUrls: ['./platform-usage.component.scss']
})
export class LcuPlatformUsagePlatformUsageElementComponent extends LcuElementComponent<LcuPlatformUsagePlatformUsageContext> implements OnInit {
  //  Fields

  //  Properties
  public UserData: any;

  public DisplayedColumns: Array<string>;

  public DataGrid: DataGridModel;

  /**
 * Sets column names and order for active free trial users
 */
  protected activeColumnDefs: Array<ColumnDefinition> = [];

  /**
   * Sets column names and order for expired free trial users
   */
  protected expiredColumnDefs: Array<ColumnDefinition> = [];

  /**
   * Sets column names and order for paid subscribers
   */
  protected paidColumnDefs: Array<ColumnDefinition> = [];

  /**
 * Grid features, such as: Pagination, Filtering, Loader, etc.
 */
  protected _gridFeatures: DataGridFeatures;
  public get GridFeatures(): DataGridFeatures {
    return this._gridFeatures;
  }

  public set GridFeatures(val: DataGridFeatures) {
    this._gridFeatures = val;
  }

  /**
    * Parameters needed for the grid
   */
  protected _activeGridParameters: DataGridConfig;
  public set ActiveGridParameters(val: DataGridConfig) {
    this._activeGridParameters = val;
  }

  public get ActiveGridParameters(): DataGridConfig {
    return this._activeGridParameters;
  }

  protected _expiredGridParameters: DataGridConfig;
  public set ExpiredGridParameters(val: DataGridConfig) {
    this._expiredGridParameters = val;
  }

  public get ExpiredGridParameters(): DataGridConfig {
    return this._expiredGridParameters;
  }

  /**
   * paid
   * @param injector 
   */
  protected _paidGridParameters: DataGridConfig;
  public set PaidGridParameters(val: DataGridConfig) {
    this._paidGridParameters = val;
  }

  public get PaidGridParameters(): DataGridConfig {
    return this._paidGridParameters;
  }

  //  Constructors
  constructor(protected injector: Injector) {
    super(injector);
    //   this.DataGrid = new DataGridModel();
    //   this.DataGrid.UserData = Constants.USER_DATA;
    //   this.DataGrid.DisplayedColumns = ['Email', 'Username', 'FreeTrialSignUp', 'ExpirationDate', 'PaidSignUpDate'];
  }

  //  Life Cycle
  public ngOnInit() {
    super.ngOnInit();
    this.SetActiveGridParameters();
    this.SetExpiredGridParameters();
    this.SetPaidGridParameters();
  }

  //  API Methods

  //  Helpers
  public SetPaidGridParameters(): void {
    // hardcoding values for demo, real world these would be pushed in
    let paidData = of(Constants.PAID_DATA);
    console.log("paidData: ", Constants.PAID_DATA)


    this.paidColumnDefs = [
      new ColumnDefinition(
        'Username',
        'Username',
        true,
        false,
        false
      ),
      new ColumnDefinition(
        'Email',
        'Email',
        true,
        true,
        false
      ),
      new ColumnDefinition(
        'FreeTrialSignUp',
        'Free Trial Sign up Date',
        true,
        true,
        false,
        DataPipeConstants.PIPE_DATE
      ),
      new ColumnDefinition(
        'PaidSignUpDate',
        'Paid Sign up Date',
        true,
        true,
        false,
        DataPipeConstants.PIPE_SHORTDATE
      ),

    ];

    this.setGridFeatures();

    // showing grid column headers
    this.PaidGridParameters = new DataGridConfig(paidData, this.paidColumnDefs);
    debugger;
    console.log("Grid params: ", this.PaidGridParameters)
  }

  public SetActiveGridParameters(): void {

    // hardcoding values for demo, real world these would be pushed in
    this.UserData = of(Constants.ACTIVE_DATA);


    this.activeColumnDefs = [
      new ColumnDefinition(
        'Username',
        'Username',
        true,
        false,
        false
      ),
      new ColumnDefinition(
        'Email',
        'Email',
        true,
        true,
        false
      ),
      new ColumnDefinition(
        'FreeTrialSignUp',
        'Free Trial Sign up Date',
        true,
        true,
        false,
        DataPipeConstants.DATE_FMT
      ),
      new ColumnDefinition(
        'ExpirationDate',
        'Expiration Date',
        true,
        true,
        false,
        DataPipeConstants.DATE_FMT
      ),
      new ColumnDefinition(
        'DaysRemaining',
        'Days Remaining',
        true,
        true,
        false
      )

    ];

    this.setGridFeatures();

    // showing grid column headers
    this.ActiveGridParameters = new DataGridConfig(this.UserData, this.activeColumnDefs);
    console.log("Grid params: ", this.ActiveGridParameters)
  }


  public SetExpiredGridParameters(): void {

    // hardcoding values for demo, real world these would be pushed in
    let ExpiredData = of(Constants.EXPIRED_DATA);


    this.expiredColumnDefs = [
      new ColumnDefinition(
        'Username',
        'Username',
        true,
        false,
        false
      ),
      new ColumnDefinition(
        'Email',
        'Email',
        true,
        true,
        false
      ),
      new ColumnDefinition(
        'FreeTrialSignUp',
        'Free Trial Sign up Date',
        true,
        true,
        false,
        DataPipeConstants.DATE_FMT
      ),
      new ColumnDefinition(
        'ExpirationDate',
        'Expiration Date',
        true,
        true,
        false,
        DataPipeConstants.DATE_FMT
      )
    ];

    this.setGridFeatures();

    // showing grid column headers
    this.ExpiredGridParameters = new DataGridConfig(ExpiredData, this.expiredColumnDefs);
    console.log("Grid params: ", this.ExpiredGridParameters)
  }


  /**
   * Setting up grid features
   */
  protected setGridFeatures(): void {
    const paginationDetails: DataGridPagination = new DataGridPagination();
    paginationDetails.PageSize = 10;
    paginationDetails.PageSizeOptions = [1, 5, 10, 20, 30];

    const features: DataGridFeatures = new DataGridFeatures();
    features.Paginator = paginationDetails;
    features.Filter = true;
    features.ShowLoader = true;
    features.RowColorEven = 'gray';
    features.RowColorOdd = 'light-gray';

    this.GridFeatures = features;
  }
}
