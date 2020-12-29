import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import Constants from 'expo-constants';
import { Header } from 'react-native-elements';
import dictionary from './database';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      isSearchPressed: false,
      isLoading: false,
      word: '',
      lexicalCategory: '',
      definition: '',
    };
  }

  getWord = (word) => {
    var text = word.toLowerCase();
    try {
      var letters = dictionary[word]['word'];
      var lexicalCategory = dictionary[word]['lexicalCategory'];
      var definition = dictionary[word]['definition'];
      this.setState({
        word: letters,
        lexicalCategory: lexicalCategory,
        definition: definition,
      });
    } catch (err) {
      alert('Sorry, The word ' + "{" + word + "}" + ' does not exist in our dictionary yet.');
      this.setState({
        text: '',
        isSearchPressed: false,
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          centerComponent={{
            text: 'Pocket Dictionary',
            style: { color: 'white', fontSize: 20, fontWeight: 'bold' },
          }}
          backgroundColor={'purple'}
        />

        <Image style={styles.imageLogo} source={require('./assets/Logo.png')} />

        <TextInput
          style={styles.inputBox}
          placeholder="Search a Word"
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              this.setState({
                isSearchPressed: true,
              });

              this.getWord(this.state.text.toLowerCase().trim());
            }
          }}
          onChangeText={(text) => {
            this.setState({
              text: text,
              isSearchPressed: false,
              word: 'loading...',
              lexicalCategory: 'loading...',
              examples: [],
              definition: 'loading...',
            });
          }}
          value={this.state.text}
        />

        <TouchableOpacity
          style={{
            alignSelf: 'center',
            backgroundColor: 'black',
            marginTop: 10,
            width: 100,
            height: 30,
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            this.setState({
              isSearchPressed: true,
            });

            this.getWord(this.state.text.toLowerCase().trim());
          }}>
          <Text style={{ color: 'white' }}>Search</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          <Text style={styles.typeText}>Word : {''}</Text>
          <Text style={styles.answerText}>{this.state.word}</Text>
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          <Text style={styles.typeText}>Type : {''}</Text>
          <Text style={styles.answerText}>{this.state.lexicalCategory}</Text>
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          <Text style={styles.typeText}>Defination : {''}</Text>
          <Text style={styles.answerText}>{this.state.definition}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  inputBox: {
    marginTop: 25,
    width: 200,
    borderWidth: 4,
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderRadius: 10,
    fontWeight: 'bold',
  },

  typeText: {
    color: '#007CB8',
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 5,
  },

  answerText: {
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 5,
  },

  imageLogo: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
});
