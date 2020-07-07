import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import Dashboard from '../pages/Dashboard'
import Feed from '../pages/Feed'
import Contacts from '../pages/Contacts'
// import { View, TouchableOpacity } from 'react-native'
// import Animated from 'react-native-reanimated'

const Tab = createMaterialTopTabNavigator()
// function MyTabBar ({ state, descriptors, navigation, position }) {
//   return (
//     <View style={{ flexDirection: 'row', paddingTop: 20 }}>
//       {state.routes.map((route, index) => {
//         const { options } = descriptors[route.key]
//         const label =
//           options.tabBarLabel !== undefined
//             ? options.tabBarLabel
//             : options.title !== undefined
//               ? options.title
//               : route.name

//         const isFocused = state.index === index

//         const onPress = () => {
//           const event = navigation.emit({
//             type: 'tabPress',
//             target: route.key
//           })

//           if (!isFocused && !event.defaultPrevented) {
//             navigation.navigate(route.name)
//           }
//         }

//         const onLongPress = () => {
//           navigation.emit({
//             type: 'tabLongPress',
//             target: route.key
//           })
//         }
//         // modify inputRange for custom behavior
//         const inputRange = state.routes.map((_, i) => i)
//         const opacity = Animated.interpolate(position, {
//           inputRange,
//           outputRange: inputRange.map(i => (i === index ? 1 : 0))
//         })

//         return (
//           <TouchableOpacity
//             accessibilityRole="button"
//             accessibilityLabel={options.tabBarAccessibilityLabel}
//             testID={options.tabBarTestID}
//             onPress={onPress}
//             onLongPress={onLongPress}
//             style={{ flex: 1 }}
//           >
//             <Animated.Text style={{ opacity }}>{label}</Animated.Text>
//           </TouchableOpacity>
//         )
//       })}
//     </View>
//   )
// }
const MainRoutes: React.FC = () => {
  // tabBar={props => <MyTabBar {...props} />}>}
  return (
    <Tab.Navigator >
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Feed" component={Feed} />
      <Tab.Screen name="Contacts" component={Contacts} />
    </Tab.Navigator>
  )
}

export default MainRoutes
