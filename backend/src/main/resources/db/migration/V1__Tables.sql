CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email VARCHAR(320) UNIQUE NOT NULL,
    first_name VARCHAR(64) NOT NULL,
    last_name VARCHAR(64) NOT NULL,
    hash VARCHAR(64) NOT NULL
);

CREATE TABLE IF NOT EXISTS books (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY, -- id also serves as file name
    owner_id UUID NOT NULL REFERENCES users ON DELETE CASCADE,
    title VARCHAR(256) NOT NULL, -- title should be unique to the owner
    author VARCHAR(256) NOT NULL DEFAULT ''
);
