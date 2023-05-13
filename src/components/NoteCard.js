import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';
import {Dialog} from '@rneui/themed';
import {TextInput} from 'react-native';
import {DialogButton} from '@rneui/base/dist/Dialog/Dialog.Button';

const NoteList = props => {
  const [textValue, setTextValue] = useState(props.data.note);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const swipeableRef = useRef(null); // Définir la référence ici

  const renderLeftActions = (progress, dragX) => {
    return (
      <TouchableOpacity
        style={styles.edite}
        onPress={() => setIsDialogVisible(true)}>
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: 20,
            textAlign: 'center',
          }}>
          Modifier
        </Text>
      </TouchableOpacity>
    );
  };

  const renderRightActions = (progress, dragX) => {
    return (
      <TouchableOpacity
        style={styles.delete}
        onPress={() => props.onDelete(props.data.id)}>
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: 20,
            textAlign: 'center',
          }}>
          Supprimer
        </Text>
      </TouchableOpacity>
    );
  };

  const handleEditNote = () => {
    props.onEdit(props.data.id, textValue);
    setIsDialogVisible(false);
    setTimeout(() => {
      swipeableRef.current?.close();
    }, 100);
  };

  const handleCancelEdit = () => {
    setTextValue(props.data.note);
    setIsDialogVisible(false);
  };

  return (
    <Swipeable
      ref={swipeableRef}
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}
      overshootLeft={false}
      overshootRight={false}>
      <View style={styles.container}>
        <View>
          <Text style={styles.cardTitle}>{props.data.note}</Text>
          <Dialog isVisible={isDialogVisible}>
            <Text style={styles.titleInpute}>Modifier votre note</Text>
            <TextInput
              style={{
                backgroundColor: 'white',
                marginBottom: 10,
                backgroundColor: 'grey',
                borderRadius: 10,
              }}
              value={textValue}
              onChangeText={setTextValue}
            />
            <View style={{flexDirection: 'row-reverse'}}>
              <DialogButton
                onPress={handleEditNote}
                titleStyle={{color: 'green'}}>
                Valider
              </DialogButton>
              <DialogButton
                onPress={handleCancelEdit}
                titleStyle={{color: 'red'}}>
                Annuler
              </DialogButton>
            </View>
          </Dialog>
        </View>
      </View>
    </Swipeable>
  );
};

const NoteListWithGestureHandler = props => {
  return (
    <GestureHandlerRootView style={styles.card}>
      <NoteList {...props} />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginVertical: 10,
    width: '100%',
    borderRadius: 10,
    backgroundColor: 'black',
  },
  card: {
    width: '100%',
  },
  cardTitle: {
    fontSize: 20,
    marginBottom: 10,
    color: 'white',
  },
  delete: {
    justifyContent: 'center',
    backgroundColor: 'red',
    padding: 20,
    marginVertical: 10,
    width: '100%',
    borderRadius: 10,
  },
  edite: {
    justifyContent: 'center',
    backgroundColor: 'blue',
    padding: 20,
    marginVertical: 10,
    width: '100%',
    borderRadius: 10,
  },
  titleInpute: {
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    paddingVertical: 10,
  },
});

export default NoteListWithGestureHandler;
