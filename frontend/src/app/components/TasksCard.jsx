"use client"
// Importamos el hook useRouter de next/navigation para tener acceso al router de Next.js
import { useRouter } from 'next/navigation';
// Importamos el hook useState de React para mantener el estado de la tarjeta
import { useState } from 'react';

// Función que representa una tarjeta de tarea
function TasksCard({ task }) {
  // Creamos una instancia del router de Next.js
  const router = useRouter();
  // Estado para determinar si la tarjeta está en modo edición
  const [edit, setEdit] = useState(false);

  // Estado para el título de la tarea
  const [newTitle, SetNewTitle] = useState(task.title);
  // Estado para la descripción de la tarea
  const [newDescription, SetNewDescription] = useState(task.description);

  // Función para eliminar una tarea
  const SuperDelete = async (id) => {
    // Mostramos una confirmación antes de eliminar la tarea
    if (window.confirm('¿Quieres eliminar esta tarea?')) {
      try {
        // Creamos la URL para la solicitud DELETE
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${id}/`;
        // Hacemos la solicitud DELETE
        const res = await fetch(url, {
          method: 'DELETE',
        });
        // Si la solicitud es exitosa, refrescamos la página
        if (res.status === 204) {
          router.refresh();
        }
      } catch (error) {
        // Mostramos un error en la consola si ocurre un problema
        console.error(error);
      }
    }
  };

  // Función para marcar una tarea como completada o no completada
  const SuperCompleted = async (id, done) => {
    // Creamos la URL para la solicitud POST
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${id}/done/`;
    // Hacemos la solicitud POST
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ done }),
    });
    // Si la solicitud es exitosa, refrescamos la página
    if (res.status === 204) {
      router.refresh();
    }
  };

  // Función para actualizar una tarea
  const SuperUpdate = async (id) => {
    console.log(id)
    console.log(newTitle, newDescription)
    // Creamos la URL para la solicitud PUT
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${id}/`;
    // Hacemos la solicitud PUT
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: newTitle, description: newDescription }),
    });
    // Si la solicitud es exitosa, refrescamos la página y cambiamos el estado de edición
    if (res.status === 204) {
      router.refresh();
    }
    setEdit(!edit);
  }

  // Devolvemos el JSX para la tarjeta de tarea
  return (
    <div className="bg-slate-500 px-4 py-3 mb-2 rounded-md text-slate-200 flex justify-between items-center">
      <div className="flex flex-col">
        {/* Mostramos el título y la descripción de la tarea */}
        {!edit? (
          <h2 className="font-bold">{newTitle}
            {task.done && <span>✅</span> }
          </h2>
        ) : (
          // Mostramos un input para editar el título
          <input type='text' placeholder={task.title} className="p-2 bg-slate-500 border-none outline-none text-lime-300" onChange={e => SetNewTitle(e.target.value)}/>
        )}
        {!edit? (
          <p>{newDescription}</p>
        ) : (
          // Mostramos un textarea para editar la descripción
          <textarea placeholder={task.description} className="p-2 bg-slate-500 border-none outline-none text-lime-300 w-full" onChange={e => SetNewDescription(e.target.value)}/>
        )}
      </div>
      <div className="flex justify-between gap-x-2">
        {/* Mostramos los botones para marcar la tarea como completada, eliminarla y editarla */}
        { edit && (
          <button className="bg-blue-600 text-white rounded-md p-2" onClick={() => SuperUpdate(task.id)}>Guardar Cambios</button>
        )}
        <button className={`text-white rounded-md p-2 ${task.done? " bg-emerald-400" : " bg-gray-800"  }`} onClick={() => SuperCompleted(task.id,!task.done)}>{task.done? "Desmarcar" : "Marcar como completada"}</button>
        <button className="bg-red-600 text-white rounded-md p-2" onClick={() => SuperDelete(task.id)}>Eliminar</button>
        <button className="bg-indigo-500 text-white rounded-md p-2" onClick={() => setEdit(!edit)}>Editar</button>
      </div>
    </div>
  );
}

export default TasksCard;