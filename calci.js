let isOn = false;
let dispVar = "";
let oprt = "";
let prevOpt = "";
let calcVar = 0;
let numArr = [];
let checknumArr = [];
let oprArr = [];
let prevoprArr = [];
let autoreplay = true;
let checkindex;

document.addEventListener('keydown', function (event) {
    if ((event.key >= '0' && event.key <= '9') || event.key === '.') {
      nums(event.key);
    }
  });

function nums(num) {
    if (dispVar.length < 10) {
        if (oprt != "") {
            oprArr.push(oprt);
        }
        console.log("num: ", typeof num);
        dispVar = dispVar + num;
        console.log("dispVartype : ", typeof dispVar);
        console.log("dispVar : ", dispVar);
        document.getElementById("screen").innerText = dispVar;
        autoreplay = true;
    }

}
function oprtr(opr) {
    if(dispVar != ""){
        numArr.push(Number(dispVar));
    }
    document.getElementById("oprscreen").innerText = opr;
    oprt = opr;
    dispVar="";
    
}
function equals() {
    numArr.push(Number(dispVar));
    calcVar=numArr[0];
    for (let i = 0; i < numArr.length-1; i++) {

        switch (oprArr[i]) {
            case "+": calcVar += numArr[i+1];
                break;
            case "-": calcVar -= numArr[i+1];
                break;
            case "*": calcVar *= numArr[i+1];
                break;
            case "/": calcVar /= numArr[i+1];
                break;
        }

    }
    checknumArr = numArr;
    numArr = [calcVar];
    prevoprArr=oprArr;
    oprArr=[];
    dispVar="";
    autoreplay = false;
    checkindex = checknumArr.length;
    document.getElementById("screen").innerText=calcVar;
    document.getElementById("oprscreen").innerText = "";
    calcVar=0;
}
function clearScreen() {
    dispVar = "";
    calcVar = 0;
    oprt = "";
    document.getElementById("screen").innerText = "0";
    document.getElementById("oprscreen").innerText = "";
    numArr = [];
    oprArr = [];
    isOn = false;
    prevOpt = "";

}
function CE() {
    document.getElementById("screen").innerText = "0";
    dispVar = "";
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

async function replay(){
    if(autoreplay){
        for(let i = 0; i<numArr.length;i++){
            // numArr.push(Number(dispVar));
            if(i != 0){
                document.getElementById("oprscreen").innerText = oprArr[i-1];
            }
            document.getElementById("screen").innerText = numArr[i];
            await sleep(1000);
        }
    }else{
        for(let i = 0; i<checknumArr.length;i++){
            if(i != 0){
                document.getElementById("oprscreen").innerText = prevoprArr[i-1];
            }
            document.getElementById("screen").innerText = checknumArr[i];
            await sleep(1000);
        }
        document.getElementById("oprscreen").innerText = "=";
        document.getElementById("screen").innerText = numArr[0];
    }
}

function percent(){
    document.getElementById("screen").innerText = Number(dispVar)/100;
    dispVar /= 100;
}

function root(){
    document.getElementById("screen").innerText = Math.sqrt(Number(dispVar)).toFixed(2);
    dispVar = Math.sqrt(Number(dispVar)).toFixed(2);
    console.log(typeof dispVar)
    console.log(dispVar.length); 
}

function checkbck(){
    if(!autoreplay){
        if(checknumArr[checkindex -1 ]){
            checkindex -= 1;
            document.getElementById("screen").innerText = checknumArr[checkindex];
        }
    }
}
function checkfrnt(){
    if(!autoreplay){
        if(checknumArr[checkindex +1]){
            checkindex += 1;
            document.getElementById("screen").innerText = checknumArr[checkindex];
        }
    }
    
}