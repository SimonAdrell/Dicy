import gameHelper from "../gameHelper";
import { gameType } from "../gameType";

describe("gameHelper sets correct numberOfDices", () => {
    it("digitalDicesMaxiYatzy sets 6", () => {
        // Arrange
        var helper = gameHelper(undefined);

        // Act
        helper.generateNewGame(gameType.digitalDicesMaxiYatzy);

        // Assert
        var game = helper.getGame();
        expect(game.numberOfDices).toBe(6);
    })

    it("digitalDicesYatzy sets 6", () => {
        // Arrange
        var helper = gameHelper(undefined);

        // Act
        helper.generateNewGame(gameType.digitalDicesYatzy);

        // Assert
        var game = helper.getGame();
        expect(game.numberOfDices).toBe(5);
    })
})