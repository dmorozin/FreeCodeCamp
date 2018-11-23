const btn = document.querySelectorAll('.btn'),
      start = document.getElementById('start'),
      score = document.getElementById('score'),
      strict = document.getElementById('strict');

let rand;
let btnsArr = [];

const buttons =  [
    {
        index: 0,
        color: 'green',
        lightcolor:" #00e600",
        audio: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3")
    },
    {
        index: 1,
        color: 'red',
        lightcolor:"#ff4d4d",
        audio: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3")
    },
    {
        index: 2,
        color: 'yellow',
        lightcolor:"#ffff80",
        audio: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3")
    },
    {
        index: 3,
        color: 'blue',
        lightcolor:"#4d4dff",
        audio: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3")
    }
];

let end = false, klik = true, strictMode = false;
let j;

btn.forEach(function(val, i){
    val.addEventListener('click', function(){
        //if not yet started to avoid console errors
        if(btnsArr.length < 1)
        return;
        //during loading btns unable to click
        if(!klik) return;
        //declaring j if user is not finished with current step
        if(!end)
           j = 0;
        //if user clicked accurate btn
        if(i === btnsArr[j].index){
            changeColor(i);
            setTimeout(function(){val.style.backgroundColor = buttons[i].color},500);
            playAudio(i); 
            //inc j to get to next btn
            j++;
            console.log(i, j);    
            end=true;
        } else {
            console.log('wrong selection');
            //if in strict mode and its wrong
            if(strictMode){
                //reset and prepare for new loading
                j = 0;
                klik = false;
                btnsArr = [];
                score.textContent = '!!';
                setTimeout(loadNew,3000);
                return;
            } else {
                //start from first btn
                j = 0;
                //unable clicking
                klik = false;
                //show again all btns in step
                setTimeout(loadAll,500);
            }
        }
        
        //all accurate btns clicked
        if(j === btnsArr.length){
            //if game is won
            if(j === 20){
                j = 0;
                klik = false;
                btnsArr = [];
                score.textContent = 'WIN';
                setTimeout(loadNew,4000);
                return;
            }
            //load new
            setTimeout(loadNew,500);
            //unable click
            klik = false;
            //flag to enable j
            end=false;
        }
    
    });
});


start.addEventListener('click', function(){
    //zero btns in step
    btnsArr = [];
    score.textContent = '0';
    //load first btn
    setTimeout(loadNew,500);
});


strict.addEventListener('click', function(){
    strictMode = !strictMode;
    if(strictMode){
        document.getElementById('onof').style.background = 'red';
    }
    else  document.getElementById('onof').style.background = 'black';
});


function loadNew(){

    //disable start btn during showign btns
    start.disabled = true;
    
    //get random btn
    rand = Math.floor(Math.random()*btn.length);
    btnsArr.push(buttons[rand]);

    score.textContent = btnsArr.length;

    loadAll();
}


function loadAll(){ 
   //enable click and start btn when loading is finished (approx 1500*lenght)
    setTimeout(function(){
        klik=true;
        start.disabled = false;
    },1500*btnsArr.length);

    for(let i = 0; i < btnsArr.length; i++){
       
        (function(a){
            
            setTimeout(function(){
               
                console.log('inside timoeut '+btnsArr[a].color);
                //set btn white and play
                changeColor(btnsArr[a].index)
                //btn[btnsArr[a].index].style.backgroundColor='white';
                btnsArr[a].audio.load();
                btnsArr[a].audio.play();
                
                setTimeout(function(){btn[btnsArr[a].index].style.backgroundColor = btnsArr[a].color;},1000);
                
            },1500*a);
            
        })(i);     
      
    }
}


function changeColor(index){
    switch(index){
        case 0:
        btn[0].style.backgroundColor = buttons[0].lightcolor;
            break;
        case 1:
        btn[1].style.backgroundColor = buttons[1].lightcolor;
            break;
        case 2:
        btn[2].style.backgroundColor = buttons[2].lightcolor;
            break;  
        case 3:
        btn[3].style.backgroundColor = buttons[3].lightcolor;
            break;  
    }
}

function playAudio(index){
    switch(index){
        case 0:
            buttons[0].audio.load();
            buttons[0].audio.play();
            break;
        case 1:
            buttons[1].audio.load();
            buttons[1].audio.play();
            break;
        case 2:
            buttons[2].audio.load();
            buttons[2].audio.play();
            break;  
        case 3:
            buttons[3].audio.load();
            buttons[3].audio.play();
            break;  
    }
}
