class ReviewInspectionPage {

    getRequestCustomerToRedo()
    {
        return cy.get('.slick-current > .one_slide > .block_info > .checkbox_step > label > .span_checkbox')
    }

    getCheckEngineLight()
    {
        return cy.get('.comment_block > :nth-child(1) > .span_checkbox')
    }

    getInputMiles()
    {
        return cy.get('.input_miles')
    }

    getCommentInspector()
    {
        return cy.get('.slick-current > .one_slide > .block_info > .comment_block > .comment_inspector_js')
    }

    getContinueButton()
    {
        return cy.get('.slick-current > .next_page')
    }

    getGlassDamageButton()
    {
        return cy.get('.next_glass_damage')
    }

    getNextTireDamageButton()
    {
        return cy.get('.slick-current > .next_tire')
    }

}

export default ReviewInspectionPage