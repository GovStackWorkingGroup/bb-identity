---
description: >-
  This section provides a reference for APIs that should be implemented by this
  Building Block.
---

# 8 Service APIs

The APIs defined here establish a blueprint for how the Building Block will interact with other Building Blocks. Additional APIs may be implemented by the Building Block, but the listed APIs define a minimal set of functionality that should be provided by any implementation of this Building Block.

In common for all services of the Identity Building Block, the API expects the calling Partner has been already authenticated and authorized to access the service. For detailed specifications of APIs with input/output formats please refer to API specifications defined in YAML in the corresponding GitHub repository.

The [GovStack non-functional requirements document](https://govstack.gitbook.io/specification/v/1.0/architecture-and-nonfunctional-requirements/6-onboarding) provides additional information on how 'adaptors' may be used to translate an existing API to the patterns described here. This section also provides guidance on how candidate products are tested and how GovStack validates a product's API against the API specifications defined here.

The tests for the Identity Building Block can be found in [this GitHub repository](https://github.com/GovStackWorkingGroup/bb-identity/tree/main/test/openAPI).

## API standards <a href="#heading-h.3o7alnk" id="heading-h.3o7alnk"></a>

* The microservice interfaces are defined as per [OPENAPI Ver3.0 standards](https://swagger.io/specification/).
* For implementation purposes, it is suggested to refer [TMF630\_REST\_API\_Design\_Guidelines](https://www.tmforum.org/resources/standard/tmf630-rest-api-design-guidelines-4-2-0/).

## **8.1 Identity Verification**

The Identity Verification APIs are a set of OpenAPI specifications exposed by the Identity Building Block to other building blocks and applications for user verification.

The Identity usage APIs are based on the following principles:

* Verification APIs are inspired by OpenID Connect protocol which simplifies integrations using pre-existing libraries
* Only secure options in OpenID connect should be supported to ensure the user data is handled securely
* All biometric capture for user verification should be done using [Secure Biometrics Interface standards](https://standards.ieee.org/ieee/3167/10925/)

### 8.1.1 Service Group: Client Management

{% openapi src="https://raw.githubusercontent.com/GovStackWorkingGroup/bb-identity/main/api/Identity-Provider.yaml" path="/client-mgmt/oidc-client" method="post" %}
[https://raw.githubusercontent.com/GovStackWorkingGroup/bb-identity/main/api/Identity-Provider.yaml](https://raw.githubusercontent.com/GovStackWorkingGroup/bb-identity/main/api/Identity-Provider.yaml)
{% endopenapi %}

{% openapi src="https://raw.githubusercontent.com/GovStackWorkingGroup/bb-identity/main/api/Identity-Provider.yaml" path="/client-mgmt/oidc-client/{client_id}" method="put" %}
[https://raw.githubusercontent.com/GovStackWorkingGroup/bb-identity/main/api/Identity-Provider.yaml](https://raw.githubusercontent.com/GovStackWorkingGroup/bb-identity/main/api/Identity-Provider.yaml)
{% endopenapi %}

{% openapi src="https://raw.githubusercontent.com/GovStackWorkingGroup/bb-identity/main/api/Identity-Provider.yaml" path="/authorize" method="get" %}
[https://raw.githubusercontent.com/GovStackWorkingGroup/bb-identity/main/api/Identity-Provider.yaml](https://raw.githubusercontent.com/GovStackWorkingGroup/bb-identity/main/api/Identity-Provider.yaml)
{% endopenapi %}

{% openapi src="https://raw.githubusercontent.com/GovStackWorkingGroup/bb-identity/main/api/Identity-Provider.yaml" path="/oauth/token" method="post" %}
[https://raw.githubusercontent.com/GovStackWorkingGroup/bb-identity/main/api/Identity-Provider.yaml](https://raw.githubusercontent.com/GovStackWorkingGroup/bb-identity/main/api/Identity-Provider.yaml)
{% endopenapi %}

{% openapi src="https://raw.githubusercontent.com/GovStackWorkingGroup/bb-identity/main/api/Identity-Provider.yaml" path="/oidc/userinfo" method="get" %}
[https://raw.githubusercontent.com/GovStackWorkingGroup/bb-identity/main/api/Identity-Provider.yaml](https://raw.githubusercontent.com/GovStackWorkingGroup/bb-identity/main/api/Identity-Provider.yaml)
{% endopenapi %}

{% openapi src="https://raw.githubusercontent.com/GovStackWorkingGroup/bb-identity/main/api/Identity-Provider.yaml" path="/.well-known/jwks.json" method="get" %}
[https://raw.githubusercontent.com/GovStackWorkingGroup/bb-identity/main/api/Identity-Provider.yaml](https://raw.githubusercontent.com/GovStackWorkingGroup/bb-identity/main/api/Identity-Provider.yaml)
{% endopenapi %}

{% openapi src="https://raw.githubusercontent.com/GovStackWorkingGroup/bb-identity/main/api/Identity-Provider.yaml" path="/.well-known/openid-configuration" method="get" %}
[https://raw.githubusercontent.com/GovStackWorkingGroup/bb-identity/main/api/Identity-Provider.yaml](https://raw.githubusercontent.com/GovStackWorkingGroup/bb-identity/main/api/Identity-Provider.yaml)
{% endopenapi %}

For Identity Building Block implementations that support mobile wallet integration, the following API spec should also be implemented.

{% openapi src="https://raw.githubusercontent.com/GovStackWorkingGroup/bb-identity/main/api/Identity-Provider.yaml" path="/linked-authorization/link-code" method="post" %}
[https://raw.githubusercontent.com/GovStackWorkingGroup/bb-identity/main/api/Identity-Provider.yaml](https://raw.githubusercontent.com/GovStackWorkingGroup/bb-identity/main/api/Identity-Provider.yaml)
{% endopenapi %}

{% openapi src="https://raw.githubusercontent.com/GovStackWorkingGroup/bb-identity/main/api/Identity-Provider.yaml" path="/linked-authorization/link-status" method="post" %}
[https://raw.githubusercontent.com/GovStackWorkingGroup/bb-identity/main/api/Identity-Provider.yaml](https://raw.githubusercontent.com/GovStackWorkingGroup/bb-identity/main/api/Identity-Provider.yaml)
{% endopenapi %}

{% openapi src="https://raw.githubusercontent.com/GovStackWorkingGroup/bb-identity/main/api/Identity-Provider.yaml" path="/linked-authorization/link-auth-code" method="post" %}
[https://raw.githubusercontent.com/GovStackWorkingGroup/bb-identity/main/api/Identity-Provider.yaml](https://raw.githubusercontent.com/GovStackWorkingGroup/bb-identity/main/api/Identity-Provider.yaml)
{% endopenapi %}

{% openapi src="https://raw.githubusercontent.com/GovStackWorkingGroup/bb-identity/main/api/Identity-Provider.yaml" path="/linked-authorization/link-transaction" method="post" %}
[https://raw.githubusercontent.com/GovStackWorkingGroup/bb-identity/main/api/Identity-Provider.yaml](https://raw.githubusercontent.com/GovStackWorkingGroup/bb-identity/main/api/Identity-Provider.yaml)
{% endopenapi %}

{% openapi src="https://raw.githubusercontent.com/GovStackWorkingGroup/bb-identity/main/api/Identity-Provider.yaml" path="/linked-authorization/authenticate" method="post" %}
[https://raw.githubusercontent.com/GovStackWorkingGroup/bb-identity/main/api/Identity-Provider.yaml](https://raw.githubusercontent.com/GovStackWorkingGroup/bb-identity/main/api/Identity-Provider.yaml)
{% endopenapi %}

{% openapi src="https://raw.githubusercontent.com/GovStackWorkingGroup/bb-identity/main/api/Identity-Provider.yaml" path="/linked-authorization/consent" method="post" %}
[https://raw.githubusercontent.com/GovStackWorkingGroup/bb-identity/main/api/Identity-Provider.yaml](https://raw.githubusercontent.com/GovStackWorkingGroup/bb-identity/main/api/Identity-Provider.yaml)
{% endopenapi %}

{% openapi src="https://raw.githubusercontent.com/GovStackWorkingGroup/bb-identity/main/api/Identity-Provider.yaml" path="/wallet-binding" method="post" %}
[https://raw.githubusercontent.com/GovStackWorkingGroup/bb-identity/main/api/Identity-Provider.yaml](https://raw.githubusercontent.com/GovStackWorkingGroup/bb-identity/main/api/Identity-Provider.yaml)
{% endopenapi %}

Detailed API schemas written in YAML that define REST API endpoints for each of the services mentioned above are available on GitHub located at the [Identity-Provider YAML](../api/Identity-Provider.yaml).

The [GovStack non-functional requirements document](https://govstack.gitbook.io/specification/v/1.0/architecture-and-nonfunctional-requirements/6-onboarding) provides additional information on how 'adaptors' may be used to translate an existing API to the patterns described here.

## **8.2 Enrollment**

The Enrollment APIs are a set of OpenAPI specifications exposed by the Identity Building Block ‘Enrollment Server’ service to any enrollment client.

The Enrollment APIs are based on the following principles:

* When enrollment is done in one step, the CreateEnrollment can contain all the data and an additional flag (finalize) to indicate all data was collected.
* During the process, the enrollment structure can be updated. Only the data that changed need to be transferred. Data not included is left unchanged on the server. In the following example, the biographic data is not changed.
* Images can be passed by value or reference.
* Existing standards are used whenever possible, for instance, the preferred image format for biometric data is **ISO-19794**. The underlying data should be of open mime types that offer good compression without loss of data (for example JPEG2000 for images).

{% openapi src=".gitbook/assets/enrollment (3).yaml" path="/enrollment" method="put" %}
[enrollment (3).yaml](<.gitbook/assets/enrollment (3).yaml>)
{% endopenapi %}

## **8.3 Credential Management**

These Credential Management APIs are a set of OpenAPI specifications exposed by the Identity Building Block to service identity credential requests by credential partners such as printing and QR code partners.

The Credential Management APIs are based on the following principles:

* The credential request API is asynchronous for the identity holder i.e., the call to share credentials is responded with an event ID. Then the identity holder later uses the event ID to retrieve the details using the API '/events/{eventId}'.
* The '/share-credential' API is used to convey the format of the credential information. The format allows the credential information to be masked/unmasked. The API also conveys the consent of the identity holder.
* The API '/download/personalized-card' is used to download the identity card in PDF format.
* Systems for Voter ID, Tax ID, Card printing etc. receive internal notifications from IDBB.
* Wallet applications will receive the identity credentials as per pre-authorized flow.
* The APIs '/block', '/unblock' and '/updateIdentity' can only be called by systems with administrative permissions given by the IDBB.

{% openapi src=".gitbook/assets/Credential-Management.yaml" path="/share-credential" method="post" %}
[Credential-Management.yaml](.gitbook/assets/Credential-Management.yaml)
{% endopenapi %}

{% openapi src=".gitbook/assets/Credential-Management.yaml" path="/events/{eventId}?language=LANGCODE" method="get" %}
[Credential-Management.yaml](.gitbook/assets/Credential-Management.yaml)
{% endopenapi %}

{% openapi src=".gitbook/assets/Credential-Management.yaml" path="/download/personalized-card" method="post" %}
[Credential-Management.yaml](.gitbook/assets/Credential-Management.yaml)
{% endopenapi %}

{% openapi src=".gitbook/assets/Credential-Management.yaml" path="/update-uin" method="post" %}
[Credential-Management.yaml](.gitbook/assets/Credential-Management.yaml)
{% endopenapi %}

{% openapi src=".gitbook/assets/Credential-Management.yaml" path="/service-history/{langCode}" method="get" %}
[Credential-Management.yaml](.gitbook/assets/Credential-Management.yaml)
{% endopenapi %}

{% openapi src=".gitbook/assets/Credential-Management.yaml" path="/updateIdentity" method="patch" %}
[Credential-Management.yaml](.gitbook/assets/Credential-Management.yaml)
{% endopenapi %}

{% openapi src=".gitbook/assets/Credential-Management.yaml" path="/unblock" method="post" %}
[Credential-Management.yaml](.gitbook/assets/Credential-Management.yaml)
{% endopenapi %}

{% openapi src=".gitbook/assets/Credential-Management.yaml" path="/block" method="post" %}
[Credential-Management.yaml](.gitbook/assets/Credential-Management.yaml)
{% endopenapi %}

## **8.4 Subscription Management**

The Subscription Management APIs follow the APIs from the [WebSub](https://www.w3.org/TR/websub/) standard and WebHooks common practice.

## **8.5 Administration Management**

This Services APIs is not yet specified, but it should be the purpose of a future iteration of the Identity Building Block Specification.
