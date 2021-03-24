import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './components/header';
import AddTodo from './components/addTodo';
import Item from './components/item';
import ModalOptions from './components/modalOptions';
import ModalEdit from './components/modalEdit';
import ModalQuestion from './components/modalQuestion';
import ModalAlert from './components/modalAlert';

let startFlag = true;

export default function App() {

  const [todos, setTodos] = useState([]);
  const [modalTask, setModalTask] = useState({task: '', id: 0, isDone: false});
  const [modalOptVis, setModalOptVis] = useState(false);
  const [modalEditVis, setModalEditVis] = useState(false);
  const [modalDiscardVis, setModalDiscardVis] = useState(false);
  const [modalDelVis, setModalDelVis] = useState(false);
  const [modalAlertVis, setModalAlertVis] = useState(false);
  const [alertEdit, setAlertEdit] = useState(false);
  const [modalDraftFlag, setModalDraftFlag] = useState(false);

  const getAsyncData = async () => {
    try {
      const savedTodos = JSON.parse(await AsyncStorage.getItem('todos'));
      if(Array.isArray(savedTodos)) {
        setTodos(savedTodos);
      }
      //console.log(todos);
    } catch(e) {
      console.log(e);
    }
  }

  const setAsyncData = async () => {
    try {
      AsyncStorage.setItem('todos', JSON.stringify(todos));
    } catch(e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if(startFlag) {
      getAsyncData();
      //console.log('1');
    }
  }, [])

  useEffect(() => {
    if(startFlag) {
      startFlag = false;
      //console.log('2');
    } else {
      setAsyncData();
      //console.log('3');
    }
  }, [todos])

  return (
    <View
      style={styles.container} 
    >
      <StatusBar
        animated={true}
        backgroundColor="black"
        style="light"
      />
      <ModalAlert
        isVisible={modalAlertVis}
        onPress={async () => {
          setModalAlertVis(false);
          if(alertEdit) {
            setTimeout(() => {
              setModalEditVis(true);
              setModalDraftFlag(!modalDraftFlag);
              setAlertEdit(false);
            }, 300)
          }
          console.log(await AsyncStorage.getItem('todos'));
        }}
        text="Enter a valid task name!"
      />
      <ModalQuestion
        isVisible={modalDiscardVis}
        onPressNo={() => {
          setModalDiscardVis(false);
          setTimeout(() => {
            setModalEditVis(true);
          }, 300)
        }}
        onPressYes={() => {
          setModalDiscardVis(false);
          setModalDraftFlag(!modalDraftFlag);
        }}
        question='Do you want to discard all your changes?'
      />
      <ModalQuestion
        isVisible={modalDelVis}
        onPressNo={() => {
          setModalDelVis(false);
        }}
        onPressYes={() => {
          const index = todos.findIndex(({id}) => id === modalTask.id);

          todos.splice(index, 1);
          const newTodos = [...todos];
          newTodos.forEach(item => {
              if((item.id - 1) >= index) {
                  item.id = item.id - 1;
              }
          });
          setTodos(newTodos);

          setModalDelVis(false);
        }}
        question='Do you want to delete this task?'
      />
      <ModalOptions
        isVisible={modalOptVis}
        task={modalTask}
        close={() => {setModalOptVis(false)}}
        openEdit={() => setModalEditVis(true)}
        openDelete={() => {setModalDelVis(true)}}
        //modalTask={(task, id) => {setModalTask({task, id}); setModalEditVis(true);}}
      ></ModalOptions>
      <ModalEdit
          task={modalTask}
          isVisible={modalEditVis}
          //task={modalTask}
          close={() => {setModalEditVis(false)}}
          onChange={(task, sentId) => {
            const index = todos.findIndex(({id}) => id === sentId);
            todos[index].task = task;
            const newTodos = [...todos];
            setTodos(newTodos);
          }}
          openDiscard={() => {
            setModalDiscardVis(true);
          }}
          alert={() => {setModalAlertVis(true); setAlertEdit(true);}}
          draftFlag={modalDraftFlag}
      ></ModalEdit>
      <FlatList
        data={todos}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <Item
            task={item.task}
            isDone={item.isDone}
            id={item.id}
            modalTask={(task, id, isDone) => {setModalTask({task, id, isDone}); setModalOptVis(true)}}
            onChange={(checked) => {
              const index = todos.findIndex(({id}) => id === item.id);
              todos[index].isDone = checked;
              const newTodos = [...todos];
              setTodos(newTodos);
            }}
            all={todos.length}
          ></Item>
        )}
        ListHeaderComponent={() => (
          <View>
            <Header></Header>
            <AddTodo
              newTodo={(task) => {
                setTodos((prev) => [...prev, task]);
              }}
              alert={() => {setModalAlertVis(true)}}
              todos={todos}
            ></AddTodo>
          </View>
        )}
        ListFooterComponent={() => (
          <View>
            <View style={{
              backgroundColor: "#22c1c3",
              justifyContent: 'flex-end',
              alignItems: 'center',
              paddingTop: 10,
              paddingBottom: 10,
            }}>
              <Text style={{color: 'white', fontSize: 20}}>
                © Anton Rachkouski
              </Text>
            </View>
          </View>
        )}
        style={{width: '100%', flex: 1}}
        ListHeaderComponentStyle={{
          width: '100%',
          
        }}
        ListFooterComponentStyle={{
          width: '100%',
          flex: 1,
          justifyContent: 'flex-end'
        }}
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps={'handled'}
      >
      </FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: getStatusBarHeight()
  },
  text: {
    color: '#fff',
    fontSize: 32
  },
  statusBar: {
    color: 'white'
  },
  textInput: {
    borderColor: 'black',
    borderWidth: 1,
    borderStyle: 'solid',
    width: '90%',
    textAlignVertical: 'top',
    padding: 10,
    fontSize: 20,
    borderRadius: 8,
  },
  todos: {
    width: '90%',
    flex: 1
  }
});
