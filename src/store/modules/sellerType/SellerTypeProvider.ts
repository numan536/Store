
import { reactive, provide, inject, ref } from 'vue';
import { PsProvider } from '../core/PsProvider';
import PsApiService from '@/api/PsApiService';
import PsResource from '@/api/common/PsResource';
import SellerType from '@/object/SellerType';

export class SellerTypeProvider extends PsProvider {

    sellerTypeList = reactive<PsResource<SellerType[]>>(new PsResource());

    loading = reactive({ 
        value: false
    });
    isNoMoreRecord = reactive<Boolean>(false);

    limit: Number = 30;
    offset: Number = 0;

    private updateSellerTypeList(responseData: PsResource<SellerType[]>) {

        if (this.sellerTypeList != null
            && this.sellerTypeList.data != null
            && this.sellerTypeList.data.length > 0
            && this.offset != 0) {

            if (responseData.data != null && responseData.data.length > 0) {
                this.sellerTypeList.data.push(...responseData.data);
            }else {
                this.isNoMoreRecord = true;
            }

            this.sellerTypeList.code = responseData.code;
            this.sellerTypeList.status = responseData.status;
            this.sellerTypeList.message = responseData.message;

        } else {

            this.sellerTypeList = responseData;


        }

        if (this.sellerTypeList != null && this.sellerTypeList.data != null) {
            this.offset = this.sellerTypeList.data.length;
        }

    }

    async loadSellerTypeList() {

        this.loading.value = true;

        const responseData = await PsApiService.getItemSellerTypeList<SellerType>(new SellerType(), this.limit, this.offset);

        this.updateSellerTypeList(responseData);

        this.loading.value = false;

    }

    async resetSellerTypeList() {

        this.offset = 0;

        this.loading.value = true;

        const responseData = await PsApiService.getItemSellerTypeList<SellerType>(new SellerType(), this.limit, this.offset);

        this.updateSellerTypeList(responseData);

        this.loading.value = false;

    }

}

export const sellerTypeProviderSymbol = Symbol('SellerTypeProvider')
export const createSellerTypeProviderState = () => {
    return reactive(new SellerTypeProvider())
}

export const useSellerTypeProviderState = () => inject(sellerTypeProviderSymbol) as SellerTypeProvider
export const provideSellerTypeProviderState = () => provide(
    sellerTypeProviderSymbol,
    createSellerTypeProviderState()
)