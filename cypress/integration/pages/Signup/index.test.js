describe("Page Signup", function() {
  it("Open page on Desktop", function() {
    cy.visit("/auth/signup");
  });

  it("Open page on Mobile", function() {
    cy.visit("/auth/signup");
    cy.viewport("iphone-5");
  });

  it("Open page on TV 4K", function() {
    cy.visit("/auth/signup");
    cy.viewport(3840, 2160);
  });

  it("Verify if exist the fields: Name, E-mail and Password", function() {
    cy.visit("/auth/signup");

    cy.contains("Nome:");
    cy.get("input[name=name]");

    cy.contains("E-mail:");
    cy.get("input[name=email]");

    cy.contains("Senha:");
    cy.get("input[name=password]");
  });

  it("Send the form without filling in the inputs", function() {
    cy.visit("/auth/signup");
    cy.contains("Enviar").click();

    cy.contains("Nome é obrigatório");
    cy.contains("E-mail é obrigatório");
    cy.contains("Senha é obrigatória");
  });

  it("Send the form with name invalid", function() {
    cy.visit("/auth/signup");
    cy.get("input[name=name]").type("a");
    cy.contains("Enviar").click();
    cy.contains("Nome tem que ter 2 ou mais caracteres");
  });

  it("Send the form with email invalid", function() {
    cy.visit("/auth/signup");
    cy.get("input[name=email]").type("marco");
    cy.contains("Enviar").click();
    cy.contains("Preencha com email válido");
  });

  it("Send the form with password invalid", function() {
    cy.visit("/auth/signup");
    cy.get("input[name=password]").type("1234567");
    cy.contains("Enviar").click();
    cy.contains("Senha tem que ter 8 ou mais caracteres");
  });

  it("Send the form with all fields valid", function() {
    cy.visit("/auth/signup");
    cy.get("input[name=name]").type("Henri");
    cy.get("input[name=email]").type("marco.bruno.br@gmail.com");
    cy.get("input[name=password]").type("q1w2e3r4");
    cy.contains("Enviar").click();
  });
});
