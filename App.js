import 'react-native-gesture-handler';
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity, Text, View } from "react-native";
import AuthScreen from "./components/AuthScreen";
import DevicePicker from "./components/DevicePicker";
import MapViewer from "./components/MapViewer";
import { COLORS } from "./theme";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function MainStack() {
  const [user, setUser] = React.useState(null);
  const [params, setParams] = React.useState(null);

  return (
    <Stack.Navigator>
      {!user ? (
        <Stack.Screen name="Авторизация" options={{ headerShown: false }}>
          {props => <AuthScreen {...props} onAuth={setUser} />}
        </Stack.Screen>
      ) : !params ? (
        <Stack.Screen
          name="Выбор устройства"
          options={{
            headerTitle: "Выбор устройства",
            headerLeft: null,
            headerStyle: { backgroundColor: COLORS.primary },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold" }
          }}
        >
          {props => <DevicePicker {...props} onSelect={(deviceId, date) => setParams({ deviceId, date })} />}
        </Stack.Screen>
      ) : (
        <Stack.Screen
          name="Карта"
          options={{
            headerTitle: "Маршрут",
            headerStyle: { backgroundColor: COLORS.primary },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold" },
            headerLeft: () => (
              <TouchableOpacity style={{ marginLeft: 12 }} onPress={() => setParams(null)}>
                <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>Назад</Text>
              </TouchableOpacity>
            ),
          }}
        >
          {props => <MapViewer {...props} deviceId={params.deviceId} date={params.date} />}
        </Stack.Screen>
      )}
    </Stack.Navigator>
  );
}

function AboutScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 32 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", color: COLORS.primary, marginBottom: 16 }}>
        GPS Tracker Viewer
      </Text>
      <Text style={{ color: "#666", fontSize: 16, textAlign: "center" }}>
        Красивый просмотр истории перемещений, реализованный на React Native + Expo. Авторизация, карта, выбор даты, поддержка Android и PWA.
      </Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Главная"
        screenOptions={{
          drawerStyle: { backgroundColor: "#e8f0fe", width: 240 },
          drawerActiveTintColor: COLORS.primary,
          drawerLabelStyle: { fontWeight: "bold" }
        }}>
        <Drawer.Screen name="Главная" component={MainStack} />
        <Drawer.Screen name="О приложении" component={AboutScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
