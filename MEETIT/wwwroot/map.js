//skrypt na wyszukiwanie w mapie

function initMap() {
    const CONFIGURATION = {
      ctaTitle: "Checkout",
      mapOptions: {
        center: { lat: 53.1235000, lng:18.0076200 },
        fullscreenControl: true,
        mapTypeControl: false,
        streetViewControl: true,
        zoom: 11,
        zoomControl: true,
        maxZoom: 22,
        mapId: "",
      },
      mapsApiKey: "AIzaSyB3ZQgxv25bFuG9dDT9t7Fz9_7M6C1enjY",
      capabilities: {
        addressAutocompleteControl: true,
        mapDisplayControl: true,
        ctaControl: true,
      },
    };
    const componentForm = [
      "location",
      "locality",
      "administrative_area_level_1",
      "country",
      "postal_code",
    ];
    const getFormInputElement = (component) =>
      document.getElementById(component + "-input");
    const map = new google.maps.Map(document.getElementById("gmp-map"), {
      zoom: CONFIGURATION.mapOptions.zoom,
      center: { lat: 53.1235000, lng: 18.0076200 },
      mapTypeControl: false,
      fullscreenControl: CONFIGURATION.mapOptions.fullscreenControl,
      zoomControl: CONFIGURATION.mapOptions.zoomControl,
      streetViewControl: CONFIGURATION.mapOptions.streetViewControl,
    });
    const marker = new google.maps.Marker({ map: map, draggable: false });
    const autocompleteInput = getFormInputElement("location");
    const autocomplete = new google.maps.places.Autocomplete(
      autocompleteInput,
      {
        fields: ["address_components", "geometry", "name"],
        types: ["address"],
      }
    );
    autocomplete.addListener("place_changed", function () {
      marker.setVisible(false);
      const place = autocomplete.getPlace();
      if (!place.geometry) {
        window.alert(
          "No details available for input: '" + place.name + "'"
        );
        return;
      }
      renderAddress(place);
      fillInAddress(place);
    });
    function fillInAddress(place) {
      const addressNameFormat = {
        street_number: "short_name",
        route: "long_name",
        locality: "long_name",
        administrative_area_level_1: "short_name",
        country: "long_name",
        postal_code: "short_name",
      };
      const getAddressComp = function (type) {
        for (const component of place.address_components) {
          if (component.types[0] === type) {
            return component[addressNameFormat[type]];
          }
        }
        return "";
      };
      getFormInputElement("location").value =
        getAddressComp("street_number") + " " + getAddressComp("route");
      for (const component of componentForm) {
        if (component !== "location") {
          getFormInputElement(component).value = getAddressComp(component);
        }
      }
    } 
    function renderAddress(place) {
      map.setCenter(place.geometry.location);
      marker.setPosition(place.geometry.location);
      marker.setVisible(true);
    }
  }