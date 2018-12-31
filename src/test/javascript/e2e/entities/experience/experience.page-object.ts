import { element, by, ElementFinder } from 'protractor';

export class ExperienceComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-experience div table .btn-danger'));
    title = element.all(by.css('jhi-experience div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ExperienceUpdatePage {
    pageTitle = element(by.id('jhi-experience-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    inicialInput = element(by.id('field_inicial'));
    endInput = element(by.id('field_end'));
    countryNameInput = element(by.id('field_countryName'));
    cityInput = element(by.id('field_city'));
    companySelect = element(by.id('field_company'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setInicialInput(inicial) {
        await this.inicialInput.sendKeys(inicial);
    }

    async getInicialInput() {
        return this.inicialInput.getAttribute('value');
    }

    async setEndInput(end) {
        await this.endInput.sendKeys(end);
    }

    async getEndInput() {
        return this.endInput.getAttribute('value');
    }

    async setCountryNameInput(countryName) {
        await this.countryNameInput.sendKeys(countryName);
    }

    async getCountryNameInput() {
        return this.countryNameInput.getAttribute('value');
    }

    async setCityInput(city) {
        await this.cityInput.sendKeys(city);
    }

    async getCityInput() {
        return this.cityInput.getAttribute('value');
    }

    async companySelectLastOption() {
        await this.companySelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async companySelectOption(option) {
        await this.companySelect.sendKeys(option);
    }

    getCompanySelect(): ElementFinder {
        return this.companySelect;
    }

    async getCompanySelectedOption() {
        return this.companySelect.element(by.css('option:checked')).getText();
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class ExperienceDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-experience-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-experience'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
