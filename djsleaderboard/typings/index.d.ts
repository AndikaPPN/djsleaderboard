declare module DJSleaderboard {
    export interface BOTTOKEN {
        token?: string;
    }
}

declare class DJSleaderboard {
    constructor(options: DJSleaderboard.BOTTOKEN)
    make(data: any, itemPerPage: number, page: number): void;
    
    on(event: '--help', listener: () => void): this;
}

declare module "djsleaderboard" {
    export = DJSleaderboard
}