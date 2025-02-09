const WIDTH = 9
const HEIGHT = 9
const MIDDLE_SEGMENT = Math.floor(WIDTH / 3)
const SPACE = (WIDTH - MIDDLE_SEGMENT) / 2
const BOARD = document.querySelector(".board")
let gridPattern = [
    ['0', '0', '0', 'x', 'x', 'x', '0', '0', '0'],
    ['0', '0', '0', 'x', 'x', 'x', '0', '0', '0'],
    ['0', '0', '0', 'x', 'x', 'x', '0', '0', '0'],
    ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
    ['0', '0', '0', 'x', 'x', 'x', '0', '0', '0'],
    ['0', '0', '0', 'x', 'x', 'x', '0', '0', '0'],
    ['0', '0', '0', 'x', 'x', 'x', '0', '0', '0']
];

function spawnBoard() {  
    gridPattern.forEach(row => {
        row.forEach(cell => {
            const span = document.createElement('span');
            span.className = cell === '0' ? 'space' : 'hole';
            BOARD.appendChild(span);
        });
    });
}


spawnBoard()