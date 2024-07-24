import { db } from './firebase-config.js';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';

const taskList = document.getElementById('task-list');

async function addTask() {
  const taskInput = document.getElementById('task');
  const taskText = taskInput.value.trim();
  const priority = document.getElementById('priority').value;
  const assignee = document.getElementById('assignee').value;
  const dueDate = document.getElementById('due-date').value;
  const creator = document.getElementById('creator').value.trim();

  if (taskText && creator) {
    try {
      const docRef = await addDoc(collection(db, 'tasks'), {
        task: taskText,
        priority: priority,
        assignee: assignee,
        dueDate: dueDate,
        creator: creator,
      });

      const listItem = document.createElement('li');
      listItem.id = docRef.id;
      listItem.innerHTML = `
        <div class="task-content">
          <span class="priority-dot ${priority}"></span>
          <span class="task-details">
            <strong>${taskText}</strong>
            <br>
            <em>Data Limite: ${dueDate} | Tarefa Para: ${assignee} | Criada por: ${creator}</em>
          </span>
        </div>
        <button onclick="removeTask('${docRef.id}')">Delete</button>
      `;
      taskList.appendChild(listItem);

      taskInput.value = '';
      document.getElementById('due-date').value = '';
      document.getElementById('creator').value = '';
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
      listItem.innerHTML = `
        <div class="task-content">
          <span class="priority-dot ${data.priority}"></span>
          <span class="task-details">
            <strong>${data.task}</strong>
            <br>
            <em>Data Limite: ${data.dueDate} | Tarefa para: ${data.assignee} | Criado por: ${data.creator}</em>
          </span>
        </div>
        <button onclick="removeTask('${doc.id}')">Delete</button>
      `;
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
