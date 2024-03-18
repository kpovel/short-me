create table links (
    id        integer primary key autoincrement,
    url       text    not null unique,
    shortpath text    not null unique,
    usage     integer not null default 0
);

