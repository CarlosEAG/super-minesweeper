import { useGameContext } from "../hooks/useGameContext"

export const Smiley = () => {
    const {init} = useGameContext();
    const handleClick=()=>{
        init();
    }
    return <div 
    style={{width:100,height:100,backgroundColor:'red'}}
    onClick={handleClick}
    >
        {":)"}
    </div>
}