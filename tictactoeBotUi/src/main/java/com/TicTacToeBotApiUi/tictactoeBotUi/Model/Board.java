package com.TicTacToeBotApiUi.tictactoeBotUi.Model;

/**
 * This class represents the game board of Tic Tac Toe.
 */
public class Board {
    /**
     * The array to represent the Tic Tac Toe board.
     */
     String[] board;

    /**
     * Creates a new instance of the Tic Tac Toe board.
     */
    public Board() {

    }

    /**
     * Returns the current Tic Tac Toe board.
     * @return the array representing the board
     */
    public String[] getBoard() {
        return board;
    }

    /**
     * Sets the current Tic Tac Toe board.
     * @param board the array representing the board to be set
     */
    public void setBoard(String[] board) {
        this.board = board;
    }
}
