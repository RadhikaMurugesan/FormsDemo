

import React, { PropsWithChildren } from 'react';
import {
	Keyboard,
	KeyboardAvoidingView,
	SafeAreaView,
	StyleSheet,
	TouchableWithoutFeedback,
} from 'react-native';

function WrapperView({ children }: PropsWithChildren): JSX.Element {
	return (
		<SafeAreaView>
			<KeyboardAvoidingView
				behavior={'padding'}
				style={styles.container}
			>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					{children}
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white'
	},
});

export default WrapperView;
