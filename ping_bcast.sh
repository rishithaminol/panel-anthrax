#!/usr/bin/env bash

#
# Send ping messages to all available ip addresses. If available they will ping
# And they may reply with ARP packets.
#

for i in {1..254} ; do
  ( ping -n -c 1 -w 1 "192.168.8.$i" 1>/dev/null 2>&1 && printf "%-16s %s\n" "192.168.8.$i" responded ) &
done
