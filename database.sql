CREATE TABLE "mac_nick_data" (
	"id_"	INTEGER PRIMARY KEY AUTOINCREMENT,
	"mac_addr"	TEXT NOT NULL UNIQUE,
	"nick_name"	TEXT,
	"detail"	TEXT,
	"device_type"	TEXT
);
