import {Alert, Keyboard, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomInput from './components/CustomInput';
import {ScrollView} from 'react-native';
import {Icon} from '@rneui/themed';
import NoteListWithGestureHandler from './components/NoteCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DoIt = () => {
  const [newNote, setNewNote] = useState('');
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    async function loadNotes() {
      try {
        const storedList = await AsyncStorage.getItem('localNotes');
        if (storedList !== null) {
          setNotes(JSON.parse(storedList));
        }
      } catch (e) {
        console.error(e);
      }
    }
    loadNotes();
  }, []);

  const addTask = async () => {
    if (newNote) {
      const newNoteData = {id: new Date().getTime().toString(), note: newNote};
      const updatedNotes = [...notes, newNoteData];
      setNotes(updatedNotes);
      console.log(updatedNotes);
      try {
        await AsyncStorage.setItem('localNotes', JSON.stringify(updatedNotes));
        setNewNote('');
        Keyboard.dismiss();
      } catch (e) {
        console.error(e);
      }
    } else {
      Alert.alert('Champ vide', 'Veuillez saisir votre note');
    }
  };

  const deleteNote = id => {
    const filteredNotes = notes.filter(note => note.id !== id);
    setNotes(filteredNotes);
    AsyncStorage.setItem('localNotes', JSON.stringify(filteredNotes));
  };

  const onEditNote = (id, newText) => {
    const newNotes = notes.map(note => {
      if (note.id === id) {
        return {...note, note: newText};
      }
      return note;
    });
    setNotes(newNotes);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Do it</Text>

      <View style={styles.newNote}>
        <CustomInput
          nameOfInpute="Nouvelle note "
          value={newNote}
          onChangeText={setNewNote}
          secure={false}
        />
        <Icon
          raised
          name="post-add"
          type="material"
          size={30}
          onPress={addTask}
        />
      </View>
      <ScrollView keyboardShouldPersistTaps="handled" style={{padding: 16}}>
        {(() => {
          if (notes.length === 0) {
            return (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 16,
                    color: 'black',
                    padding: 20,
                  }}>
                  Vous n'avez aucune note pour l'instant
                </Text>
              </View>
            );
          }
        })()}
        <View
          style={{flexDirection: 'row', flexWrap: 'wrap', paddingBottom: 50}}>
          {notes.map(item => (
            <NoteListWithGestureHandler
              key={item.id}
              data={item}
              onDelete={() => deleteNote(item.id)}
              onEdit={(id, newText) => onEditNote(id, newText)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default DoIt;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'grey',
    height: '100%',
    width: '100%',
  },
  title: {
    fontSize: 25,
    color: 'black',
    textAlign: 'center',
    padding: 16,
    fontWeight: 'bold',
  },
  newNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
