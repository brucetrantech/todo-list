import { useCallback, useState } from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import { YTButton, YTLayout } from "@/cores";
import contents from "@/commons/contents";
import images from "@/commons/images";
import screens from "@/commons/screens";
import themes from "@/commons/themes";
import { useAppDispatch } from "@/redux/hooks";
import { signIn } from "@/redux/slices/tasks";

type SignInProps = {
	navigation: any;
};

function validatedEmail (email: string): boolean {
	if (!email || email.trim() == '') return true;
	const emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");
	return emailRegex.test(email);
}

export default function SignIn({ navigation }: SignInProps) {

	const [email, setEmail] = useState<string | undefined>(undefined);
	const [error, setError] = useState<string | null>(null);
	const dispatch = useAppDispatch();

	const onSignIn = useCallback(() => {
		if (!email) return;
		dispatch(signIn(email)).unwrap().then(res => {
			if (!res) return;
			navigation.navigate(screens.HOME);
		})
	}, [dispatch, email, navigation]);

	const onChangeEmail = useCallback((text: string) => {
		setEmail(text);
		if (!text || text.trim() === '') {
			if (error) setError(null);
			return;
		}
		if (validatedEmail(text)) {
			setError(null);
			return;
		}
		setError(contents.ERROR_EMAIL_FORMAT)
	}, [error, setEmail, setError]);

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
							onChangeText={onChangeEmail}
							focusable
						/>
						<View style={styles.errorView}>
							{error ? (
								<Text style={styles.error}>{error || 'Error message'}</Text>
							) : null}
						</View>
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
	errorView: {
		height: 30,
		width: '100%',
		justifyContent: 'center',
	},
	error: {
		...themes.font.normal,
		color: themes.color.error,
	}
})