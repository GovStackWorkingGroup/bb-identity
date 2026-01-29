# Release Notes

## **Version 2**

***

### **v2.0**

_Release date: December 2025_

#### 1. Overview

This release of the Wallet Building Block was developed between September and December, 2025 by the **Cross-Functional ID Infrastructure Working Group**, a super-group of all the key Identity and Trust-related Building Blocks in GovStack (e-signature, identity, Wallet, Consent).

Release 2.0 of Identity is the result of a review of all 4 specifications to ensure their are aligned and consistent to a single Identity Universe. As a result, a shared ID Terminology reference document was created and some terms from this Building Blocked were moved there. It also incorporates previously un-released work on implementing Credential Management APIs.&#x20;

The biggest change in this release comes from the re-structuring of Key Digital Functionalities and its respective Functional Requirements on section 6. This version addresses that and adds requirements for Upstream Federation. More detail can be found on the change log. Details on this decision were captured on the Working Group Decision Record [ID-WGDR-2026-01](../../WGDR/ID-WGDR-1.md).

#### **2. Change log**

**Section 1 Version History**

* Alignment of Version Numbers to semantic versioning
* Inclusion of Release Notes

**Section 2 Description**

* Updates for Consistency use of IDVBB to IDBB
* Links to Wallet BB added as now published
* Removal of future capability from Federated and Distributed Identities as in current spec
* Updated Diagrams
* Clarity on 6 external services (Enrollment Services, Identity Verification Services, Query Services, Credential Management Services, Upstream Federation Services, Notification Services)
* Merge of UIN Generation into main text

**Section 3 Terminology**

* Creation of sub page for common terminology
* Removal of terms in common terminology from main terminology
* Incorporation of definitions for each ID related BB into common terminology
* Removal of terms no longer used in text
* Update of definitions to be headline text and supporting information to streamline readability
* Move from Table to GovSpecs 2.0 Heading format for AI readability

**Section 4 Key Digital Functionalities**

The major change this version introduces is the re-structuring of how Key Digital Functionalities. The following is a comparison table between the functionalities of the two versions:

| Version 1 (1.0 through 23Q4.1)                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Version 2.0                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <p><strong>4.1 Core services</strong></p><ul><li>4.1.1 Identity Usage</li><li>4.1.2 Enrollment services</li><li>4.1.3 Credential Management Services</li><li>4.1.4 Identity and Verification Services</li><li>4.1.5 Notifications Services</li><li>4.1.6 Federations Services</li></ul><p><strong>4.2 Identity Management</strong></p><p><strong>4.3 Credential Management</strong></p><p><strong>4.4 Subscription Management</strong></p><p><strong>4.5 Administration Management</strong></p> | <p><strong>4.1 Core Services</strong></p><ul><li>4.1.1 Enrollment services</li><li>4.1.2 Identity verification</li><li>4.1.3 Query Services</li><li>4.1.4 Credential Management Services</li><li>4.1.5 Upstream Federation Services</li><li>4.1.6 Notifications Services</li></ul><p><strong>4.2 Other services</strong></p><ul><li>4.2.1 Service for users to manage their identity</li><li>4.2.2 Administration Management</li><li>4.2.3 Policy Management</li></ul> |

Other changes are:

* Alignment of services to a common order mapped to section 2
* Restructure into Core Services and Other Services
* Grammatical, reference and typo changes

**Section 5 Cross Cutting Requirements**

* Grammatical, reference and typo changes
* Consent Section re-written to refer to Consent BB
* Trust Framework section updated to reflect thoughts from WG
* Consistency in Requirements of GovSpec 2.0 (Required and Recommended) naming

**Section 6 Functional Requirements**

* New requirements for new 6.3. Query services and 6.5 Upstream Federation Services were added
* A requirement about the integrity of enrollment is now disaggregated between adding meta-data and cryptographic signatures.
* A thorough break-down of how the requirements were re-organized can be found on Appendix 2 of [ID-WGDR-2026-1](../../WGDR/ID-WGDR-1.md#appendix-1-comparison-between-versions-of-chapter-4-key-digital-functionalities)
* Grammatical, reference and typo changes
* Alignment to Service order in other sections
* Move of Modalities out to Section 10
* Consistency in Requirements of GovSpec 2.0 (Required and Recommended) naming

**Section 7 Data Structures**

* Grammatical, reference and typo changes

**Section 8 Service APIs**

* Addition of Credential Management APIs
* Grammatical, reference and typo changes
* Consistency with naming of external services

**Section 9 Internal Workflows**

* Grammatical, reference and typo changes

**Section 10 Other Resources**

* Addition of sub page "Consideration of Authentication Methods" this includes content previously in section 4 on Modalities



**Section 8 Service APIs**

* Inclusion of Service Management APIs

***

## **Version 1**

***

### **v1.1.1 (23Q4.1)**

_Released May 2023_

Clarity updates

***

### **v1.1.0 (23Q4)**

**Section 2 Description**

* **2.1**: "Centralized, Federated, Distributed Identities" - detailed explanation of different identity approaches
* **2.2**: "Identity Building Block Overview" - comprehensive overview with diagrams of services
* **2.3**: "Identity System Components" - detailed component descriptions
* **2.4**: "Integration with an Existing Identity System"

**Section 3 Terminology**

Additional Terminology:

* Digital Identity
* Electronic Identity
* Foundational vs Functional Identity Systems

**Section 4 Key Digital Functionalities**

Restructured with&#x20;

Section 4.2 "Core Services" containing 6 subsections (4.2.1-4.2.6) including a new "Federations Services" section, plus sections 4.2-4.5 for other functionalities

**Section 5 Cross Cutting Requirements**

* Section 5.2 "Consent Management" with 8 detailed requirements,&#x20;
* Section 5.3 "Trust Framework"
* Section 5.4 "Standards"

**Section 6 Functional Requirements**

* Includes more detailed requirements for enrollment, specifically mentioning "pre-enrollment and enrollment" as separate steps
* Adds note about "demographic data collection, biometric data collections, supporting documents collections, etc."

**Section 8 Service APIs**

* Includes **wallet binding API** as a draft specification

**Section 9 Internal Workflows**

* Detailed uplift and addition of workflows

***

### **v1.0.1**

_Released February 2024_

**Section 8 Service APIs**

* Addition of Enrolment API

***

### **v1.0.0**

_Released May 2023_

Initial Approved Specification





