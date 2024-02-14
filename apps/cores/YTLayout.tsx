import { images } from "commons";
import { ImageBackground, SafeAreaView, ScrollView, StatusBar, StyleSheet, View } from "react-native";

type YTLayoutProps = {
  children: React.ReactNode;
  hasScroll?: boolean;
}

export default function YTLayout ({
  children,
  hasScroll = false,
}: YTLayoutProps) {
  return (
    <ImageBackground source={images.background} style={styles.flex}>
      <SafeAreaView style={styles.flex}>
        <StatusBar barStyle="dark-content"/>
        {hasScroll ? (
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.layout}
          >
            {children}
          </ScrollView>
        ) : (
          <View style={styles.layout}>
            {children}
          </View>
        )}
      </SafeAreaView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  layout: {
    flex: 1,
    paddingHorizontal: 24,
  }
})