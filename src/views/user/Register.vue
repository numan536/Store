<template>
<div class=" sm:mt-6 lg:mt-20 mt-10 h-208 lg:h-auto ">
    <div class="relative w-screem flex bg-transparent sm:bg-primary-500 lg:bg-transparent " >
        <div class="absolute hidden sm:flex lg:hidden mt-3">  
            <img alt="Placeholder"  width="300px" height="300px"  class="w-screen h-208 object-cover" src="@/assets/illustrations/illustration-tablet.svg" />
        </div>
        <div class="relative hidden lg:flex mt-3 w-1/2 ">  
            <img alt="Placeholder"  width="300px" height="300px"  class="w-screen h-full object-cover" src="@/assets/illustrations/illustration.svg" />
        </div>
        <div class="relative sm:mt-36 lg:mt-8 mt-24 w-mobile sm:w-median mx-auto lg:ms-4 xl:ms-6 bg-transparent lg:bg-background lg:dark:bg-backgroundDark flex flex-col ">

            <div class=" justify-end lg:justify-center flex sm:hidden lg:flex">
                <ps-label textColor="text-secondary-500 dark:text-secondaryDark-white" class='flex-grow-0 mt-3 font-medium text-xs lg:text-xs' > 
                {{ $t("register__already_member_login") }} <span class="font-medium text-primary-500 dark:text-primaryDark-accent cursor-pointer" @click="loginClicked"> {{ $t("register__login") }}</span> </ps-label>
            </div>
            <div class="w-72 my-1 h-16 flex sm:w-96 lg:w-full mx-6 sm:mx-16 lg:ms-0 "  >
                <ps-label class="text-sm ps-4 lg:ps-2" textColor="text-primary-500 dark:text-primaryDark-accent" v-if="userProvider.userResource.message != ''"> {{ userProvider.userResource.message }} </ps-label>
            </div>
    
            <div class="flex flex-col w-full sm:w-96 lg:w-auto m-auto lg:m-2 bg-background dark:bg-backgroundDark p-4 lg:p-2">

                <div class=" justify-end lg:justify-center hidden sm:flex lg:hidden mb-3">
                    <ps-label textColor="text-secondary-500 dark:text-secondaryDark-white" class='flex-grow-0 mt-3 font-medium text-xs lg:text-xs' > 
                    {{ $t("register__already_member_login") }} <span class="font-medium text-primary-500 dark:text-primaryDark-accent cursor-pointer" @click="loginClicked"> {{ $t("register__login") }}</span> </ps-label>
                </div>

                <!-- Register Title -->        
                <ps-label class="mx-6 sm:mx-16 lg:ms-0 lg:w-64 font-medium text-xl lg:text-2xl"  textColor="text-secondary-500 dark:text-secondaryDark-white" > {{ $t("register__register_title") }} </ps-label>
                <!-- <form class="flex flex-col"> -->
                <!-- Register Entry -->
                <ps-label class="mx-6 sm:mx-16 lg:ms-0 lg:w-64 mt-4 font-medium text-xs lg:text-xs">{{ $t("register__user_name") }} </ps-label>
                <ps-input class="mx-6 sm:mx-16 lg:ms-0 lg:w-64 mt-1" type="email" v-bind:placeholder="$t('register__user_name')" v-on:keyup.enter="clicked" v-model:value="name"></ps-input>
                <ps-label class="mx-6 sm:mx-16 lg:ms-0 lg:w-64 mt-4 font-medium text-xs lg:text-xs"> {{ $t("register__email") }} </ps-label>
                <ps-input class="mx-6 sm:mx-16 lg:ms-0 lg:w-64  mt-1" type="email" v-bind:placeholder="$t('register__email')" v-on:keyup.enter="clicked" v-model:value="email" @blur="validateEmail"></ps-input>
                <ps-label class="mx-6 sm:mx-16 lg:ms-0 lg:w-64 lg:mt-2 mt-1  w-full" textColor="text-primary-500 dark:text-primaryDark-accent" v-if="validationEmail"> {{ $t("login__email_required_error") }} </ps-label>
                <ps-label class="mx-6 sm:mx-16 lg:ms-0 lg:w-64 mt-4 font-medium text-xs lg:text-xs"> {{ $t("register__password") }} </ps-label>
                <ps-input class="mx-6 sm:mx-16 lg:ms-0 lg:w-64  mt-1" type="password" v-bind:placeholder="$t('register__password')" v-on:keyup.enter="clicked" v-model:value="password" autocomplete='off'></ps-input>
                <ps-label class="mx-6 sm:mx-16 lg:ms-0 lg:w-64 mt-4 font-medium text-xs lg:text-xs"> {{ $t("register__confirm_password") }} </ps-label>
                <ps-input class="mx-6 sm:mx-16 lg:ms-0 lg:w-64  mt-1" type="password" v-bind:placeholder="$t('register__confirm_password')" v-on:keyup.enter="clicked" v-model:value="confirmPassword" autocomplete='off'></ps-input>

                <div class='mx-6 sm:mx-16 lg:ms-0 lg:w-64 flex flex-row items-start mt-4'>
                    <ps-checkbox-value title=""  @click="agreePrivacyPolicyClicked"
                        class="" v-model:value="checkedterms" />
                    <ps-label class='me-2 font-medium text-xs lg:text-xs'> {{ $t("register__check_privacy_policy") }} </ps-label>
                    <ps-route-link :to="{name: 'privacy' }" class=" cursor-pointer text-sm" url="https://www.panacea-soft.com/privacy" >            
                        <ps-label class='font-medium text-xs lg:text-xs' textColor="text-primary-500 dark:text-primaryDark-accent" > {{ $t("register__privacy_policy") }} </ps-label>
                    </ps-route-link> 
                </div>

                <!-- Loading Button -->
                <ps-button textSize="text-xs lg:text-sm " class="mx-6 sm:mx-16 lg:ms-0 lg:w-64 mt-8  py-3" v-if="userProvider.loading.value" :disabled="true">                     
                    {{ $t("register__loading") }} </ps-button>

                <!-- Register Button --> 
                <ps-button textSize="text-xs lg:text-sm" class="shadow-buttonShadow hover:shadow-none mx-6 sm:mx-16 lg:ms-0 lg:w-64 mt-8 py-3" @click="clicked" :disabled="false" v-else>                     
                    {{ $t("register__register") }} </ps-button>
                <!-- </form> -->
                <!-- Forget password -->

                <div class="flex flex-row justify-center mt-4 mx-6 sm:mx-16 lg:ms-0 lg:w-64 ">
                    <ps-line class="w-full lg:h-3 h-2 border border-l-0 border-r-0 border-secondary-400 dark:border-secondaryDark-grey" />
                    <ps-label class="px-1 font-medium text-xs lg:text-sm"> {{ $t("login__or") }} </ps-label>
                    <ps-line class="w-full lg:h-3 h-2 border border-l-0 border-r-0 border-secondary-400 dark:border-secondaryDark-grey" />
                </div>

                <!-- Register with other Methods -->
                

                <ps-label class='cursor-pointer font-medium text-xs lg:text-sm mt-2 mx-6 sm:mx-16 lg:ms-0 lg:w-64 ' > {{ $t("register__register_with") }} </ps-label>

                <div class="flex flex-row space-x-6 mt-4 mx-6 sm:mx-16 lg:ms-0 lg:w-64 ">
                    <ps-button class=" " theme="rounded-full bg-primary-500 dark:bg-primaryDark-accent px-3 py-3" @click="phoneloginclicked">  
                        <font-awesome-icon :icon="['fas', 'phone']" class="text-textLight text-sm" />           
                        <!-- {{ $t("login__login_with_phone") }}  -->
                    </ps-button>

                    <ps-button  class=" " theme="rounded-full bg-primary-500 dark:bg-primaryDark-accent  px-4 py-3" @click="facebookloginclicked">  
                        <font-awesome-icon :icon="['fab', 'facebook-f']" class="text-textLight mx-0.5 text-sm"  />                 
                        <!-- {{ $t("login__login_with_facebook") }} -->
                    </ps-button>
                    <ps-button class=" " theme="rounded-full bg-yellow-600 hover:bg-yellow-700 text-textLight px-3 py-3"  id="signinBtn" @click="googleloginclicked">  
                        <font-awesome-icon :icon="['fab', 'google']" class="text-textLight text-sm "  />            
                        <!-- {{ $t("login__login_with_google") }} -->
                    </ps-button>
                    <ps-button class="" theme="rounded-full bg-gray-900 hover:bg-gray-700 text-textLight px-3 py-3"  @click="appleloginclicked">  
                        <font-awesome-icon :icon="['fab', 'apple']" class="text-textLight text-sm"  />            
                        <!-- {{ $t("login__login_with_apple") }} -->
                    </ps-button>
                </div>

                <div class="mt-4" />
            </div>
        </div>

        <ps-error-dialog ref="ps_error_dialog" />   
        <ps-success-dialog-2 ref="ps_success_dialog" />   
        <privacy-modal ref="privacy_modal" />
    </div>
</div>

</template>

<script lang="ts">
import PsLabel from '@/components/core/label/PsLabel.vue';
import PsButton from '@/components/core/buttons/PsButton.vue';
import PsInput from '@/components/core/input/PsInput.vue';
import { useUserProviderState } from '@/store/modules/user/UserProvider';
import { PsValueProvider } from '@/store/modules/core/PsValueProvider';
import router from '@/router';
import { ref } from 'vue';
import PsCheckboxValue from '@/components/core/checkbox/PsCheckboxValue.vue';
import PsErrorDialog from '@/components/core/dialog/PsErrorDialog.vue';
import PsSuccessDialog2 from '@/components/core/dialog/PsSuccessDialog2.vue';
import { useRoute } from 'vue-router';
import PsRouteLink from '@/components/core/link/PsRouteLink.vue';
import PrivacyModal from '@/components/modules/privacy/PrivacyModal.vue';
import { i18n } from '@/assets/locales/index';
 import PsLine from '@/components/core/line/PsLine.vue';
 import PsStatus from '@/api/common/PsStatus';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFacebookF,faGoogle,faApple } from '@fortawesome/free-brands-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
library.add(faFacebookF,faPhone,faGoogle,faApple )

export default {
    name : "RegisterView",
    components : {
        PsButton,
        PsLine,
        PsInput,
        PsLabel,
        PsCheckboxValue,
        PsErrorDialog,
        PsRouteLink,
        PrivacyModal,
        PsSuccessDialog2
    },
    setup() {
     
        const route = useRoute();

        if(PsValueProvider.psValueHolder.isUserLoggedIn()) {
            router.push({name: "dashboard"});
        }

        const email = ref('');
        const password = ref('');
        const confirmPassword = ref('');
        const name = ref('');
        const validationEmail = ref(false);

        // For checkbox terms
        const checkedterms = ref(false);
        const ps_error_dialog = ref();
        const ps_success_dialog = ref();
        const privacy_modal = ref();
        // Inject Provider
        const userProvider = useUserProviderState();
        userProvider.userResource.message = '';
        
        function validateEmail(e) {
            const pattern = /^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9]+)\.([a-zA-Z]{2,5})$/;
            const res = pattern.test(e.target.value);
            if (!res) {
                validationEmail.value = true;
            } else {
                validationEmail.value = false;
            }
        }

        async function clicked() {
            // Login
            if(password.value == confirmPassword.value){
                if( checkedterms.value == true) {
                    await userProvider.signUpWithEmailId(name.value,email.value, password.value,
                        () => {
                                
                            redirect();
                                   
                        },
                        () => {
                            
                            router.push({ name : "verify-email"});
                        }
                    ); 
                    
                } else {
                    ps_error_dialog.value.openModal('', 
                    i18n.global.t('register__select_privacy_policy'));
                }
                
            }else{
                ps_error_dialog.value.openModal('', 
                    i18n.global.t('register__passwords_not_match_error'));
                
            }
                       
        }

        function loginClicked() {
            // if(checkedterms.value == true) {
                userProvider.navigateUserLoginTo("login", router, route.query.redirect, route.query, route.params);

            // }else {
            //     ps_error_dialog.value.openModal(
            //         i18n.global.t('login__privacy_policy'),
            //         i18n.global.t('login__need_to_agree_privacy'),
            //          () => {
             //         agreePrivacyPolicyClicked();
            //            }
            //          );
            // }
            
        }

        function isAcceptPrivacy(isAccept){
            checkedterms.value = isAccept;
        }
        function phoneloginclicked() {
            if(checkedterms.value == true) {
                userProvider.navigateUserLoginTo("phone-login", router, route.query.redirect, route.query, route.params);        

            }else {
                ps_error_dialog.value.openModal(
                    i18n.global.t('login__privacy_policy'),
                    i18n.global.t('login__need_to_agree_privacy'),
                    () => {
                      agreePrivacyPolicyClicked();
                        }
                    );
            }
        }

        function agreePrivacyPolicyClicked(){        
            privacy_modal.value.openModal(isAcceptPrivacy);            
        }
        async function facebookloginclicked() {
            if(checkedterms.value == true) {
                await userProvider.loginWithFacebookId();
                if(userProvider.userResource.status == PsStatus.SUCCESS) {
                    ps_success_dialog.value.openModal(
                    i18n.global.t('register__success'), 
                    i18n.global.t('register__login_success'),
                    i18n.global.t('register_ok'),
                    () => {
                    
                            redirect();

                        }
                    );   
                } 
               
            }else {
                ps_error_dialog.value.openModal(
                    i18n.global.t('login__privacy_policy'),
                    i18n.global.t('login__need_to_agree_privacy'),
                    () => {
                      agreePrivacyPolicyClicked();
                        }
                    );
            }
        }
        async function appleloginclicked() {
            if(checkedterms.value == true) {
                await userProvider.loginWithAppleSignIn();
                if(userProvider.userResource.status == PsStatus.SUCCESS) {
                    redirect();
                }  
            }
            else {
                ps_error_dialog.value.openModal(
                    i18n.global.t('login__privacy_policy'),
                    i18n.global.t('login__need_to_agree_privacy'),
                    () => {
                      agreePrivacyPolicyClicked();
                        }
                    );
            }
        }

        async function googleloginclicked() {
            if(checkedterms.value == true) {
                await userProvider.loginWithGoogleId();
                if(userProvider.userResource.status == PsStatus.SUCCESS) {
                    ps_success_dialog.value.openModal(
                    i18n.global.t('register__success'), 
                    i18n.global.t('register__login_success'),
                    i18n.global.t('register_ok'),
                    () => {
                    
                            redirect();

                        }
                    );   
                                    
                }  
                
            }else {
                ps_error_dialog.value.openModal(
                    i18n.global.t('login__privacy_policy'),
                    i18n.global.t('login__need_to_agree_privacy'),
                    () => {
                      agreePrivacyPolicyClicked();
                        }
                    );
            }
        }
        function redirect(){
            userProvider.navigateUserLoginRedirect(route.query.redirect, 'dashboard', router, route.query.redirect, route.query, route.params);
        }

        return { 
        clicked, 
        email, 
        password,
        confirmPassword, 
        name, 
        userProvider, 
        checkedterms, 
        ps_error_dialog, 
        ps_success_dialog,
        loginClicked, 
        agreePrivacyPolicyClicked, 
        privacy_modal,
        facebookloginclicked,
        googleloginclicked ,
        phoneloginclicked,
        validateEmail,
        validationEmail,
        appleloginclicked
        };
    }
}
</script>