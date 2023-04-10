import styled from "@emotion/styled";
import { useState } from "react";
import "@fontsource/abeezee/400-italic.css"
//import Componente from "./componente";
//import Presentacion from "./presentacion";
//import InputDiv from "./inputDiv";
//import { Element } from "./Element";
//import createSwitch from "switch-button";
//import { MultiSelect } from "react-multi-select-component";


const Form = styled.form`
  display:flex;
  grid-template-columns: auto, auto, auto;
  gap:6px;
  
  width: 480px;
  background: green;
  color:white;
`
const Div = styled.div`
  display:flex;
  aling-items: center;
  width:125px;
  height:40px;
  margin:6px 12px;
  background: black;
  border:2px solid gray;
  border-radius:8px;
  
`
const Input = styled.input`
  width:40px;
  height:18px;
  color:white;
  background-color: BLACK;
  margin:8px;
  font-family:"ABeeZee";
  font-size: 13px;
  border-style:inset;
     
`
const Label = styled.label`
  
  height: 20px;
  width: 65px;
  display:block;
  background-color:black;
  margin-top:12px;
  margin-left: 8px;
  font-family:"ABeeZee";
  font-size: 13px;
  color: gray;
            
`

const DivSimul = styled.div`
  display:flex;
  grid-template-columns: auto, auto, auto;
  flex-wrap: wrap;
  column-gap:8px;
  row-gap:none;
  margin-bottom:30px;
  margin-top: 10px;
  width: 480px;
  background-color: green;         
`

const Paragraph = styled.p`
  
  block-size:1px;
  margin-left:15px;
  margin-bottom: 6px;
  font-family:"ABeeZee";
  font-size:11px;
  color: white;  
  width: 148px;
`
  const Button = styled.button`
  
  width:125px;
  height:40px;
  margin:3px 12px;
  border-radius:8px;
  background-color: red;
  color: white;
  
`
const Table1 = styled.table`
  width:420px;
  height:380px;
  font-family: "ABeeZee";
  border: 2px solid grey;
  border-collapse: collapse;
  color: grey;
    
`
const Table2 = styled.table`
width:210px;
height:210px;
font-family: "ABeeZee";

border: 2px solid grey;
border-collapse: collapse;
color: grey;

`

const Th = styled.th`
  height: 170px;
  writing-mode: vertical-lr;
  text-orientation: upright;
  font-size: 14px;
  border: 1px solid grey;
  
`
const Th2 = styled.th`
 width: 100px;
 text-align: left;
 font-size: 14px;
 letter-spacing: 1px;
 padding:10px;
 border: 1px solid grey;
 color: white;
`
const Td = styled.td`
text-align: center;
width: 30px;
border: 1px solid grey;

`

const options = [
  { value: "TASE" },
  { value: "TCSE" },
  { value: "TAE" },
  { value: "TCE" },
 
];


/*const ele = document.querySelector('button')
const switchBtn = createSwitch(ele,{
  text: ["Maq.Auto","Torno"],
  onChange:(checked)=>{
    console.log("checked",checked)
  },
})  */

function App() {
  //const [num, setNum] = useState(0);
  
  const [data, setData] = useState({
    d:"",        //alambre
    Dext:"",     //diam ext1
    N:"",        //vueltas totales
    L0:"",      //longitud
    Luz1:"",
    Dint1:"",    //diam int1
    Vtas1:"",    //vts red1
    Ext1:"",     //extremo1
    Luz2:"",
    Dint2:"",    //diam int2
    Vtas2:"",    //vts red2
    Ext2:"",     //extremo2
  })

  const [data1, setData1] = useState({
    Mater:"",      
    x:"",         //deformacion
    grado:"",        
  })

  const [data2, setData2] = useState({
    w:"",      
    Dmedio:"",         
    f:"",      
    Rel_d1:"",      
    Rel_d2:"",         
    Vt_red_VT:"",      

  })

  const [data3, setData3] = useState({
    LDA:"",      
    LDA_adic:"",         
    Peso:"",
    Dext: "",
    L0:"",
    
  })

  const [data4, setData4] = useState({
    K:"",      
    F:"",         
    L:"",        
  })

  /*function handleButton(){
    console.log("Holaaaaaaaaa");
    setNum(num+1)
  }
  function restar(){
    num === 0 ? setNum(0) : setNum(num-1)
  }  */

  function handleInput(e){
    setData({...data, [e.target.id]:e.target.value})
    console.log(data)
  }
  function handleSubmit(e){
    e.preventDefault();
    console.log(data)
  }
  function handleInput1(e){
    setData1({...data1, [e.target.id]:e.target.value})
    console.log(data1)
  }
  function handleInput2(e){
    setData2({...data2, [e.target.id]:e.target.value})
    console.log(data2)
  }
  function handleInput3(e){
    setData3({...data3, [e.target.id]:e.target.value})
    console.log(data3)
  }
  function handleInput4(e){
    setData4({...data4, [e.target.id]:e.target.value})
    console.log(data4)
  }


  //const trabajadores=[["Renee", "ingeniero mecatronico"], ["Liudmila", "ingeniero mecanico"]]
  
  return (
   <div className="App" style={{backgroundColor:"black", gap: 100, display:"flex"}}>
    
    <div>
      <Form onSubmit={handleSubmit}>
        <div>
          <p style={{blockSize:2,marginLeft:14,fontFamily:"ABeeZee",fontSize:11, }}>Datos principales</p>
            <Div>
              <Label>d</Label>
              <Input  value={data.d} id={"d"} onChange={(e) => handleInput(e)}/>
            </Div>
            <Div>
              <Label>Dext</Label>
              <Input  value={data.Dext} id={"Dext"} onChange={(e) => handleInput(e)}/>
            </Div>
            <Div>
              <Label>N</Label>
              <Input  value={data.N} id={"N"} onChange={(e) => handleInput(e)}/>
            </Div>
            <Div>
              <Label>L0</Label>
              <Input  value={data.L0} id={"L0"} onChange={(e) => handleInput(e)}/>
            </Div>
            <button style={{width:125,
                            height:40,
                            margin:"10px 14px",
                            borderRadius:8,}}>Enviar</button>
        </div>

        <div>
          <p style={{blockSize:2,marginLeft:14,fontFamily:"ABeeZee",fontSize:11, }}>Extremo 1</p>
            <Div>
              <Label>Luz1</Label>
              <Input  value={data.Luz1} id={"Luz1"} onChange={(e) => handleInput(e)}/>
            </Div>
            <Div>
              <Label>Dint1</Label>
              <Input  value={data.Dint1} id={"Dint1"} onChange={(e) => handleInput(e)}/>
            </Div>
            <Div>
              <Label>Vtas1</Label>
              <Input  value={data.Vtas1} id={"Vtas1"} onChange={(e) => handleInput(e)}/>
            </Div>
            <Div>
              <Label>Ext1</Label>
              <Input  value={data.Ext1} id={"Ext1"} onChange={(e) => handleInput(e)}/>
            </Div>
        </div>
        
        <div>
          <p style={{blockSize:2,marginLeft:14,fontFamily:"ABeeZee",fontSize:11, }}>Extremo 2</p>
            <Div>
              <Label>Luz2</Label>
              <Input  value={data.Luz2} id={"Luz2"} onChange={(e) => handleInput(e)}/>
            </Div>
            <Div>
              <Label>Dint2</Label>
              <Input  value={data.Dint2} id={"Dint2"} onChange={(e) => handleInput(e)}/>
            </Div>
            <Div>
              <Label>Vtas2</Label>
              <Input  value={data.Vtas2} id={"Vtas2"} onChange={(e) => handleInput(e)}/>
            </Div>
            <Div>
              <Label>Ext2</Label>
              <Input  value={data.Ext2} id={"Ext2"} onChange={(e) => handleInput(e)}/>
            </Div>
        </div>
          
      </Form>

      <DivSimul>
        <div style={{display: "flex",}}>
          <Paragraph>Datos de simulacion</Paragraph>
          <Paragraph></Paragraph>
          <Paragraph>nodos</Paragraph>
        </div>
      
        <Div>
          <Label style={{color: "#EE7272"}}>Mater</Label>
          <Input  value={data1.Mater} id={"Mater"} onChange={(e) => handleInput1(e)}/>
        </Div>
        
        <Div>
          <Label style={{color: "#EE7272"}}>x</Label>
          <Input  value={data1.x} id={"x"} onChange={(e) => handleInput1(e)}/>
        </Div>
        
        <Div>
          <Label style={{color: "#EE7272"}}>grado</Label>
          <Input  value={data1.grado} id={"grado"} onChange={(e) => handleInput1(e)}/>
        </Div>
        <div style={{display: "flex",columnGap:12,width:"100%",justifyContent:"flex-end"}}>
          <Button>Simular</Button>
          <Button>Calcular</Button>
        </div>
                                
      </DivSimul>

      
      <DivSimul>
      <Paragraph style={{width: 480}}>Parametros calculados</Paragraph>
      <Div>
          <Label>w</Label>
          <Input  value={data2.w} id={"w"} onChange={(e) => handleInput2(e)}/>
      </Div>
      <Div>
          <Label>D medio</Label>
          <Input  value={data2.Dmedio} id={"D medio"} onChange={(e) => handleInput2(e)}/>
      </Div>
      <Div>
          <Label>f</Label>
          <Input  value={data2.f} id={"f"} onChange={(e) => handleInput2(e)}/>
      </Div>
      <Div>
          <Label>Rel.d1</Label>
          <Input  value={data2.Rel_d1} id={"Rel.d1"} onChange={(e) => handleInput2(e)}/>
      </Div>
      <Div>
          <Label>Rel.d2</Label>
          <Input  value={data2.Rel_d2} id={"Rel.d2"} onChange={(e) => handleInput2(e)}/>
      </Div>
      <Div>
          <Label>Vt.red/VT</Label>
          <Input  value={data2.Vt_red_VT} id={"Vt.red/VT"} onChange={(e) => handleInput2(e)}/>
      </Div>

      </DivSimul>

      <DivSimul style={{marginBottom:10,}}>
          <div style={{display: "flex",}}>
            <Paragraph>Datos principales</Paragraph>
            <Paragraph>Maq.Auto/Torno</Paragraph>
            
            <Paragraph></Paragraph>
          </div>
        
          <Div>
            <Label>LDA</Label>
            <Input  value={data3.LDA} id={"LDA"} onChange={(e) => handleInput3(e)}/>
          </Div>
          
          <Div>
            <Label>LDA adic</Label>
            <Input  value={data3.LDA_adic} id={"LDA adic"} onChange={(e) => handleInput3(e)}/>
          </Div>
          
          <Div>
            <Label>Peso</Label>
            <Input  value={data3.Peso} id={"Peso"} onChange={(e) => handleInput3(e)}/>
          </Div>
          <div>
            <Paragraph style={{width: 480}}>Grado tolerancias</Paragraph>
          </div>
          
          <Div>
            <Label>Dext</Label>
            <Input  value={data3.Dext} id={"Dext"} onChange={(e) => handleInput3(e)}/>
          </Div>
          
          <Div>
            <Label>L0</Label>
            <Input  value={data3.L0} id={"L0"} onChange={(e) => handleInput3(e)}/>
          </Div>
      </DivSimul>

      <div>  
        <Paragraph style={{width: 480}}>Descripcion</Paragraph>
        <div style={{
          
                      width: 444, 
                      height: 160, 
                      margin:14,
                      marginBottom: 0, 
                      border:"2px solid grey",
                      borderBottom: "1px solid grey",
                      borderColor:"grey",
                      color:"grey",
                      fontFamily:"ABeeZee",
                      fontSize: 16,
                      padding:10,

                    }}> Descripcion</div>
          <div style={{
                      width: 444,
                      height: 20,
                      marginLeft:14,
                      border:"2px solid grey",
                      borderTop:"1px solid grey",
                      color:"grey",
                      fontFamily:"ABeeZee",
                      fontSize: 12,
                      padding:10,
                      }}> Datos adicionales</div>
        
      </div>

      <DivSimul>
        <Paragraph style={{width: 480}}>Calculos teoricos</Paragraph>
        <Div>
            <Label>K</Label>
            <Input  value={data4.K} id={"K"} onChange={(e) => handleInput4(e)}/>
        </Div>
        <Div>
            <Label>F</Label>
            <Input  value={data4.F} id={"F"} onChange={(e) => handleInput4(e)}/>
        </Div>
        <Div>
            <Label>L</Label>
            <Input  value={data4.L} id={"L"} onChange={(e) => handleInput4(e)}/>
        </Div>
      </DivSimul>
    </div>


    <div style={{display:"flex", columnGap:50, marginTop:28,}}>
     <Table1>
        <tr style={{backgroundColor: "#5B5B5B", color:"white"}}>
          <Th> </Th>
          <Th>LONGITUD</Th>
          <Th>CARRERA</Th>
          <Th>LL-G</Th>
          <Th>FUERZA</Th>
          <Th>ESFUERZO</Th>
          <Th>%COMPRES.</Th>
        </tr>
        <tr>
          <Th2>L instalada</Th2>
          <Td>123</Td>
          <Td>234</Td>
          <Td>345</Td>
          <Td>456</Td>
          <Td>567</Td>
          <Td>678</Td>
        </tr>
        <tr>
          <Th2>L carga</Th2>
          <Td>1</Td>
          <Td>2</Td>
          <Td>3</Td>
          <Td>4</Td>
          <Td>5</Td>
          <Td>6</Td>
        </tr>
        <tr>
          <Th2>L maxima</Th2>
          <Td>1</Td>
          <Td>2</Td>
          <Td>3</Td>
          <Td>4</Td>
          <Td>5</Td>
          <Td>6</Td>
        </tr>
        <tr>
          <Th2>L4</Th2>
          <Td>1</Td>
          <Td>2</Td>
          <Td>3</Td>
          <Td>4</Td>
          <Td>5</Td>
          <Td>6</Td>
        </tr>
        <tr>
          <Th2>L bloqueo</Th2>
          <Td>1</Td>
          <Td>2</Td>
          <Td>3</Td>
          <Td>4</Td>
          <Td>5</Td>
          <Td>6</Td>
        </tr>
      </Table1> 
      

      <div>
        <div style={{display:"flex", justifyContent:"center",paddingTop:94,}}>
          <Table2 >
                <tr style={{height:30,backgroundColor: "#5B5B5B", color:"white"}}>
                  <th> F </th>
                  <th> L </th>
                  <th> d </th>
                </tr>
                <tr>
                  <Td>123</Td>
                  <Td></Td>
                  <Td></Td>
                </tr>
                <tr>
                  <Td>123</Td>
                  <Td></Td>
                  <Td></Td>
                </tr>
                <tr>
                  <Td>123</Td>
                  <Td></Td>
                  <Td></Td>
                </tr>
                <tr>
                  <Td>123</Td>
                  <Td></Td>
                  <Td></Td>
                </tr>
                <tr>
                  <Td>123</Td>
                  <Td></Td>
                  <Td></Td>
                </tr>
                <tr>
                  <Td>123</Td>
                  <Td></Td>
                  <Td></Td>
                </tr>

            </Table2>
        </div>
        
        
        <DivSimul> 
            <Paragraph style={{width: 480}}>Calculos reales</Paragraph>
            <Div>
                <Label>K</Label>
                <Input  value={data4.K} id={"K"} onChange={(e) => handleInput4(e)}/>
            </Div>
            <Div>
                <Label>F</Label>
                <Input  value={data4.F} id={"F"} onChange={(e) => handleInput4(e)}/>
            </Div>
            <Div>
                <Label>L</Label>
                <Input  value={data4.L} id={"L"} onChange={(e) => handleInput4(e)}/>
            </Div>
          </DivSimul>

      </div>
      
    
    </div> 

      

   </div>   
  );
}

export default App;
/*
{
  <InputDiv data={data.alambre} nombre={"alambre2"} onChange={(e) => handleInput(e)}/>
} */



