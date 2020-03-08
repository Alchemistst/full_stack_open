describe('Homepage...', function (){
  it('successfully loads.', function (){
    cy.visit('http://localhost:3000/')
  })
  it('shows log in form when not logged.', function (){
    cy.get('.LogInForm')
  })
})
describe('Logging in...', function (){
  it('with incorrect pass and username yields error.', function (){
    cy.get('[data-cy=username_input]').type('pikachu')
    cy.get('[data-cy=password_input]').type('pikachu')
    cy.get('[data-cy=submit_button]').click()
    cy.url().should('eq', 'http://localhost:3000/')
    cy.get('.LogInForm')
  })
  it('with correct pass and username grants access...', function (){
    cy.get('[data-cy=username_input]').type('test')
    cy.get('[data-cy=password_input]').type('test')
    cy.get('[data-cy=submit_button]').click()
    cy.url().should('eq', 'http://localhost:3000/blogs')
  })
  it('and then it can log out.', function (){
    cy.get('[data-cy=logout_button]').click()
    cy.get('.LogInForm')
  })
})
before(function (){
  cy.request('POST', 'http://localhost:3003/api/testing/reset')
})
describe('A new blog...', function (){
  it('can be added.', function (){
    cy.get('[data-cy=username_input]').type('test')
    cy.get('[data-cy=password_input]').type('test')
    cy.get('[data-cy=submit_button]').click()
    cy.get('[data-cy=newblog_button]').click()
    cy.get('[data-cy=title_form]').type('testtitle')
    cy.get('[data-cy=author_form]').type('testauthor')
    cy.get('[data-cy=url_form]').type('testurl.com')
    cy.get('[data-cy=create_button]').click()
    cy.get('[data-cy=blogs_table]').children().should('have.length', 1)
  })
})
