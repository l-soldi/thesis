describe('Login page - registration flow', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login')
    cy.get('button[id="register"]').click()
  })

  it('renders page', () => {
    cy.get('input[name="name"]').should('be.visible')
    cy.get('input[name="lastname"]').should('be.visible')
    cy.get('input[name="email"]').should('be.visible')
    cy.get('input[name="password"]').should('be.visible')
    cy.get('button[type="submit"]').should('be.visible')
    cy.get('button[id="register"]').should('not.exist')
    cy.get('button').contains('Indietro').should('be.visible')
  })

  it('displays error when submitting wrong inputs', () => {
    cy.get('input[name="name"]').clear()
    cy.get('input[name="lastname"]').clear()
    cy.get('input[name="email"]').clear()
    cy.get('input[name="password"]').clear()

    cy.get('button[type="submit"]').click()

    cy.get('input[name="name"]:invalid').should('have.length', 1)
    cy.get('input[name="lastname"]:invalid').should('have.length', 1)
    cy.get('input[name="email"]:invalid').should('have.length', 1)
    cy.get('input[name="password"]:invalid').should('have.length', 1)
  })

  it('shows error toast if user already exsist', () => {
    cy.intercept('POST', '/api/register', {
      statusCode: 500,
      body: { error: 'User already exists' },
    }).as('registerRequest')

    cy.get('button[type="submit"]').click()
    cy.wait('@registerRequest')
    cy.get('.toast-error').should('be.visible').and('contain', 'User already exists')
  })

  it('submits form and redirects to /prenota', () => {

  
    cy.intercept('POST', '/api/register', {
        statusCode: 200,
        fixture: 'user.json'
      }).as('registerRequest')
    cy.intercept('GET', '/api/experiences', {
      statusCode: 200,
      body: [],
    }).as('getExperiences')

    cy.get('button[type="submit"]').click()
    cy.wait('@registerRequest')
    cy.wait('@getExperiences')

    cy.url().should('include', '/prenota')
  })
})