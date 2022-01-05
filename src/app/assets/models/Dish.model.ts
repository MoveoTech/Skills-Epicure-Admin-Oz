import { IRestaurant } from "."

export default interface IDish {
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
