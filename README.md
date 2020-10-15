# Panel Anthrax

A tool to monitor your network ARP activity. This tool keeps eye on every ARP messages hitting your network interfaces and match each MAC address with the entries of existing database. Interface will show you only mac address of the device, if it does not exist in the database information. And any time you can update the information of that mac address and give it a human readable name where you can identify uniquely that device later.

## why?

I was using arp monitoring tools to keep an eye on my network's ARP activity but. Those tools had huge logs and lack of device type identification based on MAC. So I designed my own version of UI as a solution using arp monitoring tools as backend.

# Installing dependancies

## Fedora/RHEL/CentOS
Please fetch and compile the binary if your linux distribution package management does not have [addrwatch](https://github.com/fln/addrwatch).

    dnf install addrwatch sqlite3-devel

Next install Nodejs (12.x LTS at the time of writing this). You had better if you use [Nodesource](https://github.com/nodesource/distributions#enterprise-linux-based-distributions).

    npm install

Create and populate main database file `panel_anthrax.db` on the root directory of the project.

    ./db_populate.sh

As root user you can run the command

    node server.js -i <your network interface to monitor>

In your browser open the url [http://localhost:3000](http://localhost:3000)

# Updating new data

In order to update new data you have to click on the mac address and save your information on the popup window and click save. Next time when your arp table automatically refresh it will show your nick name instead of mac address on the table.

![UI window](./panel_anthrax-screenshot.png)

Edit form

![Edit window](./panel_anthrax-edit.png)
