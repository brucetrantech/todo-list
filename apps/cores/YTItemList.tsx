import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import themes from "@/commons/themes";
import { Task } from "@/storages/models";
import YTButton from "./YTButton";

type YTItemListProps = {
    index?: number;
    data: Task;
    isDone: boolean;
    onTickDone: (item: Task) => void;
    onUpdate: (item: Task) => void;
    onDelete: (item: Task) => void;
}

let row: Array<any> = [];
let prevOpenedRow: any;

type RightActonProps = {
    isDone: boolean;
    onUpdate: () => void;
    onDelete: () => void;
}

function RightAction ({ isDone, onUpdate, onDelete }: RightActonProps) {
    return (
        <View style={[
            styles.actions,
            isDone ? { width: 50 } : null,
        ]}>
            {isDone ? null : (
                <YTButton title="E" color="cyan" onPress={onUpdate} />
            )}
            <YTButton title="X" color="error" onPress={onDelete} />
        </View>
    );
}

export default function YTItemList ({
    index = 0,
    data,
    isDone,
    onTickDone,
    onUpdate,
    onDelete,
}: YTItemListProps) {

    const closeRow = (index: number) => {
        if (prevOpenedRow && prevOpenedRow !== row[index]) {
          prevOpenedRow.close();
        }
        prevOpenedRow = row[index];
    };

    return (
        <Swipeable
            renderRightActions={() => (
                <RightAction
                    isDone={isDone}
                    onUpdate={() => {onUpdate(data); closeRow(index);}}
                    onDelete={() => {onDelete(data); closeRow(index);}}
                />
            )}
            onSwipeableOpen={() => closeRow(index)}
            ref={(ref) => (row[index] = ref)}
            rightThreshold={isDone ? -50 : -100}
            containerStyle={styles.sectionItem}
        >
            <View style={styles.body}>
                <View style={styles.sectionBody}>
                    {isDone ? (
                        <View style={[styles.circle,styles.circleDone]} />
                    ) : (
                        <TouchableOpacity
                            style={styles.circle}
                            onPress={() => onTickDone(data)}
                        />
                    )}
                    <Text style={[
                        styles.sectionLabel,
                        isDone ? styles.linethrough : null,
                    ]}>{data.task}</Text>
                </View>
                <View style={styles.timeView}>
                    <Text style={styles.time}>{data.created_at}</Text>
                </View>
            </View>
        </Swipeable>
    )
}

const styles = StyleSheet.create({
    sectionItem: {
		minHeight: 64,
		width: '100%',
        justifyContent: 'center',
		marginBottom: 12,
	},
    body: {
		backgroundColor: themes.color.light,
        width: '100%',
        minHeight: 64,
        borderRadius: 12,
    },
    sectionBody: {
        flexDirection: 'row',
		alignItems: 'center',
        width: '100%',
        minHeight: 64,
        borderRadius: 12,
		paddingVertical: 8,
		paddingHorizontal: 12,
    },
	circle: {
		height: 24,
		width: 24,
		borderRadius: 12,
		borderColor: themes.color.primaryCyan,
		borderWidth: 4,
		backgroundColor: themes.color.light,
		marginRight: 12,
	},
	circleDone: {
		backgroundColor: themes.color.primaryCyan,
	},
	sectionLabel: {
        ...themes.font.normal,
        color: themes.color.dark,
    },
	linethrough: {
		textDecorationLine: 'line-through'
	},
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 90,
        justifyContent: 'space-between',
        marginLeft: 12,
    },
    timeView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingBottom: 12,
        paddingRight: 12, 
    },
    time: {
        ...themes.font.normal,
        color: themes.color.secondaryCat,
    }
})

