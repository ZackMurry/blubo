CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email VARCHAR(320) UNIQUE NOT NULL,
    first_name VARCHAR(64) NOT NULL,
    last_name VARCHAR(64) NOT NULL,
    hash VARCHAR(64) NOT NULL,
    pages_read INTEGER NOT NULL DEFAULT 0,
    pages_read_in_week INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS books (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY, -- id also serves as file name
    owner_id UUID NOT NULL REFERENCES users ON DELETE CASCADE,
    title VARCHAR(256) NOT NULL, -- title should be unique to the owner
    author VARCHAR(256) NOT NULL DEFAULT '',
    page_number INTEGER NOT NULL DEFAULT 1,
    last_opened TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS follows (
    follower_id UUID NOT NULL REFERENCES users ON DELETE CASCADE,
    followed_id UUID NOT NULL REFERENCES users ON DELETE CASCADE
);
