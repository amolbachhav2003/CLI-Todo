const fs = require('fs');
const filepath = "./tasks.json";

const loadTasks = () => {
    try {
        const dataBuffer = fs.readFileSync(filepath);   //buffer format
        const dataJSON = dataBuffer.toString();   //json format
        return JSON.parse(dataJSON);    //string format
    } catch (error) {
        return []; 
    }
}

const saveTasks = (tasks) => {
    const dataJSON = JSON.stringify(tasks);
    fs.writeFileSync(filepath, dataJSON);
}

const addTask = (task) => {
    const tasks = loadTasks();
    tasks.push({ task });
    saveTasks(tasks);
    console.log("Task added", task);
}

const listTasks = () => {
    const tasks = loadTasks();
    tasks.forEach((task, index) => {
        console.log(`${index + 1} - ${task.task}`);
    });
}

const removeTask = (index) => {
    const tasks = loadTasks();
    if(index > 0 && index <= tasks.length) {
        tasks.splice(index - 1, 1);
        saveTasks(tasks);
        console.log(`Task ${index} removed`);
        listTasks();
    } else {
        console.log(`Invalid task number`);
    }
}

const command = process.argv[2]; // here 2 refers to command which will be provided from terminal
const argument = process.argv[3]; // here 3 refers to argument which will be provided from terminal

if(command === "add") {
    addTask(argument);
} else if(command === "list") {
    listTasks();
} else if(command === "remove") {
    removeTask(parseInt(argument));
} else {
    console.log("command not found");
}