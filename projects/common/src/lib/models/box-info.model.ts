export class BoxInfoModel{
    /**
     * The Title of the Box
     */
    public Title: string;

    public Stats: Array<string>;

    constructor(title: string, stats: Array<string>){
        this.Title = title;
        this.Stats = stats;
    }
}