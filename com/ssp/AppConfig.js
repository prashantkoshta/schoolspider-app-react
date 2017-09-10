export class AppConfig {
    static configuration = {};
    static isAppLoaded = false;
    constructor(){
        
    }
    static setConfig(o){
        AppConfig.configuration = o;
        AppConfig.isAppLoaded = true;
    };
    static getConfig(){
        return AppConfig.configuration;
    }

    static getScreenDataById(screenId){
        return this.configuration[screenId]
    }
}