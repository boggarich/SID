// Initialize and add the map
/*
function initMap() {
    // The location of Uluru
    const uluru = { lat: -25.344, lng: 131.036 };
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("google-maps-container"), {
        zoom: 4,
        center: uluru,
    });
    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
        position: uluru,
        map: map,
    });
}

initMap();*/

let map;

function initMap(external) {
    //console.log(external)
    map = new google.maps.Map(document.getElementById("google-maps-container"), {
      center: new google.maps.LatLng(8.0236654, -0.9332576),
      zoom: 8,
    });

    // var image = {
    //     url: 'http://www.ssglobalsupply.com/images/location-contact.png',
    //     // This marker is 50 pixels wide by 50 pixels high.
    //     size: new google.maps.Size(50, 50),
    //     // The origin for this image is (0, 0).
    //     origin: new google.maps.Point(0, 0),
    //     // The anchor for this image is the base of the flagpole at (0, 32).
    //     anchor: new google.maps.Point(0, 32)
    //   };

    const iconBase =
      "https://developers.google.com/maps/documentation/javascript/examples/full/images/";
    const icons = {

      target: {
        // icon:  "img/map-pins/target.png",
        icon : {
            url: "img/map-pins/target.png",
            // This marker is 50 pixels wide by 50 pixels high.
            scaledSize: new google.maps.Size(15,15),          
        }
      },
      started: {
        //icon: "img/map-pins/Started.png"
        icon : {
          url: "img/map-pins/Started.png",
          // This marker is 50 pixels wide by 50 pixels high.
          scaledSize: new google.maps.Size(15,15),          
      }
      },
      delivered: {
        //icon: "img/map-pins/Delivered.png"
        icon : {
          url: "img/map-pins/Delivered.png",
          // This marker is 50 pixels wide by 50 pixels high.
          scaledSize: new google.maps.Size(15,15),          
      }
      },
      printed: {
        //icon: "img/map-pins/Printed.png",
        icon : {
          url: "img/map-pins/Printed.png",
          // This marker is 50 pixels wide by 50 pixels high.
          scaledSize: new google.maps.Size(15,15),          
      }
      },
      submitted: {
        //icon: "img/map-pins/Submitted.png"
        icon : {
          url: "img/map-pins/Submitted.png",
          // This marker is 50 pixels wide by 50 pixels high.
          scaledSize: new google.maps.Size(15,15),          
      }
      }
    };



    const features = external;

    var infoWindowContent = [];
  
    //console.log(features)
    // Create markers.
    for (let i = 0; i < features.length; i++) {

      infoWindowContent[i] = getInfoWindowDetails(features[i].school_name)
      const marker = new google.maps.Marker({
        position: features[i].position,
        icon: icons[features[i].status].icon,
        map: map,
      });

      var infowindow = new google.maps.InfoWindow({
        content: features[2].school_name
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i){
          return function() {
              infowindow.setContent(infoWindowContent[i]);
              
            infowindow.open(map,marker);
          }
        
    })(marker, i));

    }



  }

  function getInfoWindowDetails(name, location) {
    var contentString = '<div id="content" style="width:270px;height:100px">' +
    '<h3 id="firstHeading" class="firstHeading">' + name + '</h3>'+
    '<div id="bodyContent">'+
        '<div style="float:left;width:100%">'+ location + '</div>'+
    '</div>'+
'</div>';
    return contentString;
  }

