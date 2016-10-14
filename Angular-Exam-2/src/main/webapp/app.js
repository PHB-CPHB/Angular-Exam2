var app = angular.module('userApp', ['ngRoute']);

var users = [];
app.controller("UserController", function ($http, $routeParams) {
    var self = this;
    self.email = $routeParams;
    if (users.length === 0) {
        $http.get("data/data.json").success(function (data) {
            users = data.users;
            self.users = users;
        });
    } else { //We used the cache property on the http request instead self.users = users;
    }
    if (users !== null) {
        console.log("Adding user: " + $routeParams.email);
        self.user = users[$routeParams.email];
    }
});

app.config(["$routeProvider", function ($routeProvider) {
        $routeProvider
                .when("/allUsers", {
                    templateUrl: "allUsers.html",
                    controller: "UserController as userCtrl"
                })
                .when("/userDetails/:email", {
                    templateUrl: "userDetails.html",
                    controller: "UserController as userCtrl"
                })
                .otherwise("/");

    }]);