import {StyleSheet, Text, View} from 'react-native';
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
      } catch (e) {
        console.error(e);
      }
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
      <Text style={styles.title}>Do It Now</Text>

      <View style={styles.newNote}>
        <CustomInput
          nameOfInpute="Nouvelle note "
          value={newNote}
          onChangeText={setNewNote}
          secure={false}
        />
        <Icon raised name="bookmark" type="entypo" onPress={addTask} />
      </View>
      <ScrollView keyboardShouldPersistTaps="handled" style={{padding: 16}}>
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
