---
description: >-
  Key Digital Functionalities describe the core (required) functions that this
  Building Block must be able to perform.
---

# 4 Key Digital Functionalities

The functional requirements of the Identity Building Block cover the full life cycle or a Foundational ID so as the services offered to use that Identity. The Identity Building Block must offer functionalities to onboard new individuals, update and manage the life cycle of personal data, issue unique identifiers, issue physical or digital credentials, publish identity change events, and offer services to verify identity.

The Identity Building Block must have any response data payload it returns through its API only in the form of JSON or YAML formatted datasets. It is left to the application consuming the response to present it appropriately (e.g. as an Event list or calendar) and provision for associated user interface interactions.

The Identity Building Block must enable usage from the following actors:

* "BB\_Admin" who manages this Building Block to run efficiently in a hosted environment;
* "Partners" who are registered trusted partners and can obtain access to services after authorization;
* "Users" who will manage their own identity information, credentials, preferences and, when appropriate, Partner's access to this information;
* "Subscribers" who can subscribe to notifications of changes in the identity information.

The internal storage of the Identity Building Block must hold the configuration, status, and logged information of all scheduled events. It must also maintain a repository of details of Partners, Users and Subscribers. The key digital functionalities that are considered within the current scope of the specifications are listed below:

## 4.1 Core Services

This section provides a description of the Key Functionalities for each of the core services of the Identity Building Block that was described in Section 2.

### 4.1.1 Enrollment services

Enrollment services exposes API to on-board new and update existing identities. This API is to be used by registration systems that may vary in their form and technologies. This API is there to receive the raw data in a predefined format.

* The enrollment service will need to evaluate the identity related claims based on the registration data, e.g. differentiating between self-asserted or vouched for data in comparison to data coming from an authoritative source (such as a CRVS system). Depending on the context, some of this data (and meta-data) might need to be archived for audit purposes or to allow for repeated anti-fraud checks (e.g. data from an authoritative source was used but subsequently was reported lost / stolen). As this meta-data forms the basis of the resulting identity service, only identity-specific data needs to be stored in the live system, with meta-data being held separately (and under additional security controls).
* Enrollment services may be designed to be permissive, i.e. allowing for enrollment based on partial / poor quality data dependent on the context.
* Those data need to be traceable and auditable so they should come in with all evidence and capture contextual meta-data, but should not permit tracking of such without evidence of permission (declarative process)

Once a new identity has been registered a Unique Identity Number (UIN) will be generated for further representing the User in the GovStack. For privacy purposes, this UIN will be kept secret inside the Identity Building Block, and tokens (randomly generated identifiers) or aliases (existing identifiers) will be linked to it and shared with the User for further involvement in the Identity Verification services or for the Credential management.&#x20;

### **4.1.2 Identity Verification**

Registered and Authorized Partners have access to Identity Building Block Identity verification APIs to request Authentication of Users.  If successful, they can collect personal information (e.g. User's name, User is older than 18 years old) after a User informed consent (if applicable) is given. For a specific Partner and a specific User, the Identity Building Block will produce a unique and repeatable Pairwise Pseudonymous Identifier (PPID, a.k.a. PSUT). This service can be used in other Building Blocks, in public services, but also in private services, even cross-countries.&#x20;

Section 8 defines an OpenID Connect based API for Identity Verification.

### 4.1.3 Query Services

Query Services expose an API that trusted and separately authorized partners can use for making queries on identity data in the Identity Building Block.

### 4.1.4 Credential Management Services

Credential Management Services exposes an API to get access and update the credential associated to the identity, also manage issuance and life-cycle of credentials whatever physical or digital.&#x20;

A User could obtain physical forms of Credentials printed on a physical support (card, paper, etc.). The Physical Credential layout could be generated by the Identity Building Block in a PDF format for a further printing by a credential printing partner. An API would be available to search, authenticate and manage the credentials of a specific User.

Issuing Verifiable Credentials is covered in the Wallet Building Block.

### 4.1.5 Upstream Federation Services

Upstream Federation Services expose an API to trusted partners allowing Users to federate (i.e. map) their identities in external identity providers to their identity in the Identity Building Block. Indeed, individuals may already have an existing form of digital identity (such as, a functional identity) they need to keep using and would like to associate with their foundational identity. In that case the Upstream Federation Services will be able to attach those forms of identity based on their identifier to their foundational identity managed by Identity Building Block, also to allow delegation to them of individual’s authentication.

### 4.1.6 Notifications Services

Notification Services expose APIs which allow triggering of external processes according to events happening on the identity data managed by the Identity Building Block (i.e. new User on-boarded, name change, death, new child born, document lost or stolen, etc.). In order to preserve privacy and respect the principle of single source of truth, the notification should only mention an identity change event to a set of subscribers for them to be aware they may need to refresh a right or create a new record in their system (ie: a birth may generate change in households register of social security and or person reaching 60 may be allowed to retirement pension).

Partners will have the possibility to subscribe for Identity-related events for being notified when they will happen. Subject to preliminary authorization, Partners could subscribe to type of events applicable to all Users, or to specific Users or using filters on some attributes (i.e. age reaching 18). When an event will occur the Identity Building Block will send a notification to the registered partners, then the partner will be in the capacity to request Identity Building Block event-related information.

## **4.2 Other services**

### **4.2.1 Service for users to manage their identity**

User Interfaces and APIs will allow a user to have a management of their personal data for CRUD requests (Create, Read, Update, Delete) according to GDPR regulation and to the Adopting Country laws, policies and practices. A User will have the possibility to generate a temporary and revokable Virtual ID to preserve its privacy for temporary use. A User will have the possibility to link an existing personal identifier for leveraging on existing forms of trusted ID (i.e. ID Card Number, Passport Number, Phone Number, e-mail address, etc.). This identifier will be usable within Identity Verification services.

### **4.2.2 Administration Management**

GovStack administrators will have functionalities to configure the Identity Building Block from a central place.

### 4.2.3 Policy Management

This would cover what attributes would be shared with different partners.  But this will be expanded in future releases and could be considered as a specific type of administration management interface.
