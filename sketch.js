var runner, obstacle, obstacleImg, coins, score, runnerImg, road, roadImg;

var obstacleGroup;

var gameState = 0;
function preload() {
  runnerImg = loadImage("car.png");
  roadImg = loadImage("road.JPG")
  obstacleImg = loadImage("obstacle.png")
}

function setup() {
  createCanvas(800,400)

  road = createSprite(500,200,800,400)
  road.scale = 1.5
  road.addImage("road", roadImg)

  runner = createSprite(50,200,20,20)
  runner.addImage("runner", runnerImg)
  runner.velocityX = 2;
  runner.scale = 0.5;

  obstacleGroup = new Group()
}

function draw() {
  background(255)
  camera.position.x = runner.x

  drawSprites()
  if (gameState == 0) {
    if (road.x < 300) {
      road.x = 500
    }
    createObstacle()
  
    if (keyDown("UP_ARROW")) {
      runner.y -= 5
    }
    if (keyDown("DOWN_ARROW")) {
      runner.y += 5
    }
    if (runner.isTouching(obstacleGroup)) {
      gameState = 1;
      console.log()
    }
    
    if (runner.x > 4000) {
      gameState = 2
    }
  
  }
  
  if (gameState == 2) {
    runner.velocityX = 0
    obstacleGroup.setVelocityXEach(0)
    fill("green")
    textSize(30)
    text("YOU WIN",200,200)
  }


  if (gameState == 1) {
    runner.velocityX = 0
    obstacleGroup.setVelocityXEach(0)
    fill("red")
    textSize(30)
    text("GAME OVER",200,200)
  }

}
function createObstacle() {
  
  if (frameCount % 80 === 0) {
    var randomX = Math.round(random(1,3))
    if (randomX == 1){
      obstacle = createSprite(runner.x + 350,80,20,20)
    } else if (randomX == 2){
      obstacle = createSprite(runner.x + 350,190,20,20)
    } else {
      obstacle = createSprite(runner.x + 350,330,20,20)
    }
    obstacle.addImage("obstacle", obstacleImg)
    obstacle.scale = 0.2;
    obstacleGroup.add(obstacle)
  }

  

}