CREATE TABLE users (
    id BIGINT PRIMARY KEY,
    pharmacy_id BIGINT,
    email VARCHAR(255),
    password VARCHAR(255),
    created_at TIMESTAMP(6) WITHOUT TIME ZONE
);
