describe('add product to cart', () => {
  beforeEach(() => {
    // abre a pagina da aplicação
    cy.visit('/')
  })

  it('should be able to navigate to the product page and add ir to the cart', () => {
    // navega ate a página de um dos produtos
    cy.get('a[href^="/product"').first().click()

    // garantir que a url atual possua o sufixo product
    /* cy.url().should('include', '/product') */
    cy.location('pathname').should('include', '/product')

    // pego elemento que contenha texto adicionar ao carrinho e clica no elemento
    cy.contains('Adicionar ao carrinho').click()

    // garantir que há um elemento escrito cart(1)
    cy.contains('Cart (1)').should('exist')
  })

  it('should not count duplicated products on cart', () => {
    // navega ate a página de um dos produtos
    cy.get('a[href^="/product"').first().click()

    // garantir que a url atual possua o sufixo product
    /* cy.url().should('include', '/product') */
    cy.location('pathname').should('include', '/product')

    // pego elemento que contenha texto adicionar ao carrinho e clica no elemento 2x
    cy.contains('Adicionar ao carrinho').click()
    cy.contains('Adicionar ao carrinho').click()

    // garantir que há um elemento escrito cart(1)
    cy.contains('Cart (1)').should('exist')
  })
  it('should be able to search for a product and add it to the cart', () => {
    /*
    Substituíco pelo comando personalizado searchByQuery 
    // encontra o campo de busca, digita 'moletom' e faz a busca
    cy.get('input[name=q]').type('moletom').parent('form').submit() */

    cy.searchByQuery('moletom')

    // busca elemento com link para produto e clica
    cy.get('a[href^="/product"').first().click()

    // garantir que a url atual possua o sufixo product
    cy.location('pathname').should('include', '/product')

    // pego elemento que contenha texto adicionar ao carrinho e clica no elemento
    cy.contains('Adicionar ao carrinho').click()

    // garantir que há um elemento escrito cart(1)
    cy.contains('Cart (1)').should('exist')
  })
})
