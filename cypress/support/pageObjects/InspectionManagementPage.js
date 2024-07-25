class InspectionManagementPage {

    getRequestId()
    {
        return cy.get(':nth-child(1) > .field-request_id > a')
    }

    getSuccessMessage()
    {
        return cy.get('.success')
    }

    getStatusInspection()
    {
        return cy.get(':nth-child(1) > .field-status_inspection')
    }

    getTrueCarStatus()
    {
        return cy.get(':nth-child(1) > .field-trucar_status')
    }

    getReviewInspectionButton()
    {
        return cy.get(':nth-child(1) > .field-review_inspection > .button_inspection')
    }

    getSendInspectionButton()
    {
        return cy.get(':nth-child(1) > .field-send_message > .button_inspection')
    }
    
    getLastName()
    {
        return cy.get(':nth-child(1) > .field-lessee_last_name')
    }

    getReportButton()
    {
        return cy.get(':nth-child(1) > .field-report > .button_inspection')
    }

}

export default InspectionManagementPage