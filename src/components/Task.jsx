/* eslint-disable react/prop-types */

import classNames from "classnames";
import { useStore } from "../store";
import trashIcon from "../assets/trash.svg";

const Task = ({ title }) => {
  const task = useStore((store) =>
    store.tasks.find((task) => task.title === title)
  );

  const setDraggedTask = useStore((store) => store.setDraggedTask);

  const deleteTask = useStore((store) => store.deleteTask);

  const handleClick = () => {
    deleteTask(title);
  };

  return (
    <div className="task" draggable onDragStart={() => setDraggedTask(title)}>
      <div>{task.title}</div>
      <div className="bottomWrapper">
        <button className="button-red button" onClick={handleClick}>
          <img src={trashIcon} alt="trash" />
        </button>
        <div className={classNames("status", task.state)}>{task.state}</div>
      </div>
    </div>
  );
};

export default Task;
