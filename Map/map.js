let map;
let directionsService;
let directionsRenderer;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 9.084400, lng: 77.347443 },
        zoom: 18,
        disableDefaultUI: true,
    });
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer({ map: map });

    // Autocomplete for pick-up and drop-off locations
    const pickupAutocomplete = new google.maps.places.Autocomplete(document.getElementById('pickup'));
    const dropoffAutocomplete = new google.maps.places.Autocomplete(document.getElementById('dropoff'));

    // geoloaction
    infoWindow = new google.maps.InfoWindow();

    const locationButton = document.createElement("button");

    locationButton.textContent = "Current Location";
    locationButton.classList.add("custom-map-control-button");
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
    locationButton.addEventListener("click", () => {
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };

                    infoWindow.setPosition(pos);
                    infoWindow.setContent("Location found.");
                    infoWindow.open(map);
                    map.setCenter(pos);
                },
                () => {
                    handleLocationError(true, infoWindow, map.getCenter());
                },
            );
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }
    });
}

// function calculateRoute() {
//     const pickupLocation = document.getElementById('pickup').value;
//     const dropoffLocation = document.getElementById('dropoff').value;

//     const request = {
//         origin: pickupLocation,
//         destination: dropoffLocation,
//         travelMode: 'DRIVING'
//     };

//     directionsService.route(request, function (response, status) {
//         if (status === 'OK') {
//             directionsRenderer.setDirections(response);
//         } else {
//             window.alert('Directions request failed due to ' + status);
//         }
//     });
// }

function calculateDistance() {
    const originInput = document.getElementById('pickup');
    const destinationInput = document.getElementById('dropoff');
    const resultDiv1 = document.getElementById('distancediv1');
    const resultDiv2 = document.getElementById('distancediv2');

    const origin = originInput.value;
    const destination = destinationInput.value;

    const request = {
        origin: origin,
        destination: destination,
        travelMode: 'DRIVING'
    };

    directionsService.route(request, function (response, status) {
        if (status === 'OK') {
            directionsRenderer.setDirections(response);
            const distance = response.routes[0].legs[0].distance.text;
            const duration = response.routes[0].legs[0].duration.text;

            const resultString1 = `Distance: ${distance}`;
            const resultString2 = `Duration: ${duration}`;
            resultDiv1.innerHTML = resultString1;
            resultDiv2.innerHTML = resultString2
        } else {
            resultDiv.innerHTML = `Error: ${status}`;
        }
    });
}

google.maps.event.addDomListener(window, 'load', initMap);