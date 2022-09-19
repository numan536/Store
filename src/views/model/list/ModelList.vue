<template>
<div>
    <div class="sm:mt-32 lg:mt-36 mt-28 w-mobile sm:w-median lg:w-large mx-auto">
        <div class="  flex items-center mt-20"> 
            <ps-route-link
                :to="{name: 'dashboard'}"> 
                <ps-label textColor="text-secondary-400 dark:text-secondaryDark-grey "
                    class="hover:underline cursor-pointer font-medium text-xxs"> 
                            {{ $t("list__home") }}
                </ps-label>      
            </ps-route-link>
            
            <ps-icon name="rightArrow" class='text-secondary-400 dark:text-secondaryDark-grey mx-0 sm:mx-2'/>
            <ps-route-link :to="{name: 'manufacturer-list'}">
                <ps-label textColor="text-secondary-400 dark:text-secondaryDark-grey "
                    class="hover:underline cursor-pointer font-medium text-xxs"> 
                        {{ $t("model_list__manufacturer") }} 
                </ps-label>
            </ps-route-link>
            

            <ps-icon name="rightArrow" class='text-secondary-400 dark:text-secondaryDark-grey mx-0 sm:mx-2'/>

            <ps-label textColor="text-secondary-400 dark:text-secondaryDark-grey "
                    class="font-medium text-xxs"> {{ $t("model_list__model") }} </ps-label>
            
        </div>
        <!--Start search flex mobile and desktop -->
        <div class="pt-1 lg:flex md:flex lg:justify-between md:justify-between mb-2">
           
           <div class="flex mt-1 ">
                <ps-label-header-4 class="font-medium"> {{ $t("model_list__title") }} </ps-label-header-4>
                <div v-if="appInfoProvider?.appInfo?.data?.psAppSetting?.isSubcatSubscription == PsConst.ONE" class="ms-32 sm:hidden">                                
                    <ps-icon v-if="!scribe" class="ms-2 text-primary-500 dark:text-primaryDark-accent" @click="modelScribe" name="bell-plus" h="20" w="20"/>
                    <ps-icon v-if="scribe" class="ms-2 text-primary-500 dark:text-primaryDark-accent" name="checkbox-marked" @click="submitScribe" h="30" w="30"/>
                </div>
            </div>

            <div class="flex content-center items-center mt-1">   
                <div class="lg:w-68 lg:h-10 w-51 h-8">
                    <ps-input type="text" class="w-full lg:text-sm text-xs" name="search" v-bind:placeholder="$t('model_list__search')" v-on:keyup.enter="searchClicked" v-model:value="modelProvider.paramHolder.keyword" />
                </div>

                <!-- start keyword search -->
                <ps-dropdown align="left" class="ms-2 lg:w-31 lg:h-10 sm:w-22 sm:h-8">
                    <template #select>
                        <ps-label class=" h-full">
                            <button
                            type="button"
                            class="inline-flex items-center content-start justify-between w-full h-10
                            px-4  bg-primary-000 text-sm leading-5 font-medium text-secondary-500 
                            hover:text-secondary-400 focus:outline-none focus:border-blue-300 
                            focus:shadow-outline-blue active:bg-gray-100 active:text-secondary-600 transition 
                            ease-in-out duration-150 btn-focus
                            dark:bg-primaryDark-black dark:border-backgrounddark-500   "
                            aria-haspopup="true"
                            aria-expanded="true">
                            <font-awesome-icon :icon="['fas', 'filter']" class="text-sm  "  />
                            <ps-label class=" text-start text-xs sm:text-xxs lg:text-xs mx-2"> {{activeSortingName ? activeSortingName : 'Sorting'}} </ps-label>
                            <ps-icon textColor="text-secondary-400 dark:text-secondaryDark-grey" name="downArrow"   />
                            </button>
                        </ps-label>                      
                    </template>
                    <template #list >
                        <div class=" shadow-xs w-56 " >
                            <div class="pt-2 z-30">
                            
                                <div>
                                    <!-- <div class="w-72 flex py-4 px-2 hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer items-center"  
                                        @click="sortingFilterClicked({id:'', name:'Sorting'})" >
                                        <ps-label class="ms-2" :class="activeSortingId =='' ? ' font-medium' : 'font-light'"  > {{ $t("manufacturer_list__sorting") }}  </ps-label>
                                    </div> -->
                                    <div v-for="sort in currentsorting" :key="sort.id" 
                                        class="w-72 flex py-4 px-2 hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer items-center"  
                                            @click="sortingFilterClicked(sort)" >
                                        <ps-label class="ms-2" :class="sort.id==activeSortingId ? ' font-medium' : 'font-light'"  > {{sort.name}} </ps-label>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </template>
                </ps-dropdown>
                <!-- end keyword search -->
                <div v-if="appInfoProvider?.appInfo?.data?.psAppSetting?.isSubcatSubscription == PsConst.ONE" class="lg:block md:block hidden" >                                
                    <ps-icon v-if="!scribe" class="ms-2 text-primary-500 dark:text-primaryDark-accent" @click="modelScribe" name="bell-plus" h="20" w="20"/>
                    <ps-icon v-if="scribe" class="ms-2 text-primary-500 dark:text-primaryDark-accent" name="checkbox-marked" @click="submitScribe" h="30" w="30"/>
                </div>
            </div>
        </div>
        <!-- submanufacturer list -->
        <div class="flex flex-col ">
            <div class="flex flex-col items-start mt-2 ">
                <!-- <ps-route-link
                    :to="{name: 'item-list', 
                    query: { 
                    manufacturer_id: manufacturerId, 
                    manufacturer_name: manufacturerName } }"> 
                    <ps-label-header-4  
                    class="hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer border border-primary-500 dark:border-primaryDark-accent  px-2 "> 
                            {{ manufacturerName }}
                    </ps-label-header-4>      
                </ps-route-link>  -->
                
            </div>
           
            <div class="flex flex-row mb-8 ">
                <div class='w-full flex flex-col' >
                    <div v-if="renderComponent" class="grid lg:grid-cols-12 sm:grid-cols-6 grid-cols-4  gap-2 sm:gap-3.5 lg:gap-4 sm:mt-4 mt-2 gap-y-4 ">

                        <!-- Column -->
                        <div class="w-full lg:col-span-2  col-span-1" v-for="model in modelProvider.modelList.data" :key="model.id">
                         
                            <div class="flex flex-col mt-2 w-full h-auto cursor-pointer">
        
                                <div class="relative bg-black lg:h-40 sm:h-28 h-20 ">
                                    
                                    <div class="absolute opacity-50">
                                        
                                        <img alt="Placeholder" width="150px" height="100px" class="w-screen block mx-auto lg:h-40 sm:h-28 h-20 object-cover " :src="modelProvider.imageUrl(model ? model.defaultPhoto.imgPath : '',3) " @error="modelProvider.defaultCarImage">
                                        
                                    </div>
                                    <div class="relative justify-end flex">
                                        <custom-checkbox v-if="scribe" :isScribe="model.isSubScribe" :checked="model.id+'_FE'" :value="model.id+'_FE'" 
                                            @updateSelectedValue="updateValue" v-model:selectedValue="checkedSelectedList"></custom-checkbox>
                                    </div>
                                    <div class="mx-auto lg:pt-16 sm:pt-12 pt-10 relative flex">
                                        <ps-route-link class="flex-grow"
                                            :to="{name: 'item-list', 
                                            query: { 
                                                manufacturer_id: manufacturerId, 
                                                manufacturer_name: manufacturerName,
                                                model_id: model.id, 
                                                model_name: model.name, } }" > 
                                        <ps-label class="absolute w-full  lg:text-lg sm:text-sm text-xs text-center leading-4" textColor="text-textLight"> {{model ? model.name : ''}} </ps-label>
                                        </ps-route-link>
                                    </div>

                                </div>  
                            </div>
                        </div>
                        <!-- END Column -->
                       
                    </div>

                    <ps-button v-if="modelProvider.loading.value == false" class="w-60 mx-auto mt-8" @click="loadMore" :class="modelProvider.isNoMoreRecord ? 'hidden' : ''"> {{ $t("model_list__load_more") }} </ps-button>
                    <ps-button v-else class="w-60 mx-auto mt-8" @click="loadMore" :disabled="true"> {{ $t("model_list__loading") }} </ps-button>

                </div>

            </div>
        </div>
    </div>
    <ps-loading-dialog ref="ps_loading_dialog" class='z-40' />
    <ps-success-dialog ref="success_dialog" />
    <ps-error-dialog ref="ps_error_dialog" />
    </div>
</template>

<script lang="ts">

import {  ref } from 'vue';
import router from '@/router';
import { useRoute } from 'vue-router';

import PsButton from '@/components/core/buttons/PsButton.vue';
import PsLabel from '@/components/core/label/PsLabel.vue';
import PsLabelHeader4 from '@/components/core/label/PsLabelHeader4.vue';
import PsIcon from '@/components/core/icons/PsIcon.vue';
import PsInput from '@/components/core/input/PsInput.vue';
import PsDropdown from '@/components/core/dropdown/PsDropdown.vue';
import CustomCheckbox from '@/components/core/checkbox/CustomCheckbox.vue';
//import ModelHorizontalItem from '@/components/modules/model/ModelHorizontalItem.vue';
import PsRouteLink from '@/components/core/link/PsRouteLink.vue';
import PsLoadingDialog from '@/components/core/dialog/PsLoadingDialog.vue';
import PsSuccessDialog from '@/components/core/dialog/PsSuccessDialog.vue';
import PsErrorDialog from '@/components/core/dialog/PsErrorDialog.vue';
import PsConst from '@/object/constant/ps_constants';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMapMarkedAlt,faFilter } from '@fortawesome/free-solid-svg-icons';
library.add(faMapMarkedAlt,faFilter)

import { usePsAppInfoProviderState } from '@/store/modules/appinfo/AppInfoProvider';
import AppInfoParameterHolder from '@/object/holder/AppInfoParameterHolder';
import { createModelProviderState } from '@/store/modules/model/ModelProvider';
import { createModelScribeProviderState } from '@/store/modules/model/ModelScribeProvider';
import ModelScribeParameterHolder from '@/object/holder/ModelScribeParameterHolder';
import { PsValueProvider } from '@/store/modules/core/PsValueProvider';
import PsStatus from '@/api/common/PsStatus';
import  firebase  from 'firebase/app';
import 'firebase/messaging'
import { i18n } from '@/assets/locales/index';

export default {
    name: 'ModelListView',
    components : {
        PsButton,
        PsLabel,
        PsLabelHeader4,
       // ModelHorizontalItem,
        PsIcon,
        PsRouteLink,
        PsInput,
        PsDropdown,
        PsLoadingDialog,
        CustomCheckbox,
        PsSuccessDialog,
        PsErrorDialog
    },
    setup (){
        localStorage.manufacturerId = "";
        const route = useRoute();
        const manufacturerId = route.params.manufacturer_id.toString();
        const manufacturerName = route.params.manufacturer_name.toString();
        const modelProvider = createModelProviderState();
        const modelScribeProvider = createModelScribeProviderState();
        const holder = new ModelScribeParameterHolder();
        const psValueHolder = PsValueProvider.psValueHolder;
        const loginUserId = psValueHolder.getLoginUserId();
        const appInfoParameterHolder = new AppInfoParameterHolder();
        appInfoParameterHolder.userId = loginUserId;
        const appInfoProvider = usePsAppInfoProviderState();
        appInfoProvider.loadDeleteHistory(appInfoParameterHolder);
        const ps_loading_dialog = ref();
        const ps_error_dialog = ref();
        let activeSortingId = ref('');
        let activeSortingName = ref('');
        let scribe = ref(false);
        let checkedSelectedList = ref([]);
        const success_dialog = ref();
        const renderComponent =ref(true);
        const currentsorting = [
            { 
                id:"0", 
                orderBy:"name", 
                orderType:PsConst.FILTERING__ASC, 
                name:"Ascending"
            },
            { 
                id:"1", 
                orderBy:"name", 
                orderType:PsConst.FILTERING__DESC, 
                name:"Decending"
            }
        ];

        modelProvider.paramHolder.manufacturerId = manufacturerId;
        setTimeout(async ()=>{
               
            await loadDataList();
            
                    
        },1000);

        function sortingFilterClicked(value) {
            activeSortingId.value = value.id;
            activeSortingName.value = value.name;
            modelProvider.paramHolder.orderBy = value.orderBy;
            modelProvider.paramHolder.orderType = value.orderType;
            loadDataList();
            
        }

        function modelScribe() {
            scribe.value= true;
        }

        ///start firebase subscribe
        const messaging = firebase.messaging.isSupported() ? firebase.messaging() : null;
        function subscribeTokenToTopic(token, topic) {
            if(!messaging) return;
            fetch('https://iid.googleapis.com/iid/v1/' + token + '/rel/topics/' + topic, {
                method: 'POST',
                headers: new Headers({
                    'Authorization': 'key=' + appInfoProvider.appInfo.data.frontendConfigSetting.fcmServerKey
                })
            }).then(response => {
                if (response.status < 200 || response.status >= 400) {
                    // ps_error_dialog.value.openModal('', i18n.global.t('model_list__error_in_scribing'));
                    throw 'Error subscribing to topic: ' + response.status + ' - ' + response.text();
                }
                console.log('Subscribed to "' + topic + '"');
            }).catch(error => {
                console.error(error);
            })
        }
        ///end firebase

        async function submitScribe() {
          
            for (var i = 0; i < checkedSelectedList.value.length; i++) {  
                subscribeTokenToTopic(localStorage.deviceToken,checkedSelectedList.value[i]);
            }
            holder.userId = loginUserId;
            holder.manufacturerId = manufacturerId;
            holder.modelIds = checkedSelectedList.value;
            console.log(checkedSelectedList);
            ps_loading_dialog.value.openModal();
            checkedSelectedList.value = [];
            renderComponent.value = false;

            const status = await modelScribeProvider.modelScription(holder);
            
            renderComponent.value = true;
            if(status.status == PsStatus.SUCCESS){
                

                await modelProvider.resetSearchModelList(loginUserId,modelProvider.paramHolder);

                ps_loading_dialog.value.closeModal();
                success_dialog.value.openModal('', i18n.global.t('model_list__scribe_success'));
                scribe.value= false;
            }else{
                ps_loading_dialog.value.closeModal();
                ps_error_dialog.value.openModal('', i18n.global.t('model_list__error_in_scribing'));
            }
           
        }
       
        function searchClicked() {
            loadDataList();
        }
        async function loadDataList() {
            ps_loading_dialog.value.openModal();

            await modelProvider.resetSearchModelList(loginUserId,modelProvider.paramHolder);

            ps_loading_dialog.value.closeModal();
        }    
        
        function loadMore() {             
            modelProvider.resetSearchModelList(loginUserId,modelProvider.paramHolder);
        }


        function manufacturerClick(){
            router.push({
                name: "manufacturer-list"
            });
        }
        function updateValue(value){
            checkedSelectedList.value = value;
        }

        return {
            updateValue,
            modelProvider,
            loadMore,
            manufacturerClick,
            manufacturerId,
            manufacturerName,
            currentsorting,
            sortingFilterClicked,
            activeSortingId,
            activeSortingName,
            ps_loading_dialog,
            searchClicked,
            modelScribe,
            scribe,
            submitScribe,
            checkedSelectedList,
            success_dialog,
            ps_error_dialog,
            appInfoProvider,
            PsConst,
            renderComponent
        }
    }
    
}
</script>