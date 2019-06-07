export default interface ITagPage {
    getPageHeader() : Promise<String>;
    getPageSubHeader() : Promise<String>;
    getFooterText() : Promise<String>;
    getPageMessage() : Promise<String>;
    closePageMessage() : Promise<void>;
}
