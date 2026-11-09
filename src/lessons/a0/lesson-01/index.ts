import type {Lesson} from '../../types.js';
import {apartmentPricingModel} from "../../../server";
import {predictPrice} from "../../../ml/pricing/predictPrice";

type LessonRequest = {
    area: number;
}

type LessonResponse = {
    area?: number;
    predictedPrice?: number;
    errorStatus?: number;
    error?: string;
}

export const lesson: Lesson<LessonRequest, LessonResponse> = {
    id: 'a0/lesson-01',
    level: 'a0',
    title: 'Predict apartment price by area',
    description: 'Simple ML model which predicts price by area of apartment',

    execute(payload: LessonRequest): LessonResponse {
        if (apartmentPricingModel === undefined) {
            return {errorStatus: 500, error: 'Pricing model is not trained / exists'}
        }

        const area = payload.area;

        if (typeof area !== 'number' || !Number.isFinite(area) || area <= 0) {
            return {errorStatus: 400, error: 'Invalid area'}
        }

        const predictedPrice = predictPrice(area, apartmentPricingModel);

        return {
            predictedPrice: +predictedPrice.toFixed(2)
        };
    },
};
