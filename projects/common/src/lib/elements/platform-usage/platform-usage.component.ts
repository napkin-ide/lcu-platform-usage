import { Component, OnInit, Injector } from '@angular/core';
import { LCUElementContext, LcuElementComponent, DataPipeConstants } from '@lcu/common';
import { Constants } from '../../utils/constants';
import { UserInfoModel } from '../../models/user-info.model';
import { DataGridModel } from '../../models/data-grid.model';
import { ColumnDefinition,  DataGridPagination, DataGridFeatures, DataGridConfig } from '@lowcodeunit/data-grid';
import { of } from 'rxjs/internal/observable/of';
import { BoxInfoModel } from '../../models/box-info.model';

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
   * The list of Active Free trial users coming from state
   */
  public ActiveUsers: Array<UserInfoModel>;

/**
 * The list of expired users coming from state
 */
  public ExpiredUsers: Array<UserInfoModel>;

/**
 * The list of paid subscribers coming from state
 */
  public PaidSubscribers: Array<UserInfoModel>;

/**
 * The Total amount of users who have signed up for the free trial 
 */
  public TotalFreeTrialSignUps: number;

  /**
   * The number of users who paid for subscription after using the free trial
   */
  public FreeToPaid: number;

  /**
   * The number of users who skipped the free trial and went straight to a paid subscription
   */
  public StraightToPaid: number;

  /**
   * The Percentage of paid subscribers who used the free trial
   */
  public FreeToPaidPercentage: string;

  /**
   * The Percentage of paid subscribers who skipped the free trial
   */
  public StraightToPaidPercentage: string;

  /**
   * The info that is passed to the totals box for active users
   */
  public ActiveUsersStats: Array<BoxInfoModel>;

  /**
   * The info that is passed to the totals box for expired users
   */
  public ExpiredUsersStats: Array<BoxInfoModel>;

  /**
   * The info that is passed to the totals box for paid subscribers
   */
  public PaidSubscribersStats: Array<BoxInfoModel>;

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
    this.PaidSubscribers = new Array<UserInfoModel>();
    this.ActiveUsers = new Array<UserInfoModel>();
    this.ExpiredUsers = new Array<UserInfoModel>();
    this.StraightToPaid = 0;
    this.FreeToPaid = 0;
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
    this.SetTotals();
    this.SetUpBoxInfo();
  }

  //  API Methods

  //  Helpers
  public SetPaidGridParameters(): void {
    // hardcoding values for demo, real world these would be pushed in
    this.PaidSubscribers = Constants.PAID_DATA;
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
        'Sign up Date',
        true,
        true,
        false,
        DataPipeConstants.PIPE_SHORTDATE
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
    console.log("Grid params: ", this.PaidGridParameters)
  }

  public SetActiveGridParameters(): void {

    // hardcoding values for demo, real world these would be pushed in
    this.ActiveUsers = Constants.ACTIVE_DATA;
    let activeData = of(Constants.ACTIVE_DATA);



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
        'Sign up Date',
        true,
        true,
        false,
        DataPipeConstants.PIPE_SHORTDATE
      ),
      new ColumnDefinition(
        'ExpirationDate',
        'Expiration Date',
        true,
        true,
        false,
        DataPipeConstants.PIPE_SHORTDATE
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
    this.ActiveGridParameters = new DataGridConfig(activeData, this.activeColumnDefs);
    console.log("Grid params: ", this.ActiveGridParameters)
  }


  public SetExpiredGridParameters(): void {

    // hardcoding values for demo, real world these would be pushed in
    this.ExpiredUsers = Constants.EXPIRED_DATA;
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
        DataPipeConstants.PIPE_SHORTDATE
      ),
      new ColumnDefinition(
        'ExpirationDate',
        'Expiration Date',
        true,
        true,
        false,
        DataPipeConstants.PIPE_SHORTDATE
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

  protected SetTotals(){
    this.SetTotalFreeSignUps();
    this.CalcPaidVsFree();
  }
  protected SetTotalFreeSignUps(){
    // Using Hard coded values will need to change when state comes in
    this.TotalFreeTrialSignUps = Constants.EXPIRED_DATA.length + Constants.ACTIVE_DATA.length;
  }

  protected CalcPaidVsFree(){
    this.PaidSubscribers.forEach(user => {
      if(user.FreeTrialSignUp){
        console.log("free to paid")
        this.FreeToPaid += 1;
      }
      else{
        this.StraightToPaid +=1;
      }
      
    }
    
    );
    this.FreeToPaidPercentage = Math.round((this.FreeToPaid / this.PaidSubscribers.length)*100).toString() +'%';
    this.StraightToPaidPercentage = Math.round((this.StraightToPaid / this.PaidSubscribers.length)*100).toString() +'%';
  }

  protected SetUpBoxInfo(){
    this.ActiveUsersStats = new Array<BoxInfoModel>();
    this.ActiveUsersStats.push(new BoxInfoModel("Total Active Users", new Array<string>(this.ActiveUsers.length.toString())));

    this.ExpiredUsersStats = new Array<BoxInfoModel>();
    this.ExpiredUsersStats.push(new BoxInfoModel("Total Expired Users", new Array<string>(this.ExpiredUsers.length.toString())));
    this.ExpiredUsersStats.push(new BoxInfoModel("Total Free Trial Sign Ups", new Array<string>(this.TotalFreeTrialSignUps.toString())));

    this.PaidSubscribersStats = new Array<BoxInfoModel>();
    this.PaidSubscribersStats.push(new BoxInfoModel("Total Paid Subscribers", new Array<string>(this.PaidSubscribers.length.toString())));
    this.PaidSubscribersStats.push(new BoxInfoModel("Used Free Trial", new Array<string>(this.FreeToPaid.toString() +" (" + this.FreeToPaidPercentage + ")")));
    this.PaidSubscribersStats.push(new BoxInfoModel("Skipped Free Trial", new Array<string>(this.StraightToPaid.toString() +" ("+ this.StraightToPaidPercentage +")")));

  }
}
