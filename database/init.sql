CREATE TABLE rooms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  images JSONB NOT NULL,
  price INT NOT NULL,
  description TEXT DEFAULT '',
  address VARCHAR(255) NOT NULL,
  capacity INT NOT NULL
);

CREATE TABLE payments (
  id UUID PRIMARY KEY,
  amount INT NOT NULL,
  item JSONB NOT NULL,
  customer TEXT NOT NULL,
  status VARCHAR(20) NOT NULL,
  message TEXT,
  external_id UUID NOT NULL
);

CREATE TABLE bookings (
    id UUID PRIMARY KEY,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    room_id UUID NOT NULL,
    payment_id UUID NOT NULL
);