"""
Thin wrapper around `sqlacodegen`'s CLI.

TiDB reports its version as MySQL 8.0.11. SQLAlchemy has an internal
workaround for two old MySQL bugs (88718 / 96365) that only applies to
MySQL 8.0.1-8.0.13 -- but the workaround itself crashes with
`KeyError: 'TABLENAME'` when run against TiDB, because TiDB's
information_schema output doesn't match what real MySQL 8.0.1-8.0.13
returns.

TiDB doesn't have the casing bug the workaround exists for in the first
place, so it's safe to just disable it before reflecting the schema.
"""

from sqlalchemy.dialects.mysql.base import MySQLDialect

MySQLDialect._correct_for_mysql_bugs_88718_96365 = (
    lambda self, fkeys, connection: None
)

from sqlacodegen.cli import main

if __name__ == "__main__":
    main()
