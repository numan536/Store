
import { reactive, provide, inject, ref } from 'vue';
import { PsProvider } from '../core/PsProvider';
import PsApiService from '@/api/PsApiService';
import PsResource from '@/api/common/PsResource';
import BuildType from '@/object/BuildType';

export class BuildTypeProvider extends PsProvider {

    buildTypeList = reactive<PsResource<BuildType[]>>(new PsResource());
    isNoMoreRecord = reactive<Boolean>(false);
    loading = reactive({ 
        value: false
    });

    limit: Number = 30;
    offset: Number = 0;

    private updateBuildTypeList(responseData: PsResource<BuildType[]>) {

        if (this.buildTypeList != null
            && this.buildTypeList.data != null
            && this.buildTypeList.data.length > 0
            && this.offset != 0) {

            if (responseData.data != null && responseData.data.length > 0) {
                this.buildTypeList.data.push(...responseData.data);
            }else{
                this.isNoMoreRecord = true;
            }

            this.buildTypeList.code = responseData.code;
            this.buildTypeList.status = responseData.status;
            this.buildTypeList.message = responseData.message;

        } else {

            this.buildTypeList = responseData;


        }

        if (this.buildTypeList != null && this.buildTypeList.data != null) {
            this.offset = this.buildTypeList.data.length;
        }

    }

    async loadBuildTypeList() {

        this.loading.value = true;

        const responseData = await PsApiService.getItemBuildTypeList<BuildType>(new BuildType(), this.limit, this.offset);

        this.updateBuildTypeList(responseData);

        this.loading.value = false;

    }

    async resetBuildTypeList() {

        this.offset = 0;

        this.loading.value = true;

        const responseData = await PsApiService.getItemBuildTypeList<BuildType>(new BuildType(), this.limit, this.offset);

        this.updateBuildTypeList(responseData);

        this.loading.value = false;

    }

}

export const buildTypeProviderSymbol = Symbol('BuildTypeProvider')
export const createBuildTypeProviderState = () => {
    return reactive(new BuildTypeProvider())
}

export const useBuildTypeProviderState = () => inject(buildTypeProviderSymbol) as BuildTypeProvider
export const provideBuildTypeProviderState = () => provide(
    buildTypeProviderSymbol,
    createBuildTypeProviderState()
)