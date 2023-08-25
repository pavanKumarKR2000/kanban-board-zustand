import { useState } from "react";
import { useStore } from "../store";
import Task from "./Task";
import { shallow } from "zustand/shallow";
import classNames from "classnames";

/* eslint-disable react/prop-types */
const Column = ({ state }) => {
  const [text, setText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [drop, setDrop] = useState(false);

  const setDraggedTask = useStore((store) => store.setDraggedTask);
  const draggedTask = useStore((store) => store.draggedTask);

  const tasks = useStore(
    (store) => store.tasks.filter((task) => task.state === state),
    shallow
  );
  /** shallow -> if the content changes react will reRender */

  const addTasks = useStore((store) => store.addTasks);
  const moveTask = useStore((store) => store.moveTask);

  const handleSubmit = () => {
    addTasks(text, state);
    setText("");
    setShowModal(false);
  };

  const handleCancel = () => {
    setText("");
    setShowModal(false);
  };

  const handleDrop = () => {
    setDraggedTask(null);
    moveTask(draggedTask, state);
    setDrop(false);
  };

  const handleOnDragLeave = (e) => {
    e.preventDefault();
    setDrop(false);
  };

  const handleOnDragOver = (e) => {
    e.preventDefault();
    setDrop(true);
  };

  return (
    <div
      className={classNames("column", { drop: drop })}
      onDragOver={handleOnDragOver}
      onDragLeave={handleOnDragLeave}
      onDrop={handleDrop}
    >
      <div className="titleWrapper">
        <p className="text-bold">{state}</p>
        <button onClick={() => setShowModal(true)} className="button">
          Add
        </button>
      </div>
      {tasks.map((task) => (
        <Task title={task.title} key={task.title} />
      ))}
      {showModal && (
        <div className="Modal">
          <form className="modalContent" onSubmit={handleSubmit}>
            <input
              type="text"
              onChange={(e) => setText(e.target.value)}
              value={text}
              placeholder="Enter Task"
              className="input"
              autoFocus
            />
            <button
              type="submit"
              className="button button-black"
              disabled={!text}
            >
              Add
            </button>
            <button className="button button-red" onClick={handleCancel}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Column;
