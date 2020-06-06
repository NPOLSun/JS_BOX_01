const btn_bg_color = document.querySelector(".button_box #bg_color");
const canvas = document.querySelector("canvas");
let ctx = canvas.getContext('2d');
let box_drawn = 0;
let box_position_x = 0;
let box_position_y = 650;
let timer_start = new Date();
let acc=0;

// box 만들기
function draw_box(){        
    if(!box_drawn){    
        ctx.fillStyle = 'black';            
        ctx.fillRect(box_position_x,box_position_y,50,50);
        box_drawn = 1;        

    } else {
        ctx.clearRect(box_position_x,box_position_y,50,50);
        box_drawn = 0;
    }
}

// box move를 위한 box 생성
function draw_box_move(x,y){        
    // 기존 박스 삭제
    ctx.clearRect(box_position_x,box_position_y,50,50);
      
    // 나가리시 border 밖으로 벗어나지 않게 해주는 판정
    console.log(x,y);

    if (x+50 > 700){
        x = 650;
    }
    if (x < 0){
        x = 0;
    }
    if (y+50 > 700){
        y = 650;
    }
    if (y < 0){
        y = 0;
    }


    // 새로운 위치에 box 생성   
    ctx.fillStyle = 'black'; 
    ctx.fillRect(x,y,50,50);
    

    // 위치설정
    box_position_x = x;
    box_position_y = y;    


}



// Keyboard 방향선택시 판정
function keydown(event){
    
    // 속도 결정     
    let timer_now = new Date();    
    let vel = 3 + ((timer_now - timer_start)+1000)/50;
    if (vel>20){
        vel = 20;
    }
    
    // 왼쪽 오른쪽
    switch (event.code){        
        case "ArrowRight":                        
            draw_box_move(box_position_x + vel,box_position_y);
            break;
        case "ArrowLeft":            
            draw_box_move(box_position_x - vel,box_position_y);
            break;
        case "ArrowUp":
            draw_box_move(box_position_x,box_position_y-vel);
            break;
        case "ArrowDown":
            draw_box_move(box_position_x,box_position_y+vel);
            break;
    }    
        
}

// RIGHT
function box_move(){
    

}



// line 그리기
function line(){        
    ctx.beginPath();
    ctx.moveTo(0,50);    
    ctx.lineTo(75,50);
    ctx.lineTo(75,70);
    ctx.stroke();    
}

function init(){     
}



btn_bg_color.addEventListener('click',draw_box);

document.addEventListener('keydown', keydown);
// 키 뗐을때 가속도시간 초기화
document.addEventListener('keyup', ()=>{
    timer_start = new Date();
})


init();



