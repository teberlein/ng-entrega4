import {v4 as uuid} from 'uuid';


export class DestinoViaje {
    id = uuid();
    /* private selected: boolean = false; */
    servicios: String[];
    constructor(public nombre: string, public url: string, public selected: boolean, public votes: number = 0) {
        this.servicios = ['pileta', 'desayuno'];
    }
    public voteUp() {
        this.votes++;
    }
    public setSelected(value: boolean) {
        this.selected = value;
    }
    public voteDown() {
        this.votes--;
    }
    public voteReset() {
        this.votes = 0
    }
}