-- MODELO DE REFERÊNCIA. Ainda não há banco conectado nem migrações executadas.
CREATE TABLE categories (id TEXT PRIMARY KEY, name TEXT NOT NULL);
CREATE TABLE products (id TEXT PRIMARY KEY, category_id TEXT REFERENCES categories(id), title TEXT NOT NULL, description TEXT NOT NULL, condition TEXT NOT NULL, price_cents INTEGER NOT NULL CHECK(price_cents >= 0), active BOOLEAN NOT NULL DEFAULT TRUE, created_at TIMESTAMP NOT NULL);
CREATE TABLE product_images (id TEXT PRIMARY KEY, product_id TEXT NOT NULL REFERENCES products(id), storage_key TEXT NOT NULL, sort_order INTEGER NOT NULL DEFAULT 0);
CREATE TABLE inventory (product_id TEXT PRIMARY KEY REFERENCES products(id), quantity INTEGER NOT NULL CHECK(quantity >= 0), updated_at TIMESTAMP NOT NULL);
CREATE TABLE admin_users (id TEXT PRIMARY KEY, email TEXT UNIQUE NOT NULL, password_hash TEXT NOT NULL, role TEXT NOT NULL, active BOOLEAN NOT NULL DEFAULT TRUE);
CREATE TABLE customers (id TEXT PRIMARY KEY, name TEXT NOT NULL, phone TEXT NOT NULL, email TEXT, created_at TIMESTAMP NOT NULL);
CREATE TABLE orders (id TEXT PRIMARY KEY, customer_id TEXT NOT NULL REFERENCES customers(id), status TEXT NOT NULL, fulfillment TEXT NOT NULL, subtotal_cents INTEGER NOT NULL, delivery_address_json TEXT, freight_cents INTEGER, freight_status TEXT, created_at TIMESTAMP NOT NULL);
CREATE TABLE order_items (id TEXT PRIMARY KEY, order_id TEXT NOT NULL REFERENCES orders(id), product_id TEXT NOT NULL REFERENCES products(id), title_snapshot TEXT NOT NULL, unit_price_cents INTEGER NOT NULL, quantity INTEGER NOT NULL);
CREATE TABLE payments (id TEXT PRIMARY KEY, order_id TEXT NOT NULL REFERENCES orders(id), provider TEXT NOT NULL, provider_reference TEXT, status TEXT NOT NULL, amount_cents INTEGER NOT NULL, created_at TIMESTAMP NOT NULL);
CREATE TABLE order_history (id TEXT PRIMARY KEY, order_id TEXT NOT NULL REFERENCES orders(id), actor_admin_id TEXT REFERENCES admin_users(id), old_status TEXT, new_status TEXT NOT NULL, note TEXT, created_at TIMESTAMP NOT NULL);
