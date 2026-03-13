# Mini Snippet vault

## Backend

This is the backend for Mini Snippet Vault, a service for saving and managing useful snippets (links, notes, commands) with tags, search, and CRUD operations. Built with NestJS, TypeScript, and MongoDB.

### Stack

* Node.js / TypeScript
* NestJS (AppModule, SnippetModule)
* MongoDB (via Mongoose)
* Class-validator for DTO validation
* Prettier for code formatting

### Features

* Create, read, update, delete snippets
* Snippets have: title, content, tags (array), type (link | note | command), createdAt, updatedAt
* Pagination (page / limit) for snippet list
* Search by title / content
* Filter by tag
* Proper error handling: 404 Not Found, 400 Bad Request
* Mongoose text index for fast search
* Clean TypeScript code

### Getting Started

1. Clone the repo
```bash
git clone https://github.com/GGalina/snippet-vault.git
cd snippet-vault/backend
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables

Create a .env file (or copy .env.example) in the backend root:
```bash
MONGO_URI=mongodb://localhost:27017/snippetvault
PORT=3000
```
MONGO_URI — your MongoDB connection string
PORT — port for NestJS server

4. Run locally
Start development server
```bash
npm run start:dev
```

The backend runs on http://localhost:3000
Auto-reloads on code changes

### API Endpoints

All endpoints are prefixed with /snippets.

1️⃣ Create a Snippet

Endpoint:

POST /snippets
Content-Type: application/json

Request Body:
```bash
{
  "title": "Log Hello",
  "content": "console.log('Hello World!');",
  "tags": ["js", "console"],
  "type": "command"
}
```
Success Response:

Status: 201 Created

Body:
```bash
{
  "_id": "64f8b6e0b1234567890abcde",
  "title": "Log Hello",
  "content": "console.log('Hello World!');",
  "tags": ["js", "console"],
  "type": "command",
  "createdAt": "2026-03-13T18:00:00.000Z",
  "updatedAt": "2026-03-13T18:00:00.000Z"
}
```
Errors:

*400 Bad Request — required fields missing or invalid type

2️⃣ Get All Snippets

Endpoint:

GET /snippets?page=1&limit=10&q=log&tag=js

Query Parameters (optional):

* page (number) — default 1
* limit (number) — default 10
* q (string) — search text in title or content
* tag (string) — filter by tag

Success Response:

Status: 200 OK

Body:
```bash
{
  "data": [
    {
      "_id": "64f8b6e0b1234567890abcde",
      "title": "Log Hello",
      "content": "console.log('Hello World!');",
      "tags": ["js", "console"],
      "type": "command",
      "createdAt": "2026-03-13T18:00:00.000Z",
      "updatedAt": "2026-03-13T18:00:00.000Z"
    }
  ],
  "total": 1,
  "page": 1,
  "limit": 10
}
```

Errors:

* 400 Bad Request — if page or limit are invalid numbers


3️⃣ Get Snippet by ID

Endpoint:

GET /snippets/:id

Example:

GET /snippets/64f8b6e0b1234567890abcde

Success Response:

Status: 200 OK

Body:
```bash
{
  "_id": "64f8b6e0b1234567890abcde",
  "title": "Log Hello",
  "content": "console.log('Hello World!');",
  "tags": ["js", "console"],
  "type": "command",
  "createdAt": "2026-03-13T18:00:00.000Z",
  "updatedAt": "2026-03-13T18:00:00.000Z"
}
```
Errors:

* 404 Not Found — if snippet does not exist

4️⃣ Update Snippet

Endpoint:

PATCH /snippets/:id
Content-Type: application/json

Example Request Body:
```bash
{
  "title": "Log Hello Updated",
  "tags": ["js", "console", "update"]
}
```
Success Response:

Status: 200 OK

Body:
```bash
{
  "_id": "64f8b6e0b1234567890abcde",
  "title": "Log Hello Updated",
  "content": "console.log('Hello World!');",
  "tags": ["js", "console", "update"],
  "type": "command",
  "createdAt": "2026-03-13T18:00:00.000Z",
  "updatedAt": "2026-03-13T18:30:00.000Z"
}
```
Errors:

* 400 Bad Request — invalid input
* 404 Not Found — if snippet does not exist


5️⃣ Delete Snippet

Endpoint:

DELETE /snippets/:id

Example:

DELETE /snippets/64f8b6e0b1234567890abcde

Success Response:

Status: 200 OK

Body:
```bash
{
  "message": "Snippet deleted successfully"
}
```

Errors:

* 404 Not Found — if snippet does not exist

### Notes

* createdAt and updatedAt are automatically managed by Mongoose
* Searching by q uses a text index on title and content
* Pagination defaults: page = 1, limit = 10
* Proper 400 / 404 error handling is implemented for all endpoints

### Other Scripts

Build for production
```bash
npm run build
```
 Start production server
```bash
npm run start:prod
```
 Format code with Prettier
```bash
npm run format
```

