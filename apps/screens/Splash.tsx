import { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import contents from "@/commons/contents";
import images from "@/commons/images";
import screens from "@/commons/screens";
import themes from "@/commons/themes";
import { YTLayout } from "@/cores";
// import { useAppDispatch } from "@/redux/hooks";
// import { getCurrentUser } from "@/redux/slices/tasks";
import { useAuth } from "@/context/AuthContext";

type SplashProps = {
	navigation: any;
}

export default function Splash({ navigation }: SplashProps) {

	// const dispatch = useAppDispatch();

	const { isSignedIn } = useAuth();

	/* Applying React.Context */
	useEffect(() => {
		const destScreen = isSignedIn ? screens.HOME : screens.WELCOME;
		navigation.navigate(destScreen);
	}, [isSignedIn, navigation])

	/* End - Applying React.Context */

	/* Dispatch here is used to redux-flow */
	// useEffect(() => {
	// 	dispatch(getCurrentUser()).unwrap().then((res) => {
	// 		const destScreen = res ? screens.HOME : screens.WELCOME;
	// 		navigation.navigate(destScreen);
	// 	})
	// }, [navigation, dispatch])
	/* End: redux-flow */

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