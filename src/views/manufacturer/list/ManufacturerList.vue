<template>
    <div class="sm:mt-32 lg:mt-36 mt-28 w-mobile sm:w-median lg:w-large mx-auto">
        <div>
            <div class="  flex items-center mt-20"> 
            <ps-route-link
                :to="{name: 'dashboard'}"> 
                <ps-label textColor="text-secondary-400 dark:text-secondaryDark-grey "
                    class="hover:underline cursor-pointer font-medium text-xxs"> 
                            {{ $t("list__home") }}
                </ps-label>      
            </ps-route-link>
            
            <ps-icon name="rightArrow" class='text-secondary-400 dark:text-secondaryDark-grey mx-0 sm:mx-2'/>

            <ps-label textColor="text-secondary-400 dark:text-secondaryDark-grey "
                    class="font-medium text-xxs"> {{ $t("model_list__manufacturer") }} </ps-label>
            
        </div>

        <!--Start search flex mobile and desktop -->
            <div class="pt-1 flex sm:justify-between flex-col sm:flex-row mb-2">
                <div class="flex flex-col items-start ">
                    <ps-label-header-4 class="font-medium"> {{ $t("manufacturer_list__title") }} </ps-label-header-4>
                    <!-- <ps-label class="mt-2 text-center "> {{ $t("manufacturer_list__text") }} </ps-label> -->
                </div>
                 <!-- start keyword search -->
                <div class="flex content-center items-center mt-1 ">   
                    <div class="lg:w-64 lg:h-10 w-48 h-9">
                        <ps-input type="text" class="w-full lg:text-sm text-xs" name="search" v-bind:placeholder="$t('manufacturer_list__search')" v-on:keyup.enter="searchClicked" v-model:value="holder.keyword" />
                    </div>
                   
                    <ps-dropdown align="left" class="ms-2 h-9 lg:h-10 w-32">
                        <template #select>
                            <ps-label class=" h-full">
                                <button
                                    type="button"
                                    class="w-32 inline-flex items-center content-start justify-between  h-9 lg:h-10 
                                    text-xs leading-5 font-medium text-secondary-500 dark:text-secondaryDark-white
                                            focus:outline-none focus:border-secondaryDark-grey
                                            focus:shadow-outline-blue transition 
                                            ease-in-out duration-150 btn-focus bg-primary-000 dark:bg-primaryDark-black "
                                    aria-haspopup="true"
                                    aria-expanded="true">
                                <font-awesome-icon :icon="['fas', 'filter']" class="text-sm ms-3 "  />
                                <ps-label class=" text-start text-xs mx-2"> {{activeSortingName ? activeSortingName : 'Sorting'}} </ps-label>
                                <ps-icon textColor="text-secondary-400 dark:text-secondaryDark-grey me-3" name="downArrow"   />
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
                                            class="w-56 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  
                                                @click="sortingFilterClicked(sort)" >
                                            <ps-label class="ms-2" :class="sort.id==activeSortingId ? ' font-medium' : 'font-light'"  > {{sort.name}} </ps-label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </ps-dropdown>
                    <!-- end keyword search -->
                </div>
                 <!-- end keyword search -->
            </div>
             <!-- End search flex mobile and desktop -->
        <!-- manufacturer list -->

        <div class="flex flex-col mb-4">
            
            <div class="flex flex-row mb-8 mt-4">
                <div class='w-full ' >
                    <div class=" grid lg:grid-cols-6 sm:grid-cols-4 grid-cols-2  gap-2 sm:gap-3.5 lg:gap-4 gap-y-4 ">

                        <!-- Column -->
                        <div class="w-full" v-for="manufacturer in manufacturerProvider.itemList.data" :key="manufacturer.id">
                            <ps-route-link
                                :to="{name: 'model-list', 
                                params: {manufacturer_id: manufacturer.id , manufacturer_name: manufacturer.name} }"> 
                                <manufacturer-horizontal-item  :manufacturer="manufacturer" />
                            </ps-route-link> 
                        </div>
                        <!-- END Column -->

                    </div>

                    <div v-if="manufacturerProvider.loading.value == false" class="flex items-end justify-end">
                        <ps-button  class="shadow-buttonShadow hover:shadow-none w-36 mt-4 " @click="loadMore" :class="manufacturerProvider.isNoMoreRecord ? 'hidden' : ''"> {{ $t("manufacturer_list__load_more") }} </ps-button>
                    </div>
                    <div v-else class="flex items-end justify-center">
                        <ps-button class="w-56 mt-4" :disabled="true"> {{ $t("manufacturer_list__loading") }} </ps-button>
                    </div>

                    
                </div>
            </div>
        </div>
        <!-- End manufacturer List -->
        </div>
        <ps-loading-dialog ref="ps_loading_dialog" class='z-40' />
    </div>
</template>

<script lang="ts">

import { createManufacturerProviderState } from "@/store/modules/manufacturer/ManufacturerProvider";
import ManufacturerListParameterHolder from '@/object/holder/ManufacturerListParameterHolder';

import {  ref } from 'vue';
import PsRouteLink from '@/components/core/link/PsRouteLink.vue';
import PsButton from '@/components/core/buttons/PsButton.vue';
import PsLabel from '@/components/core/label/PsLabel.vue';
import PsLabelHeader4 from '@/components/core/label/PsLabelHeader4.vue';
import ManufacturerHorizontalItem from '@/components/modules/manufacturer/ManufacturerHorizontalItem.vue';
import PsIcon from '@/components/core/icons/PsIcon.vue';
import PsConst from '@/object/constant/ps_constants';
import PsInput from '@/components/core/input/PsInput.vue';
import PsDropdown from '@/components/core/dropdown/PsDropdown.vue';
import PsLoadingDialog from '@/components/core/dialog/PsLoadingDialog.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMapMarkedAlt,faFilter } from '@fortawesome/free-solid-svg-icons';

library.add(faMapMarkedAlt,faFilter)
export default {
    name: 'ManufacturerListView',
    components : {
        PsButton,
        PsDropdown,
        PsInput,
        PsIcon,
        PsLabel,
        PsLabelHeader4,
        ManufacturerHorizontalItem,
        PsRouteLink,
        PsLoadingDialog

    },
    setup (){
         const manufacturerProvider = createManufacturerProviderState();
         const holder = new ManufacturerListParameterHolder().ManufacturerListParameterHolder();
        const ps_loading_dialog = ref();
        let activeSortingId = ref('');
        let activeSortingName = ref('');
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

        setTimeout(async ()=>{
               
            await loadDataList();
                    
        },1000);

        function sortingFilterClicked(value) {
            activeSortingId.value = value.id;
            activeSortingName.value = value.name;
            holder.oderBy = value.orderBy;
            holder.oderType = value.orderType;
            loadDataList();
            
        }

        function searchClicked() {
            loadDataList();
        }

        async function loadDataList() {
            ps_loading_dialog.value.openModal();

            await manufacturerProvider.resetManufacturerList(PsConst.NO_LOGIN_USER, holder);

            ps_loading_dialog.value.closeModal();
        }
       

        function loadMore() {  
            manufacturerProvider.loadItemList(PsConst.NO_LOGIN_USER, holder);
        }

        return {
            manufacturerProvider,
            loadMore,
            holder,
            currentsorting,
            sortingFilterClicked,
            activeSortingId,
            activeSortingName,
            ps_loading_dialog,
            searchClicked
        }
    }
    
}
</script>