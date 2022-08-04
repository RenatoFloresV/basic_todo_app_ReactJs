import userEvent from "@testing-library/user-event";
import React, { Fragment, useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { TodoList } from "./components/TodoList";

const KEY = "todoApp.todos";

export function App() {
    const [todos, setTodos] = useState([
        {
            id: 1,
            task: "Task 1",
            completed: false
        },
    ]);

    const todoTaskRef = useRef();

    //Traer los datos de localStorage
    useEffect(() => {
        const storageTodos = JSON.parse(localStorage.getItem(KEY));
        if (storageTodos) {
            setTodos(storageTodos);
        }
    }, []);

    //Añaadir un nuevo todo
    useEffect(() => {
        localStorage.setItem(KEY, JSON.stringify(todos));
    }, [todos]);

    //
    const toggleTodo = (id) => {
        const newTodos = [...todos];
        const todo = newTodos.find((t) => t.id === id);
        todo.completed = !todo.completed;
        setTodos(newTodos);
    }

    //Añadir un nuevo todo
    const handleTodoAdd = () => {
        const task = todoTaskRef.current.value;
        if (task === "") return;

        setTodos((prevTodos) => {
            return [...prevTodos, { id: uuidv4(), task, completed: false }];
        });
        todoTaskRef.current.value = "";
    }

    //Eliminar un todo completado
    const handleTodoDelete = () => {
        setTodos((prevTodos) => {
            return prevTodos.filter((todo) => !todo.completed);
        });
    }
    return (
        <Fragment>
            <center>
                <h1>Todo List</h1>
                <TodoList todos={todos} toggleTodo={toggleTodo} />
                <input ref={todoTaskRef} type="text" placeholder="New task" />
                <button onClick={handleTodoAdd}>Add</button>
                <button onClick={handleTodoDelete}> Delete</button>
                <div>You have {todos.filter((todo) => !todo.completed).length} tasks for complete</div>
            </center>
        </Fragment>
    );
}
