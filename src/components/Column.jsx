import { useStore } from "../store";
import Task from "./Task";
import { shallow } from "zustand/shallow";
/* eslint-disable react/prop-types */
const Column = ({ state }) => {
  const tasks = useStore(
    (store) => store.tasks.filter((task) => task.state === state),
    shallow
  );

  /** shallow -> if the content changes react will reRender */

  return (
    <div className="column">
      <p>{state}</p>
      {tasks.map((task) => (
        <Task title={task.title} key={task.title} />
      ))}
    </div>
  );
};

export default Column;
