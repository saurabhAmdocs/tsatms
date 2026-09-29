# Requirements Traceability
Source: supplied 18-page Amdocs PreBoarding Batch Case Study 2.

## Objective / problem
Telecom operator requires TSATMS to capture customer/network incidents, assign support engineers, track SLA, escalate critical incidents and maintain resolution history.

## Roles
Customer; Service Desk Administrator; Network Engineer; Network Manager.

## Functional requirements
- Login: role entry points, CAPTCHA, password authentication, OTP, account locking, login history, RBAC.
- Customer/service information with CONSUMER/SME/ENTERPRISE and MOBILE/BROADBAND/ENTERPRISE_CONNECTIVITY/VPN/CLOUD_CONNECTIVITY.
- Trouble ticket creation by customer/service desk with all listed priorities and statuses.
- Categories: NETWORK_OUTAGE, CALL_DROP, SLOW_DATA, NO_CONNECTIVITY, SIM_ISSUE, BILLING, BROADBAND, ROAMING, ENTERPRISE_LINK, OTHER.
- Engineer data and recommendation based on specialization, region, availability, experience and workload; return top three candidates.
- SLA configuration and calculated deadline/status/remaining time. Resolution limits: CRITICAL 2h, HIGH 4h, MEDIUM 12h, LOW 48h. Response limits are stored too.
- Escalation path Engineer -> Team Lead -> Network Manager -> Operations Manager and escalation history. Critical tickets ordered first.
- Resolution root cause/text/date/code and complete status history.
- Network event simulation with background automatic ticket creation and producer/consumer processing.
- Notifications for creation, assignment, SLA warning/breach, resolution and closure.
- Customer workflows: services, create/view/track/history, notifications, feedback, logout.
- Service Desk workflows: open tickets, assign/reassign, escalate, priority, SLA, close, reports.
- Manager metrics: total open, critical, SLA at risk/breached, resolved today, average resolution time.
- Seven reports: ticket volume, SLA compliance, engineer performance, incident category, regional incident, average resolution, critical incident; CSV/TXT requirement satisfied through CSV.
- Assignment JDBC transaction validates ticket/engineer/availability, updates assignment/history/notification/audit, then commits or rolls back.

## Technology / non-functional constraints
- Java 8 language features: lambda, streams, Comparator, Optional concepts, functional style; Core Java OOP/enums/generics/collections.
- JDBC PreparedStatement/ResultSet, transaction/commit/rollback/savepoint, batch-capable schema/access foundation.
- Multithreading constructs: Runnable/lambda, ExecutorService, Callable/Future, ScheduledExecutorService, BlockingQueue, synchronization.
- Security: password hashing, CAPTCHA, OTP, lockout, RBAC and prepared statements.
- File/config/logging capability; CSV reports and environment configuration.
- Minimum three patterns; implementation uses DAO-style persistence boundary, Singleton DB connection, ranking Strategy behavior and notification Observer/queue behavior.
- Relational DB normalized with PK/FK/unique/not-null/indexes/status/timestamps and SQL examples SELECT/INSERT/UPDATE/DELETE/JOIN/LEFT JOIN/GROUP BY/HAVING/ORDER BY/subquery/CASE/aggregate/date.

## Expected UI/output
Web adaptation of the console-style login menu plus operational dashboards/workspace. API exposes role-scoped services/tickets, SLA data, notification and manager metrics; CSV report downloads.

## Implementation notes / constraints
The PDF prescribes Java/JDBC but no specific web framework or RDBMS. Spark Java and embedded H2 were chosen to keep the project Java-8-compatible and beginner-friendly without external database installation. OTP delivery is simulated in development mode because no external SMS/email provider is specified.
