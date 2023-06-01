

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
      
   
   
   
   function onInit(){
   
   }
   
   function buildBoard(){
       let board = []
          for(let i = 0; i<gLevel.SIZE; i++){
           board[i]=[]
       for(let j = 0; j<gLevel.SIZE; j++){
           board[i][j] = " "
       }
   }
           for(let x = 0; x<gLevel.MINES; x++){
               let randomIdx = getRandomInt(1, gLevel.SIZE-1)
               let randomSubIdx = getRandomInt(1, gLevel.SIZE-1)
           if(board[randomIdx][randomSubIdx]==" "){
                   board[randomIdx][randomSubIdx]=mine
               }else{
                   x--
               }
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
                            mineEggsCount[i][j][`count`]++
                            board[i][j]=mineEggsCount[i][j][`count`]
                    }
                     
                    }
                }
               }
           }
       }
       
       return board
   }
   
   console.table(setMineEggsCount(buildBoard()))
   function renderBoard(board){
    let strHTML=''
   for(let i = 0; i<board.length; i++){
    strHTML+='<tr>'
    for(let j = 0; j<board[0].length; j++){
        strHTML+=`<td onClick='onCellClicked(this)' onContextMenue='onCellMarked(this)' id-i-j='${i, j}'>
        
        </td>`
    }
    strHTML+='</tr>\n'
   }
   document.querySelector(`.board`).innerHTML=strHTML
   return (strHTML)
   }
   console.log(renderBoard(setMineEggsCount(buildBoard())))
   function onCellClicked(elCell){
   
   }
   
   function onCellMarked(elCell){
   
   }
   
   function checkGameOver(){
   
   }
   
   function expandShown(board, elCell, i, j){
   
   }
   
   function getRandomInt(min, max){
       let randomNum = Math.floor(Math.random() * (max - min + 1)) + min
       return randomNum
   }