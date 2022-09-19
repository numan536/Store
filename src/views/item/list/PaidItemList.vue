<template>
    <ps-content-container>
        <template #content>
            <div class="sm:mt-32 lg:mt-36 mt-28 mb-16 ">
                <div class=" flex items-center "> 
                        <ps-route-link :to="{ name: 'profile'}">                          
                            <ps-label textColor="text-secondary-400 dark:text-secondaryDark-grey "
                            class="hover:underline cursor-pointer font-medium text-xxs "> 
                                    {{ $t("list__account") }}     
                            </ps-label>
                        </ps-route-link> 

                        <ps-icon textColor="text-secondary-400 dark:text-secondaryDark-grey " name="rightArrow" class=' mx-0 sm:mx-2'/>

                        <ps-label textColor="text-secondary-400 dark:text-secondaryDark-grey " class="font-light text-xxs " >{{ $t("paid_item_list__paid_promote_list") }} </ps-label>
                    </div>

                <div class="flex flex-col items-start ">
                    <ps-label-header-4 class=" mb-1 font-medium">  {{ $t("paid_item_list__paid_promote_list") }} </ps-label-header-4>
                    <ps-label class="text-xs lg:text-sm  mb-5 font-light">  {{ $t("paid_item_list__text") }}</ps-label>
                    

                    <div class='w-full flex flex-col items-start ' >
                        <div class="w-full">
                             <!-- paid & promote ads -->
                            <div v-if="itemProvider.paidAdItemList?.data != null">
                                <div class="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-1  gap-4 sm:gap-3.5 lg:gap-4">
                            
                                    <div class="w-full " v-for="item in itemProvider.paidAdItemList.data" :key="item.id">
                                
                                        <paid-ad-item-horizontal-item  :paiditem="item" />
                                
                                    </div>

                                </div>
                            </div>
                            <div v-else-if=" itemProvider.loading.value == true ">
                                <div class="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-1  gap-4 sm:gap-3.5 lg:gap-4">
                            
                                    <div class="w-full " v-for="i in 3" :key="i">
                                        
                                        <item-horizontal-skeletor-item />
                                        
                                    </div>
                            
                                </div>
                            </div>
                            <div v-else class="w-full flex justify-center">
                                <ps-label textColor="text-secondary-500 dark:text-secondaryDark-white lg:text-xl sm:text-lg text-base font-medium" class="mt-10 flex-grow-0 mx-auto"> {{ $t("list__no_result") }} </ps-label>
                            </div>
                            <!-- end paid ads -->

                        </div>

                        <ps-button v-if="itemProvider.loading.value == false" class="w-60 mx-auto mt-8" @click="loadMore" :class="itemProvider.isNoMoreRecord ? 'hidden' : ''">{{ $t("list__load_more") }} </ps-button>
                        <ps-button v-else class="w-60 mx-auto mt-8" @click="loadMore" :disabled="true"> {{ $t("list__loading") }}  </ps-button>                      

                    </div>
                </div>
            </div>
        </template>
    </ps-content-container>
</template>

<script lang="ts">
import PsContentContainer from '@/components/layouts/container/PsContentContainer.vue';
import PsLabelHeader4 from '@/components/core/label/PsLabelHeader4.vue';
import PsLabel from '@/components/core/label/PsLabel.vue';
import PsButton from '@/components/core/buttons/PsButton.vue';
import PsIcon from '@/components/core/icons/PsIcon.vue';
import PsRouteLink from '@/components/core/link/PsRouteLink.vue';

import PaidAdItemHorizontalItem from "@/components/modules/item/PaidAdItemHorizontalItem.vue";
import ItemHorizontalSkeletorItem from "@/components/modules/item/ItemHorizontalSkeletorItem.vue";
import { PsValueProvider } from "@/store/modules/core/PsValueProvider";
//Models
import { createPaidAdItemProviderState } from "@/store/modules/item/PaidAdItemProvider";

import "vue-skeletor/dist/vue-skeletor.css";

export default {
    name : "PaidItemListView",
    components : {
        PsContentContainer,
        PsLabelHeader4,
        PsLabel,
        PaidAdItemHorizontalItem,
        PsButton,
        PsIcon,
        ItemHorizontalSkeletorItem,
        PsRouteLink
    },
    setup() {
      
        const psValueHolder = PsValueProvider.psValueHolder;
        const loginUserId = psValueHolder.getLoginUserId();
        // Inject Provider
        const itemProvider = createPaidAdItemProviderState();
        itemProvider.loadPaidAdItemList(loginUserId);

        function loadMore() {             
            itemProvider.loadPaidAdItemList(loginUserId);
        }


        return {
            itemProvider,
            loadMore,
        }
    }
}
</script>