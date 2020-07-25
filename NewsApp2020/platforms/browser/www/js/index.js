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

// The next function was taken from W3 Schools avaliable at: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_filter_table
function myFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("sportTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } 
            else {
                tr[i].style.display = "none";
            }
        }       
    }
}

function getNews(type) {

    // Define and declarate a variable called url
    var url = 'http://newsapi.org/v2/everything?' +
              'q=' + type + '&' + //Search for sport news
              'apiKey=4e07405b93f94f5b84e7e858930c9e62';
    // Variable called req which has an object of type Request
    var req = new Request(url);

    // Call funcion fetch to get the result (news) from server
    fetch(req)
    .then(response => response.json()) // We read and parse the data using json()
    .then(data => { // Travel through structure to get articles (titles and descriptions)
        console.log(data.articles);

        var myTable= '<table id="sportTable"><th>Latest News</th>';
        //myTable+= "<th>Description</th>";

        for (const news of data.articles) { // Loop to get titles and descriptions
            console.log(news.title);

            myTable+="<tr><td>" + news.title + "</td></tr>";
            //myTable+="<td>" + news.description + "</td></tr>";        
        }
        myTable+="</table>";

        document.getElementById('tablePrint').innerHTML = myTable;            

    })
}

function pics(){
    navigator.camera.getPicture(cameraCallback, onError);
}

function cameraCallback(imageData) {
    var image = document.getElementById('myImage');
    image.src = imageData;    }

function onError (msg) {
    alert('Error trying to access the camera ' + msg)
}