/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  type ImageSourcePropType,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { Swiper, type SwiperCardRefType } from "rn-swiper-list";
import ActionButton from "../../components/ActionButton";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";

// const IMAGES: ImageSourcePropType[] = [
//   require("../../assets/images/test/1.png"),
//   require("../../assets/images/test/2.png"),
//   require("../../assets/images/test/3.png"),
//   require("../../assets/images/test/4.png"),
//   require("../../assets/images/test/5.png"),
// ];

const ICON_SIZE = 24;

const App = () => {
  const [permission, requestPermission] = MediaLibrary.usePermissions();
  const [IMAGES, setImages] = useState<ImageSourcePropType[]>([]);
  const [albums, setAlbums] = useState<MediaLibrary.Album[]>([]);
  const [assets, setAssets] = useState<MediaLibrary.Asset>();
  const ref = useRef<SwiperCardRefType>(null);

  const loadImages = async () => {
    //const albums = await MediaLibrary.getAlbumsAsync();

    console.log("albuns ----------", albums)
    const assets = await MediaLibrary.getAssetsAsync({
      album: 'Recents',
      mediaType: 'photo',
      first: 50,
      sortBy: [[MediaLibrary.SortBy.creationTime, false]],
    });
    setImages(assets.assets);
  };


  async function getAlbums() {

    const fetchedAlbums = await MediaLibrary.getAlbumsAsync({
      includeSmartAlbums: true,
    });
    console.log("get albums &&&&&&", fetchedAlbums.length)
    setAlbums(fetchedAlbums);
  }

  useEffect(() => {
    if (permission?.status !== "granted") {
      console.log("requesting permission");
      requestPermission();
    } else {
      console.log("getting gallery images");
      getAlbums()
      //loadImages();
    }
  }, [permission]);

  useEffect(() => {
    const fetchAlbumAssets = async () => {
      let asit: ImageSourcePropType[] = []

      for (const [i, album] of albums.entries()) {
        const x = await getAlbumAssets(album)
        asit = [...asit, ...x]
      }

      asit.forEach(item => {
        setImages(prev => [...prev, item])
      })
    }

    fetchAlbumAssets()
  }, [albums])

  async function getAlbumAssets(album: MediaLibrary.Album) {
    const albumAssets = await MediaLibrary.getAssetsAsync({
      album: album.id
    })

    const assetUris: ImageSourcePropType[] = []

    albumAssets.assets.forEach((image, i) => {
      assetUris.push(image)
    })

    return assetUris
  }

  const renderCard = useCallback((image: ImageSourcePropType) => {
    return (
      <View style={styles.renderCardContainer}>
        <Image
          source={image}
          style={styles.renderCardImage}
          resizeMode='cover'
        />
      </View>
    );
  }, []);
  const OverlayLabelRight = useCallback(() => {
    return (
      <View
        style={[
          styles.overlayLabelContainer,
          {
            backgroundColor: "green",
          },
        ]}
      />
    );
  }, []);
  const OverlayLabelLeft = useCallback(() => {
    return (
      <View
        style={[
          styles.overlayLabelContainer,
          {
            backgroundColor: "red",
          },
        ]}
      />
    );
  }, []);
  const OverlayLabelTop = useCallback(() => {
    return (
      <View
        style={[
          styles.overlayLabelContainer,
          {
            backgroundColor: "blue",
          },
        ]}
      />
    );
  }, []);
  const OverlayLabelBottom = useCallback(() => {
    return (
      <View
        style={[
          styles.overlayLabelContainer,
          {
            backgroundColor: "orange",
          },
        ]}
      />
    );
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.subContainer}>
        {IMAGES && (
          <Swiper
            ref={ref}
            cardStyle={styles.cardStyle}
            data={IMAGES}
            renderCard={renderCard}
            onIndexChange={(index) => {
              console.log("Current Active index", index);
            }}
            onSwipeRight={(cardIndex) => {
              console.log("cardIndex", cardIndex);
            }}
            onSwipedAll={() => {
              console.log("onSwipedAll");
            }}
            onSwipeLeft={(cardIndex) => {
              console.log("onSwipeLeft", cardIndex);
            }}
            onSwipeTop={(cardIndex) => {
              console.log("onSwipeTop", cardIndex);
            }}
            onSwipeBottom={(cardIndex) => {
              console.log("onSwipeBottom", cardIndex);
            }}
            OverlayLabelRight={OverlayLabelRight}
            OverlayLabelLeft={OverlayLabelLeft}
            OverlayLabelTop={OverlayLabelTop}
            OverlayLabelBottom={OverlayLabelBottom}
            onSwipeActive={() => {
              console.log("onSwipeActive");
            }}
            onSwipeStart={() => {
              console.log("onSwipeStart");
            }}
            onSwipeEnd={() => {
              console.log("onSwipeEnd");
            }}
          />
        )}
      </View>

      <View style={styles.buttonsContainer}>
        <ActionButton
          style={styles.button}
          onTap={() => {
            ref.current?.swipeBack();
          }}>
          <AntDesign name='reload1' size={ICON_SIZE} color='white' />
        </ActionButton>
        <ActionButton
          style={styles.button}
          onTap={() => {
            ref.current?.swipeLeft();
          }}>
          <AntDesign name='close' size={ICON_SIZE} color='white' />
        </ActionButton>
        <ActionButton
          style={styles.button}
          onTap={() => {
            ref.current?.swipeBottom();
          }}>
          <AntDesign name='arrowdown' size={ICON_SIZE} color='white' />
        </ActionButton>
        <ActionButton
          style={styles.button}
          onTap={() => {
            ref.current?.swipeTop();
          }}>
          <AntDesign name='arrowup' size={ICON_SIZE} color='white' />
        </ActionButton>
        <ActionButton
          style={styles.button}
          onTap={() => {
            ref.current?.swipeRight();
          }}>
          <AntDesign name='heart' size={ICON_SIZE} color='white' />
        </ActionButton>
      </View>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    bottom: 34,
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
  },
  button: {
    height: 50,
    borderRadius: 40,
    aspectRatio: 1,
    backgroundColor: "#3A3D45",
    elevation: 4,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  cardStyle: {
    width: "95%",
    height: "75%",
    borderRadius: 15,
    marginVertical: 20,
  },
  renderCardContainer: {
    flex: 1,
    borderRadius: 15,
    height: "75%",
    width: "100%",
    backgroundColor: "black"
  },
  renderCardImage: {
    height: "100%",
    width: "100%",
    borderRadius: 15,
  },
  subContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  overlayLabelContainer: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },
});
