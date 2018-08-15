

// firebase info
// Initialize Firebase
var config = {
  apiKey: "AIzaSyD7SxusedMqWMEMSF6-nPQf_5JvcoMlD_k",
  authDomain: "project1-ffdfe.firebaseapp.com",
  databaseURL: "https://project1-ffdfe.firebaseio.com",
  projectId: "project1-ffdfe",
  storageBucket: "project1-ffdfe.appspot.com",
  messagingSenderId: "177189113878"
};
firebase.initializeApp(config);

// This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches. The search box will return a
// pick list containing a mix of places and predicted search terms.
// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
var rating = 2.5;

var map, infoWindow;

function initAutocomplete() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 30.267153, lng: -97.7430608},
    zoom: 15,
    mapTypeId: 'roadmap',
    styles: [
      {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
      {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
      {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{color: '#263c3f'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{color: '#6b9a76'}]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{color: '#38414e'}]
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{color: '#212a37'}]
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{color: '#9ca5b3'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{color: '#746855'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{color: '#1f2835'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{color: '#f3d19c'}]
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{color: '#2f3948'}]
      },
      {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{color: '#17263c'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{color: '#515c6d'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{color: '#17263c'}]
      }
    ]
  });

  var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
  var icons = {
    parking: {
      icon: iconBase + 'assets/images/parking.png'
    },
  }


  infoWindow = new google.maps.InfoWindow;
  // var clickHandler = new ClickEventHandler(map, center);
  // new AutocompleteDirectionsHandler(map);



  // Create the search box and link it to the UI element.
  var input = document.getElementById('search-input');
  var searchBox = new google.maps.places.SearchBox(input);
  //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  // searchBox.addListener('places_changed', function() {
  $('.btn-submit').on('click', function() {
    console.log('hereasdfads');
    var places = searchBox.getPlaces();
    console.log("here", places);




    // forloop through places.length

    // for (var i = 0; i < places.length; i++) {

    //   var objectIWantToSendUp = {
    //     "formatted_addresses": places[i].formatted_address,
    //     "name": places[i].name
    //   }
    //   database.ref().push(objectIWantToSendUp);
    // }
      // *****New Stuff*****

      // database.ref().on("child_added", function (snapshot) {
      //   var name = snapshot.val().name;
      //   var addresses = snapshot.val().formatted_address;

      //   $("#infoTable > tBody").append("<tr><td>" + name + "</td><td>" + addresses + "</td></tr>");

      // })

      // original code

    if (places.length == 0) {
      return;
    }
    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];
    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
    if(place.rating>=rating) {
        var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      
      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: {
          url: "assets/images/parking.png",
        scaledSize: new google.maps.Size(40, 40)},
        title: place.name,
        position: place.geometry.location
      }));

      console.log(markers.length);
      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }

      console.log("here", place.name+place.rating);
    }
   
    });
    map.fitBounds(bounds);
  });

  // geolocation 
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      infoWindow.open(map);
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}



   





// // POI (point of interest click events) ***************************
// var ClickEventHandler = function(map, center) {
//   this.center = center;
//   this.map = map;
//   this.directionsService = new google.maps.DirectionsService;
//   this.directionsDisplay = new google.maps.DirectionsRenderer;
//   this.directionsDisplay.setMap(map);
//   this.placesService = new google.maps.places.PlacesService(map);
//   this.infowindow = new google.maps.InfoWindow;
//   this.infowindowContent = document.getElementById('infowindow-content');
//   this.infowindow.setContent(this.infowindowContent);

//   // Listen for clicks on the map.
//   this.map.addListener('click', this.handleClick.bind(this));
// };

// ClickEventHandler.prototype.handleClick = function(event) {
//   console.log('You clicked on: ' + event.latLng);
//   // If the event has a placeId, use it.
//   if (event.placeId) {
//     console.log('You clicked on place:' + event.placeId);

//     // Calling e.stop() on the event prevents the default info window from
//     // showing.
//     // If you call stop here when there is no placeId you will prevent some
//     // other map click event handlers from receiving the event.
//     event.stop();
//     this.calculateAndDisplayRoute(event.placeId);
//     this.getPlaceInformation(event.placeId);
//   }
// };

// ClickEventHandler.prototype.calculateAndDisplayRoute = function(placeId) {
//   var me = this;
//   this.directionsService.route({
//     center: this.center,
//     destination: {placeId: placeId},
//     travelMode: 'DRIVING'
//   }, function(response, status) {
//     if (status === 'OK') {
//       me.directionsDisplay.setDirections(response);
//     } else {
//       window.alert('Directions request failed due to ' + status);
//     }
//   });
// };

// ClickEventHandler.prototype.getPlaceInformation = function(placeId) {
//   var me = this;
//   this.placesService.getDetails({placeId: placeId}, function(place, status) {
//     if (status === 'OK') {
//       me.infowindow.close();
//       me.infowindow.setPosition(place.geometry.location);
//       me.infowindowContent.children['place-icon'].src = place.icon;
//       me.infowindowContent.children['place-name'].textContent = place.name;
//       me.infowindowContent.children['place-id'].textContent = place.place_id;
//       me.infowindowContent.children['place-address'].textContent =
//           place.formatted_address;
//       me.infowindow.open(me.map);
//     }
//   });
// };

// directions   ***********************
// function AutocompleteDirectionsHandler(map) {
//   this.map = map;
//   this.originPlaceId = null;
//   this.destinationPlaceId = null;
//   this.travelMode = 'WALKING';
//   var originInput = document.getElementById('origin-input');
//   var destinationInput = document.getElementById('search-input');
//   var modeSelector = document.getElementById('mode-selector');
//   this.directionsService = new google.maps.DirectionsService;
//   this.directionsDisplay = new google.maps.DirectionsRenderer;
//   this.directionsDisplay.setMap(map);

//   var originAutocomplete = new google.maps.places.Autocomplete(
//       originInput, {placeIdOnly: true});
//   var destinationAutocomplete = new google.maps.places.Autocomplete(
//       destinationInput, {placeIdOnly: true});

//   this.setupClickListener('changemode-walking', 'WALKING');
//   this.setupClickListener('changemode-transit', 'TRANSIT');
//   this.setupClickListener('changemode-driving', 'DRIVING');

//   this.setupPlaceChangedListener(originAutocomplete, 'ORIG');
//   this.setupPlaceChangedListener(destinationAutocomplete, 'DEST');

//   this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(originInput);
//   this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(destinationInput);
//   this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(modeSelector);
// }
