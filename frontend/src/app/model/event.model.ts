export interface IEvent {    
    id: number;
    name: string;
    address: string;
    city: string;
    province: string;
    country: string;
    date: string;
    startTime: string;
    endTime: string;
    location: string;
    artist: string;
    description: string;
    image: string;
}

export class Event {
    public id: number;
    public name: string;
    public address: string;
    public city: string;
    public province: string;
    public country: string;
    public date: string;
    public startTime: string;
    public endTime: string;
    public location: string;
    public artist: string;
    public description: string;
    public image: string;

    constructor();
    constructor(obj: IEvent); 
    constructor(obj?: any) {
        this.id = obj && obj.id || 0;
        this.name = obj && obj.name || "";
        this.address = obj && obj.address || "";
        this.city = obj && obj.city || "";
        this.province = obj && obj.province || "";
        this.country = obj && obj.country || "";
        this.date = obj && obj.date || "";
        this.startTime = obj && obj.startTime || "";
        this.endTime = obj && obj.endTime || "";
        this.location = obj && obj.location || "";
        this.artist = obj && obj.artist || "";
        this.description = obj && obj.description || "";
        this.image = obj && obj.image || "";
    }
}
