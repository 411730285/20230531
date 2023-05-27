let points = [[-2,-2],[0,-3],[1,-3],[2,-2],[1,-1],[0,-2],[-2,-2],[-4,-1],[-3,-3],[-1,-6],[3,-6],[5,-4],[5,-2],[3,-1],[5,1],[5,3],[7,1],[5,1],[5,3],[3,5],[1,5],[-1,3],[-1,1],[1,-1],[0,-2],[-2,-2]]
var colors = "ff7b00-ff8800-e5383b-ffa200-ffaa00-ffb700-ffc300-ffd000-ffdd00-ffea00".split("-").map(a=>"#"+a)
var stroke_colors = "005f73-073b4c-1b263b-6a040f-2b2d42".split("-").map(a=>"#"+a)
//粒子，類別
// class Obj{
//   constructor(args){ //預設值，物件的基本資料(顏色、位置、大小...)
//     this.p = args.p || {x:random(width),y:random(height)} //一個物件開始的位置
//     this.v = {x:random(-1,1),y:random(-1,1)} //速度，亂數-1~1之間
//     this.size = random(3,10) //大小
//     this.color = random(colors) //顏色
//     this.stroke = random(stroke_colors) //線條顏色
//   }
//   draw(){//把物件畫出來
//     push()
//     translate(this.p.x,this.p.y)
//     scale((this.v.x<0?1:-1),-1) //放大縮小的指令，若this.v.x < 0，則值為1，否則為-1
//     fill(this.color)
//     stroke(this.stroke)
//     beginShape()
//     for(var i=0;i<points.length-1;i++){
//       // line(points[i][0]*this.size,points[i][1]*this.size,points[i+1][0]*this.size,points[i+1][1]*this.size)
//       vertex(points[i][0]*this.size,points[i][1]*this.size)
//     }
//     endShape()
//     pop()
//   }
//   move(){ //讓物件移動
//     this.p.x = this.p.x + this.v.x
//     this.p.y = this.p.y + this.v.y
//     if(this.p.x<=0 || this.p.x>=width){ //<=0碰到左邊，>width碰到右邊
//       this.v.x = -this.v.x //碰到後速度改變
//     }
//     if(this.p.y<=0 || this.p.y>=height){ //<=0碰到下面，>=碰到上面
//       this.v.y = -this.v.y
//     }
//   }
//   isBallInRanger(){
//     let d = dist(mouseX,mouseY,this.p.x,this.p.y) //計算滑鼠按下與物件的距離
//     if(d/this.size<5.5){ //6為座標點中最大的值，以此距離幫物件畫出方框
//       return true //代表有在距離內
//     }
//     else{
//       return false //代表沒有在距離內
//     }
//   }
// }

var ball //代表單一個物件，利用這個變數來做正在處理的物件
var balls = [] //陣列，放所有的物件資料
// ++++++++++++++++++++
var score = 0
// ++++++++++++++++++++
var bullet
var bullets = []
// ++++++++++++++++++++
var monster
var monsters = []
// ++++++++++++++++++++
var shipP //設定砲台位置

function preload(){ //最早執行的程式碼
  duck_sound = loadSound("sound/656324__miaopolus__rubber-duck-single-squeak.wav")  
  monster_sound = loadSound("sound/401542__conarb13__pop-sound.mp3")
}

function setup(){
  createCanvas(windowWidth, windowHeight);
  shipP = createVector(width/2,height/2) //預設砲台位置微設窗中間

  for(var j=0;j<15;j++){
    ball = new Obj({}) //產生一個新的物件，暫時放到ball變數中
    balls.push(ball) //把ball物件放到balls物件群(陣列)中
  }
  for(var j=0;j<20;j=j+1){
    monster = new Monster({})
    monsters.push(monster)
  }
}

function draw() {
  background(220);
  if(keyPressed){
    if(key=="ArrowLeft"){
      shipP.x = shipP.x-1
    }
    if(key=="ArrowRight"){
      shipP.x = shipP.x+1
    }
    if(key=="ArrowUp"){
      shipP.y = shipP.y-1
    }
    if(key=="ArrowDown"){
      shipP.y = shipP.y+1
    }
  }
  for(let ball of balls){ //針對陣列變數，取出陣列內的每個物件
    ball.draw()
    ball.move()
    //由此判斷每隻大象有沒有接觸到飛彈
    for(let bullet of bullets){
      if(ball.isBallInRanger(bullet.p.x,bullet.p.y)){ //判斷ball與bullet有沒有接觸
        score = score-1
        duck_sound.play()
        balls.splice(balls.indexOf(ball),1)
        bullets.splice(bullets.indexOf(bullet),1)
      }
    }
  }
  for(let bullet of bullets){ //針對陣列變數，取出陣列內的每個物件
    bullet.draw()
    bullet.update()
  }
  for(let monster of monsters){ //針對陣列變數，取出陣列內的每個物件
    monster.draw()
    monster.update()
    for(let bullet of bullets){
      if(monster.isBallInRanger(bullet.p.x,bullet.p.y)){ //判斷ball與bullet有沒有接觸
        score = score+1
        monster_sound.play()
        monsters.splice(monsters.indexOf(monster),1)
        bullets.splice(bullets.indexOf(bullet),1)
      }
    }
  }
  push()    
    fill(0)
    rect(45,10,133,45)
  pop()
  rect(45,55,133,50)
  textSize(50)
  push()
  textSize(45)
    fill(255)  
    text("score",57,45)
  pop()
  text(score,95,98)
  push() //砲台
    let dx = mouseX-width/2 //滑鼠座標到中心座標x的距離
    let dy = mouseY-height/2 //滑鼠座標到中心座標y的距離
    let angle = atan2(dy,dx) //利用反tan算出角度
    // translate(width/2,height/2)
    translate(shipP.x,shipP.y) //砲台位置使用shipP向量值
    // let angle = atan2(mouseY,mouseX)
    rotate(angle)
    fill(200) 
    ellipse(0,35,40,30)
    ellipse(0,-35,40,30)
    fill("#77797e")
    ellipse(0,0,70)
    fill("#42464c")
    triangle(75,0,-15,-25,-15,25)
    fill(0)
    ellipse(0,0,20)
  pop()
}
function mousePressed(){  
  // for(let ball of balls){//當滑鼠按下物件時消失
  //   if(ball.isBallInRanger(mouseX,mouseY)){
  //     score = score+1
  //     balls.splice(balls.indexOf(ball),1) //把陣列內編號第幾個刪除，只刪除1個(indexOf()找出ball的編號
  //   }
  // }
  bullet = new Bullet({})
  bullets.push(bullet)
  // bullet_sound.play() //滑鼠按下發射飛彈聲音播放
}
// function mousePressed(){ //當滑鼠按下產生一個物件
//   ball = new Obj({
//     p:{x: mouseX,y:mouseY}
//   })
//   balls.push(ball)
// }
function keyPressed(){ //鍵盤
  if(key==" "){ //按下空白鍵
    bullet = new Bullet({})
    bullets.push(bullet)
  }

}


