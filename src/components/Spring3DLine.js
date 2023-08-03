import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import "@fontsource/abeezee/400-italic.css";
import { useAuth } from '../context/auth-context';
import { colors } from "../styles/colors";

import * as THREE from '../../node_modules/three/build/three.module.js';
import { Canvas } from "@react-three/fiber";
import { Euler } from '../../node_modules/three/build/three.module.js';
import { Stats, OrbitControls } from '@react-three/drei'

export default function Spring3DLine({points, wire}) {

  if (points[0] != null){
    //Loading
    const textureLoader = new THREE.TextureLoader()
    //const normalTexture = textureLoader.load('./textures/NormalMap2.png')
    //Material del resorte
    const material = new THREE.MeshStandardMaterial()
    material.metalness = 0.7
    material.roughness = 0.2
    //material.normalMap = normalTexture;
    material.color = new THREE.Color(0xbb1818)
    const alambre = wire

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
    <div id="canvas-container" style={{height: 500, width: 700}}>
      <Canvas dpr={[1, 2]} camera={{ fov: 50, near: 0.1, far:5000, position: [0, 1000, 300]}}>
        <pointLight color={0xbb1818} intensity={50} position={[-80,430,-80]}/>
        

        {
          (resorte!= null) ? <primitive object={resorte} position={[0, 0, 0]} /> : null
        }

        
        <OrbitControls />
        
      </Canvas>
    </div>
  )
}