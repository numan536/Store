import { reactive, provide, inject } from 'vue';
import { PsProvider } from '../core/PsProvider';
import PsApiService from '@/api/PsApiService';
import ModelScribeParameterHolder from '@/object/holder/ModelScribeParameterHolder';
import ApiStatus from '@/object/ApiStatus';

export class ModelScribeProvider extends PsProvider {
    
    loading = reactive({
        value : false
    });

    async modelScription(holder: ModelScribeParameterHolder) {
  
        this.loading.value = true;

        const status = await PsApiService.postModelScribe<ApiStatus>(new ApiStatus(), holder.toMap());
        
        
        this.loading.value = false;

        return status;
    }
}

export const modelScribeProviderSymbol = Symbol('ModelProvider')
export const createModelScribeProviderState = () => {
  return reactive(new ModelScribeProvider())
}

export const useModelScribeProviderState = () => inject(modelScribeProviderSymbol) as ModelScribeProvider
export const provideModelScribeProviderState = () => provide(
    modelScribeProviderSymbol,
    createModelScribeProviderState()
)