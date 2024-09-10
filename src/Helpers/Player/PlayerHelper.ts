import { PlayerDto } from "../../library/components/players/playerObject";
import { PlayerScore } from "../Game/PlayerScore";

const sortPlayersByOrder = (a: PlayerDto, b: PlayerDto) => {
    const aOrder = a.order !== undefined ? a.order : Infinity;
    const bOrder = b.order !== undefined ? b.order : Infinity;
    return aOrder - bOrder;
}

const sortPlayerScores = (a: PlayerScore, b: PlayerScore) => {
    const aOrder = a.player.order !== undefined ? a.player.order : Infinity;
    const bOrder = b.player.order !== undefined ? b.player.order : Infinity;
    return aOrder - bOrder;

}

export { sortPlayerScores, sortPlayersByOrder as sortPlayers };