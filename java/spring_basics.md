# 🌍 Spring Boot Backend – The Ultimate Mental Model & Study Guide

## 🛣️ 1. BIG PICTURE – REQUEST LIFE CYCLE

```
CLIENT (Browser / Mobile / Frontend)
        ↓
HTTP REQUEST
        ↓
FILTERS (Servlet level)
        ↓
INTERCEPTORS (Spring level)
        ↓
CONTROLLER (API layer)
        ↓
SERVICE (Business rules)
        ↓
REPOSITORY (Database access)
        ↓
DATABASE
```

Then response goes back the same way ↑

---

## 🔹 2. FILTERS (LOWEST LEVEL)

### What is a Filter?

A **Filter** is a Java Servlet component that:

* Runs **before Spring**
* Works on **raw HTTP request & response**
* Does NOT know about controllers or methods

Think of it as:

> 🛂 Airport Security
>
> Everyone passes through. No exceptions.

---

### Why Filters Exist

Filters are used when you want to:

* Check something for **every request**
* Modify headers
* Reject requests early

Typical use cases:

* JWT authentication
* Logging
* CORS handling
* Request compression

---

### Real‑World Example

**JWT Authentication Filter**

Steps:

1. Extract `Authorization` header
2. Validate token
3. Set user details in context
4. Continue request

If token invalid → block request ❌

---

### Key Characteristics

| Feature             | Filter        |
| ------------------- | ------------- |
| Knows controller?   | ❌ No          |
| Runs before Spring? | ✅ Yes         |
| Can block request?  | ✅ Yes         |
| Used for auth?      | ✅ Very common |

---

## 🔹 3. INTERCEPTORS (SPRING LEVEL)

### What is an Interceptor?

Interceptor is:

* Spring‑specific
* Knows **which controller & method** is being called

Think of it as:

> 👮 Security guard outside a specific room

---

### Why Interceptors Exist

Used when logic depends on:

* Controller
* Endpoint
* User role

Use cases:

* Authorization (ADMIN / USER)
* Logging user actions
* Performance measurement

---

### Interceptor Lifecycle

1. `preHandle()` → before controller
2. `postHandle()` → after controller
3. `afterCompletion()` → after response sent

---

### Filter vs Interceptor (IMPORTANT)

| Feature              | Filter  | Interceptor  |
| -------------------- | ------- | ------------ |
| Level                | Servlet | Spring       |
| Controller awareness | ❌       | ✅            |
| Authentication       | ✅       | ⚠️ sometimes |
| Authorization        | ❌       | ✅            |

---

## 🔹 4. CONTROLLERS (API LAYER)

### What is a Controller?

Controller:

* Receives HTTP requests
* Maps URLs to Java methods
* Returns HTTP responses

Think of it as:

> 📞 Call center agent

---

### What Controllers SHOULD Do

✅ Read request
✅ Validate input
✅ Call service
✅ Return response

### What Controllers SHOULD NOT Do

❌ Business logic
❌ Database logic
❌ Complex rules

---

### Example

```
GET /tasks/1
```

Controller responsibility:

* Extract `id`
* Call service
* Return 200 or 404

---

## 🔹 5. RESPONSEENTITY (HTTP CONTROL)

### What is ResponseEntity?

`ResponseEntity<T>` represents:

```
Status Code + Headers + Body
```

Why it matters:

* REST is about **correct HTTP responses**

---

### Real Example

| Situation     | Status          |
| ------------- | --------------- |
| Found         | 200 OK          |
| Created       | 201 CREATED     |
| Invalid input | 400 BAD REQUEST |
| Not found     | 404 NOT FOUND   |
| No content    | 204 NO CONTENT  |

---

## 🔹 6. OPTIONAL (NULL SAFETY)

### What is Optional?

`Optional<T>` means:

> "This value may or may not exist"

Instead of returning `null`, you return a **box**.

---

### Why Optional Exists

* Avoid NullPointerException
* Force developer to think about empty case

---

### Optional in Repositories

```
Optional<User> findById(Long id);
```

Because:

* Row may not exist

---

## 🔹 7. SERVICES (BUSINESS LOGIC)

### What is a Service?

Service is:

* Brain of application
* Contains rules & workflows

Think of it as:

> 🧠 Decision maker

---

### What Goes in Service

✅ Business rules
✅ Validation logic
✅ Transactions

### What Does NOT Go in Service

❌ HTTP logic
❌ Request parsing

---

### Real Example

Rule:

> User can delete task only if he owns it

This logic belongs in **service**, NOT controller.

---

## 🔹 8. REPOSITORIES (DATABASE ACCESS)

### What is a Repository?

Repository:

* Talks to database
* Uses JPA/Hibernate

Think of it as:

> 🗄️ Librarian

---

### Responsibilities

* Save
* Find
* Delete
* Query

No business rules ❌

---

## 🔹 9. ENTITIES (DATABASE MODEL)

### What is an Entity?

Entity:

* Maps to DB table
* Annotated with `@Entity`

Each instance = one row

---

### What NOT to Do

❌ Send entity directly to frontend
❌ Add business logic

---

## 🔹 10. DTOs (DATA TRANSFER OBJECTS)

### Why DTOs Exist

Problems with entities:

* Expose DB structure
* Security risk
* Tight coupling

DTOs solve this.

---

### Example

UserEntity:

* id
* email
* password

UserResponseDTO:

* id
* email

Password never leaves backend 🔐

---

## 🔹 11. PAGINATION (SCALABILITY)

### What is Pagination?

Instead of:

```
SELECT * FROM users;
```

You do:

```
SELECT * FROM users LIMIT 10 OFFSET 0;
```

---

### Why Pagination Matters

* Performance
* Memory safety
* Scalability

---

### Spring Tools

* Pageable
* Page<T>
* Slice<T>

---

## 🔹 12. EXCEPTION HANDLING

### Why Centralized Handling

Without it:

* try/catch everywhere
* messy code

---

### Solution

`@ControllerAdvice`

Handles:

* Not found
* Validation errors
* Unauthorized

---

## 🔹 13. VALIDATION

### Purpose

Ensure incoming data is correct BEFORE business logic.

---

### Common Annotations

* @NotNull
* @NotBlank
* @Size
* @Email

---

## 🔹 14. TRANSACTIONS

### What is a Transaction?

> All operations succeed OR all fail

---

### Example

Order creation:

1. Save order
2. Reduce stock
3. Create payment

If step 2 fails → rollback everything

---

## 🔹 15. SECURITY (HIGH LEVEL)

### Authentication

> Who are you?

JWT, session, OAuth

---

### Authorization

> What can you do?

Roles, permissions

---

## 🧩 FINAL MENTAL MODEL

| Layer       | Purpose            |
| ----------- | ------------------ |
| Filter      | Raw request checks |
| Interceptor | Request control    |
| Controller  | HTTP handling      |
| Service     | Business rules     |
| Repository  | DB access          |
| Entity      | DB mapping         |
| DTO         | Safe data transfer |
| Pagination  | Performance        |

---
