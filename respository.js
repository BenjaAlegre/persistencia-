import fs from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "data.json");


export const getTasks = async () => {
    let file = JSON.parse(await fs.readFile(filePath));
    return file;
};

export const getTaskById = async (taskId) => {
    let file = JSON.parse(await fs.readFile(filePath));
    console.log(file);
 
    let task = file.find( task => task.id == taskId)
    return task
}

export const saveTask = async (body, newId) => {
    let file = JSON.parse(await fs.readFile(filePath));
    let newBody = {...body , "id": newId}
    console.log(newBody);    
    let newFile = [...file, newBody]
    console.log(newFile);
    await fs.writeFile(filePath, JSON.stringify(newFile));
}

export const updateTaskById = async(id, newData) => {
    let file = JSON.parse(await fs.readFile(filePath));
  
    let pos = file.findIndex((user) => user.id == id);
    file[pos] = {"id": id, ...newData};
    console.log(file);
    await fs.writeFile(filePath, JSON.stringify(file));
    return file[pos];
}
 
export const deleteTask = async(id)=> {
    let file = JSON.parse(await fs.readFile(filePath));
  
    let pos = file.findIndex((user) => user.id == id);
    file.splice(pos, 1);

    await fs.writeFile(filePath, JSON.stringify(file));
   
}

// export const saveUser = (user) => {
//   database.push(user);
// };

// export const getUserById = (userId) =>
//   database.find((user) => user.id == userId);

// export const updateUserById = (id, data) => {
//   let pos = database.findIndex((user) => user.id == id);
//   database[pos] = data;
// };

// export const patchInfo = (id, data) => {
//   let pos = database.findIndex((user) => user.id == id);
//   database[pos] = { ...database[pos], ...data };
// };

// export const deleteUser = (id) => {
//   let pos = database.findIndex((user) => user.id == id);
//   database.splice(pos, 1);
// };

