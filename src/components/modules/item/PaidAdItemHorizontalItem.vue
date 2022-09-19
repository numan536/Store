<template>

    <div class="w-full">
        <!-- Pscard -->
        <ps-card class="flex w-full flex-col shadow-cardShadow" :enabledHover="true">
            
            <div  v-if="psValueHolder.showProfile == 'show'" class="flex items-center justify-between leading-none px-2 pt-2 pb-1  bg-background dark:bg-primaryDark-black">
                <div class="flex-grow flex items-center justify-between leading-none"> 
                    <ps-route-link class="flex flex-row items-center " :to="{ name: 'other-profile', params: {user_id: paiditem?.item.user.userId } }">
                        <div class="">
                            <img alt="Placeholder" class="rounded-full bg-transparent w-8 h-8 flex items-center justify-center object-cover" width="50px" height="50px" :src="itempaidProvider.imageUrl(paiditem ? paiditem.item.user.userProfilePhoto : '', 1)" @error="itempaidProvider.defaultProfileImage" >
                        </div>
                        <p class="ms-2 mt-1 text-sm flex-grow">
                            <span class="flex">
                                <ps-label class="truncate  text-xs font-medium" > {{paiditem ? paiditem.item.user.userName : ''}} </ps-label>
                                <img v-if="paiditem != null && paiditem.item.user.isVerifybluemark == '1'" alt="Placeholder" class="mx-1 w-4 h-4 object-fill" width="15px" height="10px" src="@/assets/images/mark2.png" >
                            </span>
                            <ps-label class=" font-medium text-xxs " textColor="text-secondary-400 dark:text-secondaryDark-grey" > {{ paiditem ? paiditem.item.addedDateStr : '' }}  </ps-label>
                        </p>
                    </ps-route-link>
                </div>
                <div> 
                    <font-awesome-icon @click="showMenu = !showMenu" :icon="['fas', 'ellipsis-v']" class="text-secondary-400 dark:text-secondaryDark-grey text-base me-1 cursor-pointer" />
                </div>
            </div> 
            <div class="px-2 py-2 bg-background dark:bg-primaryDark-black" :class="psValueHolder.showProfile == 'show' ? ' pt-0' : ''">
                <div class="relative h-36 ">
                    <div class="absolute cursor-default">
                        <img alt="Placeholder" class=" block object-cover w-screen h-36 " width="640px" height="360px" v-lazy="itempaidProvider.imageUrl(paiditem ? paiditem.item.defaultPhoto.imgPath : '',3) " @error="itempaidProvider.defaultCarImage"/>
                    </div>
                    <div v-if="showMenu" class="relative h-28 flex justify-between"> 
                        <ps-route-link class="flex-grow cursor-pointer " :to="{ name: 'item',params: { itemName: paiditem?.item?.title.split(' ').join('-').toLowerCase() }, query: { item_id: paiditem?.item?.id, item_name: paiditem?.item?.title.split(' ').join('-').toLowerCase()  }}">
                        </ps-route-link>
                         <div class=" mt-1 me-1 flex flex-col">
                            <ps-label class="bg-primary-000 dark:bg-primaryDark-black hover:bg-primary-100 dark:hover:bg-backgroundDark  px-2 py-1 text-xs cursor-pointer items-center  " textColor="text-secondary-400 dark:text-secondaryDark-grey" @click="shareClicked(paiditem?.item.dynamicLink)" >
                                {{ $t("item_horizontal_item__share") }}
                            </ps-label>
                            <ps-route-link class="flex-grow cursor-pointer " :to="{ name: 'item',params: { itemName: paiditem?.item?.title.split(' ').join('-').toLowerCase() }, query: { item_id: paiditem?.item?.id, item_name: paiditem?.item?.title.split(' ').join('-').toLowerCase()  }}">
                            </ps-route-link>
                        </div>
                        
                    </div>
                    <div v-else class="relative h-28 flex flex-col">
                        
                        <ps-route-link class="flex-grow cursor-pointer " :to="{ name: 'item',params: { itemName: paiditem?.item?.title.split(' ').join('-').toLowerCase() }, query: { item_id: paiditem?.item?.id, item_name: paiditem?.item?.title.split(' ').join('-').toLowerCase()  }}">
                            <paid-ad-item-paid-status :status="paiditem ? paiditem.paidStatus : ''"></paid-ad-item-paid-status>
                        </ps-route-link>
                    </div>
                    <div class="relative opacity-80 bg-primary-500 dark:bg-primaryDark-accent ">  
                        <ps-label v-if="paiditem && paiditem.item.isSoldOut == '1'" class="font-medium  text-base py-1.5 text-center" textColor="text-textLight "> {{ $t('item_horizontal_item__sold_out') }}</ps-label>
                    </div>
                    
                </div>
                
                <ps-route-link :to="{ name: 'item',params: { itemName: paiditem?.item?.title.split(' ').join('-').toLowerCase() }, query: { item_id: paiditem?.item?.id, item_name: paiditem?.item?.title.split(' ').join('-').toLowerCase()  }}">
                    <div class="pt-3 ps-1">
                        <ps-label class=" truncate font-medium text-xs" > {{paiditem ? paiditem.item.title : ''}} </ps-label>
                        
                    </div>
                    <div class="py-2 ps-1  "> 
                        <div class="flex items-center">
                            <ps-icon textColor="text-secondary-400 dark:text-secondaryDark-grey" name="location" h="13" w="13" class=" me-1" />
                            <ps-label class="truncate font-light text-xxs " textColor="text-secondary-400 dark:text-secondaryDark-grey"> {{paiditem ? paiditem.item.itemLocation.name : ''}} </ps-label>
                        </div>
                    </div>

                    <div v-if="appInfoProvider.appInfo.data.psItemUploadConfig.steeringPosition== PsConst.ONE ||
                                appInfoProvider.appInfo.data.psItemUploadConfig.fuelTypeId== PsConst.ONE ||
                                appInfoProvider.appInfo.data.psItemUploadConfig.transmissionId== PsConst.ONE ||
                                appInfoProvider.appInfo.data.psItemUploadConfig.mileage== PsConst.ONE" 
                    class="py-2 px-1 bg-primary-000 dark:bg-secondaryDark-100 flex-col   "> 
                        <div class="py-1 grid grid-cols-2 gap-y-1.5">
                            <div v-if="appInfoProvider.appInfo.data.psItemUploadConfig.steeringPosition== PsConst.ONE" class="w-full flex items-start">
                                <ps-icon textColor="text-primary-500 dark:text-primaryDark-accent" viewBox="0 0 512 512" name="steeringWheel" h="14" w="14" />
                                <ps-label  class="ms-1  font-light text-xs" > {{paiditem ? paiditem.item.steeringPosition : ''}} </ps-label>  
                            </div>
                            <div  v-if="appInfoProvider.appInfo.data.psItemUploadConfig.fuelTypeId== PsConst.ONE" class="w-full flex items-start">
                                <font-awesome-icon :icon="['fas', 'gas-pump']" class="text-primary-500 dark:text-primaryDark-accent text-xs me-2" />
                                <ps-label class=" flex-grow font-light text-xs" > {{paiditem ? paiditem.item.fuelType.name : ''}} </ps-label>  
                            </div>
                            <div  v-if="appInfoProvider.appInfo.data.psItemUploadConfig.transmissionId== PsConst.ONE"  class="w-full flex items-start">
                                <ps-icon  textColor="text-primary-500 dark:text-primaryDark-accent" viewBox="0 0 512 512" name="gearStick" h="14" w="14" />
                                <ps-label class=" ms-1 font-light text-xs" >{{paiditem ? paiditem.item.transmission.name : ''}} </ps-label>  
                            </div>
                            <div  v-if="appInfoProvider.appInfo.data.psItemUploadConfig.mileage== PsConst.ONE"  class="w-full flex items-start">
                                <font-awesome-icon :icon="['fas', 'road']" class="text-primary-500 dark:text-primaryDark-accent text-xs me-1" />
                                <ps-label class=" flex-grow font-light text-xs" > {{paiditem ? paiditem.item.mileage : ''}} </ps-label>  
                            </div>
                        </div>
                    </div>
                    
                    <div class="pt-1 pb-1 flex justify-between  "> 
                        <div class="flex mt-1 items-center">
                            <ps-label v-if="appInfoProvider.appInfo.data.psItemUploadConfig.conditionOfItemId== PsConst.ONE" 
                            class="ms-2 flex-grow font-medium text-xxs" > {{paiditem ? paiditem.item.conditionOfItem.name : ''}} </ps-label>  
                        </div>
                        <div v-if="paiditem?.item?.discountRate!='0' && appInfoProvider.appInfo.data.psItemUploadConfig.discountRate== PsConst.ONE" class="flex flex-col content-center items-center ">  
                            <div class="flex flex-row">
                                <ps-label class="line-through pt-0.5 ps-1 font-medium text-xs" > {{ paiditem ? paiditem.item.itemCurrency.currencySymbol : '' }} {{ formatPrice(paiditem ? paiditem.item.price : '') }} </ps-label>
                                <ps-label class="pt-0.5 ps-1 font-medium text-xs" > {{ ' - '+parseFloat(paiditem ? paiditem.item.discountRate : '0')+'%' }} </ps-label>
                            </div> 
                            <ps-label class=" pt-0.5 ps-1 font-medium text-base" > {{ paiditem ? paiditem.item.itemCurrency.currencySymbol : '' }} {{ formatPrice(paiditem ? parseFloat(paiditem.item.price)-(parseFloat(paiditem.item.price)*(parseFloat(paiditem.item.discountRate)/100)) : '') }} </ps-label>
                            
                        </div>
                        <div v-else class="flex content-center items-center py-2">                    
                            <ps-label class="pt-1 ps-1 font-medium text-base" > {{ paiditem ? paiditem.item.itemCurrency.currencySymbol : '' }} {{ formatPrice(paiditem ? paiditem.item.price : '') }} </ps-label>
                        </div>
                    </div>
                

                    <ps-line class="mt-2 mx-3"/>
                    <div class="pt-2 px-1  "> 
                        <div class="flex flex-row  justify-between mt-1">
                            <ps-label class=" font-light text-xs mt-0.5" textColor="text-secondary-400 dark:text-secondaryDark-grey" >{{ $t('paid_item_horizontal_item__start') }}:  </ps-label>
                            <ps-label class="ms-1 font-medium text-sm" >  {{ paiditem ? paiditem.startDate : ''}} </ps-label>
                        </div>     
                    </div>

                    <div class="pt-2 px-1  "> 
                        <div class="flex flex-row  justify-between mt-1">
                            <ps-label class="font-light text-xs mt-0.5" textColor="text-secondary-400 dark:text-secondaryDark-grey" >{{ $t('paid_item_horizontal_item__end') }}:  </ps-label>
                            <ps-label class="ms-1 font-medium text-sm"> {{paiditem ? paiditem.endDate : ''}} </ps-label>
                        </div>     
                    </div>

                    <div class="pt-2 px-1  "> 
                        <div class="flex flex-row  justify-between mt-1">
                            <ps-label class="font-light text-xs mt-0.5" textColor="text-secondary-400 dark:text-secondaryDark-grey" >{{ $t('paid_item_horizontal_item__total_spending') }}:  </ps-label>
                            <ps-label class="ms-1 font-medium text-sm"> {{paiditem ? paiditem.item.itemCurrency.currencySymbol : ''}} {{paiditem ? paiditem.amount : ''}} </ps-label>
                        </div>     
                    </div>
                    <div class="mb-4"/>
                </ps-route-link>

            </div>

        </ps-card>
        
        <share-to-social-modal ref="share_modal" />

    </div>
    <!-- END Pscard -->
</template>

<script lang="ts">

import { ref } from 'vue';
// Components
import PsLabel from '@/components/core/label/PsLabel.vue';
import PaidAdItemPaidStatus from './PaidAdItemPaidStatus.vue';
import PsCard from '@/components/core/card/PsCard.vue';
import PsIcon from '@/components/core/icons/PsIcon.vue';
import PsLine from '@/components/core/line/PsLine.vue';
import ShareToSocialModal from '@/components/layouts/share/ShareToSocialModal.vue';
import PsRouteLink from '@/components/core/link/PsRouteLink.vue';

//language
import { i18n } from '@/assets/locales/index';

import format from 'number-format.js';

// Objects
import PaidAdItem from '@/object/PaidAdItem';
import PsConst from '@/object/constant/ps_constants';

// Providers
import { createPaidAdItemProviderState } from "@/store/modules/item/PaidAdItemProvider";
import { usePsAppInfoProviderState } from '@/store/modules/appinfo/AppInfoProvider';
import AppInfoParameterHolder from '@/object/holder/AppInfoParameterHolder';
import { PsValueProvider } from "@/store/modules/core/PsValueProvider";
import { usePsValueHolderState } from '@/object/core/PsValueHolder';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faGasPump,faRoad,faEllipsisV } from '@fortawesome/free-solid-svg-icons';
library.add(faGasPump,faRoad,faEllipsisV)

export default {
    name : "PaidAdItemHorizontalItem",
    components : {        
        PsLabel,
        PsCard,
        PsIcon,
        PsLine,
        PaidAdItemPaidStatus,
        ShareToSocialModal,
        PsRouteLink
    },
    props : {
        paiditem : { type : PaidAdItem } ,
        onClick : Function
    },
    setup(props) {
        
        const showMenu = ref(false);
        const share_modal = ref();
        // Inject Provider
        PsValueProvider.psValueHolder = usePsValueHolderState();
        const itempaidProvider = createPaidAdItemProviderState();
        const psValueHolder = PsValueProvider.psValueHolder;
        const appInfoParameterHolder = new AppInfoParameterHolder();
        const loginUserId = ref(psValueHolder.getLoginUserId());
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
        function shareClicked(url){ 
            showMenu.value = false;
            share_modal.value.openModal(url, props.paiditem?.item.id, props.paiditem?.item.title);
        }
        return {
            itempaidProvider,
            shareClicked,
            formatPrice,
            share_modal,
            showMenu,
            appInfoProvider,
            psValueHolder,
            PsConst
        }
    }
}
</script>