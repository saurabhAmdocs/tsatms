-- Representative SQL required by the case study.
SELECT t.status, COUNT(*) total FROM trouble_tickets t GROUP BY t.status HAVING COUNT(*) >= 1 ORDER BY total DESC;
SELECT t.ticket_number,c.customer_name,s.service_name,e.engineer_name FROM trouble_tickets t JOIN customers c ON c.customer_id=t.customer_id JOIN telecom_services s ON s.service_id=t.service_id LEFT JOIN network_engineers e ON e.engineer_id=t.assigned_engineer_id;
SELECT * FROM trouble_tickets WHERE priority=(SELECT priority FROM sla_configuration ORDER BY resolution_minutes LIMIT 1);
SELECT priority, CASE WHEN CURRENT_TIMESTAMP>sla_deadline THEN 'BREACHED' ELSE 'ACTIVE' END sla_state, AVG(CASE WHEN resolution_date IS NULL THEN NULL ELSE DATEDIFF('MINUTE',created_date,resolution_date) END) avg_minutes FROM trouble_tickets GROUP BY priority,CASE WHEN CURRENT_TIMESTAMP>sla_deadline THEN 'BREACHED' ELSE 'ACTIVE' END;
-- DELETE example (kept safe): DELETE FROM notifications WHERE read_status=TRUE AND created_date < DATEADD('DAY',-90,CURRENT_TIMESTAMP);
