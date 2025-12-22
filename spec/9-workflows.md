---
description: >-
  This section provides a detailed view of how this Building Block will interact
  with other Building Blocks to support common use cases.
---

# 9 Internal Workflows

the If GovStack will offer global workflow management for cross-building block use cases, Identity Building Block will have its internal workflows for its own internal business flows execution.

Non-exhaustive list of examples:

* For onboarding a new individual.
* For managing identity changes after an event on a person's identity (name change, death, etc.).
* For life cycle management of an individual's identity evidence (i.e. ID Cards).
* For management of access rights to services on an individual's data.

Those workflows will be described in a later version.

### 9.1 Identity Verification Workflow

The below workflow details the steps involved in the relying party application enabling the end user to log in using their National ID. Once the login process is completed, Identity Building Block also allows the relying party to get verified user claims based on explicit permission from the end user.

#### 9.1.1 Verification with user claims

The steps are:

* The relying party wants to authenticate the user to the Identity Building Block.
* The relying party redirects the user to the Identity Building Block UI.
* The user will authenticate on the Identity Build block.
* The Identity Build Block will ask the user permission to share his/her personal data.
* The User selected the attributes he/she accepts to share.
* A code is generated and returned by the Identity Building Block to the relying party.
* The relying party uses the code and receives an ID token and an access token.
* The relying party then uses the access token to receive the user information.
* The user can pursue its application within the relying party UI.

```mermaid
sequenceDiagram
    User->>+Relying Party UI: Click on "Login with <br>National ID" button
    Relying Party UI-->>+IDBB UI: Browser redirects <br>to /authorize
    IDBB UI->>+IDBB Backend: Passes the request <br>details for validation
    IDBB Backend->>+IDBB UI: On success validation<br> returns session / <br>transaction ID
    IDBB UI->>+User: Shows login page
    User->>+IDBB UI: Provides the <br>authentication <br>challenges
    IDBB UI->>+IDBB Backend: Forwards the authentication challenges <br> for verification
    IDBB Backend->>+IDBB UI: On successful verification, returns success
    IDBB UI->>+User: Shows the permissions <br>/ consent page
    User->>+IDBB UI: Approves the user claims <br>that can shared to relying party
    IDBB UI->>+IDBB Backend: Forwards the approved user claims
    IDBB Backend->>+IDBB UI: Stores the claims in database and responds <br> with randomly generated authorization code
    IDBB UI-->>+Relying Party UI: Browser redirects back along <br>with authorization code
    Relying Party UI->>+Relying Party Backend: Forwards the <br>authorization code<br> along with state details
    Relying Party Backend->>+IDBB Backend: Invokes /token endpoint passing<br> the authorization code <br>along with client assertion
    IDBB Backend->>+Relying Party Backend: On successful validation,<br> returns the ID Token <br>and Access Token
    Relying Party Backend->>+IDBB Backend: Invokes /userinfo endpoint <br>passing the Access token<br> as bearer token
    IDBB Backend->>+Relying Party Backend: On successful validation, <br>responds with user claims<br> in JWT/JWE format
```

<div align="center"><figure><img src="https://www.mermaidchart.com/app/projects/254d3e3b-e9e1-4879-ac9a-55bb5e729a4a/diagrams/462d368e-7b94-482f-82cf-c05521bc4665/version/v0.1/edit" alt=""><figcaption></figcaption></figure></div>

#### 9.1.2 Verification without user claims

If the relying party wants to verify the identity of the end user without user information, then a lean workflow can be adopted. The steps of lean flow are similar to the workflow steps in previous section. However, during /authorize API call, the scope is set to "openid". This informs the IDBB UI that no user claims will be accessed and thus IDBB UI doesn't show any consent page and these steps are skipped in the workflow.

```mermaid
sequenceDiagram
    User->>+Relying Party UI: Click on “Login with National ID” button
    Relying Party UI-->>+IDBB UI: Browser redirects to /authorize
    IDBB UI->>+IDBB Backend: Passes the request details for validation
    IDBB Backend->>IDBB UI: On successful validation, returns session/transaction ID
    IDBB UI->>User: Shows Login Page
    User->>IDBB UI: Provides the authentication challenges
    IDBB UI->>IDBB Backend: Forwards the authentication challenges for verification
    IDBB Backend->>IDBB UI: On successful validation, responds with randomly generated authorization code
    IDBB UI-->>Relying Party UI: Browser redirects back along with authorization code
    Relying Party UI->>+Relying Party Backend: Forwards the authorization code along with state details
    Relying Party Backend->>IDBB Backend: Invokes /token endpoint along with the authorization code
    IDBB Backend->>Relying Party Backend: On successful validation, returns the ID Token and Access Token
```

### 9.2 Enrollment Workflow

The enrollment process differs from country to country and the enrollment data collection can be done in-person, or ported from existing servers. Here sample workflows are shown.&#x20;

#### 9.2.1 Enrollment Workflow (Fresh Enrollment)

These are the sample steps for fresh enrollment where the enrollment data is collected afresh:

1. User goes to the Enrollment office.&#x20;
2. The Enrollment Client collects user demographic details and supporting documents and calls the createPacket API of the GovStack Packet Store.
3. Enrollment Client collects user bio-metric details and calls createPacket API of GovStack Packet Store.
4. Once all the enrollment data is available at the GovStack Packet Store, it triggers enrollment process in the GovStack Packet Processor.
5. GovStack Packet Processor processes the data and generates a Unique Identity for the user.
6. The user is notified of successful enrollment and receives the Unique Identity by mail.

```mermaid
sequenceDiagram
    User->>+Enrollment Client: Initiate enrollment
    Enrollment Client->>+IDBB Packet Store: createPacket API Request (Demographics Data + Supporting Documents)
    Enrollment Client->>IDBB Packet Store: createPacket API Request (with Biometrics Data)
    IDBB Packet Store->>Enrollment Client: createPacket API Response
    IDBB Packet Store->>+IDBB Packet Processor: Trigger Enrollment Process
    IDBB Packet Processor->>IDBB Packet Processor: Generate Unique Identity
    IDBB Packet Processor->>User: Upon successful enrollment, notify user of Unique Identity generation
```

#### 9.2.2 Enrollment Workflow (Enrollment with existing database)

These are the steps for enrollment using existing data, in which the demographic details are collected from an existing database and biometric data is collected afresh.

1. The user goes to the Enrollment office.&#x20;
2. The enrollment Client retrieves the user demographic details and supporting documents from an existing database and calls the createPacket API of the GovStack Packet Store.
3. Enrollment Client collects user biometric details afresh and calls createPacket API of GovStack Packet Store.
4. Once all the enrollment data is available at the GovStack Packet Store, it triggers the enrollment process in the GovStack Packet Processor.
5. GovStack Packet Processor processes the data and generates a Unique Identity for the user.
6. The user is notified of successful enrollment and receives the Unique Identity by mail.



```mermaid
sequenceDiagram
    User->>+Enrollment Client: Initiate enrollment
    Enrollment Client->>+Existing Database: Retrieve demographic details
    Existing Database->>Enrollment Client: Respond with demographic data
    Enrollment Client->>+IDBB Packet Store: createPacket API Request (with Demographics data)
    Enrollment Client->>IDBB Packet Store: createPacket API Request (with Biometrics data)
    IDBB Packet Store->>Enrollment Client: createPacket API Response
    IDBB Packet Store->>+IDBB Packet Processor: Trigger Enrollment Process
    IDBB Packet Processor->>IDBB Packet Processor: Generate Unique Identity
    IDBB Packet Processor->>User: Upon successful enrollment, notify user of Unique Identity generation
```

### 9.3 Credential Management&#x20;

#### 9.3.1 Sharing Credentials

This sequence diagram shows the workflow for sharing credentials.

1. The user logs into the Citizen Portal.
2. After authentication, the user can select the format of the credentials to be shared. The format is defined by the attributes such as fully/partially masking.
3. The user gives consent for sharing the credentials and logs a request. The Citizen Portal returns an event ID.&#x20;
4. The user logs in to the Citizen Portal after some time and checks the status of the credential-sharing request using the event ID.
5. The credentials can be provided as a Verifiable Credential in PDF format with the issuer's signature.

```mermaid
sequenceDiagram
    User->>+Citizen Portal: Login in the portal
    Citizen Portal->>User: After authentication success, show share credentials
    User->>Citizen Portal: Provide the consent and attributes of credentials (masked/unmasked) to share
    Citizen Portal->>+IDBB: Call /share-credential with user-selected details
    IDBB->>Citizen Portal: Return eventId
    Citizen Portal->>User: Display eventId
    User->>Citizen Portal: Logout
    User->>Citizen Portal: Login after sometime
    Citizen Portal->>User: After authentication success, show retrieve event status
    User->>Citizen Portal: Provide the event Id
    Citizen Portal->>IDBB: Call /events/{eventId}?language=language_code
    IDBB->>Citizen Portal: /event/eventId response in the form of key-value pairs
    Citizen Portal->>User: Provide a downloadable document with the user's credentials
```

#### 9.3.2 Download Credentials

This sequence diagram shows the workflow for downloading a Unique Identity Card:

* The user logs into the Citizen Portal.
* After authentication, the user clicks on the Download Card.
* The Citizen Portal calls the '/download/personalized-card' API on the IDBB.
* IDBB returns a link for the card download.
* The Citizen Portal shares the link with the user.

```mermaid
sequenceDiagram
   User->>+Citizen Portal: Login in the portal
   Citizen Portal->>User: After authentication success, display download card menu item
   User->>Citizen Portal: Click on download card
   Citizen Portal->>+IDBB: Call /download/personalized-card
   IDBB->>Citizen Portal: Return the download link for the card
    Citizen Portal->>User: Display card download link
    User->>Citizen Portal: Logout
```

### 9.4 Notification Workflow



