<template>

    <nav class="flex flex-col fixed w-full h-16 z-40 bg-background dark:bg-backgroundDark border-b border-secondary-500 dark:border-backgrounDark" 
        :class="topOfPage ? 'mt-8 lg:mt-12' : 'mt-0'" >
        <div class="flex justify-between items-center content-center my-auto w-mobile sm:w-median lg:w-large mx-auto">
            
            <div class=' flex flex-row w-full rounded-xl'>
                <div class="me-2 w-8 sm:w-10 my-auto">
                    <img src="@/assets/images/flutter_admotors_logo.png" @click="gotToHome" alt="Navbar logo" width="50px" height="50px" class=" rounded:xl w-auto sm:h-10 h-8 cursor-pointer object-cover "/>                      
                </div>
          
                <div class="my-auto font-medium lg:w-40 w-36"> 
                    <ps-route-link :to="{ name: 'dashboard'}">
                        <ps-label class='cursor-pointer lg:text-xl font-medium text-lg ' textColor="text-secondary-700 dark:text-secondaryDark-white" > {{ $t("ps_nav_bar__ps_admotor") }} </ps-label>                    
                    </ps-route-link>
                    
                </div>
                
            </div>

            <div class="hidden sm:flex items-center content-center me-2">
                <ps-route-link :to="{name: 'item-list', 
                                query: { 
                                    condition_of_item_id: PsConst.NEW_CONDITION_ID, 
                                    item_condition_name: 'New', } }" > 
                <ps-label class='w-18 lg:w-20  font-medium cursor-pointer text-sm lg:text-base mx-auto'
                :textColor="route.fullPath.startsWith('/item-list?conditionOfItemId='+PsConst.NEW_CONDITION_ID) ? 'text-primary-500 dark:text-primaryDark-accent underline' : 'text-secondary-500 dark:text-secondaryDark-white'" > 
                    <div class=' items-center'> 
                         {{ $t("ps_nav_bar__new_cars") }} 
                    </div>
                </ps-label>
                
                </ps-route-link>
            </div>
            <div class="hidden sm:flex items-center content-center me-2">
                <ps-route-link :to="{name: 'item-list', 
                                query: { 
                                    condition_of_item_id: PsConst.USED_CONDITION_ID, 
                                    item_condition_name: 'Use', } }" > 
                <ps-label class='w-18 lg:w-20 font-medium text-sm lg:text-base mx-auto text-center cursor-pointer' 
                :textColor="route.fullPath.startsWith('/item-list?conditionOfItemId='+PsConst.USED_CONDITION_ID) ? 'text-primary-500 dark:text-primaryDark-accent underline ' : 'text-secondary-500 dark:text-secondaryDark-white '" >  
                    <div class=' items-center '> 
                        {{ $t("ps_nav_bar__used_cars") }}
                    </div>
                </ps-label>
                
                </ps-route-link>
            </div>
            <div class="hidden sm:flex items-center content-center ">
                <ps-route-link :to="{name: 'blog-list' }">
                <ps-label class='w-18 lg:w-20 font-medium text-sm lg:text-base mx-auto text-center cursor-pointer' :textColor="route.name =='blog-list' || route.name == 'blog-detail' ? 'text-primary-500 dark:text-primaryDark-accent underline' : 'text-secondary-500 dark:text-secondaryDark-white'" > 
                    <div class=' items-center '> 
                         {{ $t("ps_nav_bar__blog") }} 
                    </div>
                </ps-label>
                
                </ps-route-link>
            </div>
            
            <div class="items-center content-center hidden sm:flex me-4">

                <div v-if="psValueHolder.isUserLoggedIn()" class="flex items-center content-center">

                    <ps-dropdown align="right" h="h-68" class=' z-50' >
                        <template #select >
                            <ps-label @click='userNameClicked'  class='w-18 lg:w-20 font-medium text-sm lg:text-base mx-auto text-center cursor-pointer' 
                            :textColor="route.name =='chat-list'|| route.name == 'followers' || route.name == 'following' || route.name == 'favourite' || route.name == 'active-items' || route.name == 'pending-items' || route.name == 'paid-items' || route.name == 'reported-items' || route.name == 'offer-list' || route.name == 'blocked-users' || route.name == 'chat' || route.name == 'limit-ads' || route.name == 'profile' ? 'text-primary-500 dark:text-primaryDark-accent underline' : 'text-secondary-500 dark:text-secondaryDark-white '" > 
                                <div class=' items-center '> 
                                    {{ $t("ps_nav_bar__account") }} 
                                </div>
                            </ps-label>
                        </template>
                        <template #list >
                            <div
                                class=" bg-primary-000 shadow-xl w-56 z-50" 
                                role="menu"
                                aria-orientation="vertical"
                                aria-labelledby="options-menu">
                                <div class="z-30 absolute">
                                    
                                    <ps-route-link
                                        textSize="text-sm"
                                        :to="{name: 'profile' }"> 
                                        <div class="w-56  hover:bg-primary-500 dark:bg-primaryDark-black bg-primary-000 dark:hover:bg-backgroundDark cursor-pointer items-center"  >
                                            <ps-label class="py-4 px-2 ms-2 font-medium" textColor="text-secondary-500 dark:text-secondaryDark-white hover:text-textLight"  > {{ $t("ps_nav_bar__profile") }} </ps-label>                                        
                                        </div>
                                    </ps-route-link>

                                    <ps-route-link
                                        textSize="text-sm"
                                        :to="{name: 'chat-list' }"> 
                                        <div class="w-56 flex flex-row justify-between hover:bg-primary-500 dark:bg-primaryDark-black bg-primary-000 dark:hover:bg-backgroundDark cursor-pointer items-center"  >
                                            <ps-label class="flex-grow py-4 px-2 ms-2 font-medium" textColor="text-secondary-500 dark:text-secondaryDark-white hover:text-textLight"  > {{ $t("ps_nav_bar__message") }} </ps-label>    
                                            <div class=" me-6 p-0.5 text-xxs rounded-full bg-primary-500 dark:bg-primaryDark-accent text-textLight" v-if=" messageCount != 0"> {{ messageCount }}</div>                                    
                                        </div>
                                    </ps-route-link>

                                    <ps-route-link
                                        textSize="text-sm"
                                        :to="{name: 'favourite' }"> 
                                        <div class="w-56 hover:bg-primary-500 dark:bg-primaryDark-black bg-primary-000 dark:hover:bg-backgroundDark cursor-pointer items-center"  >
                                            <ps-label class=" py-4 px-2 ms-2 font-medium" textColor="text-secondary-500 dark:text-secondaryDark-white hover:text-textLight"  > {{ $t("ps_nav_bar__favourite") }} </ps-label>                                        
                                        </div>
                                    </ps-route-link>

                                    <ps-route-link
                                        textSize="text-sm"
                                        :to="{name: 'notification-list' }"> 
                                        <div class="w-56 hover:bg-primary-500 dark:bg-primaryDark-black bg-primary-000 dark:hover:bg-backgroundDark cursor-pointer items-center"  >
                                            <ps-label class="py-4 px-2 ms-2 font-medium" textColor="text-secondary-500 dark:text-secondaryDark-white hover:text-textLight"  > {{ $t("ps_nav_bar__notification") }} </ps-label>                                        
                                        </div>
                                    </ps-route-link>

                                    <ps-line />

                                    <div class="w-56 hover:bg-primary-500 dark:bg-primaryDark-black bg-primary-000 dark:hover:bg-backgroundDark cursor-pointer items-center" @click="clickLogout"  >
                                        <ps-label class="py-4 px-2 ms-2 font-medium" textColor="text-secondary-500 dark:text-secondaryDark-white hover:text-textLight"  > {{ $t("ps_nav_bar__logout") }} </ps-label>                                        
                                    </div>
                                </div>
                            </div>
                        </template>
                    </ps-dropdown>

                   
                </div>

                <div v-else class="flex w-18 lg:w-20">
                    <div class="h-16 flex items-center content-center cursor-pointer ">
                        <ps-label @click="loginClicked" class='font-medium text-sm lg:text-base mx-auto text-center cursor-pointer ' :textColor="route.name =='login' || route.name == 'register' ? 'text-primary-500 dark:text-primaryDark-accent underline' : 'text-secondary-500 dark:text-secondaryDark-white'" >
                             {{ $t("ps_nav_bar__login") }} 
                        </ps-label>                       
                    </div>
                </div>
            </div>
            <div class="flex items-center content-center">
                <ps-route-link :to="{name: 'item-entry' }">
                <ps-label class='hidden sm:block w-24 lg:w-28 px-3 bg-primary-500 dark:bg-primaryDark-accent py-2 font-medium cursor-pointer text-center mx-auto text-xs lg:text-sm ' textColor="text-textLight " > 
                    <div class=' items-center '> 
                         {{ $t("ps_nav_bar__new_post") }} 
                    </div>
                </ps-label>
                <ps-label class='me-4 flex sm:hidden px-3 bg-primary-500 dark:bg-primaryDark-accent py-1 font-light cursor-pointer text-2xl ' textColor="text-textLight " > 
                    <div class=' items-center '> 
                        +
                    </div>
                </ps-label>
                
                </ps-route-link>
            </div>

            <div class ="sm:hidden flex h-16 items-center">
                <ps-icon name="menu" class="cursor-pointer" @click="toggleMobileMenu" />            
            </div>
        </div>
        <div>
            <transition @enter="enter" @leave="leave" >
                <div v-if="activeMobileMenu" class=" h-auto mt-0 ">
                <div  class="flex flex-col " >
                    <div v-if="psValueHolder.isUserLoggedIn()">             
                        <ps-route-link
                            textSize="text-md"
                            :to="{name: 'profile' }"> 
                            <div class="w-full  hover:bg-primary-500 dark:bg-primaryDark-black bg-primary-000 dark:hover:bg-backgroundDark cursor-pointer items-center" @click="toggleMobileMenu" >
                                <ps-label class="py-4 px-2 ms-2 font-medium" textColor="text-secondary-500 dark:text-secondaryDark-white hover:text-textLight"  > {{ $t("ps_nav_bar__profile") }} </ps-label>                                        
                            </div>
                        </ps-route-link>

                        <ps-route-link
                            textSize="text-md"
                            :to="{name: 'chat-list' }"> 
                            <div class="w-full flex flex-row justify-between hover:bg-primary-500 dark:bg-primaryDark-black bg-primary-000 dark:hover:bg-backgroundDark cursor-pointer items-center" @click="toggleMobileMenu" >
                                <ps-label class="flex-grow py-4 px-2 ms-2 font-medium" textColor="text-secondary-500 dark:text-secondaryDark-white hover:text-textLight"   > {{ $t("ps_nav_bar__message") }} </ps-label>                                        
                                <div class=" me-6 p-0.5 text-xxs rounded-full bg-primary-500 dark:bg-primaryDark-accent text-textLight" v-if=" messageCount != 0"> {{ messageCount }}</div>  
                            </div>
                        </ps-route-link>

                        <ps-route-link
                            textSize="text-md"
                            :to="{name: 'favourite' }"> 
                            <div class="w-full hover:bg-primary-500 dark:bg-primaryDark-black bg-primary-000 dark:hover:bg-backgroundDark cursor-pointer items-center"  @click="toggleMobileMenu">
                                <ps-label class="py-4 px-2 ms-2 font-medium" textColor="text-secondary-500 dark:text-secondaryDark-white hover:text-textLight"  > {{ $t("ps_nav_bar__favourite") }} </ps-label>                                        
                            </div>
                        </ps-route-link>

                        <ps-route-link
                            textSize="text-md"
                            :to="{name: 'notification-list' }"> 
                            <div class="w-full hover:bg-primary-500 dark:bg-primaryDark-black bg-primary-000 dark:hover:bg-backgroundDark cursor-pointer items-center" @click="toggleMobileMenu" >
                                <ps-label class="py-4 px-2 ms-2 font-medium" textColor="text-secondary-500 dark:text-secondaryDark-white hover:text-textLight"  > {{ $t("ps_nav_bar__notification") }} </ps-label>                                        
                            </div>
                        </ps-route-link>

                        <ps-line textColor="text-secondary-400 dark:text-secondaryDark-grey"/>

                        <div class="w-full hover:bg-primary-500 dark:bg-primaryDark-black bg-primary-000 dark:hover:bg-backgroundDark cursor-pointer items-center" @click="clickLogout"  >
                            <ps-label class="py-4 px-2 ms-2 font-medium" textColor="text-secondary-500 dark:text-secondaryDark-white hover:text-textLight"  > {{ $t("ps_nav_bar__logout") }} </ps-label>                                        
                        </div>
                        

                    </div>

                    <div v-else >
                        <ps-line />
                        <ps-label  class=' w-full hover:bg-primary-500 dark:bg-primaryDark-black bg-primary-000 dark:hover:bg-backgroundDark py-4 px-4 cursor-pointer' textColor="text-secondary-500 dark:text-secondaryDark-white hover:text-textLight"  @click="loginClicked"> {{ $t("ps_nav_bar__login") }} </ps-label>
                        <ps-label  class=' w-full hover:bg-primary-500 dark:bg-primaryDark-black bg-primary-000 dark:hover:bg-backgroundDark py-4 px-4 cursor-pointer' textColor="text-secondary-500 dark:text-secondaryDark-white hover:text-textLight"  @click="registerClicked"> {{ $t("ps_nav_bar__register") }} </ps-label>
                    </div>
                    
                </div>
                </div>
                </transition>
        </div>
        
    </nav>
</template>

<script>
// import PsUtils from '@/utils/PsUtils';
import PsConst from '@/object/constant/ps_constants';
import { defineComponent, ref,onMounted } from "vue";
import { useUserProviderState } from '@/store/modules/user/UserProvider';
import { PsValueProvider } from '@/store/modules/core/PsValueProvider';
import { createUserUnReadMessageProviderState } from "@/store/modules/chat/UserUnReadMessageProvider";
import UserUnReadMessageParameterHolder from '@/object/holder/UserUnReadMessageParameterHolder';
import router from '@/router';
import Velocity from "velocity-animate";
//import $ from "cash-dom";

import PsIcon from '@/components/core/icons/PsIcon.vue';
import PsDropdown from '@/components/core/dropdown/PsDropdown.vue';
import PsLine from "@/components/core/line/PsLine.vue";
import PsRouteLink from '@/components/core/link/PsRouteLink.vue';
import { useRoute } from "vue-router";
import PsLabel from "@/components/core/label/PsLabel.vue";

export default defineComponent ({
    components : {
        PsIcon,
        PsDropdown,
        PsLine,
        PsRouteLink,
        PsLabel
    },
    props : {
        topOfPage : {
            type: Boolean,
            default : false
        }
    },
    setup() {

        const activeMobileMenu = ref(false);
        const userProvider = useUserProviderState();   
        const messageCount = ref(0);
        let psValueHolder = PsValueProvider.psValueHolder;
        const userunreadmsgProvider = createUserUnReadMessageProviderState();
        const userUnreadHolder = new UserUnReadMessageParameterHolder();
        userUnreadHolder.userId = psValueHolder.loginUserId;

        if (psValueHolder.isUserLoggedIn()) {               
            loadUser()
            
        }
        async function loadUser(){
            await userProvider.getUser(psValueHolder.loginUserId);
            // userProfile.value = userProvider.user.data.userProfilePhoto;
            // console.log(userProfile.value);
            // console.log(userProvider.user.data);
        }
        async function loadMessage(){
            userUnreadHolder.userId = psValueHolder.loginUserId;
            await userunreadmsgProvider.postUserUnreadMessageCount(userUnreadHolder);
            messageCount.value = parseInt(userunreadmsgProvider.buyingitemList.data?.buyerUnreadCount) + parseInt(userunreadmsgProvider.buyingitemList.data?.sellerUnreadCount);
        }
        loadMessage();
        onMounted( async () =>{
          
            await loadUser;
            await loadMessage;
        })
        
        function userNameClicked() {
            PsValueProvider.psValueHolder.loadData();
            psValueHolder= PsValueProvider.psValueHolder;
            loadMessage();
        }
        
        function gotToHome() {
            router.push({name : "dashboard"});
        }

        function toggleMobileMenu( bol = true) {
            if(bol){
                activeMobileMenu.value = !activeMobileMenu.value;
            }	
            loadMessage();		
		}

        function enter(el, done) {
			Velocity(
				el,
				"slideDown",
				{
				duration: 300
				},
				{
				complete: done
				}
			);
        }
        
		function leave(el, done) {
			Velocity(
				el,
				"slideUp",
				{
				duration: 300
				},
				{
				complete: done
				}
			);
        }

        function clickLogout() {
            psValueHolder.logout();
            router.push({name : "dashboard"});
        }
        const route = useRoute();
        function registerClicked() {
       
            if(activeMobileMenu.value) {
                activeMobileMenu.value = false;
            }

            let tempParams = {};
            tempParams = route.query;
            tempParams['redirect'] = route.name;
            router.push({name : 'register', query : tempParams, params : route.params });
        } 
        function loginClicked() {
       
            if(activeMobileMenu.value) {
                activeMobileMenu.value = false;
            }

            let tempParams = {};
            tempParams = route.query;
            tempParams['redirect'] = route.name;
            router.push({name : 'login', query : tempParams, params : route.params });
        }

        
        return {
            messageCount,
            activeMobileMenu,
            psValueHolder,
            userProvider,
            gotToHome,
            enter,
            leave,
            toggleMobileMenu,
            clickLogout,
            loginClicked,
            userNameClicked,
            registerClicked,
            route,
            PsConst
        }

    }
});
</script>
