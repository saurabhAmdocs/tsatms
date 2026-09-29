# Telecom Service Assurance & Trouble Ticket Management System (TSATMS)

## Objective
A complete Java/JDBC training implementation of the supplied telecom case study: capture incidents, assign engineers, track/escalate SLA, process network events, notify users and retain resolution/audit history.

## Features
Four role logins, CAPTCHA + BCrypt password + OTP + lockout + login history + RBAC; services; tickets and history; engineer recommendation; SLA deadline/status/remaining time; assignment transaction with rollback/savepoint; escalation; resolution codes; background network-event producer/consumer; SLA and notification schedulers; customer/service-desk/manager workflows; feedback; seven asynchronous CSV reports; normalized H2 database.

Java 8 features are used directly: lambdas, streams, comparators, Optional-style nullable filtering, method references/lambda targets and collections. Concurrency uses Runnable/lambdas, Callable/Future, ExecutorService, ScheduledExecutorService, BlockingQueue and synchronization. Patterns include DAO-style JDBC separation, Singleton database connection, Strategy-like engineer ranking and Observer-like queued notifications.

## Tech stack
Java 8 language target, Spark Java 2.9.4, H2 2.2.224, JDBC, Jackson, BCrypt, Maven, JUnit 5, vanilla HTML/CSS/JS.

## Prerequisites
Windows/Linux/macOS: JDK 17 recommended (Java 8+ compatible source target), Maven 3.9+ OR use Maven Wrapper after generating it, and a browser. Git is optional. Docker and Node.js are not required.

## Installation / configuration
Copy `.env.example` values into environment variables if defaults are unsuitable. Defaults use local H2 file `./data/tsatms` and port 8080. `OTP_MODE=development` shows the OTP in the login response/UI for local demonstration. Production must replace this with an SMS/email provider and HTTPS.

## Database setup
No external server is needed. `database/schema.sql` is applied automatically and seed records are inserted on startup. `database/analytics.sql` demonstrates required SQL forms.

## Build and run backend + frontend
```bash
mvn clean test package
java -jar target/tsatms.jar
```
Open http://localhost:8080. The browser UI is served by the Java backend.

Demo users:

| Username | Password |
| --- | --- |
| `customer` | `Customer@123` |
| `desk` | `Desk@123` |
| `engineer` | `Engineer@123` |
| `manager` | `Manager@123` |

## Tests
```bash
mvn test
```

## Example API usage
```bash
curl http://localhost:8080/api/auth/captcha
curl http://localhost:8080/api/health
```
Authenticated endpoints require `Authorization: Bearer <token>`. See `API_DOCUMENTATION.md`.

## Troubleshooting
- `mvn` not found: install Maven 3.9+ or use the Maven Wrapper files if present.
- Port busy: set `PORT=8081`.
- Reset demo DB: stop app and delete `data/tsatms.mv.db`.
- Database startup errors: launch from project root so `database/schema.sql` is available.
- Java error: verify `java -version` and `javac -version`.
