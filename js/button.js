let exArchive=[]

placeInEXArchive=-1

function safeClick(){
    if(safeClicks>0){
        checkSafe()
        
    }else{
        alert("you have 0 safe clicks!")
    }
 }



 function oneBack(){
    archive[placeInArchive].place.innerHTML = archive[placeInArchive].text
    archive[placeInArchive].place.classList.remove('clicked')
    archive.pop()
    placeInArchive--
 }


 function hint(elHint){
    if(hintCount==3){
        hintCount--
    elHint.innerHTML=`💡💡`
    doHint()
    }else if(hintCount==2){
        hintCount--
        elHint.innerHTML=`💡`
        doHint()
    }else if(hintCount==1){
        hintCount--
        elHint.innerHTML=`🤡`
        doHint()
    }else{
        alert("You are out of hints!")
    }
}



function megaHint(){
    if(megaHintUse==true){
        megaHintUse=false
    }else{
        alert('You dont have that option!');
    }
 }


 function exterminator(){
   gLevel.MINES -=3
   transform()
   board=buildBoard()
   perform()
 }


 function transform(){
    for(let i = 0; i<board.length; i++){
      let place = document.querySelectorAll(`[data-i='${i}']`)
        for(let j = 0; j<board[0].length; j++){
            if(place[j].classList.contains('clicked') || place[j].innerText==mark){
                placeInEXArchive++
                exArchive[placeInEXArchive]={i: i, j: j, text: place[j].innerText}
            }
        }
    }
 }

function perform(){
   for(let i = board.length-1; i>=0; i--){
    let place = document.querySelectorAll(`[data-i='${i}']`)
    for(let j = board.length-1; j>=0; j--){
        if(place[j].dataset.i==exArchive[placeInEXArchive].i && place[j].dataset.j==exArchive[placeInEXArchive].j){
           if(exArchive[placeInEXArchive].text==mark){
            placeInEXArchive--
            place[j].innerHTML=mark
           }else{
            placeInEXArchive--
            place[j].innerHTML=board[i][j]
            place[j].classList.add("clicked")
           }

        }
    }
   }
            }