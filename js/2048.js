let board = Array(
    Array(0,0,0,0),
    Array(0,0,0,0),
    Array(0,0,0,0),
    Array(0,0,0,0)
    );
let score = 0;
let n;
let boardId = Array(
    Array("00","01","02","03"),
    Array("10","11","12","13"),
    Array("20","21","22","23"),
    Array("30","31","32","33")
);
let dx = [-1, 0, 1, 0], dy = [0, 1, 0, -1];
let colors = {
    0: {
        color: "#684A23",
        background: "#FBEDDC"
    },
    2: {
        color: "#684A23",
        background: "#FBEDDC"
    },
    4: {
        color: "#684A23",
        background: "#F9E2C7"
    },
    8: {
        color: "#684A23",
        background: "#F6D5AB"
    },
    16: {
        color: "#684A23",
        background: "#F2C185"
    },
    32: {
        color: "#684A23",
        background: "#EFB46D"
    },
    64: {
        color: "#FFFFFF",
        background: "#EBA24A"
    },
    128: {
        color: "#FFFFFF",
        background: "#E78F24"
    },
    256: {
        color: "#FFFFFF",
        background: "#E87032"
    },
    512: {
        color: "#FFFFFF",
        background: "#E85532"
    },
    1024: {
        color: "#FFFFFF",
        background: "#E84532"
    },
    2048: {
        color: "#FFFFFF",
        background: "#E83232"
    },
    4096: {
        color: "#FFFFFF",
        background: "#E51A1A"
    },
    8192: {
        color: "#FFFFFF",
        background: "#E51A1A"
    },
    "default": {
        color: "#FFFFFF",
        background: "#684A23"
    }
}

/* 키보드 화살표 방향 입력 */
document.onkeydown = keyDownEventHandler;
function keyDownEventHandler(e){
    console.log(e.keyCode);
    let code = parseInt(e.keyCode);
    if(code == 38){
        move(0);
    } else if(code == 39) {
        move(1);
    } else if(code == 40) {
        move(2);
    } else if(code == 37) {
        move(3);
    }
}

class BorderNum{
    constructor(x, y, num, moveCnt) {
        this.x = parseInt(x);
        this.y = parseInt(y);
        this.num = parseInt(num);
        this.moveCnt = parseInt(moveCnt);
    }

    // [Symbol.toPrimitive](hint){
    //     return this.moveCnt;
    // }

}

init();

/* 초기 설정 세팅하는 함수 */
function init(){
    n = 4;

    /* 점수 초기화 */
    score = 0;
    
    /* 초기 게임판 2개 랜덤 생성 */
    for(var i=0; i<2; ++i){  
        var rand = parseInt(Math.random() * (n * n)); // 0~15 숫자 생성
        var row = parseInt(rand / n);
        var col = parseInt(rand % n);
        /* 랜덤 확률 50:50 으로 2와 4를 생성 */
        if(board[row][col] == 0)
            board[row][col] = generate();
    }
    cover();
}

/* 보드판에 숫자를 적용하는 함수 */
function cover(){
    console.log()
    for(var i=0; i<4; ++i){
        for(var j=0; j<4; ++j){
            let element = document.getElementById(boardId[i][j]);
            //console.log(board[i][j]);
            element.innerHTML = (board[i][j] == 0? " " : board[i][j]);
            paintColor(element);
        }
    }
    document.getElementById("score").innerHTML=score;
}

/* 테이블의 각 원소에 숫자에 따라 색깔을 칠해주는 함수 */
function paintColor(element){
    let value;
    if(element.innerHTML == " "){
        value = "default";
    } else {
        value = parseInt(element.innerHTML);
    }
    element.style.color = colors[value].color;
    element.style.background = colors[value].background;
}

/* 테이블의 숫자카드 입력 방향에 따라 이동 + 같은 숫자면 결합 */
function move(direction){
    let borderNum = [[], [], [], []];
    var movedBoard = Array(Array(0,0,0,0),Array(0,0,0,0),Array(0,0,0,0),Array(0,0,0,0));
    console.log(direction);
    for(var row = 0; row < n; ++row){
        for(var col = 0; col < n; ++col){
            var num = board[row][col], x = row, y = col;
            if(num != 0){
                console.log("num : " + num);
                var cnt = 0;
                while(isBorder(x + dx[direction], y + dy[direction])){
                    console.log("x : " + x + ", y : " + y);
                    cnt += parseInt(1);
                    x += dx[direction];
                    y += dy[direction];
                    
                }
                console.log("while 빠져나온 x : " + x + ", y : " + y);
                const elem = new BorderNum(row, col, num, cnt);
                //console.log(elem);
                if(direction == 0 || direction == 2){
                    borderNum[col].push(elem);
                } else {
                    borderNum[row].push(elem);
                }
                console.log(borderNum);
            }
        }
    }

    let moved = false;
    var placed = [[false,false,false,false], [false,false,false,false], [false,false,false,false], [false,false,false,false]];
    var merged = [[false,false,false,false], [false,false,false,false], [false,false,false,false], [false,false,false,false]];

    for(var i=0; i<n; ++i){
        var line = borderNum[i];
        JSON.stringify(line);
        //console.log("line : " + JSON.stringify(line));
        line.sort((a, b)=>{
            return parseInt(a.moveCnt) - parseInt(b.moveCnt);
        });
        //console.log("정렬 후 line : " + JSON.stringify(line));
        line.forEach(here => {
            var x = parseInt(here.x), y = parseInt(here.y), num = parseInt(here.num);
            var flag = true;
            while(isBorder(x + dx[direction], y + dy[direction])){
                if(movedBoard[x + dx[direction]][y + dy[direction]] == 0){
                    x += dx[direction];
                    y += dy[direction];
                    moved = true;
                    continue;
                }

                if(movedBoard[x + dx[direction]][y + dy[direction]] == num && !merged[x + dx[direction]][y + dy[direction]]){
                    score += movedBoard[x + dx[direction]][y + dy[direction]];
                    movedBoard[x + dx[direction]][y + dy[direction]] *= 2;
                    merged[x + dx[direction]][y + dy[direction]] = true;
                    flag = false;
                    moved = true;
                    break;
                }
                else {
                    movedBoard[x][y] = num;
                    placed[x][y] = true;
                    flag = false;
                    break;
                }
            }
            if(flag){
                movedBoard[x][y] = num;
                placed[x][y] = true;
            }
        });
    }

    if(moved) addNewNumber(movedBoard);
    else gameOver();
    console.log(movedBoard);
    cover();
}

function addNewNumber(movedBoard){
    // let zero = 0;
    // board.forEach(value => {
    //     if(value == 0){
    //         zero += 1;
    //     }
    // });
    while(true){
        var rand = parseInt(Math.random() * (n * n)); // 0~15 숫자 생성
        var row = parseInt(rand / n);
        var col = parseInt(rand % n);
        /* 랜덤 확률 50:50 으로 2와 4를 생성 */
        if(movedBoard[row][col] == 0){
            movedBoard[row][col] = generate();
            break;
        }
    }
    for(var i=0; i<n; ++i){
        for(var j=0; j<n; ++j){
            board[i][j] = movedBoard[i][j];
        }
    }
}

function gameOver(){
    console.log("종료");
}

/* 2 or 4 의 숫자카드를 랜덤으로 생성하는 함수 */
function generate(){
    var rand = parseInt(Math.random()*10);
    if(rand == 0) return 4;
    return 2;
}

/* 최고 점수를 반환하는 함수 */
function getMax(board) {
    var ret = 0;
    // for (var i = 0; i < 6; i++) {
    //     for (var j = 0; j < 6; j++) {
    //         ret = Math.max(ret, board[i][j]);
    //     }
    // }
    board.array.forEach(element => {
        ret = Math.max(ret, element);
    });
    return ret;
}

function isBorder(x, y){
    return (x >= 0 && x < n && y >= 0 && y < n);
}