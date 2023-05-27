class Obj{
  constructor(args){ //預設值，物件的基本資料(顏色、位置、大小...)
    this.p = args.p || {x:random(width),y:random(height)} //一個物件開始的位置
    this.v = {x:random(-1,1),y:random(-1,1)} //速度，亂數-1~1之間
    this.size = random(3,10) //大小
    this.color = random(colors) //顏色
    this.stroke = random(stroke_colors) //線條顏色
  }
  draw(){//把物件畫出來
    push()
    translate(this.p.x,this.p.y)
    scale((this.v.x<0?1:-1),-1) //放大縮小的指令，若this.v.x < 0，則值為1，否則為-1
    fill(this.color)
    stroke(this.stroke)
    beginShape()
    for(var i=0;i<points.length-1;i++){
      // line(points[i][0]*this.size,points[i][1]*this.size,points[i+1][0]*this.size,points[i+1][1]*this.size)
      vertex(points[i][0]*this.size,points[i][1]*this.size)
    }
    endShape()
    pop()
  }
  move(){ //讓物件移動
    this.p.x = this.p.x + this.v.x
    this.p.y = this.p.y + this.v.y
    if(this.p.x<=0 || this.p.x>=width){ //<=0碰到左邊，>width碰到右邊
      this.v.x = -this.v.x //碰到後速度改變
    }
    if(this.p.y<=0 || this.p.y>=height){ //<=0碰到下面，>=碰到上面
      this.v.y = -this.v.y
    }
  }
  isBallInRanger(x,y){
    let d = dist(x,y,this.p.x,this.p.y) //計算滑鼠按下與物件的距離
    if(d/this.size<5.5){ //6為座標點中最大的值，以此距離幫物件畫出方框
      return true //代表有在距離內
    }
    else{
      return false //代表沒有在距離內
    }
  }
}
