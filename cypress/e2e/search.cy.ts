describe('search products', () => {
  it('should be able to search for products', () => {
    /* Substituimos pelo comando personalizado searchByQery 
    cy.visit('/')
    cy.get('input[name=q]').type('moletom').parent('form').submit() */

    cy.searchByQuery('moletom')

    cy.location('pathname').should('include', '/search')
    cy.location('search').should('include', 'q=moletom')

    cy.get('a[href^="/product"]').should('exist')
  })

  it('should not be able to search page without a search query', () => {
    // suprime erro do redirect do next, que nao foi tratado.
    cy.on('uncaught:exception', () => {
      return false
    })

    cy.visit('/search')

    cy.location('pathname').should('equal', '/')
  })
})
