/// <reference types="cypress" />

import HomePage from '../support/pageObjects/HomePage'
import InspectionManagementPage from '../support/pageObjects/InspectionManagementPage'
import ChangeInspectionPage from '../support/pageObjects/ChangeInspectionPage'
const homePage = new HomePage();
const inspectionManagementPage = new InspectionManagementPage();
const changeInspectionPage = new ChangeInspectionPage();

describe('Add new inspection & Send inspection link test cases', () => {
  beforeEach(() => {
    cy.login()
    cy.visit('/')
    })
    
    it('Add new inspection (SI-TC-1, SI-TC-4, SI-TC-46)', () => {
      cy.fixture('example').then(function(data) {
        this.data = data
        homePage.getAddLink().click()
        changeInspectionPage.getFirstName().type(this.data.firstName)
        changeInspectionPage.getLastName().type(this.data.lastName)
        changeInspectionPage.getAddress().type(this.data.address)
        changeInspectionPage.getState().type(this.data.state)
        changeInspectionPage.getCity().type(this.data.city)
        changeInspectionPage.getZipCode().type(this.data.zip)
        changeInspectionPage.getPhone().type(this.data.phone)
        changeInspectionPage.getEmail().type(Cypress.env('email'), { log: false })
        changeInspectionPage.getVehicleVin().type(this.data.vehicleVin)
        changeInspectionPage.getVehicleMake().type(this.data.vehicleMake)
        changeInspectionPage.getVehicleModel().type(this.data.vehicleModel)
        changeInspectionPage.getVehicleYear().type(this.data.vehicleYear)
        changeInspectionPage.getVehicleColor().type(this.data.vehicleColor)
        changeInspectionPage.getMessageForInspector().type(this.data.body)
        changeInspectionPage.getSaveButton().click()
        inspectionManagementPage.getSuccessMessage().should('include.text', 'was added successfully')
        })
    })

    it('Send inspection link (SI-TC-7)', () => {
      homePage.getChangeLink().click()
      inspectionManagementPage.getSendInspectionButton().should('include.text', 'Send').click()
      inspectionManagementPage.getTrueCarStatus().should('include.text', 'Invitation Sent   Ago')
    })
})