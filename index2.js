const tasks = [
    {
        description: "Ir a hacer la compra",
        completed: false
    },
    {
        description: "Crear el archivo html",
        completed: true
    },
    {
        description: "Arreglar el coche",
        completed: false
    },
    {
        description: "Crear proyecto millonario",
        completed: false
    },
    {
        description: "Enlazar el archivo js al HTML",
        completed: true
    },
    {
        description: "Ir al gimnasio",
        completed: true
    },
    {
        description: "Tejer una camiseta",
        completed: false
    },
    {
        description: "Ir a comprar agua",
        completed: false
    },
    {
        description: "Fregar los platos",
        completed: true
    }
];

// función completar tareas a la que le llega la posición de la tarea a la que el usuario ha hecho click
const complete = (i) => {
    //accedemos a esa posición en el array de tareas y le cambiamos la propiedad completed a true
    tasks[i].completed = true;
    // ordenamos de nuevo las tareas, que esta función a su vez las pintará de nuevo ordenadas
    orderTasks(tasks);
}


// función pintar tareas a la que le llega un array de tareas al cual nombramos como tasksToPrint
const printTasks = (tasksToPrint) => {
    //recogemos el contenedor donde queremos introducir cada tarea
    const ul = document.querySelector(".list");
    // limpiamos el contenedor con innerHTML vacío por si tuviera alguna tarea pintada previamente como puede pasar en el futuro
    ul.innerHTML = "";

    // recorremos el array de tareas que nos ha llegado a nuestra función
    for (let i = 0; i < tasksToPrint.length; i++) {
        // guardamos nuestra tarea en la variable recién creada
        const task = tasksToPrint[i];

        // creamos nuestra tarea, será un "li"
        const li = document.createElement("li");

        // añadimos el contenido de texto al li que será la descripción de la tarea
        li.textContent = task.description;

        // añadimos el evento click a la lista, que llamará a la función completar a la que enviaremos la posición de la tarea a la que hemos hecho click, esta función la veremos creada más adelante
        li.addEventListener("click", () => complete(i));

        // si la tarea estuviese completada... la añadiríamos la clase "complete", en caso contrario no añadimos ninguna clase
        if (task.completed === true) {
            li.className = "completed";
        }

        // añadimos la tarea a la lista de tareas
        ul.appendChild(li);
    }
}

const orderTasks = (tasksToOrder) => {
    //utilizamos el método de array sort para ordenar, a y b representarán un elemento y otro, irán variando
    tasksToOrder.sort((a, b) => {
         // mandamos las tareas completadas al final con return 1 comparándolas con el resto
         if (a.completed && !b.completed) {
            return 1;
         }
         // mandamos las tareas NO completadas al principio con return -1 comparándolas con el resto
         if (!a.completed && b.completed) {
            return -1;
         }
         // En cualquier otro caso, no cambia el orden relativo
         return 0;
    });
    printTasks(tasksToOrder);
} 

const button = document.querySelector(".new > button");

const addTask = () => {
    // recogemos el input, puesto que queremos el valor que el usuario haya introducido en él
    const input = document.querySelector(".new > input");
    // creamos la estructura que tienen TODAS nuestras tareas, ya que deberá ser igual, por defecto las crearemos NO completada
    const newTask = {
        description: input.value, //input.value es el valor del input que ha escrito el usuario, el cual usaremos en la propiedad description
        complete: false
    };

    // añadimos la nueva tarea al principio del array con el método unshift
    tasks.unshift(newTask);
    // limpiamos el input
    input.value = "";
    // llamamos de nuevo a la función pintar para que nos pinte todas las tareas de nuevo ya que hemos añadido una nueva
    printTasks(tasks); 
}

button.addEventListener("click", addTask);
orderTasks(tasks);