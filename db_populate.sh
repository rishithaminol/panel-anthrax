#!/usr/bin/env bash

cd $(dirname `realpath $0`)
sqlite3 panel_anthrax.db < database.sql
