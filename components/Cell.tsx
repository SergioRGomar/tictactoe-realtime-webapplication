
export default function Cell(props:any){
    return(
        <div onClick={props.onCellClick} className={props.cellStyle}>
            {props.value}
        </div>
    )
}