import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import "@fontsource/abeezee/400-italic.css";
import { useAuth } from '../context/auth-context';
import { colors } from "../styles/colors";

import * as THREE from '../../node_modules/three/build/three.module.js';
import { Canvas } from "@react-three/fiber";
import { Euler } from '../../node_modules/three/build/three.module.js';
import { Stats, OrbitControls } from '@react-three/drei'
import texture from '../textures/NormalMap2.png'
//import { AmbientLight, PerspectiveCamera, Box } from 'drei';


function getColorScale(value, minValue, maxValue) {
  // Se define la escala de colores
  var blueDark = [0, 0, 128];
  var blueLight = [135, 206, 250];
  var turquoise = [64, 224, 208];
  var greenLight = [144, 238, 144];
  var limeGreen = [50, 205, 50];
  var yellow = [255, 255, 0];
  var orange = [255, 165, 0];
  var red = [255, 0, 0];
  
  // Se calcula la proporción del valor en el rango
  var proportion = (value - minValue) / (maxValue - minValue);
  
  // Se establecen los límites de cada color
  var blueDarkLimit = 0.125;
  var blueLightLimit = 0.25;
  var turquoiseLimit = 0.375;
  var greenLightLimit = 0.5;
  var limeGreenLimit = 0.625;
  var yellowLimit = 0.75;
  var orangeLimit = 0.875;
  var redLimit = 1;
  
  // Se asigna el color correspondiente según la proporción del valor
  if (proportion <= blueDarkLimit) {
    // Se interpola entre el azul oscuro y el azul claro
    var ratio = proportion / blueDarkLimit;
    var color = interpolateColors(blueDark, blueDark, ratio);
  } else if (proportion <= blueLightLimit) {
    // Se interpola entre el azul claro y el turquesa
    var ratio = (proportion - blueDarkLimit) / (blueLightLimit - blueDarkLimit);
    var color = interpolateColors(blueDark, blueLight, ratio);
  } else if (proportion <= turquoiseLimit) {
    // Se interpola entre el turquesa y el verde claro
    var ratio = (proportion - blueLightLimit) / (turquoiseLimit - blueLightLimit);
    var color = interpolateColors(blueLight, turquoise, ratio);
  } else if (proportion <= greenLightLimit) {
    // Se interpola entre el verde claro y el verde limón
    var ratio = (proportion - turquoiseLimit) / (greenLightLimit - turquoiseLimit);
    var color = interpolateColors(turquoise, greenLight, ratio);
  } else if (proportion <= limeGreenLimit) {
    // Se interpola entre el verde limón y el amarillo
    var ratio = (proportion - greenLightLimit) / (limeGreenLimit - greenLightLimit);
    var color = interpolateColors(greenLight, limeGreen, ratio);
  } else if (proportion <= yellowLimit) {
    // Se interpola entre el amarillo y el naranja
    var ratio = (proportion - limeGreenLimit) / (yellowLimit - limeGreenLimit);
    var color = interpolateColors(limeGreen, yellow, ratio);
  } else if (proportion <= orangeLimit) {
    // Se interpola entre el amarillo y el naranja
    var ratio = (proportion - yellowLimit) / (orangeLimit - yellowLimit);
    var color = interpolateColors(yellow, orange, ratio);
  } else {
    // Se interpola entre el amarillo y el rojo
    var ratio = (proportion - orangeLimit) / (redLimit - orangeLimit);
    var color = interpolateColors(orange, red, ratio);
  }
  
  // Se devuelve el color en formato RGB
  return 'rgb(' + Math.round(color[0]) + ',' + Math.round(color[1]) + ',' + Math.round(color[2]) + ')';
}

function interpolateColors(color1, color2, ratio) {
  // Se interpola entre dos colores dados
  var r = Math.round(color1[0] * (1 - ratio) + color2[0] * ratio);
  var g = Math.round(color1[1] * (1 - ratio) + color2[1] * ratio);
  var b = Math.round(color1[2] * (1 - ratio) + color2[2] * ratio);
  return [r, g, b];
}

function rgbToHex(rgbString) {
  // Eliminar el prefijo "rgb(" y el sufijo ")"
  var rgb = rgbString.substring(4, rgbString.length - 1).split(",");
  // Convertir cada valor RGB a número entero
  var r = parseInt(rgb[0]);
  var g = parseInt(rgb[1]);
  var b = parseInt(rgb[2]);
  // Combinar los valores RGB en un solo número hexadecimal de 6 dígitos
  var hex = ((r << 16) | (g << 8) | b).toString(16);
  // Agregar ceros a la izquierda si es necesario
  while (hex.length < 6) {
    hex = "0" + hex;
  }
  // Agregar el prefijo "#"
  hex = "#" + hex;
  return hex;
}


export default function SpringStressSimulation({dataSimulation}) {

  console.log("dataSimulation es:")
  console.log(dataSimulation)

  //Loading
  const textureLoader = new THREE.TextureLoader()
  const normalTexture = textureLoader.load(texture)

  var alambre = 0
  
  if (dataSimulation.spring != null) {
    var resorteStress = [];
    
    alambre = parseFloat(dataSimulation.spring.wire)
  
    let data = dataSimulation;
    console.log("data es:")
    console.log(data)
    let esfuerzos = [];
  
    let numeroDePrueba = 3;
  
    for (let i = 0; i < data.points.length; i++) {
      let punto = []
      punto.push(parseFloat(data.points[i].posx[numeroDePrueba]))
      punto.push(parseFloat(data.points[i].posz[numeroDePrueba]))
      punto.push(parseFloat(data.points[i].posy[numeroDePrueba]))
      punto.push(parseFloat(data.points[i].esf[numeroDePrueba]))
      esfuerzos.push(parseFloat(data.points[i].esf[numeroDePrueba]))
      resorteStress.push(punto)
    }
  
    var esfMax = Math.max(...esfuerzos); 
    var esfMin = Math.min(...esfuerzos);
  
    console.log(resorteStress)
    console.log("Esfuerzo Maximo")
    console.log(esfMax)

  }

  return (
    <div id="canvas-container" style={{height: 800, width: 700, backgroundColor:"white"}}>
      <Canvas dpr={[1, 2]} camera={{ fov: 50, near: 0.1, far:5000, position: [0, 1000, 300]}}>
        <ambientLight intensity={3} />
        {
          resorteStress && Array.isArray(resorteStress) && resorteStress.length > 0 && resorteStress.map((punto, indice, arr) => {
            if (indice < arr.length -1){
              
              let distanciaEntrePuntos = Math.pow(Math.pow(arr[indice+1][0]-arr[indice][0],2)+Math.pow(arr[indice+1][1]-arr[indice][1],2),0.5);
            
              let auxAlfa = (arr[indice+1][2]-arr[indice][2])/(arr[indice+1][0]-arr[indice][0]);
              let alfa = Math.atan(auxAlfa);
              let auxBeta = (arr[indice+1][2]-arr[indice][2])/(arr[indice+1][1]-arr[indice][1]);
              let beta = (Math.atan(auxBeta));//abs
              let auxTheta = (arr[indice+1][1]-arr[indice][1])/(arr[indice+1][0]-arr[indice][0]);
              let theta = Math.atan(auxTheta);
              
              let posX = (arr[indice+1][0]+arr[indice][0])/2;
              let posY = (arr[indice+1][1]+arr[indice][1])/2;
              let posZ = (arr[indice+1][2]+arr[indice][2])/2;
              
              let geometry = new THREE.CylinderGeometry(alambre/2,alambre/2,distanciaEntrePuntos);

              let esfProm = (resorteStress[indice+1][3]+resorteStress[indice][3])/2;
              console.log("Esfuerzo Promedio")
              console.log(esfProm)
              let colorEsf = rgbToHex(getColorScale(esfProm, esfMin, esfMax))
              console.log(colorEsf)

              //Material del resorte
              let material = new THREE.MeshStandardMaterial()
              //material.metalness = 0
              //material.roughness = 0
              material.color = new THREE.Color(colorEsf)
              //material.normalMap = normalTexture;
              
              let cilindro = new THREE.Mesh(geometry, material);
              let euler = new Euler(beta, alfa,1.5708+theta, 'XZY');
              cilindro.rotation.copy(euler);
              
              //cilindro.position.set(posX, posZ, posY);
              return (dataSimulation.spring != null) ? <primitive object={cilindro} position={[posX, posY, posZ]} /> : null
              
            }

          })
        }
        <OrbitControls />
        
      </Canvas>
    </div>
  )
}