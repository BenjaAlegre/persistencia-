const database = [
  {
    id: 1,
    nombre: "Eugenio",
    edad: 25,
  },
  {
    id: 2,
    nombre: "Aurelio",
    edad: 30,
  },
  {
    id: 3,
    nombre: "Patricio",
    edad: 35,
  },
];

export const getUsers = () => database;

export const saveUser = (user) => {
  database.push(user);
};

export const getUserById = (userId) =>
  database.find((user) => user.id == userId);

export const updateUserById = (id, data) => {
  let pos = database.findIndex((user) => user.id == id);
  database[pos] = data;
};

export const patchInfo = (id, data) => {
  let pos = database.findIndex((user) => user.id == id);
  database[pos] = { ...database[pos], ...data };
};

export const deleteUser = (id) => {
  let pos = database.findIndex((user) => user.id == id);
  database.splice(pos, 1);
};
