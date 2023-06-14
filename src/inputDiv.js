import styled from "@emotion/styled";

const Input = styled.input`
  width:80px;
  background-color:black;
  color: gray;
  margin:5px;
  text-align: center;
  border:none;
`
const Div = styled.div`
  display:block;
  height:45px;
  width:180px;
  background-color:black;
  justify-content:center;
  display:flex;
  align-items: center;
  justify-content: space-evenly;
  border: 3px solid gray;
  border-radius: 10px;
`

const Label = styled.label`
  color: white;
  margin: 5px;
  height:25px;
  display: block;
  width: 40px;
  background-color:black;
  line-height: 25px;
`
export default function InputDiv({data, nombre}){
  console.log("hey")
    return(
        <Div>
            <Label>{nombre}</Label>
            <Input value={data} id={nombre}/>
        </Div>
    )
  }