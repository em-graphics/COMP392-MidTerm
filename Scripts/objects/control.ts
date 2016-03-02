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
module objects {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    export class Control { 
        //pubic Instance variables
        public FirstFloorRotationSpeed : number;
        public SecondFloorRotationSpeed : number;
        public ThirdFloorRotationSpeed : number;
        public FourthFloorRotationSpeed : number;
        public FifthFloorRotationSpeed : number;
        public goDown : boolean;
        public goUp : boolean;
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        constructor(rotationSpeed:number) {
            this.FirstFloorRotationSpeed = rotationSpeed;
            this.SecondFloorRotationSpeed = rotationSpeed;
            this.ThirdFloorRotationSpeed = rotationSpeed;
            this.FourthFloorRotationSpeed = rotationSpeed;
            this.FifthFloorRotationSpeed = rotationSpeed;
        }
        
      public toggleDown(): void{
           this.goDown = this.goDown ? false : true;
      }
      
      public toggleUp(): void{
           this.goUp = this.goUp ? false : true;
      }
      
      
        //PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++
       
    }
}
