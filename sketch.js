var balloon,height,bg, balloonImage1, balloonImage2;
var database;


function preload() {

  bg=loadImage("images/bg.png");
  balloonImage1=loadAnimation("images/balloon1.png");
  balloonImage2=loadAnimation("images/balloon1.png","images/balloon1.png","images/balloon1.png",
  "images/balloon2.png","images/balloon2.png","images/balloon2.png","images/balloon3.png",
  "images/balloon3.png","images/balloon3.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1500,700);

  balloon = createSprite(250, 650, 150, 150);
  balloon.addAnimation("baloonAnimation",balloonImage1);


  var balloonHeight=database.ref("balloon/height");
  balloonHeight.on("value", readHeight, showError)


}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    updateHeight(-10,0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
  }
  else if(keyDown(RIGHT_ARROW)){
    updateHeight(10,0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
  }
  else if(keyDown(UP_ARROW)){
    updateHeight(0,-10);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale=balloon.scale -0.005;
  }
  else if(keyDown(DOWN_ARROW)){
    updateHeight(0,+10);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale=balloon.scale+0.005;
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}


function updateHeight(x,y){
  database.ref('balloon/height').set({
    'x': height.x + x ,
    'y': height.y + y
  })
}

function readHeight(data){
  height = data.val();
//  console.log(height.x);
  balloon.x = height.x;
  balloon.y = height.y;
}

function showError(){
  console.log("Error in writing to the database");
}
