describe("renders the home page",()=>{
    it("renders correctly",()=>{
        cy.visit("/")
        cy.get("#main-table").should("exist")
    })
    it("accessing rows",()=>{
        cy.visit("/")
        cy.get("#1").click()
    })
    it("testing search functionality",()=>{
        cy.visit("/")
        cy.get("#search").type("la")
    })
    it("sorting by team name",()=>{
        cy.visit("/")
        cy.get("#filter-team-name").click()
        cy.get("#23").click()
    })
    it("sorting by city",()=>{
        cy.visit("/")
        cy.get("#filter-city").click()
        cy.get("#20").click()
    }) 
    it("sorting by division",()=>{
        cy.visit("/")
        cy.get("#filter-division").click()
        cy.get("#15").click()
    })
    it("sorting by abbreviation",()=>{
        cy.visit("/")
        cy.get("#filter-abbreviation").click()
        cy.get("#10").click()
    })
})