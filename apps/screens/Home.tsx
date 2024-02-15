/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useCallback, useMemo, useState } from 'react';
import {
	Image,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	SectionList,
	StyleSheet,
	Text,
	TextInput,
	TouchableWithoutFeedback,
	View,
} from 'react-native';
import { YTButton, YTItemList, YTLayout } from '@/cores';
import contents from "@/commons/contents";
import images from "@/commons/images";
import screens from "@/commons/screens";
import themes from "@/commons/themes";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setTasks, signOut } from "@/redux/slices/tasks";
import { shallowEqual } from "react-redux";
import genUID from 'generate-unique-id';
import { Task, UserTasks } from '@/storages/models';

const MAXIMUM_EMAIL_SHOWING = 12;
const initialTask = { id: '', task: '', created_at: '' }

type HomeProps = {
	navigation: any;
}

function getCurrentDate () {
	return new Date()
		.toLocaleString(
			'en-US', {
				year: 'numeric',
				month: 'short',
				day: 'numeric',
				hour: 'numeric',
				minute: 'numeric',
				second: 'numeric',
			}
		)
}

export default function Home({ navigation }: HomeProps) {

	const [task, setTask] = useState<string>('');
	const [changedTask, setChangedTask] = useState<Task>(initialTask);
	const dispatch = useAppDispatch();
	const [userEmail, userTasks] = useAppSelector(
		state =>[
			state.tasks.email.substring(0, MAXIMUM_EMAIL_SHOWING),
			state.tasks.data,
		],
		shallowEqual,
	);

	const onTickDone = useCallback((doneTask: Task) => {
		const updatedTasks = {
			todo: userTasks.todo.filter(item => item.id !== doneTask.id),
			archived: [doneTask, ...userTasks.archived],
		} as UserTasks;
		dispatch(setTasks(updatedTasks));
	}, [userTasks, dispatch]);

	const onUpdate = useCallback((updatedTask: Task) => {
		const updatedTodoTasks = {
			todo: userTasks.todo.map(item => item.id === updatedTask.id ? updatedTask : item),
			archived: userTasks.archived,
		} as UserTasks;
		dispatch(setTasks(updatedTodoTasks))
			.unwrap()
			.then(() => setChangedTask(initialTask));
	}, [userTasks, dispatch]);

	const onDelete = useCallback((deletedTask: Task, isDone: boolean = false) => {
		if (isDone) {
			const updatedArchivedTasks = {
				todo: userTasks.todo,
				archived: userTasks.archived.filter(item => item.id !== deletedTask.id),
			} as UserTasks;
			dispatch(setTasks(updatedArchivedTasks));
			return;
		}
		const updatedTodoTasks = {
			todo: userTasks.todo.filter(item => item.id !== deletedTask.id),
			archived: userTasks.archived,
		} as UserTasks;
		dispatch(setTasks(updatedTodoTasks));
	}, [userTasks, dispatch]);

	const onCreatTask = useCallback(() => {
		if (changedTask.id.trim() !== '') {
			// update task
			return onUpdate(changedTask)
		}
		// new task
		const newTask = {
			id: genUID(),
			task: task,
			created_at: getCurrentDate()
		};
		const updatedTasks = {
			todo: [newTask, ...userTasks.todo],
			archived: userTasks.archived,
		} as UserTasks;
		dispatch(setTasks(updatedTasks))
			.unwrap()
			.then(() => setTask(''));
	}, [userTasks, task, changedTask, onUpdate, dispatch]);

	const onSignOut = useCallback(() => {
		dispatch(signOut()).unwrap().then(res => {
			if (!res) return;
			navigation.navigate(screens.WELCOME)
		})
	}, [dispatch, navigation]);

	const sectionData = useMemo(() => {
		return [
			{
				title: contents.DOING_TASKS,
				is_done: false, 
				data: userTasks?.todo || []
			},
			{
				title: contents.ARCHIVED_TASKS,
				is_done: true, 
				data: userTasks?.archived || []
			}
		]
	}, [userTasks]);

	return (
		<>
			<YTLayout>
				<KeyboardAvoidingView
					style={{flex: 1}}
					behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
					keyboardVerticalOffset={-120}
				>
					<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
						<>
							<View style={styles.header}>
								<Image
									source={images.homeheader}
									style={styles.image}
									resizeMode="contain"
								/>
								<View>
								<View style={styles.welcome}>
									<Text style={styles.title}>{contents.WELCOME}</Text>
									<Text style={[styles.title, styles.bold]}>{userEmail}</Text>
									<YTButton
										variant="text"
										title={contents.SIGN_OUT}
										onPress={onSignOut}
										style={styles.signOut}
									/>
								</View>
								</View>
							</View>
							<View style={styles.form}>
								<TextInput
									value={changedTask.id.trim() !== '' ? changedTask.task : task}
									onChangeText={
										(text: string) => changedTask.id.trim() !== ''
											? setChangedTask({ ...changedTask, task: text })
											: setTask(text)
									}
									placeholder={contents.CREATE_TASK}
									placeholderTextColor={themes.color.secondaryNebula}
									style={styles.input}
									multiline
								/>
								<YTButton title="+" onPress={onCreatTask} />
							</View>
							<View style={styles.body}>
								<SectionList
									sections={sectionData}
									keyExtractor={(item) => `${item.created_at}`}
									renderItem={({item, section}) => (
										<YTItemList
											data={item}
											isDone={section.is_done}
											onTickDone={onTickDone}
											onUpdate={setChangedTask}
											onDelete={(item) => onDelete(item, section.is_done)}
										/>
									)}
									renderSectionHeader={({section: {title}}) => (
										<View style={styles.sectionHeader}>
											<Text style={styles.sectionTitle}>{title}</Text>
										</View>
									)}
									ListEmptyComponent={(
										<View style={styles.emptyView}>
											<Text style={styles.emptyText}>{contents.NO_TASK}</Text>
										</View>
									)}
								/>
							</View>
						</>
					</TouchableWithoutFeedback>
				</KeyboardAvoidingView>
			</YTLayout>
		</>
	);
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
		paddingVertical: 12,
	},
	title: {
		...themes.font.medium,
		color: themes.color.primaryCyan,
		textAlign: 'right',
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
		color: themes.color.primaryTiger,
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
		color: themes.color.dark,
	},
	signOut: {
		alignSelf: 'flex-end',
		marginTop: 8,
	}
});
