$('.ui.checkbox')
  .checkbox()
;
$('.dropdown')
  .dropdown()
;

$('#regInnkommende .ui.checkbox')
.checkbox({
    onChecked: function() {
      $('#regInnkommende .datepicker').addClass('dont-show');
  },
    onUnchecked: function() {
     $('#regInnkommende .datepicker').removeClass('dont-show');
    }})
;


$('#regUtgaende .ui.checkbox')
.checkbox({
    onChecked: function() {
      $('#regUtgaende .datepicker').addClass('dont-show');
  },
    onUnchecked: function() {
     $('#regUtgaende .datepicker').removeClass('dont-show');
    }})
;
