import { Image, StyleSheet, Text, View } from "react-native";
import contents from "@/commons/contents";
import images from "@/commons/images";
import screens from "@/commons/screens";
import themes from "@/commons/themes";
import { YTButton, YTLayout } from "@/cores";

type WelcomeProps = {
	navigation: any;
}

export default function Welcome({ navigation }: WelcomeProps) {

	const onNavigate = () => navigation.navigate(screens.SIGNIN);

	return (
		<YTLayout>
			<View style={styles.view}>
				<Image source={images.welcome} resizeMode="contain" />
				<Text style={styles.title}>{contents.WELCOME_TITLE}</Text>
				<Text style={styles.description}>{contents.LOREMS}</Text>
				<YTButton title={contents.STARTED} onPress={onNavigate} variant="contained" />
			</View>
		</YTLayout>
	)
}

const styles = StyleSheet.create({
	view: {
		flex: 1,
		justifyContent: 'center',
	},
	title: {
		...themes.font.mediumBold,
		color: themes.color.dark,
		paddingTop: 40,
		paddingBottom: 20,
		textAlign: 'center',
	},
	description: {
		...themes.font.normal,
		textAlign: 'center',
		paddingBottom: 80,
	},
})