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

# Agregar nodos a la red
Asumiendo que ya hemos ejecutado nuestro nodo padre con <code>npm run dev</code>, por cada nodo a agregar a la red blockchain se debe ejecutar en una nueva terminal/máquina desde la carpeta raiz del proyecto:

<ol>
  <li><pre><code>SET P2P_PORT=500?</code></pre></li>
  <li><pre><code>SET HTTP_PORT=300?</code></pre></li>
  <li><pre><code>SET peers=ws://localhost:500?,?</code></pre></li>
</ol>

En nuestro video lo que hicimos fue:

## Primer nodo
<pre>
<code>
    SET P2P_PORT=5002
    SET HTTP_PORT=3002
    SET peers=ws://localhost:5001
    npm run dev
  </code>
</pre>

## Segundo nodo
<pre>
<code>
    SET P2P_PORT=5003
    SET HTTP_PORT=3003
    SET peers=ws://localhost:5001,ws://localhost:5002
    npm run dev
  </code>
</pre>

## Tercer nodo
<pre>
<code>
    SET P2P_PORT=5003
    SET HTTP_PORT=3003
    SET peers=ws://localhost:5001,ws://localhost:5002,ws://localhost:5003
    npm run dev
  </code>
</pre>

# Nota #2
Los archivos de presentación, tanto video como documento de investigación se pueden encontrar en la siguiente <a target="_blank" href="https://uao-my.sharepoint.com/:f:/g/personal/juan_diego_cobo_uao_edu_co/EojTxafee_VBkcgMlxzQ63YBqG3Ptr0irGCmjb5NZrOKlA">url.</a>
