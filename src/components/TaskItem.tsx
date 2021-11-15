import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/icons/pencil/pencil.png'
import Icon from 'react-native-vector-icons/Feather';

interface TaskItemProps {
  index: number;
  item: {
    id: number;
    title: string;
    done: boolean;
  }
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (taskId: number, taskNewTitle: string) => void;
}

export function TaskItem({ index, item, toggleTaskDone, removeTask, editTask }: TaskItemProps) {
 const [isEditing, setIsEditing] = useState(false);
 const [currentTitle, setCurrentTitle] = useState(item.title);
 const textInputRef = useRef<TextInput>(null);

 function handleStartEditing() {
   setIsEditing(true);
 }

 function handleCancelEditing() {
   setIsEditing(false);
   setCurrentTitle(item.title);
 }

 function handleSubmitEditing() {
  editTask(item.id, currentTitle);
  setIsEditing(false);
 }

 useEffect(() => {
  if (textInputRef.current) {
    if (isEditing) {
      textInputRef.current.focus();
    } else {
      textInputRef.current.blur();
    }
  }
 }, [isEditing])

  return (
    <>
            <View >
              <TouchableOpacity
                testID={`button-${index}`}
                activeOpacity={0.7}
                style={styles.taskButton}
                onPress={() => toggleTaskDone(item.id)}
              >
                <View 
                  testID={`marker-${index}`}
                  style={item.done ? styles.taskMarkerDone : styles.taskMarker}
                >
                  { item.done && (
                    <Icon 
                      name="check"
                      size={12}
                      color="#FFF"
                    />
                  )}
                </View>

                <TextInput
                  value={currentTitle}
                  onChangeText={setCurrentTitle}
                  editable={isEditing}
                  onSubmitEditing={handleSubmitEditing}
                  style={item.done ? styles.taskTextDone : styles.taskText}
                  ref={textInputRef}
               />
                 
              </TouchableOpacity>
            </View>

            <View style={ styles.iconsContainer } >
              { isEditing ? (
                <TouchableOpacity
                  onPress={handleCancelEditing}
                >
                  <Icon name="x" size={24} color="#b2b2b2" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={handleStartEditing}
                >
                  <Image source={editIcon} />
                </TouchableOpacity>
              ) }

              <View 
                style={ styles.iconsDivider }
              />

              <TouchableOpacity
                disabled={isEditing}
                onPress={() => removeTask(item.id)}
              >
                <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
              </TouchableOpacity>
          </View>

            
      </>
         
  )
}

const styles = StyleSheet.create({
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },  
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 4,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconsDivider: {
    width: 1,
    height: 20,
    backgroundColor: 'rgba(196, 196, 196, 0.24)',

  },
  iconsContainer: {
    flexDirection: 'row',
    width: 90,
    justifyContent: 'space-between',
    paddingRight: 24,
  }
});