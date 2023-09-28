export function getRandomIndex() {
    return Math.round(Math.random() * 3);
}

export function replaceRowsToCols(matrix) {
    const newMatrix = [];
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (!newMatrix[j]) {
                newMatrix[j] = [];
            }
            newMatrix[j][i] = matrix[i][j];
        }
    }
    return newMatrix;
}

export function isEqualMatrixes(matrixA, matrixB) {
    for (let i = 0; i < matrixA.length; i++) {
        for (let j = 0; j < matrixA[i].length; j++) {
            if (matrixA[i][j] !== matrixB[i][j]) {
                return false;
            }
        }
    }
    return true;
}

export function isMatrixFull(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === 0) {
                return false;
            }
        }
    }
    return true;
}

