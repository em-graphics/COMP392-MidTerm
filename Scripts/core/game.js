/*
Author's name : Eunmi Han(300790610)
Date last Modified : Mar 2, 2016
Program description : Tapered Tower.
Revision History :
        1.01 : Add ground and first tower
        1.02 : Add spot light
        1.03 : Add secont to fifth tower
        1.04 : Add gui control to rotation each tower
        1.05 : Make random color for each tower
        1.06 : Casting shadow
        1.07 : Add toggle up and down
LastModified by Eunmi Han
*/
/// <reference path="_reference.ts"/>
// MAIN GAME FILE
// THREEJS Aliases
var Scene = THREE.Scene;
var Renderer = THREE.WebGLRenderer;
var PerspectiveCamera = THREE.PerspectiveCamera;
var BoxGeometry = THREE.BoxGeometry;
var CubeGeometry = THREE.CubeGeometry;
var PlaneGeometry = THREE.PlaneGeometry;
var SphereGeometry = THREE.SphereGeometry;
var Geometry = THREE.Geometry;
var AxisHelper = THREE.AxisHelper;
var LambertMaterial = THREE.MeshLambertMaterial;
var MeshBasicMaterial = THREE.MeshBasicMaterial;
var Material = THREE.Material;
var Mesh = THREE.Mesh;
var Object3D = THREE.Object3D;
var SpotLight = THREE.SpotLight;
var PointLight = THREE.PointLight;
var AmbientLight = THREE.AmbientLight;
var Control = objects.Control;
var GUI = dat.GUI;
var Color = THREE.Color;
var Vector3 = THREE.Vector3;
var Face3 = THREE.Face3;
var Point = objects.Point;
var CScreen = config.Screen;
//Custom Game Objects
var gameObject = objects.gameObject;
// setup an IIFE structure (Immediately Invoked Function Expression)
var game = (function () {
    // declare game objects
    var scene = new Scene();
    var renderer;
    var camera;
    var control;
    var gui;
    var stats;
    var axes;
    var ground;
    var first;
    var second;
    var third;
    var fourth;
    var fifth;
    var groundMaterial;
    var groundGeometry;
    var firstMaterial;
    var secondMaterial;
    var thirdMaterial;
    var fourthMaterial;
    var fifthMaterial;
    var firstGeometry;
    var secondGeometry;
    var thirdGeometry;
    var fourthGeometry;
    var fifthGeometry;
    var ambientLight;
    var spotLight;
    var bg;
    function init() {
        // Instantiate a new Scene object
        //scene = new Scene();
        setupRenderer(); // setup the default renderer
        setupCamera(); // setup the camera
        /* ENTER CODE HERE */
        // Add an AmbientLight to the scene
        ambientLight = new AmbientLight(0x404040);
        scene.add(ambientLight);
        console.log("Added an Ambient Light to Scene");
        //Add a SpotLight to the scene
        spotLight = new SpotLight(0xffffff);
        spotLight.position.set(-40, 60, 10);
        spotLight.castShadow = true;
        spotLight.target.position.set(0, 3, 3);
        scene.add(spotLight);
        console.log("Added a SpotLight Light to Scene");
        // Add an axis helper the scene
        axes = new AxisHelper(10);
        scene.add(axes);
        console.log("Added axes to scene");
        //Add a Plane to the Scene
        groundGeometry = new PlaneGeometry(25, 25);
        groundMaterial = new LambertMaterial({ color: 0xe75d14 });
        ground = new Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -0.5 * Math.PI;
        ground.castShadow = true;
        ground.receiveShadow = true;
        scene.add(ground);
        console.log("Added Ground to scene");
        firstGeometry = new BoxGeometry(6, 2, 6);
        firstMaterial = new LambertMaterial({ color: Math.floor(Math.random() * 16777215) });
        first = new Mesh(firstGeometry, firstMaterial);
        first.castShadow = true;
        first.receiveShadow = true;
        first.position.set(0, 1, 0);
        scene.add(first);
        console.log("Added first tower to scene");
        secondGeometry = new BoxGeometry(5, 2, 5);
        secondMaterial = new LambertMaterial({ color: Math.floor(Math.random() * 16777215) });
        second = new Mesh(secondGeometry, secondMaterial);
        second.castShadow = true;
        second.receiveShadow = true;
        second.position.set(0, 3, 0);
        scene.add(second);
        console.log("Added second tower to scene");
        thirdGeometry = new BoxGeometry(4, 2, 4);
        thirdMaterial = new LambertMaterial({ color: Math.floor(Math.random() * 16777215) });
        third = new Mesh(thirdGeometry, thirdMaterial);
        third.castShadow = true;
        third.receiveShadow = true;
        third.position.set(0, 5, 0);
        scene.add(third);
        console.log("Added third tower to scene");
        fourthGeometry = new BoxGeometry(3, 2, 3);
        fourthMaterial = new LambertMaterial({ color: Math.floor(Math.random() * 16777215) });
        fourth = new Mesh(fourthGeometry, fourthMaterial);
        fourth.castShadow = true;
        fourth.receiveShadow = true;
        fourth.position.set(0, 7, 0);
        scene.add(fourth);
        console.log("Added fourth tower to scene");
        fifthGeometry = new BoxGeometry(2, 2, 2);
        fifthMaterial = new LambertMaterial({ color: Math.floor(Math.random() * 16777215) });
        fifth = new Mesh(fifthGeometry, fifthMaterial);
        fifth.castShadow = true;
        fifth.receiveShadow = true;
        fifth.position.set(0, 9, 0);
        scene.add(fifth);
        console.log("Added fourth tower to scene");
        // add controls
        gui = new GUI();
        control = new Control(0.1);
        addControl(control);
        // Add framerate stats
        addStatsObject();
        console.log("Added Stats to scene...");
        document.body.appendChild(renderer.domElement);
        gameLoop(); // render the scene	
    }
    function addControl(controlObject) {
        /* ENTER CODE for the GUI CONTROL HERE */
        gui.add(controlObject, 'FirstFloorRotationSpeed', -0.5, 0.5);
        gui.add(controlObject, 'SecondFloorRotationSpeed', -0.5, 0.5);
        gui.add(controlObject, 'ThirdFloorRotationSpeed', -0.5, 0.5);
        gui.add(controlObject, 'FourthFloorRotationSpeed', -0.5, 0.5);
        gui.add(controlObject, 'FifthFloorRotationSpeed', -0.5, 0.5);
        gui.add(controlObject, "toggleDown");
        gui.add(controlObject, "toggleUp");
    }
    function addStatsObject() {
        stats = new Stats();
        stats.setMode(0);
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';
        document.body.appendChild(stats.domElement);
    }
    // Setup main game loop
    function gameLoop() {
        stats.update();
        first.rotation.y += control.FirstFloorRotationSpeed;
        second.rotation.y += control.SecondFloorRotationSpeed;
        third.rotation.y += control.ThirdFloorRotationSpeed;
        fourth.rotation.y += control.FourthFloorRotationSpeed;
        fifth.rotation.y += control.FifthFloorRotationSpeed;
        if (control.goDown) {
            first.position.y -= 0.1;
            second.position.y -= 0.1;
            third.position.y -= 0.1;
            fourth.position.y -= 0.1;
            fifth.position.y -= 0.1;
        }
        if (control.goUp) {
            first.position.y += 0.1;
            second.position.y += 0.1;
            third.position.y += 0.1;
            fourth.position.y += 0.1;
            fifth.position.y += 0.1;
        }
        // render using requestAnimationFrame
        requestAnimationFrame(gameLoop);
        // render the scene
        renderer.render(scene, camera);
    }
    // Setup default renderer
    function setupRenderer() {
        renderer = new Renderer();
        renderer.setClearColor(0x404040, 1.0);
        renderer.setSize(CScreen.WIDTH, CScreen.HEIGHT);
        //renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        console.log("Finished setting up Renderer...");
    }
    // Setup main camera for the scene
    function setupCamera() {
        camera = new PerspectiveCamera(45, config.Screen.RATIO, 0.1, 100);
        camera.position.x = 0.6;
        camera.position.y = 18.5;
        camera.position.z = -20.7;
        camera.rotation.set(-1.10305, 0.49742, -0.1396);
        camera.lookAt(new Vector3(0, 0, 0));
        console.log("Finished setting up Camera...");
    }
    window.onload = init;
    return {
        scene: scene
    };
})();
//# sourceMappingURL=game.js.map