bmw = new THREE.Object3D();
FL =	new THREE.Object3D();
FR =	new THREE.Object3D();		
BL =	new THREE.Object3D();
BR =	new THREE.Object3D();

finishBmw = false;
addedBmw = false;

//controles
teclas = {0: false, 1: false};
teclaIzq = 0;
teclaDer = 1;

cubes = [];
colisions =[];
 var z = 0.0


function loadModels(){
	var loader = new THREE.OBJMTLLoader();

	loader.load('obj/BMW/Pontiac-No-Weels.obj', 'obj/BMW/Pontiac-No-Weels.mtl', function(object){
		object.position.set( z, 0, -15);
		bmw = object;
		finishBmw = true;
		});

		loader.load('obj/BMW/Right-Weel.obj', 'obj/BMW/Right-Weel.mtl', function(object){
		object.position.set( z+2.5, -2, -10.5);
		object.rotation.y = 180 * Math.PI / 180;
		FL = object;
		});

		loader.load('obj/BMW/Right-Weel.obj', 'obj/BMW/Right-Weel.mtl', function(object){
		object.position.set( z-2.5, -2, -10.5);
		FR = object;
		});

		loader.load('obj/BMW/Right-Weel.obj', 'obj/BMW/Right-Weel.mtl', function(object){
		object.position.set( z+2.5, -2, -19.5);
		object.rotation.y = 180 * Math.PI / 180;
		BL = object;
		});

		loader.load('obj/BMW/Right-Weel.obj', 'obj/BMW/Right-Weel.mtl', function(object){
		object.position.set( z-2.5, -2, -19.5);
		BR = object;
		});

		
	
}

function keydownHandler(e){
	//39
	if (e.keyCode==37){
		teclas[teclaDer] = true;
	}

	if (e.keyCode==39){
		teclas[teclaIzq] = true;
	}

	//console.log(e);
}

function keyupHandler(e){
	if (e.keyCode==37){
		teclas[teclaDer] = false;
	}

	if (e.keyCode==39){
		teclas[teclaIzq] = false;
	}
}

function checkKeys(){
	if(teclas[teclaDer])
	{
		if(z<20)
		{
			z= z+0.5;
			bmw.position.x = z;
			cube.position.x = z;
			FL.position.x = z+2.5;
			FR.position.x = z-2.5;
			BL.position.x = z+2.5;
			BR.position.x = z-2.5;
			
		}
	}

	if(teclas[teclaIzq])
	{
		if(z>-20)
		{
			z= z-0.5;
			bmw.position.x = z;
			cube.position.x = z
			FL.position.x = z+2.5;
			FR.position.x = z-2.5;
			BL.position.x = z+2.5;
			BR.position.x = z-2.5;
		
		}
	}
}

function init(){
	loadModels();
	container = document.createElement( 'div');
	document.body.appendChild( container );

	scene = new THREE.Scene();
	renderer= new THREE.WebGLRenderer();
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize (window.innerWidth*.99, window.innerHeight*.99);
	renderer.setClearColor(0x89b9f5,1);

	camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight,1,1000);
	camera.position.z = -60;
	camera.position.y = 20;
	camera.position.x = 0;
	scene.add(camera);

	//carretera

	var geometry = new THREE.PlaneGeometry(60, 5000, 1 );
	var material = new THREE.MeshBasicMaterial( {color: 0x303030, side: THREE.DoubleSide} );
	plane = new THREE.Mesh( geometry, material );
	plane.position.set (0,-10,0);
	plane.rotation.x = 90*Math.PI/180;
	scene.add(plane);

	//objetos a colisionar

	for(var i=0; i<500; i+=2)
	{
		var geometry = new THREE.BoxGeometry(10, 4, 10 );
		var material = new THREE.MeshBasicMaterial( {color: 0xFFFFFF, side: THREE.DoubleSide} );

		var posI = Math.random() * ( 4 - 1 ) + 1;//rand * (max - min) + min
		posI = Math.trunc(posI);
		console.log(posI);
		cubes[i] = new THREE.Mesh( geometry, material );
		cubes[i].position.x = -30 + (15 * posI);
		cubes[i].position.z = 300 + (200 * i / 2 );
		scene.add(cubes[i]);

		var posO;
		posO = Math.random() * ( 4 - 1 ) + 1;//rand * (max - min) + min
		posO = Math.trunc(posO);
		cubes[i+1] = new THREE.Mesh( geometry, material );
		cubes[i+1].position.x = -30 + (15 * posO);
		cubes[i+1].position.z = 300 + (200 * i / 2 );
		scene.add(cubes[i+1]);
	}

	//CarColisionBox

		var geometry = new THREE.BoxGeometry(6, 4, 10 );
		var material = new THREE.MeshBasicMaterial( {color: 0x66FFF, side: THREE.DoubleSide} );
		cube = new THREE.Mesh( geometry, material );
		cube.position.set (z , 0, -15);
		//scene.add(cube);

	//plane.rotation.x = 90*Math.PI/180;
	//--------------------------------
	scene.add(new THREE.AmbientLight(0xFFFFFF));
	scene.add(new THREE.DirectionalLight(0xFFFFFF, 0.5));
	scene.add(new THREE.SpotLight(0xCC00CC, 1.0));

	var sphere = new THREE.SphereGeometry( 0.1, 16, 8 );
	//spotLight.position.set( 10, 10, 10 );
	var spotLight = new THREE.PointLight( 0x0D4F8B, 2 , 50);
	spotLight.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x0D4F8B } ) ) );
	spotLight.position.set( -0.5, 8, -35);
	scene.add( spotLight );

	var light2 = new THREE.PointLight( 0xFF0000, 2 , 50 );
	light2.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xFF0000 } ) ) );
	light2.position.set( 0.5, 8, -35);
	scene.add( light2 );

	container.appendChild( renderer.domElement );

	window.onkeydown = keydownHandler;
	window.onkeyup = keyupHandler;
}

function addModels(){
	if(!addedBmw && finishBmw){
		scene.add(bmw);
		scene.add(FL);
		scene.add(FR);
		scene.add(BL);
		scene.add(BR);
		
		addedBmw = true;
	}
}

function update(){
	addModels();
	for ( i=0; i<500; i+=2){
		cubes[i].position.z -= 5;
		cubes[i+1].position.z -= 5;
	}
	//bmw.rotation.y+=.01;
	FL.rotation.x-= 1;
	FR.rotation.x-= 1;
	BL.rotation.x-= 1;
	BR.rotation.x-= 1;
	checkKeys();

	camera.lookAt(scene.position);
}

function render (){

	requestAnimationFrame(render);

	update();

	
	renderer.render(scene, camera);


}
//con js, agregar: $(document).ready(function()){
