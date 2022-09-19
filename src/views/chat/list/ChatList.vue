<template>
    <div class="sm:mt-32 lg:mt-36 mt-28 mb-16 w-mobile sm:w-median lg:w-large mx-auto">
         <div class="flex items-center "> 
                    <ps-route-link
                        :to="{name: 'dashboard'}"> 
                        <ps-label textColor="text-secondary-400 dark:text-secondaryDark-grey "
                            class="hover:underline cursor-pointer font-medium text-xxs"> 
                                 {{ $t("chat_list__home") }}
                        </ps-label>      
                    </ps-route-link>
                    
                    <ps-icon name="rightArrow" class='text-secondary-400 dark:text-secondaryDark-grey mx-0 sm:mx-2'/>
                    <ps-route-link
                        :to="{name: 'profile'}"> 
                        <ps-label textColor="text-secondary-400 dark:text-secondaryDark-grey "
                            class="hover:underline cursor-pointer font-medium text-xxs"> 
                             {{ $t("list__account") }}                       </ps-label>      
                    </ps-route-link>

                    <ps-icon name="rightArrow" class='text-secondary-400 dark:text-secondaryDark-grey mx-0 sm:mx-2'/>
                    <div v-if="isSellerFocus">
                        <ps-label textColor="text-secondary-400 dark:text-secondaryDark-grey " class="font-medium text-xxs"> {{ $t("chat_list__messages_from_seller") }}</ps-label>
                    </div>
                    <div v-else>
                        <ps-label textColor="text-secondary-400 dark:text-secondaryDark-grey " class="font-medium text-xxs">{{ $t("chat_list__messages_from_buyer") }}</ps-label>
                    </div>
                </div>
        <div class="grid lg:grid-cols-12 sm:grid-cols-8 grid-cols-4  gap-4 sm:gap-3.5 lg:gap-4 ">
            <div class="col-span-4 sm:col-span-8 lg:col-span-12">
                <ps-label class="mt-1 text-2xl lg:text-3xl font-medium"> {{ $t("chat_list__messages") }}</ps-label>
            </div>
            <div class="mt-2 col-start-0 col-span-4 sm:col-span-2 lg:col-span-2" >
               
                <div class=" ">
                    <div class=" flex flex-row space-x-3.5 sm:space-x-0 space-y-0 sm:space-y-3.5 sm:flex-col" id="sellerbtn" v-if="!isSellerFocus">
                        <ps-button textSize="text-sm sm:text-xs lg:text-sm" class="w-full" theme="text-primary-500 dark:text-primaryDark-accent border border-primary-500 dark:border-primaryDark-accent" @click="sellerClicked" >
                            <span :class="parseInt(userunreadmsgProvider.buyingitemList.data?.buyerUnreadCount) == 0 ? 'mr-4' : ''">
                                {{ $t("chat_list__from_seller") }}
                                </span>
                            <span v-if="parseInt(userunreadmsgProvider.buyingitemList.data?.buyerUnreadCount) > 0" class="rounded-sm h-auto ms-0.5 px-0.5 text-xxs float-right border border-primary-500 bg-background text-primary-500 dark:border-primaryDark-accent dark:bg-backgroundDark dark:text-primaryDark-accent">{{ userunreadmsgProvider.buyingitemList.data?.buyerUnreadCount}}</span>
                        </ps-button>
                        
                        <ps-button textSize="text-sm sm:text-xs lg:text-sm" class="w-full " @click="buyerClicked">
                            <span :class="parseInt(userunreadmsgProvider.buyingitemList.data?.sellerUnreadCount) == 0 ? 'mr-4' : ''">
                                {{ $t("chat_list__from_buyer") }}
                                </span>
                            <span v-if="parseInt(userunreadmsgProvider.buyingitemList.data?.sellerUnreadCount) > 0" class="rounded-sm h-auto ms-0.5 px-0.5 text-xxs float-right border-background border text-textLight">{{ userunreadmsgProvider.buyingitemList.data?.sellerUnreadCount }}</span>
                        </ps-button>
                    </div>

                    <div class="flex flex-row space-x-3.5 sm:space-x-0 space-y-0 sm:space-y-3.5 sm:flex-col" id="buyerbtn"  v-else >
                        <ps-button textSize="text-sm sm:text-xs lg:text-sm" class="w-full " @click="sellerClicked" >
                            <span :class="parseInt(userunreadmsgProvider.buyingitemList.data?.buyerUnreadCount) == 0 ? 'mr-4' : ''">
                                {{ $t("chat_list__from_seller") }}
                                </span>
                            <span v-if="parseInt(userunreadmsgProvider.buyingitemList.data?.buyerUnreadCount) > 0" class="rounded-sm h-auto ms-0.5 px-0.5 text-xxs float-right border-background border text-textLight">{{ userunreadmsgProvider.buyingitemList.data?.buyerUnreadCount}}</span>
                        </ps-button>
                        
                        <ps-button textSize="text-sm sm:text-xs lg:text-sm" class="w-full" theme="text-primary-500 dark:text-primaryDark-accent border border-primary-500 dark:border-primaryDark-accent" @click="buyerClicked">
                            <span :class="parseInt(userunreadmsgProvider.buyingitemList.data?.sellerUnreadCount) == 0 ? 'mr-4' : ''">
                                {{ $t("chat_list__from_buyer") }}
                                </span>
                            <span v-if="parseInt(userunreadmsgProvider.buyingitemList.data?.sellerUnreadCount) > 0" class="rounded-sm h-auto ms-0.5 px-0.5 text-xxs float-right border border-primary-500 bg-background text-primary-500 dark:border-primaryDark-accent dark:bg-backgroundDark dark:text-primaryDark-accent">{{ userunreadmsgProvider.buyingitemList.data?.sellerUnreadCount }}</span>
                        </ps-button>
                    </div>
                </div>
                <!-- google adsense desktop view -->
                <div class="mx-auto">
                    <ps-ad-sense adFormat="rectangle, vertical"></ps-ad-sense>
                </div>

            </div>
            <div class="mt-2 col-span-4 sm:col-span-6 lg:col-span-10">
                <div class="hidden sm:flex col-span-4 sm:col-span-6 lg:col-span-9" v-if="isSellerFocus">
                    <ps-label class="lg:ps-4 ps-2 sm:ps-3 text-base lg:text-xl font-medium" > {{ $t("chat_list__messages_from_seller") }}</ps-label>
                </div>
                <div class="hidden sm:flex col-span-4 sm:col-span-6 lg:col-span-9" v-else>
                    <ps-label class="lg:ps-4 ps-2 sm:ps-3 text-base lg:text-xl font-medium">{{ $t("chat_list__messages_from_buyer") }}</ps-label>
                </div>
                <div v-if="ps_loading == true">
                    <div id="seller" class="w-full flex flex-col   lg:p-4 p-2 sm:p-3" >
                        <div class='w-full ' >
                            <div class=" flex flex-col">
                                <!-- Column -->
                                <div class="w-full mt-2" v-for="index in 3" :key="index">
                                    <chat-skeletor-item />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Seller Chat horizontal -->
                <div id="seller" class="flex flex-row mb-16" v-if="isSellerFocus && ps_loading == false">
                    <div v-if="chathistorylistProvider.chatHistoryList.data == null "
                    class="w-full flex flex-col   lg:p-4 p-2 sm:p-3 ">
                       <ps-icon name="chatalt" textColor="text-secondary-400 dark:text-secondaryDark-grey" class='mt-2 w-full mx-auto' w="80" h="80" />  
                       <ps-label-caption-3 class="text-center mb-2" >{{ $t("chat_list__no_message_from_seller") }} </ps-label-caption-3>
                       
                    </div>
                    <div v-else class='w-full flex flex-col   lg:p-4 p-2 sm:p-3 ' >
                        <div class="flex flex-wrap ">
                            <!-- Column -->
                            <div class=" mt-2 w-full" v-for="chathistory in chathistorylistProvider.chatHistoryList.data" :key="chathistory.id">
                                <ps-route-link :to="{
                                    name : 'chat', 
                                    query: { 
                                        buyer_user_id : chathistory.buyerUserId,
                                        seller_user_id : chathistory.sellerUserId,
                                        item_name : chathistory.item.title ,
                                        item_id : chathistory.itemId,
                                        item_image_name : chathistory.item.defaultPhoto.imgPath,
                                        item_price : getPrice(chathistory.item),
                                        currency : chathistory.item.itemCurrency.currencySymbol,
                                        condition : chathistory.item.conditionOfItem.name,
                                        chat_flag : PsConst.CHAT_FROM_SELLER.toString(),
                                        is_sold_out : chathistory.item.isSoldOut
                                    }
                                }">
                                <chat-horizontal-item  :chathistory="chathistory" />
                                </ps-route-link>
                            </div>
                        </div>
                        <div class="flex items-end justify-end">
                            <ps-button v-if="chathistorylistProvider.loading.value == false" class="shadow-buttonShadow hover:shadow-none w-36 mt-4 " @click="loadMore" :class="chathistorylistProvider.isNoMoreRecord ? 'hidden' : ''"> {{ $t("list__load_more") }} </ps-button>
                            <ps-button v-else class="w-36 mt-4" :disabled="true"> {{ $t("list__loading") }} </ps-button>
                        </div>
                    </div>
                    

                </div>
                <!-- End Seller Chat horizontal -->

                <!-- Buyer Chat horizontal -->
                <div id="buyer" class="flex flex-row mb-16 " v-else-if="ps_loading == false">
                    <div v-if="chatbuyerhistorylistProvider.chatHistoryList.data == null "
                     class="w-full flex flex-col   lg:p-4 p-2 sm:p-3 ">
                       <ps-icon name="chatalt" textColor="text-secondary-400 dark:text-secondaryDark-grey" class='mt-2 w-full mx-auto' w="80" h="80" />  
                       <ps-label-caption-3 class="text-center mb-2" >{{ $t("chat_list__no_message_from_buyer") }} </ps-label-caption-3>
                       
                    </div>
                    <div v-else class='w-full ' >
                        <div class="w-full flex flex-col   lg:p-4 p-2 sm:p-3  ">
                            <!-- Column -->
                            <div class="w-full mt-2" v-for="chathistory in chatbuyerhistorylistProvider.chatHistoryList.data" :key="chathistory.id">
                               <ps-route-link :to="{
                                    name : 'chat', 
                                    query: { 
                                        buyer_user_id : chathistory.buyerUserId,
                                        seller_user_id : chathistory.sellerUserId,
                                        item_name : chathistory.item.title ,
                                        item_id : chathistory.itemId,
                                        item_image_name : chathistory.item.defaultPhoto.imgPath,
                                        item_price : chathistory.item.price,
                                        currency : chathistory.item.itemCurrency.currencySymbol,
                                        condition : chathistory.item.conditionOfItem.name,
                                        chat_flag : PsConst.CHAT_FROM_BUYER.toString(),
                                        is_sold_out : chathistory.item.isSoldOut


                                    }
                                }">
                               <chat-buyer-horizontal-item  :chathistory="chathistory" />
                                </ps-route-link>
                               
                            </div>
                        </div>
                        <div class="flex items-end justify-end">
                            <ps-button v-if="chatbuyerhistorylistProvider.loading.value == false" class="shadow-buttonShadow hover:shadow-none w-36 mt-4 " @click="loadMoreBuyer" :class="chatbuyerhistorylistProvider.isNoMoreRecord ? 'hidden' : ''"> {{ $t("list__load_more") }} </ps-button>
                            <ps-button v-else class="w-36 mt-4" :disabled="true"> {{ $t("list__loading") }} </ps-button>
                        </div>
                    </div>
                    

                </div>
                <!-- End Buyer Chat horizontal -->
            </div>
        </div>
    </div>
</template>


<script lang="ts">

import { ref,onMounted } from 'vue';
import router from '@/router';
import PsIcon from '@/components/core/icons/PsIcon.vue'
import PsLabelCaption3 from '@/components/core/label/PsLabelCaption3.vue'
import PsButton from '@/components/core/buttons/PsButton.vue';
import PsRouteLink from '@/components/core/link/PsRouteLink.vue';
import PsAdSense from '@/components/core/adsense/PsAdSense.vue';

// Providers
import { createUserUnReadMessageProviderState } from "@/store/modules/chat/UserUnReadMessageProvider";
import { createChatHistoryListProviderState, useChatHistoryListProviderState } from "@/store/modules/chat/ChatHistoryListProvider";
import { PsValueProvider } from "@/store/modules/core/PsValueProvider";
import PsLabel from '@/components/core/label/PsLabel.vue';

// Holders
import UserUnReadMessageParameterHolder from '@/object/holder/UserUnReadMessageParameterHolder';
import ChatHistoryParameterHolder from '@/object/holder/ChatHistoryParameterHolder';
// import { createUserProviderState } from "@/store/modules/user/UserProvider";
import ChatHorizontalItem from "@/components/modules/chat/ChatHorizontalItem.vue";
import ChatBuyerHorizontalItem from "@/components/modules/chat/ChatBuyerHorizontalItem.vue";
import ChatSkeletorItem from "@/components/modules/chat/ChatSkeletorItem.vue";
import PsConst from '@/object/constant/ps_constants';
import { usePsAppInfoProviderState } from '@/store/modules/appinfo/AppInfoProvider';
import AppInfoParameterHolder from '@/object/holder/AppInfoParameterHolder';
import { useRoute } from 'vue-router'

export default {
    name : "ChatListView",
    components : {
        PsButton,
        PsLabel,
        PsLabelCaption3,
        PsIcon,
        ChatHorizontalItem,
        ChatBuyerHorizontalItem,
        ChatSkeletorItem,
        PsRouteLink,
        PsAdSense
    },
    setup () {
        
        // Inject Chat Provider
        const psValueHolder = PsValueProvider.psValueHolder;
        const chathistorylistProvider = useChatHistoryListProviderState(); 
        const chatbuyerhistorylistProvider = createChatHistoryListProviderState();
        const loginUserId = psValueHolder.getLoginUserId();
        const userunreadmsgProvider = createUserUnReadMessageProviderState();
        if(loginUserId == null || loginUserId == '' || loginUserId == PsConst.NO_LOGIN_USER) {
            router.push({ name : "login"});
        }
        const userUnreadHolder = new UserUnReadMessageParameterHolder();
        const holder = new ChatHistoryParameterHolder().resetParameterHolder();
        const appInfoParameterHolder = new AppInfoParameterHolder();
        appInfoParameterHolder.userId = loginUserId;
        const appInfoProvider = usePsAppInfoProviderState();
        appInfoProvider.loadDeleteHistory(appInfoParameterHolder);
        const ps_loading = ref(true);
        const route = useRoute();
        const isSellerFocus = ref(route.query.focus?.toString() != 'buyerfocus');
        userUnreadHolder.userId = loginUserId;
        userunreadmsgProvider.postUserUnreadMessageCount(userUnreadHolder);
        onMounted(() => {
            if(isSellerFocus.value == true){
                loadSellerList();
            }else{
                loadBuyerList();
            }
        });
        async function loadMore() {  
            holder.userId = loginUserId;
            holder.returnType = PsConst.CHAT_TYPE_SELLER;
            await chathistorylistProvider.loadChatHistoryList(holder);
           

        }
        async function loadMoreBuyer() {  
            holder.userId = loginUserId;
            holder.returnType = PsConst.CHAT_TYPE_BUYER;
            await chatbuyerhistorylistProvider.loadChatHistoryList(holder);
        }

        async function loadSellerList(){
            holder.userId = loginUserId;
            holder.returnType = PsConst.CHAT_TYPE_SELLER;
            await chathistorylistProvider.resetChatHistoryList(holder);
            ps_loading.value = false;
        }
        async function loadBuyerList(){
            holder.userId = loginUserId;
            holder.returnType = PsConst.CHAT_TYPE_BUYER;
            await chatbuyerhistorylistProvider.resetChatHistoryList(holder);
            ps_loading.value = false;
        }
        
        async function sellerClicked() {
           
            isSellerFocus.value = true;
            ps_loading.value = true ;
            holder.userId = loginUserId;
            holder.returnType = PsConst.CHAT_TYPE_SELLER;
            await userunreadmsgProvider.postUserUnreadMessageCount(userUnreadHolder);
            await chathistorylistProvider.resetChatHistoryList(holder);
           
            ps_loading.value = false;
            
        }

        async function buyerClicked() {
            isSellerFocus.value = false;
            ps_loading.value = true ;
            holder.userId = loginUserId;
            holder.returnType = PsConst.CHAT_TYPE_BUYER;
            await userunreadmsgProvider.postUserUnreadMessageCount(userUnreadHolder);
            await chatbuyerhistorylistProvider.resetChatHistoryList(holder);
          
            ps_loading.value = false ;
           
        }
        function getPrice(value){
            if(value.discountRate!='0' && appInfoProvider.appInfo.data.psItemUploadConfig.discountRate== PsConst.ONE){
                return parseFloat(value.price)-(parseFloat(value.price)*(parseFloat(value.discountRate)/100));
            }else{
                return value.price;
            }
        }

        return {
            getPrice,
            chathistorylistProvider,
            chatbuyerhistorylistProvider,
            sellerClicked,
            buyerClicked,
            userunreadmsgProvider,
            ps_loading,
            isSellerFocus,
            PsConst,
            loadMore,
            loadMoreBuyer
        }
    }
}
</script>