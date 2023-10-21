// Integrating New POST API Of Azure and  19/10/23
import React, { useState, useEffect } from 'react';
import { View, Text, Button,StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import IconButton from '../Components/IconButton';
import RoundIcon from '../Components/RoundIcon';
import MyButton from '../Components/MyButton';
import RoundTextButton from '../Components/RoundTextButton';

const VoiceRecorder = (props) => {
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [audioPlayer, setAudioPlayer] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [isSubmitted, setSubmitted] = useState(false);

  

  const questionNumber = props.props;
  const uqid = props.uqid;
  const selectedLanguage = props.selectedLanguage;
  const category = props.category;
  const email = props.email;
 
  const startRecording = async () => {
    setSubmitted(false)
    try {
      const { granted } = await Audio.requestPermissionsAsync();
      if (!granted) {
        console.error('Audio recording permission denied');
        return;
      }

      const newMediaRecorder = new Audio.Recording();
      await newMediaRecorder.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await newMediaRecorder.startAsync();

      setMediaRecorder(newMediaRecorder);
      setRecording(true);
    } catch (error) {
      console.error('Error initializing recorder:', error);
    }
  };

  const stopRecording = async () => {
    if (mediaRecorder) {
      await mediaRecorder.stopAndUnloadAsync();
      const audioBlob = mediaRecorder.getURI();

      setAudioBlob(audioBlob);
      setRecording(false);
    }
  };


  //Update playAudio Funtion to play the audio recoded
  const playAudio = async () => {
    if (audioBlob) {
      if (audioPlayer) {
        await audioPlayer.unloadAsync();
      }
  
      const newAudioPlayer = new Audio.Sound();
      await newAudioPlayer.loadAsync({ uri: audioBlob });
      await newAudioPlayer.playAsync();
  
      setAudioPlayer(newAudioPlayer);
    }
  };

  const submitAudio = async () => {
    if (audioBlob) {
      const fileName = `${uqid}_${category}_question${questionNumber}.wav`;
     
      try {
        const formData = new FormData();
        formData.append('audio', 
        {
              uri: audioBlob,
              name: 'audio.wav',
              type: 'audio/wav',
            }
        );
        formData.append('agent', email); // You can add other fields as needed
        formData.append('surveyId', uqid);
        formData.append('category', category);
        formData.append('questionNumber', questionNumber);

        const response = await fetch('https://express-mongodb-survey-postapi.azurewebsites.net/upload', {
          method: 'POST',
          body: formData,
        });
  

        if (response.status === 201) {
          const data = await response.json();
          console.log(data.message);
        } else {
          console.error('File upload failed.');
        }
      } catch (error) {
        console.error(error);
      }
      setSubmitted(true);

      
    } else {
      console.error('No audio to submit');
    }
  };

  useEffect(() => {
    if (audioPlayer) {
      audioPlayer.setOnPlaybackStatusUpdate(null);
    }
  }, [audioPlayer]);

  useEffect(() => {
    setRecording(false);
    setAudioBlob(null);
    setAudioUrl(null);
    setAudioPlayer(null);
  }, [questionNumber]);

  return (
    <View>
            <Text style={styles.recordAnswerHeading}>
       {/* Record Your Answers / సమాధానాన్ని రికార్డ్ చేయండి */}
       {selectedLanguage === 'English' ? 'Record Your Answers ' : 'సమాధానాన్ని రికార్డ్ చేయండి'}
    </Text>
      <View style={styles.buttonContainer}>
  {recording ? (
    <View style={styles.button}>
    <IconButton
      name='stop'
      // backgroundColor='#afeeee'
      backgroundColor='#ff4500'
      iconSize={24}
      title={selectedLanguage === 'English' ? 'Stop Recording' : 'రికార్డింగ్ ఆఫ్ చేయండి'}
      onPress={stopRecording}
     
      disabled={false}
    />
   </View>
  ) : (
   
   <View style={styles.button}>
    <IconButton
    name='mic'
    iconSize={24}
    color='black'
    titleColor="black"
    backgroundColor="rgb(255, 200, 0)"
    // backgroundColor='#afeeee'
    title={selectedLanguage === 'English' ? 'Start Recording' : 'రికార్డింగ్ ప్రారంభించండి'}
    onPress={startRecording}
    borderColor="red"
    disabled={false}
    />
    </View>
  )}
  
  <IconButton
  name="ios-checkmark-circle"
  iconSize={24}
    // text="SUBMIT" // Text to be displayed in place of an icon
    color="black" // Text color
    titleColor="black"
    // backgroundColor="#007BFF"
    title={(selectedLanguage === 'English' ? 'Submit' : 'సమర్పించండి')}
   backgroundColor='rgb(255, 200, 0)'
    onPress={submitAudio}
    // style={styles.SubButton}
    // disabled={!audioBlob}
    disabled={isSubmitted || !audioBlob} 
    borderColor="lightgray"
  />
  {/* </View> */}
  </View>
</View>

  );
};

export default VoiceRecorder;

const styles = StyleSheet.create({
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer:{
    // display: 'flex',
    // flexDirection: 'row', // Arrange the buttons in a row
    // justifyContent: "space-around", // Space them evenly in the row'
  },
  button: {
  //  justifyContent:'center',
  //  alignItems: "center",
  },
    recordAnswerHeading: {
    fontSize: 18,
    fontWeight: "bold",
    height:50,
    // marginBottom: 2,
    color: "#333", // Text color
    textAlign: "center",
    paddingTop: 5,
    paddingBottom:5
  },
  // SubButton:{
  // width:100
  // },
});