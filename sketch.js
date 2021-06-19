let video;
let label = 'waiting for video feed to load...';
let classifier;
let snake;
let rez=20;
let food;
let w;
let h;

function preload()
{
  classifier = ml5.imageClassifier(' https://storage.googleapis.com/tm-model/z2Y0eNeiG/model.json')
}

function setup() 
{
  createCanvas(800, 600);
  video=createCapture(VIDEO);
  video.hide();
  
  classifyVideo();
  
  w=floor(width/rez);
  h=floor(height/rez);
  frameRate(5);
  snake=new Snake();
  foodLocation();
  
}

function classifyVideo()
{
  classifier.classify(video, gotResults);
}

function gotResults(error, results)
{
  if(error)
    {
      console.error(error);
      return;
    }
  label = results[0].label;
  controlSnake();
  classifyVideo();
}

function foodLocation() 
{
  let x = floor(random(w));
  let y = floor(random(h));
  food = createVector(x, y);
}

function controlSnake() {
  if (label === 'Left') 
  {
    snake.setDir(-1, 0);
  } 
  else if (label === 'Right') 
  {
    snake.setDir(1, 0);
  } 
  else if (label === 'Down') 
  {
    snake.setDir(0, 1);
  } 
  else if (label === 'Up') 
  { 
    snake.setDir(0, -1);
  }  
}

function draw() 
{
  background(200);
  push();
  translate(width,0);
  scale(-1, 1);
  image(video, 0, 0, 200, 150);
  pop();  
    
  text(label,210,20);
  textSize(22);
  fill(255);
  scale(rez);
  if (snake.eat(food)) 
  {
    foodLocation();
  }
  snake.update();
  snake.show();

  if (snake.endGame()) 
  {
    background(0,0,0);
    textSize(32);
    window.alert('Game Over, please refresh the page.')
    NoLoop();
  }
  noStroke();
  fill(255, 0, 0);
  rect(food.x, food.y, 1, 1);
}