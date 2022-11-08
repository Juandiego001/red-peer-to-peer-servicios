# red-peer-to-peer-servicios
Implementación de Red P2P para la materia de Servicios Telemáticos con el profesor Oscar Mondragon.

# Notas preliminares
<ul>
  <li>El proyecto fue desarrollado en NodeJs por lo que se deberá tener instalado Node en su máquina.</li>
  <li>Existen funcionalidades adicionales con el fin de hacer pruebas para esto se deberá instalar <code>jest.</code></li>
  <li>Los comandos adicionales de ejecución se encontrarán en el <code>package.json.</code></li>
   <li>Este proyecto se basó en la recopilación de videos de <i>Cómo crear tu blockchain?</i> del canal de <b>Blockchain Lanzarote</b> los cuales pueden ser encontrados en la siguiente <a href="https://www.youtube.com/playlist?list=PLr822X0UPdU_Cac3N0mXmjTmmm1u_k4M7">url.</a>
</ul>

# Ejecutar el proyecto
Para poner en funcionamiento el proyecto se debe ejecutar desde una terminal:

<pre>
<code>
  git clone https://github.com/Juandiego001/red-peer-to-peer-servicios
  cd red-peer-to-peer-servicios
  npm i
  npm run dev
</code>
</pre>

Esto lo que hará será <b>clonar el repositorio, instalar las librerías necesarias e iniciar el nodo padre.</b>

# Nota #1
El nodo padre o servidor inicial intentará correr en el puerto 3000. En caso de tener el puerto ocupado, se sugiere cambiar el puerto en el archivo <code>config.js.</code>
