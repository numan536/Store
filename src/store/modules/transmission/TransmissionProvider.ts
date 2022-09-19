
import { reactive, provide, inject, ref } from 'vue';
import { PsProvider } from '../core/PsProvider';
import PsApiService from '@/api/PsApiService';
import PsResource from '@/api/common/PsResource';
import Transmission from '@/object/Transmission';

export class TransmissionProvider extends PsProvider {

    transmissionList = reactive<PsResource<Transmission[]>>(new PsResource());

    loading = reactive({ 
        value: false
    });
    isNoMoreRecord = reactive<Boolean>(false);

    limit: Number = 30;
    offset: Number = 0;

    private updateTransmissionList(responseData: PsResource<Transmission[]>) {

        if (this.transmissionList != null
            && this.transmissionList.data != null
            && this.transmissionList.data.length > 0
            && this.offset != 0) {

            if (responseData.data != null && responseData.data.length > 0) {
                this.transmissionList.data.push(...responseData.data);
            }else {
                this.isNoMoreRecord = true;
            }

            this.transmissionList.code = responseData.code;
            this.transmissionList.status = responseData.status;
            this.transmissionList.message = responseData.message;

        } else {

            this.transmissionList = responseData;


        }

        if (this.transmissionList != null && this.transmissionList.data != null) {
            this.offset = this.transmissionList.data.length;
        }

    }

    async loadTransmissionList() {

        this.loading.value = true;

        const responseData = await PsApiService.getTransmissionList<Transmission>(new Transmission(), this.limit, this.offset);

        this.updateTransmissionList(responseData);

        this.loading.value = false;

    }

    async resetTransmissionList() {

        this.offset = 0;

        this.loading.value = true;

        const responseData = await PsApiService.getTransmissionList<Transmission>(new Transmission(), this.limit, this.offset);

        this.updateTransmissionList(responseData);

        this.loading.value = false;

    }

}

export const transmissionProviderSymbol = Symbol('TransmissionProvider')
export const createTransmissionProviderState = () => {
    return reactive(new TransmissionProvider())
}

export const useTransmissionProviderState = () => inject(transmissionProviderSymbol) as TransmissionProvider
export const provideTransmissionProviderState = () => provide(
    transmissionProviderSymbol,
    createTransmissionProviderState()
)