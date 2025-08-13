// Create WebSocket connection.
/*window.onload =  function() {
  const GQL = {
      CONNECTION_INIT: 'connection_init',
      CONNECTION_ACK: 'connection_ack',
      CONNECTION_ERROR: 'connection_error',
      CONNECTION_KEEP_ALIVE: 'ka',
      START: 'start',
      STOP: 'stop',
      CONNECTION_TERMINATE: 'connection_terminate',
      DATA: 'data',
      ERROR: 'error',
      COMPLETE: 'complete'
    }
*/

//    const webSocket = new WebSocket("wss://staging.api.desafrica.com/graphql", "graphql-ws");

 /*   webSocket.onopen = event => {
      webSocket.send(JSON.stringify({
        type: GQL.CONNECTION_INIT,
        payload: {}
      }))

      webSocket.send(JSON.stringify({
          type: GQL.START,
          id : "1",
          payload: { 
              extensions : {},
              operationName : "getProgress",
              /*query : "subscription getProgress {  getProgress {   keys {     target     started     submitted     printed      delivered     totalCompletion     activeOfficers }  }}",*/
              query : `subscription getProgress { getProgress{
                  keys{
                    target
                    started
                    submitted
                    printed
                    delivered
                    totalCompletion
                    activeOfficers
                  }
                  schools{
                      name
                      status
                      logo
                      population {
                        shsOne
                        shsTwo
                        shsThree
                      }
                      location {
                          lat
                          lng
                      }
                      locationName
                  }
                  totalSchools
                }}`,
              variables: {}
          }
      }))
    }

*/

    /* webSocket.addEventListener('message', function(event) {
      //alert('new websocket message')
      const data = JSON.parse(event.data)

      switch (data.type) {
        case GQL.CONNECTION_ACK: {
          console.log('success')
          break
        }
        case GQL.CONNECTION_ERROR: {
          console.error(data.payload)
          break
        }
        case GQL.CONNECTION_KEEP_ALIVE: {
          break
        }
        case GQL.DATA : {
            //console.log("websocket: GetProgress", data.payload);
            
            const school_data = data.payload.data.getProgress.schools;
            const controlCenterKeys = data.payload.data.getProgress.keys;
            const full = data.payload.data.getProgress;
             

           /* const map_features = school_data.map((data) => ({
              position: new google.maps.LatLng(data.location.lat, data.location.lng),
              status: data.status,
              school_name: data.name,
              population: data.population,
                logo: data.logo,
                locationName : data.locationName
            }));
	   */

	    const map_features = [
		{
              		position: new google.maps.LatLng(5.5715285, -0.2463921),
              		status: 'started',
              		school_name: 'Accra Academy SHS',
              		population: '13000',
                	logo: ,
                	locationName : 'Accra'
            }
	];

            //console.log(map_features)
            //initMap(map_features);
            controlCenterObj.setProgressKeys(controlCenterKeys, full);
        }
    }

  });
*/

 /* webSocket.onclose = function(){
    // alert("connection closed")
      controlCenterObj.getSchools();
  };*/

	    const map_features = [
		{
              		position: new google.maps.LatLng(5.5715285, -0.2463921),
              		status: 'started',
              		school_name: 'Accra Academy SHS',
              		population: '13000',
                	logo: '',
                	locationName : 'Accra'
            }
	];

  //initMap(map_features);

  //controlCenterObj.getSchools();
  

}