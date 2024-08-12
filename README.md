# Parte 3

## Ejercicios 3.1-3.6

>NB: Se recomienda hacer todos los ejercicios de esta parte en un nuevo repositorio de git y colocar tu código fuente directamente en la raíz del repositorio. De lo contrario, tendrás problemas en el ejercicio 3.10.

>NB: Dado que este no es un proyecto de frontend y no estamos trabajando con React, la aplicación no se crea con create vite@latest -- --template react. Inicias este proyecto con el comando npm init que se demostró anteriormente en esta parte del material.

Fuerte recomendación: Cuando estés trabajando en código del lado del servidor, siempre mantén un ojo en lo que sucede en la terminal que está ejecutando tu aplicación.

## 3.1: Backend de la Agenda Telefónica paso 1

Implementa una aplicación Node que devuelva una lista codificada de entradas de la agenda telefónica desde la dirección
`http://localhost:3001/api/persons`.

Datos:

```js
[
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]
```

Salida en el navegador después de la solicitud GET:
![Datos JSON de 4 personas en el navegador desde api/persons](images/image-1.png)

Observa que la barra inclinada hacia adelante en la ruta **api/persons** no es un carácter especial y es como cualquier otro carácter en la cadena.

La aplicación debe iniciarse con el comando **npm start**.

La aplicación también debe ofrecer un comando **npm run dev** que ejecutará la aplicación y reiniciará el servidor cada vez que se hagan cambios en un archivo en el código fuente.

## 3.2: Backend de la Agenda Telefónica, paso 2

Implementa una página en la dirección `http://localhost:3001/info` que se parezca más o menos a esto:
![Captura de pantalla de 3.2](images/image-2.png)

La página tiene que mostrar la hora en que se recibió la solicitud y cuántas entradas hay en la agenda telefónica en el momento de procesar la solicitud.

Solo puede haber una declaración `response.send()` en una ruta de la aplicación **Express**. Una vez que envías una respuesta al cliente usando `response.send()`, el ciclo de solicitud-respuesta está completo y no se pueden enviar más respuestas.

Para incluir un espacio en blanco en la salida, utiliza la etiqueta `<br/>` o envuelve las declaraciones en etiquetas `<p>`.

## 3.3: Backend de la Agenda Telefónica, paso 3

Implementa la funcionalidad para mostrar la información de una sola entrada de la agenda.

La URL para obtener los datos de una persona con la identificación `5` debe ser `http://localhost:3001/api/persons/5`

Si no se encuentra una entrada para la identificación dada, el servidor debe responder con el código de estado apropiado.

## 3.4: Backend de la Agenda Telefónica, paso 4

Implementa la funcionalidad que hace posible eliminar una sola entrada de la agenda telefónica mediante una solicitud HTTP DELETE a la URL única de esa entrada de la agenda.

Prueba que tu funcionalidad funcione con _Postman_ o el _cliente REST de Visual Studio Code_.

## 3.5: Backend de la Agenda Telefónica, paso 5

Expande el backend para que se puedan agregar nuevas entradas a la agenda telefónica realizando solicitudes HTTP POST a la dirección `http://localhost:3001/api/persons`.

Genera un nuevo `id` para la entrada de la agenda con la función `Math.random`. Utiliza un rango lo suficientemente grande para tus valores aleatorios de modo que la probabilidad de crear IDs duplicados sea pequeña.

## 3.6: Backend de la Agenda Telefónica, paso 6

Implementa el manejo de errores para crear nuevas entradas.

No se permite que la solicitud se realice correctamente si:

- Falta el nombre o el número
- El nombre ya existe en la agenda

Responde a solicitudes como estas con el código de estado apropiado y también envía información que explique el motivo del error, por ejemplo:

```js
{ error: 'name must be unique' }
```
