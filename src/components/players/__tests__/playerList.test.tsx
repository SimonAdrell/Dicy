import {  fireEvent, render, waitFor } from "@testing-library/react-native";
import gameHelper from "@helpers/Game/gameHelper";
import { gameType } from "@helpers/Game/gameType";
import { PlayerDto } from "../playerObject";
import PlayerList from "../playerList";
import { sortPlayersByOrder } from "@helpers/Player/PlayerHelper";
import { act } from "react-test-renderer";
jest.mock('@helpers/Image/ImageTaker');

describe("playerList", () => {
    it("Adds player to player list", async () => {
        // Arrange
        var gamingHelper = gameHelper(undefined);
        gamingHelper.generateNewGame(gameType.maxiYatzy);

        const testPlayer: PlayerDto = {
            name: "TestPlayer 1",
            imageUrl: "",
            playerId: 0,
            plusImage: false,
            currentScore: 0,
            order: undefined
        };

        const testPlayer2: PlayerDto = {
            name: "TestPlayer 2",
            imageUrl: "",
            playerId: 1,
            plusImage: false,
            currentScore: 0,
            order: undefined
        };

        const { getByText } = render(<PlayerList gamingHelper={gamingHelper} players={[testPlayer, testPlayer2]} />);

 
        // Act
        await waitFor(() => {
            const item = getByText(testPlayer.name);
            const item2 = getByText(testPlayer2.name);
    
            fireEvent(item, "click");
            fireEvent(item2, "click");
        })

        // Assert
        expect(gamingHelper.getPlayers()).toContain(testPlayer);
        expect(gamingHelper.getPlayers()).toContain(testPlayer2);
    })

    it("Removes player from player list after added", async () => {
        // Arrange
        var gamingHelper = gameHelper(undefined);
        gamingHelper.generateNewGame(gameType.maxiYatzy);

        const testPlayer: PlayerDto = {
            name: "TestPlayer 1",
            imageUrl: "",
            playerId: 0,
            plusImage: false,
            currentScore: 0,
            order: undefined
        };

        const testPlayer2: PlayerDto = {
            name: "TestPlayer 2",
            imageUrl: "",
            playerId: 1,
            plusImage: false,
            currentScore: 0,
            order: undefined
        };

        const { getByText } = render(<PlayerList gamingHelper={gamingHelper} players={[testPlayer, testPlayer2]} />);

      
        // Act
        await waitFor(() => {
            const item = getByText(testPlayer.name);
            const item2 = getByText(testPlayer2.name);
    
            // Add player One
            fireEvent(item, "click");

            // Add player Two
            fireEvent(item2, "click");

            // Remove player Two
            fireEvent(item2, "click");
        })

        // Assert

        let players = gamingHelper.getPlayers();

        expect(players).toContain(testPlayer);
        expect(players?.some(player => player == testPlayer2)).toBe(false);
    })

    it("When players is removed then added, order is changed", async () => {
        // Arrange

        var gamingHelper = gameHelper(undefined);
        gamingHelper.generateNewGame(gameType.maxiYatzy);

        const testPlayer: PlayerDto = {
            name: "TestPlayer 1",
            imageUrl: "",
            playerId: 0,
            plusImage: false,
            currentScore: 0,
            order: undefined
        };

        const testPlayer2: PlayerDto = {
            name: "TestPlayer 2",
            imageUrl: "",
            playerId: 1,
            plusImage: false,
            currentScore: 0,
            order: undefined
        };

        const { getByText } = render(<PlayerList gamingHelper={gamingHelper} players={[testPlayer, testPlayer2]} />);

      
        // Act
        await waitFor(() => {
            const item = getByText(testPlayer.name);
            const item2 = getByText(testPlayer2.name);
    
            // Add player One
            fireEvent(item, "click");

            // Add player Two
            fireEvent(item2, "click");
        })

        expect(gamingHelper.getPlayers()?.sort(sortPlayersByOrder)[0]).toEqual(testPlayer);
        expect(gamingHelper.getPlayers()?.sort(sortPlayersByOrder)[1]).toEqual(testPlayer2);

        await waitFor(() => {
            const item = getByText(testPlayer.name);
            const item2 = getByText(testPlayer2.name);
    
            // Removes player One
            fireEvent(item, "click");

            // Removes player Two
            fireEvent(item2, "click");
        })

        expect(gamingHelper.getPlayers()?.some(player => player == testPlayer)).toBe(false);
        expect(gamingHelper.getPlayers()?.some(player => player == testPlayer2)).toBe(false);

        await waitFor(() => {
            const item = getByText(testPlayer.name);
            const item2 = getByText(testPlayer2.name);
    
            // Adds player Two
            fireEvent(item2, "click");

            // Adds player One
            fireEvent(item, "click");
        })

        gamingHelper.getPlayers()?.sort(sortPlayersByOrder)

        expect(gamingHelper.getPlayers()?.sort(sortPlayersByOrder)[0]).toEqual(testPlayer2);
        expect(gamingHelper.getPlayers()?.sort(sortPlayersByOrder)[1]).toEqual(testPlayer);
        
    })


})