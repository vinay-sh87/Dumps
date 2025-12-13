

export default function Button({count,setCount}){
    return (
        <>

        <button onClick={()=>setCount(++count)}>Count : {count}</button>
        
        </>
    )
}