/// <reference types="cypress" />

import HomePage from '../support/pageObjects/HomePage'
import InspectionManagementPage from '../support/pageObjects/InspectionManagementPage'
const homePage = new HomePage();
const inspectionManagementPage = new InspectionManagementPage();

describe('View report test case', () => {
    beforeEach(() => {
        cy.login()
        cy.visit('/')
    })
    
    it('View report (SI-TC-17, SI-TC-24, SI-TC-42)', () => {
        cy.fixture('example').then(function(data) {
            this.data = data
        homePage.getChangeLink().click()
        inspectionManagementPage.getLastName().should('have.text', this.data.lastName)
        inspectionManagementPage.getTrueCarStatus().should('have.text', 'Completed')
        inspectionManagementPage.getReportButton()
          .should('include.text', 'Report').invoke('removeAttr', 'target').click()
        cy.url().should('include', 'report')

        //main block
        cy.get('.center > .text').should('include.text', 'Inspection Report')
        cy.get(':nth-child(1) > .title').should('include.text', this.data.vehicleYear)
        .should('include.text', this.data.vehicleMake).should('include.text', this.data.vehicleModel)
        cy.get(':nth-child(3) > .value').should('have.text', this.data.vehicleVin)
        cy.get(':nth-child(4) > .value').should('have.text', this.data.miles)
        cy.get('.group_computer > :nth-child(2) > .value').should('include.text', this.data.zip)
        .should('include.text', this.data.city).should('include.text', this.data.state)
        cy.get('.pointer_hint').click()
        cy.get('.slide').should('have.attr', 'src').should('include', '.jpg')

        //Exterior block
        cy.get('#exterior_green > .title').should('have.text', 'Exterior')
        cy.get('#exterior_green > .content_image > :nth-child(1) > a > .image').should('have.attr', 'src').should('include', '.png')
        cy.get('#exterior_green > .content_image > :nth-child(1) > .container_info > .name_image').should('have.text', 'VIN#')
        cy.get('#exterior_green > .content_image > :nth-child(2) > a > .image').should('have.attr', 'src').should('include', '.png')
        cy.get('#exterior_green > .content_image > :nth-child(2) > .container_info > .name_image').should('have.text', "Driver's Side Full-Length")
        cy.get('#exterior_green > .content_image > :nth-child(3) > a > .image').should('have.attr', 'src').should('include', '.png')
        cy.get('#exterior_green > .content_image > :nth-child(3) > .container_info > .name_image').should('have.text', 'ROOF FROM DRIVER CORNER')
        cy.get('#exterior_green > .content_image > :nth-child(4) > a > .image').should('have.attr', 'src').should('include', '.png')
        cy.get('#exterior_green > .content_image > :nth-child(4) > .container_info > .name_image').should('have.text', 'REAR BUMPER')
        cy.get('#exterior_green > .content_image > :nth-child(5) > a > .image').should('have.attr', 'src').should('include', '.png')
        cy.get('#exterior_green > .content_image > :nth-child(5) > .container_info > .name_image').should('have.text', 'ROOF FROM THE TOP')
        cy.get('#exterior_green > .content_image > :nth-child(6) > a > .image').should('have.attr', 'src').should('include', '.png')
        cy.get('#exterior_green > .content_image > :nth-child(6) > .container_info > .name_image').should('have.text', 'FRONT BUMPER')
        cy.get('#exterior_green > .content_image > :nth-child(7) > a > .image').should('have.attr', 'src').should('include', '.png')
        cy.get('#exterior_green > .content_image > :nth-child(7) > .container_info > .name_image').should('have.text', "Passenger's Side Full-Length")

        //Interior block
        cy.get('#interior_green > .title').should('have.text', 'Interior')
        cy.get('#interior_green > .content_image > :nth-child(1) > a > .image').should('have.attr', 'src').should('include', '.png')
        cy.get('#interior_green > .content_image > :nth-child(1) > .container_info > .name_image').should('have.text', 'Verify Vehicle Miles')
        cy.get('#interior_green > .content_image > :nth-child(2) > a > .image').should('have.attr', 'src').should('include', '.png')
        cy.get('#interior_green > .content_image > :nth-child(2) > .container_info > .name_image').should('have.text', 'CENTRAL CONSOLE & TRANSMISSION SHIFTER')
        cy.get('#interior_green > .content_image > :nth-child(3) > a > .image').should('have.attr', 'src').should('include', '.png')
        cy.get('#interior_green > .content_image > :nth-child(3) > .container_info > .name_image').should('have.text', 'DRIVER SEAT')
        cy.get('#interior_green > .content_image > :nth-child(4) > a > .image').should('have.attr', 'src').should('include', '.png')
        cy.get('#interior_green > .content_image > :nth-child(4) > .container_info > .name_image').should('have.text', 'PASSENGER FRONT DOOR PANEL & SEAT')
        cy.get('#interior_green > .content_image > :nth-child(5) > a > .image').should('have.attr', 'src').should('include', '.png')
        cy.get('#interior_green > .content_image > :nth-child(5) > .container_info > .name_image').should('have.text', 'DRIVER DOOR INTERIOR PANEL')
        cy.get('#interior_green > .content_image > :nth-child(6) > a > .image').should('have.attr', 'src').should('include', '.png')
        cy.get('#interior_green > .content_image > :nth-child(6) > .container_info > .name_image').should('have.text', 'DRIVER REAR DOOR INTERIOR PANEL')
        cy.get('#interior_green > .content_image > :nth-child(7) > a > .image').should('have.attr', 'src').should('include', '.png')
        cy.get('#interior_green > .content_image > :nth-child(7) > .container_info > .name_image').should('have.text', 'REAR SEAT & DOOR PANEL')

        //Tires block
        cy.get('#tires_green > .title').should('have.text', 'Tires')
        cy.get('#tires_green > .content_image > :nth-child(1) > a > .image').should('have.attr', 'src').should('include', '.png')
        cy.get('#tires_green > .content_image > :nth-child(1) > .container_info > .name_image').should('have.text', 'DRIVER  FRONT WHEEL')
        cy.get('#tires_green > .content_image > :nth-child(2) > a > .image').should('have.attr', 'src').should('include', '.png')
        cy.get('#tires_green > .content_image > :nth-child(2) > .container_info > .name_image').should('have.text', 'DRIVER SIDE REAR WHEEL')
        cy.get('#tires_green > .content_image > :nth-child(3) > a > .image').should('have.attr', 'src').should('include', '.png')
        cy.get('#tires_green > .content_image > :nth-child(3) > .container_info > .name_image').should('have.text', 'PASSENGER  SIDE REAR WHEEL')
        cy.get('#tires_green > .content_image > :nth-child(4) > a > .image').should('have.attr', 'src').should('include', '.png')
        cy.get('#tires_green > .content_image > :nth-child(4) > .container_info > .name_image').should('have.text', 'PASSENGER SIDE FRONT WHEEL')
        
        //Damage block
        cy.get('#damage_green > .title').should('have.text', 'Damage')
        cy.get(':nth-child(1) > .fancybox_container > .image').should('have.attr', 'src').should('include', '.png')
        cy.get(':nth-child(1) > .container_info > .description').should('have.text', 'test damage number one')
        })
    })
})