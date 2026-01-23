CREATE INDEX idx_products_fulltext
ON products
USING GIN (to_tsvector('english', name || ' ' || description));
