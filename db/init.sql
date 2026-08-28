CREATE TABLE IF NOT EXISTS quote_requests (
  id BIGSERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  organization TEXT,
  service_type TEXT NOT NULL,
  description TEXT NOT NULL,
  contact_method TEXT NOT NULL CHECK (contact_method IN ('Email', 'Phone')),
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Custody tracking system. These tables already exist in the Neon database
-- this app is deployed against; kept here as IF NOT EXISTS for reference and
-- for spinning up a fresh environment.
CREATE TABLE IF NOT EXISTS consignments (
  id SERIAL PRIMARY KEY,
  reference_number VARCHAR(50) UNIQUE NOT NULL,
  client_name VARCHAR(200) NOT NULL,
  client_email VARCHAR(200) NOT NULL,
  organization VARCHAR(200),
  movement_type VARCHAR(30) NOT NULL,   -- 'one_way' | 'custody'
  current_status VARCHAR(50) NOT NULL,
  current_location_city VARCHAR(100),
  current_location_country VARCHAR(100),
  origin_city VARCHAR(100),
  origin_country VARCHAR(100),
  destination_city VARCHAR(100),
  destination_country VARCHAR(100),
  custody_started_at TIMESTAMP,
  is_closed BOOLEAN DEFAULT false,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS consignment_items (
  id SERIAL PRIMARY KEY,
  consignment_id INTEGER NOT NULL REFERENCES consignments(id) ON DELETE CASCADE,
  asset_type VARCHAR(50) NOT NULL,
  description VARCHAR(300) NOT NULL,
  quantity VARCHAR(100),
  seal_number VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS custody_events (
  id SERIAL PRIMARY KEY,
  consignment_id INTEGER NOT NULL REFERENCES consignments(id) ON DELETE CASCADE,
  status VARCHAR(50) NOT NULL,
  location_city VARCHAR(100),
  location_country VARCHAR(100),
  note TEXT,
  occurred_at TIMESTAMP DEFAULT NOW(),
  email_sent BOOLEAN DEFAULT false
);
