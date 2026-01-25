CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,

    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,

    status VARCHAR(50),
    role VARCHAR(50),

    created_at TIMESTAMP(6) NOT NULL,

    pharmacy_id BIGINT,

    CONSTRAINT fk_users_pharmacy
        FOREIGN KEY (pharmacy_id)
        REFERENCES pharmacy(id)
);
