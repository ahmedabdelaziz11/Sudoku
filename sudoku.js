var selectedNumber = null ;
var tileSelected = null;
var timer = 300; // 5 minutes
var errors = 0;

var board = [
    "--74916-5",
    "2---6-3-9",
    "-----7-1-",
    "-586----4",
    "--3----9-",
    "--62--187",
    "9-4-7---2",
    "67-83----",
    "81--45---"
];


window.onload = function(){
    setGame();
    setTime();        
};

function calcTimer() {
    let minutes = Math.floor(timer / 60); // get minutes
    let seconds = timer - (minutes * 60); //  get seconds
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return minutes+':'+seconds; 
}

function setTime(){
    timerInterval = setInterval(() => {
        timer--;
        if (timer < 0) {
            clearInterval(timerInterval)
            document.getElementById("time").innerText = `00:00`;
        }
        else
            document.getElementById("time").innerText = calcTimer()
    }, 1000)
}

function setGame(){
    for(let i = 1 ; i <= 9 ; i++ )
    {
        let number = document.createElement('div');
        number.id = i;
        number.innerText = i;
        number.addEventListener('click',selectNumber);

        number.classList.add('numbers');
        document.getElementById('digits').appendChild(number);
    }
    var row = col = 0 ;
    for(let r = 0 ; r < 9 ; r ++)
    {
        if(r >= 0 ) row = 0;
        if(r > 2 ) row = 1;
        if(r > 5 ) row = 2;
        for(let c = 0 ; c < 9 ; c ++)
        {
            if(c >= 0 ) col = 0;
            if(c > 2 ) col = 1;
            if(c > 5 ) col = 2;
            let tile = document.createElement('div');
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add(`${row}-${col}`);
            if (board[r][c] != "-") {
                tile.innerText = board[r][c];
                tile.classList.add('start-tile');
            }
            if (r == 2 || r == 5) {
                tile.classList.add("horizontal-line");
            }
            if (c == 2 || c == 5) {
                tile.classList.add("vertical-line");
            }
            tile.classList.add('tile');

            tile.addEventListener('click',selectTile);
            document.getElementById('board').appendChild(tile);
        }
    }
}

function selectNumber(){
    if(selectedNumber != null)
    {
        selectedNumber.classList.remove('selected-number');
    }
    selectedNumber = this ;
    selectedNumber.classList.add('selected-number');
}

function selectTile() {
    let error = 0 ;
    if (selectedNumber) {
        if (this.classList.contains('start-tile')) {
            return;
        }

        let tileSquare = document.getElementsByClassName(this.classList[0]);
        Array.from(tileSquare).forEach((el) => {
            if(el.innerText ==  selectedNumber.id) error ++ ;
        });

        
        let coords = this.id.split("-"); 
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);

        for(let i = 0; i < 9 ; i ++ )
        {
            let tile = `${coords[0]}-${i.toString()}` ;
            if(document.getElementById(tile).innerText == selectedNumber.id) error ++ ;
        }

        for(let i = 0; i < 9 ; i ++ )
        {
            let tile = `${i.toString()}-${coords[1]}` ;
            if(document.getElementById(tile).innerText == selectedNumber.id) error ++ ;
        }

        if (error == 0) {
            this.innerText = selectedNumber.id;
        }
        else {
            errors += 1;
            document.getElementById("errorCount").innerText = errors;
        }
    }
}