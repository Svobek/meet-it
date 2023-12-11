let map;
var directionsRenderer;
function initAutocomplete() {
    var mapP = {
        center: { lat: 51.9194, lng: 19.1451 },
        zoom: 7,
        mapTypeId: "roadmap",
    };
  map = new google.maps.Map(document.getElementById("map"), mapP);

// Pobierz element input
const input = document.getElementById("pac-input");

// Stwórz nowy element button
const button = document.createElement("button");
button.id = "zapisz-lokalizacje";
button.textContent = "Zapisz lokalizacje";


// Dodaj style do przycisku
button.className = "zapisz-lokalizacje";

// Dodaj przycisk do kontrolek mapy
map.controls[google.maps.ControlPosition.TOP_LEFT].push(button);

// Dodaj przycisk do rodzica elementu input
input.parentNode.insertBefore(button, input.nextSibling);

// Dodaj nasłuchiwacz zdarzeń do przycisku
button.addEventListener('click', function() {
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
                'punkt': JSON.parse(sessionStorage.getItem('punkt')),
                'cena': document.getElementById('kosz-atrakcji').value,
                'data': document.getElementById('data-startu-wyjazdu').value,
                'godzina': document.getElementById('czas-startu-wyjazdu').value
            });

        sessionStorage.setItem('markersArray', JSON.stringify(markersArray));
        var list = document.getElementById('list');
        var li = document.createElement('li');
        var img = document.createElement('img');
        var div = document.createElement('div');
        img.src = 'images/kosz.png';
        //function to remove chosen element from list and array
        function createClickListener(div, index) {
            return function () {
                div.remove();
                markersArray.splice(index, 1); // Usuń element z tablicy
                sessionStorage.setItem('markersArray', JSON.stringify(markersArray)); // Zaktualizuj tablicę w sessionStorage
            };
        }
        img.addEventListener('click', createClickListener(div, markersArray.length - 1));
        li.appendChild(document.createTextNode(document.getElementById('place').value));
        li.className = "li-list";
        img.className = "li-img";
        div.className = "div-list";
        div.appendChild(li); // Dodaj li do div
        div.appendChild(img); // Dodaj img do div
        list.appendChild(div);
        document.getElementById('place').value = '';
        document.getElementById('country').value = '';
        document.getElementById('city').value = '';
        document.getElementById('address').value = '';
        document.getElementById('zipcode').value = '';
        document.getElementById('kosz-atrakcji').value = '';   
        document.getElementById('data-startu-wyjazdu').value = '';
        document.getElementById('czas-startu-wyjazdu').value = '';

        console.log(markersArray);
        insertMarkerInfoToInputs();
        addPriceToInput();
    }
});
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


//write function to load list on page load
window.onload = function () {
  var markersArray = JSON.parse(sessionStorage.getItem('markersArray'));
  if (markersArray == null) {
      markersArray = [];
  }
  else {
      var list = document.getElementById('list');
      function createClickListener(div, index) {
        return function() {
            div.remove();
            markersArray.splice(index, 1); // Usuń element z tablicy
            sessionStorage.setItem('markersArray', JSON.stringify(markersArray)); // Zaktualizuj tablicę w sessionStorage
        };
      }
    
    for (var i = 0; i < markersArray.length; i++) {
      var div = document.createElement('div');
      var li = document.createElement('li');
      var img = document.createElement('img');

      img.src = 'images/kosz.png';

      img.addEventListener('click', createClickListener(div, i));

      li.appendChild(document.createTextNode(markersArray[i].nazwa));
      li.className = "li-list";
      img.className = "li-img";
      div.className = "div-list";
      div.appendChild(li); // Dodaj li do div
      div.appendChild(img); // Dodaj img do div
      list.appendChild(div);
    }
  }
    insertMarkerInfoToInputs();
    addPriceToInput();

}



$(function test() {
    //make elements change position in array when dragged and dropped
    $("#list").sortable({
        update: function (event, ui) {
            var markersArray = JSON.parse(sessionStorage.getItem('markersArray'));
            var newMarkersArray = [];
            var list = document.getElementById('list');
            var listElements = list.getElementsByTagName('li');
            for (var i = 0; i < listElements.length; i++) {
                for (var j = 0; j < listElements.length; j++) {
                    if (markersArray[j].nazwa == listElements[i].innerHTML) {
                        newMarkersArray.push(markersArray[j]);
                    }
                }
            }
            sessionStorage.setItem('markersArray', JSON.stringify(newMarkersArray));
        }
    });
    $("#list").disableSelection();
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
                    document.getElementById('kosz-atrakcji').value = markersArray[j].cena;
                    document.getElementById('data-startu-wyjazdu').value = markersArray[j].data;
                    document.getElementById('czas-startu-wyjazdu').value = markersArray[j].godzina;
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
//add function to display route on map on button click

function displayRoute() {
    var directionsService = new google.maps.DirectionsService;
    directionsRenderer = new google.maps.DirectionsRenderer;
    directionsRenderer.setMap(null);
    directionsRenderer.setMap(map);
    calculateAndDisplayRoute(directionsService, directionsRenderer);
}



//make function to add route to database use fetch
function addRouteToDatabase() {
    
    var routeName = {
        'Name': document.getElementById('cel').value,
    }
    //if cel is null dont add to database
    if (document.getElementById('cel').value == '') {
        alert('Wpisz nazwę trasy');
    }
    else {
        console.log(routeName);
        fetch('https://meeetit.azurewebsites.net/Track/AddTrack', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(routeName),
        })
            .then(response => response.json())
            .then(data => {
                var trackID = data;
                console.log(trackID);
                sessionStorage.setItem('trackID', trackID);
                addUserTrackToDatabase();
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }
    
}

//make function to add all markers from session storage to database use fetch
async function addMarkersToDatabase() {
    var markersArray = JSON.parse(sessionStorage.getItem('markersArray'));
    var PointID = [];
    try {
        for (var i = 0; i < markersArray.length; i++) {
            var marker = {
                'TrackID': JSON.parse(sessionStorage.getItem('trackID')),
                'PointInTrackId': i.toString(),
                'xParm': markersArray[i].punkt.lat,
                'yParm': markersArray[i].punkt.lng,
                'PointName': markersArray[i].nazwa
            }
            console.log(marker);
            let response = await fetch('https://meeetit.azurewebsites.net/Point/AddPoint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(marker),
            })
            let data = await response.text();
            if (response.ok) {
                var idPoint = data;
                PointID.push(idPoint);
                console.log("Success:", idPoint);
            }
        }
    }
    catch (error) {
        console.error('Fetch error:', error);
    }
    

    sessionStorage.setItem('pointidarray', JSON.stringify(PointID));
    addPointValuesToDatabase();
}
    


//function to add to table Users_Tracks in database
function addUserTrackToDatabase() {
var userTrack = {
        'idUsers': JSON.parse(sessionStorage.getItem('userId')),
        'idTracks': JSON.parse(sessionStorage.getItem('trackID')),
        'isAdmin': "1"
    }
    console.log(userTrack);
    fetch('https://meeetit.azurewebsites.net/User/ConnectUserAndTrack', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userTrack),
    })
        .then(response => response.text())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    addMarkersToDatabase();
}

function addPointValuesToDatabase() {
    var markersArray = JSON.parse(sessionStorage.getItem('markersArray'));
    var idarray = JSON.parse(sessionStorage.getItem('pointidarray'));
    console.log(idarray);
    for (var i = 0; i < markersArray.length; i++) {
        var pointValues = {
            'idPoint': idarray[i],
            'Price': markersArray[i].cena,
            'date': markersArray[i].data,
            'time': markersArray[i].godzina
        }
        console.log(pointValues);
    }

    
    /*fetch('https://meeetit.azurewebsites.net/Point/AddPointValues', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(route),
    })
        .then(response => response.text())
        .then(data => {
            console.log('Success:', data);
            
        })
        .catch((error) => {
            console.error('Error:', error);
        });*/
    displayRoute();
}


//add price of every marker and display it on koszty input in real time every time marker is added or removed
function addPriceToInput() {
var markersArray = JSON.parse(sessionStorage.getItem('markersArray'));
    var sum = 0;

    for (var i = 0; i < markersArray.length; i++) {    
        sum += parseInt(markersArray[i].cena);
    }
    document.getElementById('koszty').value = sum;
}



function zapiszTrase() {
    addRouteToDatabase();
}























