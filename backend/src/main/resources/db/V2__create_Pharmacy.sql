CREATE TABLE IF NOT EXISTS pharmacy (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255),
    address VARCHAR(255),
    fax VARCHAR(255),
    logo_url VARCHAR(255),
    phone VARCHAR(255),
    subscription_status VARCHAR(255),
    created_at TIMESTAMP(6) WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
