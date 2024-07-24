// script.js

import { db } from './firebase-config.js';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';

const taskList = document.getElementById('task-list');

async function addTask() {
  const taskInput = document.getElementById('task');
  const taskText = taskInput.value.trim();

  if (taskText) {
    try {
      const docRef = await addDoc(collection(db, 'tasks'), {
        task: taskText
      });

      const listItem = document.createElement('li');
      listItem.id = docRef.id;
      listItem.innerHTML = `${taskText} <button onclick="removeTask('${docRef.id}')">Delete</button>`;
      taskList.appendChild(listItem);

      taskInput.value = '';
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  }
}

async function loadTasks() {
  try {
    const querySnapshot = await getDocs(collection(db, 'tasks'));
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const listItem = document.createElement('li');
      listItem.id = doc.id;
      listItem.innerHTML = `${data.task} <button onclick="removeTask('${doc.id}')">Delete</button>`;
      taskList.appendChild(listItem);
    });
  } catch (error) {
    console.error('Error loading tasks: ', error);
  }
}

async function removeTask(taskId) {
  try {
    await deleteDoc(doc(db, 'tasks', taskId));
    document.getElementById(taskId).remove();
  } catch (error) {
    console.error('Error removing document: ', error);
  }
}

// Expose functions globally
window.addTask = addTask;
window.removeTask = removeTask;

window.onload = loadTasks;
