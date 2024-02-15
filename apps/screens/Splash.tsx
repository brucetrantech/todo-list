import { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import contents from "@/commons/contents";
import images from "@/commons/images";
import screens from "@/commons/screens";
import themes from "@/commons/themes";
import { YTLayout } from "@/cores";
import { useAppDispatch } from "@/redux/hooks";
import { getCurrentUser } from "@/redux/slices/tasks";

type SplashProps = {
	navigation: any;
}

export default function Splash({ navigation }: SplashProps) {

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getCurrentUser()).unwrap().then((res) => {
			const destScreen = res ? screens.HOME : screens.WELCOME;
			navigation.navigate(destScreen);
		})
	}, [navigation, dispatch])

	return (
		<YTLayout>
			<View style={styles.layout}>
				<Image source={images.logofull} resizeMode="contain" />
				<Text style={styles.author}>{contents.MADE_BY_AUTHOR}</Text>
			</View>
		</YTLayout>
	)
}

const styles = StyleSheet.create({
	layout: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	author: {
		...themes.font.normal,
		position: 'absolute',
		bottom: 20,
	}
})