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

let pegs = []

function spawnBoard() {  
    gridPattern.forEach((row, y) => {
        row.forEach((cell, x) => {
            const span = document.createElement('span');
            span.className = cell === '0' ? 'space' : 'hole';
            if (cell === '#') {
                span.classList.add('filled');
            }
            if (cell === 'x') {
                if (x != Math.floor(WIDTH / 2) || y != Math.floor(HEIGHT / 2)) {
                    pegs.push([x,y])
                }
            }
            span.addEventListener("click", function() {
                if (!span.classList.contains("hole")) { return }
                clearSelectedPeg()
                highlightPeg(span, !span.classList.contains('selected'))
            })
            BOARD.appendChild(span);
        });
    });
}

function clearBoard() {
    BOARD.innerHTML = ""
}

function displayPegs() {
    pegs.forEach(peg => {
        let x = peg[0]
        let y = peg[1]
        gridPattern[y][x] = "#"
    })
    clearBoard()
    spawnBoard()
}

function clearSelectedPeg() {
    document.querySelectorAll('.selected').forEach(selected => selected.classList.remove('selected'))
}

function highlightPeg(peg, higligtState) {
    if (higligtState) {
        peg.classList.add('selected')
    } else {
        peg.classList.remove('selected')
    }
}

function clickPegHole(element) {
    if (element.classList.contains('peg')) {
        highlightPeg(element, true)
    }
}

spawnBoard()
displayPegs()