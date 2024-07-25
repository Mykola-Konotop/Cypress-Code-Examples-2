/// <reference types="Cypress" />

import InspectionFlowPage from '../support/pageObjects/InspectionFlowPage'
const inspectionFlowPage = new InspectionFlowPage();

describe("Start inspection flow (SI-TC-6, SI-TC-9, SI-TC-11, SI-TC-13, SI-TC-15)", () => {
    it("Find an email with specific subject and link in email body and start inspection",
      function () {

        cy.task("gmail:get-messages", {
          options: {
            from: "ok@selfinspection.com",
            subject: "Inspection Request",
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
        invitedLink = invitedLink[0].slice(0, -78).replace('"','');
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
        
        //car damage page
        inspectionFlowPage.getLeftBlockTitle().should('include.text', 'Do you have any damage on the car?')
        inspectionFlowPage.getYesButton().click()

        //select car damage page
        cy.get('.title_select_car').should('include.text', 'Please select type of damage?')
        cy.get('[data-select_id="2"]').should('have.text', 'Exterior').click()
        cy.wait(2000)

        //car damage 1 page
        inspectionFlowPage.getPhotoTitle().should('include.text', 'Exterior Damage 1 / 2')
        inspectionFlowPage.getBlockText().should('include.text', 'Take a picture of the entire exterior panel with damage')
        inspectionFlowPage.getTakePhotoButton().click()
        inspectionFlowPage.getCommentDamage().type('test damage 1')
        inspectionFlowPage.getOkButton().click()
        inspectionFlowPage.getNextButton().click()
        cy.wait(2000)
        
        //Back to the previous page
        inspectionFlowPage.getBackButton().click()
        cy.wait(2000)
        inspectionFlowPage.getPhotoTitle().should('include.text', 'Exterior Damage 1 / 2')
        inspectionFlowPage.getBlockText().should('include.text', 'Take a picture of the entire exterior panel with damage')
        inspectionFlowPage.getTakePhotoButton().click()
        inspectionFlowPage.getCommentDamage().type('{selectall}{backspace}').type('test damage number one')
        inspectionFlowPage.getOkButton().click()
        inspectionFlowPage.getNextButton().click()
        cy.wait(2000)

        //car damage 2 page
        inspectionFlowPage.getPhotoTitle().should('include.text', 'Exterior Damage 2 / 2')
        inspectionFlowPage.getBlockText().should('include.text', 'Take a close up picture of the damage')
        inspectionFlowPage.getTakePhotoButton().click()
        inspectionFlowPage.getCommentDamage().contains('test damage number one')
        inspectionFlowPage.getNextButton().click()
        cy.wait(2000)

        //any car damage page
        inspectionFlowPage.getLeftBlockTitle().should('include.text', 'Do you have any further damage?')
        inspectionFlowPage.getNoButton().click()
        cy.wait(2000)

        //car modifications page
        inspectionFlowPage.getLeftBlockTitle().should('include.text', 'Do you have modification on the car?')
        inspectionFlowPage.getYesButton().click()
        cy.wait(2000)

        //car modifications 1 page
        inspectionFlowPage.getPhotoTitle().should('include.text', 'Car modification 1/2')
        inspectionFlowPage.getBlockText().should('include.text', 'Take a picture of the entire modification')
        inspectionFlowPage.getTakePhotoButton().click()
        inspectionFlowPage.getNextButton().click()
        cy.wait(2000)

        //car modifications 2 page
        inspectionFlowPage.getPhotoTitle().should('include.text', 'Car modification 2/2')
        inspectionFlowPage.getBlockText().should('include.text', 'Take a close up picture of the modification')
        inspectionFlowPage.getTakePhotoButton().click()
        inspectionFlowPage.getNextButton().click()
        cy.wait(2000)

        //any car modifications
        inspectionFlowPage.getLeftBlockTitle().should('include.text', 'Do you have any further modifications?')
        inspectionFlowPage.getNoButton().click()
        cy.wait(2000)

        //catalytic converter page
        inspectionFlowPage.getLeftBlockTitle().should('include.text', 'Is a catalytic converter present?')
        inspectionFlowPage.getYesButton().click()
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

        //CENTRAL CONSOLE & TRANSMISSION SHIFTER page
        inspectionFlowPage.getPhotoTitle().should('include.text', 'CENTRAL CONSOLE & TRANSMISSION SHIFTER')
        inspectionFlowPage.getBlockText()
        .should('include.text', 'Capture a picture of the central console and transmission shifter.')
        inspectionFlowPage.getTakePhotoButton().click()
        inspectionFlowPage.getNextButton().click()
        cy.wait(2000)

        //DRIVER SEAT page
        inspectionFlowPage.getPhotoTitle().should('include.text', 'DRIVER SEAT')
        inspectionFlowPage.getBlockText()
        .should('include.text', 'Capture a photo of the driver’s seat from behind the door')
        inspectionFlowPage.getTakePhotoButton().click()
        inspectionFlowPage.getNextButton().click()
        cy.wait(2000)

        //PASSENGER FRONT DOOR PANEL & SEAT page
        inspectionFlowPage.getPhotoTitle().should('include.text', 'PASSENGER FRONT DOOR PANEL & SEAT')
        inspectionFlowPage.getBlockText()
        .should('include.text', 'Capture the passenger side door interior panel and seat from the driver side.')
        inspectionFlowPage.getTakePhotoButton().click()
        inspectionFlowPage.getNextButton().click()
        cy.wait(2000)

        //DRIVER DOOR INTERIOR PANEL page
        inspectionFlowPage.getPhotoTitle().should('include.text', 'DRIVER DOOR INTERIOR PANEL')
        inspectionFlowPage.getBlockText()
        .should('include.text', 'Position yourself approximately 3 feet away. Level the camera to the center of the door, and capture the driver side door interior pane')
        inspectionFlowPage.getTakePhotoButton().click()
        inspectionFlowPage.getNextButton().click()
        cy.wait(2000)

        //Driver's Side Full-Length page
        inspectionFlowPage.getPhotoTitle().should('include.text', "Driver's Side Full-Length")
        inspectionFlowPage.getBlockText()
        .should('include.text', "Please capture a photo of the entire driver's side of the vehicle, from the front to the rear.")
        inspectionFlowPage.getTakePhotoButton().click()
        inspectionFlowPage.getNextButton().click()
        cy.wait(2000)

        //DRIVER FRONT WHEEL page
        inspectionFlowPage.getPhotoTitle().should('include.text', 'DRIVER  FRONT WHEEL')
        inspectionFlowPage.getBlockText()
        .should('include.text', 'Level the camera with the left front wheel to take a clear picture of the wheel.')
        inspectionFlowPage.getTakePhotoButton().click()
        inspectionFlowPage.getNextButton().click()
        cy.wait(2000)

        //ROOF FROM DRIVER CORNER page
        inspectionFlowPage.getPhotoTitle().should('include.text', 'ROOF FROM DRIVER CORNER')
        inspectionFlowPage.getBlockText()
        .should('include.text', 'Stand next to the driver’s side mirror and capture the entire roof of the car from a high angle view')
        inspectionFlowPage.getTakePhotoButton().click()
        inspectionFlowPage.getNextButton().click()
        cy.wait(2000)

        //DRIVER REAR DOOR INTERIOR PANEL page
        inspectionFlowPage.getPhotoTitle().should('include.text', 'DRIVER REAR DOOR INTERIOR PANEL')
        inspectionFlowPage.getBlockText()
        .should('include.text', 'Position yourself approximately 3 feet away. Level the camera to the center of the door, and capture the driver rear side door interior panel.')
        inspectionFlowPage.getTakePhotoButton().click()
        inspectionFlowPage.getNextButton().click()
        cy.wait(2000)

        //REAR SEAT & DOOR PANEL page
        inspectionFlowPage.getPhotoTitle().should('include.text', 'REAR SEAT & DOOR PANEL')
        inspectionFlowPage.getBlockText()
        .should('include.text', 'Open the driver side rear door and capture the rear seat and passenger door interior panel.')
        inspectionFlowPage.getTakePhotoButton().click()
        inspectionFlowPage.getNextButton().click()
        cy.wait(2000)

        //DRIVER SIDE REAR WHEEL page
        inspectionFlowPage.getPhotoTitle().should('include.text', 'DRIVER SIDE REAR WHEEL')
        inspectionFlowPage.getBlockText()
        .should('include.text', 'Level the camera with the left rear wheel to take a clear picture of the wheel.')
        inspectionFlowPage.getTakePhotoButton().click()
        inspectionFlowPage.getNextButton().click()
        cy.wait(2000)

        //REAR BUMPER page
        inspectionFlowPage.getPhotoTitle().should('include.text', 'REAR BUMPER')
        inspectionFlowPage.getBlockText()
        .should('include.text', 'Stand 5 feet behind the car. Capture the entire rear bumper from the ground.')
        inspectionFlowPage.getTakePhotoButton().click()
        inspectionFlowPage.getNextButton().click()
        cy.wait(2000)

        //PASSENGER SIDE REAR WHEEL page
        inspectionFlowPage.getPhotoTitle().should('include.text', 'PASSENGER  SIDE REAR WHEEL')
        inspectionFlowPage.getBlockText()
        .should('include.text', 'Level the camera with the right rear wheel to take a clear picture of the wheel.')
        inspectionFlowPage.getTakePhotoButton().click()
        inspectionFlowPage.getNextButton().click()
        cy.wait(2000)

        //ROOF FROM THE TOP page
        inspectionFlowPage.getPhotoTitle().should('include.text', 'ROOF FROM THE TOP')
        inspectionFlowPage.getBlockText()
        .should('include.text', 'Stand at the rear right corner of the car and capture the entire roof of the car from a high angle view.')
        inspectionFlowPage.getTakePhotoButton().click()
        inspectionFlowPage.getNextButton().click()
        cy.wait(2000)

        //PASSENGER SIDE FRONT WHEEL page
        inspectionFlowPage.getPhotoTitle().should('include.text', 'PASSENGER SIDE FRONT WHEEL')
        inspectionFlowPage.getBlockText()
        .should('include.text', 'Level the camera with the passenger front wheel to take a clear picture of the wheel.')
        inspectionFlowPage.getTakePhotoButton().click()
        inspectionFlowPage.getNextButton().click()
        cy.wait(2000)

        //FRONT BUMPER page
        inspectionFlowPage.getPhotoTitle().should('include.text', 'FRONT BUMPER')
        inspectionFlowPage.getBlockText()
        .should('include.text', 'Level your camera with the front bumper, and capture a photo of the entire front bumper from the ground.')
        inspectionFlowPage.getTakePhotoButton().click()
        inspectionFlowPage.getNextButton().click()
        cy.wait(2000)

        //360 VIDEO page
        cy.get('.example_photo > .text')
        .should('include.text', 'we ask you to record a 360 video of your car by walking')
        cy.get('.close_additional_step').click()
        inspectionFlowPage.getPhotoTitle().should('include.text', '360 VIDEO')
        inspectionFlowPage.getBlockText()
        .should('include.text', 'Ensure your vehicle is running during the video recording.')
        inspectionFlowPage.getContinueButton().click()
        inspectionFlowPage.getBlockText()
        .should('include.text', 'be ready to start moving to the right')
        cy.get('#startButton').click()
        cy.wait(5000)
        cy.get('#stopButton').click()
        cy.wait(5000)
        inspectionFlowPage.getContinueButton().click()
        cy.wait(2000)

        //Back to the step DRIVER'S DOOR INNER PANEL
        cy.get('.hamburger-menu > .menu__btn').eq(0).click()
        cy.get(':nth-child(6) > .name_step').should('include.text', "10.DRIVER DOOR INTERIOR PANEL")
        cy.get(':nth-child(6) > .take_step').eq(0).click()
        cy.wait(2000)
        inspectionFlowPage.getPhotoTitle().should('include.text', 'DRIVER DOOR INTERIOR PANEL')
        inspectionFlowPage.getBlockText()
        .should('include.text', 'Position yourself approximately 3 feet away. Level the camera to the center of the door, and capture the driver side door interior pane')
        inspectionFlowPage.getTakePhotoButton().click()
        inspectionFlowPage.getNextButton().click()
        cy.wait(2000)

        //Passenger's Side Full-Length page
        inspectionFlowPage.getPhotoTitle().should('include.text', "Passenger's Side Full-Length")
        inspectionFlowPage.getBlockText()
        .should('include.text', "Please capture a photo of the entire passenger's side of the vehicle, from the front to the rear.")
        inspectionFlowPage.getTakePhotoButton().click()
        inspectionFlowPage.getNextButton().click()
        cy.wait(2000)

        //Thank you page
        inspectionFlowPage.getText().should('include.text', 'Your self inspection have been submitted.')
      })
    })
  })
})