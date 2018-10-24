var oui = require('oui');

/* main_arp_table = [ {
  mac_addr: "ma:cm:ac:ma:cm:ac",
  nick_name: nick_name,
  vendor: "Huawei",
  ip_addr: "192.168.1.1",
  eth_interface: "wlan0",
  last_seen: 1527356226
}, ...
];
*/
var main_arp_table = [];
var arp_changes_table = [];

/*
 * Check the availability of the mac address inside dynamic 'main_arp_table'
 * and return the index. if not found return -1
 */
function is_found_on_arp_table(mac_addr) {
  var i = -1; // Availability
  main_arp_table.every(function(data, index){
    if (data['mac_addr'] === mac_addr) {
      i = index;
      console.log('mac address:' + data['mac_addr'] + ' available on ARP table.');
      return false; // break every()
    } else {
      return true; // continue every()
    }
  });

  return i;
}

function update_arp_table(mac_addr, nick_name, ip_addr, eth_interface, last_seen) {
  var vendor = oui(mac_addr);
  if (vendor === null) {
    vendor = "(Unknown)";
  } else {
    vendor = vendor.split('\n')[0];
  }

  if (main_arp_table.length === 0) {
    main_arp_table = main_arp_table.concat([{
      mac_addr: mac_addr,
      nick_name: nick_name,
      vendor: vendor,
      ip_addr: ip_addr,
      eth_interface: eth_interface,
      last_seen: last_seen
    }]);

    return;
  }

  var x = is_found_on_arp_table(mac_addr);
  if (x >= 0) {
    console.log('updating existing mac_addr:' + mac_addr);
    // this step may be usable for ARP poisoning detection
    if (main_arp_table[x]['ip_addr'] != ip_addr){
      var tmp = {
        mac_addr: main_arp_table[x]['mac_addr'],
        nick_name: main_arp_table[x]['nick_name'],
        vendor: main_arp_table[x]['vendor'],
        ip_addr: main_arp_table[x]['ip_addr'],
        eth_interface: main_arp_table[x]['eth_interface'],
        last_seen: main_arp_table[x]['last_seen'],
        to_ip_addr: ip_addr
      };
      arp_changes_table.unshift(tmp);
    }
    main_arp_table[x]['ip_addr'] = ip_addr;
    main_arp_table[x]['nick_name'] = nick_name;
    main_arp_table[x]['eth_interface'] = eth_interface;
    main_arp_table[x]['last_seen'] = last_seen;
  } else {
    console.log('mac:' + mac_addr + ' not found on the ARP table. Inserting');
    main_arp_table = main_arp_table.concat([{
      mac_addr: mac_addr,
      nick_name: nick_name,
      vendor: vendor,
      ip_addr: ip_addr,
      eth_interface: eth_interface,
      last_seen: last_seen
    }]);
  }

  if (main_arp_table.length > 1)
    sort_main_arp_table();
}

// Sort main arp table according to the last_seen time
function sort_main_arp_table()
{
  var i, j;

  for (i = main_arp_table.length - 1; i > 0; i--) {
    for (j = 0; j < i; j++) {
      if (main_arp_table[j].last_seen < main_arp_table[j + 1].last_seen) {
        var x = main_arp_table[j + 1];
        main_arp_table[j + 1] = main_arp_table[j];
        main_arp_table[j] = x;
      }
    }
  }
}

function print_arp_table(){
  console.log('ARP Table');
  console.log('===========================');
  main_arp_table.forEach(function(data){
    console.log("mac_addr:" + data['mac_addr'] +
                " vendor:" + data['vendor'] +
                " nick_name:" + data['nick_name'] +
                " ip_addr:" + data['ip_addr'] +
                " eth_interface:" + data['eth_interface'] +
                " last_seen:" + data['last_seen']);
  });
  console.log('');
}

module.exports = {
	arp_table: function(){
    return main_arp_table;
  },
  arp_changes: function(){
    return arp_changes_table;
  },
	update: update_arp_table,
	print_arp_table: print_arp_table
};
