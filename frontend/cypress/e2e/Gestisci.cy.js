describe('Gestisci', () => {
  before(() => {
    cy.setLocalStorage();
  })

  it('renders empty page', () => {
    cy.intercept('POST', '/api/reservations*', {
      statusCode: 200,
      body: { items: [], totalItems: 0 },
    }).as('getEmptyReservations')
    cy.visit('http://localhost:5173/gestisci')

    cy.wait('@getEmptyReservations')

    cy.get('h2').should('be.visible').and('contain', 'Non hai prenotazioni')
    cy.get('button').should('be.visible').and('contain', 'Prenota subito')
  })

  it('renders page, table, and pagination', () => {
    cy.intercept('POST', '/api/reservations*', {
      statusCode: 200,
      fixture: 'reservations.json'
    }).as('getReservations')

    cy.visit('http://localhost:5173/gestisci')
    cy.wait('@getReservations')

    cy.get('h2').should('be.visible').and('contain', 'Le tue prenotazioni')

    cy.get('table').should('exist')
    cy.get('tbody tr').should('have.length', 5)

    cy.get('th').eq(0).should('contain', 'Nome')
    cy.get('th').eq(1).should('contain', 'Cognome')
    cy.get('th').eq(2).should('contain', 'Email')
    cy.get('th').eq(3).should('contain', 'Esperienza')
    cy.get('th').eq(4).should('contain', 'Data')
    cy.get('th').eq(5).should('contain', 'Partecipanti')
    cy.get('th').eq(6).should('contain', 'Prezzo')

    cy.get('tbody tr').eq(0).within(() => {
      cy.get('td').eq(0).should('contain', 'Marione')
      cy.get('td').eq(1).should('contain', 'Rossi')
      cy.get('td').eq(2).should('contain', 'b@b.com')
      cy.get('td').eq(3).should('contain', 'Concerto Rock')
      cy.get('td').eq(4).should('contain', '2024-12-19')
      cy.get('td').eq(5).should('contain', '1')
      cy.get('td').eq(6).should('contain', '100')
      cy.get('button').eq(0).should('contain', 'Modifica')
      cy.get('button').eq(1).should('contain', 'Elimina')
    })

    cy.get('.items-per-page').should('be.visible')
    cy.get('label').should('be.visible').and('contain', 'Elementi per pagina')
    cy.get('.items-per-page select').should('be.visible').and('contain', '5')

    cy.get('.pagination button').eq(0).should('be.visible').and('be.disabled').and('contain', 'Precedente')
    cy.get('.pagination button').eq(1).should('be.visible').and('be.enabled').and('contain', '1')
    cy.get('.pagination button').eq(2).should('be.visible').and('be.enabled').and('contain', '2')
    cy.get('.pagination button').eq(3).should('be.visible').and('be.enabled').and('contain', '4')
    cy.get('.pagination button').eq(4).should('be.visible').and('be.enabled').and('contain', 'Successivo')
  })

  it('shows edit modal on click', () => {
    cy.intercept('POST', '/api/reservations*', {
      statusCode: 200,
      fixture: 'reservations.json'
    }).as('getReservations')

    cy.visit('http://localhost:5173/gestisci')
    cy.wait('@getReservations')

    cy.get('tbody tr').eq(0).within(() => {
      cy.get('button').eq(0).should('contain', 'Modifica').click()
    })

    cy.get('.modal').should('be.visible')
    cy.get('.modal h3').should('contain', 'Modifica dati della prenotazione')
    cy.get('.modal p').should('contain', "E' permessa la modifica dei soli dati dell'utente, della data e del numero dei partecipanti.")
    cy.get('.modal input[name="name"]').should('have.value', 'Marione')
    cy.get('.modal input[name="lastname"]').should('have.value', 'Rossi')
    cy.get('.modal input[name="email"]').should('have.value', 'b@b.com')
    cy.get('.modal input[name="phone"]').should('have.value', '929292032')
    cy.get('.modal input[name="date"]').should('have.value', '2024-12-19')
    cy.get('.modal input[name="peopleNum"]').should('have.value', '1')
    cy.get('.modal button').eq(0).should('contain', 'x')
    cy.get('.modal button').eq(1).should('contain', 'Conferma')
    cy.get('.modal button').eq(2).should('contain', 'Annulla')
  })

  it('will not submit edit if fields are empty', () => {
    cy.intercept('POST', '/api/reservations*', {
      statusCode: 200,
      fixture: 'reservations.json'
    }).as('getReservations')
    cy.visit('http://localhost:5173/gestisci')
    cy.wait('@getReservations')

    cy.get('tbody tr').eq(0).within(() => {
      cy.get('button').eq(0).should('contain', 'Modifica').click()
    })

    cy.get('.modal input[name="name"]').clear()
    cy.get('.modal input[name="lastname"]').clear()
    cy.get('.modal input[name="email"]').clear()
    cy.get('.modal input[name="phone"]').clear()
    cy.get('.modal input[name="date"]').clear()
    cy.get('.modal input[name="peopleNum"]').clear()

    cy.get('.modal button').eq(1).click()
    cy.get('.modal input:invalid').should('have.length', 6)
  })

  it('submits edit correctly', () => {
    cy.intercept('POST', '/api/reservations*', {
      statusCode: 200,
      fixture: 'reservations.json'
    }).as('getReservations')

    cy.intercept('PATCH', '/api/reservations/*', {
      statusCode: 200
    }).as('updateReservation')

    cy.visit('http://localhost:5173/gestisci')
    cy.wait('@getReservations')

    cy.get('tbody tr').eq(0).within(() => {
      cy.get('button').eq(0).should('contain', 'Modifica').click()
    })

    cy.get('.modal input[name="name"]').clear().type('Mario')
    cy.get('.modal input[name="email"]').clear().type('boh@boh.com')
    cy.get('.modal input[name="date"]').clear().type( '2024-12-25')
    cy.get('.modal button').eq(1).should('contain', 'Conferma').click()

    cy.get('.toast-success').should('be.visible').and('contain', 'Operazione avvenuta con successo')
  })

  it('submits edit but error on backend', () => {
    cy.intercept('POST', '/api/reservations*', {
      statusCode: 200,
      fixture: 'reservations.json'
    }).as('getReservations')

    cy.intercept('PATCH', '/api/reservations/*', {
      statusCode: 500
    }).as('updateReservation')

    cy.visit('http://localhost:5173/gestisci')
    cy.wait('@getReservations')

    cy.get('tbody tr').eq(0).within(() => {
      cy.get('button').eq(0).should('contain', 'Modifica').click()
    })

    cy.get('.modal input[name="name"]').clear().type('Mario')
    cy.get('.modal input[name="email"]').clear().type('boh@boh.com')
    cy.get('.modal input[name="date"]').clear().type( '2024-12-25')
    cy.get('.modal button').eq(1).should('contain', 'Conferma').click()

    cy.get('.toast-error').should('be.visible').and('contain', 'Response status: 500, Internal Server Error')
  })

  it('shows delete modal on click', () => {
    cy.intercept('POST', '/api/reservations*', {
      statusCode: 200,
      fixture: 'reservations.json'
    }).as('getReservations')
    cy.visit('http://localhost:5173/gestisci')
    cy.wait('@getReservations')

    cy.get('tbody tr').eq(0).within(() => {
      cy.get('button').eq(1).should('contain', 'Elimina').click()
    })

    cy.get('.modal').should('be.visible')
    cy.get('.modal h3').should('contain', 'Sei sicuro di voler eliminare questa prenotazione?')
    cy.get('.modal p').should('contain', "L'operazione non è reversibile, i dati andranno persi.")

    cy.get('.modal button').eq(0).should('contain', 'x')
    cy.get('.modal button').eq(1).should('contain', 'Annulla')
    cy.get('.modal button').eq(2).should('contain', 'Conferma')
  })

  it('submits delete correctly', () => {
    cy.intercept('POST', '/api/reservations*', {
      statusCode: 200,
      fixture: 'reservations.json'
    }).as('getReservations')

    cy.intercept('DELETE', '/api/reservations/*', {
      statusCode: 200
    }).as('deleteReservation')

    cy.visit('http://localhost:5173/gestisci')
    cy.wait('@getReservations')

    cy.get('tbody tr').eq(0).within(() => {
      cy.get('button').eq(1).should('contain', 'Elimina').click()
    })

    cy.get('.modal').should('be.visible')
    cy.get('.modal button').eq(2).click()

    cy.get('.toast-success').should('be.visible').and('contain', 'Operazione avvenuta con successo')
  })
})