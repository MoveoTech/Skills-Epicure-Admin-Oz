import {IChef} from "."

export default interface IRestaurant {
    _id:string,
    name: string;
    chef:IChef;
    imageUrl: string;
    popularRestaurant: boolean;
    deleted:boolean;
}