process.env.NODE_ENV = "test";
process.env.DATABASE_URL ||= "postgresql://user:pass@localhost:5432/shield";
process.env.JWT_ACCESS_SECRET ||= "test-access-secret-with-at-least-32-characters";
process.env.JWT_REFRESH_SECRET ||= "test-refresh-secret-with-at-least-32-characters";
process.env.NOTCHPAY_WEBHOOK_SECRET ||= "test-webhook-secret";
