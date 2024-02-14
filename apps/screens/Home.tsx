/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useCallback, useState } from 'react';
import {
	Dimensions,
	Image,
	SectionList,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native';
import { YTButton, YTLayout } from 'cores';
import { contents, images, themes } from 'commons';

type TaskType = {
	task: string;
	is_done: boolean;
	created_at: string;
}

const MOCK_DATAS = [
	{
		title: contents.DOING_TASKS,
		is_done: false, 
		data: [
			{
				task: 'Good morning',
				is_done: false,
				created_at: 'Jan, 24th 2024 08:34:12'
			},
			{
				task: 'Good afternoon',
				is_done: false,
				created_at: 'Jan, 25th 2024 13:07:40'
			},
			{
				task: 'Good evening',
				is_done: false,
				created_at: 'Jan, 26th 2024 20:22:03'
			}
		]
	},
	{
		title: contents.ARCHIVED_TASKS,
		is_done: true,
		data: [
			{
				task: 'Archived task 1',
				is_done: true,
				created_at: 'Jan, 20th 2024 08:34:12'
			},
			{
				task: 'Archived task 2',
				is_done: true,
				created_at: 'Jan, 21th 2024 13:07:40'
			},
			{
				task: 'Archived task 3',
				is_done: true,
				created_at: 'Jan, 22th 2024 20:22:03'
			}
		]
	}
]

type HomeProps = {
	navigation: any;
}

function getCurrentDate () {
	return new Date()
		.toLocaleString(
			'en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
				hour: 'numeric',
				minute: 'numeric',
				second: 'numeric',
			}
		)
}

const initalTask: TaskType = {
	task: '',
	is_done: false,
	created_at: getCurrentDate()
};

export default function Home({ navigation }: HomeProps) {

	const [task, setTask] = useState<TaskType>(initalTask);

	const onChangeTask = useCallback((text: string) => setTask({
		...task,
		task: text,
	}), [task, setTask])

	const onCreatTask = useCallback(() => {

	}, []);

	return (
		<>
			<YTLayout>
				<View style={styles.header}>
					<Image
						source={images.homeheader}
						style={styles.image}
						resizeMode="contain"
					/>
					<View style={styles.welcome}>
						<Text style={styles.title}>{contents.WELCOME}</Text>
						<Text style={[styles.title, styles.bold]}>{` ${"Bruce"}!`}</Text>
					</View>
				</View>
				<View style={styles.form}>
					<TextInput
						value={task.task}
						onChangeText={onChangeTask}
						placeholder={contents.CREATE_TASK}
						style={styles.input}
						multiline
					/>
					<YTButton title="+" onPress={onCreatTask} />
				</View>
				<View style={styles.body}>
					<SectionList
						sections={MOCK_DATAS}
						keyExtractor={(item) => `${item.created_at}`}
						renderItem={({item}) => (
							<View style={styles.sectionItem}>
								<View style={[
									styles.circle,
									item.is_done ? styles.circleDone : null,
								]} />
								<Text style={[
									styles.sectionLabel,
									item.is_done ? styles.linethrough : null
								]}>{item.task}</Text>
							</View>
						)}
						renderSectionHeader={({section: {title, is_done}}) => (
							<View style={styles.sectionHeader}>
								<Text style={styles.sectionTitle}>{title}</Text>
							</View>
						)}
						ListEmptyComponent={<EmptyTasks />}
					/>
				</View>
			</YTLayout>
		</>
	);
}

function EmptyTasks () {
	return (
		<View style={styles.emptyView}>
			<Text style={styles.emptyText}>{contents.NO_TASK}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	layout: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	header: {
		width: '100%',
		flexDirection: 'row',
		alignItems: 'flex-start',
		justifyContent: 'space-between',
	},
	image: { height: 120 },
	welcome: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 12,
	},
	title: {
		...themes.font.medium,
		color: themes.color.primaryCyan,
	},
	bold: { fontWeight: '800' },
	body: { flex: 1 },
	sectionHeader: {
		marginBottom: 8,
		height: 46,
		backgroundColor: themes.color.secondaryHarp,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	sectionTitle: {
		...themes.font.largeBold,
		color: themes.color.primaryCyan,
	},
	sectionItem: {
		minHeight: 64,
		width: '100%',
		borderRadius: 12,
		paddingVertical: 8,
		paddingHorizontal: 12,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: themes.color.light,
		marginBottom: 12,
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
	sectionLabel: themes.font.normal,
	linethrough: {
		textDecorationLine: 'line-through'
	},
	emptyView: {
		minHeight: 300,
		width: '100%',
		justifyContent: 'center',
	},
	emptyText: {
		...themes.font.medium,
		color: themes.color.primaryCyan82,
		textAlign: 'center',
	},
	form: {
		width: '100%',
		minHeight: 50,
		backgroundColor: themes.color.secondaryHarp,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	input: {
		width: '80%',
		minHeight: 42,
		paddingHorizontal: 20,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: themes.color.secondaryNebula,
		borderStyle: 'solid',
		backgroundColor: themes.color.light,
		paddingTop: 12,
	}
});
