## BACK-END USERS

Ejecutar el comando
``
npm install
``

Para ejecutar las pruebas ejecutar el comando:
``
npm run test
``

Para ejecutar el backend ejecutar el comando:
``
sudo docker-compose up
``

En caso de que docker no se ejecute correctamente cambiar la url de conexión de mongo que se encuentra en variables.env  por:
``
mongodb://localhost:27017/practica
``
y ejecutar el comando
``
npm start
``
, para poder ver la aplicación en funcionamiento.