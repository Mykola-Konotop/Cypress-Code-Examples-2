class InspectionFlowPage {

    getTitle()
    {
        return cy.get('.content > .title')
    }

    getBigButton()
    {
        return cy.get('.big_button')
    }
    
    getText()
    {
        return cy.get('.text')
    }

    getPhotoTitle()
    {
        return cy.get('.example_photo > .title')
    }

    getBlockText()
    {
        return cy.get('.block_text')
    }

    getLeftBlockTitle()
    {
        return cy.get('.left_block > .title')
    }

    getTakePhotoButton()
    {
        return cy.get('#takePhotoButton')
    }

    getCommentDamage()
    {
        return cy.get('#comment_damage')
    }

    getOkButton()
    {
        return cy.get('.button_ok')
    }

    getNextButton()
    {
        return cy.get('.next')
    }

    getBackButton()
    {
        return cy.get('.back_page')
    }

    getYesButton()
    {
        return cy.get('.button_yes')
    }

    getNoButton()
    {
        return cy.get('.button_no')
    }

    getContinueButton()
    {
        return cy.get('.next_page_additional')
    }
    
}

export default InspectionFlowPage