// Create WebSocket connection.
window.onload = function() {
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

      const webSocket = new WebSocket("wss://staging.api.desafrica.com/graphql", "graphql-ws");

      webSocket.onopen = event => {
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
                        location {
                            lat
                            lng
                        }
                    }
                  }}`,
                variables: {}
            }
        }))
      }

      webSocket.addEventListener('message', function(event) {

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
              const school_data = data.payload.data.getProgress.schools;
              const controlCenterKeys = data.payload.data.getProgress.keys;
               

              const map_features = school_data.map((data) => ({
                position: new google.maps.LatLng(data.location.lat, data.location.lng),
                status: data.status,
                school_name: data.name,
              }));

              //console.log(map_features)
              initMap(map_features);
              controlCenterObj.setProgressKeys(controlCenterKeys);
          }
      }

    });

    webSocket.onclose = function(){
      alert("connection closed")
    };

    controlCenterObj.getSchools();
    

}