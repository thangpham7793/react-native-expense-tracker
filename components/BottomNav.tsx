import * as React from "react"
import { StyleSheet, View } from "react-native"
import { BottomNavigation, Text } from "react-native-paper"

const MusicRoute = () => {
  return (
    <View style={styles.container}>
      <Text>Music</Text>
    </View>
  )
}

const AlbumsRoute = () => (
  <Text style={{ alignItems: "center", justifyContent: "center" }}>Albums</Text>
)

const RecentsRoute = () => (
  <Text style={{ alignItems: "center", justifyContent: "center" }}>
    Recents
  </Text>
)

export default function BottomNav() {
  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: "music", title: "Overview", icon: "music" },
    { key: "albums", title: "History", icon: "album" },
    { key: "recents", title: "Analytics", icon: "history" },
  ])

  const renderScene = BottomNavigation.SceneMap({
    music: MusicRoute,
    albums: AlbumsRoute,
    recents: RecentsRoute,
  })

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black",
    borderTopWidth: 10,
  },
})
