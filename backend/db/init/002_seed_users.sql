INSERT INTO users (name, email, password_hash, role) VALUES
  (
    'Asesor User',
    'asesor@example.com',
    '$2b$10$2JsIEzRqpcBoELL9Ca4HuOAqykV8413tdCTrxqMFZCoPhOa4ocIii',
    'asesor'
  ),
  (
    'Moderador User',
    'moderador@example.com',
    '$2b$10$JogFHaMcWg13XxxOlApPr.gyCkjTb7mtCodGME8flH9ezGobo4EoK',
    'moderador'
  ),
  (
    'Supervisor User',
    'supervisor@example.com',
    '$2b$10$uxWEBwdfWmNwxnNYuP9zhO4wePyg0GI/2bV8VBe66O98qkJxk7ABu',
    'supervisor'
  )
ON CONFLICT (email) DO NOTHING;
