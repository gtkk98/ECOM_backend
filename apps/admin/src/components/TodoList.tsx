"use client";

import { FormEvent, useState } from "react";
import type { Todo } from "./adminTypes";
import Icon from "./Icon";
import Panel from "./Panel";

export default function TodoList({ todos, onToggle, onAdd }: {
  todos: Todo[];
  onToggle: (index: number) => void;
  onAdd: (text: string) => void;
}) {
  const [draft, setDraft] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (draft.trim()) {
      onAdd(draft.trim());
      setDraft("");
    }
  }
  return <Panel className="todo-panel">
    <div className="panel-heading"><div><h2>To-do list</h2><p>Keep your day on track.</p></div><button className="icon-button" aria-label="More task options"><Icon name="dots" /></button></div>
    <form className="todo-add" onSubmit={submit}><input aria-label="New task" placeholder="Add a task..." value={draft} onChange={(event) => setDraft(event.target.value)} /><button aria-label="Add task" type="submit"><Icon name="plus" size={16} /></button></form>
    <ul className="todo-list">{todos.map((todo, index) => <li key={`${todo.text}-${index}`} className={todo.done ? "todo-done" : ""}>
      <button aria-label={todo.done ? "Mark incomplete" : "Mark complete"} className={`todo-check ${todo.done ? "checked" : ""}`} onClick={() => onToggle(index)}>{todo.done && "✓"}</button>
      <span>{todo.text}</span><button className="todo-more" aria-label={`Options for ${todo.text}`}><Icon name="dots" size={17} /></button>
    </li>)}</ul>
    <button className="view-all-button">View all tasks <Icon name="arrow" size={14} /></button>
  </Panel>;
}
