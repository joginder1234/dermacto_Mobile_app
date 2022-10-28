import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DataContextProvider from "./app/context/AppDataContext";
import EmailLoginForm from "./app/screens/auth/EmailLoginForm";
import EmailOtpView from "./app/screens/auth/EmailOtpview";
import MobileLoginForm from "./app/screens/auth/MobileLoginForm";
import OnBoardingScreen from "./app/screens/auth/OnBoarding";
import OtpView from "./app/screens/auth/OtpView";
import RegisterForm from "./app/screens/auth/RegisterForm";
import BottomNavigationView from "./app/screens/BottomNavBar/BottomNavigationView";
import DailyRoutine from "./app/screens/daily_treatment/daily_routine";
import MedicationTile from "./app/screens/daily_treatment/medication/medication";

import TreatmentRoutine from "./app/screens/daily_treatment/treatmentRoutine";
import DashBoardview from "./app/screens/Dashboard/DashBoardview";
import Analytics from "./app/screens/insights/analytics";
import AddProductManually from "./app/screens/products/AddProductForm";
import AddProduct from "./app/screens/products/Add_product";
import ContactUs from "./app/screens/profile/ContactUs";
import MyFavorits from "./app/screens/profile/MyFavorits";
import MyProfile from "./app/screens/profile/My_Profile";
import ProfileDashboard from "./app/screens/profile/ProfileDashboard";
import Reminder from "./app/screens/profile/Reminder";
import ArticleView from "./app/screens/Tools/ArticleView";
import BatterSleep from "./app/screens/Tools/BatterSleep";
import Skin_Positivity from "./app/screens/Tools/Skin_Positivity";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <DataContextProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Onboarding">
          <Stack.Screen
            name="Onboarding"
            component={OnBoardingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LoginForm"
            component={MobileLoginForm}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EmailLoginForm"
            component={EmailLoginForm}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="OtpView"
            component={OtpView}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EmailOtp"
            component={EmailOtpView}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RegisterForm"
            component={RegisterForm}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DashBoard"
            component={DashBoardview}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="BottomNavView"
            component={BottomNavigationView}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DailyRoutine"
            component={DailyRoutine}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TreatmentRoutine"
            component={TreatmentRoutine}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MedicationView"
            component={MedicationTile}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddProducts"
            component={AddProduct}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Batter Sleep"
            component={BatterSleep}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ArticleView"
            component={ArticleView}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SkinPositive"
            component={Skin_Positivity}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ProfileView"
            component={ProfileDashboard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Favorites"
            component={MyFavorits}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ContactView"
            component={ContactUs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ReminderView"
            component={Reminder}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddProductView"
            component={AddProductManually}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Insights"
            component={Analytics}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MyProfileScreen"
            component={MyProfile}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </DataContextProvider>
  );
}
