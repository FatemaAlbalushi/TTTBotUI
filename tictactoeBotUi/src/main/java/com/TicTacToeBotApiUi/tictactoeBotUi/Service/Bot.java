package com.TicTacToeBotApiUi.tictactoeBotUi.Service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class Bot {
    /**
     * Constructs a new instance of the Bot class
     */
    public Bot() {

    }

    /**
     * The logger instance for this class
     */
    private static final Logger logger = LoggerFactory.getLogger(Bot.class);

    /**
     * Generates a move for the bot to make on the Tic Tac Toe board
     * @param board the current state of the Tic Tac Toe board
     * @return the position on the board where the bot will make its move
     */
    public int makeMove(String[] board) {
        Random rand = new Random();
        int size = (int) Math.sqrt(board.length);
        int position = rand.nextInt(board.length);

        while (board[position] != "") {
            // keep generating new random indices until an empty cell is found
            position = rand.nextInt(board.length);
            logger.info("Bot Make move");
        }

        return position;
    }
}
