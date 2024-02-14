import { contents, images, themes } from "commons";
import { YTLayout } from "cores";
import { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

type SplashProps = {
	navigation: any;
}

export default function Splash({ navigation }: SplashProps) {

	useEffect(() => {
		setTimeout(() => {
			navigation.navigate('Welcome');
		}, 1000);
	}, [])

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