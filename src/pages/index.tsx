import { useEffect, useState } from 'react';

interface DataItem {
  id: number;
}

// React Hooks
// function useFetch<T extends DataItem>(url: string) {
const useFetch = <T extends DataItem>(url: string) => {
  const [data, setData] = useState<T[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(url);
      const data = await (res.json() as Promise<T[]>);

      setData(data);
    };

    fetchData();
  }, [url]);

  return data;
};

interface User {
  id: number;
  name: string;
}

const User = () => {
  const url = 'https://jsonplaceholder.typicode.com/users';
  const users = useFetch<User>(url);

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};

interface Todo {
  id: number;
  title: string;
}

const Todo = () => {
  const url = 'https://jsonplaceholder.typicode.com/todos';
  const todos = useFetch<Todo>(url);

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
};

const IndexPage = () => {
  return (
    <>
      <User></User>
      <br />
      <Todo></Todo>
    </>
  );
};

export default IndexPage;
