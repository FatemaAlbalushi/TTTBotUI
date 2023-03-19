package com.TicTacToeBotApiUi.tictactoeBotUi.Controller;

import com.TicTacToeBotApiUi.tictactoeBotUi.Model.Board;

import com.TicTacToeBotApiUi.tictactoeBotUi.Model.BotResponse;
import com.TicTacToeBotApiUi.tictactoeBotUi.Service.Bot;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


/**
 * The BotController class handles HTTP requests for Tic Tac Toe Bot moves.
 */
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class BotController {

    /**
     * The Bot service used to make moves.
     */
    @Autowired
    public Bot bot;


    /**
     * Makes a move on the Tic Tac Toe board by calling the bot's makeMove method and returns a BotResponse object.
     * @param board The current Tic Tac Toe board state.
     * @return A BotResponse object containing the move chosen by the bot.
     */
    @PostMapping("/bot-move")
    public BotResponse makeMove(@RequestBody Board board) {
        int move = bot.makeMove(board.getBoard());
        BotResponse botResponse =new BotResponse(move);
        return botResponse;
    }
}
