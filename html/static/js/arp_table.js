var edit_user = $('#editMacEntry');
var frm_edit_user = $('form.ui.form', edit_user);
var arp_table = $('#arp-table');

// At the time of clicking we fill the modal with this function
function edit_mac_entry(mac) {
  var socket = io();

  /*{
    availability: ...,
    mac: ...,
    nick_name: ...,
    detail: ...,
    role: ...
  }*/
  $.getJSON('./api/device_info/' + mac, function(data){
    /* if available */
    $("input[name=mac_addr]", frm_edit_user).val(mac);
    if (data !== null) {
      $("div.header", edit_user).html(data.nick_name);
      $("input[name=nick_name]", frm_edit_user).attr('value', data.nick_name);
      $("textarea[class=form-control]", frm_edit_user).text(data.detail);
      $("input[name=role]", frm_edit_user).attr("value", data.device_type);
    }
    $(edit_user).modal('show');
  }).fail(function(){
    $(frm_edit_user).form('reset');
    $("input[name=mac_addr]", frm_edit_user).val(mac);
    $(edit_user).modal('show');
  });

  return true;
}

function update_data() {
  var mac_addr = $("input[name=mac_addr]", frm_edit_user).val();
  var nick_name = $("input[name=nick_name]", frm_edit_user).val();
  var detail = $("textarea[class=form-control]", frm_edit_user).val();
  var role = $("input[name=role]", frm_edit_user).val();

  var x = {
    mac_addr: mac_addr,
    nick_name: nick_name,
    detail: detail,
    role: role
  }
  $.post('./api/add_new_device', x).done(function(data){
    console.log(data);
    $(edit_user).modal('hide');
  });
}

socket.on('arp table', function(data){
  $('tbody', arp_table).html('');
  $.each(data, function(index, value){
    var target_link;
    if (data[index].nick_name !== null) {
      target_link = data[index].nick_name;
    } else {
      target_link = data[index].mac_addr;
    }

    var $new_table_row = $('<tr> \
      <td><a href="#" onclick=\'return edit_mac_entry("' + data[index].mac_addr + '")\'>' + target_link + '</a></td> \
      <td>' + data[index].ip_addr + '</td> \
      <td>' + data[index].vendor + '</td> \
      <td>' + data[index].eth_interface + '</td> \
      <td>' + new Date(data[index].last_seen*1000).toLocaleString() + '</td> \
    </td>');

    $('tbody', arp_table).append($new_table_row);
  });
});

$(frm_edit_user).form({
  onSuccess: update_data
});

$(edit_user).modal({
  onHidden: function(){
    /* Clear the modal */
    $("div.header", edit_user).html("");
    $("input[name=mac_addr]", frm_edit_user).attr('value', "");
    $("input[name=nick_name]", frm_edit_user).attr('value', "");
    $("textarea[class=form-control]", frm_edit_user).text("");
    $("input[name=role]", frm_edit_user).attr("value", "");
  }
});

$(frm_edit_user).submit(function(e){
  return false;
});
