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
    ['x', 'x', 'x', 'x', '_', 'x', 'x', 'x', 'x'],
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
            span.dataset.x = x
            span.dataset.y = y
            if (cell === '#') {
                span.classList.add('filled');
            }
            if (cell === 'x') {
                pegs.push([x,y])
            }
            span.addEventListener("click", function() {
                clickPegHole(span)
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
    if (!element.classList.contains('hole')) { return }

    clearSelectedPeg()
    highlightPeg(element, true)
    displayPossiblePegs(element, getPossibleMoves(element))
}

function displayPossiblePegs(peg, directions) {
    let x = parseInt(peg.dataset.x, 10);
    let y = parseInt(peg.dataset.y, 10);

    for (let direction of directions) {
        getElementByCoordinates(x + direction["x"], y + direction["y"]).classList.add("possible");
    }
}

function clearPossiblePegs() {
    document.querySelectorAll(".possible").forEach(peg => peg.classList.remove(possible))
}

function getElementByCoordinates(x, y) {
    return document.querySelector(`span[data-x="${x}"][data-y="${y}"]`);
}

function getPossibleMoves(element) {
    let x = parseInt(element.dataset.x, 10);
    let y = parseInt(element.dataset.y, 10);
    let possible = [];

    const moves = [
        [0, -1, { x:0, y:-2 }], // Up
        [1, 0, { x:2, y:0 }],  // Right
        [0, 1, { x:0, y:2 }],  // Down
        [-1, 0, { x:-2, y:0 }]  // Left
    ];

    for (let [dx, dy, move] of moves) {
        let nx = x + dx, nnx = x + 2 * dx;
        let ny = y + dy, nny = y + 2 * dy;
        console.log(gridPattern[ny][nx], gridPattern[nny][nnx], nx, ny, nnx, nny)
        if (nx >= 0 && nnx >= 0 && ny >= 0 && nny >= 0 &&
            nx < WIDTH && nnx < WIDTH && ny < HEIGHT && nny < HEIGHT &&
            gridPattern[ny][nx] === "#" && !["0", "#"].includes(gridPattern[nny][nnx])) {
            possible.push(move);
        }
    }

    return possible;
}


spawnBoard()
displayPegs()