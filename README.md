# Panel Anthrax

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
