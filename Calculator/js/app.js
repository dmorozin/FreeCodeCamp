const nums = document.querySelectorAll('.broj'),
      plus = document.getElementById('plus'),
      minus = document.getElementById('minus'),
      puta = document.getElementById('puta'),
      kroz = document.getElementById('kroz'),
      equ = document.getElementById('equ'),
      mainResult = document.getElementById('main'),
      clear = document.getElementById('AC'),
      del = document.getElementById('CE'),
      sub = document.getElementById('sub');

let res = 0, 
    mainRes='',
    arr = [],
    str='',
    result=false;

  

nums.forEach(function(num){
    num.addEventListener('click', function(e){
        if(this.textContent === '.' && str.charAt(str.length-1) === '.'){
            return;
        }
        if(result){
            str='';
            result=false;
        }
        mainResult.textContent='';
        let val = this.textContent;
        mainRes += val;    
        str += val;
        if(checkDots(mainRes) === 2){
            mainRes = mainRes.slice(0, -1);
            str = str.slice(0,-1);
        } else if(str.length > 9){
            mainResult.textContent = '0';
            sub.textContent = 'Digit limit met';
            str='';
            mainRes='';
            return;
        }
        console.log(str);
        mainResult.textContent = mainRes;
        sub.textContent = str;
        e.preventDefault();
    });
});

minus.addEventListener('click', function(){operators('-');});
puta.addEventListener('click', function(){operators('*');});
plus.addEventListener('click', function(){operators('+');});
kroz.addEventListener('click', function(){operators('/');});


equ.addEventListener('click', function(){
    let equResult = eval(str);
    if(!Number.isInteger(equResult)){
        equResult = equResult.toFixed(2)
    }
    mainResult.textContent = equResult;
    sub.textContent = str+'='+equResult;
    mainRes='';
    result=true;
});

del.addEventListener('click', function(){
    let i, arr = str.split(''), index=0, zadnji = str.charAt(str.length-1);
    console.log(arr);

    if(result){
        str='';
        mainResult.textContent = 0;
        sub.textContent = 0;
        return;
    }

    if(zadnji === '/' || zadnji === '*' || zadnji === '-' || zadnji === '+'){
        index = str.length - 1;
    } else {
        for(i = arr.length - 1; i >= 0; i--){
            if(isNaN(arr[i]) && arr[i]!=='.'){
                index = i+1;
                break;
            } 
        }
    }

    str = str.substring(0, index);
    console.log(str);

    mainRes = '';
    mainResult.textContent = 0;
    sub.textContent = str;
});


clear.addEventListener('click', function(){
    str='';
    mainRes = '';
    mainResult.textContent = '0';
    sub.textContent = '0';
});



function operators(operator){
    if(!isNaN(str.charAt(str.length-1)) && str!=='') {
        if(result){
            let equResult = eval(str);
            if(!Number.isInteger(equResult)){
                equResult = equResult.toFixed(2)
            }
            str=equResult;
            sub.textContent = str;
            result=false;
        }
        str += operator;
        mainResult.textContent = operator;
        mainRes='';
        console.log(str);
    }
}


function checkDots(str){
    let arr = str.split(''), cnt=0;
    for(let i = 0; i < arr.length; i++){
        if(arr[i]==='.')
            cnt++;
    }  
    return cnt; 
}