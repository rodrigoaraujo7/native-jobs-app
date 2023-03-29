// react
import { useState } from "react";
import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// expo-router
import { useRouter } from "expo-router";

// styles
import styles from "./welcome.style";

// assets
import { icons, SIZES } from "../../../constants";

// data
const jobTypes = ["Full-time", "Part-time", "Contractor"];

const Welcome = ({ profileName, searchTerm, setSearchTerm, handleClick }) => {
  const router = useRouter();

  // declaring a useState to define a exclusive style for a 'Full-time'
  const [activeJobType, setActiveJobType] = useState("Full-time");

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello {profileName}</Text>
        <Text style={styles.welcomeMessage}>Find your perfect job</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput // -> like a input text on html
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
            placeholder="What are you looking for?"
          />
        </View>

        <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
          <Image
            source={icons.search}
            resizeMode="contain"
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <FlatList // -> like a .map() on reactjs
          data={jobTypes} // jobTypes is a array
          renderItem={({ item }) => (
            // here I render any component for each item
            <TouchableOpacity
              style={styles.tab(activeJobType, item)}
              onPress={() => {
                setActiveJobType(item); // focus on clicked job-type
                router.push(`/search/${item}`); // go to the clicked job-type
              }}
            >
              <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item} // key for each item
          contentContainerStyle={{ columnGap: SIZES.small }} // spacing at the items
          horizontal // list
          // (* NOTE -> FlatList have auto scroll *)
        />
      </View>
    </View>
  );
};

export default Welcome;
