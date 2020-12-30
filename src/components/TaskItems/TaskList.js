import React from "react";
import { List } from "@material-ui/core";

import Task from "./Task";

//functional component of TaskList

function TaskList({ tasks, updateComplete, deleteTask }) {
  //const [tasks, setTasks] = useState([]);
  // const createTask = (task) => {
  //   if (!task.weirdtitle || /^\s*$/.test(task.weirdtitle)) {
  //     return;
  //   }
  //   const newTasks = [task, ...tasks];
  //   setTasks(newTasks);
  // };
  const displayTasks = (tasks) => {
    if (tasks.length > 0) {
      return (
        <List>
          {tasks.map((task, index) => (
            <Task
              key={index}
              task={task}
              updateComplete={updateComplete}
              deleteTask={deleteTask}
            />
          ))}
        </List>
      );
    } else {
      return <h3>Good job! Currently no task😃</h3>;
    }
  };

  return <>{displayTasks(tasks)}</>;
}

//   return (
//     <div>
//       <List>
//         {
//           tasks.map((task) => (
//             <Task
//               key={task.id}
//               task={task}
//               updateComplete={updateComplete}
//               deleteTask={deleteTask}
//             />
//           ))}
//       </List>
//     </div>
//   );
// }

export default TaskList;
