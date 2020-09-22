import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { MaterialIcons } from "@expo/vector-icons";
import { CheckIcon, AddIcon } from "../common/Icons";
const { width, height } = Dimensions.get("window");
const imageWidth = width / 3 - 20;
const imageHeight = (width / 3 - 20) / 0.67;

const SearchResultItem = ({
  movie,
  saveMovie,
  deleteMovie,
  setOnDetailsPage,
}) => {
  const { navigate } = useNavigation();
  const navigateToDetails = () => {
    setOnDetailsPage(true);
    if (movie.existsInSaved) {
      navigate("DetailsFromSearch", { movieId: movie.id });
    } else {
      navigate("DetailsFromSearch", { movie });
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={navigateToDetails}>
        {movie.posterURL ? (
          <View
            style={{
              borderBottomColor: "black",
              borderBottomWidth: 0.5,
            }}
          >
            <Image
              source={{ url: movie.posterURL }}
              style={styles.image}
              PlaceholderContent={
                <MaterialIcons name="broken-image" size={64} />
              }
            />
          </View>
        ) : (
          <View style={[styles.image, styles.imageBackup]}>
            <Text style={styles.imageBackupText}>{movie.title}</Text>
          </View>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.7}
        style={{ flex: 1 }}
        onPress={() =>
          movie.existsInSaved ? deleteMovie(movie.id) : saveMovie(movie)
        }
      >
        <View
          style={[
            { flex: 1, alignItems: "center", justifyContent: "center" },
            movie.existsInSaved && styles.exists,
          ]}
        >
          <Text numberOfLines={1} style={styles.title}>
            {movie.title}
          </Text>
        </View>

        <View
          style={[styles.addMovieButton, movie.existsInSaved && styles.exists]}
        >
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            {movie.existsInSaved ? (
              <CheckIcon size={20} />
            ) : (
              <AddIcon size={20} />
            )}
          </View>
        </View>
      </TouchableOpacity>
      {/* <View
        style={[
          { flex: 1, alignItems: "center", justifyContent: "center" },
          movie.existsInSaved && styles.exists,
        ]}
      >
        <Text numberOfLines={1} style={styles.title}>
          {movie.title}
        </Text>
      </View>
      <TouchableOpacity
        style={[styles.addMovieButton, movie.existsInSaved && styles.exists]}
        onPress={() =>
          movie.existsInSaved ? deleteMovie(movie.id) : saveMovie(movie)
        }
      >
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          {movie.existsInSaved ? (
            <CheckIcon size={20} />
          ) : (
            <AddIcon size={20} />
          )}
        </View>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    width: imageWidth + 1,
    height: imageHeight + 25,
    margin: 5,
    borderColor: "black",
    borderWidth: 0.5,
    backgroundColor: "white",
  },
  image: {
    width: imageWidth,
    height: imageHeight,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  title: {
    fontSize: 14,
    paddingHorizontal: 5,
    overflow: "hidden",
  },
  addMovieButton: {
    width: imageWidth / 4,
    height: imageHeight / 7.5,
    backgroundColor: "white",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderColor: "black",
    borderWidth: 0.5,
    borderBottomWidth: 0.5,
    borderBottomColor: "white",
    position: "absolute",
    bottom: 23,
    left: imageWidth / 2 - imageWidth / 4 / 2,
  },
  exists: {
    backgroundColor: "lightgreen",
  },
  genreContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  genre: {
    padding: 2,
    marginHorizontal: 5,
    borderColor: "black",
    borderWidth: 1,
    fontSize: 12,
    backgroundColor: "#34495e44",
  },
  dateContainer: {
    marginBottom: 5,
  },
  dateText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  imageBackup: {
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "black",
    borderBottomWidth: 0.5,
  },
  imageBackupText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  existsInSaved: {
    borderColor: "green",
    backgroundColor: "lightgreen",
    borderWidth: 2,
  },
});

export default React.memo(SearchResultItem);
