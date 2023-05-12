import {StyleSheet, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {Icon} from '@rneui/themed';
import {TouchableOpacity} from 'react-native';

function CustomInput(props) {
  const [showEye, setshowEye] = useState(props.secure);
  const [isFocused, setisFocused] = useState(false);

  return (
    <View
      style={[
        styles.container,
        {borderColor: isFocused ? 'green' : 'white', borderWidth: 3},
      ]}>
      <TextInput
        placeholder={props.nameOfInpute}
        value={props.value}
        onChangeText={props.onChangeText}
        secureTextEntry={showEye}
        style={styles.inputText}
        placeholderTextColor={'black'}
        keyboardType={props.keyboardType}
        onFocus={() => {
          setisFocused(true);
        }}
        onBlur={() => {
          setisFocused(false);
        }}
      />

      {props.secure && (
        <TouchableOpacity style={{justifyContent: 'center'}}>
          <Icon
            name={showEye ? 'eye-off-outline' : 'eye-outline'}
            type="ionicon"
            size={25}
            onPress={() => {
              showEye ? setshowEye(false) : setshowEye(true);
            }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 5,
    marginVertical: 20,
    marginHorizontal: 10,
    width: '70%',
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  inputText: {
    flex: 1,
    color: 'black',
  },
});
