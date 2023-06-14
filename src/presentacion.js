export default function Presentacion({nombre, profesion, pos}){
  console.log("asfdasfdsfs")
  return(
    <div>
      <h1 style={{color:"red"}}>Hola {nombre}</h1>
      <p>Mi nombre es {nombre} y soy {profesion}.</p>
      <p>Soy el trabajador numero {pos}</p>
    </div>
  )
}