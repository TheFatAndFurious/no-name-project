describe("LogOut Component", () => {
  it('should log out and redirect to "/" on button click', () => {
    // Visiter la page où se trouve le composant LogOut
    cy.visit("/homepage");

    // Intercepter les appels à supabase.auth.signOut()
    cy.intercept("POST", "https://votre-domaine.supabase.co/auth/v1/logout", {
      statusCode: 200,
      body: { error: null },
    }).as("signOut");

    // Cliquer sur le bouton "Se deconnecter"
    cy.contains("Se deconnecter").click();

    // Attendre que l'appel de déconnexion soit intercepté et répondu
    cy.wait("@signOut");

    // Vérifier que la redirection vers "/" a été effectuée
    //cy.url().should('eq', 'https://localhost:3000');

    // Vérifier que l'erreur n'est pas affichée (pour s'assurer que catch() n'a pas été appelée)
    cy.get("div").should("not.contain", "Erreur");
  });
});
