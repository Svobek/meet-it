var map;
function initAutocomplete() {
    var mapP = {
        center: { lat: 51.9194, lng: 19.1451 },
        zoom: 7,
        mapTypeId: "roadmap",
    };
  map = new google.maps.Map(document.getElementById("map"), mapP);
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
      
      //make in session storage array of markers and save current place location as last element
      var markersArray = JSON.parse(sessionStorage.getItem('punkt'));
      if (markersArray == null) {
          sessionStorage.setItem('punkt', JSON.stringify(markers[markers.length - 1].position));
      }
      else {
          sessionStorage.removeItem('punkt');
          sessionStorage.setItem('punkt', JSON.stringify(markers[markers.length - 1].position));
      }
      


    map.fitBounds(bounds);
  });
}
window.initAutocomplete = initAutocomplete;




//add event listener to add markers to session storage and list them on list
document.getElementById('dojazd').addEventListener('click', function() {
    var markersArray = JSON.parse(sessionStorage.getItem('markersArray'));
    if (markersArray == null) {
        markersArray = [];
    }
    //if null dont add to array
    if (document.getElementById('place').value == '') {

    }
    else {
        markersArray.push(
            {
                'nazwa': document.getElementById('place').value,
                'kraj': document.getElementById('country').value,
                'miasto': document.getElementById('city').value,
                'adres': document.getElementById('address').value,
                'kod': document.getElementById('zipcode').value,
                'punkt': JSON.parse(sessionStorage.getItem('punkt'))
            });

        sessionStorage.setItem('markersArray', JSON.stringify(markersArray));
        var list = document.getElementById('list');
        var li = document.createElement('li');
        li.appendChild(document.createTextNode(document.getElementById('place').value));
        list.appendChild(li);
        document.getElementById('place').value = '';
        document.getElementById('country').value = '';
        document.getElementById('city').value = '';
        document.getElementById('address').value = '';
        document.getElementById('zipcode').value = '';
        console.log(markersArray);
        insertMarkerInfoToInputs();
    }
});


//add function to insert marker innformation to inputs when clicked on list element
function insertMarkerInfoToInputs() {
    var list = document.getElementById('list');
    var listElements = list.getElementsByTagName('li');

    for (var i = 0; i < listElements.length; i++) {
        listElements[i].addEventListener('click', function () {
            var markersArray = JSON.parse(sessionStorage.getItem('markersArray'));
            for (var j = 0; j < markersArray.length; j++) {
                if (markersArray[j].nazwa == this.innerHTML) {
                    document.getElementById('place').value = markersArray[j].nazwa;
                    document.getElementById('country').value = markersArray[j].kraj;
                    document.getElementById('city').value = markersArray[j].miasto;
                    document.getElementById('address').value = markersArray[j].adres;
                    document.getElementById('zipcode').value = markersArray[j].kod;
                    sessionStorage.setItem('punkt', JSON.stringify(markersArray[j].punkt));
                }
            }
            map.setCenter(JSON.parse(sessionStorage.getItem('punkt')));
        });
        
    }
    
    
   

}
//call google route api with markers from session storage and display route on map
function calculateAndDisplayRoute(directionsService, directionsRenderer) {
    var markersArray = JSON.parse(sessionStorage.getItem('markersArray'));
    var waypts = [];
    for (var i = 0; i < markersArray.length; i++) {
        waypts.push({
            location: markersArray[i].punkt,
            stopover: true
        });
    }
    directionsService.route({
        origin: markersArray[0].punkt,
        destination: markersArray[markersArray.length - 1].punkt,
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.DRIVING
    }, function (response, status) {
        if (status === 'OK') {
            directionsRenderer.setDirections(response);
        } else {
            alert('Directions request failed due to ' + status);
        }
    });
}
//add event listener to button zapisz to display route on map
document.getElementById('zapisz').addEventListener('click', function () {
    var directionsService = new google.maps.DirectionsService();
    var directionsRenderer = new google.maps.DirectionsRenderer();
    calculateAndDisplayRoute(directionsService, directionsRenderer);
    directionsRenderer.setMap(map);
});











