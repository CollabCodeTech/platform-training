import UserBuilder from "../../../libs/user.builder";

describe("Page Signup", function () {
  before(function () {
    Cypress.Cookies.debug(true);
  });

  it("Open page on Desktop", function () {
    cy.visit("/auth/signup");
  });

  it("Open page on Mobile", function () {
    cy.visit("/auth/signup");
    cy.viewport("iphone-5");
  });

  it("Open page on TV 4K", function () {
    cy.visit("/auth/signup");
    cy.viewport(3840, 2160);
  });

  it("Verify if exist the fields: Name, E-mail and Password", function () {
    cy.visit("/auth/signup");

    cy.contains("Nome:");
    cy.get("input[name=name]");

    cy.contains("E-mail:");
    cy.get("input[name=email]");

    cy.contains("Senha:");
    cy.get("input[name=password]");
  });

  it("Send the form without filling in the inputs", function () {
    cy.visit("/auth/signup");
    cy.contains("Enviar").click();

    cy.contains("Nome é obrigatório");
    cy.contains("E-mail é obrigatório");
    cy.contains("Senha é obrigatória");
  });

  it("Send the form with name invalid that has only one char", function () {
    const { name } = UserBuilder.nameInvalid();

    cy.visit("/auth/signup");
    cy.get("input[name=name]").type(name);
    cy.contains("Enviar").click();
    cy.contains("Nome tem que ter 2 ou mais caracteres");
  });

  it("Send the form with email invalid", function () {
    const { email } = UserBuilder.emailInvalid();

    cy.visit("/auth/signup");
    cy.get("input[name=email]").type(email);
    cy.contains("Enviar").click();
    cy.contains("Preencha com email válido");
  });

  it("Send the form with password invalid", function () {
    const { password } = UserBuilder.passwordInvalid();

    cy.visit("/auth/signup");
    cy.get("input[name=password]").type(password);
    cy.contains("Enviar").click();
    cy.contains("Senha tem que ter 8 ou mais caracteres");
  });

  it("Send the form with the fields name, email and password valid", function () {
    const { name, email, password } = UserBuilder.randomUserInfo();

    cy.visit("/auth/signup");
    cy.get("input[name=name]").type(name);
    cy.get("input[name=email]").type(email);
    cy.get("input[name=password]").type(password);
    cy.contains("Enviar").click();
    cy.location("pathname").should("include", "dashboard");
  });

  it("Verify if the cookie jwt was create", function () {
    const { name, email, password } = UserBuilder.randomUserInfo();

    cy.clearCookies();
    cy.visit("/auth/signup");
    cy.get("input[name=name]").type(name);
    cy.get("input[name=email]").type(email);
    cy.get("input[name=password]").type(password);
    cy.contains("Enviar").click();
    cy.location("pathname").should("include", "dashboard");
    // cy.contains("Dashboard").then(function() {
    //   cy.getCookie("jwt")
    //     .should("have.property", "value")
    //     .and(
    //       "match",
    //       /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/
    //     );
    // });
  });
});
