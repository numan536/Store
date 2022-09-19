<template>
    <ps-content-container>
        <template #content>
            <div class="sm:mt-32 lg:mt-36 mt-28 mb-16 ">
                <div class=" flex items-center"> 
                    <ps-route-link :to="{ name: 'profile'}">                          
                        <ps-label textColor="text-secondary-400 dark:text-secondaryDark-grey "
                        class="hover:underline cursor-pointer font-medium text-xxs "> 
                                {{ $t("list__account") }}     
                        </ps-label>
                    </ps-route-link> 

                    <ps-icon textColor="text-secondary-400 dark:text-secondaryDark-grey " name="rightArrow" class=' mx-0 sm:mx-2'/>

                    <ps-label textColor="text-secondary-400 dark:text-secondaryDark-grey " class="font-light text-xxs " >
                        {{ $t("reported_item_list__reported_item_list") }} 
                    </ps-label>
                </div>

                <div class="flex flex-col items-start">
                    <ps-label-header-4 class=" mb-1 font-medium"> {{ $t("reported_item_list__reported_item_list") }} </ps-label-header-4>
                    <ps-label class="text-xs lg:text-sm  mb-5 font-light"> {{ $t("reported_item_list__text") }}</ps-label>

                

                    <div class='w-full flex flex-col items-start' >
                        <div class="w-full">
                            <div v-if="reporteditemProvider.reportedReportedItemList?.data != null">
                                <div class="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-1  gap-4 sm:gap-3.5 lg:gap-4">
                            
                                    <div class="w-full " v-for="item in reporteditemProvider.reportedReportedItemList.data" :key="item.id">
                                
                                        <item-horizontal-item @clickFav="refleshData"  :item="item" />
                                
                                    </div>

                                </div>
                            </div>
                            <div v-else-if="reporteditemProvider.loading.value == true">
                                <div class="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-1  gap-4 sm:gap-3.5 lg:gap-4">
                            
                                    <div class="w-full " v-for="i in 3" :key="i">
                                        
                                        <item-horizontal-skeletor-item />
                                        
                                    </div>
                            
                                </div>
                            </div>
                            <div v-else class="w-full flex justify-center">
                                <ps-label textColor="text-secondary-500 dark:text-secondaryDark-white lg:text-xl sm:text-lg text-base font-medium" class="mt-10 flex-grow-0 mx-auto"> {{ $t("list__no_result") }} </ps-label>
                            </div>

                        </div>

                        <ps-button v-if="reporteditemProvider.loading.value == false" class="w-60 mx-auto mt-8" @click="loadMore" :class="reporteditemProvider.isNoMoreRecord ? 'hidden' : ''">{{ $t("reported_item_list__load_more") }} </ps-button>
                        <ps-button v-else class="w-60 mx-auto mt-8" @click="loadMore" :disabled="true"> {{ $t("reported_item_list__loading") }} </ps-button>                      

                    </div>
                </div>
            </div>
            <ps-loading-dialog ref="ps_loading_dialog" />
        </template>
    </ps-content-container>
</template>

<script lang="ts">
import {ref } from 'vue';

import PsContentContainer from '@/components/layouts/container/PsContentContainer.vue';
import PsLabelHeader4 from '@/components/core/label/PsLabelHeader4.vue';
import PsLabel from '@/components/core/label/PsLabel.vue';
import PsButton from '@/components/core/buttons/PsButton.vue';
import PsIcon from '@/components/core/icons/PsIcon.vue';
import PsRouteLink from '@/components/core/link/PsRouteLink.vue';
import PsLoadingDialog from '@/components/core/dialog/PsLoadingDialog.vue';

import ItemHorizontalItem from "@/components/modules/item/ItemHorizontalItem.vue";
import ItemHorizontalSkeletorItem from "@/components/modules/item/ItemHorizontalSkeletorItem.vue";
import { PsValueProvider } from "@/store/modules/core/PsValueProvider";
import { createReportedItemProviderState } from "@/store/modules/item/ReportedItemProvider";

import "vue-skeletor/dist/vue-skeletor.css";

export default {
    name : "ReportedItemListView",
    components : {
        PsContentContainer,
        PsLabelHeader4,
        PsLabel,
        ItemHorizontalItem,
        PsButton,
        PsIcon,
        PsLoadingDialog,
        ItemHorizontalSkeletorItem,
        PsRouteLink
    },
    setup() {
       
        const psValueHolder = PsValueProvider.psValueHolder;
        const loginUserId = psValueHolder.getLoginUserId();
        const ps_loading_dialog = ref();
        // Inject Provider
        const reporteditemProvider = createReportedItemProviderState();

        // Load Item By login user ID List
        reporteditemProvider.loadReportedItemList(loginUserId);

        function loadMore() {             
            reporteditemProvider.loadReportedItemList(loginUserId);
        }
        async function refleshData(){

            ps_loading_dialog.value.openModal();
            await reporteditemProvider.refleshItemList(loginUserId);
            
            ps_loading_dialog.value.closeModal();
        }

        return {
            refleshData,
            reporteditemProvider,
            loadMore,
            ps_loading_dialog
        }
    }
}
</script>