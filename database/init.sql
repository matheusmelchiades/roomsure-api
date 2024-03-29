CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

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

INSERT INTO rooms (id, title, images, price, description, address, capacity) VALUES 
('d5b5a89f-7c18-4d94-8f0d-82965b7f69c1', 'Mountain Cabin Retreat', '["https://loremflickr.com/720/720/city", "https://loremflickr.com/720/720/city", "https://loremflickr.com/720/720/city"]', 15000, 'Cozy cabin nestled in the mountains, perfect for nature lovers.', '789 Mountain View Road, Mountain Town', 4),
('aa7bd1f1-6c25-41d1-926d-b7a1c2507b6a', 'City Center Apartment', '["https://loremflickr.com/720/720/city", "https://loremflickr.com/720/720/city", "https://loremflickr.com/720/720/city"]', 12000, 'Modern apartment located in the heart of the city.', '456 Downtown Avenue, City Center', 3),
('f84274d8-5759-4971-9d90-9b028f383a4f', 'Rustic Farmhouse', '["https://loremflickr.com/720/720/city", "https://loremflickr.com/720/720/city", "https://loremflickr.com/720/720/city"]', 20000, 'Charming farmhouse surrounded by fields and countryside.', '101 Farm Lane, Countryside', 8),
('1cb4c9c3-97c1-4912-a746-ae4018b69c52', 'Lakefront Cottage', '["https://loremflickr.com/720/720/city", "https://loremflickr.com/720/720/city", "https://loremflickr.com/720/720/city"]', 18000, 'Quaint cottage with stunning views of the lake.', '222 Lakefront Road, Lakeside', 5),
('8a7e76e5-0b52-4b87-8c0f-4cf10ad6d3a3', 'Luxury Penthouse Suite', '["https://loremflickr.com/720/720/city", "https://loremflickr.com/720/720/city", "https://loremflickr.com/720/720/city"]', 50000, 'Extravagant penthouse offering breathtaking city skyline views.', '789 Highrise Avenue, Sky City', 2),
('3b64d1f7-06c3-456b-8545-2f4cb17b8b0f', 'Seaside Bungalow', '["https://loremflickr.com/720/720/city", "https://loremflickr.com/720/720/city", "https://loremflickr.com/720/720/city"]', 25000, 'Charming bungalow steps away from the beach.', '333 Seaside Drive, Beachtown', 6),
('35b29f3f-86f5-4090-a519-7f6494c47114', 'Ski Chalet', '["https://loremflickr.com/720/720/city", "https://loremflickr.com/720/720/city", "https://loremflickr.com/720/720/city"]', 30000, 'Cosy chalet perfect for winter getaways, located near the ski slopes.', '456 Ski Lodge Road, Snow Valley', 6),
('2aa4ff64-21f4-4b67-88e3-1a203c6ef02c', 'Country Inn', '["https://loremflickr.com/720/720/city", "https://loremflickr.com/720/720/city", "https://loremflickr.com/720/720/city"]', 12000, 'Quaint inn with a warm and welcoming atmosphere.', '555 Inn Lane, Countryside', 10),
('f5301b6b-7207-4522-8a8b-c3f7cb031155', 'Historic Townhouse', '["https://loremflickr.com/720/720/city", "https://loremflickr.com/720/720/city", "https://loremflickr.com/720/720/city"]', 18000, 'Elegant townhouse steeped in history and charm.', '789 Heritage Street, Old Town', 4),
('0879f088-f54a-4bc7-9539-52632ab725a4', 'Riverside Cabin', '["https://loremflickr.com/720/720/city", "https://loremflickr.com/720/720/city", "https://loremflickr.com/720/720/city"]', 16000, 'Cozy cabin nestled alongside a picturesque river.', '999 Riverside Avenue, Riverfront', 4),
('bcde7be4-f0ab-4d6d-8342-1c3255b8cbed', 'Treetop Retreat', '["https://loremflickr.com/720/720/city", "https://loremflickr.com/720/720/city", "https://loremflickr.com/720/720/city"]', 20000, 'Unique treehouse retreat surrounded by lush forest.', '123 Forest Trail, Woodland', 2),
('9b1599a3-4c9a-4f7d-b2ac-702e1748d0fc', 'Urban Loft', '["https://loremflickr.com/720/720/city", "https://loremflickr.com/720/720/city", "https://loremflickr.com/720/720/city"]', 15000, 'Stylish loft apartment in the heart of the bustling city.', '456 Loft Street, Urbanville', 3),
('3a9a2f25-495d-44db-8f3b-4822fd8a180a', 'Countryside Cottage', '["https://loremflickr.com/720/720/city", "https://loremflickr.com/720/720/city", "https://loremflickr.com/720/720/city"]', 14000, 'Charming cottage surrounded by rolling hills and meadows.', '789 Cottage Lane, Countryside', 4),
('0d265e45-2ef2-4f56-94e4-3d740d5b70d3', 'Beach House', '["https://loremflickr.com/720/720/city", "https://loremflickr.com/720/720/city", "https://loremflickr.com/720/720/city"]', 30000, 'Spacious beach house with panoramic ocean views.', '555 Beachfront Road, Seaside', 8),
('e68dbb7e-33e3-4e09-8f37-fd56d693a605', 'Ski Lodge', '["https://loremflickr.com/720/720/city", "https://loremflickr.com/720/720/city", "https://loremflickr.com/720/720/city"]', 25000, 'Cosy lodge perfect for après-ski gatherings, located near the ski resort.', '333 Lodge Drive, Snow Valley', 10),
('6579ef2d-7b51-4fb8-94cc-bf9f0de245fc', 'Rustic Log Cabin', '["https://loremflickr.com/720/720/city", "https://loremflickr.com/720/720/city", "https://loremflickr.com/720/720/city"]', 18000, 'Traditional log cabin nestled in the forest, offering a peaceful retreat.', '222 Cabin Trail, Woodland', 6),
('62ab4502-07c1-4ef7-aef2-d2f83685ff86', 'Modern Condo', '["https://loremflickr.com/720/720/city", "https://loremflickr.com/720/720/city", "https://loremflickr.com/720/720/city"]', 20000, 'Sleek and contemporary condo with city views.', '789 Condo Lane, Downtown', 4),
('b3c46542-8705-4c17-81fb-4d059d511f3d', 'Cabin by the Lake', '["https://loremflickr.com/720/720/city", "https://loremflickr.com/720/720/city", "https://loremflickr.com/720/720/city"]', 22000, 'Quaint cabin overlooking a tranquil lake.', '456 Lakeview Road, Lakeside', 4),
('2b7b85fb-7e8c-4f17-9ee1-2c59e9e3cd19', 'City View Apartment', '["https://loremflickr.com/720/720/city", "https://loremflickr.com/720/720/city", "https://loremflickr.com/720/720/city"]', 18000, 'Bright and airy apartment with stunning city skyline views.', '789 Viewpoint Street, Cityscape', 2);