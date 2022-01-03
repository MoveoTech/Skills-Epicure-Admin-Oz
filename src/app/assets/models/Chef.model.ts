

export default interface IChef {
    _id:string,
    name: string;
    info?: string;
    imageUrl?:string;
    chefOfTheWeek:boolean;
    deleted:boolean;
}