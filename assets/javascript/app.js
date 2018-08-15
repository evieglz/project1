/* map */

///////////////

var config = {
  apiKey: "AIzaSyD7SxusedMqWMEMSF6-nPQf_5JvcoMlD_k",
  authDomain: "project1-ffdfe.firebaseapp.com",
  databaseURL: "https://project1-ffdfe.firebaseio.com",
  projectId: "project1-ffdfe",
  storageBucket: "project1-ffdfe.appspot.com",
  messagingSenderId: "177189113878"
};

firebase.initializeApp(config);

var database = firebase.database();

// This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches. The search box will return a
// pick list containing a mix of places and predicted search terms.
// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
function initAutocomplete() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 30.267153, lng: -97.7430608 },
    zoom: 15,
    mapTypeId: 'roadmap'
  });
  // Create the search box and link it to the UI element.
  var input = document.getElementById('search-input');
  var searchBox = new google.maps.places.SearchBox(input);
  //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function () {
    searchBox.setBounds(map.getBounds());
  });
  var markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.

  // $("#infoTable").empty();
  searchBox.addListener('places_changed', function () {
   
    var places = searchBox.getPlaces();

    console.log("places");
    console.log(places);
    console.log("places");

    // forloop through places.length

    for (var i = 0; i < places.length; i++) {


      var objectIWantToSendUp = {
        "formatted_address": places[i].formatted_address,
        "name": places[i].name,
        "likes": 0,
        "rating": places[i].rating
      }



      database.ref().push(objectIWantToSendUp);
    }
      // *****New Stuff*****

      

      database.ref().on("child_added", function (snapshot) {
        var name = snapshot.val().name;
        var addresses = snapshot.val().formatted_address;
        var likes = 0;
        var rating = snapshot.val().rating;

        $(".clicks").on("click", function(){
          likes++
  
          console.log("likes");
          console.log(likes);
          console.log("likes");
  
          database.ref().set({
            clickCount: likes
          });
        });

            database.ref().on("value", function (snapshot) {


            console.log(snapshot.val());


            $(".clicks").text(snapshot.val().clickCount);


            likesCounter = snapshot.val().clickCount;

            });






        // likes = snapshot.val().likes;


        $("#infoTable > tBody").append("<tr><td class='myLikes' value='"+name+"'><button class='clicks'> " + likes + " </button></td><td> " + name + "</td><td> " + rating + " </td><td> " + addresses + "</td></tr>");

        

      })




      // *****New Stuff*****

   

    if (places.length == 0) {
      return;
    }
    // Clear out the old markers.
    markers.forEach(function (marker) {
      marker.setMap(null);
    });
    markers = [];
    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function (place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
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
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));
      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}
// //When user clicks on likes 
// grab value of the name, find the value of the name in the databass and update that like by like++

// update likes++, update firebase, get snapshot

      // *****New Stuff*****
      
     

      
        // $(".clicks").text(snapshot.val().clickCount);



      //*****New Stuff*****

      // var likes = 0;


        // $("#click-button").on("click", function () {

        //     likes++;

        //     database.ref().set({
        //         clickCount: likesCounter
        //     });
        // });


      //   database.ref().on("value", function (snapshot) {


      //       console.log(snapshot.val());


      //       $("#click-value").text(snapshot.val().clickCount);


      //       likesCounter = snapshot.val().clickCount;



