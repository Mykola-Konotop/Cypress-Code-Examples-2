/// <reference types="Cypress" />

import InspectionFlowPage from '../support/pageObjects/InspectionFlowPage'
const inspectionFlowPage = new InspectionFlowPage();

describe("Repeat one step of inspection (SI-TC-9, SI-TC-12)", () => {
    it("Find an email with specific subject and link in email body and and repeat one step of inspection",
      function () {

        cy.task("gmail:get-messages", {
          options: {
            from: "ok@selfinspection.com",
            subject: "Additional Information Required for Your TrueCar Vehicle Inspection",
            include_body: true,
            //before: new Date(2024, 4, 1, 12, 0, 0),
            //after: new Date(2024, 3, 1),
          },
        }).then((emails) => {
            assert.isAtLeast(
            emails.length,
            1,
            "Expected to find at least one email, but none were found!"
          );
        const body = emails[0].body.html;
        assert.isTrue(
          body.indexOf(
            "https://truecarplus-sandbox.carselfinspection.com/vin/"
          ) >= 0,
          "Found inspection link!"
        );

        const link = body.split("href=https://truecarplus-sandbox.carselfinspection.com/vin");
        var invitedLink = link[0].match(/\bhttps?:\/\/\S+/);
        invitedLink = invitedLink[0].slice(0, -64).replace('"','');
        cy.visit(invitedLink).viewport('iphone-xr')

        //start page
        cy.fixture('example').then(function(data) {
        this.data = data
        inspectionFlowPage.getTitle().should('include.text', 'Self Inspection')
        inspectionFlowPage.getBigButton().should('include.text', 'Start Inspection').click()
        inspectionFlowPage.getText().should('include.text', 'Please keep your phone in horizontal position.')
        cy.viewport(896, 414)
        cy.wait(2000)

        //vin number page
        inspectionFlowPage.getPhotoTitle().should('include.text', 'Vehicle Identification Number')
        inspectionFlowPage.getBlockText().should('include.text', 'TAKE A PICTURE OF THE VIN NUMBER')
        inspectionFlowPage.getTakePhotoButton().click()
        cy.get('.custom').click()
        cy.wait(2000)
        
        //Verify Vehicle Miles page
        inspectionFlowPage.getPhotoTitle().should('include.text', 'Verify Vehicle Miles')
        inspectionFlowPage.getBlockText()
        .should('include.text', 'Please start the vehicle and take an image of the vehicle miles.')
        inspectionFlowPage.getTakePhotoButton().click()
        cy.get('.miles_input_js').type(this.data.miles)
        cy.get('.submit_miles').click()
        inspectionFlowPage.getNextButton().click()
        cy.wait(2000)

        //Thank you page
        inspectionFlowPage.getText().should('include.text', 'Your self inspection have been submitted.')
      })
    })
  })
})