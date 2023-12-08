function initAutocomplete() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 51.9194, lng: 19.1451 },
    zoom: 7,
    mapTypeId: "roadmap",
  });
  const input = document.getElementById("pac-input");
  const searchBox = new google.maps.places.SearchBox(input);

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  map.addListener("bounds_changed", () => {
    searchBox.setBounds(map.getBounds());
  });

  let markers = [];

  searchBox.addListener("places_changed", () => {
    const places = searchBox.getPlaces();
  
    if (places.length == 0) {
      return;
    }
  
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    markers = [];
  
    const bounds = new google.maps.LatLngBounds();
    const countryInput = document.getElementById('country');
    const cityInput = document.getElementById('city');
    const addressInput = document.getElementById('address');
    const zipcodeInput = document.getElementById('zipcode');
    const placeInput = document.getElementById('place');
  
    places.forEach((place) => {
      if (!place.geometry || !place.geometry.location) {
        console.log("Returned place contains no geometry");
        return;
      }
  
      placeInput.value = place.name;
  
      for (var i = 0; i < place.address_components.length; i++) {
        var addressType = place.address_components[i].types[0];
        if (addressType === 'country') {
          countryInput.value = place.address_components[i].long_name;
        } else if (addressType === 'locality') {
          cityInput.value = place.address_components[i].long_name;
        } else if (addressType === 'route') {
          addressInput.value = place.address_components[i].long_name;
        } else if (addressType === 'postal_code') {
          zipcodeInput.value = place.address_components[i].long_name;
        }
      }
  
      const icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25),
      };
  
      markers.push(
        new google.maps.Marker({
          map,
          icon,
          title: place.name,
          position: place.geometry.location,
        }),
      );
  
      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
  
    map.fitBounds(bounds);
  });
}
window.initAutocomplete = initAutocomplete;


