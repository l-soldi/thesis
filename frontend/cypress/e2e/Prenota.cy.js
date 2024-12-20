describe('Prenota', () => {
  before(() => {
    cy.setLocalStorage();
  })

  beforeEach(() => {
    cy.intercept('GET', '/api/experiences', {
      statusCode: 200,
      fixture: 'experiences.json'
    }).as('getExperiences')
    cy.visit('http://localhost:5173/prenota')

    cy.wait('@getExperiences')
  })
  it('renders page', () => {
    cy.get('input[name="date"]').should('be.visible')
    cy.get('input[name="date"]').should('have.length', 1)
    cy.get('input[name="peopleNum"]').should('be.visible')
    cy.get('input[name="peopleNum"]').should('have.value', 1)

    cy.get('button#select-card').should('be.visible').should('be.disabled').and('contain', 'Selezionato')
    cy.get('button#select-card').should('be.visible').and('contain', 'Scegli')

    cy.get('input[name="name"]').should('be.visible').and('have.value', '')
    cy.get('input[name="lastname"]').should('be.visible').and('have.value', '')
    cy.get('input[name="email"]').should('be.visible').and('have.value', '')
    cy.get('input[name="phone"]').should('be.visible').and('have.value', '')
    cy.get('button[type="submit"]').should('be.visible').and('contain', 'Conferma')
  })

  it('displays error when submitting wrong inputs', () => {
    cy.get('input[name="name"]').clear()
    cy.get('input[name="lastname"]').clear()
    cy.get('input[name="email"]').clear()
    cy.get('input[name="phone"]').clear()

    cy.get('button[type="submit"]').click()

    cy.get('input[name="name"]:invalid').should('have.length', 1)
    cy.get('input[name="lastname"]:invalid').should('have.length', 1)
    cy.get('input[name="email"]:invalid').should('have.length', 1)
    cy.get('input[name="phone"]:invalid').should('have.length', 1)
  })

  it('submits form correctly', () => {
    cy.intercept('PUT', '/api/reservations', {
      statusCode: 200,
      fixture: 'reservation.json'
    }).as('reservationRequest')

    cy.get('input[name="name"]').type('Mario')
    cy.get('input[name="lastname"]').type('Rossi')
    cy.get('input[name="email"]').type('email@email.com')
    cy.get('input[name="phone"]').type('1234567890')

    cy.get('button[type="submit"]').click()
    cy.wait('@reservationRequest')

    cy.get('.toast-success').should('be.visible').and('contain', 'Operazione avvenuta con successo')
  })
})