drop table if exists sessions;

drop table if exists totp_keys;

drop table if exists users;

CREATE TABLE IF NOT EXISTS users (
    user_id integer PRIMARY KEY AUTOINCREMENT,
    name text NOT NULL,
    email text NOT NULL UNIQUE,
    create_at text NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS totp_keys (
    totp_key text PRIMARY KEY,
    user_id integer not null,
    FOREIGN KEY (user_id) REFERENCES users (user_id)
);

CREATE TABLE IF NOT EXISTS sessions (
    session text PRIMARY KEY,
    user_id integer not null,
    expires_at text not null,
    FOREIGN KEY (user_id) REFERENCES users (user_id)
);