import { PlayerDto } from "@components/players/playerObject";


export interface PlayerScore {
    isRemoved?: boolean;
    player: PlayerDto;
    score: number | undefined;
}
