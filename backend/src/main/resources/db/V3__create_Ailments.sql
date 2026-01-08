CREATE TABLE IF NOT EXISTS ailments (
    id BIGSERIAL PRIMARY KEY,
    code VARCHAR(255) UNIQUE,
    name VARCHAR(255),
    fields_config JSONB,
    active BOOLEAN
);
