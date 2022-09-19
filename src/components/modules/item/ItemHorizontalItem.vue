<template>

    <div class=" w-full h-full shadow-cardShadow" >
        <!-- Pscard -->    
        <ps-card v-if="item?.adType==PsConst.NORMAL_AD || item?.adType==PsConst.PAID_AD" class="flex w-full flex-col " :enabledHover="true">
        <!-- v-if="item?.adType==PsConst.NORMAL_AD || item?.adType==PsConst.PAID_AD"  -->
        
            
            <div  v-if="psValueHolder.showProfile == 'show'" class="flex items-center justify-between leading-none px-2 pb-1 pt-2 bg-background dark:bg-primaryDark-black">
                <div class="flex-grow flex items-center justify-between leading-none"> 
                    <ps-route-link class="flex flex-row items-center " :to="{ name: 'other-profile', params: {user_id: item.user.userId } }">
                        <div class="">
                            <img alt="Placeholder" class="rounded-full bg-transparent w-8 h-8 flex items-center justify-center object-cover" width="50px" height="50px" :src="productProvider.imageUrl(item ? item.user.userProfilePhoto : '', 1)" @error="productProvider.defaultProfileImage" >
                        </div>
                        <p class="ms-2 mt-1 text-sm flex-grow">
                            <span class="flex">
                                <ps-label class="truncate text-xs font-medium" > {{item ? item.user.userName : ''}} </ps-label>
                                <img v-if="item != null && item.user.isVerifybluemark == '1'" alt="Placeholder" class="mx-1 w-4 h-4 object-fill" width="15px" height="10px" src="@/assets/images/mark2.png" >
                            </span>
                            <ps-label class=" font-medium text-xxs " textColor="text-primary-500 dark:text-primaryDark-accent" v-if="item != null && item.paidStatus == PsConst.PAID_AD_PROGRESS"> {{ $t('item_horizontal_item__sponsored') }} </ps-label>
                            <ps-label class=" font-medium text-xxs " textColor="text-secondary-400 dark:text-secondaryDark-grey"  v-else> {{ item ? item.addedDateStr : '' }}  </ps-label>
                        </p>
                    </ps-route-link>
                </div>
                <div> 
                    <font-awesome-icon @click="showMenu = !showMenu" :icon="['fas', 'ellipsis-v']" class="text-secondary-400 dark:text-secondaryDark-grey text-base me-1 cursor-pointer" />
                </div>
            </div> 
            <div class="px-2 py-2 bg-background dark:bg-primaryDark-black" >
                <div class="relative h-36 ">
                    <div class="absolute cursor-default">
                        <img alt="Placeholder" class=" block object-cover w-screen h-36 " width="640px" height="360px" v-lazy="productProvider.imageUrl(item ? item.defaultPhoto.imgPath : '',3) " @error="productProvider.defaultCarImage"/>
                    </div>
                    <div v-if="showMenu" class="relative h-28 flex justify-between"> 
                        <ps-route-link class="flex-grow cursor-pointer " :to="{ name: 'item', params: { itemName: item.title.split(' ').join('-').toLowerCase() }, query: { item_id: item.id, item_name: item.title.split(' ').join('-').toLowerCase()   }}">
                        </ps-route-link>
                         <div class=" mt-1 me-1 flex flex-col">
                            <ps-label class="bg-primary-000 dark:bg-primaryDark-black hover:bg-primary-100 dark:hover:bg-backgroundDark  px-2 py-1 text-xs cursor-pointer items-center  " textColor="text-secondary-400 dark:text-secondaryDark-grey" @click="shareClicked(item.dynamicLink)" >
                                {{ $t("item_horizontal_item__share") }}
                            </ps-label>
                            <div v-if="loginUserId != item?.user?.userId">
                                <ps-label class="bg-primary-000 dark:bg-primaryDark-black hover:bg-primary-100 dark:hover:bg-backgroundDark  px-2 py-1 text-xs cursor-pointer items-center" textColor="text-secondary-400 dark:text-secondaryDark-grey"  @click="reportItemClicked"  >
                                {{ $t("item_horizontal_item__report") }}
                                </ps-label>
                            </div>
                            <ps-route-link class="flex-grow cursor-pointer " :to="{ name: 'item', params: { itemName: item.title.split(' ').join('-').toLowerCase() }, query: { item_id: item.id, item_name: item.title.split(' ').join('-').toLowerCase()   }}">
                            </ps-route-link>
                        </div>
                        
                    </div>
                    <div v-else class=" relative h-28 flex justify-between">  
                        <ps-route-link class="flex-grow cursor-pointer " :to="{ name: 'item', params: { itemName: item.title.split(' ').join('-').toLowerCase() }, query: { item_id: item.id, item_name: item.title.split(' ').join('-').toLowerCase()   }}">
                        </ps-route-link>
                         <div v-if="loginUserId != item?.user?.userId" class="flex mt-2 me-2">
                        <ps-label class="flex flex-col" @click="favouriteClicked">

                            <div class="" >
                                <ps-icon name="favourite" w="24" h="24" class="cursor-pointer text-textLight dark:text-textLight " v-if="item && item.isFavourited == '1'"/>
                                <font-awesome-icon :icon="['far', 'heart']" class="cursor-pointer text-textLight dark:text-textLight text-xl" v-else  />
                            </div>
                            <ps-route-link class="flex-grow cursor-pointer " :to="{ name: 'item', params: { itemName: item.title.split(' ').join('-').toLowerCase() }, query: { item_id: item.id, item_name: item.title.split(' ').join('-').toLowerCase()   }}">
                            </ps-route-link>

                        </ps-label>
                        </div>
                        
                    </div>
                    <div class="relative opacity-80 bg-primary-500 dark:bg-primaryDark-accent ">  
                        <ps-label v-if="item && item.isSoldOut == '1'" class="font-medium text-base py-1.5 text-center" textColor="text-textLight "> {{ $t('item_horizontal_item__sold_out') }}</ps-label>
                    </div>
                    
                </div>
                
                <ps-route-link :to="{ name: 'item', params: { itemName: item.title.split(' ').join('-').toLowerCase() }, query: { item_id: item.id, item_name: item.title.split(' ').join('-').toLowerCase()   }}">
                    <div class="pt-3 ps-1">
                        <ps-label class=" truncate font-medium text-xs" > {{item ? item.title : ''}} </ps-label>
                        
                    </div>
                    <div class="py-2 ps-1  "> 
                        <div class="flex items-center">
                            <ps-icon textColor="text-secondary-400 dark:text-secondaryDark-grey" name="location" h="13" w="13" class=" me-1" />
                            <ps-label class="truncate font-light text-xxs " textColor="text-secondary-400 dark:text-secondaryDark-grey"> {{item ? item.itemLocation.name : ''}} </ps-label>
                        </div>
                    </div>

                    <div v-if="appInfoProvider.appInfo.data.psItemUploadConfig.steeringPosition== PsConst.ONE ||
                                appInfoProvider.appInfo.data.psItemUploadConfig.fuelTypeId== PsConst.ONE ||
                                appInfoProvider.appInfo.data.psItemUploadConfig.transmissionId== PsConst.ONE ||
                                appInfoProvider.appInfo.data.psItemUploadConfig.mileage== PsConst.ONE" 
                        class="py-2 px-1 bg-primary-000 dark:bg-secondaryDark-100 flex-col   "> 
                        <div class="py-1 grid grid-cols-2 gap-y-1.5">
                            <div v-if="appInfoProvider.appInfo.data.psItemUploadConfig.steeringPosition== PsConst.ONE" class="w-full flex items-start">
                                <ps-icon textColor="text-primary-500 dark:text-primaryDark-accent" viewBox="0 0 512 512" name="steeringWheel" h="14" w="14" class=" ms-0.5" />
                                <ps-label class="ms-1  font-light text-xs" > {{item ? item.steeringPosition : ''}} </ps-label>  
                            </div>
                            <div v-if="appInfoProvider.appInfo.data.psItemUploadConfig.fuelTypeId== PsConst.ONE" class="w-full flex items-start">
                                <font-awesome-icon :icon="['fas', 'gas-pump']" class="text-primary-500 dark:text-primaryDark-accent text-xs me-2" />
                                <ps-label class=" flex-grow font-light text-xs" > {{item ? item.fuelType.name : ''}} </ps-label>  
                            </div>
                            <div v-if="appInfoProvider.appInfo.data.psItemUploadConfig.transmissionId== PsConst.ONE" class="w-full flex items-start">
                                <ps-icon textColor="text-primary-500 dark:text-primaryDark-accent" viewBox="0 0 512 512" name="gearStick" h="14" w="14" />
                                <ps-label class=" ms-1 font-light text-xs" > {{item ? item.transmission.name : ''}} </ps-label>  
                            </div>
                            <div v-if="appInfoProvider.appInfo.data.psItemUploadConfig.mileage== PsConst.ONE" class="w-full flex items-start">
                                <font-awesome-icon :icon="['fas', 'road']" class="text-primary-500 dark:text-primaryDark-accent text-xs me-1" />
                                <ps-label class=" flex-grow font-light text-xs" > {{item ? item.mileage : ''}} </ps-label>  
                            </div>
                        </div>
                    </div>
                    
                    <div class="pt-1 pb-1 flex justify-between  "> 
                        <div class="flex mt-1 items-center">
                            <ps-label v-if="appInfoProvider.appInfo.data.psItemUploadConfig.conditionOfItemId== PsConst.ONE" 
                            class="ms-2 flex-grow font-medium text-xxs" > {{item ? item.conditionOfItem.name : ''}} </ps-label>  
                        </div>
                        <div v-if="item?.discountRate!='0' && appInfoProvider.appInfo.data.psItemUploadConfig.discountRate== PsConst.ONE" class="flex flex-col content-center items-center ">  
                            <div class="flex flex-row">
                                <ps-label class="line-through pt-0.5 ps-1 font-medium text-xs" > {{ item ? item.itemCurrency.currencySymbol : '' }} {{ formatPrice(item ? item.price : '') }} </ps-label>
                                <ps-label class="pt-0.5 ps-1 font-medium text-xs" > {{ ' - '+parseFloat(item.discountRate)+'%' }} </ps-label>
                            </div> 
                            <ps-label class=" pt-0.5 ps-1 font-medium text-base" > {{ item ? item.itemCurrency.currencySymbol : '' }} {{ formatPrice(item ? parseFloat(item.price)-(parseFloat(item.price)*(parseFloat(item.discountRate)/100)) : '') }} </ps-label>
                            
                        </div>
                        <div v-else class="flex content-center items-center py-2">                    
                            <ps-label class="pt-1 ps-1 font-medium text-base" > {{ item ? item.itemCurrency.currencySymbol : '' }} {{ formatPrice(item ? item.price : '') }} </ps-label>
                        </div>
                    </div>
                </ps-route-link>

            </div>

        </ps-card>
        <!-- Google ad -->
        <ps-card class=" w-full h-full flex justify-center items-center content-center " v-if="item?.adType==PsConst.GOOGLE_AD" >
            <div  class="w-full flex-grow-0 my-auto">
                <ps-ad-sense adStyle="display:inline-block; width: 200px; height: 200px"></ps-ad-sense>
            </div>
       </ps-card>
       <!-- END Pscard -->
        <ps-loading-dialog ref="ps_loading_dialog" />
        <share-to-social-modal ref="share_modal" />
        <ps-confirm-dialog ref="ps_confirm_dialog" />
        <ps-error-dialog ref="ps_error_dialog" />
        <ps-success-dialog ref="ps_success_dialog" />
    </div>
    <!-- END Pscard -->
</template>

<script lang="ts">

import { useRoute } from 'vue-router';
import router from "@/router";
import { ref } from 'vue';
// Components
import PsLabel from '@/components/core/label/PsLabel.vue';
import PsCard from '@/components/core/card/PsCard.vue';
import PsIcon from '@/components/core/icons/PsIcon.vue';
import PsConst from '@/object/constant/ps_constants';
import PsLoadingDialog from '@/components/core/dialog/PsLoadingDialog.vue';
import PsConfirmDialog from '@/components/core/dialog/PsConfirmDialog.vue';
import ShareToSocialModal from '@/components/layouts/share/ShareToSocialModal.vue';
import PsSuccessDialog from '@/components/core/dialog/PsSuccessDialog.vue';
import PsErrorDialog from '@/components/core/dialog/PsErrorDialog.vue';
import PsConfig from  '@/config/PsConfig';
import format from 'number-format.js';
import PsStatus from '@/api/common/PsStatus';
import PsAdSense from '@/components/core/adsense/PsAdSense.vue';


//language
import { i18n } from '@/assets/locales/index';

import { PsValueProvider } from "@/store/modules/core/PsValueProvider";
import PsRouteLink from '@/components/core/link/PsRouteLink.vue';
import PsUtils from '@/utils/PsUtils';
// Objects
import Product from '@/object/Product';

// Providers
import { createProductProviderState } from "@/store/modules/item/ProductProvider";
import { usePsValueHolderState } from '@/object/core/PsValueHolder';
import { createFavouriteItemProviderState } from "@/store/modules/item/FavouriteItemProvider";
import ReportItemHolder from '@/object/holder/ReportItemHolder';

import { createReportedItemProviderState } from '@/store/modules/item/ReportedItemProvider';
import { usePsAppInfoProviderState } from '@/store/modules/appinfo/AppInfoProvider';
import AppInfoParameterHolder from '@/object/holder/AppInfoParameterHolder';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { faGasPump,faRoad,faEllipsisV } from '@fortawesome/free-solid-svg-icons';
library.add(faGasPump,faRoad,faEllipsisV,faHeart)

export default {
    name : "ItemHorizontalItem",
    components : {        
        PsLabel,
        PsCard,
        PsIcon,
        PsLoadingDialog,
        PsRouteLink,
        PsConfirmDialog,
        ShareToSocialModal,
        PsErrorDialog,
        PsSuccessDialog,
        PsAdSense
    },
    props : {
        item : { type : Product,
        default: new Product },
        onClick : Function
    },
    emits: ['clickFav'],
    setup(props, context) {
        // Inject Provider
        const route = useRoute();
        PsValueProvider.psValueHolder = usePsValueHolderState();
        const productProvider = createProductProviderState();
        const psValueHolder = PsValueProvider.psValueHolder;
        const loginUserId = ref(psValueHolder.getLoginUserId());
        const FavouriteItemProvider = createFavouriteItemProviderState();
        const ps_loading_dialog = ref();
        const showMenu = ref(false);
        const share_modal = ref();
        const ps_confirm_dialog = ref();
        const reportItemHolder =new ReportItemHolder();
        const ps_error_dialog = ref();
        const ps_success_dialog = ref();
        const reportedItemProvider = createReportedItemProviderState();
        const appInfoParameterHolder = new AppInfoParameterHolder();
        appInfoParameterHolder.userId = loginUserId.value;
        const appInfoProvider = usePsAppInfoProviderState();
        appInfoProvider.loadDeleteHistory(appInfoParameterHolder);
        function formatPrice(value) {
            if(value.toString() == '0') {
                return i18n.global.t('item_price__free');
            }else {
                return format(appInfoProvider.appInfo.data.frontendConfigSetting.priceFormat, value);
            }
        }
        async function favouriteClicked() {
           
            if(psValueHolder.isUserLoggedIn()){
                ps_loading_dialog.value.openModal();
                if( props.item.isFavourited == '1' ){
                    ps_loading_dialog.value.message = i18n.global.t('item_horizontal_item__removing_item_from_favourite');
                }else{
                    ps_loading_dialog.value.message = i18n.global.t('item_horizontal_item__adding_item_to_favourite');
                }
                
                await FavouriteItemProvider.postFavourite(props.item.id, loginUserId.value);
               
                context.emit('clickFav', props.item.id);
                ps_loading_dialog.value.closeModal();
            }
            else{
                let tempParams = {};
                tempParams = route.query;
                tempParams['redirect'] = route.name;
                router.push({name : 'login', query : tempParams, params : route.params });
            }
            
        }
        function shareClicked(url){ 
            showMenu.value = false;
            share_modal.value.openModal(url, props.item.id, props.item.title);
        }
        // Report Item Functions
        function reportItemClicked() {
            if(psValueHolder.isUserLoggedIn()){
                ps_confirm_dialog.value.openModal(
                    i18n.global.t('item_horizontal_item__confirm'),
                    i18n.global.t('item_horizontal_item__confirm_to_report_item'),
                    i18n.global.t('item_horizontal_item__report'),
                    i18n.global.t('item_horizontal_item__cancel'),
                    () => {
                        showMenu.value = false;
                        doReport();
                    },
                    () => {
                        showMenu.value = false;
                        PsUtils.log("Cancel");
                    }
                );
            }
            else{
                let tempParams = {};
                tempParams = route.query;
                tempParams['redirect'] = route.name;
                router.push({name : 'login', query : tempParams, params : route.params });
            }
            
            
        }
        async function doReport(){
            reportItemHolder.itemId = props.item.id;
            reportItemHolder.reportedUserId = loginUserId.value;
            const item = await reportedItemProvider.addReportItem(reportItemHolder);
            if(item.status == PsStatus.SUCCESS){
                ps_error_dialog.value.openModal(item.message,'');
              
            }
            else{
                ps_success_dialog.value.openModal(item.message);
            }
            
        }
        return {
            productProvider,
            loginUserId,
            appInfoProvider,
            formatPrice,
            PsConst,
            psValueHolder,
            PsConfig,
            favouriteClicked,
            ps_loading_dialog,
            showMenu,
            reportItemClicked,
            shareClicked,
            ps_confirm_dialog,
            ps_success_dialog,
            ps_error_dialog,
            share_modal
        }
    }
}
</script>