var dog, happyDog, dogImage;
var database;
var foodS, foodStock, lastFed;

function preload(){
  dogImage = loadImage('images/dogImg.png');
  happyDog = loadImage('images/dogImg1.png');
}

function setup() {
	createCanvas(500,500);
  database = firebase.database();

  dog = createSprite(250,300);
  dog.addImage(dogImage);
  dog.scale = 0.2;

  foodStock = database.ref('Food');
  
  foodStock.on("value",readStock);
}


function draw() {  
  background(46,139,75);
  
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }
  drawSprites();
  text("Food remaining: "+foodS, 225, 100);
  text("Press the up arrow to feed your dog!", 250, 50);
  
  
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x = 0;
  } else {
    x = x-1;
  }
  database.ref('/').update({
    Food:x
  })
}
