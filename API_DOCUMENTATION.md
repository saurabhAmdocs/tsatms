# REST API
All request/response bodies are JSON unless noted. Get a CAPTCHA, submit credentials, verify OTP, then send `Authorization: Bearer <token>`.

- `GET /api/health` health
- `GET /api/auth/captcha` returns captchaId + development captcha
- `POST /api/auth/login` `{username,password,captchaId,captcha}`
- `POST /api/auth/otp` `{username,otp}` -> token
- `POST /api/auth/logout`
- `GET /api/services?customerId=` active/service data, customer scoped for Customer
- `GET /api/tickets` role-scoped tickets with SLA status/remaining time
- `POST /api/tickets` Customer/Service Desk: `{customerId?,serviceId,category,description,priority,severity}`
- `GET /api/tickets/{id}/history`
- `PUT /api/tickets/{id}/status` `{status,remarks}`
- `PUT /api/tickets/{id}/priority` Service Desk/Manager
- `POST /api/tickets/{id}/assign` `{engineerId}` transactional
- `POST /api/tickets/{id}/escalate` `{fromLevel,toLevel,reason}`
- `POST /api/tickets/{id}/resolve` `{rootCause,resolution,resolutionCode}` Engineer/Manager
- `GET /api/engineers/recommend?specialization=&region=` top 3
- `POST /api/events` `{eventId,networkNode,eventType,severity}`; CRITICAL/LINK_DOWN can auto-create a ticket
- `GET /api/notifications`
- `POST /api/feedback` Customer: `{ticketId,rating,comments}`
- `GET /api/dashboard/manager`
- `GET /api/reports/{name}` CSV. Names: `ticket-volume`, `sla-compliance`, `engineer-performance`, `incident-category`, `regional-incident`, `average-resolution`, `critical-incident`.
