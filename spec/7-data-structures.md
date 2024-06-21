---
description: >-
  This section provides information on the core data structures/data models that
  are used by this Building Block.
---

# 7 Data Structures

## 7.1 Resource Model

![](.gitbook/assets/spaces\_8B7scSfa9NpeR1BmaFM2\_uploads\_git-blob-d1540ab89d23e8fffeb8c1b6c2ab86116dde9d76\_image4.png)

Identity and Verification Building Block requires data objects, below are the main ones involved listed:

* **Identities** of individuals identified by unique identifiers.
* **Identifiers**:
  * Token numbers are associated uniquely with a set of data, and identifiers are used to refer to those data without having to actually copy them.
  * They can be stored then in separate repositories with specific restricted access.
  * Identifiers can be used to uniquely identify Foundational IDs or Functional IDs.
  * Token identifiers can be used to avoid data aggregation and ensure capacity to forget an identity.
  * As identity data should be stored in different storage to ensure privacy protection allowing then data separation and data minimization principles, it’s necessary to use different identifiers for different types of data.
* **Credentials**:
  * Issued for individuals or presented by them, ID Credentials related to an individual should be traced and accessible in the system in order to have the capacity to identify fraud and do an investigation on them, so as to perform auditing.
* **Registration requests**
  * Requests will be received by the Identity and Verification Building Block, for example, identity enrollment requests or identity data update registration requests, those requests will be then managed by the different subsystems and the workflows of the Identity and Verification Building Block.
* **Identification Services**
  * A set of services will be offered on top of identities to identify a person, check some of his/her attributes (i.e. age), or obtain some certified personal information when needed and authorized.
* **Third parties service user entities**
  * External entities which could be GovStack Building Blocks or not, will have access to and use the services, for that purpose, their access will be granted, consent may be given by the individuals and their activities will be logged.

## 7.2 Data Structures <a href="#worklist-data-structure" id="worklist-data-structure"></a>

Identity verification involves the below data structures.

### 7.2.1 End-User Claim

**Description:** End-user claim is the user information that can be shared with the relying party once the end-user authentication is completed in the Identity Building Block. Below is a set of standard claims that will be supported by the Identity Building Block implementation

**Fields:**

<table data-header-hidden><thead><tr><th width="122"></th><th width="96"></th><th width="259"></th><th></th><th data-hidden></th><th data-hidden></th><th data-hidden></th></tr></thead><tbody><tr><td><strong>Name</strong></td><td><strong>Type</strong></td><td><strong>Description</strong></td><td><strong>Notes</strong></td><td><strong>Foreign Key</strong></td><td><strong>Constraints</strong></td><td><strong>Required</strong></td></tr><tr><td>sub</td><td>string</td><td>Subject identifier </td><td>Contains the value of the PSUT</td><td> </td><td>PK</td><td>Y</td></tr><tr><td>name</td><td>string</td><td>Full name for this end user</td><td></td><td> </td><td>Uniq</td><td>Y</td></tr><tr><td>address</td><td>string</td><td>Address of the end user</td><td></td><td> </td><td> </td><td>Y</td></tr><tr><td>gender</td><td>string</td><td>End user gender</td><td></td><td> </td><td> </td><td>Y</td></tr><tr><td>birthdate</td><td>date</td><td>End user birthdate</td><td></td><td> </td><td> </td><td>Y</td></tr><tr><td>picture</td><td>URL</td><td>URL to location where end user's picture is stored</td><td></td><td>Alert</td><td>FK</td><td>N</td></tr><tr><td>email</td><td>string</td><td>Email address for end user</td><td></td><td></td><td></td><td></td></tr><tr><td>phone</td><td>string</td><td>Primary phone for end user</td><td></td><td></td><td></td><td></td></tr><tr><td>locale</td><td>string</td><td>End user's locale</td><td></td><td></td><td></td><td></td></tr></tbody></table>

* **sub** - Subject identifier with the value of PSUT (Partner Specific User Token). This value should be unique for the end user and relying party combination. The same user should have a different subject identifier in different relying party systems to preserve privacy. It must not exceed 255 ASCII characters in length. The sub-value is a case-sensitive string.
* **name** - End-User's full name in displayable form including all name parts, possibly including titles and suffixes, ordered according to the End-User's locale and preferences.
* **given\_name** - Given name(s) or first name(s) of the End-User. Note that in some cultures, people can have multiple given names; all can be present, with the names being separated by space characters.
* **family\_name** - Surname(s) or last name(s) of the End-User. Note that in some cultures, people can have multiple family names or no family name; all can be present, with the names being separated by space characters.
* **middle\_name** - Middle name(s) of the End-User. Note that in some cultures, people can have multiple middle names; all can be present, with the names being separated by space characters. Also note that in some cultures, middle names are not used.
* **nickname** - Casual name of the End-User that may or may not be the same as the given\_name.
* **preferred\_username** - Shorthand name by which the End-User wishes to be referred to at the RP. This value may be any valid JSON string including special characters such as @, /, or whitespace. The RP must not rely upon this value being unique.
* **address** - End-User's postal address. The value of the address member is a JSON structure containing some or all of the members from the below list.
  * **formatted** - Full mailing address, formatted for display or use on a mailing label. This field may contain multiple lines, separated by newlines. Newlines can be represented either as a carriage return/line feed pair ("\r\n") or as a single line feed character ("\n").
  * **street\_address** - Full street address component, which MAY include house number, street name, Post Office Box, and multi-line extended street address information. This field may contain multiple lines, separated by newlines. Newlines can be represented either as a carriage return/line feed pair ("\r\n") or as a single line feed character ("\n").
  * **locality** - City or locality component.
  * **region** - State, province, prefecture, or region component.
  * **postal\_code** - Zip code or postal code component.
  * **country** - Country name component.
* **gender** - End-User's gender. Values defined by this specification are female and male. Other values may be used when neither of the defined values is applicable.
* **birthdate** - End-User's birthday, represented as an [ISO 8601:2004](https://openid.net/specs/openid-connect-core-1\_0.html#ISO8601-2004) \[ISO8601‑2004] YYYY-MM-DD format. The year MAY be 0000, indicating that it is omitted. To represent only the year, YYYY format is allowed.
* **picture** - URL of the End-user's profile picture. This URL must refer to an image file (for example, a PNG, JPEG, or GIF image file), rather than to a Web page containing an image.
* **email** - End-User's preferred e-mail address. Its value must conform to the [RFC 5322](https://www.rfc-editor.org/rfc/rfc5322) \[RFC5322] addr-spec syntax.
* **email\_verified** - True if the End-user's e-mail address has been verified; otherwise false.
* **phone\_number** - End-User's preferred telephone number. [E.164](https://www.itu.int/rec/T-REC-E.164-201011-I/en) \[E.164] is RECOMMENDED as the format of this Claim, for example, +1 (425) 555-1212 or +56 (2) 687 2400.
* **phone\_number\_verified** - True if the End-user's phone number has been verified; otherwise false.
* **locale** - End-User's locale, represented as a [BCP47](https://www.rfc-editor.org/rfc/rfc5646) \[RFC5646] language tag. This is typically an ISO 639-1 Alpha-2 \[ISO639‑1] language code in lowercase and an [ISO 3166-1 Alpha-2](https://www.w3.org/WAI/ER/IG/ert/iso639.htm) \[ISO3166‑1] country code in uppercase, separated by a dash. For example, en-US or fr-CA.
* **zoneinfo** - String from zoneinfo time zone database representing the End-User's time zone. For example, Europe/Paris or America/Los\_Angeles.

#### 7.2.2 Scope

**Description:** Scopes can be used to request that specific sets of information be made available as claim values. The following scope values will be supported by Identity Building Block implementation for requesting specific details of end-user.

**Fields:**

<table data-header-hidden><thead><tr><th width="122"></th><th width="96"></th><th width="259"></th><th></th><th data-hidden></th><th data-hidden></th><th data-hidden></th></tr></thead><tbody><tr><td><strong>Name</strong></td><td><strong>Type</strong></td><td><strong>Description</strong></td><td><strong>Notes</strong></td><td><strong>Foreign Key</strong></td><td><strong>Constraints</strong></td><td><strong>Required</strong></td></tr><tr><td>profile</td><td>string</td><td>Requests access to the End-User's default profile claims</td><td></td><td> </td><td>PK</td><td>Y</td></tr><tr><td>email</td><td>string</td><td>Requests access to the email and email_verified claim</td><td></td><td> </td><td>Uniq</td><td>Y</td></tr><tr><td>address</td><td>string</td><td>Requests access to the address claim</td><td></td><td> </td><td> </td><td>Y</td></tr><tr><td>phone</td><td>string</td><td>Requests access to the phone_number and phone_number_verified claim</td><td></td><td> </td><td> </td><td>Y</td></tr></tbody></table>

The following claims are used within the ID Token

* **profile** -This scope value requests access to the End-User's default profile claims, which are: name, family\_name, given\_name, middle\_name, nickname, preferred\_username, picture, gender, birthdate, zoneinfo and locale.
* **email** - This scope value requests access to the email and email\_verified claim.
* **address** - This scope value requests access to the address claim.
* **phone** - This scope value requests access to the phone\_number and phone\_number\_verified claim.

#### 7.2.3 ID Token

**Description:** The ID Token is a security token that contains the end user's basic identifier information and a few other claims about the authentication event. The ID Token is represented as a [JSON Web Token (JWT) \[JWT\]](https://datatracker.ietf.org/doc/html/rfc7519).

**Fields:**

<table data-header-hidden><thead><tr><th width="122"></th><th width="96"></th><th width="259"></th><th></th><th data-hidden></th><th data-hidden></th><th data-hidden></th></tr></thead><tbody><tr><td><strong>Name</strong></td><td><strong>Type</strong></td><td><strong>Description</strong></td><td><strong>Notes</strong></td><td><strong>Foreign Key</strong></td><td><strong>Constraints</strong></td><td><strong>Required</strong></td></tr><tr><td>iss</td><td>URL</td><td>Issuer identifier for the Identity Building Block implementation</td><td></td><td> </td><td>PK</td><td>Y</td></tr><tr><td>sub</td><td>string</td><td>Subject identifier with the value of PSUT (Partner Specific User Token)</td><td>Should be unique for the end user</td><td> </td><td>Uniq</td><td>Y</td></tr><tr><td>aud</td><td>string</td><td>Audience that this ID Token is intended for</td><td>Must contain the OIDC client_id </td><td> </td><td> </td><td>Y</td></tr><tr><td>exp</td><td>number</td><td>Expiration time on or after which the Access Token must not be accepted for processing</td><td></td><td> </td><td> </td><td>Y</td></tr><tr><td>iat</td><td>number </td><td>Time at which the JWT was issued</td><td></td><td> </td><td> </td><td>Y</td></tr><tr><td>auth_time</td><td>number</td><td>Time when the End-User authentication occurred</td><td></td><td>Alert</td><td>FK</td><td>N</td></tr><tr><td>nonce</td><td>string</td><td>Used to associate a Client session with an ID Token, and to mitigate replay attacks</td><td></td><td></td><td></td><td></td></tr><tr><td>acr</td><td>string</td><td>Specifying an Authentication Context Class Reference value that identifies which was satisfied</td><td></td><td></td><td></td><td></td></tr><tr><td>at_hash</td><td>string</td><td>Access Token hash value.</td><td></td><td></td><td></td><td></td></tr></tbody></table>

* **iss** - Issuer identifier for the Identity Building Block implementation. The iss value is a case-sensitive URL using the https scheme that contains scheme, host, and optionally, port number and path components and no query or fragment components.
* **sub** - Subject identifier with the value of PSUT (Partner Specific User Token). This value should be unique for the end user and relying party combination. Same user should have a different subject identifier in different relying party systems to preserve privacy. It must not exceed 255 ASCII characters in length. The sub-value is a case-sensitive string.
* **aud** - Audience that this ID Token is intended for. It must contain the OIDC client\_id of the Relying Party as an audience value.
* **exp** - Expiration time on or after which the ID Token must not be accepted for processing. The processing of this parameter requires that the current date/time must be before the expiration date/time listed in the value. Its value is a JSON number representing the number of seconds from 1970-01-01T0:0:0Z as measured in UTC until the date/time.
* **iat** - Time at which the JWT was issued. Its value is a JSON number representing the number of seconds from 1970-01-01T0:0:0Z as measured in UTC until the date/time.
* **auth\_time** - Time when the End-User authentication occurred. Its value is a JSON number representing the number of seconds from 1970-01-01T0:0:0Z as measured in UTC until the date/time.
* **nonce** - String value used to associate a Client session with an ID Token, and to mitigate replay attacks. The value is passed through unmodified from the Authentication Request to the ID Token. If present in the ID Token, Clients MUST verify that the nonce Claim Value is equal to the value of the nonce parameter sent in the Authentication Request.
* **acr** - Authentication Context Class Reference. String specifying an Authentication Context Class Reference value that identifies the Authentication Context Class that the authentication performed satisfied. Below is the list of supported ACRs based on the authentication factors implemented by the Identity Building Block implementation.

| ACR Value                          | Authentication Factors                |
| ---------------------------------- | ------------------------------------- |
| idbb:acr:static-code               | PIN \|\| Password                     |
| idbb:acr:generated-code            | OTP \|\| TOTP                         |
| idbb:acr:linked-wallet             | WLA (Wallet Local Authentication)     |
| idbb:acr:biometrics                | BIO (Biometrics from a L1 SBI device) |
| idbb:acr:biometrics-generated-code | BIO && ( OTP \|\| TOTP )              |
| idbb:acr:linked-wallet-static-code | WLA && ( PIN \|\| Password )          |

&& - This is a multi-factor authentication where both auth factors need to be authenticated.

|| - This is a condition where there is more than one auth factor which shares the same ACR level.

* **at\_hash** - Access Token hash value. Its value is the base64url encoding of the left-most half of the hash of the octets of the ASCII representation of the access\_token value, where the hash algorithm used is the hash algorithm used in the alg Header Parameter of the ID Token's JOSE Header. For instance, if the alg is RS256, hash the access\_token value with SHA-256, then take the left-most 128 bits and base64url encode them. The at\_hash value is a case-sensitive string.

#### 7.2.4 Access Token

**Description:** Access token represents the authorization of a specific application to access specific parts of a user’s data. The Access Token is represented as a [JSON Web Token (JWT)](https://datatracker.ietf.org/doc/html/rfc7519) \[JWT].

**Fields:**

<table data-header-hidden><thead><tr><th width="122"></th><th width="96"></th><th width="259"></th><th></th><th data-hidden></th><th data-hidden></th><th data-hidden></th></tr></thead><tbody><tr><td><strong>Name</strong></td><td><strong>Type</strong></td><td><strong>Description</strong></td><td><strong>Notes</strong></td><td><strong>Foreign Key</strong></td><td><strong>Constraints</strong></td><td><strong>Required</strong></td></tr><tr><td>iss</td><td>URL</td><td>Issuer identifier for the Identity Building Block implementation</td><td></td><td> </td><td>PK</td><td>Y</td></tr><tr><td>exp</td><td>number</td><td>Expiration time on or after which the Access Token must not be accepted for processing</td><td>Current date/time must be before the expiration date/time listed</td><td> </td><td>Uniq</td><td>Y</td></tr><tr><td>aud</td><td>string</td><td>Audience that this Access Token is intended for</td><td></td><td> </td><td> </td><td>Y</td></tr><tr><td>sub</td><td>string</td><td>Subject identifier</td><td>Contains the value of PSUT</td><td> </td><td> </td><td>Y</td></tr><tr><td>client_id</td><td>string</td><td>The OIDC client identifier that was assigned to the relying party when the client registration is done</td><td></td><td> </td><td> </td><td>Y</td></tr><tr><td>iat</td><td>number</td><td>Time at which the JWT was issued</td><td></td><td>Alert</td><td>FK</td><td>N</td></tr><tr><td>jti</td><td>string</td><td>JWT ID provides a unique identifier for the JWT</td><td></td><td></td><td></td><td></td></tr></tbody></table>

* **iss** - Issuer identifier for the IDBB implementation. The iss value is a case-sensitive URL using the https scheme that contains scheme, host, and optionally, port number and path components and no query or fragment components.
* **exp** - Expiration time on or after which the Access Token must not be accepted for processing. The processing of this parameter requires that the current date/time must be before the expiration date/time listed in the value. Its value is a JSON number representing the number of seconds from 1970-01-01T0:0:0Z as measured in UTC until the date/time.
* **aud** - Audience that this Access Token is intended for. It must contain the OIDC client\_id of the Relying Party as an audience value.
* **sub** - Subject identifier with the value of PSUT (Partner Specific User Token). This value should be unique for the end user and relying party combination. Same user should have a different subject identifier in different relying party systems to preserve privacy. It must not exceed 255 ASCII characters in length. The sub-value is a case-sensitive string.
* **client\_id** - The OIDC client identifier that was assigned to the relying party when the client registration is done.
* **iat** - Time at which the JWT was issued. Its value is a JSON number representing the number of seconds from 1970-01-01T0:0:0Z as measured in UTC until the date/time.
* **jti** - JWT ID provides a unique identifier for the JWT. The identifier value must be assigned in a manner that ensures that there is a negligible probability that the same value will be accidentally assigned to a different data object. This can be used to prevent the JWT from being replayed. The jti value is a case-sensitive string.
