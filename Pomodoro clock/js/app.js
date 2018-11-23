const minSpan = document.getElementById('min'),
      secSpan = document.getElementById('sec'),
      breakLength = document.getElementById('break-length'),
      decBreak = document.getElementById('break-minus'),
      incBreak = document.getElementById('break-plus'),
      session = document.getElementById('session-length'),
      decSession = document.getElementById('session-minus'),
      incSession = document.getElementById('session-plus'),
      state = document.getElementById('state'),
      elem = document.getElementById('myBar');

let min = sessionValue = Number(minSpan.textContent),
    sec = Number(secSpan.textContent),
    breakValue = Number(breakLength.textContent),
    startMin = Number(minSpan.textContent), 
    width=1,
    stop = false, sessionBool = true, breakBool = false;

    
setTimeout(change,1000);


document.getElementById('count').addEventListener('click', function(){
    stop = !stop;
});


incBreak.addEventListener('click', function(){
    if(stop || (min===0 && sec===0)){
        breakValue++;
        breakLength.textContent = breakValue;
        if(breakBool){
           resetTimer(breakValue);
        }
    }
});

decBreak.addEventListener('click', function(){
    if(Number(breakLength.textContent) > 1){
        if(stop || (min===0 && sec===0)){
            breakValue--;
            breakLength.textContent = breakValue;
            if(breakBool){
               resetTimer(breakValue);
            }
        }
    }
});


incSession.addEventListener('click', function(){
    if(stop || (min===0 && sec===0)){
        sessionValue++;
        session.textContent = sessionValue;
        if(!breakBool){
            resetTimer(sessionValue);
        }
    }
});

decSession.addEventListener('click', function(){
    if(Number(session.textContent) > 1){
        if(stop || (min===0 && sec===0) ){
            sessionValue--;
            session.textContent = sessionValue;
            if(!breakBool){
                resetTimer(sessionValue);
            }
        }
    }
});


document.getElementById('reset').addEventListener('click', function(){
    if(!breakBool){
        resetTimer(sessionValue);
    } else if(breakBool){
        resetTimer(breakValue);
    }
});


function change(){
    min = Number(minSpan.textContent);
    
    if(!stop){
        if(min===0 && sec === 0){
            minSpan.textContent = 0;
            secSpan.textContent = 0+'0';
            breakBool = !breakBool;
            breakTime();
        } else {
            sec--;
            if(sec === -1){
                min--;
                sec=59;
            } 
            minSpan.textContent = min;
            secSpan.textContent = sec < 10 ? '0' + sec : sec;
            let num = breakBool === true ? Number(breakLength.textContent) : Number(session.textContent);
            loadBar(num);
        }  
       
    }     

    setTimeout(change, 1000);
}



function breakTime(){
    if(breakBool){
        minSpan.textContent = breakLength.textContent;
        width=0;
        elem.style.height = '0%';
        state.textContent = 'Break';
        document.querySelector('.content').style.left = "60px";
    }
    else if(!breakBool) {
        minSpan.textContent = session.textContent;
        width=0;
        elem.style.height = '0%';
        state.textContent = 'Session';
        document.querySelector('.content').style.left = "47px";
    }
    secSpan.texContent = '00';
    sec = 0;
}


function loadBar(num){
    if(width <= 100) {
        width += (1/(num * 60))*100;
        elem.style.height = width + '%';
    } 
}


function resetTimer(value){
    minSpan.textContent = value;
    secSpan.textContent = '00';
    sec = 0;
    width = 0;
    elem.style.height = '0%';
}

