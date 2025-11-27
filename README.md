# EasyDMARC SPF Record Generator – QA Test Project

This project contains **manual test cases** and **automated Cypress tests** for the EasyDMARC SPF Record Generator tool.  
The goal is to validate core SPF mechanisms, ensure correct input handling, and verify accurate SPF record generation.

Both manual and automated coverage focus on the most critical behaviors of the SPF Generator.

---

## Project Structure
<pre>
Easydmarc/
│
├── cypress/
│   ├── e2e/
│   │   └── spf_generator.cy.ts      # Automated Test File
│   ├── fixtures/
│   ├── support/
│
├── cypress.config.ts
├── package.json
├── README.md
└── Manual_Test_Cases.pdf
</pre>
---

## Automated Test Cases (Cypress + TypeScript)

The automated tests cover the most important and logical scenarios that provide high confidence in the SPF generator:

### Included Automated Test Cases
1. Validate that domain input generates an SPF record  
2. Add valid **Include** value  
3. Add valid **IPv4** value  
4. Add valid **IPv6** value  
5. Add valid **A record**  
6. Add valid **MX record**  
7. Add valid **Exists** mechanism  
8. Toggle redirect mode & generate redirect SPF  
9. Validate generated SPF final structure  
10. Generate record with combined mechanisms (mixed inputs)

All selectors used in Cypress are taken directly from the actual application DOM and verified manually.



##  How to Install & Run the Project

### 1. Install dependencies  
Navigate to the project folder and run:

npm install

### 2. Open Cypress Test Runner  

npx cypress open

Then select:

spf_generator.cy.ts

### 3. Run tests in headless mode  

npx cypress run --spec cypress/e2e/spf_generator.cy.ts

---

## Manual Test Cases

The file `Manual_Test_Cases.pdf` contains detailed manual scenarios for:

- Valid and invalid SPF mechanisms  
- Redirect vs. Include behavior  
- Error handling  
- UI interaction coverage  
- Combined SPF inputs  

---

## Requirements

To run the Cypress tests, you need:

- Node.js **v16+**  
- npm **v8+**  
- Cypress **v13+**  
- TypeScript enabled  
- macOS, Windows, or Linux
