import playerStorage from "../../Helpers/Storage/playerStorage";
import { PlayerDto } from "../../library/components/players/playerObject";

interface playerHandler {
    getPlayers: () => Array<PlayerDto>;
    savePlayers: (players: Array<PlayerDto>) => void;
    setListener: (listener:(key: string) => void) => storageListener;
}

const playerStorageHandler = () : playerHandler => {
    const playerstorage: storage<PlayerDto> = playerStorage("players");
    return {
        getPlayers: () => playerstorage.get(),
        savePlayers: (players: Array<PlayerDto>) => playerstorage.save(players),
        setListener: (listener: (key: string) => void) => playerstorage.addListener(listener),
    }
}

export default playerStorageHandler;