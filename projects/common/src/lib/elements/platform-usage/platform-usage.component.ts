import { Component, OnInit, Injector, AfterContentInit } from '@angular/core';
import { LCUElementContext, LcuElementComponent, DataPipeConstants } from '@lcu/common';
import { Constants } from '../../utils/constants';
import { UserInfoModel } from '../../models/user-info.model';
import { DataGridModel } from '../../models/data-grid.model';
import { ColumnDefinition,  DataGridPagination, DataGridFeatures, DataGridConfig } from '@lowcodeunit/data-grid';
import { of } from 'rxjs/internal/observable/of';
import { BoxInfoModel } from '../../models/box-info.model';
import { UserManagementStateContext } from '../../state/user-management/user-management-state.context';
import { templateJitUrl } from '@angular/compiler';
import { LicenseAccessToken } from '../../models/license-access-token.model';
import { UserManagementState } from '../../state/user-management/user-management.state';

export class LcuPlatformUsagePlatformUsageElementState { }

export class LcuPlatformUsagePlatformUsageContext extends LCUElementContext<LcuPlatformUsagePlatformUsageElementState> { }

export const SELECTOR_LCU_PLATFORM_USAGE_PLATFORM_USAGE_ELEMENT = 'lcu-platform-usage-platform-usage-element';

@Component({
  selector: SELECTOR_LCU_PLATFORM_USAGE_PLATFORM_USAGE_ELEMENT,
  templateUrl: './platform-usage.component.html',
  styleUrls: ['./platform-usage.component.scss']
})
export class LcuPlatformUsagePlatformUsageElementComponent extends LcuElementComponent<LcuPlatformUsagePlatformUsageContext> implements OnInit, AfterContentInit {
  //  Fields

  //  Properties
  /**
   * The list of all the accesstokens converted into user info model
   */
  public SubscriberList: Array<UserInfoModel>;

/**
 * Column names to be displayed 
 */
  public DisplayedColumns: Array<string>;

/**
 * The data grid used to display all info
 */
  public DataGrid: DataGridModel;

  /**
   * The list of Active Free trial users coming from state
   */
  public ActiveTrialUsers: Array<UserInfoModel>;

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
 * The user management state
 */
  public State: UserManagementState;

  /**
   * The Percentage of paid subscribers who skipped the free trial
   */
  public StraightToPaidPercentage: string;

  /**
   * The info that is passed to the totals box for active Free trial users
   */
  public ActiveTrialUsersStats: Array<BoxInfoModel>;

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
  constructor(protected injector: Injector,
    protected userMgmtState: UserManagementStateContext,
    ) {
    super(injector);
    this.PaidSubscribers = new Array<UserInfoModel>();
    this.ActiveTrialUsers = new Array<UserInfoModel>();
    this.ExpiredUsers = new Array<UserInfoModel>();
    this.StraightToPaid = 0;
    this.FreeToPaid = 0;
    this.TotalFreeTrialSignUps = 0;
    this.FreeToPaidPercentage = "0%";
    this.StraightToPaidPercentage = "0%";
  }

  //  Life Cycle
  public ngOnInit() {
    super.ngOnInit();
    this.userMgmtState.Context.subscribe((state: any) => {
      this.State = state;
      console.log('UserManagement state: ', this.State);
      this.stateChanged();
    });
    
    
    this.setActiveGridParameters();
    this.setExpiredGridParameters();
    this.setPaidGridParameters();
    this.setUpBoxInfo();
    this.userMgmtState.ListSubscribers();
    

    
  }


  public  ngAfterContentInit(): void {
  }

  //  API Methods

  //  Helpers

  /**
 * Runs when the state changes
 */
protected stateChanged(){
  console.log("State Changed: ", this.State);
  
  if(this.State.Subscribers && this.State.Subscribers.length > 0){
    this.convertSubscribers();
    this.buildActiveTrialUsers();
    this.buildExpiredUsers();
    this.buildPaidSubscribers();
    this.SetTotalFreeSignUps();
    this.setUpBoxInfo();
  } 
}

  /**
   * Sets up the paid grid parameters
   */
  protected setPaidGridParameters(): void {
    // hardcoding values for demo, real world these would be pushed in
    // this.PaidSubscribers = Constants.PAID_DATA;
    let paidData = of(this.PaidSubscribers);
    // console.log("paidData: ", Constants.PAID_DATA)
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
    // console.log("Grid params: ", this.PaidGridParameters)
  }

  /**
   * Sets up the Active grid parameters
   */
  protected setActiveGridParameters(): void {

    // hardcoding values for demo, real world these would be pushed in
    // this.ActiveUsers = Constants.ACTIVE_DATA;
    let activeData = of(this.ActiveTrialUsers);



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
    // console.log("Grid params: ", this.ActiveGridParameters)
  }


  /**
   * Sets up the expired grid params
   */
  public setExpiredGridParameters(): void {

    // hardcoding values for demo, real world these would be pushed in
    // this.ExpiredUsers = Constants.EXPIRED_DATA;
    let ExpiredData = of(this.ExpiredUsers);


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
    // console.log("Grid params: ", this.ExpiredGridParameters)
  }


  /**
   * Setting up grid features and styles
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

  /**
   * calculates and sets up the total amount of free trial accounts
   * 
   * expired accounts + the active free trial accounts 
   */
  protected SetTotalFreeSignUps(){
    // Using Hard coded values will need to change when state comes in
    // this.TotalFreeTrialSignUps = Constants.EXPIRED_DATA.length + Constants.ACTIVE_DATA.length;
    this.TotalFreeTrialSignUps = this.ExpiredUsers.length + this.ActiveTrialUsers.length;

  }


  protected convertSubscribers(){
    this.SubscriberList = new Array<UserInfoModel>();

    this.State.Subscribers.forEach((subscriber: LicenseAccessToken) => {
      let tempUser: UserInfoModel = new UserInfoModel();
      //filter out any duplicate users by email address
      let tempSubscriber = this.State.Subscribers.filter((sub: LicenseAccessToken) => subscriber.Username === sub.Username);
      //These should remain constant accross all instances of the tempSubscriber
      tempUser.Email = subscriber.Username;
      tempUser.Organization = subscriber.Registry;

      // Unsure if this is actually how its designed so commented out until data flows
      // if(subscriber.EnterpriseOverride.UserName){
      //   tempUser.Username = subscriber.EnterpriseOverride.UserName;
      // }
      // else{
      //   tempUser.Username = subscriber.UserName;
      // }
      tempSubscriber.forEach((temp: LicenseAccessToken) => {
        if(temp.Lookup === "Free Trial"){
          tempUser.FreeTrialSignUp = this.convertStringToDate(temp.AccessStartDate);
        }
        else{
          tempUser.PaidSignUpDate = this.convertStringToDate(temp.AccessStartDate);
        }
        if(temp.ExpirationDate){
          tempUser.ExpirationDate = this.convertStringToDate(temp.ExpirationDate);
        }
        if(temp.ExpirationDate && temp.AccessStartDate){ 
          tempUser.DaysRemaining = (tempUser.ExpirationDate.getTime() - this.convertStringToDate(subscriber.AccessStartDate).getTime()) / (1000 * 3600 * 24);
        }
      });
      console.log("temp user = ", tempUser);
      this.SubscriberList.push(tempUser);
    });
  }

  protected setUpBoxInfo(){
    //ACTIVE USER STATS
    this.ActiveTrialUsersStats = new Array<BoxInfoModel>();
    this.ActiveTrialUsersStats.push(new BoxInfoModel("Total Active Trial Users", new Array<string>(this.ActiveTrialUsers.length.toString())));

    //EXPIRED USER STATS
    this.ExpiredUsersStats = new Array<BoxInfoModel>();
    this.ExpiredUsersStats.push(new BoxInfoModel("Total Expired Users", new Array<string>(this.ExpiredUsers.length.toString())));
    this.ExpiredUsersStats.push(new BoxInfoModel("Total Free Trial Sign Ups", new Array<string>(this.TotalFreeTrialSignUps.toString())));
    
    //PAID SUBSCRIBERS STATS
    this.PaidSubscribersStats = new Array<BoxInfoModel>();
    this.PaidSubscribersStats.push(new BoxInfoModel("Total Paid Subscribers", new Array<string>(this.PaidSubscribers.length.toString())));
    this.PaidSubscribersStats.push(new BoxInfoModel("Used Free Trial", new Array<string>(this.FreeToPaid.toString() +" (" + this.FreeToPaidPercentage + ")")));
    this.PaidSubscribersStats.push(new BoxInfoModel("Skipped Free Trial", new Array<string>(this.StraightToPaid.toString() +" ("+ this.StraightToPaidPercentage +")")));

  }
/**
 * Builds the Active trial users array
 */
  protected buildActiveTrialUsers(){
    this.SubscriberList.forEach((subscriber: UserInfoModel)=>{
      if(subscriber.DaysRemaining > 0 && subscriber.FreeTrialSignUp){
        this.ActiveTrialUsers.push();
      }
    });
  }

  /**
   * builds the expired trial users array
   */
  protected buildExpiredUsers(){
    this.SubscriberList.forEach((subscriber: UserInfoModel)=>{
      if(subscriber.DaysRemaining < 0  && subscriber.FreeTrialSignUp){
        this.ExpiredUsers.push();
      }
    });
  }

  /**
   * builds the paid subscribers array and calculates the amount of paid subscribers that 
   * 
   * started with the free trial and those that went straight for the paid version 
   * 
   * as well as percentages
   */
  protected buildPaidSubscribers(){
    this.SubscriberList.forEach((subscriber: UserInfoModel)=>{
      if(subscriber.PaidSignUpDate){
        this.PaidSubscribers.push();

        if(subscriber.FreeTrialSignUp){
          this.FreeToPaid += 1;
        }
        else{
          this.StraightToPaid += 1;
        }
      }
      
    });
    //calc amount of users who went from free to paid
    this.FreeToPaidPercentage = Math.round((this.FreeToPaid / this.PaidSubscribers.length)*100).toString() +'%';
    if(!this.FreeToPaidPercentage){
      this.FreeToPaidPercentage = "0%"
    }
    //calc amount of users who went straight to the paid version
    this.StraightToPaidPercentage = Math.round((this.StraightToPaid / this.PaidSubscribers.length)*100).toString() +'%';
    if(!this.StraightToPaidPercentage){
      this.StraightToPaidPercentage = "0%"
    }
  }

  protected convertStringToDate(date: string): Date{
    let millSecs = Date.parse(date);
    let newDate = new Date(0);
    newDate.setTime(millSecs);
    // console.log("Date = ", newDate);
    return newDate;
  }
}
