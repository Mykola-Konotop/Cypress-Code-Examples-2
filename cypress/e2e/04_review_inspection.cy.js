/// <reference types="cypress" />

import HomePage from '../support/pageObjects/HomePage'
import InspectionManagementPage from '../support/pageObjects/InspectionManagementPage'
import ReviewInspectionPage from '../support/pageObjects/ReviewInspectionPage'
const homePage = new HomePage();
const inspectionManagementPage = new InspectionManagementPage();
const reviewInspectionPage = new ReviewInspectionPage();

describe('Review inspection test case', () => {
    beforeEach(() => {
        cy.login()
        cy.visit('/')
    })
    
    it('Review inspection (SI-TC-17, SI-TC-19, SI-TC-32, SI-TC-34, SI-TC-35, SI-TC-42, SI-TC-51)', () => {
        cy.fixture('example').then(function(data) {
            this.data = data
        homePage.getChangeLink().click()
        inspectionManagementPage.getLastName().should('have.text', this.data.lastName)
        inspectionManagementPage.getTrueCarStatus().should('have.text', 'Completed')
        inspectionManagementPage.getReviewInspectionButton()
          .should('include.text', 'Review').invoke('removeAttr', 'target').click()
        cy.url().should('include', 'check_pages_all')

        //steps tab
        cy.get('.info_car').click()
        cy.get(':nth-child(1) > .value_info').should('have.text', this.data.vehicleMake)
        cy.get(':nth-child(2) > .value_info').should('have.text', this.data.vehicleYear)
        cy.get(':nth-child(3) > .value_info').should('have.text', this.data.vehicleModel)
        cy.get(':nth-child(4) > .value_info').should('have.text', this.data.state)
        cy.get(':nth-child(5) > .value_info').should('have.text', this.data.vehicleVin)
        cy.get('.info_car_content > .modal-close').click()
        cy.get('#steps').should('have.text', 'Steps')
        reviewInspectionPage.getRequestCustomerToRedo().click()
        reviewInspectionPage.getCheckEngineLight().click()
        reviewInspectionPage.getInputMiles().should('have.value', this.data.miles)
        reviewInspectionPage.getCommentInspector().type('Blurred image, please repeat!')
        for (let i = 0; i < 40; i++) {
            reviewInspectionPage.getContinueButton().click()
            cy.wait(1000)
            }

        //Glass damage tab
        cy.get('#glass_damage').should('have.text', 'Glass damage')
        cy.get('.block_no_photo_glass > .no_photo').should('include.text', 'NO GLASS DAMAGE')
        cy.get('.back_glass_damage').click()
        cy.wait(1000)
        reviewInspectionPage.getContinueButton().click()
        cy.wait(1000)
        reviewInspectionPage.getGlassDamageButton().click()
        cy.wait(1000)
        
        //Tire damage tab
        cy.get('#tires').should('have.text', 'Tire damage')
        for (let i = 0; i < 9; i++) {
            reviewInspectionPage.getNextTireDamageButton().click()
            cy.wait(1000)
            }

        inspectionManagementPage.getStatusInspection().should('have.text', 'Sent for revision')
        inspectionManagementPage.getTrueCarStatus().should('have.text', 'In Progress')
        })
    })
})