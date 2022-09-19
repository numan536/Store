import { reactive, provide, inject } from 'vue';
import { PsProvider } from '../core/PsProvider';
import PsApiService from '@/api/PsApiService';
import Model from '@/object/Model';
import PsResource from '@/api/common/PsResource';
import ModelListParameterHolder from '@/object/holder/ModelListParameterHolder';

export class ModelProvider extends PsProvider {
    
    isNoMoreRecord = reactive<Boolean>(false);
    modelList = reactive<PsResource<Model[]>>(new PsResource());
    manufacturerId = '';
    loading = reactive({
        value : false
    });

    limit: Number = 30;
    offset: Number = 0;

    paramHolder = reactive<ModelListParameterHolder>(new ModelListParameterHolder().ModelListParameterHolder());
    
    private updateModelList(responseData : PsResource<Model[]>) {
        
        if(this.modelList != null 
            && this.modelList.data != null 
            && this.modelList.data.length > 0
            && this.offset != 0) {

            if(responseData.data != null && responseData.data.length > 0) {
                this.modelList.data.push(...responseData.data);
            }else {
                this.isNoMoreRecord = true;
            }

            this.modelList.code = responseData.code;
            this.modelList.status = responseData.status;
            this.modelList.message = responseData.message;            

        }else {
            
            this.modelList = responseData;
            
        }

        if(this.modelList != null && this.modelList.data != null ) {
            this.offset = this.modelList.data.length;
        }

    }

    async loadModelList(manufacturerId: string) {
        
        if(this.manufacturerId != manufacturerId) {
            this.modelList = reactive<PsResource<Model[]>>(new PsResource());
            this.offset = 0;
        }

        this.manufacturerId = manufacturerId.toString();
        this.loading.value = true;
        const responseData = await PsApiService.getAllModelList<Model>(new Model(), this.manufacturerId,this.limit, this.offset);
        this.loading.value = false;
        this.updateModelList(responseData);

        
    }

    async resetModelList(manufacturerId: string) {
        
        if(this.manufacturerId != manufacturerId) {
            this.modelList = new PsResource();
        }

        this.offset = 0;
        this.manufacturerId = manufacturerId.toString();
        this.loading.value = true;
        const responseData = await PsApiService.getAllModelList<Model>(new Model(), this.manufacturerId,this.limit, this.offset);
        this.updateModelList(responseData);
        this.loading.value = false;
        
    }
    filtermodelUpdate(loginUserId:string,holder: ModelListParameterHolder) {
        this.resetSearchModelList(loginUserId,holder);
    }

    async resetSearchModelList(loginUserId:string,holder: ModelListParameterHolder) {
        
        this.offset = 0;
        this.loading.value = true;
        const responseData = await PsApiService.searchModelList<Model>(new Model(), loginUserId, this.limit, this.offset, holder.toMap());
        this.updateModelList(responseData);
        this.loading.value = false;
        
    }
    
}

export const modelProviderSymbol = Symbol('ModelProvider')
export const createModelProviderState = () => {
  return reactive(new ModelProvider())
}

export const useModelProviderState = () => inject(modelProviderSymbol) as ModelProvider
export const provideModelProviderState = () => provide(
    modelProviderSymbol,
    createModelProviderState()
)