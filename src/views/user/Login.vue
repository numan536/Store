<template>
    <div class=" sm:mt-6 lg:mt-20 mt-10 h-188 lg:h-auto">

    <div class="relative w-screem flex bg-transparent sm:bg-primary-500 lg:bg-transparent " >
        <div class="absolute hidden sm:flex lg:hidden mt-3">  
            <img alt="Placeholder"  width="300px" height="300px"  class="w-screen h-188 object-cover" src="@/assets/illustrations/illustration-tablet.svg" />
        </div>
        <div class="relative hidden lg:flex mt-3 w-1/2">  
            <img alt="Placeholder"  width="300px" height="300px"  class="w-screen h-full object-cover" src="@/assets/illustrations/illustration.svg" />
        </div>
        <div class="relative sm:mt-36 lg:mt-10 mt-24 w-mobile sm:w-median mx-auto lg:ms-4 xl:ms-6 bg-transparent lg:bg-background lg:dark:bg-backgroundDark flex flex-col ">

            <div class=" justify-end lg:justify-center flex sm:hidden lg:flex">
                <ps-label textColor="text-secondary-500 dark:text-secondaryDark-white" class='flex-grow-0 mt-3 font-medium text-xs' > 
                {{ $t("login__new_here") }} <span class="font-medium text-primary-500 dark:text-primaryDark-accent cursor-pointer" @click='openRegister' > {{ $t("login__sign_up") }}</span> </ps-label>
            </div>
            <div class="flex sm:w-96 lg:w-full mx-6 sm:mx-16 lg:ms-0  my-4 lg:h-20 sm:h-10 h-5"  >
                <ps-label class="text-sm" textColor="text-primary-500 dark:text-primaryDark-white ps-4 lg:ps-2" v-if="userProvider.userResource.message != ''"> {{ userProvider.userResource.message }} </ps-label>
            </div>
    
            <div class="flex flex-col w-full sm:w-96 lg:w-auto m-auto lg:m-2 bg-background dark:bg-backgroundDark p-4 lg:p-2">

                <div class=" justify-end lg:justify-center hidden sm:flex lg:hidden mb-3">
                    <ps-label textColor="text-secondary-500 dark:text-secondaryDark-white" class='flex-grow-0 font-medium text-xs' > 
                    {{ $t("login__new_here") }} <span class="font-medium text-primary-500 dark:text-primaryDark-accent cursor-pointer" @click='openRegister' > {{ $t("login__sign_up") }}</span> </ps-label>
                </div>
                <!-- Login Title -->        
                <ps-label class="mx-6 sm:mx-16 lg:ms-0 lg:w-64  font-medium text-2xl lg:text-3xl"  textColor="text-secondary-500 dark:text-secondaryDark-white" > {{ $t("login__login_title") }} </ps-label>
                <!-- <form class="flex flex-col"> -->
                <!-- Login Entry -->
                <ps-label class="mx-6 sm:mx-16 lg:ms-0 lg:w-64  mt-4 font-medium text-xs"> {{ $t("login__email") }} </ps-label>
                <ps-input class="mx-6 sm:mx-16 lg:ms-0 lg:w-64  mt-1" type="email" v-bind:placeholder="$t('login__email_placeholder')" v-on:keyup.enter="normalLoginClicked" v-model:value="email" @keypress="validateEmail"></ps-input>
                <ps-label class="mx-6 sm:mx-16 lg:ms-0 lg:w-64  mt-1 text-xs " textColor="text-primary-500 dark:text-primaryDark-accent" v-if="validationEmail"> {{ $t("login__email_required_error") }} </ps-label>
                <ps-label class="mx-6 sm:mx-16 lg:ms-0 lg:w-64  mt-4 font-medium text-xs"> {{ $t("login__password") }} </ps-label>
                <ps-input class=" mx-6 sm:mx-16 lg:ms-0 lg:w-64  mt-1" type="password" v-bind:placeholder="$t('login__password_placeholder')" v-on:keyup.enter="normalLoginClicked" v-model:value="password" autocomplete='on'></ps-input>
                    
                <!-- Loading Button -->
                <ps-button textSize="mx-6 sm:mx-16 lg:ms-0 lg:w-64  text-xs lg:text-sm " class=" mt-10 py-3" v-if="userProvider.loading.value" :disabled="true">                     
                    {{ $t("login__loading") }} </ps-button>

                <!-- Login Button --> 
                <ps-button textSize="mx-6 sm:mx-16 lg:ms-0 lg:w-64  text-xs lg:text-sm" class="shadow-buttonShadow hover:shadow-none mt-10 py-3" @click="normalLoginClicked" :disabled="false" v-else>{{ $t("login__login") }} </ps-button>
                <!-- </form> -->
                <!-- Forget password -->
                <div class="mx-6 sm:mx-16 lg:ms-0 lg:w-64 mt-4 lg:mt-6 flex flex-col items-center">
                    <ps-label textColor="text-secondary-400 dark:text-secondaryDark-grey" class='cursor-pointer font-light text-xs' @click='openForgotPassword' > {{ $t("login__forgot_password") }} </ps-label>
                    
                </div>

                <div class="flex flex-row justify-center mt-4 mx-6 sm:mx-16 lg:ms-0 lg:w-64 ">
                    <ps-line class="w-full lg:h-3 h-2 border border-l-0 border-r-0 border-secondary-400 dark:border-secondaryDark-grey" />
                    <ps-label class="px-1 font-medium text-xs lg:text-sm"> {{ $t("login__or") }} </ps-label>
                    <ps-line class="w-full lg:h-3 h-2 border border-l-0 border-r-0 border-secondary-400 dark:border-secondaryDark-grey" />
                </div>

                <!-- Login with other Methods -->
                <div class='flex flex-row items-start mt-3 lg:mt-4 mx-6 sm:mx-16 lg:ms-0 '>
                    <ps-checkbox-value title="" 
                        class="lg:mt-1 mt-0.5" v-model:value="agreePrivacyPolicy" 
                        @click="agreePrivacyPolicyClicked" />
                    <ps-label class='me-2 font-medium text-xs lg:text-sm'>{{ $t("login__check_privacy_policy") }}</ps-label>
                    <ps-route-link :to="{name: 'privacy' }" class="underline cursor-pointer text-sm">  
                            <ps-label class='font-medium text-xs lg:text-sm'> {{ $t("login__privacy_policy") }}</ps-label>
                    </ps-route-link> 
                </div>

                <ps-label class='mx-6 sm:mx-16 lg:ms-0 lg:w-64  cursor-pointer font-medium text-xs lg:text-sm mt-2' > {{ $t("login__login_with") }} </ps-label>

                <div class="mx-6 sm:mx-16 lg:ms-0 lg:w-64  flex flex-row space-x-6 mt-4">
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
        <ps-loading-dialog ref="ps_loading_dialog" class='z-40' />
        <ps-error-dialog ref="ps_error_dialog" />
        <ps-success-dialog-2 ref="ps_success_dialog" /> 
        <privacy-modal ref="privacy_modal" />
    </div>
    </div>

</template>

<script lang="ts">
// Libs
import { useRoute } from 'vue-router';
import router from '@/router';
import { ref } from 'vue';

// Providers
import { useUserProviderState } from '@/store/modules/user/UserProvider';
import { PsValueProvider } from '@/store/modules/core/PsValueProvider';
import PsStatus from '@/api/common/PsStatus';

// Components
import PsLoadingDialog from '@/components/core/dialog/PsLoadingDialog.vue';
import PsLabel from '@/components/core/label/PsLabel.vue';
import PsButton from '@/components/core/buttons/PsButton.vue';
import PsInput from '@/components/core/input/PsInput.vue';
import PsCheckboxValue from '@/components/core/checkbox/PsCheckboxValue.vue';
import PsLine from '@/components/core/line/PsLine.vue';
import PsErrorDialog from '@/components/core/dialog/PsErrorDialog.vue';
import PsRouteLink from '@/components/core/link/PsRouteLink.vue';
import PrivacyModal from '@/components/modules/privacy/PrivacyModal.vue';
import PsSuccessDialog2 from '@/components/core/dialog/PsSuccessDialog2.vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faFacebookF,faGoogle,faApple } from '@fortawesome/free-brands-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
library.add(faFacebookF,faPhone,faGoogle,faApple )

//language
import { i18n } from '@/assets/locales/index';

export default {
    name : "LoginView",
    components : {
        PsLabel,
        PsButton,
        PsInput,
        PsCheckboxValue,
        PsLine,
        PsErrorDialog,
        PsRouteLink,
        PrivacyModal,
        PsLoadingDialog,
        PsSuccessDialog2
    },
    setup() {
       
        // Check user is already loggedIn
        if(PsValueProvider.psValueHolder.isUserLoggedIn()) {
            router.push({name: "dashboard"});
        }

        // Init Variables
        const route = useRoute();
        const email = ref('');
        const password = ref('');
        const agreePrivacyPolicy = ref(false);
        const validationEmail = ref(false);

        const ps_error_dialog = ref();
        const ps_success_dialog = ref();
        const privacy_modal = ref();
        const ps_loading_dialog = ref();

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

        // Functions
        function phoneloginclicked() {
            if(agreePrivacyPolicy.value) {

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

        async function facebookloginclicked() {
            if(agreePrivacyPolicy.value) {
                await userProvider.loginWithFacebookId();
                if(userProvider.userResource.status == PsStatus.SUCCESS) {

                    redirect()
                    
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

        async function googleloginclicked() {
            if(agreePrivacyPolicy.value) {
                await userProvider.loginWithGoogleId();
                if(userProvider.userResource.status == PsStatus.SUCCESS) {
                    redirect();
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
        
        async function normalLoginClicked() {

            if(agreePrivacyPolicy.value) {
                ps_loading_dialog.value.openModal();

                await userProvider.loginWithEmailId(email.value, password.value);        
                
                ps_loading_dialog.value.closeModal();
                if(userProvider.userResource.status == PsStatus.SUCCESS) {
                    redirect();           
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
            if(agreePrivacyPolicy.value) {
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

        function openRegister()  {
            userProvider.navigateUserLoginTo("register", router, route.query.redirect, route.query, route.params);        
        }

        function openForgotPassword() {
            userProvider.navigateUserLoginTo("forgotpassword", router, route.query.redirect, route.query, route.params);
        }
        
        function isAcceptPrivacy(isAccept){
            agreePrivacyPolicy.value = isAccept;
        }

        function agreePrivacyPolicyClicked() {
            privacy_modal.value.openModal(isAcceptPrivacy);            
        }
        function redirect(){
            userProvider.navigateUserLoginRedirect(route.query.redirect, 'dashboard', router, route.query.redirect, route.query, route.params); 
        }

        return { 
            normalLoginClicked, 
            email, 
            password, 
            userProvider, 
            phoneloginclicked, 
            facebookloginclicked, 
            googleloginclicked, 
            openRegister,
            openForgotPassword,
            agreePrivacyPolicy,
            ps_error_dialog,
            agreePrivacyPolicyClicked,
            privacy_modal,
            ps_success_dialog,
            validateEmail,
            validationEmail,
            ps_loading_dialog,
            appleloginclicked
        };
    }


}
</script>
