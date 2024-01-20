 CREATE TABLE clientes (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255),
  email VARCHAR(255),
  telefone VARCHAR(20),
  coordenada_x FLOAT,
  coordenada_y FLOAT
);

INSERT INTO clientes (nome, email, telefone, coordenada_x, coordenada_y)
VALUES
  ('Harry Potter', 'harry@email.com', '123-456-7890', 40.7128, -74.0060),
  ('Wonder Woman', 'wonder@email.com', '987-654-3210', 34.0522, -118.2437),
  ('Darth Vader', 'darth@email.com', '555-123-4567', 41.8781, -87.6298),
  ('Elsa', 'elsa@email.com', '999-888-7777', 51.5074, -0.1278),
  ('Spider-Man', 'spider@email.com', '777-888-9999', -23.5505, -46.6333),
  ('Hermione Granger', 'hermione@email.com', '333-444-5555', 51.1657, 10.4515),
  ('Iron Man', 'iron@email.com', '222-333-4444', 37.7749, -122.4194),
  ('Mickey Mouse', 'mickey@email.com', '111-222-3333', 28.3852, -81.5639),
  ('Batman', 'bat@email.com', '444-555-6666', 35.6895, 139.6917),
  ('Princess Leia', 'leia@email.com', '666-777-8888', 48.8566, 2.3522);
