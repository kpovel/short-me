create table links_temp (
    id         integer primary key autoincrement,
    url        text                not null unique,
    shortpath  text                not null unique,
    usage      integer   default 0 not null,
    created_at timestamp default current_timestamp
);

insert into links_temp
select id, url, shortpath, usage, null
from links;

alter table links_temp rename to links;
