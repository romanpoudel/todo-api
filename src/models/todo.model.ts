type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

const todos: Todo[]=[];

export const getTodos = () => {
  return todos;
};

export const addTodo = (todo: Todo) => {
  todos.push(todo);
};

export const getTodoById = (id: number) => {
  const todo = todos.find(({ id: todoId }) => todoId === id);

  return todo;
};

export const updateTodo = (id: number, todo: Todo) => {
  const index = todos.findIndex(({ id: todoId }) => todoId === id);

  todos[index] = todo;
};

export const deleteTodoById = (id: number) => {
  const index = todos.findIndex(({ id: todoId }) => todoId === id);

  todos.splice(index, 1);
};

export const deleteAllTodos = () => {
  todos.splice(0, todos.length);
};