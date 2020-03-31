import { UserInfoModel } from './user-info.model';

/**
 * UserInfo user for the user account sidenav and any other user info needed along the way
 * 
 * of development
 */
export class DataGridModel {
    /**
     * The Title to display as well as the tab label
     */
    public Title: string;

    /**
     * The User Data to display in the data grid
     */
    public UserData: Array<UserInfoModel>;

    /**
     * The Columns to display for the data grid
     */
    public DisplayedColumns: Array<string>;
}
