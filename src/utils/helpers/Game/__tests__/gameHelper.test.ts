import { TFunction } from 'i18next';
import gameHelper from '../gameHelper';
import { gameType } from '../gameType';
import { PlayerDto } from '@components/players/playerObject';

const mockTranslate = ((str: string) => str) as unknown as TFunction<'translation', undefined>;

const makePlayer = (playerId: number, name: string, order?: number): PlayerDto => ({
    playerId,
    name,
    imageUrl: '',
    plusImage: false,
    currentScore: 0,
    order,
});

describe('gameHelper – multiple players', () => {
    it('generates unique order-independent PlayerScore arrays for each GameState row', () => {
        const helper = gameHelper(undefined);
        helper.generateNewGame(gameType.maxiYatzy);

        const players = [
            makePlayer(0, 'P1', 0),
            makePlayer(1, 'P2', 1),
            makePlayer(2, 'P3', 2),
            makePlayer(3, 'P4', 3),
            makePlayer(4, 'P5', 4),
        ];

        helper.setPlayers(players, mockTranslate);
        const game = helper.getGame();

        // Each upper-section row must hold its own independent array
        const upper = game.upper ?? [];
        expect(upper.length).toBeGreaterThan(1);
        for (let i = 0; i < upper.length - 1; i++) {
            expect(upper[i].PlayerScore).not.toBe(upper[i + 1].PlayerScore);
        }
    });

    it('assigns scores to the correct player when 5 players are in the game', () => {
        const helper = gameHelper(undefined);
        helper.generateNewGame(gameType.maxiYatzy);

        const players = [
            makePlayer(0, 'P1', 0),
            makePlayer(1, 'P2', 1),
            makePlayer(2, 'P3', 2),
            makePlayer(3, 'P4', 3),
            makePlayer(4, 'P5', 4),
        ];

        helper.setPlayers(players, mockTranslate);
        const game = helper.getGame();

        // Score "ones" (first upper row) for P3 with score 15
        const upper = game.upper ?? [];
        const onesRow = upper[0];
        const p3Score = onesRow.PlayerScore.find(ps => ps.player.playerId === 2);
        expect(p3Score).toBeDefined();
        if (!p3Score) { return; }

        helper.scoreHandler().updatePlayerScore(onesRow.score, { ...p3Score, score: 15 });

        const updatedGame = helper.getGame();
        const updatedOnesRow = (updatedGame.upper ?? [])[0];
        const p3Updated = updatedOnesRow.PlayerScore.find(ps => ps.player.playerId === 2);
        expect(p3Updated?.score).toBe(15);

        // All other players in this row must still have no score
        updatedOnesRow.PlayerScore
            .filter(ps => ps.player.playerId !== 2)
            .forEach(ps => expect(ps.score).toBeUndefined());
    });

    it('each row has independent PlayerScore arrays so updating one row does not affect others', () => {
        const helper = gameHelper(undefined);
        helper.generateNewGame(gameType.maxiYatzy);

        const players = [
            makePlayer(0, 'P1', 0),
            makePlayer(1, 'P2', 1),
            makePlayer(2, 'P3', 2),
        ];

        helper.setPlayers(players, mockTranslate);
        const game = helper.getGame();

        const upper = game.upper ?? [];
        const onesRow = upper[0];

        const p1InOnes = onesRow.PlayerScore.find(ps => ps.player.playerId === 0);
        if (!p1InOnes) { return; }
        helper.scoreHandler().updatePlayerScore(onesRow.score, { ...p1InOnes, score: 3 });

        const updatedGame = helper.getGame();
        const p1InTwos = (updatedGame.upper ?? [])[1].PlayerScore.find(ps => ps.player.playerId === 0);
        // Updating "ones" must not pollute "twos"
        expect(p1InTwos?.score).toBeUndefined();
    });
});
