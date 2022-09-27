class Game {
  constructor() {
    this.resetbutton=createButton("");
    this.leaderboard=createElement("h2")
    this.leader1=createElement("h3")
    this.leader2=createElement("h3")
    this.resettext=createElement("h3")
  }


  start() {

    form = new Form();
    form.display();
    player = new Player();
    player.getCount()
    car1=createSprite(width/2-100,0,0,0)
    car1.addImage("car1",car1img)
    car1.scale=(0.07)
    car2=createSprite(width/2+100,0,0,0)
    car2.addImage("car2",car2img)
    car2.scale=(0.07)
    cars=[car1,car2]
  }

  leaderb(){
    var leader1;
    var leader2;
    var players=Object.values(allPlayers)
    if(players[0].rank==0){
      leader1=players[0]
      leader2=players[1]
    }
    if(player[1].rank==0){
      leader1=players[1]
      leader2=players[0]
    }
    this.leader1.html(leader1.name+":"+leader1.score)
    this.leader2.html(leader2.name+":"+leader2.score)
  }
  play(){
    this.hideElements()
    this.resetbuton()
   
    form.greeting.hide()
    Player.getInfo()
    console.log(allPlayers)
    this.leaderb()
    if (allPlayers!=undefined){
      image(trackimg,0,-height*5,width,height*6)

      var index=0
      for(var plr in allPlayers){
        index+=1
        cars[index-1].position.x=allPlayers[plr].positionX
        cars[index-1].position.y=allPlayers[plr].positionY
        if(index==player.index){
          stroke(10)
          fill("cyan")
          ellipse(allPlayers[plr].positionX,allPlayers[plr].positionY,63)
         
          camera.position.y=cars[index-1].position.y
        }
      }
      if(keyIsDown(UP_ARROW)){
        player.positionY-=5
        player.updatePlayer()
        }
      if(keyIsDown(LEFT_ARROW)){
        player.positionX-=1
        player.updatePlayer()
      }
      if(keyIsDown(RIGHT_ARROW)){
        player.positionX+=1
        player.updatePlayer()
      }
      drawSprites()
    }
  }
  getState(){
    database.ref("gamestate").on("value",function(data){
      gameState=data.val()
    })
  }
  update(stat){
    database.ref("/").update({
      gamestate:stat
  })
  }
  hideElements(){
    form.hide()

    this.resetbutton.position(width/2+330,100)
    this.resetbutton.class("resetButton")
    this.resettext.position(width/2+330,40)
    this.resettext.class("resetText")
    this.resettext.html("reset?")
    this.leaderboard.class("resetText")
    this.leader1.class("leadersText")
    this.leader2.class("leadersText")
    this.leaderboard.position(width/3-60,40)
    this.leader1.position(width/3-50,80)
    this.leader2.position(width/3-50,130)
    this.leaderboard.html("Leaderboard")
  }

  resetbuton(){
    this.resetbutton.mousePressed(()=>{
      database.ref("/").set({
        playercount:0,
        gamestate:0,
        players:{}
      })
      window.location.reload()
    })    
  }
  
}
