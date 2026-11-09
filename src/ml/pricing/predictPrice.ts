import {ApartmentPricingModel} from "./training-price-model";

export const predictPrice = (area: number, model: ApartmentPricingModel) => {
    const x = area / 100;
    return model.weight * x + model.bias;
}