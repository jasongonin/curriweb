import { element, by, ElementFinder } from 'protractor';

export class CompetenceComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-competence div table .btn-danger'));
    title = element.all(by.css('jhi-competence div h2#page-heading span')).first();

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

export class CompetenceUpdatePage {
    pageTitle = element(by.id('jhi-competence-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    compNameInput = element(by.id('field_compName'));
    compDescInput = element(by.id('field_compDesc'));
    competenceAplicationSelect = element(by.id('field_competenceAplication'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setCompNameInput(compName) {
        await this.compNameInput.sendKeys(compName);
    }

    async getCompNameInput() {
        return this.compNameInput.getAttribute('value');
    }

    async setCompDescInput(compDesc) {
        await this.compDescInput.sendKeys(compDesc);
    }

    async getCompDescInput() {
        return this.compDescInput.getAttribute('value');
    }

    async competenceAplicationSelectLastOption() {
        await this.competenceAplicationSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async competenceAplicationSelectOption(option) {
        await this.competenceAplicationSelect.sendKeys(option);
    }

    getCompetenceAplicationSelect(): ElementFinder {
        return this.competenceAplicationSelect;
    }

    async getCompetenceAplicationSelectedOption() {
        return this.competenceAplicationSelect.element(by.css('option:checked')).getText();
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

export class CompetenceDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-competence-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-competence'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
