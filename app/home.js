import { Text ,Image} from "react-native";
import styles from "./style/homestyles";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import useFetchTimer from "./hook/useFetchtimer";

const Home = () => {

  const router = useRouter();
  useFetchTimer();


  return (

    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="light-content" />
      <Image style={styles.logo} source={require('./assets/image/mainlogo.png')} />
      <Text style={styles.subtitle}>화재걱정 없는 배터리 배출의 시작</Text>
    </SafeAreaView>
  );
};



export default Home;
