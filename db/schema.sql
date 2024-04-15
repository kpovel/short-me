create table links (
    id        integer primary key autoincrement,
    url       text    not null unique,
    shortpath text    not null unique,
    usage     integer not null default 0,
    created_at timestamp default current_timestamp
);
