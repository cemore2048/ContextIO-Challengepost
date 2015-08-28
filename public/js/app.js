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
              $scope.dates.push(timeFormat(response.data[i].date));
              console.log(response.data[i].date);
            }
            $scope.data = generateData($scope.dates);
          }, function(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });


      };
      var timeFormat = function(time){
        var fullDate;
        var time;
        var date = new Date(time*1000);
        var stateArray = [];

        var day = date.getDate();
        var month = date.getMonth();
        var year = date.getFullYear();

        fullDate = month + "/" + day + "/" + year;
        stateArray.push(fullDate);

        var hour = date.getHours();
        var minute = date.getMinutes();

        time = hour + ":" + minute;
        stateArray.push(time);

        return stateArray;
      }


  // NVD3 stuff

  $scope.options = {chart: {
                type: 'scatterChart',
                height: 450,
                color: d3.scale.category10().range(),
                scatter: {
                    onlyCircles: false
                },
                showDistX: true,
                showDistY: true,
                showLegend: false,
                tooltipContent: function(key) {
                    return '<h3>' + key + '</h3>';
                },
                transitionDuration: 350,
                xAxis: {
                    axisLabel: 'X Axis',
                    tickFormat: function(d){
                        return d3.time.scale('%x')(new Date(d));
                    }
                },
                yAxis: {
                    axisLabel: 'Y Axis',
                    tickFormat: function(d){
                        return d3.time.format('%H:%M')(new Date(d));
                    },
                    axisLabelDistance: 30
                },

            }
          };

       /* Chart data
        http://krispo.github.io/angular-nvd3/#/quickstart
        https://github.com/krispo/angular-nvd3/blob/gh-pages/js/scatterChart.js
        https://github.com/mbostock/d3/wiki/Time-Formatting
       */

       var generateData = function(dates) {
         console.log("dates : " + dates[0][0]);
         console.log("dates : " + dates[0][1]);
            var data = [],
                shapes = ['circle', 'cross', 'triangle-up', 'triangle-down', 'diamond', 'square'],
                  random = d3.random.normal();
            for (var i = 0; i < dates.length; i++) {
                data.push({
                    key: 'dates ' + i,
                    values: []
                });

                for (var j = 0; j < dates.length; j++) {
                    data[i].values.push({
                        x: new Date(random()) //date
                        , y: random() // time of day
                    });
                }
            }
            return data;
        }



});
