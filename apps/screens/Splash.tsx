import { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import contents from "@/commons/contents";
import images from "@/commons/images";
import screens from "@/commons/screens";
import themes from "@/commons/themes";
import { YTLayout } from "@/cores";
import apis from "@/storages/apis";

type SplashProps = {
	navigation: any;
}

export default function Splash({ navigation }: SplashProps) {

	useEffect(() => {
		apis.getCurrentUser().then(email => {
			const destScreen = email ? screens.HOME : screens.WELCOME;
			navigation.navigate(destScreen);
		})
	}, [navigation])

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