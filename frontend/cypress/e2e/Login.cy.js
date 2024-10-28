describe('Login page - login flow', () => {

  beforeEach(() => {
    cy.visit('http://localhost:5173/login')
  })
  it('renders login page', () => {
    cy.get('input[name="email"]').type('myEmail@email.com')
    cy.get('input[name="password"]').type('myPassword')
    cy.get('button[id="register"]').should('be.visible')
    cy.get('button[type="submit"]').should('be.visible')
    cy.get('button').contains('Indietro').should('not.exist')

    cy.get('button[type="submit"]').click()
  })

  it('displays error when submitting wrong inputs', () => {
    cy.get('input[name="email"]').type(`{selectall}{backspace} aaaa`)
    cy.get('input[name="password"]').clear()
    cy.get('button[type="submit"]').click()
    cy.get('input[name="email"]:invalid').should('have.length', 1)
    cy.get('input[name="password"]:invalid').should('have.length', 1)
  })

  it('shows error toast if user already exsist', () => {
    cy.intercept('POST', '/api/login', {
      statusCode: 500,
      body: { error: 'User already exists' },
    }).as('loginRequest')


    cy.get('button[type="submit"]').click()
    cy.wait('@loginRequest')
    cy.get('.toast-error').should('be.visible').and('contain', 'User already exists')
  })

  it('shows error toast if invalid email or password', () => {
    cy.intercept('POST', '/api/login', {
      statusCode: 500,
      body: { error: 'Invalid email or password' },
    }).as('loginRequest')


    cy.get('button[type="submit"]').click()
    cy.wait('@loginRequest')
    cy.get('.toast-error').should('be.visible').and('contain', 'Invalid email or password')
  })

  it('redirects to /prenota on successful login', () => {
    cy.intercept('POST', '/api/login', {
      statusCode: 200,
      fixture: 'user.json'
    }).as('loginRequest')
    cy.intercept('GET', '/api/experiences', {
      statusCode: 200,
      body: [],
    }).as('getExperiences')

    cy.get('button[type="submit"]').click()

    cy.wait('@loginRequest')
    cy.wait('@getExperiences')

    cy.location('pathname').should('include', '/prenota')
  })
})
