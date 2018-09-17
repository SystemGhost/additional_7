var MATRIX_FULL = [9, 9];
var MATRIX;

module.exports = function solveSudoku(matrix) {
	sudokuSolve(matrix);
	return MATRIX;
}

function usedInRow(matrix, row, num) {
	for (var col = 0; col < 9; col++)
		if (matrix[row][col] == num)
		{
			return true;
		}
	return false;
}

function usedInCol(matrix, col, num) {
	for (var row = 0; row < 9; row++)
		if (matrix[row][col] == num)
		{
			return true;
		}
	return false;
}

function usedInBox(matrix, boxStartRow, boxStartCol, num) {
	for (var row = 0; row < 3; row++)
		for (var col = 0; col < 3; col++)
			if (matrix[row + boxStartRow][col + boxStartCol] == num) 
			{
				return true;
			}
	return false;
}

function isSafe(matrix, row, col, num) {
	return !usedInRow(matrix, row, num) &&
		!usedInCol(matrix, col, num) &&
		!usedInBox(matrix, row - row % 3, col - col % 3, num);
}

function getUnassignedLocation(matrix) {
	for (var row = 0; row < 9; row++)
		for (var col = 0; col < 9; col++)
			if (matrix[row][col] == 0)
			{
				return [row, col];
			}
	return MATRIX_FULL;
}

function sudokuSolve(matrix) {
	if (MATRIX_FULL == getUnassignedLocation(matrix))
	{
		MATRIX = matrix;	
		return true;
	}

	rowAndCol = getUnassignedLocation(matrix);
	var row = rowAndCol[0];
	var col = rowAndCol[1];

	for (var num = 1; num <= 9; num++)
	{
		if (isSafe(matrix, row, col, num))
		{
			matrix[row][col] = num;

			if (sudokuSolve(matrix))
			{
				return true;
			}
			matrix[row][col] = 0;
		}
	}
return false; 
}