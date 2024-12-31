import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: { flex: 1, paddingTop: 20, backgroundColor: '#F1F3F9', padding: 10 },
    title: { flex: 1, textAlign: 'center', alignItems: 'center' },
    player: { flex: 1, textAlign: 'center', alignItems: 'center', paddingBottom: 10 },
    playerName: { fontSize: 18, fontWeight: 'thin' },
    row: { height: 28, flex: 1 },
    headerRow: { flexDirection: 'row' },
    board: { width: '100%', },
    doneCell1: { backgroundColor: '#CCD5AE' },
    doneCell2: { backgroundColor: '#E9EDC9' },
    removedCell1: { backgroundColor: '#ededed' },
    removedCell2: { backgroundColor: '#d3d3d3' }
});