import { reactive, provide, inject } from 'vue';
import { PsProvider } from '../core/PsProvider';
import ManufacturerListParameterHolder from '@/object/holder/ManufacturerListParameterHolder';
import PsApiService from '@/api/PsApiService';
import Manufacturer from '@/object/Manufacturer';
import PsResource from '@/api/common/PsResource';

export class ManufacturerProvider extends PsProvider {

    isNoMoreRecord = reactive<Boolean>(false);
    itemList = reactive<PsResource<Manufacturer[]>>(new PsResource());
    item = reactive<PsResource<Manufacturer>>(new PsResource());
    loading = reactive({
        value: false
    });

    limit: Number = 30;
    offset: Number = 0;

    id: string = "";
    paramHolder = reactive<ManufacturerListParameterHolder>(new ManufacturerListParameterHolder().ManufacturerListParameterHolder());

    private updateManufacturerList(responseData: PsResource<Manufacturer[]>) {

        if (this.itemList != null
            && this.itemList.data != null
            && this.itemList.data.length > 0
            && this.offset != 0) {

            if (responseData.data != null && responseData.data.length > 0) {
                this.itemList.data.push(...responseData.data);
            }else {
                this.isNoMoreRecord = true;
            }
            this.itemList.code = responseData.code;
            this.itemList.status = responseData.status;
            this.itemList.message = responseData.message;

        } else {

            this.itemList = responseData;

        }

        if (this.itemList != null && this.itemList.data != null) {
            this.offset = this.itemList.data.length;
        }

    }

    async loadItemList(loginUserId:string, holder: ManufacturerListParameterHolder) {

        this.loading.value = true;
       
        const responseData = await PsApiService.getManufacturerList<Manufacturer>(new Manufacturer(), this.limit, this.offset, loginUserId, holder.toMap());
       
        this.updateManufacturerList(responseData);

        this.loading.value = false;


    }

    async resetManufacturerList(loginUserId:string,holder: ManufacturerListParameterHolder) {

        this.offset = 0;

        this.loading.value = true;
        console.log(holder);

        const responseData = await PsApiService.getManufacturerList<Manufacturer>(new Manufacturer(), this.limit, this.offset, loginUserId, holder.toMap());
      
        this.updateManufacturerList(responseData);

        console.log(responseData);
        console.log(this.itemList);


        this.loading.value = false;

    }

}

export const manufacturerProviderSymbol = Symbol('ManufacturerProvider')
export const createManufacturerProviderState = () => {
    return reactive(new ManufacturerProvider())
}

export const useManufacturerProviderState = () => inject(manufacturerProviderSymbol) as ManufacturerProvider
export const provideManufacturerProviderState = () => provide(
    manufacturerProviderSymbol,
    createManufacturerProviderState() 
)