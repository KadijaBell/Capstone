### Database Schema Docs

### **Users Table**
| Column       | Type        | Constraints                    |
|--------------|-------------|--------------------------------|
| `id`         | Integer     | Primary Key                   |
| `username`   | String      | Unique, Not Null              |
| `email`      | String      | Unique, Not Null              |
| `password`   | String      | Hashed, Not Null              |
| `role`       | Enum        | Values: `client`, `admin`     |




#### **Events Table**

| Column       | Type        | Constraints                        |
|--------------|-------------|------------------------------------|
| `id`         | Integer     | Primary Key, Auto Increment        |
| `title`      | String      | Not Null                           |
| `description`| Text        | Not Null                           |
| `type`       | Enum        | ( `event`, `cause` )               |
| `status`     | Enum        | (`active`, `inactive`)             |
| `client_id`  | Integer     | Foreign Key (`Users.id`), Nullable |
| `created_at` | Timestamp   | Default: current timestamp         |
| `updated_at` | Timestamp   | Default: current timestamp         |



#### **Services Table**

| Column       | Type        | Constraints                        |
|--------------|-------------|------------------------------------|
| `id`         | Integer     | Primary Key, Auto Increment        |
| `name`       | String      | Not Null                           |
| `description`| Text        |                                    |
| `created_at` | Timestamp   | Default: current timestamp         |




#### **Agencies Table**

| Column       | Type        | Constraints                        |
|--------------|-------------|------------------------------------|
| `id`         | Integer     | Primary Key, Auto Increment        |
| `name`       | String      | Not Null                           |
| `bio`        | Text        |                                    |
| `image_url`  | String      |                                    |
| `created_at` | Timestamp   | Default: current timestamp         |


#### **Metrics Table**

| Column         | Type        | Constraints                        |
|----------------|-------------|------------------------------------|
| `id`           | Integer     | Primary Key, Auto Increment        |
| `metric_name`  | String      | Not Null                           |
| `value`        | Float       |                                    |
| `created_at`   | Timestamp   | Default: current timestamp         |

### **Contact Submissions Table**
| Column       | Type        | Constraints                        |
|--------------|-------------|------------------------------------|
| `id`         | Integer     | Primary Key, Auto Increment        |
| `name`       | String(100) | Not Null                          |
| `email`      | String(255) | Not Null                          |
| `subject`    | String(255) | Not Null                          |
| `message`    | Text        | Not Null                          |
| `status`     | String(50)  | Default: 'pending'                |
| `created_at` | Timestamp   | Default: current timestamp         |

## API Endpoints

### Authentication

#### Login
**POST** `/api/auth/login`
- **Description**: Authenticates a user.
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "id": 1,
    "username": "Demo",
    "email": "demo@example.com",
    "role": "client"
  }
  ```

#### Sign Up
**POST** `/api/auth/signup`
- **Description**: Registers a new user.
- **Request Body**:
  ```json
  {
    "username": "NewUser",
    "email": "newuser@example.com",
    "password": "securePassword"
  }
  ```
- **Response**:
  ```json
  {
    "id": 2,
    "username": "NewUser",
    "email": "newuser@example.com",
    "role": "client"
  }
  ```

#### Logout
**GET** `/api/auth/logout`
- **Description**: Logs out the current user.

---

### Events

#### List Events
**GET** `/api/events`
- **Description**: Retrieves all events.
- **Response**:
  ```json
  [
    {
      "id": 1,
      "title": "Product Launch",
      "description": "A high-profile product launch event.",
      "status": "approved",
      "client_id": 2
    }
  ]
  ```

#### Create Event Request
**POST** `/api/events`
- **Description**: Allows a client to request an event.
- **Request Body**:
  ```json
  {
    "title": "Networking Meetup",
    "description": "A casual networking event."
  }
  ```
- **Response**:
  ```json
  {
    "id": 2,
    "title": "Networking Meetup",
    "description": "A casual networking event.",
    "status": "pending",
    "client_id": 2
  }
  ```

#### Update Event Status
**PATCH** `/api/events/:id`
- **Description**: Admin can approve or deny an event request.
- **Request Body**:
  ```json
  {
    "status": "approved"
  }
  ```
- **Response**:
  ```json
  {
    "id": 2,
    "status": "approved"
  }
  ```

---

### Services

#### List Services
**GET** `/api/services`
- **Description**: Retrieves all services offered.
- **Response**:
  ```json
  [
    {
      "id": 1,
      "name": "Event Planning",
      "description": "Comprehensive event planning services."
    }
  ]
  ```

---

### Community

#### List Community Data
**GET** `/api/community`
- **Description**: Retrieves all active community related data(events,causes).
- **Query Parameters**:
- `type`: Filter by category (events, causes)
- **API Strategy**:
  - Fetch data from `/api/events?type=event` for events.
  - Fetch data from `/api/events?type=cause` for causes.
  - Combine with `/api/services` for additional details.
- **Response**:
```json
   [
  {
    "id": 1,
    "title": "Charity Run",
    "description": "A local charity fundraising event.",
    "type": "event",
    "status": "active"
  },
  {
    "id": 2,
    "title": "Environmental Awareness Campaign",
    "description": "A campaign to promote environmental conservation.",
    "type": "cause",
    "status": "active"
  }
]
```
---
### Admin

#### Manage Client Requests
**GET** `/api/admin/events`
- **Description**: Admin retrieves all event requests for review.

#### Contact Client
**POST** `/api/admin/contact`
- **Description**: Admin contacts a client regarding their request.
- **Request Body**:
  ```json
  {
    "client_id": 2,
    "message": "We need additional details for your request."
  }
  ```
- **Response**:
  ```json
  {
    "status": "Message sent successfully."
  }

### Contact Submissions

#### Submit Contact Form
**POST** `/api/admin/contact-submissions`
- **Description**: Allows non-authenticated users to submit contact messages
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "General Inquiry",
    "message": "I would like to learn more about your services."
  }
  ```
- **Response**:
  ```json
  {
    "message": "Contact submission received successfully"
  }
  ```

#### Get Contact Submissions (Admin Only)
**GET** `/api/admin/contact-submissions`
- **Description**: Retrieves all contact form submissions (requires admin authentication)
- **Response**:
  ```json
  {
    "submissions": [
      {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com",
        "subject": "General Inquiry",
        "message": "I would like to learn more about your services.",
        "status": "pending",
        "created_at": "2024-03-14T12:00:00Z"
      }
    ]
  }
  ```
