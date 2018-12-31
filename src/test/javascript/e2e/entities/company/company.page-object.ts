import { element, by, ElementFinder } from 'protractor';

export class CompanyComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-company div table .btn-danger'));
    title = element.all(by.css('jhi-company div h2#page-heading span')).first();

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

export class CompanyUpdatePage {
    pageTitle = element(by.id('jhi-company-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    companyNameInput = element(by.id('field_companyName'));
    companyDescriptionInput = element(by.id('field_companyDescription'));
    experienceSelect = element(by.id('field_experience'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setCompanyNameInput(companyName) {
        await this.companyNameInput.sendKeys(companyName);
    }

    async getCompanyNameInput() {
        return this.companyNameInput.getAttribute('value');
    }

    async setCompanyDescriptionInput(companyDescription) {
        await this.companyDescriptionInput.sendKeys(companyDescription);
    }

    async getCompanyDescriptionInput() {
        return this.companyDescriptionInput.getAttribute('value');
    }

    async experienceSelectLastOption() {
        await this.experienceSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async experienceSelectOption(option) {
        await this.experienceSelect.sendKeys(option);
    }

    getExperienceSelect(): ElementFinder {
        return this.experienceSelect;
    }

    async getExperienceSelectedOption() {
        return this.experienceSelect.element(by.css('option:checked')).getText();
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

export class CompanyDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-company-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-company'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
