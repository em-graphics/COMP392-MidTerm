/// <reference path="../../typings/tsd.d.ts"/>
/*
Author's name : Eunmi Han(300790610)
Date last Modified : Mar 2, 2016
Program description : for gui rotation control.
Revision History :
        1.01 : Set up
        1.02 : Add each floor rotation
        1.03 : Add toggle up and down

LastModified by Eunmi Han
*/
var objects;
(function (objects) {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    var Control = (function () {
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        function Control(rotationSpeed) {
            this.FirstFloorRotationSpeed = rotationSpeed;
            this.SecondFloorRotationSpeed = rotationSpeed;
            this.ThirdFloorRotationSpeed = rotationSpeed;
            this.FourthFloorRotationSpeed = rotationSpeed;
            this.FifthFloorRotationSpeed = rotationSpeed;
        }
        Control.prototype.toggleDown = function () {
            this.goDown = this.goDown ? false : true;
        };
        Control.prototype.toggleUp = function () {
            this.goUp = this.goUp ? false : true;
        };
        return Control;
    })();
    objects.Control = Control;
})(objects || (objects = {}));
//# sourceMappingURL=control.js.map