CREATE TABLE IF NOT EXISTS assessments (
    id BIGSERIAL PRIMARY KEY,
    ailment_code VARCHAR(255) NOT NULL,
    assessment_data JSONB NOT NULL,
    pdf_url VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
