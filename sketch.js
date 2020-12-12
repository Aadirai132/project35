//Create variables here
var dog,happyDog,dogImg;
var database;
var food,foodStock;

function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");

  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500,500);

  database = firebase.database();

  foodStock = database.ref('food');
  foodStock.on("value",readStock);

  dog = createSprite(200,350,5,5);
  dog.addImage(dogImg);
  dog.scale = 0.2;
  
}


function draw() 
{
  background(46,139,87);

  if(keyIsDown(UP_ARROW))
  {
    console.log("key is down");
    writeStock(food);
    dog.addImage(happyDog);
    
  }  

  drawSprites();
  //add styles here
  textSize(20);
  fill("black");
  stroke("black");
  text("Food Remaining : "+food,100,200);
  text("Note : press UP_ARROW to feed the puppy!",50,20);

}
function readStock(data)
{
  food = data.val();
}
function writeStock(x)
{
   if(x<=0)
   {
     x=0;
   }
   else{
     x=x-1;
   }

   database.ref('/').update({
     food:x
   })
}



