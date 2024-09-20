import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { Profile, Home } from "../screens";
import { theme } from "../theme";

const Stack = createNativeStackNavigator();

type ScreenTypes = {
  Home: undefined;
  Profile: undefined;
};

export type StackScreensProps = NativeStackNavigationProp<ScreenTypes>;

export function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerTitle: "Perfil",
          headerTitleAlign: "center",
          headerTintColor: theme.colors.primaryWhite,
          headerTitleStyle: {
            fontFamily: theme.fonts.bold,
          },
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
        }}
      />
    </Stack.Navigator>
  );
}