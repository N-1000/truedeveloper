import TasksCard from './TasksCard';

async function loadtasks() {
  const url = `${process.env.BACKEND_URL}/api/tasks/`;
  const res = await fetch(url);
  const tasks = await res.json();
  return tasks;
}

async function ListTask() {
  const tasks = await loadtasks();
  console.log(tasks);

  return (
    <div className="bg-slate-400 p-4 w-full">
      <h1>Lista de tareas</h1>
      {tasks.map((task) => (
        <TasksCard task={task} key={task.id} />
      ))}
    </div>
  );
}

export default ListTask;