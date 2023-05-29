var monster_colors = "10002b-240046-3c096c-5a189a-7b2cbf-9d4edd-c77dff-e0aaff".split("-").map(a=>"#"+a)
class Monster{
    constructor(args){ //預設值，基本資料
        this.r = args.r || random(30,90) //怪物的外圓
        this.p = args.p || createVector(random(width),random(height)) //怪物的位置
        this.v = args.v || createVector(random(-1,1),random(-1,1)) //怪物的速度
        this.color = args.color || random(monster_colors) //怪物的顏色
    }   
    draw(){
        push()
            translate(this.p.x,this.p.y)
            fill(this.color)
            noStroke()
            ellipse(0,0,this.r)
            fill(255)
            arc(0,0,this.r/2,this.r/2,0,PI)
            fill(0)
            arc(0,0,this.r/3,this.r/3,0,PI) 
            for(var j=0;j<8;j++){
                rotate(PI/4)
                beginShape()
                    stroke(this.color)
                    strokeWeight(2)
                    noFill()
                    for(var i=0;i<(this.r/2);i++){
                        vertex(this.r/2+i,sin(i/4+frameCount/10)*5) //10有關線條幅度
                    }
                endShape()
            }
            

        pop()
    }
    update(){
        this.p.add(this.v)
        if(this.p.x<=0 || this.p.x>=width){
            this.v.x = -this.v.x
        }
        if(this.p.y<=0 || this.p.y>= height){
            this.v.y = -this.v.y
        }
    }
    isBallInRanger(x,y){
        let d = dist(x,y,this.p.x,this.p.y) //計算滑鼠按下與物件的距離
        if(d<this.r/2){ //6為座標點中最大的值，以此距離幫物件畫出方框
          return true //代表有在距離內
        }
        else{
          return false //代表沒有在距離內
        }
      }
}




