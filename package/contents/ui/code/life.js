let SIZE;

let w, h, pw;
let cells, next;

function fillRandom() {
    for (let y = 1; y <= h; y++) {
        for (let x = 1; x <= w; x++) {
            cells[y * pw + x] = Math.random() < 0.1;
        }
    }
}

function dimensionChanged(width, height, cellSize) {
    SIZE = cellSize;

    w = (width / SIZE) | 0;
    h = (height / SIZE) | 0;
    pw = w + 2;

    cells = new Uint8Array((h + 2) * pw);
    next  = new Uint8Array((h + 2) * pw);

    fillRandom();
}

function advanceGeneration() {
    for (let y = 1; y <= h; y++) {
        let row = y * pw;
        for (let x = 1; x <= w; x++) {
            let i = row + x;

            // 8 neighbors — no bounds checks
            let n =
                cells[i - pw - 1] + cells[i - pw] + cells[i - pw + 1] +
                cells[i - 1]      +      0        + cells[i + 1]      +
                cells[i + pw - 1] + cells[i + pw] + cells[i + pw + 1];

            let alive = cells[i];
            next[i] = (alive && (n === 2 || n === 3)) || (!alive && n === 3);
        }
    }

    [cells, next] = [next, cells];
}

function paintMatrix(ctx, cellColor, backgroundColor) {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, w * SIZE, h * SIZE);

    ctx.fillStyle = cellColor;
    for (let y = 1; y <= h; y++) {
        let row = y * pw;
        let py = (y - 1) * SIZE;

        for (let x = 1; x <= w; x++) {
            if (cells[row + x]) {
                ctx.fillRect((x - 1) * SIZE, py, SIZE, SIZE);
            }
        }
    }
}

