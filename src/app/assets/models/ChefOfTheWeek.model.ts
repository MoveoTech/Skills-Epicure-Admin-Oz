import { IChef, IRestaurant } from ".";

export default interface IChefOfTheWeek {
    chef: IChef,
    restaurants: IRestaurant[]
}