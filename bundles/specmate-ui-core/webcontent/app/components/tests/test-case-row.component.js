"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var confirmation_modal_service_1 = require('../core/forms/confirmation-modal.service');
var Type_1 = require('../../util/Type');
var ParameterAssignment_1 = require('../../model/ParameterAssignment');
var TestCase_1 = require('../../model/TestCase');
var specmate_data_service_1 = require('../../services/specmate-data.service');
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var TestCaseRow = (function () {
    function TestCaseRow(dataService, router, route, modal) {
        this.dataService = dataService;
        this.router = router;
        this.route = route;
        this.modal = modal;
    }
    Object.defineProperty(TestCaseRow.prototype, "inputParameters", {
        get: function () {
            return this._inputParameters;
        },
        /** Input Parameters of the test specfication that should be shown*/
        set: function (parameters) {
            this._inputParameters = parameters;
            this.initialize(true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TestCaseRow.prototype, "outputParameters", {
        get: function () {
            return this._outputParameters;
        },
        /** Output Parameters of the test specfication that should be shown*/
        set: function (parameters) {
            this._outputParameters = parameters;
            this.initialize(true);
        },
        enumerable: true,
        configurable: true
    });
    TestCaseRow.prototype.ngOnInit = function () {
        this.initialize(false);
    };
    /** We initialize the assignments here. */
    TestCaseRow.prototype.initialize = function (virtual) {
        var _this = this;
        this.dataService.readContents(this.testCase.url, virtual).then(function (contents) {
            _this.assignments = contents.filter(function (c) { return Type_1.Type.is(c, ParameterAssignment_1.ParameterAssignment); }).map(function (c) { return c; });
            _this.assignmentMap = _this.deriveAssignmentMap(_this.assignments);
            console.log("INIT DONE -> " + virtual);
        });
    };
    /** Derives the parameter assignments matching to the display parameters in the right order */
    TestCaseRow.prototype.deriveAssignmentMap = function (assignments) {
        var assignmentMap = {};
        for (var _i = 0, _a = this.assignments; _i < _a.length; _i++) {
            var assignment = _a[_i];
            assignmentMap[assignment.parameter.url] = assignment;
        }
        return assignmentMap;
    };
    /** Deletes the test case. */
    TestCaseRow.prototype.delete = function () {
        var _this = this;
        this.modal.open("Do you really want to delete " + this.testCase.name + "?")
            .then(function () { return _this.dataService.deleteElement(_this.testCase.url, true); })
            .then(function () { return _this.dataService.commit('Delete'); })
            .catch(function () { });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', TestCase_1.TestCase)
    ], TestCaseRow.prototype, "testCase", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array), 
        __metadata('design:paramtypes', [Array])
    ], TestCaseRow.prototype, "inputParameters", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array), 
        __metadata('design:paramtypes', [Array])
    ], TestCaseRow.prototype, "outputParameters", null);
    TestCaseRow = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: '[test-case-row]',
            templateUrl: 'test-case-row.component.html'
        }), 
        __metadata('design:paramtypes', [specmate_data_service_1.SpecmateDataService, router_1.Router, router_1.ActivatedRoute, confirmation_modal_service_1.ConfirmationModal])
    ], TestCaseRow);
    return TestCaseRow;
}());
exports.TestCaseRow = TestCaseRow;
//# sourceMappingURL=test-case-row.component.js.map