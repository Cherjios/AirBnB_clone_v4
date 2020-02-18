$(document).ready(function () {
  $('.places h1').css('display', 'none');
  $('.locations input').css('margin-right', '10px');
  let states = {};
  let cities = {};
  let amenities = {};

  $('.locations input[type="checkbox"]').click(function () {
    if ($(this).is(':checked')) {
      if ($(this).parent().attr('class') === 'statename') {
        states[$(this).attr('data-id')] = $(this).attr('data-name');
      } else {
        cities[$(this).attr('data-id')] = $(this).attr('data-name');
      }
    } else if ($(this).is(':not(:checked)')) {
      if ($(this).parent().attr('class') === 'statename') {
        delete states[$(this).attr('data-id')];
      } else {
        delete cities[$(this).attr('data-id')];
      }
    }
    let amenitylist = [];
    for (let key in states) {
      amenitylist.push(states[key]);
    }
    for (let key in cities) {
      amenitylist.push(cities[key]);
    }
    $('.locations h4').text(amenitylist.join(', '));
  });

  $('.amenities input[type="checkbox"]').click(function () {
    if ($(this).is(':checked')) {
      amenities[$(this).attr('data-id')] = $(this).attr('data-name');
    } else if ($(this).is(':not(:checked)')) {
      delete amenities[$(this).attr('data-id')];
    }
    const amenitylist = [];
    for (let key in amenities) {
      amenitylist.push(amenities[key]);
    }
    $('.amenities h4').text(amenitylist.join(', '));
  });
  $.get('http://4794c7186f5a.19.hbtn-cod.io:34275/api/v1/status', function (response) {
    if (response.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').toggleClass('available');
    }
  });
  $('button').click(function () {
    $.ajax({
      url: 'http://4794c7186f5a.19.hbtn-cod.io:34275/api/v1/places_search/',
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({ 'amenities': Object.keys(amenities), 'states': Object.keys(states), 'cities': Object.keys(cities) }),
      success: function (response) {
	$('.places h1').css('display', 'flex');
        $('article').remove();
	response = response.sort((a, b) => (a.name > b.name) ? 1 : -1);
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
