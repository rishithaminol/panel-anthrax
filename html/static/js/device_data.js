var device_table = $('#device_table');

$('tbody', device_table).empty();

$.getJSON('/device_list', function(result){
  var l = result.length;
  var tmp = "";

  for (i = 0; i < l; i++) {
    tmp = '<td>' + result[i]['mac'] + '</td>' +
          '<td>' + result[i]['nick_name'] + '</td>' +
          '<td>' + result[i]['detail'] + '</td>' +
          '<td>' + result[i]['role'] + '</td>';

    $('tbody', device_table).append('<tr>' + tmp + '</tr>');
  }
  $('#device_table').DataTable();
});
