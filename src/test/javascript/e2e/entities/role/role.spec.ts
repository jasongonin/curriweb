/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { RoleComponentsPage, RoleDeleteDialog, RoleUpdatePage } from './role.page-object';

const expect = chai.expect;

describe('Role e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let roleUpdatePage: RoleUpdatePage;
    let roleComponentsPage: RoleComponentsPage;
    let roleDeleteDialog: RoleDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Roles', async () => {
        await navBarPage.goToEntity('role');
        roleComponentsPage = new RoleComponentsPage();
        expect(await roleComponentsPage.getTitle()).to.eq('curriculumwebApp.role.home.title');
    });

    it('should load create Role page', async () => {
        await roleComponentsPage.clickOnCreateButton();
        roleUpdatePage = new RoleUpdatePage();
        expect(await roleUpdatePage.getPageTitle()).to.eq('curriculumwebApp.role.home.createOrEditLabel');
        await roleUpdatePage.cancel();
    });

    it('should create and save Roles', async () => {
        const nbButtonsBeforeCreate = await roleComponentsPage.countDeleteButtons();

        await roleComponentsPage.clickOnCreateButton();
        await promise.all([
            roleUpdatePage.setRoleNameInput('roleName'),
            roleUpdatePage.setRoleDescriptionInput('roleDescription'),
            roleUpdatePage.experienceSelectLastOption()
        ]);
        expect(await roleUpdatePage.getRoleNameInput()).to.eq('roleName');
        expect(await roleUpdatePage.getRoleDescriptionInput()).to.eq('roleDescription');
        await roleUpdatePage.save();
        expect(await roleUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await roleComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Role', async () => {
        const nbButtonsBeforeDelete = await roleComponentsPage.countDeleteButtons();
        await roleComponentsPage.clickOnLastDeleteButton();

        roleDeleteDialog = new RoleDeleteDialog();
        expect(await roleDeleteDialog.getDialogTitle()).to.eq('curriculumwebApp.role.delete.question');
        await roleDeleteDialog.clickOnConfirmButton();

        expect(await roleComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
