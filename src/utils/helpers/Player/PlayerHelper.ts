import { PlayerDto } from "@components/players/playerObject";
import { PlayerScore } from "../Game/PlayerScore";
import playerStorageHandler from "@helpers/Storage/player/playerHandler";
import gameHelper from '@helpers/Game/gameHelper';
import { useGame } from '@helpers/Game/gameContext';
import { gameType } from "../Game/gameType";
import { TFunction } from "i18next";
import { Game } from "../Game/Game";
import { Dispatch, SetStateAction } from "react";


const sortPlayersByOrder = (a: PlayerDto, b: PlayerDto) => {
    const aOrder = a.order !== undefined ? a.order : Infinity;
    const bOrder = b.order !== undefined ? b.order : Infinity;
    return aOrder - bOrder;
}

const sortPlayerScoresByPlayersOrder = (a: PlayerScore, b: PlayerScore) => {
    const aOrder = a.player.order !== undefined ? a.player.order : Infinity;
    const bOrder = b.player.order !== undefined ? b.player.order : Infinity;
    return aOrder - bOrder;

}

const getPlayerId = (players: PlayerDto[]): number => {
    return players.length > 0
        ? players.reduce(function (prev, current) {
            return prev && prev.playerId > current.playerId ? prev : current;
        }).playerId + 1
        : 0;
};

const submitNewPlayer = (playerName: string, imageUrl: string, t: TFunction<"translation", undefined>, game: Game | undefined, setGame: Dispatch<SetStateAction<Game | undefined>>) => {
    const playerHandler = playerStorageHandler();

    let players: PlayerDto[] = [];
    if (Array.isArray(playerHandler.getPlayers())) {
        players = playerHandler.getPlayers();
    }
    let gamingHelper = gameHelper(game);
    let player = {} as PlayerDto;
    player.name = playerName;
    player.playerId = getPlayerId(players);
    player.imageUrl = imageUrl;
    players.push(player);
    playerHandler.savePlayers(players);
    if (game) {
        gamingHelper.setPlayers(players, t);
    } else {
        gamingHelper.generateNewGame(gameType.maxiYatzy);
        gamingHelper.setPlayers(players, t);
    }
    setGame(gamingHelper.getGame());
};

export { sortPlayerScoresByPlayersOrder, sortPlayersByOrder, getPlayerId, submitNewPlayer };