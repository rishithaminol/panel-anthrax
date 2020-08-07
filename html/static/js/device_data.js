var device_table = $('#device_table');

$('tbody', device_table).empty();

$.getJSON('./api/device_list', function(result){
  var l = result.length;
  var tmp = "";

  for (var i = 0; i < l; i++) {
    tmp = '<td>' + result[i]['mac_addr'] + '</td>' +
          '<td>' + result[i]['nick_name'] + '</td>' +
          '<td>' + result[i]['detail'] + '</td>' +
          '<td>' + result[i]['device_type'] + '</td>';

    $('tbody', device_table).append('<tr>' + tmp + '</tr>');
  }
  $(device_table).DataTable();
});
