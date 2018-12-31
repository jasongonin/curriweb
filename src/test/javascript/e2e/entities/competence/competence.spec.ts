/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CompetenceComponentsPage, CompetenceDeleteDialog, CompetenceUpdatePage } from './competence.page-object';

const expect = chai.expect;

describe('Competence e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let competenceUpdatePage: CompetenceUpdatePage;
    let competenceComponentsPage: CompetenceComponentsPage;
    let competenceDeleteDialog: CompetenceDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Competences', async () => {
        await navBarPage.goToEntity('competence');
        competenceComponentsPage = new CompetenceComponentsPage();
        expect(await competenceComponentsPage.getTitle()).to.eq('curriculumwebApp.competence.home.title');
    });

    it('should load create Competence page', async () => {
        await competenceComponentsPage.clickOnCreateButton();
        competenceUpdatePage = new CompetenceUpdatePage();
        expect(await competenceUpdatePage.getPageTitle()).to.eq('curriculumwebApp.competence.home.createOrEditLabel');
        await competenceUpdatePage.cancel();
    });

    it('should create and save Competences', async () => {
        const nbButtonsBeforeCreate = await competenceComponentsPage.countDeleteButtons();

        await competenceComponentsPage.clickOnCreateButton();
        await promise.all([
            competenceUpdatePage.setCompNameInput('5'),
            competenceUpdatePage.setCompDescInput('compDesc'),
            competenceUpdatePage.competenceAplicationSelectLastOption()
        ]);
        expect(await competenceUpdatePage.getCompNameInput()).to.eq('5');
        expect(await competenceUpdatePage.getCompDescInput()).to.eq('compDesc');
        await competenceUpdatePage.save();
        expect(await competenceUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await competenceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Competence', async () => {
        const nbButtonsBeforeDelete = await competenceComponentsPage.countDeleteButtons();
        await competenceComponentsPage.clickOnLastDeleteButton();

        competenceDeleteDialog = new CompetenceDeleteDialog();
        expect(await competenceDeleteDialog.getDialogTitle()).to.eq('curriculumwebApp.competence.delete.question');
        await competenceDeleteDialog.clickOnConfirmButton();

        expect(await competenceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
