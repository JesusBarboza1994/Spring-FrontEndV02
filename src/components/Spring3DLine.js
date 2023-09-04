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

export default function Spring3DLine({points, wire}) {

  if (points[0] != null){
    //Loading
    const textureLoader = new THREE.TextureLoader()
    const normalTexture = textureLoader.load(texture)
    //Material del resorte
    const material = new THREE.MeshStandardMaterial()
    material.metalness = 0.7
    material.roughness = 0.2
    material.normalMap = normalTexture;
    material.color = new THREE.Color(0xbb1818)
    const alambre = wire

    //Cilindro inicial
    var distanciaEntrePuntos = Math.pow(Math.pow(points[1][0]-points[0][0],2)+Math.pow(points[1][1]-points[0][1],2),0.5);
    var auxAlfa = (points[1][2]-points[0][2])/(points[1][0]-points[0][0]);
    var alfa = Math.atan(auxAlfa);
    var auxBeta = (points[1][2]-points[0][2])/(points[1][1]-points[0][1]);
    var beta = (Math.atan(auxBeta));//abs
    var auxTheta = (points[1][1]-points[0][1])/(points[1][0]-points[0][0]);
    var theta = Math.atan(auxTheta);
    
    var posX = (points[1][0]+points[0][0])/2;
    var posY = (points[1][1]+points[0][1])/2;
    var posZ = (points[1][2]+points[0][2])/2;
    
    var geometry = new THREE.CylinderGeometry(alambre/2,alambre/2,distanciaEntrePuntos);
    var cilindro = new THREE.Mesh(geometry, material);
    var euler = new Euler(beta,alfa,1.5708+theta, 'XZY');
    cilindro.rotation.copy(euler);

    // ----------------

    //Cilindro final
    let distanciaEntrePuntos2 = Math.pow(Math.pow(points[points.length-1][0]-points[points.length-2][0],2)+Math.pow(points[points.length-1][1]-points[points.length-2][1],2),0.5);
    var auxAlfa2 = (points[points.length-1][2]-points[points.length-2][2])/(points[points.length-1][0]-points[points.length-2][0]);
    var alfa2 = Math.atan(auxAlfa2);
    var auxBeta2 = (points[points.length-1][2]-points[points.length-2][2])/(points[points.length-1][1]-points[points.length-2][1]);
    var beta2 = (Math.atan(auxBeta2));//abs
    var auxTheta2 = (points[points.length-1][1]-points[points.length-2][1])/(points[points.length-1][0]-points[points.length-2][0]);
    var theta2 = Math.atan(auxTheta2);
    
    var posX2 = (points[points.length-1][0]+points[points.length-2][0])/2;
    var posY2 = (points[points.length-1][1]+points[points.length-2][1])/2;
    var posZ2 = (points[points.length-1][2]+points[points.length-2][2])/2;
    
    var geometry2 = new THREE.CylinderGeometry(alambre/2,alambre/2,distanciaEntrePuntos2);
    var cilindro2 = new THREE.Mesh(geometry2, material);
    var euler2 = new Euler(beta2,alfa2,1.5708+theta2, 'XZY');
    cilindro2.rotation.copy(euler2);

    // ----------------

    var pointsLine = [];

    points.map((punto, indice, arr) =>{
      pointsLine.push( new THREE.Vector3(punto[0],punto[1],punto[2]) );

    })

    // Crear una curva CatmullRomCurve3 a partir de una serie de puntos

    var curve = new THREE.CatmullRomCurve3(pointsLine);

    // Crear una forma Shape que definirá el perfil transversal del tubo
    var shape = new THREE.Shape();
    var radius = alambre/2;
    shape.moveTo(0, radius);
    shape.quadraticCurveTo(radius, radius, radius, 0);
    shape.quadraticCurveTo(radius, -radius, 0, -radius);
    shape.quadraticCurveTo(-radius, -radius, -radius, 0);
    shape.quadraticCurveTo(-radius, radius, 0, radius);

    // Crear una TubeBufferGeometry utilizando la curva y la forma
    var tubularSegments = 600;
    var radialSegments = 150;
    var closed = false;
    var tubeGeometry = new THREE.TubeGeometry(curve, tubularSegments, radius, radialSegments, closed, true);
    tubeGeometry.parameters.cap = true;
    // Crear un material MeshPhongMaterial para el tubo
    /*var material = new THREE.MeshPhongMaterial({
      color: 0xff0000
    });*/

    // Crear una malla Mesh utilizando la geometría y el material
    var resorte = new THREE.Mesh(tubeGeometry, material);

    // Añadir la malla a la escena
    //scene.add(mesh);
  }

  

  return (
    <div id="canvas-container" style={{height: 800, width: 700}}>
      <Canvas dpr={[1, 2]} camera={{ fov: 50, near: 0.1, far:5000, position: [0, 600, -50]}}>
        <pointLight color={0xbb1818} intensity={5000000} position={[-80,430,-80]}/>
        <pointLight color={0xbb1818} intensity={5000000} position={[0,430,-80]}/>
        <pointLight color={0xbb1818} intensity={500000} position={[0,0,-600]}/>
        <pointLight color={0xbb1818} intensity={500000} position={[0,0,600]}/>
        <ambientLight intensity={2}/>

        {
          (resorte!= null) ? <primitive object={resorte} position={[0, 0, 0]} /> : null
        }

        {
          (resorte!= null) ? <primitive object={cilindro} position={[posX, posY, posZ]} /> : null
        }

        {
          (resorte!= null) ? <primitive object={cilindro2} position={[posX2, posY2, posZ2]} /> : null
        }

        
        <OrbitControls />
        
      </Canvas>
    </div>
  )
}