import jQuery from 'jquery';
import popper from 'popper.js';
import bootstrap from 'bootstrap';
import leaflet from 'leaflet';
import datatables from 'datatables.net';

jQuery(function ($) {

    var mymap = L.map('mapid', {
        center: [48.7534633, 32.1816862],
        zoom: 8
    });

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: '',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoiaGVhdGtsaWZmIiwiYSI6ImNqc3Fvb3lqbjFhOHUzeW41OWI2MndvOTEifQ.pgDLYkmvTfauWZADQcg-Ew'
    }).addTo(mymap);

    $.getJSON("dist/json/areas.json", function (data) {
        $.each(data['rows'], function (key, value) {

            var table = '<table class="display" style="width:100%">';
            table += "<thead><tr><td>key</td><td>value</td></tr></thead>";
            $.each(value, function (key, val) {
                table += "<tr><td>" + key + "</td><td>" + val + "</td></tr>";
            });
            table += '</table>';

            var db_popup = $($.parseHTML(table)).DataTable();
            L.marker([value['lat'], value['lng']])
                .addTo(mymap)
                .bindPopup(db_popup.table().node(), {
                minWidth: 500,
                data: value
            });
        });
    });
});