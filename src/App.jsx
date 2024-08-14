import { useState,useCallback,useEffect,useRef } from "react";

function App() {
  const[length,setLength]=useState(8)
  const[number,setNumber]=useState(false)
  const[charAllowed,setCharAllowed]=useState(false)
  const[password,setPasword]=useState("")

  const passwordGenerator = useCallback( ()=>{
    let pass=""
    let str="ALCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(number)str+="01234567890123456789"
    if(charAllowed)str+="@!#$&@!#$&*"

    for (let i = 1; i <=length; i++){
      let char=Math.floor(Math.random()*str.length+1)
      pass += str.charAt(char)
    }
    setPasword(pass)
  },[length,number,charAllowed,setPasword])

  useEffect(()=>{
    passwordGenerator()
  },[length,number,charAllowed,passwordGenerator] )

  const copyPasswordToClipBoard=useCallback(()=>{
    passwordRef.current?.select()
    // passwordRef.current?.setSelectionRange(0,9)        ==>>  use to select by range;
    window.navigator.clipboard.writeText(password)
  },[password] )

  //useRef Hook to use Copy click button;
  const passwordRef=useRef(null)

  return (
   
   <>
   <div className="w-full max-w-md mx-auto shadow-md rounded-lg 
   px-4 my-8 text-orange-500 bg-slate-500 place-items-center "> 
   <h1 className="text-center">Password Generator</h1>
    <div className="className='flex shadow rounded-lgoverflow-hidden mb-4'">
      <input type="text"
      value={password} 
      className="outline-none w0full py-1 px-3"
      placeholder="password"
      readOnly ref={passwordRef}/>

      <button onClick={copyPasswordToClipBoard}
      className="outline-none bg-blue-700 text-white
      px-3 py-0.5 shrink-0">COPY</button>
      
      </div> 

      <div className="flex text-sm gap-x-2">
        <div className="flex item-center gap-x-1">
          <input type="range"  min={6}
           max={100} value={length} className="cursor-pointer"
           onChange={(e)=>{setLength(e.target.value) } }/>
           <label>Length:{length}</label>
        </div>

        <div className="flex item-center gap-x-1">
          <input type="checkbox" defaultChecked={number} id="numberInput"
           onChange={()=>{ setNumber((prev) => !prev); } }/>
         <label>NUMBERS</label>
        </div>

        <div className="flex item-center gap-x-1">
          <input type="checkbox" defaultChecked={charAllowed} id="charInput"
           onChange={()=>{ setCharAllowed((prev) => !prev); } }/>
         <label>Character</label>
        </div>
      </div>
   </div>
   
   </>
   
  );
}

export default App;

