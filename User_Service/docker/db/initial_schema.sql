CREATE TABLE user (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    roles VARCHAR(255) NOT NULL,
    token VARCHAR(255),
    profilePicture VARCHAR(255),
    verificationCode CHAR(6), -- Código de 6 dígitos
    codeExpiry TIMESTAMP       -- Data e hora de expiração do código
);
