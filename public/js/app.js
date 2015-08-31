angular.module("contextioChallenge",['nvd3']).
controller("indexController", function($scope, $http){

  var messagesUrl = "/api/messages/";
  var contactsUrl = "/api/contacts/";


    $http.get(contactsUrl).
      then(function(response) {
        console.log(response.data.contacts);
        $scope.contacts = response.data.contacts;


      }, function(error) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });

//rafa

      $scope.clickAction = function(x) {
        $http.get(messagesUrl + x.email ).
          then(function(response) {
            $scope.sent = x.sent;
            $scope.received = x.received;
            $scope.total = x.count;

            $scope.dates = [];

            for(var i = 0; i < response.data.length; i++){
              $scope.dates.push(response.data[i].date);
              // console.log(response.data[i].date);
            }
            $scope.data = generateData($scope.dates);
          }, function(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });
          var visualization = d3plus.viz()
              .container("#viz")  // container DIV to hold the visualization
              .data(sample_data)  // data to use with the visualization
              .type("scatter")       // visualization type
              .id("name")         // key for which our data is unique on
              .text("name")       // key to use for display text
              .y("time")         // key to use for y-axis
              .x("year")          // key to use for x-axis
              .time("year")
              .format({
               "text": function(text, params) {

                 if (text === "time") {
                   return "Time";
                 }
                 else {
                   return d3plus.string.title(text, params);
                 }

               },
               "number": function(number, params) {
                   var date = new Date(number*1000);
                   var hour = date.getHours();
                   var min = date.getMinutes();
                   var formatted = hour + ":" + min;

                 if (params.key === "time") {
                   return formatted ;
                 }
                 else {
                   return formatted;
                 }

               }
             })

              .draw()






      };
      // var timeFormat = function(time){
      //   var fullDate;
      //   var time;
      //   var date = new Date(time*1000);
      //   var stateArray = [];
      //
      //   var day = date.getDate();
      //   var month = date.getMonth();
      //   var year = date.getFullYear();
      //
      //   fullDate = month + "-" + day + "-" + year;
      //
      //
      //   stateArray.push(fullDate); // changed the date casting here
      //   //stateArray.push(testThis); // changed the date casting here
      //
      //   var hour = date.getHours();
      //   var minute = date.getMinutes();
      //
      //   time = hour + ":" + minute;
      //   stateArray.push(time);
      //
      //   return stateArray;
      // }


  // NVD3 stuff

//   $scope.options = {chart: {
//                 type: 'scatterChart',
//                 height: 400,
//                 color: d3.scale.category10().range(),
//                 scatter: {
//                     onlyCircles: true
//                 },
//                 showDistX: true,
//                 showDistY: true,
//                 showLegend: false,
//                 tooltipContent: function(key) {
//                     return '<h3>' + key + '</h3>';
//                 },
//                 transitionDuration: 350,
//                 xAxis: {
//                     axisLabel: 'X Axis',
//                     tickFormat: function(d){
//                         return d3.time.format('%m-%d-%Y')(new Date(d));
//                     }
//                 },
//                 yAxis: {
//                     axisLabel: 'Y Axis',
//                     tickFormat: function(d){
//                         return d3.time.format('%H:%M')(new Date(d));
//                     },
//                     axisLabelDistance: 20
//                 },
//
//             }
//           };
//
//        /* Chart data
//         http://krispo.github.io/angular-nvd3/#/quickstart
//         https://github.com/krispo/angular-nvd3/blob/gh-pages/js/scatterChart.js
//         https://github.com/mbostock/d3/wiki/Time-Formatting
//        */
//
//        var generateData = function(dates) {
//           // var f = d3.time.format('%H:%M');
//          console.log("date : " + dates[0][1]);
//          console.log("Time : " + dates[0][1]);
//          console.log("date length: " + dates.length);
//             var data = [], random = d3.random.normal();
//             for (var i = 0; i < 1; i++) {
//                 data.push({
//                     key: 'dates ',
//                     values: []
//                 });
//
//                 for (var j = 0; j < dates.length; j++) {
//                     data[i].values.push({
//                         x: new Date(dates[j][0])//date
//                         , y: random()// time of day
//
//                     });
//
//                 }
//             }
//             return data;
//         }
//
//
//
// });
