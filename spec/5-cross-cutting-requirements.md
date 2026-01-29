---
description: >-
  This section will highlight important requirements or describe any additional
  cross-cutting requirements that apply to this Building Block.
---

# 5 Cross-Cutting Requirements

## **5.1 Requirements**

The Cross-cutting requirements described in this section are an extension of the cross-cutting requirements defined in the [Security Requirements](https://govstack.gitbook.io/specification/v/1.0/security-requirements).

### 5.1.1 Enrollment Services (REQUIRED)

Enrollment services for a digital identity using the physical credentials of the enrollee (a human citizen subject) and the process of the Identity Building Block (see the functional requirements for Identity in the Identity Building Block Specification). A feature for invalidating, locking or disenrollment/revocation of the digital identity shall also be provided as a response measure to both human citizen subjects leaving the system and responding to security breaches encountered. Digital certificate or verifiable credential enrollment must be provided by the solution but is not required for every human citizen subject (see below). Notes:

* It is anticipated that the Identity Building Block will call this feature either directly via API or indirectly via the IAM features of the Security Building Block for users electing to use an eID consisting of certificates as a part of the account provisioning process. The digital identity will then be stored with the physical ID records in the Identity Building Block and sent to the new user via secure means (probably installed on their device).
* Simple numerical eIDs will also be supported for human citizen subjects as an option where users are unable to leverage certificates-based eIDs. The requirements governing this are to be stipulated by the Identity Building Block (see the Identity Building Block Definition).
* Third-party organizations and internal subjects (both human and non-human) must be issued valid signed digital certificates in order to establish and maintain secure inter-organization and internal communications.

### 5.1.2 Multi-Factor Authentication (REQUIRED)

The overall solution suite shall also be able to implement multi-factor authentication using simple numeric eIDs for human citizen subjects such as their tax file or social security number of the user.

A selection of various alternatives for eID is required in order to cater for varying needs of citizens. Various eID types are also required to be optimally supported such as HOTP and TOTP tokens, SMS, email, push notifications, SSH keys, X.509 certificates, Yubikeys, Nitrokeys, U2F and WebAuthn. Vendors of solutions SHOULD articulate the benefits of what they propose in their solution.

Note that multi-factor authentication must be able to be implemented for both external and internal subjects (people, systems, components etc.) but is not necessarily required for internal non-human subjects (such as building block components) as they communicate via the information mediator Building Block (see the Information Mediator Building Block Specification).

### 5.1.3 Use Multi-Factor Authentication with Numerical eID (REQUIRED)

Where human citizen subjects adopt the use of a simple numerical eID, the multi-factor authentication process MUST include a time-sensitive credential (AKA OTP or one-time PIN).

## **5.2 Consent Management** <a href="#docs-internal-guid-da47132b-7fff-3138-7667-f87bd4540eb3" id="docs-internal-guid-da47132b-7fff-3138-7667-f87bd4540eb3"></a>

Depending on the jurisdiction, processing (such as, collecting or sharing) [PII](3-terminology/id-related-bb-common-terminology.md#pii-personally-identifiable-information) (Personally identifiable information) data may require User consent. The local laws may also require the User is informed on processing their PII.

The Identity Building Block may work with the Consent Building Block to implement a consent collection mechanism. In this case the consent collection must ensure an authentic approval of an individual using the Identity Building Block before processing their PII as it is essential that the individual is authenticated as a first step.

## **5.3 Trust Framework**

Trust Frameworks can be considered a mechanism to enable the trusted exchange of information between sovereign partners. The Trust Framework is a much-discussed concept and this will be a consideration of the ID related working group across all GovStack ID related BBs in a future release.
