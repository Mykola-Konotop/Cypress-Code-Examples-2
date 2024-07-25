/// <reference types="cypress" />

import HomePage from '../support/pageObjects/HomePage'
import InspectionManagementPage from '../support/pageObjects/InspectionManagementPage'
import DeletePage from '../support/pageObjects/DeletePage'
const homePage = new HomePage();
const inspectionManagementPage = new InspectionManagementPage();
const deletePage = new DeletePage();

describe('Delete inspection test case', () => {
    beforeEach(() => {
        cy.login()
        cy.visit('/')
    })

    it('Delete an existing inspection (SI-TC-48)', () => {
        cy.fixture('example').then(function(data) {
            this.data = data
        homePage.getChangeLink().click()
        inspectionManagementPage.getLastName().should('have.text', this.data.lastName)
        inspectionManagementPage.getTrueCarStatus().should('have.text', 'Completed')
        inspectionManagementPage.getRequestId().click()
        deletePage.getDeleteLink().click()
        homePage.getTitle().should('have.text', 'Are you sure?')
        cy.contains(this.data.vehicleVin)
        deletePage.getSubmitButton().should('include.value', 'Yes').click()
        inspectionManagementPage.getSuccessMessage().should('include.text', 'was deleted successfully')
        })
    })
})