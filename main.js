
const btn_bg_color = document.querySelector(".button_box #bg_color");
const canvas = document.querySelector('canvas');

let ctx = canvas.getContext('2d');
let box_drawn = 0;
let box_position_x = 0;
let box_position_y = 650;
let timer_start = new Date();
let acc=0;
let box_color='black'

// box 만들기
function draw_box(){        
    if(!box_drawn){    
        ctx.fillStyle = box_color;            
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
    ctx.fillStyle = box_color; 
    ctx.fillRect(x,y,50,50);
    

    // 위치설정
    box_position_x = x;
    box_position_y = y;    
}


// Box Color 변경
function box_color_chg(event){    
    box_color = event.target.style.backgroundColor;
    
    if(box_color!=''){        
        ctx.clearRect(box_position_x,box_position_y,50,50);        
        ctx.fillStyle = box_color;
        ctx.fillRect(box_position_x,box_position_y,50,50);       
        // 기존 selected 다 없애기
        let color_selectors = event.target.parentElement.parentElement.children;
        for (let i=0;i<Array.from(color_selectors).length;i++){
            event.target.parentElement.parentElement.children[i].classList.remove("selected");
        }
        event.target.parentElement.classList.toggle("selected");                                 
    }
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


function init(){     
    draw_box();
}


// 이벤트 모음

// 버튼눌렀을때 action
btn_bg_color.addEventListener('click',draw_box);

// 키 눌렀을때 box_move
document.addEventListener('keydown', keydown);
// 키 뗐을때 가속도시간 초기화
document.addEventListener('keyup', ()=>{
    timer_start = new Date();
})

// 버튼 클릭시 box color 변경
document.querySelector(".color_selector").addEventListener("click", box_color_chg);



init();



