export interface IRestaurant {
    id: number,
    name: string,
    rating: number,
    location: string,
    approxPrice: number,
    imageUrl: string,
    isVegRest: boolean,
    isOffersAvl: boolean,
    deliveryTime: number,
    items: IItem[]

}

export interface IItem {
    itemId: number,
    id: number,
    name: string,
    description: string,
    price: number,
    imageUrl: string,
    bestSeller: boolean,
    type: string
}