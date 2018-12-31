/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
    CompetenceAplicationComponentsPage,
    CompetenceAplicationDeleteDialog,
    CompetenceAplicationUpdatePage
} from './competence-aplication.page-object';

const expect = chai.expect;

describe('CompetenceAplication e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let competenceAplicationUpdatePage: CompetenceAplicationUpdatePage;
    let competenceAplicationComponentsPage: CompetenceAplicationComponentsPage;
    let competenceAplicationDeleteDialog: CompetenceAplicationDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load CompetenceAplications', async () => {
        await navBarPage.goToEntity('competence-aplication');
        competenceAplicationComponentsPage = new CompetenceAplicationComponentsPage();
        expect(await competenceAplicationComponentsPage.getTitle()).to.eq('curriculumwebApp.competenceAplication.home.title');
    });

    it('should load create CompetenceAplication page', async () => {
        await competenceAplicationComponentsPage.clickOnCreateButton();
        competenceAplicationUpdatePage = new CompetenceAplicationUpdatePage();
        expect(await competenceAplicationUpdatePage.getPageTitle()).to.eq('curriculumwebApp.competenceAplication.home.createOrEditLabel');
        await competenceAplicationUpdatePage.cancel();
    });

    it('should create and save CompetenceAplications', async () => {
        const nbButtonsBeforeCreate = await competenceAplicationComponentsPage.countDeleteButtons();

        await competenceAplicationComponentsPage.clickOnCreateButton();
        await promise.all([
            competenceAplicationUpdatePage.setCompApliNameInput('5'),
            competenceAplicationUpdatePage.setCompApliLevelInput('5'),
            competenceAplicationUpdatePage.setCompApliDescInput('compApliDesc'),
            competenceAplicationUpdatePage.experienceSelectLastOption()
        ]);
        expect(await competenceAplicationUpdatePage.getCompApliNameInput()).to.eq('5');
        expect(await competenceAplicationUpdatePage.getCompApliLevelInput()).to.eq('5');
        expect(await competenceAplicationUpdatePage.getCompApliDescInput()).to.eq('compApliDesc');
        await competenceAplicationUpdatePage.save();
        expect(await competenceAplicationUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await competenceAplicationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last CompetenceAplication', async () => {
        const nbButtonsBeforeDelete = await competenceAplicationComponentsPage.countDeleteButtons();
        await competenceAplicationComponentsPage.clickOnLastDeleteButton();

        competenceAplicationDeleteDialog = new CompetenceAplicationDeleteDialog();
        expect(await competenceAplicationDeleteDialog.getDialogTitle()).to.eq('curriculumwebApp.competenceAplication.delete.question');
        await competenceAplicationDeleteDialog.clickOnConfirmButton();

        expect(await competenceAplicationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
