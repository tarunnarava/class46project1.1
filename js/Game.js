class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200,30,30);
    car1.addImage("car1",car1_img);
car1.scale=0.5;

    car2 = createSprite(300,200);
    car2.addImage("car2",car2_img);
    car2.scale=0.5;

    car3 = createSprite(500,200);
    car3.addImage("car3",car3_img);
    car3.scale=0.5;

    car4 = createSprite(700,200);
    car4.addImage("car4",car4_img);
    car4.scale=0.5;

    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    player.getCarsAtEnd();



    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;
       // console.log(index, player.index)

       
        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,120,120);
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    if(player.distance > 3860){
      gameState = 2;
      player.rank+=1;
    
      Player.updateCarsAtEnd(player.rank);



    }
    

  /*  if (frameCount%20===0){
     
     aster= createSprite(0,Math.round(random(0,8000)));
    
      console.log("the aster locations are  x" + aster.x +"   y   " +aster.y);
       aster.addImage("moving",asteroid1img);
       aster.scale=0.5;
    aster.velocityX=2;
    
        
     asterGroup.add(aster);
      console.log("asteroid has been created");

    }*/


    drawSprites();


  }

 /* asteroiding()
{
  
    if (World.frameCount%300===0){
    aster=createSprite(400,random(100,3860),20,20);
     aster.addImage("moving",asteroid1img)
  aster.velocityY=2;
   // aster.y=(random(100,3860));
   // aster.setLifetime=50;
      
   asterGroup.add(aster);
    
  }
}*/


  end(){
    console.log("Game Ended");

console.log(player.rank);


  }
}
