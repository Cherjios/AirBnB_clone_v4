$(document).ready(function () {
  const amenityid = {};
  $('input[type="checkbox"]').click(function () {
    if ($(this).is(':checked')) {
      amenityid[$(this).attr('data-id')] = $(this).attr('data-name');
    } else if ($(this).is(':not(:checked)')) {
      delete amenityid[$(this).attr('data-id')];
    }
    const amenitylist = [];
    for (const key in amenityid) {
      amenitylist.push(amenityid[key]);
    }
    $('.amenities h4').text(amenitylist.join(', '));
  });
});
