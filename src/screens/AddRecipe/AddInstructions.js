import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { isEmpty } from 'lodash';

import PageHeader from '../../components/PageHeader';
import { ACCENT, BACKGROUND, CHECK, DARK_TEXT, GREY, LIGHT_TEXT } from '../../utils/colors';

class AddIngredients extends Component {

  constructor(props){
    super(props);
    this.state = {
      textInput : [],
      inputData : [],
      instructions: this.props.route.params.instructions
    }
  }

  componentDidMount() {
      if(!isEmpty(this.state.instructions)){
        this.state.instructions.map(item => {
            this.addTextInput(item.length, item.text)
        })
        this.setState({inputData: this.state.instructions})
      }
  }

  //function to add TextInput dynamically
  addTextInput = (index, value) => {
    let textInput = this.state.textInput;
    textInput.push(
        <>
                <View style={styles.inputContainer}>
                    <TextInput
                    value={value}
                        style={styles.input}
                        onChangeText={(text) => this.addValues(text, index)}
                        placeholderTextColor={GREY}
                    />
                    <TouchableOpacity activeOpacity={1} onPress={() => this.removeTextInput()} style={styles.buttonContainer} >
                        <Entypo name="minus" size={20} color={LIGHT_TEXT} />
                    </TouchableOpacity>
                </View>
                <View style={styles.divider} />
            </>
    )
    this.setState({ textInput });
  }

  //function to remove TextInput dynamically
  removeTextInput = () => {
    let textInput = this.state.textInput;
    let inputData = this.state.inputData;
    textInput.pop();
    inputData.pop();
    this.setState({ textInput,inputData });
  }

  //function to add text from TextInputs into single array
  addValues = (text, index) => {
    let dataArray = this.state.inputData;
    let checkBool = false;
    if (dataArray.length !== 0){
      dataArray.forEach(element => {
        if (element.index === index ){
          element.text = text;
          checkBool = true;
        }
      });
    }
    if (checkBool){
        this.setState({
        inputData: dataArray
        });
    }
    else {
        dataArray.push({'text':text,'index':index});
        this.setState({
        inputData: dataArray
        });
    }
  }

  //function to console the output
  getValues = () => {
    this.props.route.params.setInstructions(this.state.inputData)
    this.props.navigation.goBack()
  }


  render(){
    return(
        <>
            <ScrollView style={{flex: 1, backgroundColor: BACKGROUND}}>
                <PageHeader title="ingredients" navigation={this.props.navigation} />

                <TouchableOpacity activeOpacity={1} onPress={() => this.getValues()} style={{position: 'absolute', top: 20, right: 20}} >
                    <Entypo name="check" size={25} color={CHECK} />
                </TouchableOpacity>
                
                    <View style={{marginTop: 20}}>
                        {this.state.textInput.map((value) => {
                            return value
                        })}
                    </View>

                    <TouchableOpacity activeOpacity={1} onPress={() => this.addTextInput(this.state.textInput.length)} style={[styles.buttonContainer, styles.addButton]} >
                        <Entypo name="plus" size={25} color={LIGHT_TEXT} />
                    </TouchableOpacity>

            </ScrollView>
        </>
    )
  }
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: LIGHT_TEXT,
    },
    input: {
        color: DARK_TEXT,
        flex: 1,
    },
    buttonContainer: {
        width: 30,
        height: 30,
        borderRadius: 30,
        backgroundColor: ACCENT,
        justifyContent: 'center',
        alignItems: 'center'
    },
    divider: {
        height: 1,
        backgroundColor: GREY,
        width: '100%'
    },
    addButton: {
        marginTop: 20,
        marginRight: 20,
        alignSelf: 'flex-end',
        width: 40,
        height: 40,
        borderRadius: 30,
    }
});

export default AddIngredients;