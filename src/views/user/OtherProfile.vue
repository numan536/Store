<template>
<div>
    <div class="sm:mt-28 lg:mt-32 mt-28 w-mobile sm:w-median lg:w-large mx-auto">
        <div>
             <div class="flex items-center "> 
                <ps-route-link
                    :to="{name: 'dashboard'}"> 
                    <ps-label textColor="text-secondary-400 dark:text-secondaryDark-grey "
                        class="hover:underline cursor-pointer font-medium text-xxs"> 
                                {{ $t("other_profile__home") }}
                    </ps-label>      
                </ps-route-link>
                <ps-icon name="rightArrow" class='text-secondary-400 dark:text-secondaryDark-grey  mx-0 sm:mx-2'/>
                <ps-label textColor="text-secondary-400 dark:text-secondaryDark-grey " class="font-medium text-xxs"> {{ $t("other_profile__profile") }}</ps-label>
            </div>

            <ps-label class="mt-2 font-medium lg:text-3xl text-2xl "> {{ $t("other_profile__profile") }}</ps-label>
            <div class="grid lg:grid-cols-12 sm:grid-cols-6 grid-cols-4  gap-4 sm:gap-3.5 lg:gap-4 ">
                <!-- User Profile Normal -->
                <div class='w-full col-span-4 sm:col-span-2 lg:col-span-3 mt-2 mb-4' >
                        <ps-card class="flex flex-col bg-secondary-000 dark:bg-primaryDark-black p-5 ">
                            <div class="w-5/6 mx-auto sm:w-full">
                                <img alt="Placeholder"  width="30px" height="30px"  class="rounded-full w-24 h-24 object-cover mx-auto" :src="userProvider.imageUrl(userProvider.user.data ? userProvider.user.data.userProfilePhoto : '',2)" @error="userProvider.defaultProfileImage" >
                                <div class="flex flex-col mt-3 justify-center"> 
                                    <ps-label class=" text-center text-base" textColor="text-secondary-600  dark:text-secondaryDark-white"> {{  userProvider.user.data ? userProvider.user.data.userName:'' }} </ps-label>
                                    <div v-if="userProvider.user.data?.isVerifybluemark == '1'" class=" mt-3 w-32 mx-auto flex flex-row justify-center py-1.5 px-3 bg-primary-500 dark:bg-primaryDark-grey rounded-2xl">
                                        <ps-label textColor="text-textLight " class=" text-center text-xs"> {{ $t("other_profile__verified_dealer") }}  </ps-label>
                                        <ps-icon name="check" w="12" h="12" class="text-textLight " />
                                    </div> 
                                    
                                </div>
                                <ps-route-link :to="{ name: 'review-list',query: { user_id: userProvider.user?.data?.userId } }">
                                <div class="flex items-center content-center justify-center mt-3 px-4">
                                    <rating :grade="userProvider.user.data ? userProvider.user?.data?.overallRating:0" :maxStars="5" :hasCounter="true" />
                                    <ps-label-caption class="ms-2">{{  userProvider.user.data ? userProvider.user.data.overallRating:'' }}({{  userProvider.user.data ? userProvider.user.data.ratingCount:'' }}) </ps-label-caption>
                                </div>
                                </ps-route-link>
                                <ps-label v-if="userProvider.user.data && userProvider.user.data.isShowEmail == '1' " class="font-light text-xs mt-1 text-center"> {{  userProvider.user.data ? userProvider.user.data.userEmail:'' }} </ps-label>
                            <ps-label v-if="userProvider.user.data && userProvider.user.data.isShowPhone == '1' " class="font-light text-xs mt-1 text-center"> {{  userProvider.user.data ? userProvider.user.data.userPhone:'' }} </ps-label>
                                <ps-label class="font-light text-xs mt-4 text-center"> {{  userProvider.user.data ? userProvider.user.data.userAboutMe:'' }} </ps-label>
                            </div>
                            <div  class="w-5/6 mx-auto sm:w-full">
                                <ps-label class="font-light text-xs mt-4 text-center" textColor="text-secondary-400 dark:text-secondaryDark-grey">{{ $t("profile__joined") }} - {{userProvider.user.data ? userProvider.user.data.addedDate:''}}</ps-label>
    
                                
                                <div class="mt-2 flex justify-between">
                                    <ps-label class="font-light text-sm">{{ $t("profile__followers") }} </ps-label>
                                    <ps-label class="font-medium text-xl"> {{userProvider.user.data ? userProvider.user.data.followerCount:'0'}}</ps-label>
                                </div>
                                <div class="mt-2 flex justify-between">
                                    <ps-label class="font-light text-sm">{{ $t("profile__followings") }} </ps-label>
                                    <ps-label  class="font-medium text-xl">{{userProvider.user.data ? userProvider.user.data.followingCount:'0'}}</ps-label>
                                </div>
                                 <div class=" text-center mt-4" v-if="userProvider.user.data?.userId != LoginUserId" @click="followClick"> 
                                    <div v-if="userProvider.user.data?.isFollowed == '0'">
                                        <ps-button rounded="rounded-2xl" textSize="text-xs" class=" w-full  mx-auto" > {{ $t("profile__follow") }} </ps-button>
                                    </div>
                                    <div v-else-if="userProvider.user.data?.isFollowed == '1'">
                                        <ps-button rounded="rounded-2xl" textSize="text-xs" class=" w-full  mx-auto" > {{ $t("profile__unfollow") }} </ps-button>
                                    </div>
                                </div>

                                <div v-if="appInfoProvider?.appInfo?.data.psAppSetting?.isBlockUser ==PsConst.ONE" class="mt-2 py-2 text-center w-full border border-primary-500 dark:border-primaryDark-accent rounded-2xl mx-auto mb-2"> 
                                    <ps-label class="text-xs cursor-pointer" textColor="text-primary-500 dark:text-primaryDark-accent" @click="blockClicked(userProvider.user?.data?.userId ?? '')"> 
                                            {{ $t("other_profile__block_user") }} 
                                    </ps-label>
                                </div>

                            </div>
                        </ps-card>
         
                    </div>
                <!-- End User Profile Normal -->

                <!-- Latest item listing -->
                <div v-if="itemProvider.productList?.data != null" class="w-full col-span-4 lg:col-span-9 mt-2  mb-6">
                    <div class="w-full ">
                        <ps-label class=" font-medium"> {{ userProvider.user.data ? userProvider.user.data.userName+"'s" :'' }} {{ $t("other_profile__active_post") }} </ps-label>
                        <div class="w-full h-full grid sm:grid-cols-2 lg:grid-cols-3  gap-4 sm:gap-3.5 lg:gap-4 mt-3 ">
                            <!-- Active Listing -->
                            <div class=" w-full h-full col-span-2 sm:col-span-1" 
                                v-for="item in itemProvider.productList.data" 
                                :key="item.id">                                            
                                
                                <item-horizontal-item  :item="item" @clickFav="resetData" />
                                                                   
                            </div>                                    
                            <!-- END Active Listing -->
                        </div>
    
                    </div>
                    <div v-if="itemProvider.productList?.data != null" class="justify-end flex mt-6 mb-4">
                    <div class="flex-grow-0">
                        <ps-route-link :to="{name: 'item-list', query: userItemParams['query']}">
                            <ps-button class="flex flex-row shadow-buttonShadow hover:shadow-none" theme="bg-primary-500 dark:bg-primaryDark-accent text-textLight capitalize px-4 py-1"> {{ $t("other_profile__view_all") }} 
                                <ps-icon textColor="text-textLight " class="ms-1 mt-1" name="arrowNarrowRight" h="20" w="24"/> </ps-button>
                                   
                        </ps-route-link>
                    </div>
                                
                </div>
                <!-- google adsense desktop view -->
                <div class="hidden md:block">
                    <ps-ad-sense class=" sm:w-median lg:w-large" adFormat="horizontal"></ps-ad-sense>
                </div>

                </div>
                <div v-else-if="itemProvider.productList != null && itemProvider.loading.value " class="w-full col-span-4 sm:col-span-6 lg:col-span-9 mt-4  mb-6">
                    <div class="w-full">
                        <div class="grid grid-cols-2 sm:grid-cols-3  gap-4 sm:gap-3.5 lg:gap-4 ">
                            <div class="w-full" v-for="i in 6" :key="i">
                                <item-horizontal-skeletor-item />
                            </div>
                            </div>
                    </div>
                </div>
                
                <!-- end latest item listing -->
            </div>
        </div>
    </div>

    <ps-confirm-dialog ref='ps_confirm_dialog' />
    <ps-loading-dialog ref="psloading"  :isClickOut='false'/> 
</div>
</template>
<script lang="ts">
//Vue
import { useRoute } from 'vue-router';
import router from "@/router";
import { ref,onBeforeMount } from 'vue';

import PsCard from '@/components/core/card/PsCard.vue';
import PsLabel from '@/components/core/label/PsLabel.vue';
import PsLabelCaption from '@/components/core/label/PsLabelCaption.vue';
import PsButton from '@/components/core/buttons/PsButton.vue';
import Rating from '@/components/core/rating/Rating.vue';
import PsRouteLink from '@/components/core/link/PsRouteLink.vue';
import PsIcon from '@/components/core/icons/PsIcon.vue';
import PsAdSense from '@/components/core/adsense/PsAdSense.vue';

import ItemHorizontalItem from "@/components/modules/item/ItemHorizontalItem.vue";
import ItemHorizontalSkeletorItem from "@/components/modules/item/ItemHorizontalSkeletorItem.vue";
//Models
import { createProductProviderState } from "@/store/modules/item/ProductProvider";
import { createOtherUserProviderState } from "@/store/modules/user/OtherUserProvider";

import ProductParameterHolder from "@/object/holder/ProductParameterHolder";
import PsConfirmDialog from '@/components/core/dialog/PsConfirmDialog.vue';
import PsLoadingDialog from '@/components/core/dialog/PsLoadingDialog.vue';
import UserBlockParameterHolder from '@/object/holder/UserBlockParameterHolder';
import { PsValueProvider } from "@/store/modules/core/PsValueProvider";
import UserParameterHolder from '@/object/holder/UserParameterHolder';
import UserFollowHolder from '@/object/holder/UserFollowHolder';
import PsStatus from '@/api/common/PsStatus';
import PsConst from "@/object/constant/ps_constants";
import { useUserProviderState } from '@/store/modules/user/UserProvider';
import { usePsAppInfoProviderState } from '@/store/modules/appinfo/AppInfoProvider';
import AppInfoParameterHolder from '@/object/holder/AppInfoParameterHolder';

import "vue-skeletor/dist/vue-skeletor.css";
import { i18n } from '@/assets/locales/index';
import PsUtils from '@/utils/PsUtils';

export default {
    name : "OtherProfileView",
    components : {
        PsIcon,
        PsAdSense,
        PsCard,
        PsLabel,
        PsLabelCaption,
        PsButton,
        Rating,
        ItemHorizontalItem,
        ItemHorizontalSkeletorItem,
        PsConfirmDialog,
        PsLoadingDialog,
        PsRouteLink

    },
    setup() {
       
        // Modals
        const ps_confirm_dialog = ref();
        const psloading = ref();

         const userblock = new UserBlockParameterHolder();

        const route = useRoute();
        const userId = route.params.user_id.toString();
        // Inject Item Provider
        const itemProvider = createProductProviderState();
       

        // Load Item List
        const holder = new ProductParameterHolder().getLatestParameterHolder();
        holder.addedUserId = userId;
        
        // Get Login User Id
        const psValueHolder = PsValueProvider.psValueHolder;
        const LoginUserId = psValueHolder.getLoginUserId();
        const paramHolder = new UserParameterHolder().getOtherUserData();
        const followHolder = new UserFollowHolder();

        //for block user setting
        const appInfoProvider = usePsAppInfoProviderState();
        const appInfoParameterHolder = new AppInfoParameterHolder();
        appInfoParameterHolder.userId = LoginUserId;
        appInfoProvider.loadDeleteHistory(appInfoParameterHolder);

        itemProvider.loadItemList(LoginUserId, holder);

        paramHolder.loginUserId = LoginUserId;
        paramHolder.id = userId;
        let userProvider;
        loadUserData();
        onBeforeMount(async () => {
            if(LoginUserId == userId) {
                router.push({ name: 'profile' });
            }
        });
    
        async function loadUserData(){
            if(LoginUserId == PsConst.NO_LOGIN_USER){
                userProvider = useUserProviderState();
                await userProvider.getUser(userId);
                
            }else{
                userProvider = createOtherUserProviderState();
                await userProvider.loadUser(paramHolder);
                
            }
        }
        itemProvider.paramHolder.addedUserId = userId;
            
        const userItemParams = itemProvider.paramHolder.getUrlParamsAndQuery();
        
        async function followClick(){
            if(psValueHolder.isUserLoggedIn()){
                psloading.value.openModal();
                if( userProvider.user.data?.isFollowed == '1'){
                    psloading.value.message = i18n.global.t('other_profile__removing_user_from_follower_list');
                }else{
                    psloading.value.message = i18n.global.t('other_profile__adding_user_to_follower_list');
                }
                followHolder.userId = LoginUserId;
                followHolder.followedUserId = userProvider.user?.data?.userId ?? '';
                await userProvider.postUserFollow(followHolder);

                psloading.value.closeModal();
            }
            else{
                let tempParams = {};
                tempParams = route.query;
                tempParams['redirect'] = route.name;
                router.push({name : 'login', query : tempParams, params : route.params });
            }
            
            
        }
        
        // Block this user

        function blockClicked(userId) {
            if(psValueHolder.isUserLoggedIn()){
                ps_confirm_dialog.value.openModal(
                    i18n.global.t('other_profile__confirm'),
                    i18n.global.t('other_profile__confirm_to_block_user'),
                    i18n.global.t('other_profile__block'),
                    i18n.global.t('other_profile__cancel'),
                    () => {
                    
                        doBlock(userId);
                    },
                    () => {
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
        //unblock user

        //Block User
        async function doBlock(userId) {

            userblock.loginUserId = LoginUserId;
            userblock.addedUserId = userId;

            psloading.value.openModal();
            psloading.value.message = i18n.global.t('other_profile__adding_user_to_block_list');
            const returnData = await userProvider.blockUser(userblock);
            psloading.value.closeModal();

            if(returnData.status == PsStatus.ERROR) {
               
                return;
            }else if(returnData.status == PsStatus.SUCCESS) {
               
                router.push({
                    name: "dashboard",
                });
                
            }
        }
        async function resetData(){

            psloading.value.openModal();
            await itemProvider.refleshItemList(LoginUserId, holder);
            
            psloading.value.closeModal();
        }


        return {
            resetData,
            itemProvider,
            userProvider,
            userItemParams,
            blockClicked,
            ps_confirm_dialog,
            psloading,
            followClick,
            LoginUserId,
            appInfoProvider,
            doBlock,
            PsConst
        }
    }
}
</script>