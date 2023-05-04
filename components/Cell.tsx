
type propsCell = {
    onCellClick:Function,
    cellStyle:string,
    value:string
}

export default function Cell(props:propsCell){
    return(
        <div onClick={e=>props.onCellClick()} className={props.cellStyle}>
            {props.value}
        </div>
    )
}