$(document).ready(function () {
  const amenityid = {};
  $('input[type="checkbox"]').click(function () {
    if ($(this).is(':checked')) {
      amenityid[$(this).attr('data-id')] = $(this).attr('data-name');
    } else if ($(this).is(':not(:checked)')) {
      delete amenityid[$(this).attr('data-id')];
    }
    const amenitylist = [];
    for (const key in amenitylist) {
      amenitylist.push(amenityid[key]);
    }
    $('.amenities h4').text(amenitylist.join(', '));
  });
  $.get('http://0.0.0.0:5001/api/v1/status/', function (response) {
    if (response.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').toggleClass('available');
    }
  });
  $('button').click(function () {
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({ amenities: Object.keys(amenityid) }),
      success: function (response) {
        $('article').remove();
        $.each(response, function (k, v) {
          $(`<article>
<div class="title">
<h2>${v.name}</h2>
<div class="price_by_night">
${v.price_by_night}
</div>
</div>
<div class="information">
<div class="max_guest">
<i class="fa fa-users fa-3x" aria-hidden="true"></i>
<br />
${v.max_guest} Guests
</div>
<div class="number_rooms">
<i class="fa fa-bed fa-3x" aria-hidden="true"></i>
<br />
${v.number_rooms} Bedrooms
</div>
<div class="number_bathrooms">
<i class="fa fa-bath fa-3x" aria-hidden="true"></i>
<br />
${v.number_bathrooms} Bathroom
</div>
</div>
<div class="user">
<strong>Owner: PLACEHOLDER</strong>
</div>
<div class="description">
${v.description}
</div>
</article>`).appendTo('.places');
        });
      }
    });
  });
});
