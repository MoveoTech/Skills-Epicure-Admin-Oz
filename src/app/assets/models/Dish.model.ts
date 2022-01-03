import { IRestaurant } from "."

export interface IDish {
    _id: string,
    name: string;
    restaurant: IRestaurant
    imageUrl: string;
    components: string;
    type: { _id: string, value: string }[];
    price: number;
    signatureDish:boolean;
    deleted:boolean;
}

//change to array of objects
// export DishType {
//     Spicy: 'Spicy',
//     Vegan, 'Vegan',
//     Vegetarian: 'Vegetarian',
// }

export enum DishType {
    Spicy = "Spicy",
    Vegan = "Vegan",
    Vegetarian = "Vegetarian",
}