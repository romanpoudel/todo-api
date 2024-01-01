import { User } from "../types/user";

const users: User[] = [
  {
    id: 1,
    username: "rohan",
    email: "rohan@gmail.com",
    password: "123456",
    refreshToken: "",
  },
  {
    id: 2,
    username: "roshan",
    email: "roshan@gmail.com",
    password: "123456",
    refreshToken: "",
  },
  {
    id: 3,
    username: "sita",
    email: "sita@gmail.com",
    password: "123456",
    refreshToken: "",
  },
];

export const getUsers = () => {
  return users;
};

export const addUser = (user: User) => {
  users.push(user);
};

export const getUserById = (id: number) => {
  const user = users.find(({ id: userId }) => userId === id);

  return user;
};
