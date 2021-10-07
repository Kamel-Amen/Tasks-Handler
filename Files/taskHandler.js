/* Start Variables */
var taskName = document.getElementById('task-name');
var taskDuration = document.getElementById('task-duration');
var tasksOutput = document.querySelector('.tasks-output');
var tasks = [];
var newTaskObj = {}, z = 4, value = 0, final = 0, remainTimerSpace = 100;
var timeOnload = new Date().getTime();
var interval, audio, taskParent, pauseIdentifier = false;
/* End Variables */

window.onload = displayingTasks();

// 'ADD' Button Click Event and Creating Task Object
document.querySelector('.add').addEventListener('click', () => {
    if (taskName.value === '' || taskDuration === '') {
        alert('Please Fill all the required fields !');
    } else {
        newTaskObj = {
            tName: taskName.value,
            tDuration: taskDuration.value,
            id: 'task' + z
        };
        z++;
        tasks.push(newTaskObj);
        taskName.value = '';
        taskDuration.value = '';
        alert('Task has been added successfully :)');
        displayingTasks();
    }
});

document.querySelector('.pause').addEventListener('click', () => {
    if (!pauseIdentifier) {
        document.querySelector('.pause').innerHTML = 'Resume';
        clearInterval(interval);
        pauseIdentifier = true;
        taskParent.classList.remove('active');
    } else {
        document.querySelector('.pause').innerHTML = 'Pause';
        setTimerInterval(globalEventTask);
        pauseIdentifier = false;
        taskParent.classList.add('active');
    }
});

function displayingTasks() {
    document.querySelector('.pause').disabled = true;
    tasksOutput.innerHTML = '';
    for (let x = 0; x < tasks.length; x++) {
        tasksOutput.innerHTML += '<div id="task' + x + '" class="row m-0 mb-2 task"><p class="col-6 pt-3">' + tasks[x].tName + '</p><button class="btn btn-dark col-3" onclick="startTaskTimer(this);">Start</button><button class="btn btn-danger col-3" onclick="deleteTask(this);">Delete</button></div>';
    }
}

function startTaskTimer(e) {
    taskParent = e.parentNode.childNodes[0];
    taskParent.classList.add('active');
    alert(taskParent.innerText + ' Task has been initialized !');
    e.innerHTML = 'Reset';
    document.querySelector('.pause').disabled = false;
    setTimerDefault();
    globalEventTask = e;
    document.querySelector('.task-header').innerText = taskParent.innerText;
    setTimerInterval(globalEventTask);
}

function setTimerInterval(e) {
    let duration = (tasks[findIndex(e)].tDuration * 60);
    if (pauseIdentifier) {
        remainTimerSpace = 100;
    }

    const timerRatio = remainTimerSpace / duration;
    interval = setInterval(() => {
        duration--;
        value += timerRatio;
        final = remainTimerSpace - value;
        document.querySelector('.progressBar > span').style.bottom = '-' + final + '%';
        checkFinal(e);
        //console.log(remainTimerSpace, final, timerRatio, value, duration);
    }, 1000);
}

function deleteTask(e) {
    //taskParent.classList.remove('active');
    tasks.splice(findIndex(e), 1);
    setTimerDefault();
    displayingTasks();
}

function findIndex(e) {
    let holder = e.parentNode.id;
    let taskIndex = 0;
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id == holder) {
            taskIndex = i;
        }
    }
    return taskIndex;
}

function checkFinal(e) {
    if (final <= 0) {
        document.querySelector('.progressBar > span').style.bottom = '0';
        audio = document.createElement('audio');
        audio.src = 'Sounds/RingTone.m4a';
        audio.autoplay = true;
        document.querySelector('.tasks').appendChild(audio);
        deleteTask(e);
    }
}

function setTimerDefault() {
    clearInterval(interval);
    value = 0;
    final = 0;
    document.querySelector('.progressBar > span').style.bottom = '-100%';
    document.querySelector('.task-header').innerText = 'Choose New Task';
}

/* Start Footer */
let footerDate = new Date();
document.getElementById('year').innerText = footerDate.getFullYear();
/* End Footer */
