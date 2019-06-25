/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var isDeviceReady = false;
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        isDeviceReady = true;
        loadMapsApi();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

function getLocation() {
    if( isDeviceReady ) {
            navigator.geolocation.watchPosition(successCallback, errorCallback);
    } else {
        alert('Device is not ready!')
    }
}

function successCallback(position) {
    // coords, timestamp
    var locationInformation = '';
    locationInformation += '<p>Latitude: '+position.coords.latitude+'</p>';
    locationInformation += '<p>Longitude: '+position.coords.longitude+'</p>';
    locationInformation += '<p>Accuracy: '+position.coords.accuracy+'</p>';
    locationInformation += '<p>Altitude: '+position.coords.altitude+'</p>';
    locationInformation += '<p>AltitudeAccuracy: '+position.coords.altitudeAccuracy+'</p>';
    locationInformation += '<p>Speed: '+position.coords.speed+'</p>';
    locationInformation += '<p>Heading: '+position.coords.heading+'</p>';
    locationInformation += '<p>Timestamp: '+new Date(position.timestamp)+'</p>';

    document.getElementById('locationInformation').innerHTML = locationInformation;

    var myLatLng = {lat: position.coords.latitude, lng: position.coords.longitude};

    var map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 4,
                    center: myLatLng
                });

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Hello World!'
    });
}

function errorCallback(error) {
    alert('There was an error!');
}

function loadMapsApi() {
     var script = document.createElement('script');
       script.type = 'text/javascript';
       script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAxGO3UYs5fkSv9Aj6MDHN1DM8vHsEF_XU&callback=initMap';
       document.body.appendChild(script);
}