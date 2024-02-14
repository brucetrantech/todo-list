import { useState } from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import { YTButton, YTLayout } from "@/cores";
import contents from "@/commons/contents";
import images from "@/commons/images";
import screens from "@/commons/screens";
import themes from "@/commons/themes";
import apis from "@/storages/apis";

type SignInProps = {
	navigation: any;
};

export default function SignIn({ navigation }: SignInProps) {

	const [email, setEmail] = useState<string | undefined>(undefined);

	const onSignIn = () => {
		if (!email) return;
		apis.setCurrentUserByEmail(email)
			.then((result) => {
				if (!result) return;
				navigation.navigate(screens.HOME);
			})
	}

	return (
		<YTLayout>
			<View style={styles.layout}>
				<View style={styles.form}>
					<View style={styles.header}>
						<Text style={styles.title}>{contents.WELCOME_ONBOARD}</Text>
						<Image source={images.back} resizeMode="contain" />
					</View>
					<View>
						<TextInput
							placeholder={contents.ENTER_EMAIL}
							style={styles.input}
							value={email}
							onChangeText={setEmail}
						/>
						<View style={styles.line} />
						<View style={styles.line} />
						<View style={styles.line} />
						<YTButton
							title={contents.SIGN_IN}
							onPress={onSignIn}
							disabled={!email}
						/>
					</View>
				</View>
			</View>
		</YTLayout>
	)
}

const styles = StyleSheet.create({
	layout: {
		flex: 1,
		justifyContent: 'center',
	},
	form: {
		alignSelf: 'center',
		width: '100%',
	},
	header: { marginBottom: 20, alignItems: 'center' },
	title: {
		...themes.font.largeBold,
		color: themes.color.dark,
		marginBottom: 20,
	},
	line: {
		width: '100%',
		height: 12,
	},
	input: {
		width: '100%',
		paddingHorizontal: 20,
		paddingVertical: 12,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: themes.color.secondaryNebula,
		borderStyle: 'solid',
		backgroundColor: themes.color.light,
	},
})