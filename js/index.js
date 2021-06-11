const raceCanvas = document.getElementById('canvas');
const context = raceCanvas.getContext("2d");
document.getElementById('game-board').style.display = 'none'; //leaves the gameboard empty
document.getElementById('start-button').onclick = () => {
document.getElementById('game-board').style.display = 'block'; //blocks the image after pressing start
startGame();  
};


let currentGame; //has to be outside since it needs to be called by other functions so de

function startGame() {
  //instantiate a new game
  currentGame = new Game(); //this one holds EVERYTHING so you should start from this one
  //instantiate a new card
  let currentCar = new Car(); 
  currentGame.car = currentCar;
  currentGame.car.draw();
  updateCanvas();
}  
  

function detectColision(obstacle){
  return !(
    currentGame.car.x > obstacle.x + obstacle.width || //it means the car is on the right of the obstacle cus it's x is > than obst
    currentGame.car.x + currentGame.car.width < obstacle.x || //the car size is < than obstacle x, so to the left
    currentGame.car.y > + obstacle.y + obstacle.height //this checks height
    );

}



function updateCanvas(){
  context.clearRect(0, 0, raceCanvas.clientWidth, raceCanvas.clientHeight);
  currentGame.car.draw();
  currentGame.obstaclesFrequency++;
  if (currentGame.obstaclesFrequency % 100 === 1){
    const randomObstacleX = Math.floor(Math.random() * 450);
    const randomObstacleY = 0;
    const randomObstacleWidth = Math.floor(Math.random() * 50) +20 ;
    const randomObstacleHeight = Math.floor(Math.random() * 50) + 20;

    const newObstacle = new Obstacle(
      randomObstacleX,
      randomObstacleY,
      randomObstacleWidth,
      randomObstacleHeight
    );

    currentGame.obstacles.push(newObstacle);

    
  }

  //console.log(currentGame.obstacles);

  currentGame.obstacles.forEach((obstacle, index) => {
    obstacle.y += 1;
    obstacle.draw();

    if (detectColision(obstacle)) {
      currentGame.gameOver = true;
      currentGame.obstaclesFrequency = 0;
      currentGame.score = 0;
      currentGame.obstacles = [];
      document.getElementById('score').innerHTML = 0;
      document.getElementById('game-board').style.display = 'none';
      cancelAnimationFrame(currentGame.animatiodID); //calling the ending/restart of the game - its a native key
      alert ('BOOM! GAME OVER');
    }



    if (obstacle.y > raceCanvas.height){
      currentGame.score++;
      document.getElementById("score").innerHTML = currentGame.score;
      currentGame.obstacles.splice(index, 1)
    }


  });
  if (!currentGame.gameOver){ //this is to maske sure the game does not continue after u lose
  currentGame.animatiodID = requestAnimationFrame(updateCanvas); //animation is smoother than setInterval, otherwise same    
  }


};

document.addEventListener('keydown', (e) => { //e || keyboardEvent || event for event
  currentGame.car.moveCar(e.key);
//console.log(e); to see the webserver iding the pressing of the button
})
