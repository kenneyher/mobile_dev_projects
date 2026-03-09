import { StyleSheet, Text, FlatList } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

const MBL_PLAYERS = [
  {
    id: 1,
    name: "Aaron Judge",
    team: "New York Yankees",
    position: "OF",
    projectedStats: {
      homeRuns: 46,
      battingAverage: 0.295,
      OBP: 0.417,
      wRC_plus: 172,
    },
    notable:
      "Projected to lead MLB in Home Runs and wRC+ for the 5th consecutive year.",
  },
  {
    id: 2,
    name: "Shohei Ohtani",
    team: "Los Angeles Dodgers",
    position: "DH/P",
    projectedStats: {
      homeRuns: 43,
      stolenBases: 35,
      pitchingStrikeouts: 136,
      ERA: 3.15,
    },
    notable:
      "Returning to the mound full-time in 2026 after a historic 50/50 offensive season in 2025.",
  },
  {
    id: 3,
    name: "Bobby Witt Jr.",
    team: "Kansas City Royals",
    position: "SS",
    projectedStats: {
      hits: 188,
      stolenBases: 40,
      battingAverage: 0.294,
      WAR: 7.2,
    },
    notable:
      "Entering 2026 as the top-ranked shortstop in MLB following a 7.1 WAR 2025 season.",
  },
  {
    id: 4,
    name: "Juan Soto",
    team: "New York Mets",
    position: "OF",
    projectedStats: {
      homeRuns: 37,
      walks: 118,
      OBP: 0.413,
      battingAverage: 0.273,
    },
    notable: "Projected to lead the National League in On-Base Percentage.",
  },
  {
    id: 5,
    name: "Paul Skenes",
    team: "Pittsburgh Pirates",
    position: "SP",
    projectedStats: {
      ERA: 2.92,
      strikeouts: 237,
      wins: 16,
      WHIP: 1.02,
    },
    notable:
      "Projected NL leader in ERA and Strikeouts; youngest to lead back-to-back years since 1913.",
  },
  {
    id: 6,
    name: "Tarik Skubal",
    team: "Detroit Tigers",
    position: "SP",
    projectedStats: {
      ERA: 2.85,
      strikeouts: 225,
      WHIP: 0.95,
      WAR: 6.4,
    },
    notable:
      "The back-to-back AL Cy Young winner entering 2026 as the premier left-handed starter.",
  },
  {
    id: 7,
    name: "Cal Raleigh",
    team: "Seattle Mariners",
    position: "C",
    projectedStats: {
      homeRuns: 40,
      RBIs: 115,
      slugging: 0.51,
      OPS: 0.885,
    },
    notable:
      "The reigning 2025 AL MVP runner-up and current top-ranked catcher.",
  },
  {
    id: 8,
    name: "Vladimir Guerrero Jr.",
    team: "Toronto Blue Jays",
    position: "1B",
    projectedStats: {
      battingAverage: 0.295,
      homeRuns: 31,
      RBIs: 105,
      hits: 182,
    },
    notable:
      "Coming off a massive 2025 where he led the Blue Jays to a World Series appearance.",
  },
  {
    id: 9,
    name: "Gunnar Henderson",
    team: "Baltimore Orioles",
    position: "SS",
    projectedStats: {
      homeRuns: 28,
      runsScored: 110,
      stolenBases: 25,
      WAR: 6.1,
    },
    notable:
      "Anchoring a high-powered Orioles lineup alongside new addition Pete Alonso.",
  },
  {
    id: 10,
    name: "Luis Arraez",
    team: "San Francisco Giants",
    position: "2B",
    projectedStats: {
      battingAverage: 0.302,
      hits: 195,
      strikeouts: 35,
      OBP: 0.355,
    },
    notable: "Projected 2026 MLB Batting Average leader.",
  },
];

const { Navigator, Screen } = createNativeStackNavigator();

function PlayersScreen({ navigation }) {
  return (
    <>
      <FlatList
        data={MBL_PLAYERS}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text
            onPress={() => navigation.navigate("Details", { player: item })}
          >
            {item.name}
          </Text>
        )}
      />
    </>
  );
}

function DetailsScreen({ route }) {
  const {
    player: { projectedStats },
  } = route.params;

  return (
    <>
      {Object.keys(projectedStats).map((key) => (
        <Text key={key}>
          {key}: {projectedStats[key]}
        </Text>
      ))}
    </>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen name="Players" component={PlayersScreen} />
        <Screen name="Details" component={DetailsScreen} />
      </Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
