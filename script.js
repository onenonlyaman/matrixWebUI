const rowsInput = document.getElementById('rows');
const colsInput = document.getElementById('cols');

const genBtn = document.getElementById('generateBtn');
const matCont = document.querySelector('.matrix-container');

const row1Input = document.getElementById('row1');
const row2Input = document.getElementById('row2');
const row2DisplayInput = document.getElementById('row2_display');

const opBtn = document.getElementById('opBtn');
const invBtn = document.getElementById('invBtn');
const invRowInput = document.getElementById('invRow');

row2Input.addEventListener('input', function () {
    row2DisplayInput.value = row2Input.value;
});

function getMatrixDimensions() {
    const numRows = parseInt(rowsInput.value, 10);
    const numCols = parseInt(colsInput.value, 10);
    return { numRows, numCols };
}

function genMat() {
    const { numRows, numCols } = getMatrixDimensions();

    if (isNaN(numRows) || isNaN(numCols) || numRows < 1 || numCols < 1) {
        alert('Please enter valid dimensions');
        return;
    }

    matCont.innerHTML = '';
    const totalGridCols = numCols + 1;
    matCont.style.gridTemplateColumns = `repeat(${totalGridCols}, 1fr)`;

    const cornerLabel = document.createElement('div');
    cornerLabel.className = 'matrix-cell colLabel';
    cornerLabel.textContent = 'X';
    matCont.appendChild(cornerLabel);

    for (let j = 0; j < numCols; j++) {
        const colLabel = document.createElement('div');
        colLabel.className = 'matrix-cell colLabel';
        colLabel.textContent = `Col ${j + 1}`;
        matCont.appendChild(colLabel);
    }

    for (let i = 0; i < numRows; i++) {
        const rowLabel = document.createElement('div');
        rowLabel.className = 'matrix-cell rowLabel';
        rowLabel.textContent = `Row ${i + 1}`;
        matCont.appendChild(rowLabel);

        for (let j = 0; j < numCols; j++) {
            const cellInput = document.createElement('input');
            cellInput.type = 'number';
            cellInput.className = 'matrix-cell';
            cellInput.name = `mat[${i}][${j}]`;
            cellInput.value = '0';
            matCont.appendChild(cellInput);
        }
    }

    row1Input.value = Math.min(1, numRows);
    row2Input.value = Math.min(1, numRows);
    row2DisplayInput.value = row2Input.value;
}

function applyOperation() {
    const row1Idx = parseInt(document.getElementById('row1').value, 10) - 1;
    const row2Idx = parseInt(document.getElementById('row2').value, 10) - 1;
    const scalar = parseFloat(document.getElementById('r2scalar').value);
    const opType = document.getElementById('opType').value.trim();

    const { numRows, numCols } = getMatrixDimensions();

    if (isNaN(row1Idx) || isNaN(row2Idx) || isNaN(scalar) || row1Idx < 0 || row2Idx < 0) {
        alert('Please enter valid row numbers and scalar value.');
        return;
    }

    if (row1Idx >= numRows || row2Idx >= numRows) {
        alert('Row numbers exceed the matrix size.');
        return;
    }

    if (opType !== '+' && opType !== '-') {
        alert('Invalid operation type. Use "+" or "-".');
        return;
    }

    const inputs = matCont.querySelectorAll('input[type="number"]');

    for (let j = 0; j < numCols; j++) {
        const index1 = row1Idx * numCols + j;
        const index2 = row2Idx * numCols + j;

        const val1 = parseFloat(inputs[index1].value) || 0;
        const val2 = parseFloat(inputs[index2].value) || 0;

        let newValue;
        if (opType === '+') {
            newValue = val2 + (scalar * val1);
        } else {
            newValue = val2 - (scalar * val1);
        }

        inputs[index2].value = newValue;
    }
}

function inverseRow() {
    const rowIdx = parseInt(invRowInput.value, 10) - 1;
    const { numRows, numCols } = getMatrixDimensions();

    if (isNaN(rowIdx) || rowIdx < 0 || rowIdx >= numRows) {
        alert('Please enter a valid row number.');
        return;
    }

    const inputs = matCont.querySelectorAll('input[type="number"]');
    for (let j = 0; j < numCols; j++) {
        const index = rowIdx * numCols + j;
        const val = parseFloat(inputs[index].value) || 0;
        inputs[index].value = -val;
    }
}

genBtn.addEventListener('click', genMat);
opBtn.addEventListener('click', applyOperation);
invBtn.addEventListener('click', inverseRow);

rowsInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        genMat();
    }
});

colsInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        genMat();
    }
});

genMat();