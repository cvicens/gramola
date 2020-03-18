
export class Event {
    constructor(
        public id: number,
        public name: string,
        public address: string,
        public city: string,
        public province: string,
        public country: string,
        public date: string,
        public startTime: string,
        public endTime: string,
        public location: string,
        public artist: string,
        public description: string,
        public image: string) { }
}
