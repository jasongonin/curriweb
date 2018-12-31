import { element, by, ElementFinder } from 'protractor';

export class CompetenceAplicationComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-competence-aplication div table .btn-danger'));
    title = element.all(by.css('jhi-competence-aplication div h2#page-heading span')).first();

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

export class CompetenceAplicationUpdatePage {
    pageTitle = element(by.id('jhi-competence-aplication-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    compApliNameInput = element(by.id('field_compApliName'));
    compApliLevelInput = element(by.id('field_compApliLevel'));
    compApliDescInput = element(by.id('field_compApliDesc'));
    experienceSelect = element(by.id('field_experience'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setCompApliNameInput(compApliName) {
        await this.compApliNameInput.sendKeys(compApliName);
    }

    async getCompApliNameInput() {
        return this.compApliNameInput.getAttribute('value');
    }

    async setCompApliLevelInput(compApliLevel) {
        await this.compApliLevelInput.sendKeys(compApliLevel);
    }

    async getCompApliLevelInput() {
        return this.compApliLevelInput.getAttribute('value');
    }

    async setCompApliDescInput(compApliDesc) {
        await this.compApliDescInput.sendKeys(compApliDesc);
    }

    async getCompApliDescInput() {
        return this.compApliDescInput.getAttribute('value');
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

export class CompetenceAplicationDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-competenceAplication-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-competenceAplication'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
