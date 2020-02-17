$(document).ready(function () {
  let amenityid = {};
  $('input[type="checkbox"]').click(function () {
    if ($(this).is(':checked')) {
      amenityid[$(this).attr('data-id')] = $(this).attr('data-name');
    } else if ($(this).is(':not(:checked)')) {
      delete amenityid[$(this).attr('data-id')];
    }
    let amenitylist = [];
    for (let key in amenitylist) {
      amenitylist.push(amenityid[key]);
    }
    $('.amenities h4').text(amenitylist.join(', '));
  });
});
