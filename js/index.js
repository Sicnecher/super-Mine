

let gBoard= {
    minesAroundCount: 4,
    isShown: false,
    isMine: false,
    isMarked: true
   
   }
   
   let gGame = {
       isOn: false,
       shownCount: 0,
       markedCount: 0,
       secsPassed: 0
      }
   
     let gLevel = {
       SIZE: 8,
       MINES: 3
      }
      
      let mine = "💣"
      let mark="⚠"
      
      let archiveMoves

      let safeClicks = 3

      let safeSpot='❤'

      let createManually;

      let gMines=0

      let board
   
   function onInit(){
   if(confirm("Create manually mode?") == true){
    createManually = true
   }else{
    createManually = false

   }
   }
   
   function buildBoard(){
       let board = []
          for(let i = 0; i<gLevel.SIZE; i++){
           board[i]=[]
       for(let j = 0; j<gLevel.SIZE; j++){
           board[i][j] = " "
       }
   }
   if(createManually==true){
   }else{
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
        }
           return board
       }
       board=buildBoard()
       
       if(createManually==true && gMines<3){
        board+=onCellClicked()
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
    console.table(board)
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
   renderBoard(board)

   function onCellClicked(elCell){
    let i = elCell.dataset.i
    let j = elCell.dataset.j
    if(createManually==true && gMines<gLevel.MINES){
        gMines++
        board[i][j] = mine
        if(gMines==gLevel.MINES){
            alert("You are done placing")
            board=setMineEggsCount(board)
        }
    }else if(board[i][j]==mine){
        elCell.innerHTML=mine
        checkGameOver()
    }else if(board[i][j]==" "){
        expandShown(board, elCell, i, j)
    }else{
        elCell.innerHTML=board[i][j]
        checkGameOver()
    }
   }
    
   function onCellMarked(elCell){
    if(elCell.innerHTML==mark){
        
        elCell.innerHTML=""
    }else{
        elCell.innerHTML=mark
    }
   }
   
   
   function checkGameOver(){
    for(let i =0; i<board.length; i++){
        for(let j = 0; j<board[0].length; j++){
            if(board[i][j]==0){
            }
        }
    }
   }
   
   function expandShown(board, elCell, i, j){
   
   }
   
   function getRandomInt(min, max){
       let randomNum = Math.floor(Math.random() * (max - min + 1)) + min
       return randomNum
   }

 function hint(){

 }

 function safeClick(){
    if(safeClicks>0){
        checkSafe()
        
    }else{
        alert("you have 0 safe clicks!")
    }
 }

 function checkSafe(){
    let i = getRandomInt(0, board.length-1)
        let iPlace=document.querySelectorAll(`[data-i='${i}']`)
        let j = getRandomInt(0, board.length-1)
            let jPlace = iPlace[0]
            if(board[i][j]!==mine && jPlace.dataset.checked=="1"){
                jPlace.dataset.checked='2'
                jPlace.innerHTML = safeSpot
                safeClicks--
             document.querySelector("h2").innerHTML = `You have ${safeClicks} clicks!`  
             return jPlace
        
    }
 }

