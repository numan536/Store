
import { reactive, provide, inject, ref } from 'vue';
import { PsProvider } from '../core/PsProvider';
import PsApiService from '@/api/PsApiService';
import PsResource from '@/api/common/PsResource';
import FuelType from '@/object/FuelType';

export class FuelTypeProvider extends PsProvider {

    fuelTypeList = reactive<PsResource<FuelType[]>>(new PsResource());
    isNoMoreRecord = reactive<Boolean>(false);
    loading = reactive({ 
        value: false
    });

    limit: Number = 30;
    offset: Number = 0;

    private updateFuelTypeList(responseData: PsResource<FuelType[]>) {

        if (this.fuelTypeList != null
            && this.fuelTypeList.data != null
            && this.fuelTypeList.data.length > 0
            && this.offset != 0) {

            if (responseData.data != null && responseData.data.length > 0) {
                this.fuelTypeList.data.push(...responseData.data);
            }else {
                this.isNoMoreRecord = true;
            }

            this.fuelTypeList.code = responseData.code;
            this.fuelTypeList.status = responseData.status;
            this.fuelTypeList.message = responseData.message;

        } else {

            this.fuelTypeList = responseData;


        }

        if (this.fuelTypeList != null && this.fuelTypeList.data != null) {
            this.offset = this.fuelTypeList.data.length;
        }

    }

    async loadFuelTypeList() {

        this.loading.value = true;

        const responseData = await PsApiService.getItemFuelTypeList<FuelType>(new FuelType(), this.limit, this.offset);

        this.updateFuelTypeList(responseData);

        this.loading.value = false;

    }

    async resetFuelTypeList() {

        this.offset = 0;

        this.loading.value = true;

        const responseData = await PsApiService.getItemFuelTypeList<FuelType>(new FuelType(), this.limit, this.offset);

        this.updateFuelTypeList(responseData);

        this.loading.value = false;

    }

}

export const fuelTypeProviderSymbol = Symbol('FuelTypeProvider')
export const createFuelTypeProviderState = () => {
    return reactive(new FuelTypeProvider())
}

export const useFuelTypeProviderState = () => inject(fuelTypeProviderSymbol) as FuelTypeProvider
export const provideFuelTypeProviderState = () => provide(
    fuelTypeProviderSymbol,
    createFuelTypeProviderState()
)