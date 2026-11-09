import {Apartment} from "./dataset";

export type ApartmentPricingModel = {
    weight: number;
    bias: number;
}

export const trainModel = (data: Apartment[], epochs = 10000, learningRate =  0.1): ApartmentPricingModel => {
    let weight = 0;
    let bias = 0;

    for (let epoch = 0; epoch < epochs; epoch++) {
        let dw = 0;
        let db = 0;

        for (const apartment of data) {
            const x = apartment.area / 100;
            const y = apartment.price;

            const prediction = weight * x + bias;
            const error = prediction - y;

            dw += error * 2 * x;
            db += error * 2;
        }

        weight -= learningRate * dw / data.length;
        bias -= learningRate * db / data.length;
    }

    return {weight, bias};
}