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

                    <ps-icon name="rightArrow" class='text-secondary-400 dark:text-secondaryDark-grey   mx-0 sm:mx-2'/>

                    <ps-label textColor="text-secondary-400 dark:text-secondaryDark-grey " class="font-light text-xxs " > {{ $t("favourite_list__favourite_list") }} </ps-label>
                </div>
                <div class="flex flex-col items-start">
                    <ps-label-header-4 class=" mb-1 font-medium"> {{ $t("favourite_list__favourite_list") }} </ps-label-header-4>
                    <ps-label class="text-xs lg:text-sm  mb-5 font-light"> {{ $t("favourite_list__text") }}</ps-label>


                    <div class='w-full flex flex-col items-start mt-4' >
                        <div class="w-full">
                            

                            <div v-if="favouriteitemProvider.favouriteItemList?.data != null">
                                <div class="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-1  gap-4 sm:gap-3.5 lg:gap-4">
                                    <!-- Column -->
                                    <div class="w-full " v-for="item in favouriteitemProvider.favouriteItemList.data" :key="item.id">
                                        
                                        <item-horizontal-item @clickFav="refleshData"  :item="item" />
                                        
                                    </div>

                                    <!-- END Column -->
                                </div>
                            </div>
                            <div v-else-if=" favouriteitemProvider.loading.value == true ">
                                <div class="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-1  gap-4 sm:gap-3.5 lg:gap-4 ">
                                    <!-- Column -->
                                    <div class="w-full " v-for="i in 3" :key="i">
                                        
                                        <item-horizontal-skeletor-item />
                                        
                                    </div>
                                    <!-- END Column -->
                                </div>
                            </div>
                            <div v-else class="w-full flex justify-center">
                                <ps-label textColor="text-secondary-500 dark:text-secondaryDark-white lg:text-xl sm:text-lg text-base font-medium" class="mt-10 flex-grow-0 mx-auto"> {{ $t("list__no_result") }} </ps-label>
                            </div>

                        </div>

                        <ps-button v-if="favouriteitemProvider.loading.value == false" class="w-60 mx-auto mt-8" @click="loadMore" :class="favouriteitemProvider.isNoMoreRecord ? 'hidden' : ''"> {{ $t("favourite_list__load_more") }}  </ps-button>
                        <ps-button v-else class="w-60 mx-auto mt-8" @click="loadMore" :disabled="true"> {{ $t("favourite_list__loading") }}  </ps-button>
                    </div>

                </div>
            </div>
            <ps-loading-dialog ref="ps_loading_dialog" />
        </template>
            

    </ps-content-container>
</template>

<script lang='ts'>
import {ref } from 'vue';

import PsContentContainer from '@/components/layouts/container/PsContentContainer.vue';
import PsLabelHeader4 from '@/components/core/label/PsLabelHeader4.vue';
import PsButton from '@/components/core/buttons/PsButton.vue';
import PsLabel from '@/components/core/label/PsLabel.vue';
import PsIcon from '@/components/core/icons/PsIcon.vue';
import PsRouteLink from '@/components/core/link/PsRouteLink.vue';
import PsLoadingDialog from '@/components/core/dialog/PsLoadingDialog.vue';

import { PsValueProvider } from "@/store/modules/core/PsValueProvider";

import { createFavouriteItemProviderState } from "@/store/modules/item/FavouriteItemProvider";

import ItemHorizontalSkeletorItem from "@/components/modules/item/ItemHorizontalSkeletorItem.vue";
import ItemHorizontalItem from "@/components/modules/item/ItemHorizontalItem.vue";

export default {
    name : "FavouriteListView",
    components : {
        PsContentContainer,
        PsLabelHeader4,
        PsButton,
        ItemHorizontalSkeletorItem,
        ItemHorizontalItem,
        PsLabel,
        PsIcon,
        PsLoadingDialog,
        PsRouteLink
    },
    setup() {
       
        const psValueHolder = PsValueProvider.psValueHolder;
        // Inject Item Provider
        const favouriteitemProvider = createFavouriteItemProviderState();

        const ps_loading_dialog = ref();
        // Load Data
        favouriteitemProvider.loadFavouriteItemList(psValueHolder.getLoginUserId());

        // Load User By ID List
        function loadMore() {             
            favouriteitemProvider.loadFavouriteItemList(psValueHolder.getLoginUserId());
        }
        async function refleshData(){

            ps_loading_dialog.value.openModal();
            await favouriteitemProvider.refleshItemList(psValueHolder.getLoginUserId());
            
            ps_loading_dialog.value.closeModal();
        }
        return {
            favouriteitemProvider,
            loadMore,
            refleshData,
            ps_loading_dialog,
        };
    }
}
</script>