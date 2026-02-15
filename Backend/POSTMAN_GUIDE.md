# Postman API Testing Guide - College AI Chatbot

This guide provides the details for testing the backend endpoints of the College AI Chatbot.

**Base URL:** `http://localhost:5000`

---

## 1. Authentication

### Verify Email
Checks if an email belongs to an admin or a student.

- **URL:** `/api/auth/verify`
- **Method:** `POST`
- **Headers:** `Content-Type: application/json`
- **Body (JSON):**
  ```json
  {
    "email": "[EMAIL_ADDRESS]"
  }
  ```

---

## 2. Chat System

### Send Message
Sends a message to the AI assistant and receives a response.

- **URL:** `/api/chat`
- **Method:** `POST`
- **Headers:** `Content-Type: application/json`
- **Body (JSON):**
  ```json
  {
    "message": "What are the common courses available?",
    "email": "student@example.com",
    "chatId": "optional_existing_chat_id"
  }
  ```

### Get Chat History
Retrieves all recent chat sessions for a specific user.

- **URL:** `/api/chat/history?email=student@example.com`
- **Method:** `GET`

---

## 3. Admin Panel (Document Management)

### Upload Document
Uploads a document (PDF, CSV, etc.) for ingestion into the RAG system.

- **URL:** `/api/admin/upload`
- **Method:** `POST`
- **Body (form-data):**
  - `file`: (Select a File)

### Get All Documents
Lists all unique filenames that have been ingested.

- **URL:** `/api/admin/documents`
- **Method:** `GET`

### Delete Document
Deletes all chunks associated with a specific filename.

- **URL:** `/api/admin/document/:filename`
- **Method:** `DELETE`
- **Example:** `/api/admin/document/courses_2024.pdf`

---

## 4. Transparency & Health

### API Health Status
Checks if the API and database are running correctly.

- **URL:** `/api/guide/health`
- **Method:** `GET`

### Data Sources
Retrieves information about the sources used by the AI.

- **URL:** `/api/guide/sources`
- **Method:** `GET`

---

## 5. Root Endpoint

- **URL:** `/`
- **Method:** `GET`
- **Description:** Basic landing message and API version.
