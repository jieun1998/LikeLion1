const startbtn2 = document.querySelector('#start2');
const resetbtn2 = document.querySelector('#reset2');
let totaltime = 0;

let timerFunction = function () {
    totaltime = totaltime - 1;

    let minute = Math.floor(totaltime/60);
    let second = totaltime % 60;

    if (minute < 10) minute = '0' + minute;
    if (second < 10) second = '0' + second;
    let timenow = minute + ':' + second;

    let timeshown = document.querySelector("#w_timer h3");
    timeshown.textContent = timenow;
}

var b,c;
startbtn2.onclick = function () {
    if (totaltime ===0){
        minutetimer = Number(document.querySelector('#m_timer').value);
        secondtimer = Number(document.querySelector('#s_timer').value);
        totaltime = minutetimer * 60 + secondtimer;
    }
    document.querySelector('#m_timer').value ='';
    document.querySelector('#s_timer').value ='';
    
    let curState = document.querySelector('#start2').textContent;

    if (curState === 'start' && totaltime !==0) {
        document.querySelector('#start2').textContent = 'stop';
        b = setInterval(timerFunction, 1000);
        c = setInterval(function(){
            if(totaltime===0) clearInterval(b);
        },1000);    
    } else {
        document.querySelector('#start2').textContent = 'start'; 
        clearInterval(b);clearInterval(c);
    }
    
}

resetbtn2.onclick = function () {
    let timeshown = document.querySelector('#w_timer h3');
    timeshown.textContent = '00:00';
}