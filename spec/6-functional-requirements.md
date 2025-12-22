---
description: This section lists the technical capabilities of this Building Block.
---

# 6 Functional Requirements

## Internal functional components

A common set of unique internal functional components are required to orchestrate the services of the Building Block as shown below. The REST API's interfaces route service requests to/from external Building Blocks and appropriate internal blocks in appropriate formats. A brief description of the generic functionality of each of these components has been given below from a minimum viable product perspective. Detailed design and feature lists of these blocks can be customized by developers to optimally match specific target implementation needs.

## 6.1 Enrollment

* Identity Building Block must offer an API to Enroll persons following a GovStack recommended Open Standard API. (REQUIRED)
* Identity Building Block must offer capacity to perform an enrollment in one step. (REQUIRED)
* Identity Building Block must offer capacity to perform an enrollment in multiple steps (i.e. demographic data collection, biometric data collections, supporting documents collections, etc.). (REQUIRED)
* Identity Building Block must offer capacity to search, retrieve and update and enrollment made (if it has not been committed yet). (REQUIRED)
* Identity Building Block must control integrity and origin of an enrollment request by implementing enrollment meta-data about the context and actors of the enrollment, such as signature of data to ensure integrity. (REQUIRED)
* To ensure the integrity of the enrollment process, the Identity Building Block must be able to implement technical controls so that only approved enrollment services can engage with the enrollment service. Cryptographic trust should be implemented.(REQUIRED)
* Identity Building Block must support receiving encrypted data to ensure privacy protection and prevent data theft. (REQUIRED)
* Identity Building Block must offer capacity to perform an enrollment offline which means not expecting interactions between registration client and server during the enrollment process, and data being uploaded as a whole packet. (REQUIRED)
* Identity Building Block must support porting existing demographic, biometric, and other enrollment data from external servers during the enrollment process. (REQUIRED)
* Identity Building Block must keep track of the enrollment request identifiers within its internal management in order to facilitate audit trail and troubleshooting. (REQUIRED)
* Identity Building Block must generate a UIN for every Identity created. This number must be kept secret within the Identity Building Block. (REQUIRED)
* Identity Building Block must offer APIs to update attributes of identities and to attach legal evidence of that identity change approval (often delivered by justice). (REQUIRED)

## 6.2 Identity Verification

* Identity Building Block must offer an API to verify Identities following a Gov Stack recommended Open Standard API. (REQUIRED)
* Identity Building Block must offer an API to Verify Identity of an individual based on one of its known identifiers. (REQUIRED)
* Identity Building Block must offer an API to verify one characteristic of an individual without having to disclose actually the recorded related attributes. The typical request response is Yes or No (sample use case: age verification, is a person older than 18 > Yes to No). (REQUIRED)
* Identity Building Block must offer Identity Verification services based on modalities listed in [other resources](10-other-resources/consideration-of-authentication-methods.md) following a GovStack recommended Open Standard API. (REQUIRED)



## 6.3. Query services

* Identity Building Block must offer an API to retrieve personal attributes of an individual from one of its identifiers. To be noted that this service will be subject to preliminary access granted by the system and, when applicable, by the individual (informed consent). Authorized access control should be part of the API as opposed to external configuration alone. This ensures that relying parties are verified by the API before sharing sensitive data. (REQUIRED)
* Identity Building Block must offer an API to identify an unknown individual, which means retrieve an identity identifier from a set of personal attributes sent. This service is normally to be used for security/law enforcement purposes and must be limited to registries of wanted people. For privacy and security reasons, this feature should only be considered where clear and accountable security/law enforcement rules are in place. (REQUIRED)
* To ensure the integrity of the queries, the Identity Building Block must be able to implement technical controls so that only approved partners can engage with the query service. Cryptographic trust should be implemented.(REQUIRED)
* Identity Building Block must support encrypted data exchange to ensure privacy protection and prevent data theft. (REQUIRED)
* Identity Building Block must keep track of the queries served within its internal management in order to facilitate audit trail and troubleshooting. (REQUIRED)

## 6.4 Credential management

* Identity Building Block must offer an API to request issuance, get status and manage Identity Credentials, following a GovStack recommended Open Standard API. (REQUIRED)
* Identity Building Block must offer an API to manage the full life cycle of credentials related to an identity in an issuing system. The related credential must keep a strong and verifiable link with the individual identity and with the issuer. (REQUIRED)
* Identity Building Block API must manage Digital Credentials. (REQUIRED)
* Identity Building Block API must manage Physical Credentials. (REQUIRED)
* Identity Building Block must offer an API allowing to request an identity credential issuance to a third-party credential management system. The information sent will have to be verifiable towards their issuer for auditability purposes, so they will have to be packed into Verifiable Credential format.
* Identity Building Block must offer APIs to either push data for credential issuance in an issuance request or to be requested by the issuing system. (REQUIRED)
* Identity Building Block must offer an API allowing to issue a similar credential to the one already issued before based on the credential ID number. (REQUIRED)
* Identity Building Block must offer an API allowing to revoke an issued ID credential. This will be used, for example, when a document is damaged, stolen or definitely lost. (REQUIRED)
* Identity Building Block must offer an API allowing to temporarily suspend and then un-suspend an issued ID credential. This will be used to disable an ID credential which has been lost, its holder suspending the time to search for it. After retrieval, the document should be unsuspended and usable again. If not retrieved after some time, the document should be revoked. (REQUIRED)
* Identity Building Block must offer an API allowing to check the suspension status of a document. (REQUIRED)
* Identity Building Block must offer an API to request the status of ID credentials. Status being related to their production, their delivery or their activation status. (REQUIRED)
* Identity Building Block must offer an API to search for ID credentials using some of its attributes. The output must be restricted to being a document number which can facilitate an access request only. No information can be shared directly. (REQUIRED)
* Identity Building Block must offer an API to retrieve a new copy of an ID credential already issued in case the current document has expired. The copy may be received electronically if it is digital or delivered physically in case of a physical ID document. (REQUIRED)
* Identity Building Block must offer an API to download a newly generated digital ID credential. (REQUIRED)
* Identity Building Block must offer an API to share with a 3rd party a Digital ID Credential. (REQUIRED)

## 6.5. Upstream federation services

* Identity Building Block must offer an API that trusted and authorized Partners can call to enable Users to link their external identities to their foundational identity. Those identities can be, for instance, functional identities, commercial identities or foreign identities. Local policies may apply what external identities are accepted. (REQUIRED)
* Identity Building Block must offer an API that truted and authorized Partners can call to enable  Users to review and unlink the linked external identities. (REQUIRED)
* Trust and identity assurance considerations must be taken into account in the identity linking. For instance, linking a high-assurance foundational identity to a low-assurance external identity may erode the overall security of the foundational identity and must be prevented or at least flagged for those who rely on the foundational identity. (REQUIRED)

## 6.6 Notifications Management

* Identity Building Block must offer an API for Subscribers to register for identity change events.(REQUIRED)
* Identity Building Block must offer an API for Subscribers to register to Creation, Update and Disabling (person dead or considered as disappeared) events. (REQUIRED)
* Identity Building Block must offer an API for Subscribers to collect event details after being notified of them. (REQUIRED)

## 6.7. Service for users to manage their identity

* Identity Building Block must be capable of generating a Virtual Identifier for referring to a User. The Virtual Identifier will be linked to the User's Unique Identifier. (REQUIRED)
* Identity Building Block must offer an API to revoke a Virtual Identifier. In that case, the Alias won't be usable anymore for any Identity Building Block services. (REQUIRED)
* Identity Building Block must be capable of attaching an Alias Identifier to the Unique Identifier for referring to a User. The Alias will be an existing form of trusted identification of the User in another system. It could be for example an existing identity document number, an email address, a phone, etc. (REQUIRED)
* Identity Building Block must offer an API to revoke the link to an Alias. In that case, the Alias won't be usable anymore for any Identity Building Block services. (REQUIRED)

## 6.8 **Administration** Management

* Identity Building Block must prevent any unauthorized system or user to get access to data. (REQUIRED)
* Identity Building Block must offer identity verification services only to a registered system or users. (REQUIRED)
* Identity Building Block must offer the capacity to grant access to specific verification services for specific or all individuals that are data subjects and hence owners of that data. (REQUIRED)
* Identity Building Block must respect principles of data security by design in order to maximize protection against hackers: data encryption, data isolation, data separation, data anonymization, data minimization. (REQUIRED)
* Identity Building Block must implement security best practices in order to ensure the Identities it manages can be trusted. (REQUIRED)
* Identity Building Block must implement a history of change for any identity. This must be retrievable and auditable by authorized users to investigate suspicious cases. (REQUIRED)
* Identity Building Block must offer identity verification services only with preliminary informed consent (when appropriate) on personal data usage of the concerned individual. (REQUIRED)
* Identity Building Block must not disclose any personal unnecessary information as part of its services API, and when possible prefer Yes/No answer rather than sharing attributes. All Sensitive Personal Information/Personally Identifiable Information must not be written to logs/reporting databases. (REQUIRED)
