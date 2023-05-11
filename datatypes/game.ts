type objGame =  {
    _id:string,
    board:Array<string>,
    player_1:object,
    player_2:object, 
    turn:string,
    status:string,
    date:object,
    movements:number,
    winner:object,
    result:string
}

type objUserData = {
    _id:string,
    email:string,
    victories:number,
    defeats:number, 
    draws:number,
    total_games:number,
    status:string
  }
  
 