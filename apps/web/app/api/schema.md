## Schema API Routes

Root: `/api/`

### Providers
```
GET /providers
GET /providers/:id
PATCH /providers/:id
```

### Models
```
GET /models
GET /models/:id
PATCH /models/:id
```

### Tags
```
GET /tags/user/:id
GET /tags/conversation/:id
POST /tags
PATCH /tags/:id
DELETE /tags/:id
```

### Conversations
```
GET /conversations/:id
PATCH /conversations/user/:id
POST /conversations
PATCH /conversations/:id
DELETE /conversations/:id
```

### Params
```
GET /params/conversation/:id
POST /params
PATCH /params/:id
DELETE /params/:id
```

### Messages
```
GET /messages/conversation/:id
POST /messages
PATCH /messages/:id
DELETE /messages/:id
```

### Users
```
GET /users
GET /users/:id
PATCH /users/:id
DELETE /users/:id
```

### Groups
```
GET /groups
GET /groups/:id
PATCH /groups/:id
DELETE /groups/:id
```

### Keys
```
GET /keys/user/:id
POST /keys
PATCH /keys/:id
DELETE /keys/:id
```
