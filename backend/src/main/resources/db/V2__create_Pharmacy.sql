CREATE TABLE IF NOT EXISTS pharmacy (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    address VARCHAR(255),
    phone VARCHAR(255),
    fax VARCHAR(255),
    logo_url VARCHAR(255),
	stripe_customer_id varchar(255) NULL,
    created_at TIMESTAMP NOT NULL
);