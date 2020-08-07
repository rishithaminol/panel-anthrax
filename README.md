# Panel Anthrax

# How to start

`npm install` and run `npm run start` as sudo user.

#### Basic Routes
`/arp_table` - Which shows current ARP table on local network

#### Files
- `html/` - The static web content directory.
- `html/js/arp_table.js` - This is the client side javascript which helps to make dynamic `'html/arp_table.html'`.
- `html/arp_table.html` - This is the main arp table display panel which currently running on the local network.
- `src/addrwatch.js` - Creates a common way to fetch addrwatch's data line by line. User should give the running interface to this module.
