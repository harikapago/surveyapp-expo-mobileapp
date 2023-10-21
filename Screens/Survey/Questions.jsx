//Buttons Improvment RG sir Feedback
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,ImageBackground
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Audio } from "expo-av";

import Recorder from "./Recorder";
import VoiceRecorder from "./Recorder";
import Config from "../../core/config";
import LoadingIndicator from "../Components/LoadingIndicator";
import IconButton from "../Components/IconButton";
import RoundIcon from "../Components/RoundIcon";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const categories = [
  "Demographics",
  "Political Affiliation and Ideology",
  "Issues and Priorities",
  "Campaign Messaging",
  "Candidate Evaluation1",
  "Campaign Events and Interactions",
  "Trust and Transparency",
  "Voter Behaviour",
  "Candidate Evaluation2",
  "Key Issues",
  "Local Concerns and Solutions",
  "Open-Ended Question",
];

const generateUUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

// Usage
const uniqueID = generateUUID();

//   console.log(uniqueID);

const image = {uri: 'https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg'};

const Questions = ({ navigation, route }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  //   const [selectedLanguage, setSelectedLanguage] = useState("english"); // Default to English
  const [selectedCategory, setSelectedCategory] = useState("Demographics"); // Default to "Demographics"
  const [completedCategories, setCompletedCategories] = useState([]); // To track completed categories
  const { selectedLanguage } = route.params;
  const { agentId } = route.params;
  // const  email  = "myEmail"

  const [loading, setLoading] = useState(true);
  const [currentNumber, setCurrentNumber] = useState(1);
  const [play, setPlay] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);
 
  // Calculate the width of the horizontal bar based on the current number
  const barWidth = (currentNumber / 32) * 100;

  const handleButtonPress = () => {
    if (currentNumber < 32) {
      setCurrentNumber(currentNumber + 1);
    } else {
      setCurrentNumber(1);
    }
  };

  useEffect(() => {
    // Fetch questions from your API (use fetch or Axios in React Native)
    // Example using fetch:
    fetch("https://express-mongodb-survey-postapi.azurewebsites.net/fetch-all-questions")
      .then((response) => response.json())
      .then((data) => {
        // console.log('Fetched Data:', data);
        setQuestions(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

  const handleCategoryChange = (value) => {
    // Set the selected category and reset the current question index
    setSelectedCategory(value);
    setCurrentQuestionIndex(0);
  };

  const filteredQuestions = selectedCategory
    ? questions.filter((item) => item.category === selectedCategory)
    : [];


  const handleNextQuestion = () => {
    if (currentNumber < 32) {
      setCurrentNumber(currentNumber + 1);
    } else {
      setCurrentNumber(1);
    }
    if (currentQuestionIndex === filteredQuestions.length - 1) {
      // Move to the next category if there are no more questions in the current category
      const currentCategoryIndex = categories.indexOf(selectedCategory);
      const nextCategory = categories[currentCategoryIndex + 1];

      // Check if the next category is "Open-Ended Question"
      if (selectedCategory === "Open-Ended Question") {
        // Navigate to the "Thank You" screen
        navigation.navigate("ThankYou",{agentId});
      } else {
        setSelectedCategory(nextCategory);
        setCurrentQuestionIndex(0);
      }

      // Update completed categories
      if (!completedCategories.includes(selectedCategory)) {
        setCompletedCategories([...completedCategories, selectedCategory]);
      }
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
   
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex === 0) {
      // If at the beginning of the current category, go back to "Demographics"
      setSelectedCategory("Demographics");
    } else {
      // Otherwise, go back to the previous question
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleChangeLanguage = (value) => {
    setSelectedLanguage(value);
  };


// const playAudio = async (audioUrl) => {
//   const soundObject = new Audio.Sound();
  

//   if (sound) {
//     // If there's already a sound loaded, unload it first
//     await sound.unloadAsync();
//   }

//   const { sound: newSound } = await Audio.Sound.createAsync({ uri: audioUrl });
//   setSound(newSound);

//   setIsPlaying(true);

//   // Play the audio
//   await newSound.playAsync();

//   // Listen for updates on playback status
//   newSound.setOnPlaybackStatusUpdate((status) => {
//     if (status.didJustFinish) {
//       setIsPlaying(false);
//     }
//   });

//   setPlay(true)
//   try {
//     await soundObject.loadAsync({ uri: audioUrl });
//     await soundObject.playAsync();
//   } catch (error) {
//     console.error("Error playing audio:", error);
//   }
//   setPlay(false)
// };

const playAudio = async (audioUrl) => {
  // Create a new audio object
  const soundObject = new Audio.Sound();

  // Load the audio
  try {
    await soundObject.loadAsync({ uri: audioUrl });
  } catch (error) {
    console.error("Error loading audio:", error);
    return;
  }

  // Start playing the audio
  try {
    setIsPlaying(true); // Set isPlaying to true when audio starts playing
    await soundObject.playAsync();

    // Listen for updates on playback status
    soundObject.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) {
        setIsPlaying(false); // Set isPlaying to false when audio playback is complete
      }
    });
  } catch (error) {
    console.error("Error playing audio:", error);
    setIsPlaying(false); // Ensure isPlaying is set to false in case of an error
  }
};
  const isQuestionAvailable =
    filteredQuestions.length > 0 &&
    currentQuestionIndex < filteredQuestions.length;

  const isAllCategoriesCompleted =
    completedCategories.length === categories.length;

  return (
    <ScrollView style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <View style={styles.header}>
       
        <Text style={styles.label}>
          {selectedLanguage === "English"
            ? "Category"
            : "వర్గం"}
        </Text>
        <Text style={styles.presentCategory}>
          {selectedCategory}
        </Text>
      </View>

      {loading ? (
        <LoadingIndicator /> // Display the activity indicator while loading
      ) : (
        <View>
          

          <View style={styles.questionContainer}>
            {/* Display questions based on the selected category */}
            {isQuestionAvailable && (
              <View>
                <View>
                  <Text style={styles.questionNumber}>
                    {selectedLanguage === "English" ? "Question " : "ప్రశ్న "}
                    {currentQuestionIndex + 1}
                  </Text>
                  <View style={styles.questionTextContainer}>

                  {selectedLanguage === "English" ? (
           
                    <Text style={styles.questionText}>
                    
                      {
                        filteredQuestions[currentQuestionIndex]
                          .engquetxt
                      }
                    </Text>
                
                  ) : (
                 
                    <Text style={styles.questionText}>
                
                      {
                        filteredQuestions[currentQuestionIndex]
                          .telquetxt
                      }
                    </Text>
                 
                  )}
                   </View>
                </View>
             
                <View style={styles.playButton}>
                  <IconButton
                    //    style={styles.playButton}
                    name="play"
                    iconSize={24}
                    color="black"
                    titleColor="black"
                    backgroundColor="rgb(255, 200, 0)"
                    // backgroundColor="#429cc9"
                     title={
                      selectedLanguage === "English"
                        ? "Listen Question"
                        : "ప్రశ్న వినండి"
                    }
                    onPress={() =>
                      playAudio(
                        selectedLanguage === "English"
                          ? filteredQuestions[currentQuestionIndex].engrcdUrl
                          : filteredQuestions[currentQuestionIndex].telrcdUrl
                        // filteredQuestions[currentQuestionIndex].telrcd.data
                    
                        )
                       
                    }
                  />
                 
                 {isPlaying && (
  <Image
    source={{ uri: 'https://res.cloudinary.com/dyylqn8vb/image/upload/v1697877854/sound_y7do8w.gif' }}
    style={{ height: 30, width: 80, }} // Use numeric values without 'px'
  />
)}
                
                </View>
                <VoiceRecorder
                  category={selectedCategory}
                  props={currentQuestionIndex + 1}
                  selectedLanguage={selectedLanguage}
                  uqid={uniqueID}
                  email={agentId}
                
                />
              </View>
            )}

            {/* Display "Next" button when questions are available */}
            {isQuestionAvailable && (
              // <RoundIcon
              <View style={styles.nextButton}>
              <IconButton
                name="chevron-forward" // Icon name for a forward arrow
                // name="skip-next" // Icon name for a forward arrow
                color="black" // Icon color
                // backgroundColor="#dcdcdc" // Button background color
                backgroundColor="#007BFF"
                iconSize={24} // Icon size
                disabled={false} // Button state
                title={selectedLanguage === "English" ? "Next" : "తరువాయి"}
                onPress={handleNextQuestion}
                
              />
         </View>
            )}
             <View style={styles.progressContainer}>
           
            <View style={styles.horizontalBarStyle}>
              <View
                style={{ ...styles.progressBarStyle, width: `${barWidth}%` }}
              />
            </View>
          </View>
         
           
          </View>
        </View>
      )}
      </ImageBackground>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0.03 * screenWidth, // 3% of the screen width as padding
    backgroundColor: "lightblue",
    width: "100%",
    
  },
  header: {
    fontSize: 0.05 * screenWidth, // 5% of the screen width as font size
    fontWeight: "bold",
    marginBottom: 0.03 * screenHeight, // 3% of the screen height as margin
    color: "#333",
    textAlign: "center",
  },
  presentCategory: {
    fontSize: 0.04 * screenWidth, // 4% of the screen width as font size
    padding: 0.02 * screenWidth, // 2% of the screen width as padding
    borderRadius: 0.02 * screenWidth, // 2% of the screen width as border radius
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "lightblue",
    fontWeight:'500'
  },
  heading: {
    fontSize: 0.05 * screenWidth, // 5% of the screen width as font size
    fontWeight: "bold",
    // marginTop: 0.03 * screenHeight, // 3% of the screen height as margin
    marginBottom: 0.03 * screenHeight, // 3% of the screen height as margin
    color: "#333",
    textAlign: "center",
  },
  label: {
    fontSize: 0.04 * screenWidth, // 4% of the screen width as font size
    marginBottom: 0.015 * screenHeight, // 1.5% of the screen height as margin
    fontWeight:'bold',
    paddingHorizontal:10,
    letterSpacing:0.5,
    paddingTop:5
  },
  picker: {
    width: "100%",
    backgroundColor: "lightgray",
    // backgroundColor: "#FFF",
    borderRadius: 0.05 * screenWidth, // 5% of the screen width as border radius
  },
  
  
  questionNumber: {
    fontSize: 0.045 * screenWidth, // 4.5% of the screen width as font size
    fontWeight:'bold',
    marginBottom: 0.03 * screenHeight, // 3% of the screen height as margin
    color: "black",
    // color: "#666",
    textAlign: "center",
    padding:5
  },
  languagePickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    // marginTop: 0.015 * screenHeight, // 1.5% of the screen height as margin
  },
  languageLabel: {
    paddingRight: 0.02 * screenWidth, // 2% of the screen width as padding
    fontSize: 0.04 * screenWidth, // 4% of the screen width as font size
  },
  languagePicker: {
    flex: 1,
    borderRadius: 0.05 * screenWidth, // 5% of the screen width as border radius
  },
  questionTextContainer: {
    height: 0.20 * screenHeight,
    justifyContent: 'center', // Vertically center the content
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 0.02 * screenWidth,
    padding: 0.02 * screenWidth,
    shadowColor: 'blue',
    shadowOffset: { width: 0.05 * screenWidth, height: 0.05 * screenWidth },
    shadowOpacity: 1,
    shadowRadius: 0.05 * screenWidth,
    marginBottom: 0.035 * screenHeight,
  }
  ,
  questionText: {
    fontWeight: "400",
    fontSize: 0.045 * screenWidth,
    color: "#333",
    textAlign: "center",
    paddingBottom:10
   
  },
  
  
  nextButton: {
    // marginTop: 0.001 * screenHeight, // 0.1% of the screen height as margin top
    alignSelf: "center",
    width:'50%',
    
  },
  pickerContainer: {
    borderColor: "gray",
    borderWidth: 0.02 * screenWidth, // 2% of the screen width as border width
    padding: 0.005 * screenWidth, // 0.5% of the screen width as padding
  },
  containerStyle: {
    width: 0.8 * screenWidth, // 80% of the screen width
    textAlign: "center",
    backgroundColor: "#d5d8de",
    margin: 0.02 * screenWidth, // 2% of the screen width as margin
    padding: 0.02 * screenWidth, // 2% of the screen width as padding
  },
  textStyle: {
    fontSize: 0.012 * screenWidth, // 1.2% of the screen width as font size
  },
  
  progressContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: '100%',
    backgroundColor: "lightgray",
    borderRadius: 0.015 * screenHeight, // 1.5% of the screen height as border radius
    padding: 0.0001 * screenHeight, // 0.1% of the screen height as padding
  marginBottom:50
  },
  progressBarStyle: {
    backgroundColor: "#007BFF",
    height: 0.01 * screenHeight, // 0.1% of the screen height
  },
  horizontalBarStyle: {
    width: "90%",
    height: 0.01 * screenHeight, // 0.1% of the screen height
    backgroundColor: "#ccc",
    marginVertical: 0.01 * screenHeight, // 3% of the screen height as margin
  },
  playButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  soundAnim: {
    width: 0.2 * screenWidth, // 20% of the screen width
    height: 0.2 * screenWidth, // 20% of the screen width
  },
  soundAnimCont: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default Questions;
