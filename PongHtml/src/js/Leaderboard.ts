import axios, {AxiosResponse, AxiosError} from "../../node_modules/axios/index";

interface User{
    id:number
    brugernavn:string
    wins: number
    loses: number
    aI_Wins: number
    aI_Loses: number
}

export class LeaderBoard{

    public leaderBoard: HTMLTableElement;
    public uri: string = "https://ponghighscorewebservice.azurewebsites.net/api/bruger";

constructor(){
    this.leaderBoard = document.getElementById('Leaderboard') as HTMLTableElement;
    this.onload();
}
    private onload() {
        axios.get<User[]>(this.uri)
        .then((response:AxiosResponse<User[]>):void => 
        {
           let listOfUser: User[];
            listOfUser = response.data;
            listOfUser.sort((a, b)=>{
                if((a.wins / a.loses) > (b.wins / b.loses))
                    return -1;
                
                if((a.wins / a.loses) < (b.wins / b.loses))
                    return 1;
                return 0;
                }
            )
            listOfUser.forEach(listUser => {
                this.insertIntoTable(listUser);
            })
        })
        .catch((error:AxiosError):void => {
        })
    }

    private insertIntoTable(user: User){
        let newRow = this.leaderBoard.insertRow(-1);
        let iDCell = newRow.insertCell(0);
        let usernameCell = newRow.insertCell(1);
        let wDR = newRow.insertCell(2);
        iDCell.appendChild(document.createTextNode(user.id.toString()));
        iDCell.setAttribute('class', 'ProfileStats');
        usernameCell.appendChild(document.createTextNode(user.brugernavn));
        usernameCell.setAttribute('class', 'ProfileStats');
        wDR.appendChild(document.createTextNode((user.wins / user.loses).toFixed(2).toString()));
        wDR.setAttribute('class', 'ProfileStats');
    }
}