export class LicenseAccessToken{
    /**
     * The start date/ when the user aquired permissions to the access token
     */
    public AccessStartDate: string;


/**
 * When the token expires
 */
    public ExpirationDate: string;



   /**
    * the users enterprise api key 
    */
    public EnterpriseAPIKey: string;
    


    /**
     * Fathym Status
     */
    public  EnterpriseOverride: any;



    /**
     * Is the account locked
     */
    public IsLocked: boolean;



    /**
     * account reset
     */
    public IsReset: boolean;



    /**
     * The lookup name for the users plan
     */
    public Lookup: string;



    /**
     * Organization name
     */
    public Registry: string;



    /**
     * How long is the trial period
     */
    public TrialPeriodDays?: number;



    
    /**
     * Username linked to account
     */
    public Username: string;
}