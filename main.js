let RUNNING_TOTAL = 0;
let BUFFER = "0";
let PREV_OPERATOR;

function flushOperation(intBuffer){
    switch (PREV_OPERATOR) {
        case '+':
            RUNNING_TOTAL+=intBuffer
            break;
        case '−':
            RUNNING_TOTAL-=intBuffer
            break;
        case '×':
            RUNNING_TOTAL*=intBuffer
            break;
        case '÷':
            if(intBuffer== 0){
                alert('Делить на 0 нельзя!');
                BUFFER = "0";
                RUNNING_TOTAL = 0;
                return;

            }
            RUNNING_TOTAL/=intBuffer
            break;
    }
}

function handleMath(symbol){
    const intBuffer = parseInt(BUFFER);
    if(RUNNING_TOTAL === 0){
        RUNNING_TOTAL = intBuffer;
    }else{
    flushOperation(intBuffer)}
    PREV_OPERATOR = symbol;
    BUFFER = '0';
}

function handleNumber(strNumber){
    if(BUFFER === '0'){
        BUFFER = strNumber;
    }else{
        BUFFER+=strNumber;
    }

}

function handleSymbol(symbol){
    switch(symbol){
        case 'C':
            BUFFER = "0";
            RUNNING_TOTAL = 0;
            break;
        case '=':
            if(PREV_OPERATOR === undefined){
                return;
            }
            flushOperation(parseInt(BUFFER));
            PREV_OPERATOR = undefined;
            BUFFER = RUNNING_TOTAL;
            RUNNING_TOTAL = 0;
            break;

        case '←':
            if(BUFFER.length === 1){
                BUFFER = '0';
            }else{
            BUFFER = BUFFER.substring(0, BUFFER.length - 1);}
            break;
        case '+':
        case '−':
        case '×':
        case '÷':
            handleMath(symbol);
            break;
    }
}

function buttonClick(value){
    if(isNaN(value)){
        handleSymbol(value);
    }else{
        handleNumber(value);
    }
    
    document.querySelector('.screen').innerHTML = BUFFER;

}

function main(){
    document.querySelector('.calc-buttons').
    addEventListener('click', function(event){
        buttonClick(event.target.innerText);
    })
}

main();