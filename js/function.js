

   
     let gLevel = {
       SIZE: 8,
       MINES: 3
      }
      
      let lives = 3
      let mine = "💣"
      let mark="⚠"

      let safeClicks = 3

      let safeSpot='❤'

      let createManually;

      let gMines=0

      let board

      let marked=0

      let hintCount = 3

      let placeInArchive = -1

      let archive = []

      let megaHintUse = true

      let megaHintClick = 3

      let megaHint1;

      let megaHint2;

      let transorEx=[]

function getRandomInt(min, max){
    let randomNum = Math.floor(Math.random() * (max - min + 1)) + min
    return randomNum
}







 function restart(){

    document.querySelector(".smile").innerHTML=`💀`
    location.reload()
 }



 function checkGameOver(){
    if(document.querySelector(".lives").innerHTML==`💀`){
        document.querySelector(".lives").onclick = reload()
        
    }
    let check = 0
    for(let i=0; i<gLevel.SIZE; i++){
        let place = document.querySelectorAll(`[data-i='${i}']`)
        for(let j = 0; j<gLevel.SIZE; j++){
            
           if(place[j].classList.contains("clicked") || place[j].innerText==mark){
            check++
            if(board[0].length*board.length==check ){
                setTimeout(congrats, 100)
            }
           }
        }
    }
}

function congrats(){
    if(confirm("congratulations! You have won, would you like to play again?")){
        reload()
    }else{
        alert("Why?🙄")
    }
}

function checkSafe(){
    let isValid = false
    while(!isValid){
    let i = getRandomInt(0, board.length-1)
        let place=document.querySelectorAll(`[data-i='${i}']`)
        let j = getRandomInt(0, board.length-1)
            if((board[i][j]==" " && place[j].dataset.checked=="1") && (place[j].innerText!==mark && place[j].classList.contains('clicked')==false)){
                placeInArchive++
                archive[placeInArchive]={text: place[j].innerText, place: place[j]}
                isValid = true
                place[j].dataset.checked='2'
               place[j].innerHTML = safeSpot
                safeClicks--
             document.querySelector("h2").innerHTML = `You have ${safeClicks} clicks!`  
    }
    setTimeout(cancelSafeSpot, 3000)
}
 }

 function cancelSafeSpot(){
    for(let i = 0 ; i<board.length; i++){
       let place = document.querySelectorAll(`[data-i='${i}']`)
        for(let j = 0 ; j<board.length; j++){
            if(place[j]==archive[placeInArchive].place){
                place[j].innerHTML=" "
            }
        }
    }
 }


 function doHint(){
    for(let i = 0; i<gLevel.SIZE; i++){
        let random = getRandomInt(1, board.length-1)
        let gPlace = document.querySelectorAll(`[data-i='${i}']`);
        placeInArchive++
        archive[placeInArchive]={text: gPlace[random].innerText, place: gPlace[random]}
        gPlace[random].innerHTML=board[i][random]
        gPlace[random].classList.add("clicked")
    }
    setTimeout(function(){ for(let x=0; x<gLevel.SIZE; x++){
        archive[placeInArchive].place.innerHTML = archive[placeInArchive].text
        archive[placeInArchive].place.classList.remove("clicked")
        placeInArchive--
    }
}, 2000)
}


function expandShown(board, elCell, i, j){
    for(let x=i-1; x<i+2; x++){
        if(x<0 || x>=board.length) continue;
        for(let y=j-1; y<j+2; y++){
            if(y<0 || y>=board[x].length) continue;

            if(board[x][y]==" "){
                let place = document.querySelectorAll(`[data-i='${x}']`)
                placeInArchive++
                archive[placeInArchive]={text:place[y].innerText, place:place[y]};
                place[y].innerHTML=" "
                place[y].classList.add("clicked")
            }else if(board[x][y]!==" " && board[x][y]!==mine){
                let place = document.querySelectorAll(`[data-i='${x}']`)
                placeInArchive++
                archive[placeInArchive]={text:place[y].innerText, place:place[y]};
                place[y].innerHTML=board[x][y]
                place[y].classList.add("clicked")
            }
        }
    }
   }


   function doMegaHint(elCell){
    if(megaHintClick==2){
        megaHint1=elCell
    }else if(megaHintClick==1){
        megaHint2=elCell

        for(let i = megaHint1.dataset.i; i<=megaHint2.dataset.i; i++){
            let place = document.querySelectorAll(`[data-i='${i}']`)

            for(let j = megaHint1.dataset.j; j<=megaHint2.dataset.j; j++){
                placeInArchive++
                archive[placeInArchive] = {text: place[j].innerText, place: place[j]}
                place[j].classList.add("clicked")
                place[j].innerHTML=board[i][j]
            }
        }
        setTimeout(hideMega, 2000)
    }
   }


   function hideMega(){
    for(let i = megaHint1.dataset.i; i<=megaHint2.dataset.i; i++){

        for(let j = megaHint1.dataset.j; j<=megaHint2.dataset.j; j++){
            archive[placeInArchive].place.classList.remove('clicked')
            archive[placeInArchive].place.innerHTML=archive[placeInArchive].text
            placeInArchive--
        }
    }
}

function reload(){
    location.reload()
 }


 