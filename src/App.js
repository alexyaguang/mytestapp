
import './App.css';
import styled from 'styled-components';
import React,{useState} from 'react';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

let target=["","","","","",""]
const theme = {
  blue:{
    default:'#3f51b5',
      hover:'#283593'
  },
  pink:{
    default:'#e91e63',
    hover:'#ad1457'
  }
}
const Button = styled.button`
  background-color:${props => theme[props.theme].default};
  color: white;
  margin:10px 0px;
  padding: 5px 15px;
  border-radius: 5px;
  outline:0;
  box-shadow: 0px 2px 2px lightgray;
  text-transform:uppercase;
  cursor:pointer;
  transition: ease background-color 250ms;
  &:hover{
    background-color:${props => theme[props.theme].hover};
  }
    &:disabled {
    cursor:default;
    opacity: 0.7;
  }
`;
Button.defaultProps={
  theme:'blue'
}
var allLayers=[1,2,3]
var layers=[]

const ButtonToggle = styled(Button)`
opacity:0.7;
${({active})=> active && `
  opacity:1
  `}
`
var lines=[{warehouse:'A',line:["A","B","C","D","E"]},{warehouse:'B',line:["A","B","C","D","E","F"]},{warehouse:'C',line:["A","B","C","D","E","F","G"]}]
var position=[]
for (let i = 1; i < 25; i++) {
  position.push(i)
}

const types=['A','B','C'];


const Tab = styled.button`
  padding:10px 60px;
  cursor:pointer;
  opacity: 0.6;
  background:white;
  border:0;
  outline:0;
  height:40px;
  border-bottom:2px solid transparent;
  transition: ease border-bottom 250ms;
  ${({active})=>
    active &&
    `
    border-bottom: 2px solid black;
    opacity:1;
  `}
`;
var res=[]
var pos=[];
function myfunction(temp){
  for (var i=0;i<lines.length;i++){
     if(lines[i].warehouse==temp){
       res=lines[i].line;
       break;
     }
  }
  ;
}
function showpos(){
  if (target[1]!=""){
    pos=position;
  }else{
    pos=[]
  }
}
function showLayers(){
  if (target[2]!=""){
    layers=allLayers;
  }else{
    layers=[]
  }
}
function ToggleGroup(){
  const [active,setActive]=useState(res[0])
  return <div>
    {res.map(type=>(
      <ButtonToggle
      active = {active ===type}
      onClick = {() => {setActive(type);target[1]=type;console.log(target);showpos();}}
      >
        {type}
      </ButtonToggle>

    ))}
    <ToggleGroup_2/>
    <p></p>
  </div>
}

function ToggleGroup_2(){
  
  const [active,setActive]=useState(pos[0])
  return <div>
    {
      pos.map(po=>(
        <ButtonToggle
        active = {active ===po}
        onClick = {() => {setActive(po);target[2]=po;console.log(target);showLayers()}}
        >

          {po}
        </ButtonToggle>
        
      ))
      
    }
    <ToggleGroup_3/>
  </div>
}

const getInputSKU = (event)=>{
  // show the user input value to console
  target[4] = event.target.value;

  console.log(target);
};
const getInputNumber = (event)=>{
  // show the user input value to console
  target[5] = event.target.value;

  console.log(target);
};
function ToggleGroup_3(){
  
  const [active,setActive]=useState(layers[0])
  return <div>
        <h1>Layers</h1>
    {
      layers.map(layer=>(
        <ButtonToggle
        active = {active ===layer}
        onClick = {() => {setActive(layer);target[3]=layer;}}
        >

          {layer}
        </ButtonToggle>
        
      ))
    }
        <form>

 
</form>
  </div>
}

function TabGroup(){
  const [active,setActive] = useState(types[0]);
  return (
    <>
    <h1>Warehouse</h1>
    <div>
      {types.map(type =>(
        <Tab
          key={type}
          active={active === type}
          onClick={()=>{setActive(type);target[0]=type;myfunction(type)}}
        >
          {type}
        </Tab>
      ))}
    </div>
    <p />
    <h1>Lines</h1>
    <ToggleGroup/>




    
    </>
  );
}

var customer = [{Client:'A13',Prefix:["HM","MB"]},{Client:'ZPU',Prefix:["AMT","GW","WJ","AWW","ARX","ARP"]},{Client:'A012',Prefix:["ASIM","ASIA","AAFR","ACAC"]}]
var customers=["A13","ZPU","A012"]
var currentClient=[]
var item=["",""]
var txt = target+item



function myfunctionItem(temp){
  for (var i=0;i<customer.length;i++){
     if(customer[i].Client==temp){
       currentClient=customer[i].Prefix;
       break;
     }
  }
  ;
}
function ItemToggleGroup(){
  const [active,setActive]=useState(currentClient[0])
  return <div>
    {currentClient.map(type=>(
      <ButtonToggle
      active = {active ===type}
      onClick = {() => {setActive(type);item[1]=type;console.log(target+item);showpos();}}
      >
        {type}
      </ButtonToggle>

    ))}
    <p></p>
  </div>
  
}

function ItemGroup(){
  const [active,setActive] = useState(customers[0]);
  return (
    <>
    <h1>Client</h1>
    <div>
      {customers.map(cust =>(
        <Tab
          key={cust}
          active={active === cust}
          onClick={()=>{setActive(cust);item[0]=cust;myfunctionItem(cust);console.log(currentClient)}}
        >
          {cust}
        </Tab>
      ))}
    </div>
    <p />
    <h1>Prefix</h1>
    
    <ItemToggleGroup/>

    
    </>
  );
}
class SubmitData extends React.Component {
  submit = () => {
    confirmAlert({
      title: 'Confirm to submit',
      message: target+item,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {alert('Data Submit')}
        },
        {
          label: 'No',
          onClick: () => {alert('Cache Clear');;target=["","","","","",""];item=["",""]}
        }
      ]
    });
  };

  render() {
    return (
      <div className='container'>
        <button onClick={this.submit}>Confirm dialog</button>
      </div>
    );
  }
}


function App() {
  return (
    <>
    
    <a href="https://www.google.ca" target="_blank">
      <Button>link</Button>
    </a>

    <TabGroup />
    
    <ItemGroup />
    
    <SubmitData/>
    </>  
  );
}

export default App;
