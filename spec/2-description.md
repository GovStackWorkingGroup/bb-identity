---
description: This section provides context for this Building Block.
---

# 2 Description

The purpose of this document is to be the reference specification of the Identity Building Block, describing its internal architecture, its external interfaces, and how it is expected to interact with other Building Blocks.

This Building Block covers the foundational identity of a natural person. In this Building Block, foundational identity means the identity credentials that serve as proof of identity for a wide variety of public and private sector transactions and services and are managed by a foundational identity system. In contrast, functional identity serves as the proof of identity and authorization just for particular purposes or sectors.

The Identity Building Block creates, manages, and uses a digital foundational identity (functional identity is not in the scope of this document). As a part of the overall identity system, it can be interfaced with other Building Blocks in order to realize the complete set of requirements necessary for the delivering identification services and managing lifecycle of Foundational Identities.

The Identity Building Block is composed of a set of interoperable sub-components/modules dedicated to the management of the foundational identity offering different services for ensuring a trusted foundational identity for enabling related use cases.

This Building Block takes note of recognized approaches across the globe which in detail and deployment can vary greatly. These approaches will consider central, federated, and distributed (decentralized) modelshe Identity Building block will remain approach agnostic and flexible for being capable to adapt to the different policies and existing countries that can exist in adopting countries. This version of the document is focused on a centralized approach already taking into account integration with Functional Identity, therefore covering the federated approach.&#x20;

## 2.1 Centralized, Federated, Distributed Identities

Identity systems can follow different approaches between centralized, federated or distributed identities.

* With the **Centralized Identity** approach, the identity is managed in a unique central place and offered as a service to the systems around. Foundational Identity follows a Centralized approach.
* With the **Federated Identity** approach, the identities are multiple and managed in different systems which are all trusted to ensure identity verification services. Federated systems may be functional systems which could include different characteristics of persons. This approach helps to leverage existing identity assets. In a federated identity approach the ID BB could:
  * act as an Identity Provider and expose authentication services via federation (see Open ID Connect Standards).
  * offer services for identity proofing to external Identity Providers via the Identity Verification services standardized interfaces.
* With the **Distributed Identity** approach (also named decentralized or self-sovereign identity), the identity is owned and managed by the end person in a form of credentials (physical or digital) for which the owner is in full or as-needed control of its usage. This model if compared to centralized and federated presents lots of benefits in terms of privacy protection. See  also Wallet Building Block.

In each of these approaches trust in the identity enrollment and verification flows needs to be established. The centralized and federated approaches have organizations that provide trust through their ID proofing process but trust in the organizations themselves needs to be evaluated. Federated is an early form of decentralization and establishes a web of trust. If the same is extended to include relying parties and other service providers who participate in identity proofing, a distributed model is being created.

Overall, we advocate that regardless which approach is chosen, the data should always belong to the individual, but the level of control offered to them might vary based on features offered as well as the underlying needs. For example a population registry cannot "forget" a person and might not allow for that.

There is no one-fits-all solution and often a combination of those approaches enables most benefits.

## 2.2 Identity Building Block Overview

The diagram below shows the high level view of the Identity Building Block.

<figure><img src=".gitbook/assets/Screenshot 2025-12-12 at 16.27.09.png" alt=""><figcaption></figcaption></figure>

The Identity Building Block offers a set of external services to the other building blocks

* **Enrollment Services** allow to on-board new identities and update existing identities for individuals, which means collecting their personal identity data, evidence of them and biometrics.
* **Identity Verification Services** allow a service provider to verify the identity (i.e. authenticate User) and some of their attributes, for example checking a person's declared identity or verifying their age.
* **Query Services** enable trusted and separately authorized partners to make queries on identity data in the Identity Building Block.&#x20;
* **Credential Management Services** permit to issue and manage the life cycle of Identity credentials. Those services will allow to issue identity documents, to manage their renewal, and declare them as stolen.
* **Upstream federation services** are there to map to and harmonize multiple identities, which creating a link in between various digital identities (including functional identities) that an individual may have in other public or private services, including those abroad.
* **Notification Services** will allow a third party to subscribe to events occurring on identity and to receive notifications, useful to inform external functional building blocks when a person was born or has passed so that the external system can take required actions.

_Note: these services are detailed in Section 4 (Key Digital Functionalities)_

The Identity Building Block also includes internal sub-building blocks/ modules, notably:

* **Identity Registry** is a system storing and managing the identities. It contains and manages all the data that might need to be collected (according to local laws and regulations) including demographic (ie name), biographics (ie age), portrait, known identifiers, known documents and can offer consultation or management services on them. As the system must be auditable, it must keep track of identity changes and keep evidence leading to those changes. Privacy and Data protection rules force us to carefully manage storage and access to data, by respecting specific data protection design rules (minimization, isolation, anonymization, ..). Generally speaking, countries apply privacy and data protection laws similar to European GDPR which impose to minimize data stored including in time and, if appropriate, performs informed consent of the individuals of their end usages. The registry should, if appropriate, allow for portability of data from one solution to another. For this the registry should support open data formats as well as standards based data formats. This applies to biometric and biographic data. The module should also offer APIs for such data portability.
* **Identifier Management** module, managing identifiers assigned to identities. In case a Unique Identity Number (UIN) is used and is acting as ‘primary key’ of identity, a UIN Generator will follow predefined business rules for generating a UIN and will make sure that a new generated number has never been already issued. It is recommended that such number does not contain any embedded personally identifiable information (such as, date of birth or gender) that may change or erode privacy. The UIN should also be non-revocable. There may also be a set of tokens or aliases identifiers to use the identity and, where required, to link to data in functional systems.
* **Biometric Services** which offer capacities to compare biometrics in between identities. Key use cases being 1:N search which consist in confirming unicity of a person by comparing its biometrics to all ones stored in the system, 1:1 search to confirm an identity by comparing biometrics data one to one. Those services may be asynchronous when an adjudication system is in place, an adjudication system being a human based decision workflow allowing operators to take decision on uniqueness or identities match based on candidates identified automatically by the biometric search system. Centralized databases of biometric scan introduce significant privacy risks, see, for example, [https://www.theguardian.com/global-development/2021/sep/07/the-taliban-are-showing-us-the-dangers-of-personal-data-falling-into-the-wrong-hands](https://www.theguardian.com/global-development/2021/sep/07/the-taliban-are-showing-us-the-dangers-of-personal-data-falling-into-the-wrong-hands). Biometric services also provide standard interfaces for managing biometric data for operations on biometric data such as conversion, compression, templatization, matching, segmentation and more.
* **Orchestrator** (optional but strongly recommended) is often embedded in the Identity system in order to run the control steps and actions required to build an identity. It’s recommended to use an internal workflow for that, which may lead to triggering an external workflow if, for example, required to launch additional actions after identity creation.
* **Identity Provider** can be part of Identity Building Block and provide reference identities for identity verification, it can be also optional when in a decentralized (or distributed) identity model.



## 2.3 Identity System Components

The graphic below presents the overall view of the Identity System with its main components.

<figure><img src=".gitbook/assets/Screenshot 2025-12-12 at 16.47.25.png" alt=""><figcaption></figcaption></figure>

### 2.3.1 Specificity of the Identity System

Identity system must be understood as different from a classical application registration system, as it establishes a person’s foundational ID which is likely to act as a basis for their digital twin (digital twin is the equivalent of a physical real person in the digital realm) for all digital interactions and therefore will be of high importance for him/her as well as being highly attractive for hackers, demanding the highest level of security.

It might require secured biometrics and document capture capacities in order to limit the chance of fraud, although the use of biometrics is not recommended given the potential privacy implications. It can be compared at the entrance door of a secured site where security is particularly reinforced and the process takes necessary time to check all information, if compared to internal access control which can be lighter and based on short interactions. The Identity system can be a single client Application, or web based application or even a client server application, it could be also online or offline.

If an identity client is confirmed to be an external building block it will most probably be more related to the Registration Building block. It must have its own APIs and own rules, tools and capture technologies compatible with the Identity Building Block's OpenAPIs.

The client has to deal with secure interfacing; where biometrics is being used with biometrics capture devices, and performing some operations on the biometrics such as quality checks, liveness checks etc. These interfaces will be part of the biometric services. The data capture formats for biometrics will also have to be based on open standards to ensure compatibility and portability.

## 2.4 Integration with an Existing Identity System

It happens that some countries have an existing identity system they choose to reuse, like for example a National Population Register, a Civil Register or ID Document system. In that case the existing system will need to be equipped with the ID BB Services Facade which will make its integration transparent toward the remainder of the GovStack.

<figure><img src=".gitbook/assets/Screenshot 2025-12-12 at 17.07.16.png" alt=""><figcaption></figcaption></figure>

