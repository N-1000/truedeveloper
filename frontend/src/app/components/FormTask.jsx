"use client";
// Importamos el hook useState de React para crear estados locales
import { useState } from "react";

// Importamos el hook useRouter de Next.js para acceder al router de la aplicación
import { useRouter } from 'next/navigation';

// Definimos el componente FormTask
function FormTask() {
  // Creamos tres estados locales: title, description y error
  const [title, setTitle] = useState(''); // título de la tarea
  const [description, setDescription] = useState(''); // descripción de la tarea
  const [error, setError] = useState(null); // error que ocurre durante la creación de la tarea

  // Creamos una instancia del router de Next.js
  const router = useRouter();

  // Definimos la función handleSubmit que se llama cuando se envía el formulario
  const handleSubmit = async (e) => {
    // Evitamos que el formulario se envíe por defecto
    e.preventDefault();

    try {
      // Realizamos una solicitud POST a la API para crear una nueva tarea
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/`, {
        method: 'POST',
        body: JSON.stringify({ title, description }), // enviamos el título y la descripción en el cuerpo de la solicitud
        headers: {
          'Content-Type': 'application/json', // especificamos el tipo de contenido de la solicitud
        },
      });

      // Si la solicitud no es exitosa, lanzamos un error
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }

      // Procesamos la respuesta de la API
      const data = await res.json();
      console.log(data);

      // Refrescamos la página para mostrar la nueva tarea
      router.refresh();

      // Limpiamos el estado de error
      setError(null);
    } catch (error) {
      // Si ocurre un error, establecemos el estado de error con el mensaje de error
      setError(error.message);
    }
  };

  // Renderizamos el formulario
  return (
    <div className="bg-slate-200 p-7">
      <form onSubmit={handleSubmit}>
        <h1 className="text-black">Añadir Tarea</h1>

        <label>Tarea:</label>
        <input
          type="text"
          name="title"
          className="bg-slate-400 rounded-md p-2 mb-2 block w-full text-slate-950"
          onChange={(e) => setTitle(e.target.value)} // actualizamos el estado title cuando se cambia el input
        />

        <label>Descripcion:</label>
        <textarea
          name="description"
          className="bg-slate-400 rounded-md p-2 mb-2 block w-full"
          onChange={(e) => setDescription(e.target.value)} // actualizamos el estado description cuando se cambia el textarea
        ></textarea>

        {error && <div style={{ color: 'ed' }}>{error}</div>} // mostramos el mensaje de error si ocurre uno

        <button className="bg-indigo-500 text-white rounded-md p-2 block w-full">Guardar</button>
      </form>
    </div>
  );
}

// Exportamos el componente FormTask
export default FormTask;
