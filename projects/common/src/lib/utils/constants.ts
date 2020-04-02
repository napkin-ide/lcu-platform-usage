// @dynamic
/**
 * @dynamic need this because there are static memebers
 */

import { UserInfoModel } from '../models/user-info.model';




export class Constants {
    public TodaysDate = new Date();

    public static readonly PAID_DATA: Array<UserInfoModel> = [
        {Email: "jake@statefarm.com", Username: "Ja From State Farm", FreeTrialSignUp: new Date(2020,0,1), PaidSignUpDate: new Date(2020,7,7) },
        {Email: "lmuemu@lmu.com", Username: "LMU Emu", FreeTrialSignUp: new Date(2020,0,1),  PaidSignUpDate: new Date(2020,0,16) },
        {Email: "mr.mayhem@allstate.com", Username: "Mr. Mayhem", FreeTrialSignUp: null,  PaidSignUpDate: new Date(2020,3,1) },
        {Email: "jake@statefarm.com", Username: "Ja From State Farm", FreeTrialSignUp: new Date(2020,0,1), PaidSignUpDate: new Date(2020,7,7) },
        {Email: "lmuemu@lmu.com", Username: "LMU Emu", FreeTrialSignUp: new Date(2020,0,1),  PaidSignUpDate: new Date(2020,0,16) },
        {Email: "mr.mayhem@allstate.com", Username: "Mr. Mayhem", FreeTrialSignUp: null,  PaidSignUpDate: new Date(2020,3,1) },
      ];

      public static readonly ACTIVE_DATA: Array<UserInfoModel> = [
        {Email: "jake@statefarm.com", Username: "Jake From State Farm", FreeTrialSignUp: new Date(2020,0,1), ExpirationDate: new Date(2020,0,15), DaysRemaining: 5 },
        {Email: "lmuemu@lmu.com", Username: "LMU Emu", FreeTrialSignUp: new Date(2020,0,1), ExpirationDate: new Date(2020,0,15), DaysRemaining: 10 }
      ];

      public static readonly EXPIRED_DATA: Array<UserInfoModel> = [
        {Email: "jake@statefarm.com", Username: "Jake From State Farm", FreeTrialSignUp: new Date(2020,0,1), ExpirationDate: new Date(2020,0,15) },
        {Email: "lmuemu@lmu.com", Username: "LMU Emu", FreeTrialSignUp: new Date(2020,0,1), ExpirationDate: new Date(2020,0,15) }
      ];
    }