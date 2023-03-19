package com.TicTacToeBotApiUi.tictactoeBotUi.Model;
;

/**
 * This class represents a response from the Tic Tac Toe bot API to the UI, containing the bot's move.
 */
public class BotResponse {
    // The bot's move on the board
    public int botMove;
    /**
     * Constructs a new BotResponse object with the given bot move.
     * @param botMove The bot's move on the board
     */
    public BotResponse(int botMove) {
        this.botMove = botMove;
    }

    /**
     * Sets the bot's move on the board.
     * @param botMove The bot's move on the board
     */
    public void setBotMove(int botMove) {
        this.botMove = botMove;
    }

    /**
     * Returns the bot's move on the board.
     * @return The bot's move on the board
     */
    public int getBotMove() {
        return botMove;
    }
}
