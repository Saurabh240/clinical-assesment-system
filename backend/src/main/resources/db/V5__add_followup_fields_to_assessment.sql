ALTER TABLE assessment
ADD COLUMN last_followup_date TIMESTAMP WITH TIME ZONE;

-- Add follow-up status
ALTER TABLE assessment
ADD COLUMN followup_status VARCHAR(20);