# Javascript API

The Javascript API of the gmelius package has three pieces:

- **HTTP requests**: These allow making regular HTTP requests.
- **Shortcuts**: These are helpers to make HTTP request to the API in a more convenient way.
- **Additional Helpers**: These helpers provide additional features that facilitate or improves the package usage in SLINGR.

## HTTP requests
You can make `POST`,`GET`,`PUT`,`DELETE`,`PATCH` requests to the [gmelius API](API_URL_HERE) like this:
```javascript
var response = pkg.gmelius.functions.post('/auth/sequences/enroll/:id', body)
var response = pkg.gmelius.functions.post('/auth/sequences/enroll/:id')
var response = pkg.gmelius.functions.get('/auth/boards/:id')
var response = pkg.gmelius.functions.put('/auth/boards/:id', body)
var response = pkg.gmelius.functions.put('/auth/boards/:id')
var response = pkg.gmelius.functions.delete('/auth/boards/columns/:id')
var response = pkg.gmelius.functions.patch('/auth/boards/cards/:id', body)
var response = pkg.gmelius.functions.patch('/auth/boards/cards/:id')
```

Please take a look at the documentation of the [HTTP service](https://github.com/slingr-stack/http-service)
for more information about generic requests.

## Shortcuts

Instead of having to use the generic HTTP methods, you can (and should) make use of the helpers provided in the package:
<details>
    <summary>Click here to see all the helpers</summary>

<br>

* API URL: '/auth/boards'
* HTTP Method: 'POST'
```javascript
pkg.gmelius.functions.boards.post(body)
```
---
* API URL: '/auth/boards'
* HTTP Method: 'GET'
```javascript
pkg.gmelius.functions.boards.get()
```
---
* API URL: '/auth/events'
* HTTP Method: 'GET'
```javascript
pkg.gmelius.functions.events.get()
```
---
* API URL: '/auth/notes'
* HTTP Method: 'POST'
```javascript
pkg.gmelius.functions.notes.post(body)
```
---
* API URL: '/auth/sequences'
* HTTP Method: 'GET'
```javascript
pkg.gmelius.functions.sequences.get()
```
---
* API URL: '/auth/sharedfolders'
* HTTP Method: 'GET'
```javascript
pkg.gmelius.functions.sharedfolders.get()
```
---
* API URL: '/auth/webhooks'
* HTTP Method: 'POST'
```javascript
pkg.gmelius.functions.webhooks.post(body)
```
---
* API URL: '/auth/webhooks'
* HTTP Method: 'GET'
```javascript
pkg.gmelius.functions.webhooks.get()
```
---
* API URL: '/auth/boards/:id'
* HTTP Method: 'GET'
```javascript
pkg.gmelius.functions.boards.get()
```
---
* API URL: '/auth/boards/:id'
* HTTP Method: 'PUT'
```javascript
pkg.gmelius.functions.boards.put(id, body)
```
---
* API URL: '/auth/boards/:id'
* HTTP Method: 'DELETE'
```javascript
pkg.gmelius.functions.boards.delete(id)
```
---
* API URL: '/auth/boards/cards'
* HTTP Method: 'POST'
```javascript
pkg.gmelius.functions.boards.cards.post(body)
```
---
* API URL: '/auth/conversations/:id'
* HTTP Method: 'GET'
```javascript
pkg.gmelius.functions.conversations.get(id)
```
---
* API URL: '/auth/notes/:id'
* HTTP Method: 'PUT'
```javascript
pkg.gmelius.functions.notes.put(id, body)
```
---
* API URL: '/auth/notes/:id'
* HTTP Method: 'DELETE'
```javascript
pkg.gmelius.functions.notes.delete(id)
```
---
* API URL: '/auth/sequences/:id'
* HTTP Method: 'GET'
```javascript
pkg.gmelius.functions.sequences.get()
```
---
* API URL: '/auth/sharedfolders/:id'
* HTTP Method: 'GET'
```javascript
pkg.gmelius.functions.sharedfolders.get()
```
---
* API URL: '/auth/tags/:id'
* HTTP Method: 'PATCH'
```javascript
pkg.gmelius.functions.tags.patch(id, body)
```
---
* API URL: '/auth/webhooks/:id'
* HTTP Method: 'GET'
```javascript
pkg.gmelius.functions.webhooks.get()
```
---
* API URL: '/auth/webhooks/:id'
* HTTP Method: 'DELETE'
```javascript
pkg.gmelius.functions.webhooks.delete(id)
```
---
* API URL: '/auth/boards/:id/cards'
* HTTP Method: 'GET'
```javascript
pkg.gmelius.functions.boards.cards.get()
```
---
* API URL: '/auth/boards/:id/columns'
* HTTP Method: 'POST'
```javascript
pkg.gmelius.functions.boards.columns.post(id, body)
```
---
* API URL: '/auth/boards/:id/columns'
* HTTP Method: 'GET'
```javascript
pkg.gmelius.functions.boards.columns.get()
```
---
* API URL: '/auth/boards/cards/:id'
* HTTP Method: 'GET'
```javascript
pkg.gmelius.functions.boards.cards.get()
```
---
* API URL: '/auth/boards/cards/:id'
* HTTP Method: 'DELETE'
```javascript
pkg.gmelius.functions.boards.cards.delete(id)
```
---
* API URL: '/auth/boards/cards/:id'
* HTTP Method: 'PATCH'
```javascript
pkg.gmelius.functions.boards.cards.patch(id, body)
```
---
* API URL: '/auth/boards/columns/:id'
* HTTP Method: 'GET'
```javascript
pkg.gmelius.functions.boards.columns.get()
```
---
* API URL: '/auth/boards/columns/:id'
* HTTP Method: 'DELETE'
```javascript
pkg.gmelius.functions.boards.columns.delete(id)
```
---
* API URL: '/auth/boards/columns/:id'
* HTTP Method: 'PATCH'
```javascript
pkg.gmelius.functions.boards.columns.patch(id, body)
```
---
* API URL: '/auth/conversations/:id/assignee'
* HTTP Method: 'PUT'
```javascript
pkg.gmelius.functions.conversations.assignee.put(id, body)
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
* API URL: '/auth/conversations/:id/status'
* HTTP Method: 'PUT'
```javascript
pkg.gmelius.functions.conversations.status.put(id, body)
```
---
* API URL: '/auth/conversations/:id/tags'
* HTTP Method: 'POST'
```javascript
pkg.gmelius.functions.conversations.tags.post(id, body)
```
---
* API URL: '/auth/sequences/disenroll/:id'
* HTTP Method: 'DELETE'
```javascript
pkg.gmelius.functions.sequences.disenroll.delete(id)
```
---
* API URL: '/auth/sequences/enroll/:id'
* HTTP Method: 'POST'
```javascript
pkg.gmelius.functions.sequences.enroll.post(id, body)
```
---
* API URL: '/auth/sharedfolders/:id/conversations'
* HTTP Method: 'GET'
```javascript
pkg.gmelius.functions.sharedfolders.conversations.get(id)
```
---
* API URL: '/auth/boards/cards/:id/tags'
* HTTP Method: 'POST'
```javascript
pkg.gmelius.functions.boards.cards.tags.post(id, body)
```
---
* API URL: '/auth/boards/cards/:id/tags/:tagId'
* HTTP Method: 'DELETE'
```javascript
pkg.gmelius.functions.boards.cards.tags.delete(id, tagId)
```
---
* API URL: '/me'
* HTTP Method: 'GET'
```javascript
pkg.gmelius.functions.me.get()
```
---
* API URL: '/token/introspection'
* HTTP Method: 'POST'
```javascript
pkg.gmelius.functions.token.introspection.post(body)
```
---
* API URL: '/token/revocation'
* HTTP Method: 'POST'
```javascript
pkg.gmelius.functions.token.revocation.post(body)
```
---

</details>

