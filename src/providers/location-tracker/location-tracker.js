"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("rxjs/add/operator/filter");
var http_1 = require("@angular/http");
var LocationTrackerProvider = (function () {
    function LocationTrackerProvider(zone, backgroundGeolocation, geolocation, http) {
        this.zone = zone;
        this.backgroundGeolocation = backgroundGeolocation;
        this.geolocation = geolocation;
        this.http = http;
        this.lat = 0;
        this.lng = 0;
    }
    LocationTrackerProvider.prototype.startTracking = function (user, duration) {
        var _this = this;
        var header = new http_1.Headers({ "Content-Type": "application/json" });
        this.duration = duration;
        this.user = user;
        try {
            // Background Tracking
            var config = {
                desiredAccuracy: 0,
                stationaryRadius: 20,
                distanceFilter: 10,
                debug: false,
                interval: this.duration * 1000,
                startOnBoot: true,
                stopOnTerminate: false
            };
            this.backgroundGeolocation.configure(config).subscribe(function (location) {
                console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);
                // Run update inside of Angular's zone
                _this.zone.run(function () {
                    _this.lat = location.latitude;
                    _this.lng = location.longitude;
                    if (_this.lat !== 0 || _this.lng !== 0) {
                        var model = {
                            latitude: _this.lat,
                            longitude: _this.lng,
                            loginName: user
                        };
                        _this.http.post("http://173.212.224.45:2020/api/user/sentLocation", JSON.stringify(model), { headers: header }).subscribe(function () {
                            console.log("Sending to the server" + _this.lng + "lat" + _this.lat);
                        }, function (err) {
                            console.log(err);
                        });
                    }
                });
            }, function (err) {
                console.log(err);
            });
            // Turn ON the background-geolocation system.
            this.backgroundGeolocation.start();
            // Foreground Tracking
            var options_1 = {
                enableHighAccuracy: true
            };
            this.watch = setInterval(function () {
                try {
                    _this.geolocation.getCurrentPosition(options_1).then(function (position) {
                        console.log(position);
                        console.log(_this.duration);
                        // Run update inside of Angular's zone
                        _this.zone.run(function () {
                            _this.lat = position.coords.latitude;
                            _this.lng = position.coords.longitude;
                            if (_this.lat !== 0 || _this.lng !== 0) {
                                var model = {
                                    latitude: _this.lat,
                                    longitude: _this.lng,
                                    loginName: user
                                };
                                _this.http.post("http://173.212.224.45:2020/api/user/sentLocation", JSON.stringify(model), { headers: header }).subscribe(function () {
                                    console.log("Sending to the server" + _this.lng + "lat" + _this.lat);
                                }, function (err) {
                                    console.log(err);
                                });
                            }
                        });
                    });
                }
                catch (e) {
                    console.log(e);
                }
            }, this.duration * 1000);
        }
        catch (e) {
            console.log(e);
        }
    };
    LocationTrackerProvider.prototype.stopTracking = function () {
        console.log('stopTracking');
        this.backgroundGeolocation.finish();
        clearInterval(this.watch);
    };
    return LocationTrackerProvider;
}());
LocationTrackerProvider = __decorate([
    core_1.Injectable()
], LocationTrackerProvider);
exports.LocationTrackerProvider = LocationTrackerProvider;
