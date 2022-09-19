<template>
    <div>
    <div class="sm:mt-28 lg:mt-32 mt-28 w-mobile sm:w-median lg:w-large mx-auto">
        <div>
            <!-- <div class="flex flex-col"> -->
            <div class="flex items-center "> 
                <ps-route-link
                    :to="{name: 'dashboard'}"> 
                    <ps-label textColor="text-secondary-400 dark:text-secondaryDark-grey "
                        class="hover:underline cursor-pointer font-medium text-xxs"> 
                                {{ $t("profile__home") }}
                    </ps-label>      
                </ps-route-link>
                
                <ps-icon name="rightArrow" class='text-secondary-400 dark:text-secondaryDark-grey  mx-0 sm:mx-2'/>
                <ps-label textColor="text-secondary-400 dark:text-secondaryDark-grey " class="font-medium text-xxs"> {{ $t("profile__account") }}</ps-label>
            </div>

            <ps-label  class="mt-2 font-medium lg:text-3xl text-2xl"> {{ $t("profile__profile") }}</ps-label>

                <div class="grid lg:grid-cols-12 sm:grid-cols-6 grid-cols-4  gap-4 sm:gap-3.5 lg:gap-4 ">
                    <!-- User Profile Normal -->
                    <div class='w-full  col-span-4 sm:col-span-2 lg:col-span-3 mt-2 ' >
                        <ps-card class="flex flex-col bg-secondary-000 dark:bg-primaryDark-black p-5">
                            <div class="w-5/6 mx-auto sm:w-full">
                                <img alt="Placeholder"  width="30px" height="30px"  class="rounded-full w-24 h-24 object-cover mx-auto" :src="userProvider.imageUrl(userProvider.user.data ? userProvider.user.data.userProfilePhoto : '',2)" @error="userProvider.defaultProfileImage" >
                                <div class="flex flex-col mt-3 justify-center"> 
                                    <ps-label class=" text-center text-base" textColor="text-secondary-600 dark:text-secondaryDark-white"> {{  userProvider.user.data ? userProvider.user.data.userName:'' }} </ps-label>
                                    <div v-if="userProvider.user.data?.isVerifybluemark == '1'" class=" mt-3 w-32 mx-auto flex flex-row justify-center py-1.5 px-3 bg-primary-500 dark:bg-primaryDark-accent rounded-2xl">
                                        <ps-label textColor="text-textLight " class=" text-center text-xs"> {{ $t("profile__verified_dealer") }}  </ps-label>
                                        <ps-icon name="check" w="12" h="12" textColor="text-textLight " />
                                    </div>
                                    
                                </div>
                                <ps-route-link :to="{ name: 'review-list',query: { user_id: loginUserId } }">
                                <div class="flex items-center content-center justify-center  mt-3 px-4">
                                    <rating :grade="userProvider.user.data ? userProvider.user?.data?.overallRating:0" :maxStars="5" :hasCounter="true" />
                                    <ps-label-caption class="ms-1 mt-1">{{  userProvider.user.data ? userProvider.user.data.overallRating:'' }} ({{  userProvider.user.data ? userProvider.user.data.ratingCount:'' }})</ps-label-caption>
                                </div>
                                </ps-route-link>
                                <ps-label v-if="userProvider.user.data && userProvider.user.data.isShowEmail == '1' " class="font-light text-xs mt-1 text-center"> {{  userProvider.user.data ? userProvider.user.data.userEmail:'' }} </ps-label>
                                <ps-label v-if="userProvider.user.data && userProvider.user.data.isShowPhone == '1' " class="font-light text-xs mt-1 text-center"> {{  userProvider.user.data ? userProvider.user.data.userPhone:'' }} </ps-label>
                                <ps-label class="font-light text-xs mt-4 text-center"> {{  userProvider.user.data ? userProvider.user.data.userAboutMe:'' }} </ps-label>
                            </div>
                            <div  class="w-5/6 mx-auto sm:w-full">
                                <ps-label class="font-light text-xs mt-4 text-center" textColor="text-secondary-400  dark:text-secondaryDark-grey">{{ $t("profile__joined") }} - {{userProvider.user.data ? userProvider.user.data.addedDate:''}}</ps-label>
    
                                <div v-if="isPaidApp" class="mt-2 flex justify-between">
                                    <ps-label class="font-light text-sm">{{ $t("profile__posts_left") }} : </ps-label>
                                    <ps-label class="font-medium text-xl"> {{userProvider.user.data ? userProvider.user.data.remainingPost:'0'}}</ps-label>
                                </div>
                                <div class="mt-2 flex justify-between">
                                    <ps-label class="font-light text-sm">{{ $t("profile__active_lists") }} : </ps-label>
                                    <ps-label  class="font-medium text-xl">{{userProvider.user.data ? userProvider.user.data.activeItemCount:'0'}}</ps-label>
                                </div>
                                <div class="mt-2 flex justify-between">
                                    <ps-label class="font-light text-sm">{{ $t("profile__followers") }} : </ps-label>
                                    <ps-label class="font-medium text-xl"> {{userProvider.user.data ? userProvider.user.data.followerCount:'0'}}</ps-label>
                                </div>
                                <div class="mt-2 flex justify-between">
                                    <ps-label class="font-light text-sm">{{ $t("profile__followings") }} : </ps-label>
                                    <ps-label  class="font-medium text-xl">{{userProvider.user.data ? userProvider.user.data.followingCount:'0'}}</ps-label>
                                </div>
                                
                                <div class=" text-center mt-4">
                                    <ps-route-link 
                                        :to="{name: 'edit-profile' }"> 
                                        <ps-button rounded="rounded-2xl" textSize="text-xs" class=" w-full mx-auto" > {{ $t("profile__edit") }} </ps-button>
                                    </ps-route-link>
                                </div>
                                <div v-if="userProvider.user.data?.isVerifybluemark == '0' || userProvider.user.data?.isVerifybluemark == '3'" class="mt-2 py-2 text-center w-full border border-primary-500 dark:border-primaryDark-accent rounded-2xl  lg:w-full mx-auto mb-2"  @click="openApplyUserBluemark(loginUserId)">
                                    
                                    <ps-label class="text-xs cursor-pointer" textColor="text-primary-500 dark:text-primaryDark-accent" > {{ $t("profile__apply_user_blue_mark") }} </ps-label>
                                
                                </div>
                                <div class="mt-2 py-2 text-center w-full border border-primary-500 dark:border-primaryDark-accent rounded-2xl mx-auto mb-2" @click="openUserDeactivate(loginUserId)">
                                    
                                    <ps-label class="text-xs cursor-pointer" textColor="text-primary-500 dark:text-primaryDark-accent"> {{ $t("profile__deactivate_account") }} </ps-label>
                                
                                </div> 
                                
                            </div>
                        </ps-card>

                        <div class="flex mt-4 mb-4">
                            <div class="flex-grow">
                            <ps-button class="shadow-buttonShadow hover:shadow-none w-full " @click='openMoreUserSetting' >{{ $t("profile__user_setting") }} </ps-button>                                
                            </div>
                        </div>
                         <!-- google adsense desktop view -->
                       <div class="hidden md:block">
                            <ps-ad-sense adStyle="width:220px;height:500px;" adFormat="rectangle, vertical"></ps-ad-sense>
                        </div>

         
                    </div>
                    <!-- End User Profile Normal -->
                    <div class="w-full col-span-4 sm:col-span-4 lg:col-span-9 mt-2  mb-6">

                        <div class="flex flex-row border-b border-primary-500" >
                            <div class="flex w-36 justify-cener"  @click="showCell = 1" :class="showCell == 1 ? 'bg-primary-500 dark:bg-primaryDark-accent' : 'cursor-pointer'">
                                <ps-label class="sm:text-sm lg:text-base text-xs flex-shink-0 mx-auto py-2" :textColor="showCell == 1 ? 'text-textLight' : 'text-secondary-400 dark:text-secondaryDark-grey'" > {{ $t("profile__promote_and_paid_ads") }} </ps-label>
                            </div>
                            <div class="flex w-36 justify-cener"  @click="showCell = 2" :class="showCell == 2 ? 'bg-primary-500 dark:bg-primaryDark-accent' : 'cursor-pointer'">
                                <ps-label class="sm:text-sm lg:text-base text-xs flex-shink-0 mx-auto py-2"  :textColor="showCell == 2 ? 'text-textLight' : 'text-secondary-400 dark:text-secondaryDark-grey'" > {{ $t("profile__active_listing") }} </ps-label>
                            </div>
                            <div class="flex w-36 justify-cener "  @click="showCell = 3" :class="showCell == 3 ? 'bg-primary-500 dark:bg-primaryDark-accent' : 'cursor-pointer'">
                                <ps-label class="sm:text-sm lg:text-base text-xs flex-shink-0 mx-auto py-2" :textColor="showCell == 3 ? 'text-textLight' : 'text-secondary-400 dark:text-secondaryDark-grey'" >  {{ $t("profile__pending_listing") }} </ps-label>
                            </div>
                            <div v-if="isPaidApp" class="flex w-36 justify-cener "  @click="showCell = 4" :class="showCell == 4 ? 'bg-primary-500 dark:bg-primaryDark-accent' : 'cursor-pointer'">
                                <ps-label class="sm:text-sm lg:text-base text-xs flex-shink-0 mx-auto py-2" :textColor="showCell == 4 ? 'text-textLight' : 'text-secondary-400 dark:text-secondaryDark-grey'" >  {{ $t("profile__pending_package") }} </ps-label>
                            </div>
                        </div>

                        <!-- paid & promote ads -->
                        <div v-if="showCell == 1">  
                            <div  v-if="itempaidProvider.paidAdItemList != null && itempaidProvider.loading.value ">
                                <!-- <div class="">
                                    <ps-label-header-4 class="font-medium"> {{ $t("profile__promote_and_paid_ads") }} </ps-label-header-4>
                                </div> -->
                                <div class="w-full mt-6">
                                    <div class="grid grid-cols-2 lg:grid-cols-3  gap-4 sm:gap-3.5 lg:gap-4  ">

                                        <!-- Paid & Promote Ads List -->                                    
                                            <div class="w-full col-span-2 sm:col-span-1" v-for="i in 3" :key="i">
                                            <item-horizontal-skeletor-item />
                                        </div>                                    
                                        <!-- END Paid & Promote Ads List -->

                                    </div>
                                </div>
                            </div>
                            <div v-else-if="itempaidProvider.paidAdItemList?.data != null" class=" ">
                                <!-- <div class="">
                                    <ps-label-header-4 class="font-medium"> {{ $t("profile__promote_and_paid_ads") }} </ps-label-header-4>
                                    
                                </div> -->
                                <div class="w-full mt-6">
                                    <div class="grid grid-cols-2 lg:grid-cols-3  gap-4 sm:gap-3.5 lg:gap-4  ">

                                        <!-- Paid & Promote Ads List -->                                    
                                            <div 
                                                class="w-full col-span-2 sm:col-span-1 " 
                                                v-for="paiditem in itempaidProvider.paidAdItemList.data.slice(0, 6)" 
                                                :key="paiditem.id">                                            
                                                <paid-ad-item-horizontal-item  :paiditem="paiditem" />  
                                            </div>                                    
                                        <!-- END Paid & Promote Ads List -->

                                    </div>
                                    
                                </div>
                            </div>
                            <div v-else-if="itempaidProvider.paidAdItemList?.data == null" class="mt-6 ">
                                <div class="w-full mt-6 flex justify-center">
                                    <ps-label class="text-sm flex-shink-0 m-auto py-8" textColor="text-secondary-400  dark:text-secondaryDark-white" > {{ $t("profile__nothing_in_promote") }} </ps-label>
                                </div>
                            </div>
                            
                            <div v-if="itempaidProvider.paidAdItemList?.data != null" class="justify-end flex mt-6">
                                <div class="flex-grow-0">
                                    <ps-route-link :to="{ name: 'paid-items'}">
                                        <ps-button class="flex flex-row shadow-buttonShadow hover:shadow-none" theme="bg-primary-500 dark:bg-primaryDark-accent text-textLight capitalize px-4 py-1"> {{ $t("profile__view_all") }} 
                                            <ps-icon textColor="text-textLight" class="ms-1 mt-1" name="arrowNarrowRight" h="20" w="24"/> 
                                        </ps-button>
                                    </ps-route-link>
                                </div>
                                    
                            </div>
                        </div>
                        <!-- end paid ads -->

                        <!-- active listing -->
                        <div v-if="showCell == 2">  
                            <div v-if="itemProvider.productList != null && itemProvider.loading.value ">
                                <!-- <ps-label-header-4 class=" mt-3 font-medium"> {{ $t("profile__active_listing") }} </ps-label-header-4> -->
                                <div class="mt-6">
                                    <div class="grid grid-cols-2 lg:grid-cols-3  gap-4 sm:gap-3.5 lg:gap-4   ">
                                        <div class="w-full col-span-2 sm:col-span-1 " v-for="i in 3" :key="i">
                                            <item-horizontal-skeletor-item />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-else-if="itemactiveProvider.productList?.data != null" class=" ">
                                <!-- <div class="flex justify-between">
                                    <ps-label-header-4 class=" mt-3 font-medium"> {{ $t("profile__active_listing") }} </ps-label-header-4>
                                
                                </div> -->
                                <div class="mt-6">
                                    <div class="grid grid-cols-2 lg:grid-cols-3  gap-4 sm:gap-3.5 lg:gap-4   ">
                                        <!-- Active Listing -->
                                        <div class="w-full col-span-2 sm:col-span-1 " 
                                            v-for="item in itemactiveProvider.productList.data.slice(0, 6)" 
                                            :key="item.id"> 
                                            <profile-item-horizontal-item  :item="item" />    
                                        </div>                                    
                                        <!-- END Active Listing -->
                                    </div>
                                </div>
                            </div>
                            
                            <div v-else-if="itemactiveProvider.productList?.data == null" class=" mt-6">
                                <div class="w-full mt-6 flex justify-center">
                                    <ps-label class="text-sm flex-shink-0 m-auto py-8" textColor="text-secondary-400  dark:text-secondaryDark-white" > {{ $t("profile__nothing_in_active") }}  </ps-label>
                                </div>
                            </div>
                            <div v-if="itemactiveProvider.productList?.data != null" class="justify-end flex mt-6">
                                <div class="flex-grow-0">
                                    <ps-route-link class="" :to="{name: 'active-items' }">
                                        <ps-button class="flex flex-row shadow-buttonShadow hover:shadow-none" theme="bg-primary-500 dark:bg-primaryDark-accent text-textLight capitalize px-4 py-1"> {{ $t("profile__view_all") }} 
                                            <ps-icon textColor="text-textLight " class="ms-1 mt-1" name="arrowNarrowRight" h="20" w="24"/> </ps-button>
                                    </ps-route-link>
                                </div>
                                    
                            </div>
                        </div>
                        <!-- end active listing -->

                        <div v-if="showCell == 3">  
                            <!-- pending listing -->
                           <div v-if="itempendingProvider.productList != null && itempendingProvider.loading.value ">
                                <!-- <ps-label-header-4 class=" mt-3 font-medium"> {{ $t("profile__active_listing") }} </ps-label-header-4> -->
                                <div class="mt-6">
                                    <div class="grid grid-cols-2 lg:grid-cols-3  gap-4 sm:gap-3.5 lg:gap-4   ">
                                        <div class="w-full col-span-2 sm:col-span-1 " v-for="i in 3" :key="i">
                                            <item-horizontal-skeletor-item />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-else-if="itempendingProvider.productList?.data != null" class="">
                                <!-- <div class="">
                                    <ps-label-header-4 class="mt-3 font-medium"> {{ $t("profile__pending_listing") }} </ps-label-header-4>
                                    
                                </div> -->
                            
                                <div class="mt-6">
                                    <div class="grid grid-cols-2 lg:grid-cols-3  gap-4 sm:gap-3.5 lg:gap-4  ">

                                        <!-- Pending Listing -->
                                        <div class="w-full col-span-2 sm:col-span-1 " v-for="item in itempendingProvider.productList.data.slice(0, 3)" :key="item.id">
                                            <profile-item-horizontal-item  :item="item" />    
                                        </div>
                                        <!-- END Pending Listing -->

                                    </div>                                
                                </div>
                            </div>
                            <div v-else-if="itempendingProvider.productList?.data == null" class=" mt-6">
                                <div class="w-full mt-6 flex justify-center">
                                    <ps-label class="text-sm flex-shink-0 m-auto py-8" textColor="text-secondary-400  dark:text-secondaryDark-white" > {{ $t("profile__nothing_in_pending") }} </ps-label>
                                </div>
                            </div>
                            <div v-if="itempendingProvider.productList?.data != null" class="justify-end flex mt-6">
                                <div class="flex-grow-0">
                                    <ps-route-link class="" :to="{name: 'pending-items' }">
                                        <ps-button class="flex flex-row shadow-buttonShadow hover:shadow-none" theme="bg-primary-500 dark:bg-primaryDark-accent text-textLight capitalize px-4 py-1"> {{ $t("profile__view_all") }} 
                                            <ps-icon textColor="text-textLight " class="ms-1 mt-1" name="arrowNarrowRight" h="20" w="24"/> </ps-button>
                                    </ps-route-link>
                                </div>
                                    
                            </div>
                            <!-- end pending listing -->
                        </div>
                        <div v-if="showCell == 4">  

                            <div v-if="limitProvider.buyadList?.data != null" class="">
                            
                                <div class="mt-6">
                                    <div class="grid grid-cols-2 lg:grid-cols-3  gap-4 sm:gap-3.5 lg:gap-4  ">

                                        <!-- limit sd Listing -->
                                        <div class="w-full col-span-2 sm:col-span-1" v-for="buyad in limitProvider.buyadList.data.slice(0,6)" :key="buyad.id">
                                            <limit-ad-horizontal-item  :buyad="buyad" />     
                                        </div>
                                        <!-- END limit ad Listing -->

                                    </div>                                
                                </div>
                            </div>
                            <div v-else class=" mt-6">
                                <div class="w-full mt-6 flex justify-center">
                                    <ps-label class="text-sm flex-shink-0 m-auto py-8" textColor="text-secondary-400  dark:text-secondaryDark-white" > {{ $t("list__no_result") }} </ps-label>
                                </div>
                            </div>
                            <div v-if="limitProvider.loading.value == false" class="justify-end flex mt-6">
                                <div class="flex-grow-0">
                                    <ps-route-link class="" :to="{name: 'limit' }">
                                        <ps-button class="flex flex-row shadow-buttonShadow hover:shadow-none" theme="bg-primary-500 dark:bg-primaryDark-accent text-textLight capitalize px-4 py-1"> {{ $t("profile__view_all") }} 
                                            <ps-icon textColor="text-textLight " class="ms-1 mt-1" name="arrowNarrowRight" h="20" w="24"/> </ps-button>
                                    </ps-route-link>
                                </div>
                                    
                            </div>
                            <div v-else class="justify-center flex mt-6">
                                <div class="flex-grow-0">
                                   
                                    <ps-button class="flex flex-row " theme="bg-primary-500 dark:bg-primaryDark-accent text-textLight capitalize px-4 py-1"> {{ $t("list__loading") }} </ps-button>
                                            
                                </div>
                                    
                            </div>
                            <!-- end pending listing -->
                        </div>

                    </div>
             
                </div>
            <!-- </div> -->
        </div>
    </div>

    <user-setting-modal ref="user_setting_modal" />

    <user-blue-mark-modal ref="user_blue_mark_modal" />

    <ps-confirm-dialog ref='ps_confirm_dialog' />

    <ps-loading-dialog ref="psloading"  :isClickOut='false'/>
</div>
</template>

<script lang="ts">

import PsLabel from '@/components/core/label/PsLabel.vue';
import PsLabelCaption from '@/components/core/label/PsLabelCaption.vue';
import PsCard from '@/components/core/card/PsCard.vue';
import PsIcon from '@/components/core/icons/PsIcon.vue';
import LimitAdHorizontalItem from "@/components/modules/item/LimitAdHorizontalItem.vue";
import Rating from '@/components/core/rating/Rating.vue';
import PsButton from '@/components/core/buttons/PsButton.vue';
import PsRouteLink from '@/components/core/link/PsRouteLink.vue';
import PsAdSense from '@/components/core/adsense/PsAdSense.vue';

import ProfileItemHorizontalItem from "@/components/modules/item/ProfileItemHorizontalItem.vue";
import PaidAdItemHorizontalItem from "@/components/modules/item/PaidAdItemHorizontalItem.vue";
import ItemHorizontalSkeletorItem from "@/components/modules/item/ItemHorizontalSkeletorItem.vue";
import ProductParameterHolder from "@/object/holder/ProductParameterHolder";

import { createProductProviderState } from "@/store/modules/item/ProductProvider";
import { createPaidAdItemProviderState } from "@/store/modules/item/PaidAdItemProvider";
import { createUserProviderState } from "@/store/modules/user/UserProvider";
import { PsValueProvider } from "@/store/modules/core/PsValueProvider";

import router from "@/router";
import PsConst from '@/object/constant/ps_constants';
import "vue-skeletor/dist/vue-skeletor.css";
import UserBlueMarkModal from '@/components/modules/user/UserBlueMarkModal.vue';
import { ref, defineAsyncComponent } from 'vue';
import PsConfirmDialog from '@/components/core/dialog/PsConfirmDialog.vue';
import UserDeleteItemParameterHolder from '@/object/holder/UserDeleteItemParameterHolder';
import PsLoadingDialog from '@/components/core/dialog/PsLoadingDialog.vue';
import PsStatus from '@/api/common/PsStatus';
import { i18n } from '@/assets/locales/index';
import PsUtils from '@/utils/PsUtils';
import { createLimitAdItemProviderState } from "@/store/modules/limit/LimitAdItemProvider";

import { usePsAppInfoProviderState } from '@/store/modules/appinfo/AppInfoProvider';
import AppInfoParameterHolder from '@/object/holder/AppInfoParameterHolder';

const UserSettingModal = defineAsyncComponent(() => import('@/components/modules/user/UserSettingModal.vue'));

export default {
    name : "ProfileView",
    components : {
        PsCard,
        PsLabelCaption,
        // PsLabelHeader4,
        PsButton,
        ProfileItemHorizontalItem,
        PaidAdItemHorizontalItem,
        ItemHorizontalSkeletorItem,
        Rating,
        LimitAdHorizontalItem,
        PsIcon,
        PsLabel,
        PsRouteLink,
        UserSettingModal,
        PsConfirmDialog,
        PsLoadingDialog,
        UserBlueMarkModal,
        PsAdSense
    },
    setup() {
      
        const psValueHolder = PsValueProvider.psValueHolder;

        //Modals
        const user_setting_modal = ref();
        const user_blue_mark_modal = ref();
        const dealer_modal = ref();
        const ps_confirm_dialog = ref();
        const psloading = ref();
        const showCell = ref(1);

        // Inject Item Provider
        const itemProvider = createProductProviderState();
        const itempaidProvider = createPaidAdItemProviderState();
        const itemactiveProvider = createProductProviderState();
        const itempendingProvider = createProductProviderState();
        const itemrejectProvider = createProductProviderState();
        const userProvider = createUserProviderState();
        const appInfoProvider = usePsAppInfoProviderState();
        const appInfoParameterHolder = new AppInfoParameterHolder();
        const limitProvider = createLimitAdItemProviderState();
       
        const userdelete = new UserDeleteItemParameterHolder();
         // For Radio
         
        itemProvider.id = "Id from Dashboard";
        const loginUserId = psValueHolder.getLoginUserId();
        appInfoParameterHolder.userId = loginUserId;
        const isPaidApp = ref (false);
        

        loadData();

        async function loadData(){

            await userProvider.getUser(loginUserId);
            await appInfoProvider.loadDeleteHistory(appInfoParameterHolder);
            if(appInfoProvider?.appInfo?.data.psAppSetting?.isPaidApp == PsConst.ONE){
                isPaidApp.value = true;
            }
        }


        // Load Item List
        const latitude  =  psValueHolder.locationLat == null || psValueHolder.locationLat == '' ? '0' : psValueHolder.locationLat;
        const longitude =  psValueHolder.locationLng == null || psValueHolder.locationLng == '' ? '0' : psValueHolder.locationLng;
        const holder = new ProductParameterHolder().getPaidItemParameterHolder();
        holder.addedUserId = loginUserId;
        holder.lat = latitude.toString();
        holder.lng = longitude.toString();
        holder.mile = appInfoProvider.appInfo.data.frontendConfigSetting.mile;
        const holder1 = new ProductParameterHolder().resetParameterHolder();
        holder1.addedUserId = loginUserId;
        holder1.lat = latitude.toString();
        holder1.lng = longitude.toString();
        holder1.mile = appInfoProvider.appInfo.data.frontendConfigSetting.mile;
        const holder2 = new ProductParameterHolder().getPendingItemParameterHolder();
        holder2.addedUserId = loginUserId;
        holder2.lat = latitude.toString();
        holder2.lng = longitude.toString();
        holder2.mile = appInfoProvider.appInfo.data.frontendConfigSetting.mile;
        const holder3 = new ProductParameterHolder().getRejectedItemParameterHolder();
        holder3.addedUserId = loginUserId;
        holder3.lat = latitude.toString();
        holder3.lng = longitude.toString();
        holder3.mile = appInfoProvider.appInfo.data.frontendConfigSetting.mile;
        itemProvider.loadItemList(loginUserId, holder);
        itempaidProvider.loadPaidAdItemList(loginUserId);
       
        itemactiveProvider.loadItemList(loginUserId, holder1);
        itempendingProvider.loadItemList(loginUserId, holder2);
        itemrejectProvider.loadItemList(loginUserId, holder3);
        limitProvider.resetPaidAdItemList(loginUserId);

        // Load User By ID List
        userProvider.getUser(loginUserId);

        function itemClicked(item: any) {
            // Redirect
            router.push({
                name: "item",
                query: { itemId: item.id, itemName: item.title },
            });
        }

        // confirm dialog for user deactivate

        function openUserDeactivate(loginUserId) {
           ps_confirm_dialog.value.openModal(
                i18n.global.t('profile__confirm'),
                i18n.global.t('profile__are_you_sure_to_deactivate'),
                i18n.global.t('profile__ok'),
                i18n.global.t('profile__cancel'),
                () => {
                   
                    doDeactivate(loginUserId);
                },
                () => {
                    PsUtils.log("Cancel");
                }
            );
        }

        // Deactive Account

        async function doDeactivate(loginUserId) {

            userdelete.userId = loginUserId;
           
            psloading.value.openModal();
            const returnData = await userProvider.postDeleteUser(userdelete);
            
            if(returnData.status == PsStatus.SUCCESS) {

                psValueHolder.logout();
                 psloading.value.closeModal();
               
                // Redirect
                router.push({
                    name: "dashboard",
                });
               
                
            }else {
             
                psloading.value.closeModal();

            }

        }

        // Verify blue mark user
        function openApplyUserBluemark(loginUserId) {
           user_blue_mark_modal.value.openModal(
                loginUserId
            );
        }

        function openMoreUserSetting() {
            user_setting_modal.value.openModal();
        }


        return {
            itemProvider,
            limitProvider,
            itempaidProvider,
            PsValueProvider,
            userProvider,
            itemClicked,
            itemactiveProvider,
            itemrejectProvider,
            itempendingProvider,
            user_setting_modal,
            user_blue_mark_modal,
            openMoreUserSetting,
            dealer_modal,        
            ps_confirm_dialog,
            psloading,
            openUserDeactivate,
            openApplyUserBluemark,
            doDeactivate,
            loginUserId,
            showCell,
            isPaidApp
        };
    }
}
</script>