"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("rxjs/add/operator/map");
require("rxjs/add/operator/toPromise");
var BillsProvider = (function () {
    function BillsProvider(http, global) {
        this.http = http;
        this.global = global;
    }
    BillsProvider.prototype.getBills = function (user) {
        return this.http.get("http://173.212.224.45:2020/api/MyFawateeri?loginName=" + user)
            .map(function (response) { return response.json(); });
    };
    BillsProvider.prototype.getBillsByDate = function (user, from, to) {
        return this.http.get("http://173.212.224.45:2020/api/fawateer/ByDate?LoginName=" + user + "&from=" + from + "&to=" + to)
            .map(function (response) { return response.json(); });
    };
    BillsProvider.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    BillsProvider.prototype.deleteBill = function (id) {
        console.log("inside the delete service");
        return this.http.get("http://173.212.224.45:2020/api/Fawateer/Delete?trxid=" + id);
    };
    return BillsProvider;
}());
BillsProvider = __decorate([
    core_1.Injectable()
], BillsProvider);
exports.BillsProvider = BillsProvider;
