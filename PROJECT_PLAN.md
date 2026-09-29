# TSATMS Project Plan

## Requirements
Implement the Telecom Service Assurance & Trouble Ticket Management System from the supplied case study: four roles (Customer, Service Desk Administrator, Network Engineer, Network Manager), secure login (CAPTCHA, password hashing, OTP, account lock, login history, RBAC), customer/service data, trouble tickets and history, engineer recommendation, SLA calculation/monitoring, escalation, resolution, network-event producer/consumer automation, notifications, dashboards, feedback, async reports, and transactional JDBC ticket assignment.

Ticket priorities: LOW, MEDIUM, HIGH, CRITICAL. Ticket statuses: OPEN, ASSIGNED, IN_PROGRESS, PENDING_CUSTOMER, ESCALATED, RESOLVED, CLOSED, CANCELLED. Incident and resolution enums follow the PDF. Reports export CSV/TXT. SQL schema demonstrates normalization, PK/FK/unique/not-null/indexes/audit timestamps and representative JOIN/GROUP BY/HAVING/subquery/CASE/aggregate/date operations.

## Selected tech stack
- Java 8 source/target (case-study requirement), executable with JDK 17 installed here
- Maven 3.9.x Wrapper (project-local; no system Maven required)
- Spark Java 2.9.4 REST/web server (small Java-8-compatible framework)
- H2 2.2.224 relational database in file mode, plain JDBC
- Jackson 2.17.2 JSON, BCrypt 0.4, SLF4J Simple 2.0.16
- Vanilla HTML/CSS/JavaScript frontend
- JUnit 5 tests

## Architecture
Browser -> REST controllers -> service layer -> DAO/JDBC -> H2. Security is session-token RBAC. Background ExecutorService/ScheduledExecutorService workers perform event, SLA, notification and report processing. DAO, Singleton, Strategy and Observer patterns are explicitly represented.

## Folder structure
`src/main/java/com/amdocs/telecom` with controller, service/impl, dao/impl, model, dto, exception, validation, security, scheduler, report, util, main; resources/static frontend; database SQL; tests; documentation.

## Database design
Normalized users/customers/telecom_services/network_engineers/trouble_tickets/SLA configuration/status history/escalation history/network events/notifications/feedback/audit/login history tables. Foreign keys preserve ownership and ticket relationships. Assignment uses one JDBC transaction and rollback/savepoint semantics.

## API design
`/api/auth/*`, `/api/services`, `/api/tickets/*`, `/api/engineers/*`, `/api/events`, `/api/notifications`, `/api/feedback`, `/api/dashboard/manager`, `/api/reports/*`. JSON request/response except report downloads.

## Implementation phases
1. Schema and seed data
2. Models, enums, JDBC/DAO utilities
3. Authentication and RBAC
4. Ticket/SLA/assignment/escalation/resolution business logic
5. Background queues/processors and reporting
6. REST API and frontend dashboards
7. Automated tests, build/start/smoke-test
8. Documentation and Windows portability verification
