// react
import { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';

// expo router
import { Stack, useRouter } from 'expo-router'

// assets
import { COLORS, FONT, icons, images, SHADOWS, SIZES } from '../constants'

// components
import {
  Nearbyjobs,
  Popularjobs,
  ScreenHeaderBtn,
  Welcome
} from '../components'

const Home = () => {
  const router = useRouter();

  // useEffect to apply a delay in my component to fix a API error
  const [showComponent, setShowComponent] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShowComponent(true)
    }, 1000)
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen options={{
        headerStyle: { backgroundColor: COLORS.lightWhite }, // header background
        headerShadowVisible: false, // removing shadow
        headerLeft: () => ( // element on the left at the header
          <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
        ),
        headerRight: () => ( // element on the right at the header
          <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />
        ),
        headerTitle: "" // header title content
      }} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            padding: SIZES.medium
          }}
        >
          <Welcome profileName="Rodrigo" />
          <Popularjobs />

          {/* rendering after 3 seconds */}
          {showComponent ? <Nearbyjobs /> : null}
          {/* <Nearbyjobs /> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home;