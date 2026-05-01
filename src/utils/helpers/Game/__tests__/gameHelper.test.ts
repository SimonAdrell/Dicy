import { TFunction } from 'i18next';
import gameHelper from '../gameHelper';
import { gameType } from '../gameType';
import { PlayerDto } from '@components/players/playerObject';
import { gameHelperType } from '../gameHelperType';

const mockTranslate = ((str: string) => str) as unknown as TFunction<'translation', undefined>;

const makePlayer = (playerId: number, name: string, order?: number): PlayerDto => ({
    playerId,
    name,
    imageUrl: '',
    plusImage: false,
    currentScore: 0,
    order,
});



function setupHelper(players: PlayerDto[]): gameHelperType {
    const helper = gameHelper(undefined);
    helper.generateNewGame(gameType.maxiYatzy);
    helper.setPlayers(players, mockTranslate);
    return helper;
}

const fivePlayers: PlayerDto[] = [
    makePlayer(0, 'P1', 0),
    makePlayer(1, 'P2', 1),
    makePlayer(2, 'P3', 2),
    makePlayer(3, 'P4', 3),
    makePlayer(4, 'P5', 4),
];

describe('gameHelper – multiple players', () => {
    it('generates unique order-independent PlayerScore arrays for each GameState row', () => {
        const helper = setupHelper(fivePlayers);
        const upper = helper.getGame().upper ?? [];

        expect(upper.length).toBeGreaterThan(1);
        for (let i = 0; i < upper.length - 1; i++) {
            expect(upper[i].PlayerScore).not.toBe(upper[i + 1].PlayerScore);
        }
    });

    it('assigns scores to the correct player when 5 players are in the game', () => {
        const helper = setupHelper(fivePlayers);
        const onesRow = (helper.getGame().upper ?? [])[0];

        const p3Score = onesRow.PlayerScore.find(ps => ps.player.playerId === 2);
        expect(p3Score).toBeDefined();
        if (!p3Score) { return; }

        helper.scoreHandler().updatePlayerScore(onesRow.score, { ...p3Score, score: 15 });

        const updatedOnesRow = (helper.getGame().upper ?? [])[0];
        expect(updatedOnesRow.PlayerScore.find(ps => ps.player.playerId === 2)?.score).toBe(15);
        updatedOnesRow.PlayerScore
            .filter(ps => ps.player.playerId !== 2)
            .forEach(ps => expect(ps.score).toBeUndefined());
    });

    it('each row has independent PlayerScore arrays so updating one row does not affect others', () => {
        const helper = setupHelper([makePlayer(0, 'P1', 0), makePlayer(1, 'P2', 1), makePlayer(2, 'P3', 2)]);
        const onesRow = (helper.getGame().upper ?? [])[0];

        const p1InOnes = onesRow.PlayerScore.find(ps => ps.player.playerId === 0);
        if (!p1InOnes) { return; }
        helper.scoreHandler().updatePlayerScore(onesRow.score, { ...p1InOnes, score: 3 });

        const p1InTwos = (helper.getGame().upper ?? [])[1].PlayerScore.find(ps => ps.player.playerId === 0);
        expect(p1InTwos?.score).toBeUndefined();
    });

    describe('column ordering after score updates (regression: wrong-column bug)', () => {
        // Players added through the in-app "new player" flow have order === undefined,
        // because submitNewPlayer never assigns an order. This regression test guards
        // against updates re-ordering the PlayerScore array, which would cause the
        // entered score to render under a different player's column.
        const playerA: PlayerDto = makePlayer(0, 'A');
        const playerB: PlayerDto = makePlayer(1, 'B');

        it('preserves the per-column position of each player after updating player A', () => {
            const helper = setupHelper([playerA, playerB]);
            const onesRow = (helper.getGame().upper ?? [])[0];

            const aIndexBefore = onesRow.PlayerScore.findIndex(ps => ps.player.playerId === playerA.playerId);
            const bIndexBefore = onesRow.PlayerScore.findIndex(ps => ps.player.playerId === playerB.playerId);

            const aScoreCell = onesRow.PlayerScore[aIndexBefore];
            helper.scoreHandler().updatePlayerScore(onesRow.score, { ...aScoreCell, score: 3 });

            const updatedOnesRow = (helper.getGame().upper ?? [])[0];
            const aIndexAfter = updatedOnesRow.PlayerScore.findIndex(ps => ps.player.playerId === playerA.playerId);
            const bIndexAfter = updatedOnesRow.PlayerScore.findIndex(ps => ps.player.playerId === playerB.playerId);

            expect(aIndexAfter).toBe(aIndexBefore);
            expect(bIndexAfter).toBe(bIndexBefore);
        });

        it('full two-player flow: scores stay attached to the player who received them', () => {
            const helper = setupHelper([playerA, playerB]);

            // Step 1: Player A gets a score in the ones row.
            const onesRow = (helper.getGame().upper ?? [])[0];
            const aOnesCell = onesRow.PlayerScore.find(ps => ps.player.playerId === playerA.playerId)!;
            helper.scoreHandler().updatePlayerScore(onesRow.score, { ...aOnesCell, score: 5 });

            // Player A receives the score, Player B does not.
            const onesAfterA = (helper.getGame().upper ?? [])[0];
            expect(onesAfterA.PlayerScore.find(ps => ps.player.playerId === playerA.playerId)?.score).toBe(5);
            expect(onesAfterA.PlayerScore.find(ps => ps.player.playerId === playerB.playerId)?.score).toBeUndefined();

            // Step 2: Player B gets a score in the twos row.
            const twosRow = (helper.getGame().upper ?? [])[1];
            const bTwosCell = twosRow.PlayerScore.find(ps => ps.player.playerId === playerB.playerId)!;
            helper.scoreHandler().updatePlayerScore(twosRow.score, { ...bTwosCell, score: 6 });

            const twosAfterB = (helper.getGame().upper ?? [])[1];
            expect(twosAfterB.PlayerScore.find(ps => ps.player.playerId === playerB.playerId)?.score).toBe(6);
            expect(twosAfterB.PlayerScore.find(ps => ps.player.playerId === playerA.playerId)?.score).toBeUndefined();

            // Player A's earlier score must still be intact in the ones row.
            const onesAfterAll = (helper.getGame().upper ?? [])[0];
            expect(onesAfterAll.PlayerScore.find(ps => ps.player.playerId === playerA.playerId)?.score).toBe(5);
            expect(onesAfterAll.PlayerScore.find(ps => ps.player.playerId === playerB.playerId)?.score).toBeUndefined();
        });
    });
});
