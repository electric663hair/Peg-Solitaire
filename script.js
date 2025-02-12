const WIDTH = 9
const HEIGHT = 9
const MIDDLE_SEGMENT = Math.floor(WIDTH / 3)
const SPACE = (WIDTH - MIDDLE_SEGMENT) / 2
const BOARD = document.querySelector(".board")
const PEG_COUNTER = document.querySelector("p.counter");
const BOARD_HTML = document.querySelector(".board").innerHTML;
const DEFAULT_PATTERN = [
    ['0', '0', '0', 'x', 'x', 'x', '0', '0', '0'],
    ['0', '0', '0', 'x', 'x', 'x', '0', '0', '0'],
    ['0', '0', '0', 'x', 'x', 'x', '0', '0', '0'],
    ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
    ['x', 'x', 'x', 'x', '_', 'x', 'x', 'x', 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
    ['0', '0', '0', 'x', 'x', 'x', '0', '0', '0'],
    ['0', '0', '0', 'x', 'x', 'x', '0', '0', '0'],
    ['0', '0', '0', 'x', 'x', 'x', '0', '0', '0']
]
let gridPattern = structuredClone(DEFAULT_PATTERN);

let pegs = []

spawnBoard()
displayPegs()
clearBoard()
spawnBoard()
updatePegCount()

function amountOfPegs() {
    return document.querySelectorAll("span.hole.filled").length
}

function updatePegCount() {
    PEG_COUNTER.textContent = amountOfPegs()
}


// function displayGrid() {
//     const formattedText = gridPattern.map(row => row.join(' ')).join('\n');
//     document.getElementById('output').textContent = formattedText;
// }

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
                if (span.classList.contains("hole") && span.classList.contains("possible")) {
                    moveSelectedToPos(span.dataset.x, span.dataset.y)
                } else if (span.classList.contains("hole") && span.classList.contains("filled")) {
                    clearGraphics()
                    clickPegHole(span)
                } else {
                    clearGraphics()
                }
                updatePegCount()
                if (!canMovePegs()) {
                    endGame()
                }
            })
            BOARD.appendChild(span);
        });
    });
}

function endGame() {
    BOARD.classList.add("end")
}

function resetGame() {
    BOARD.classList.remove("end")
    gridPattern = structuredClone(DEFAULT_PATTERN);
    spawnBoard()
    clearBoard()
    displayPegs()
    spawnBoard()
    updatePegCount()
}

function moveSelectedToPos(x,y) {
    if (!x || !y) { return }
    
    const selectedPeg = document.querySelector(".selected");
    const moveToPeg = getElementByCoordinates(x,y)
    const pos1 = [parseInt(selectedPeg.dataset.x, 10), parseInt(selectedPeg.dataset.y, 10)]
    const nPos = [pos1[0] - (pos1[0] - x)/2, pos1[1] - (pos1[1] - y)/2]
    const middlePeg = getElementByCoordinates(nPos[0], nPos[1])

    removePegAtCords(pos1[0], pos1[1])
    removePegAtCords(nPos[0], nPos[1])
    getElementByCoordinates(x,y).classList.add("filled")
    pegs.push([x,y])
    gridPattern[y][x] = "#"

    displayPegs()
}

function removePegAtCords(x,y) {
    pegs = pegs.filter(coord => !(coord[0] == x && coord[1] == y));
    gridPattern[y][x] = "_"
    getElementByCoordinates(x,y).classList.remove("filled")
}

function clearGraphics() {
    clearPossiblePegs()
    clearSelectedPeg()
}

function clearBoard() {
    BOARD.innerHTML = BOARD_HTML;
}

function displayPegs() {
    clearGraphics()

    pegs.forEach(peg => {
        let x = peg[0]
        let y = peg[1]
        gridPattern[y][x] = "#"
    })
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
    clearSelectedPeg()
    highlightPeg(element, true)
    displayPossiblePegs(element, getPossibleMoves(element))
}

function displayPossiblePegs(peg, directions) {
    clearPossiblePegs()

    let x = parseInt(peg.dataset.x, 10);
    let y = parseInt(peg.dataset.y, 10);

    for (let direction of directions) {
        getElementByCoordinates(x + direction["x"], y + direction["y"]).classList.add("possible");
        getElementByCoordinates(x + direction["x"]/2, y + direction["y"]/2).classList.add("red")
    }
}

function clearPossiblePegs() {
    document.querySelectorAll(".possible").forEach(peg => peg.classList.remove("possible"))
    document.querySelectorAll(".red").forEach(peg => peg.classList.remove("red"))
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
        // console.log(gridPattern[ny][nx], gridPattern[nny][nnx], nx, ny, nnx, nny)
        if (nx >= 0 && nnx >= 0 && ny >= 0 && nny >= 0 &&
            nx < WIDTH && nnx < WIDTH && ny < HEIGHT && nny < HEIGHT &&
            gridPattern[ny][nx] === "#" && !["0", "#"].includes(gridPattern[nny][nnx])) {
            possible.push(move);
        }
    }

    return possible;
}

function canMovePegs() {
    const allPegs = document.querySelectorAll("span.hole.filled")
    for (let i = 0; i<allPegs.length; i++) {
        if (getPossibleMoves(allPegs[i]).length != 0) {
            return true
        }
    }
    return false
}

// website scaling
let scale = 1.5;
updateZoom()
function zoomIn() {
    scale += 0.1;
    updateZoom()
}
function zoomOut() {
    scale -= 0.1;
    updateZoom()
}
function resetZoom() {
    scale = 1.5;
    updateZoom()
}
function updateZoom() {
    BOARD.style.transform = `scale(${scale})`;
    BOARD.style.transformOrigin = "top center";
}