var START=1
var PLAY = 2;
var END = 0;
var gameState = START;
var bgimage, bgsprite;
var boy,boyani, boystop;
var corona, coronai,coronaG;
var ground;
var life1, life2, life3, lifeImg;
var mask,maski;
var score=0;
var count=0;
var blackH;
var points;
var reseti;
var vaci,vac;
var co=0;
var de,play,texte,dew,playw,textew;
var intro, dev,pb;
var pbimage;
var cong,congimage;
var vaci,vacimage;

function preload(){
bgimage=loadImage("bg.jpg");

boyani=loadAnimation("boy1.png","boy2.png","boy3.png","boy4.png","boy5.png");
boystop=loadAnimation("boy1.png");

lifeImg= loadImage("heart.png");
blackHeart= loadImage("black-heart.png");
coronai=loadImage("corona.png")

maski=loadImage("Mask.png")

reseti= loadImage("reseet.png");

vaci=loadImage("vac.png");

blackH = loadSound("oneHeart gone.wav");
points= loadSound("point.wav");

de=loadImage("DE.png");
play=loadImage("play.png");
texte=loadImage("CORONA WAR TEXT.png");
pbimage=loadImage("playbutton.png");

congimage=loadImage("congratulations.png");
vacimage=loadImage("vaccinated.png");

}


function setup() {
  createCanvas(800,400);
 
  bgsprite=createSprite(400,50);
  bgsprite.addImage(bgimage);
  bgsprite.velocityX=-3;
  bgsprite.scale=1.3
 
  
  life1= createSprite(30,59);
  life1.addAnimation("lifee1",lifeImg);
  life1.addAnimation("black1",blackHeart);
  life1.scale= 0.1;
 
  life2= createSprite(60,59);
  life2.addAnimation("lifee2",lifeImg);
  life2.addAnimation("black2",blackHeart);
  life2.scale= 0.1;
  

  life3= createSprite(90,59);
  life3.addAnimation("lifee3",lifeImg);
  life3.addAnimation("black3",blackHeart);
  life3.scale= 0.1;
 
  
  boy=createSprite(50,400);
  boy.addAnimation("walking",boyani);
  boy.addAnimation("stop",boystop);

  
  ground=createSprite(50,400,1000,10);


  reset= createSprite(400,200);
  reset.addImage(reseti);
 
  intro=createSprite(400,150);
  intro.addImage(texte);

  dev=createSprite(400,200)
  dev.addImage(de);
  dev.scale=0.5

  pb=createSprite(400,270);
  pb.addImage(pbimage);
  pb.scale=0.08

  coronaG=createGroup();
  maskG=createGroup();
  vacG=createGroup();

  boy.debug=true
  boy.setCollider("rectangle",0,0,50,170)

  cong=createSprite(400,150);
  cong.addImage(congimage);
  cong.scale=0.7

  vaci=createSprite(400,230);
  vaci.addImage(vacimage);
  vaci.scale=0.5

  cong.visible=false;
  vaci.visible=false;

 /* if (gameState===START){
intro=createSprite(200,200);
intro.addImage(texte);
console.log("g"+gameState);
    
  }*/

  

 
}




function draw(){
  background("white");

  console.log("game"+gameState);

  if(gameState===START){

    intro.visible=true;
    dev.visible=true;
    pb.visible=true;
    boy.visible=false;
    reset.visible=false;
    ground.visible=false;
    
    bgsprite.velocityX=0;

    if(mousePressedOver(reset)){
      gameState=PLAY;
      bgsprite.velocityX=-3
      intro.visible=false;
    dev.visible=false;
    pb.visible=false;
    boy.visible=true;
    reset.visible=false;
    ground.visible=false;

    }


  }

  if(gameState===PLAY){

ground.visible=false

  spawncorona();
  spawnmask();

  if(score===10 || score===20){
  spawnvace();
  }
 

  
    reset.visible=false;
  if(bgsprite.x<0){
    bgsprite.x=400
  }
  if(keyDown("space")&& boy.y >= 160){
    boy.velocityY=-10;
  }
  boy.velocityY = boy.velocityY + 0.8

  for (var i = 0; i  < maskG.length; i++ ){
  if(maskG.get(i).isTouching(boy)){
    maskG.get(i).destroy();
   score=score + 1
   points.play();
  }
}

for (var i = 0; i  < vacG.length; i++ ){
  if(vacG.get(i).isTouching(boy)){
    vacG.get(i).destroy();
    console.log("vaccine")
    co= co+1;
    if( co === 1){
      points.play();
    }
    if( co === 2){
      points.play();
      //WIN();
      
    }
  }
}


  for (var i = 0; i  < coronaG.length; i++ ){
    if(coronaG.get(i).isTouching(boy)){
      coronaG.get(i).destroy();
      score=score-1;

      count= count+1;
      if( count === 1){
        life1.changeAnimation("black1",blackHeart);
        blackH.play();
      }
      if( count === 2){
        life2.changeAnimation("black2",blackHeart);
        blackH.play();
      }
      if( count === 3){
        life3.changeAnimation("black3",blackHeart);
        blackH.play();
        gameState=END;
      }
    }
  }
  console.log(gameState)
}

if(gameState===END){
  console.log("executing this block")
  coronaG.destroyEach();
  maskG.destroyEach();
  boy.changeAnimation("stop",boystop);
  bgsprite.velocityX=0;

  reset.visible=true;
 

  
  
  score = 0;
  
  if(mousePressedOver(reset)){
    restart();
   
    
   }
}

  boy.collide(ground);

  
  drawSprites();

  if(gameState===PLAY || gameState===END){
    textSize(20);
    fill("green")
    text("score "+score,713,58)
    text("Vaccine: "+co,700,80)
  
    
  }

}

function spawncorona(){
  if(score>5){ 
    if(frameCount%60===0){
     corona= createSprite(800,340);
    
     corona.addImage(coronai)
   corona.debug=true
   corona.velocityX=-6;
 
   corona.scale=0.27
   coronaG.add(corona);
   }
 }
}

 function spawnmask(){
  if(frameCount%150===0){

    mask=createSprite(800,340);
    mask.y=Math.round(random(100,340))
    
    mask.addImage(maski);
    mask.velocityX=-6;

    mask.scale=0.2
    maskG.add(mask);
  
  }

}

function spawnvace(){
 if(frameCount%150===0){ 
  vac=createSprite(800,150);
  vac.addImage(vaci)
  vac.scale=0.27
  vac.velocityX=-6
  vacG.add(vac)
  
  }
}

function restart(){
  gameState=PLAY;
  bgsprite.velocityX=-3;
  boy.changeAnimation("walking",boyani)
  score=0;
  life1.changeAnimation("lifee1",lifeImg);
  life2.changeAnimation("lifee2",lifeImg);
  life3.changeAnimation("lifee3",lifeImg);
count=0;
co=0;

}

function WIN(){
  coronaG.destroyEach();
  maskG.destroyEach();
  boy.changeAnimation("stop",boystop);
  bgsprite.velocityX=0;

  reset.visible=true;
 

  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
  console.log(localStorage["HighestScore"]);
  
  score = 0;
  
  if(mousePressedOver(reset)){
    restart();
   
    
   }
 textSize(5)
  text("WIN",400,300)
}

