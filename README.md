<table>
    <thead>
    <tr>
        <th>Title</th>
        <th>Last Updated</th>
        <th>Summary</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>Gmelius package</td>
        <td>September 1, 2023</td>
        <td>Detailed description of the API of the Gmelius package.</td>
    </tr>
    </tbody>
</table>
---
title: Gmelius endpoint
keywords:
last_updated: February 02, 2022
tags: []
summary: "Detailed description of the API of the Gmelius endpoint."
sidebar: extensions_sidebar
permalink: endpoints_gmelius.html
folder: extensions
---

# Overview

This endpoint allows direct access to the [Gmelius API](https://developers.gmelius.com/),
however it provides shortcuts and helpers for most common use cases.

Some features available in this endpoint are:

- Authentication and authorization
- Direct access to the Gmelius API
- Helpers for API methods

## Configuration

In order to use the Gmelius you must create an app in the gemlius dashboard. There you need to put the redirect URI that will be shown in the endpoint configuration. Then, you will need to go through an Oauth Authroization process with the button "Connect to Gmelius". This will give the app an authorization code is necessary to get the authorization token.

### Client ID

This value comes from the app created in the Gmelius dashboard.

### Client secret

This value comes from the app created in the Gmelius dashboard.


### Code Verifier

String used for doing a PKCE validation when asking for an access token with the authorization code. This field will be automatically field when doing the Oauth connection

### Code Challenge

String used for doing a PKCE validation when asking for an access token with the authorization code. This field will be automatically field when doing the Oauth connection

### Authorization Code

This is used for obtaining the first access token with an authorization code. This field will be automatically field when doing the Oauth connection

### Registered URI

This URL has to be configured in the app created in the Gmelius dashboard.

### Webhook Url

This URL is the one that should be used when creating new webhooks.

### Connect To Gmelius

This button will trigger the Oauth connection process and fill in fields mentioned above.

# Javascript API

The Javascript API of the gmelius package has three pieces:

- **HTTP requests**: These allows to make regular HTTP requests.
- **Shortcuts**: These are helpers to make HTTP request to the API in a more convenient way.
- **Additional Helpers**: These helpers provide additional features that facilitate or improves the package usage in SLINGR.

## HTTP requests
You can make `POST`,`GET`,`PUT`,`DELETE`,`PATCH` requests to the [gmelius API](API_URL_HERE) like this:
```javascript
var response = pkg.gmelius.functions.post('/auth/conversations/:id/reply', body)
var response = pkg.gmelius.functions.get('/auth/sharedfolders')
var response = pkg.gmelius.functions.put('/auth/conversations/:id/assignee', body)
var response = pkg.gmelius.functions.delete('/auth/boards/:id')
var response = pkg.gmelius.functions.patch('/auth/tags/:id', body)
```

Please take a look at the documentation of the [HTTP service](https://github.com/slingr-stack/http-service)
for more information about generic requests.

## Shortcuts

Instead of having to use the generic HTTP methods, you can (and should) make use of the helpers provided in the package:
<details>
    <summary>Click here to see all the helpers</summary>

<br>

* API URL: '/token/introspection'
* HTTP Method: 'POST'
```javascript
pkg.gmelius.functions.token.introspection(body)
```
---
* API URL: '/token/revocation'
* HTTP Method: 'POST'
```javascript
pkg.gmelius.functions.token.revocation(body)
```
---
* API URL: '/auth/boards'
* HTTP Method: 'POST'
```javascript
pkg.gmelius.functions.boards.post(body)
```
---
* API URL: '/auth/boards/:id/columns'
* HTTP Method: 'POST'
```javascript
pkg.gmelius.functions.boards.columns.post(id, body)
```
---
* API URL: '/auth/boards/cards'
* HTTP Method: 'POST'
```javascript
pkg.gmelius.functions.boards.cards.post(body)
```
---
* API URL: '/auth/boards/cards/:id/tags'
* HTTP Method: 'POST'
```javascript
pkg.gmelius.functions.boards.cards.tags.post(id, body)
```
---
* API URL: '/auth/conversations/:id/notes'
* HTTP Method: 'POST'
```javascript
pkg.gmelius.functions.conversations.notes.post(id, body)
```
---
* API URL: '/auth/conversations/:id/reply'
* HTTP Method: 'POST'
```javascript
pkg.gmelius.functions.conversations.reply.post(id, body)
```
---
* API URL: '/auth/conversations/:id/tags'
* HTTP Method: 'POST'
```javascript
pkg.gmelius.functions.conversations.tags.post(id, body)
```
---
* API URL: '/auth/sequences/enroll/:id'
* HTTP Method: 'POST'
```javascript
pkg.gmelius.functions.sequences.enroll.post(id, body)
```
---
* API URL: '/auth/notes'
* HTTP Method: 'POST'
```javascript
pkg.gmelius.functions.notes.post(body)
```
---
* API URL: '/auth/webhooks'
* HTTP Method: 'POST'
```javascript
pkg.gmelius.functions.webhooks.post(body)
```
---
* API URL: '/me'
* HTTP Method: 'GET'
```javascript
pkg.gmelius.functions.me()
```
---
* API URL: '/auth/boards'
* HTTP Method: 'GET'
```javascript
pkg.gmelius.functions.boards.getAll()
```
---
* API URL: '/auth/boards/:id'
* HTTP Method: 'GET'
```javascript
pkg.gmelius.functions.boards.get(id)
```
---
* API URL: '/auth/boards/:id/columns'
* HTTP Method: 'GET'
```javascript
pkg.gmelius.functions.boards.columns.get(id)
```
---
* API URL: '/auth/boards/columns/:id'
* HTTP Method: 'GET'
```javascript
pkg.gmelius.functions.boards.columns.get(id)
```
---
* API URL: '/auth/boards/:id/cards'
* HTTP Method: 'GET'
```javascript
pkg.gmelius.functions.boards.cards.get(id)
```
---
* API URL: '/auth/boards/cards/:id'
* HTTP Method: 'GET'
```javascript
pkg.gmelius.functions.boards.cards.get(id)
```
---
* API URL: '/auth/sharedfolders'
* HTTP Method: 'GET'
```javascript
pkg.gmelius.functions.sharedfolders.getAll()
```
---
* API URL: '/auth/sharedfolders/:id'
* HTTP Method: 'GET'
```javascript
pkg.gmelius.functions.sharedfolders.get(id)
```
---
* API URL: '/auth/sharedfolders/:id/conversations'
* HTTP Method: 'GET'
```javascript
pkg.gmelius.functions.sharedfolders.conversations.get(id)
```
---
* API URL: '/auth/conversations/:id'
* HTTP Method: 'GET'
```javascript
pkg.gmelius.functions.conversations.get(id)
```
---
* API URL: '/auth/sequences'
* HTTP Method: 'GET'
```javascript
pkg.gmelius.functions.sequences.getAll()
```
---
* API URL: '/auth/sequences/:id'
* HTTP Method: 'GET'
```javascript
pkg.gmelius.functions.sequences.getAll(id)
```
---
* API URL: '/auth/webhooks'
* HTTP Method: 'GET'
```javascript
pkg.gmelius.functions.webhooks.getAll()
```
---
* API URL: '/auth/events'
* HTTP Method: 'GET'
```javascript
pkg.gmelius.functions.events.get()
```
---
* API URL: '/auth/webhooks/:id'
* HTTP Method: 'GET'
```javascript
pkg.gmelius.functions.webhooks.get(id)
```
---
* API URL: '/auth/boards/:id'
* HTTP Method: 'PUT'
```javascript
pkg.gmelius.functions.boards.put(id, body)
```
---
* API URL: '/auth/conversations/:id/assignee'
* HTTP Method: 'PUT'
```javascript
pkg.gmelius.functions.conversations.assignee.put(id, body)
```
---
* API URL: '/auth/conversations/:id/status'
* HTTP Method: 'PUT'
```javascript
pkg.gmelius.functions.conversations.status.put(id, body)
```
---
* API URL: '/auth/notes/:id'
* HTTP Method: 'PUT'
```javascript
pkg.gmelius.functions.notes.put(id, body)
```
---
* API URL: '/auth/boards/:id'
* HTTP Method: 'DELETE'
```javascript
pkg.gmelius.functions.boards.delete(id)
```
---
* API URL: '/auth/boards/columns/:id'
* HTTP Method: 'DELETE'
```javascript
pkg.gmelius.functions.boards.columns.delete(id)
```
---
* API URL: '/auth/boards/cards/:id'
* HTTP Method: 'DELETE'
```javascript
pkg.gmelius.functions.boards.cards.delete(id)
```
---
* API URL: '/auth/boards/cards/:id/tags/:tagId'
* HTTP Method: 'DELETE'
```javascript
pkg.gmelius.functions.boards.cards.tags.delete(id, tagId)
```
---
* API URL: '/auth/sequences/disenroll/:id'
* HTTP Method: 'DELETE'
```javascript
pkg.gmelius.functions.sequences.disenroll.delete(id)
```
---
* API URL: '/auth/notes/:id'
* HTTP Method: 'DELETE'
```javascript
pkg.gmelius.functions.notes.delete(id)
```
---
* API URL: '/auth/webhooks/:id'
* HTTP Method: 'DELETE'
```javascript
pkg.gmelius.functions.webhooks.delete(id)
```
---
* API URL: '/auth/boards/columns/:id'
* HTTP Method: 'PATCH'
```javascript
pkg.gmelius.functions.boards.columns.patch(id, body)
```
---
* API URL: '/auth/boards/cards/:id'
* HTTP Method: 'PATCH'
```javascript
pkg.gmelius.functions.boards.cards.patch(id, body)
```
---
* API URL: '/auth/tags/:id'
* HTTP Method: 'PATCH'
```javascript
pkg.gmelius.functions.tags.patch(id, body)
```
---

</details>


## Events

You can set a webhooks listener with the Gmelius API methods.

{% include links.html %}

# New Version

# Javascript API

The Javascript API of the gmelius endpoint has three pieces:

- **HTTP requests**: These allow making regular HTTP requests.
- **Shortcuts**: These are helpers to make HTTP request to the API in a more convenient way.
- **Additional Helpers**: These helpers provide additional features that facilitate or improves the endpoint usage in SLINGR.

## HTTP requests
You can make `POST`,`GET`,`PUT`,`DELETE`,`PATCH` requests to the [gmelius API](API_URL_HERE) like this:
```javascript
var response = pkg.gmelius.functions.post('/auth/boards/:id/columns', body)
var response = pkg.gmelius.functions.post('/auth/boards/:id/columns')
var response = pkg.gmelius.functions.get('/auth/boards/:id')
var response = pkg.gmelius.functions.put('/auth/conversations/:id/status', body)
var response = pkg.gmelius.functions.put('/auth/conversations/:id/status')
var response = pkg.gmelius.functions.delete('/auth/notes/:id')
var response = pkg.gmelius.functions.patch('/auth/tags/:id', body)
var response = pkg.gmelius.functions.patch('/auth/tags/:id')
```

Please take a look at the documentation of the [HTTP endpoint](https://github.com/slingr-stack/http-endpoint#javascript-api)
for more information about generic requests.

## Shortcuts

Instead of having to use the generic HTTP methods, you can (and should) make use of the helpers provided in the endpoint:
<details>
    <summary>Click here to see all the helpers</summary>

<br>

* API URL: '/token/introspection'
* HTTP Method: 'POST'
```javascript
pkg.gmelius.functions.token.introspection.post(bod)
```
---
* API URL: '/token/revocation'
* HTTP Method: 'POST'
```javascript
pkg.gmelius.functions.token.revocation.post(bod)
```
---
* API URL: '/auth/boards'
* HTTP Method: 'POST'
```javascript
pkg.gmelius.functions.boards.post(bod)
```
---
* API URL: '/auth/boards/:id/columns'
* HTTP Method: 'POST'
```javascript
pkg.gmelius.functions.boards.columns.post(id, bod)
```
---
* API URL: '/auth/boards/cards'
* HTTP Method: 'POST'
```javascript
pkg.gmelius.functions.boards.cards.post(bod)
```
---
* API URL: '/auth/boards/cards/:id/tags'
* HTTP Method: 'POST'
```javascript
pkg.gmelius.functions.boards.cards.tags.post(id, bod)
```
---
* API URL: '/auth/conversations/:id/notes'
* HTTP Method: 'POST'
```javascript
pkg.gmelius.functions.conversations.notes.post(id, bod)
```
---
* API URL: '/auth/conversations/:id/reply'
* HTTP Method: 'POST'
```javascript
pkg.gmelius.functions.conversations.reply.post(id, bod)
```
---
* API URL: '/auth/conversations/:id/tags'
* HTTP Method: 'POST'
```javascript
pkg.gmelius.functions.conversations.tags.post(id, bod)
```
---
* API URL: '/auth/sequences/enroll/:id'
* HTTP Method: 'POST'
```javascript
pkg.gmelius.functions.sequences.enroll.post(id, bod)
```
---
* API URL: '/auth/notes'
* HTTP Method: 'POST'
```javascript
pkg.gmelius.functions.notes.post(bod)
```
---
* API URL: '/auth/webhooks'
* HTTP Method: 'POST'
```javascript
pkg.gmelius.functions.webhooks.post(bod)
```
---
* API URL: '/me'
* HTTP Method: 'GET'
```javascript
pkg.gmelius.functions.me.get()
```
---
* API URL: '/auth/boards'
* HTTP Method: 'GET'
```javascript
pkg.gmelius.functions.boards.get()
```
---
* API URL: '/auth/boards/:id'
* HTTP Method: 'GET'
```javascript
pkg.gmelius.functions.boards.get(i)
```
---
* API URL: '/auth/boards/:id/columns'
* HTTP Method: 'GET'
```javascript
pkg.gmelius.functions.boards.columns.get(i)
```
---
* API URL: '/auth/boards/columns/:id'
* HTTP Method: 'GET'
```javascript
pkg.gmelius.functions.boards.columns.get(i)
```
---
* API URL: '/auth/boards/:id/cards'
* HTTP Method: 'GET'
```javascript
pkg.gmelius.functions.boards.cards.get(i)
```
---
* API URL: '/auth/boards/cards/:id'
* HTTP Method: 'GET'
```javascript
pkg.gmelius.functions.boards.cards.get(i)
```
---
* API URL: '/auth/sharedfolders'
* HTTP Method: 'GET'
```javascript
pkg.gmelius.functions.sharedfolders.get()
```
---
* API URL: '/auth/sharedfolders/:id'
* HTTP Method: 'GET'
```javascript
pkg.gmelius.functions.sharedfolders.get(i)
```
---
* API URL: '/auth/sharedfolders/:id/conversations'
* HTTP Method: 'GET'
```javascript
pkg.gmelius.functions.sharedfolders.conversations.get(i)
```
---
* API URL: '/auth/conversations/:id'
* HTTP Method: 'GET'
```javascript
pkg.gmelius.functions.conversations.get(i)
```
---
* API URL: '/auth/sequences'
* HTTP Method: 'GET'
```javascript
pkg.gmelius.functions.sequences.get()
```
---
* API URL: '/auth/sequences/:id'
* HTTP Method: 'GET'
```javascript
pkg.gmelius.functions.sequences.get(i)
```
---
* API URL: '/auth/webhooks'
* HTTP Method: 'GET'
```javascript
pkg.gmelius.functions.webhooks.get()
```
---
* API URL: '/auth/webhooks/:id'
* HTTP Method: 'GET'
```javascript
pkg.gmelius.functions.webhooks.get(i)
```
---
* API URL: '/auth/events'
* HTTP Method: 'GET'
```javascript
pkg.gmelius.functions.events.get()
```
---
* API URL: '/auth/boards/:id'
* HTTP Method: 'PUT'
```javascript
pkg.gmelius.functions.boards.put(id, bod)
```
---
* API URL: '/auth/conversations/:id/assignee'
* HTTP Method: 'PUT'
```javascript
pkg.gmelius.functions.conversations.assignee.put(id, bod)
```
---
* API URL: '/auth/conversations/:id/status'
* HTTP Method: 'PUT'
```javascript
pkg.gmelius.functions.conversations.status.put(id, bod)
```
---
* API URL: '/auth/notes/:id'
* HTTP Method: 'PUT'
```javascript
pkg.gmelius.functions.notes.put(id, bod)
```
---
* API URL: '/auth/boards/:id'
* HTTP Method: 'DELETE'
```javascript
pkg.gmelius.functions.boards.delete(i)
```
---
* API URL: '/auth/boards/columns/:id'
* HTTP Method: 'DELETE'
```javascript
pkg.gmelius.functions.boards.columns.delete(i)
```
---
* API URL: '/auth/boards/cards/:id'
* HTTP Method: 'DELETE'
```javascript
pkg.gmelius.functions.boards.cards.delete(i)
```
---
* API URL: '/auth/boards/cards/:id/tags/:tagId'
* HTTP Method: 'DELETE'
```javascript
pkg.gmelius.functions.boards.cards.tags.delete(id, tagI)
```
---
* API URL: '/auth/sequences/disenroll/:id'
* HTTP Method: 'DELETE'
```javascript
pkg.gmelius.functions.sequences.disenroll.delete(i)
```
---
* API URL: '/auth/notes/:id'
* HTTP Method: 'DELETE'
```javascript
pkg.gmelius.functions.notes.delete(i)
```
---
* API URL: '/auth/webhooks/:id'
* HTTP Method: 'DELETE'
```javascript
pkg.gmelius.functions.webhooks.delete(i)
```
---
* API URL: '/auth/boards/columns/:id'
* HTTP Method: 'PATCH'
```javascript
pkg.gmelius.functions.boards.columns.patch(id, bod)
```
---
* API URL: '/auth/boards/cards/:id'
* HTTP Method: 'PATCH'
```javascript
pkg.gmelius.functions.boards.cards.patch(id, bod)
```
---
* API URL: '/auth/tags/:id'
* HTTP Method: 'PATCH'
```javascript
pkg.gmelius.functions.tags.patch(id, bod)
```
---

</details>

## Flow Step

As an alternative option to using scripts, you can make use of Flows and Flow Steps specifically created for the package:
<details>
    <summary>Click here to see the Flow Steps</summary>

<br>



### Generic Flow Step

Generic flow step for full use of the entire package and its services.

<h3>Inputs</h3>

<table>
    <thead>
    <tr>
        <th>Label</th>
        <th>Type</th>
        <th>Required</th>
        <th>Default</th>
        <th>Visibility</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>URL (Method)</td>
        <td>choice</td>
        <td>yes</td>
        <td> - </td>
        <td>Always</td>
        <td>
            This is the http method to be used against the endpoint. <br>
            Possible values are: <br>
            <i><strong>POST,GET,PUT,DELETE,PATCH</strong></i>
        </td>
    </tr>
    <tr>
        <td>URL (Path)</td>
        <td>choice</td>
        <td>yes</td>
        <td> - </td>
        <td>Always</td>
        <td>
            The url to which this endpoint will send the request. This is the exact service to which the http request will be made. <br>
            Possible values are: <br>
            <i><strong>/token/introspection<br>/token/revocation<br>/auth/boards<br>/auth/boards/{id}/columns<br>/auth/boards/cards<br>/auth/boards/cards/{id}/tags<br>/auth/conversations/{id}/notes<br>/auth/conversations/{id}/reply<br>/auth/conversations/{id}/tags<br>/auth/sequences/enroll/{id}<br>/auth/notes<br>/auth/webhooks<br>/me<br>/auth/boards<br>/auth/boards/{id}<br>/auth/boards/{id}/columns<br>/auth/boards/columns/{id}<br>/auth/boards/{id}/cards<br>/auth/boards/cards/{id}<br>/auth/sharedfolders<br>/auth/sharedfolders/{id}<br>/auth/sharedfolders/{id}/conversations<br>/auth/conversations/{id}<br>/auth/sequences<br>/auth/sequences/{id}<br>/auth/webhooks<br>/auth/webhooks/{id}<br>/auth/events<br>/auth/boards/{id}<br>/auth/conversations/{id}/assignee<br>/auth/conversations/{id}/status<br>/auth/notes/{id}<br>/auth/boards/{id}<br>/auth/boards/columns/{id}<br>/auth/boards/cards/{id}<br>/auth/boards/cards/{id}/tags/{tagId}<br>/auth/sequences/disenroll/{id}<br>/auth/notes/{id}<br>/auth/webhooks/{id}<br>/auth/boards/columns/{id}<br>/auth/boards/cards/{id}<br>/auth/tags/{id}<br></strong></i>
        </td>
    </tr>
    <tr>
        <td>Headers</td>
        <td>keyValue</td>
        <td>no</td>
        <td> - </td>
        <td>Always</td>
        <td>
            Used when you want to have a custom http header for the request.
        </td>
    </tr>
    <tr>
        <td>Query Params</td>
        <td>keyValue</td>
        <td>no</td>
        <td> - </td>
        <td>Always</td>
        <td>
            Used when you want to have a custom query params for the http call.
        </td>
    </tr>
    <tr>
        <td>Body</td>
        <td>json</td>
        <td>no</td>
        <td> - </td>
        <td>Always</td>
        <td>
            A payload of data can be sent to the server in the body of the request.
        </td>
    </tr>
    <tr>
        <td>Event</td>
        <td>dropDown</td>
        <td>no</td>
        <td> - </td>
        <td>Always</td>
        <td>
            Used to define event after the call. <br>
            Possible values are: <br>
            File Downloaded
        </td>
    </tr>
    <tr>
        <td>Override Settings</td>
        <td>boolean</td>
        <td>no</td>
        <td> false </td>
        <td>Always</td>
        <td></td>
    </tr>
    <tr>
        <td>Follow Redirect</td>
        <td>boolean</td>
        <td>no</td>
        <td> false </td>
        <td> overrideSettings </td>
        <td>Indicates that the resource has to be downloaded into a file instead of returning it in the response.</td>
    </tr>
    <tr>
        <td>Download</td>
        <td>boolean</td>
        <td>no</td>
        <td> false </td>
        <td> overrideSettings </td>
        <td>If true the method won't return until the file has been downloaded, and it will return all the information of the file.</td>
    </tr>
    <tr>
        <td>File name</td>
        <td>text</td>
        <td>no</td>
        <td></td>
        <td> overrideSettings </td>
        <td>If provided, the file will be stored with this name. If empty the file name will be calculated from the URL.</td>
    </tr>
    <tr>
        <td>Full response</td>
        <td> boolean </td>
        <td>no</td>
        <td> false </td>
        <td> overrideSettings </td>
        <td>Include extended information about response</td>
    </tr>
    <tr>
        <td>Connection Timeout</td>
        <td> number </td>
        <td>no</td>
        <td> 5000 </td>
        <td> overrideSettings </td>
        <td>Connect a timeout interval, in milliseconds (0 = infinity).</td>
    </tr>
    <tr>
        <td>Read Timeout</td>
        <td> number </td>
        <td>no</td>
        <td> 60000 </td>
        <td> overrideSettings </td>
        <td>Read a timeout interval, in milliseconds (0 = infinity).</td>
    </tr>
    </tbody>
</table>

<h3>Outputs</h3>

<table>
    <thead>
    <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>response</td>
        <td>object</td>
        <td>
            Object resulting from the response to the endpoint call.
        </td>
    </tr>
    </tbody>
</table>


</details>

For more information about how shortcuts or flow steps work, and how they are generated, take a look at the [slingr-helpgen tool](https://github.com/slingr-stack/slingr-helpgen).

## Additional Flow Step


<details>
    <summary>Click here to see the Customs Flow Steps</summary>

<br>



### Custom Flow Steps Name

Description of Custom Flow Steps

*MANUALLY ADD THE DOCUMENTATION OF THESE FLOW STEPS HERE...*


</details>

## Additional Helpers
*MANUALLY ADD THE DOCUMENTATION OF THESE HELPERS HERE...*
## Dependencies
* HTTP Service (Latest Version)


// TODO: Review the dependencies of the package (and remove this comment after set the dependencies)

# About SLINGR

SLINGR is a low-code rapid application development platform that accelerates development, with robust architecture for integrations and executing custom workflows and automation.

[More info about SLINGR](https://slingr.io)

# License

This package is licensed under the Apache License 2.0. See the `LICENSE` file for more details.
