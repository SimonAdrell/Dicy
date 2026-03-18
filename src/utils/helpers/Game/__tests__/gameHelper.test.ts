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
});
