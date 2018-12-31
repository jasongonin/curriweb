/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ExperienceComponentsPage, ExperienceDeleteDialog, ExperienceUpdatePage } from './experience.page-object';

const expect = chai.expect;

describe('Experience e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let experienceUpdatePage: ExperienceUpdatePage;
    let experienceComponentsPage: ExperienceComponentsPage;
    let experienceDeleteDialog: ExperienceDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Experiences', async () => {
        await navBarPage.goToEntity('experience');
        experienceComponentsPage = new ExperienceComponentsPage();
        expect(await experienceComponentsPage.getTitle()).to.eq('curriculumwebApp.experience.home.title');
    });

    it('should load create Experience page', async () => {
        await experienceComponentsPage.clickOnCreateButton();
        experienceUpdatePage = new ExperienceUpdatePage();
        expect(await experienceUpdatePage.getPageTitle()).to.eq('curriculumwebApp.experience.home.createOrEditLabel');
        await experienceUpdatePage.cancel();
    });

    it('should create and save Experiences', async () => {
        const nbButtonsBeforeCreate = await experienceComponentsPage.countDeleteButtons();

        await experienceComponentsPage.clickOnCreateButton();
        await promise.all([
            experienceUpdatePage.setInicialInput('2000-12-31'),
            experienceUpdatePage.setEndInput('2000-12-31'),
            experienceUpdatePage.setCountryNameInput('countryName'),
            experienceUpdatePage.setCityInput('city'),
            experienceUpdatePage.companySelectLastOption()
        ]);
        expect(await experienceUpdatePage.getInicialInput()).to.eq('2000-12-31');
        expect(await experienceUpdatePage.getEndInput()).to.eq('2000-12-31');
        expect(await experienceUpdatePage.getCountryNameInput()).to.eq('countryName');
        expect(await experienceUpdatePage.getCityInput()).to.eq('city');
        await experienceUpdatePage.save();
        expect(await experienceUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await experienceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Experience', async () => {
        const nbButtonsBeforeDelete = await experienceComponentsPage.countDeleteButtons();
        await experienceComponentsPage.clickOnLastDeleteButton();

        experienceDeleteDialog = new ExperienceDeleteDialog();
        expect(await experienceDeleteDialog.getDialogTitle()).to.eq('curriculumwebApp.experience.delete.question');
        await experienceDeleteDialog.clickOnConfirmButton();

        expect(await experienceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
