// react
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// custom hooks
import useFecth from "../../../hook/useFetch";

// expo-router
import { useRouter } from "expo-router";

// styles
import styles from "./popularjobs.style";

// assets
import { COLORS, SIZES } from "../../../constants";

// components
import PopularJobCard from "../../common/cards/popular/PopularJobCard";

const Popularjobs = () => {
  const router = useRouter();

  const { data, isLoading, error } = useFecth("search", {
    query: "React developer",
    num_pages: 1,
  });

  // console.log(data);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          // this component is a loading spinning when isLoading is true
          // the style of spinning, is based on the OS of the cellphone
          <ActivityIndicator size="large" colors={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => <PopularJobCard item={item} />}
            keyExtractor={(item) => item?.job_id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
          />
        )}
      </View>
    </View>
  );
};

export default Popularjobs;
