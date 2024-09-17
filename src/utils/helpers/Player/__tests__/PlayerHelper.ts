import { PlayerDto } from "@components/players/playerObject"
import { PlayerScore } from "../../Game/PlayerScore";
import { sortPlayersByOrder, sortPlayerScoresByPlayersOrder } from "../PlayerHelper";

describe("Sorts correctly", () => {
    it("Sorts player by order", () => {
        // Arrange
        let playerList = Array<PlayerDto>();
        let firstPlayer: PlayerDto = {
            playerId: 0,
            name: "Test name",
            imageUrl: "",
            plusImage: false,
            currentScore: 0,
            order: 2
        };
        playerList.push(firstPlayer);

        let secondPlayer: PlayerDto = {
            playerId: 0,
            name: "Test name",
            imageUrl: "",
            plusImage: false,
            currentScore: 0,
            order: 1
        }
        playerList.push(secondPlayer);

        // Act
        playerList.sort(sortPlayersByOrder);

        // Assert
        expect(playerList[0]).toBe(secondPlayer);
        expect(playerList[1]).toBe(firstPlayer);
    })
    it("Sorts playerScore by order", () => {
        // Arrange
        let playerList = Array<PlayerScore>();
        let firstPlayer: PlayerDto = {
            playerId: 0,
            name: "Test name",
            imageUrl: "",
            plusImage: false,
            currentScore: 0,
            order: 2
        };

        let firstPlayerScore: PlayerScore = {
            player: firstPlayer,
            score: 12
        } 
        
        playerList.push(firstPlayerScore);

        let secondPlayer: PlayerDto = {
            playerId: 0,
            name: "Test name",
            imageUrl: "",
            plusImage: false,
            currentScore: 0,
            order: 1
        }

        let secondPlayerScore: PlayerScore = {
            player: secondPlayer,
            score: 12
        } 
        
        playerList.push(secondPlayerScore);

        // Act
        playerList.sort(sortPlayerScoresByPlayersOrder);

        // Assert
        expect(playerList[0]).toBe(secondPlayerScore);
        expect(playerList[1]).toBe(firstPlayerScore);
    })
})
