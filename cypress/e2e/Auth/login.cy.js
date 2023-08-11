describe("Login Component", () => {
    it("should sign in with email and password", () => {
      const email = "mrguerrilla@example.com";
      const password = "coucou";
  
      cy.visit("http://localhost:3000/Login");
  
      cy.get(".btn-primary").click()
      cy.get("#email").type(email);      
      cy.get('Input[type="password"]').type(password);
      cy.get("#send").click();
    });
})
  //   it("should display an error message for incorrect login", () => {
  //     const incorrectEmail = "wrong@example.com";
  //     const incorrectPassword = "wrongpassword";
  
  //     cy.visit("http://localhost:3000/Login");
  
  //     cy.get(".btn-primary").click()
  //     cy.get("#email").type(incorrectEmail);
  //     cy.get('input[type="password"]').type(incorrectPassword);
  //     cy.get("#send").click();
  
  //     // Vérifier que le message d'erreur est affiché
  //     cy.get("p").should("have.text", "NOT LOGGED IN");
  //   });
  
  //   it("should sign in with Google", () => {
  //     cy.visit("https://no-name-project.vercel.app/Login");
  
  //     cy.get("button").contains("Se connecter avec Google").click();
  
  //     // Vérifier que vous êtes redirigé ou que le comportement attendu est correct
  //     // (cela dépend de la mise en œuvre de votre authentification Google)
  //   });
  // });
  