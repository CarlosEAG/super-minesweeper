import { useGameContext } from "../hooks/useGameContext";

export const Timer = () => {
    const {time:{ellapsed, hours, minutes, seconds, milliseconds}} = useGameContext();

    return <div>
    {ellapsed}
    <div>
        {`${hours <10 ? '0' : ''}${hours}`}
    </div>
    <div>
        {`${minutes <10 ? '0' : ''}${minutes}`}
    </div>
    <div>
        {`${seconds <10 ? '0' : ''}${seconds}`}
    </div>
    <div>
        {`${milliseconds <10 ? '0' : ''}${milliseconds/10 >> 0}`}
    </div>
</div>
}