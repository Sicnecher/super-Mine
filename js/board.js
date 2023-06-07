


   function onInit(){
    let boardDiv = document.querySelector(`.board`)
    let level=prompt("Choose level: Begginer, Medium, Expert.")
    if(level=="begginer"){
        gLevel.SIZE=4
        gLevel.MINES=2
        boardDiv.style.width='200px'
        boardDiv.style.height='200px'
    }else if(level=='medium'){
        gLevel.SIZE=8
        gLevel.MINES=14
        boardDiv.style.width = '400px'
    }else if(level=='expert'){
        gLevel.SIZE=12
        gLevel.MINES=32
        boardDiv.style.width='600px'
        boardDiv.style.height='600px'
    }
   if(confirm("Create manually mode?") == true){
    createManually = 1
    board=buildBoard()
   }else{
    createManually = 2
    board=buildBoard()
   }
   }
   


   function buildBoard(){
        board = []
          for(let i = 0; i<gLevel.SIZE; i++){
           board[i]=[]
       for(let j = 0; j<gLevel.SIZE; j++){
           board[i][j] = " "
       }
   }
   if(createManually==2){
           for(let x = 0; x<gLevel.MINES; x++){
               let randomIdx = getRandomInt(1, gLevel.SIZE-1)
               let randomSubIdx = getRandomInt(1, gLevel.SIZE-1)
           if(board[randomIdx][randomSubIdx]==" "){
                   board[randomIdx][randomSubIdx]=mine
               }else{
                   x--
               }
           }
           board = setMineEggsCount(board)
        }else{
            renderBoard(board)
        }
           return board
       }
       
       
   
   function setMineEggsCount(board){
       
   let mineEggsCount=[]
       for(let i = 0; i<gLevel.SIZE; i++){
        
           mineEggsCount[i]=[]
   
           for(let j = 0; j<gLevel.SIZE; j++){
               mineEggsCount[i][j] = {count: 0}
               if(board[i][j] ==="💣"){
                continue;
               }else{
   
                for(let x = i-1; x<i+2;x++){
                    if(x<0 || x>=board.length) continue;
                    for(let y=j-1; y<j+2; y++){
                        if(x===i && y===j) continue;

                        if(y<0 || y>=board[x].length) continue;

                        if(board[x][y]===mine){ 
                            archive
                            mineEggsCount[i][j][`count`]++
                            board[i][j]=mineEggsCount[i][j][`count`]
                    }
                     
                    }
                }
               }
           }
       }
       renderBoard(board)
       return board
   }

   
   

   function renderBoard(board){
    let strHTML=''
   for(let i = 0; i<board.length; i++){
    strHTML+=`<div class="cell">`
    for(let j = 0; j<board[0].length; j++){
        strHTML+=`<div class='cell' onClick='onCellClicked(this)' onContextMenu='onCellMarked(this)' data-i='${i}' data-j='${j}' data-checked="1">
        
        </div>`

}
    strHTML+='</div>\n'
   }
   document.querySelector(`.board`).innerHTML=strHTML
   return (strHTML)
   }
   

   function onCellClicked(elCell){

    if(!megaHintUse && megaHintClick>1){
        megaHintClick--
        doMegaHint(elCell)
    }else{

    placeInArchive++
    archive[placeInArchive]={text:elCell.innerText, place:elCell}
    elCell.classList.add("clicked")
    let i = elCell.dataset.i
    let j = elCell.dataset.j
    if(createManually==1 && gMines<gLevel.MINES){
        gMines++
        board[i][j] = mine
        if(gMines==gLevel.MINES){
            createManually=2
            alert("You are done placing")
            board=setMineEggsCount(board)
        }
    }else if(elCell.innerHTML==mark){

        elCell=mark
    }else if(elCell.innerHTML==safeSpot){

        elCell.innerHTML=board[i][j]
        checkGameOver()
    }else if(board[i][j]==mine){

        elCell.innerHTML=mine
        lives--
        if(lives==2){
            document.querySelector(".lives").innerHTML=`❤❤`
            checkGameOver()
        }else if(lives==1){
            document.querySelector(".lives").innerHTML=`❤`
            checkGameOver()
        }else if(lives==0){
            document.querySelector(".lives").innerHTML=`💀`
        checkGameOver()
        }
    }else if(board[i][j]==" "){
        expandShown(board, elCell, i, j)
        checkGameOver()
    }else{
        elCell.innerHTML=board[i][j]
        checkGameOver()
    }
   }
}
    
   function onCellMarked(elCell){
    placeInArchive++
    archive[placeInArchive]={text:elCell.innerText, place:elCell}
    let markCount = document.querySelector(`.markCount`)
    if(elCell.innerHTML==mark){
        
        elCell.innerHTML=" "
        marked--
        markCount.innerHTML=marked
        checkGameOver()
    }else{
        elCell.innerHTML=mark
        marked++
        markCount.innerHTML=
        checkGameOver()
    }
   }
   
   




   