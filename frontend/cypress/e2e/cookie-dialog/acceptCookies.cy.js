context('Accept Cookies', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/login');
    });

    it('check if cookie modal is showing', () => {
        cy.get('[data-test-id=CookieDialog-dialog]').should('exist');
    });

    it('check if language dropdown has languages to be changed', () => {
        cy.get('[data-test-id=Language-select]').should('exist');
    });

    it('check if button to accept cookies is present', () => {
        cy.get('[data-test-id=AcceptCookies-button]').should('exist');
    });

    it('check if cookie dialog closed after clicking on accept button ', () => {
        cy.get('[data-test-id=AcceptCookies-button]').click();
        cy.get('[data-test-id=AcceptCookies-button]').should('not.exist');
    });
});

context('Go to privacy policy from cookie dialog', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/login');
    });

    it('check if cookie modal is showing', () => {
        cy.get('[data-test-id=CookieDialog-dialog]').should('exist');
    });

    it('check if button to go to privacy policy exists', () => {
        cy.get('[data-test-id=GoToPrivacyPolicy-button]').should('exist');
    });

    it('check if button to go to privacy policy redirects correctly', () => {
        cy.get('[data-test-id=GoToPrivacyPolicy-button]').click();
        cy.url().should('include', '/privacy-policy');
    });
});
