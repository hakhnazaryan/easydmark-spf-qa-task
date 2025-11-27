/// <reference types="cypress" />

describe("EasyDMARC SPF Record Generator - Critical Automation Tests", () => {
  const URL = "https://easydmarc.com/tools/spf-record-generator";

  //Helper function to enter domain
  const enterDomain = () => {
    cy.get("#domain").clear().click().type("mycompany.test");
  };

  beforeEach(() => {
    cy.visit(URL);
  });
 
  // 1. Generate SPF with valid IPv4

  it("Generates SPF with valid IPv4", () => {
   enterDomain();

   cy.get('[data-option-name="IPv4"]').first().click();
    cy.get('[placeholder="e.g. 10.0.0.1/20 192.168.0.10"]').first().click().type("192.168.1.1");

    cy.get('button[type="submit"]').click();

    cy.get('#generated-spf-record')
      .should('be.visible')
      .should('contain.text', 'v=spf1 ip4:192.168.1.1 ~all');
  })


 // 2. Generate SPF with valid IPv6

  it("Generates SPF with valid IPv6", () => {
    enterDomain();

    cy.get(".show-more-text").first().click();
    cy.get('[data-option-name="IPv6"]').first().click();
    cy.get('[placeholder="e.g. 2001:db8:0:1:1:1:1:1 2404:6800:4000::/36"]').click().type("2001:db8::1");

    cy.get('button[type="submit"]').click();

    cy.get("#generated-spf-record").should("contain", "v=spf1 ip6:2001:db8::1 ~all");
  });


  // 3. Generate SPF with valid Include

  it("Generates SPF with valid Include domain", () => {
    enterDomain();

    cy.get('[placeholder="Start typing Email Sender name or include value"]').first().click().type("_spf.google.com");

    cy.get('button[type="submit"]').click();

    cy.get("#generated-spf-record").should("contain", "v=spf1 include:_spf.google.com ~all");
  });

 
  // 4. Generate SPF with valid MX

  it("Generates SPF with valid MX record", () => {
    enterDomain();

    cy.get(".show-more-text").first().click();
    cy.get('[data-option-name="MX record"]').first().click();
    cy.get('[placeholder="e.g. example2.com"]').click().type("easydmarc.com");

    cy.get('button[type="submit"]').click();

    cy.get("#generated-spf-record").should("contain", "mx:easydmarc.com");
  });

 
  // 5. Redirect Toggle ON

  it("Generates SPF with redirect when toggle ON", () => {
    enterDomain();

    cy.get(".eas-toggle-switcher__slider").click();
    cy.get('[placeholder="e.g _spf.google.com mail.zendesk.com"]').click().type("_spf.google.com");

    cy.get('button[type="submit"]').click();

    cy.get("#generated-spf-record").should("contain", "v=spf1 redirect=_spf.google.com");
  });

 
  // 6. Redirect toggle OFF → back to include

  it("Switching redirect OFF restores include mode", () => {
    enterDomain();

    cy.get(".eas-toggle-switcher__slider").click(); // ON
    cy.get(".eas-toggle-switcher__slider").click(); // OFF

    cy.get('[placeholder="Start typing Email Sender name or include value"]').click().type("_spf.google.com");

    cy.get('button[type="submit"]').click();

    cy.get("#generated-spf-record").should("contain", "include:_spf.google.com ~all");
  });


  // 7. Invalid IPv4

  it("Shows error for invalid IPv4", () => {
    enterDomain();

    cy.get('[data-option-name="IPv4"]').first().click();
    cy.get('[placeholder="e.g. 10.0.0.1/20 192.168.0.10"]').click().type("300.1.1.1");

    cy.get('button[type="submit"]').click();

    cy.contains("invalid IP address", { matchCase: false }).should("exist");
  });

 
  // 8. Invalid IPv6
 
  it("Shows error for invalid IPv6", () => {
    enterDomain();

    cy.get(".show-more-text").first().click();
    cy.get('[data-option-name="IPv6"]').first().click();
    cy.get('[placeholder="e.g. 2001:db8:0:1:1:1:1:1 2404:6800:4000::/36"]').click().type("12345::678");

    cy.get('button[type="submit"]').click();

    cy.contains("invalid IP address", { matchCase: false }).should("exist");
  });


  // 9. Generate button disabled when domain empty

  it("Generate button is disabled when domain is empty", () => {
    cy.get("#domain").clear().click();
    cy.get('button[type="submit"]').should("be.disabled");
  });


  // 10. Generates SPF with mixed mechanisms

  it("Generates SPF with Include + IPv4 + A record + Exists", () => {
    enterDomain();

    // Include
    cy.get('input[placeholder="Start typing Email Sender name or include value"]').first()
      .click().type("_spf.google.com");

    // IPv4
    cy.get('[data-option-name="IPv4"]').first().click();
    cy.get('input[placeholder="e.g. 10.0.0.1/20 192.168.0.10"]')
      .click().type("10.10.10.10");

    // Show more (for A, MX, Exists)
    cy.get(".show-more-text").first().click();

    // A record
    cy.get('[data-option-name="A record"]').first().click();
    cy.get('input[placeholder="e.g. example2.com"]')
      .click().type("easydmarc.com");


    // Exists
    cy.get('[data-option-name="Exists"]').first().click();
    cy.get('input[placeholder="e.g. %{i}._spf.example.com"]')
      .click().type("%{i}._spf.mta.salesforce.com");

    // Generate
    cy.get('button[type="submit"]').click();

    // Assertions
    cy.get("#generated-spf-record")
      .should("contain", "v=spf1 include:_spf.google.com ip4:10.10.10.10 a:easydmarc.com exists:%i._spf.mta.salesforce.com ~all")
  });

});
