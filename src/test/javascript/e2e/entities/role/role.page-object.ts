import { element, by, ElementFinder } from 'protractor';

export class RoleComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-role div table .btn-danger'));
    title = element.all(by.css('jhi-role div h2#page-heading span')).first();

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

export class RoleUpdatePage {
    pageTitle = element(by.id('jhi-role-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    roleNameInput = element(by.id('field_roleName'));
    roleDescriptionInput = element(by.id('field_roleDescription'));
    experienceSelect = element(by.id('field_experience'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setRoleNameInput(roleName) {
        await this.roleNameInput.sendKeys(roleName);
    }

    async getRoleNameInput() {
        return this.roleNameInput.getAttribute('value');
    }

    async setRoleDescriptionInput(roleDescription) {
        await this.roleDescriptionInput.sendKeys(roleDescription);
    }

    async getRoleDescriptionInput() {
        return this.roleDescriptionInput.getAttribute('value');
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

export class RoleDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-role-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-role'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
