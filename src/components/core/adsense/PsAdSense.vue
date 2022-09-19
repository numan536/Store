

<template>
    <ins class="adsbygoogle mt-2 example_responsive_1"
        :style="adStyle"
        :data-ad-client="adsClient"
        :data-ad-format="adFormat"
        :data-ad-slot="adsSlot"></ins>
   
</template>

<style>

.example_responsive_1 { width: 320px; height: 100px; }
@media(min-width: 500px) { .example_responsive_1 { width: 468px; height: 60px; } }
@media(min-width: 800px) { .example_responsive_1 { width: 728px; height: 90px; } }
</style>

<script lang='ts'>

import {  onMounted,ref } from 'vue';

// Providers
import { PsValueProvider } from '@/store/modules/core/PsValueProvider';
import { usePsAppInfoProviderState } from '@/store/modules/appinfo/AppInfoProvider';
import AppInfoParameterHolder from '@/object/holder/AppInfoParameterHolder';
export default {
    name : "PsAdSense",
    props: {
        adStyle: {
            type: String,
            required: false,
            default: "display:inline-block; width: 200px; height: 200px",
        },
        adFormat: {
            type: String,
            required: false,
            default: "auto",
        }
    },
    setup() {
        const psValueHolder = PsValueProvider.psValueHolder;
        const loginUserId = psValueHolder.getLoginUserId();
        const appInfoProvider = usePsAppInfoProviderState();
        const appInfoParameterHolder = new AppInfoParameterHolder();
        appInfoParameterHolder.userId = loginUserId;
        
        const adsClient = ref('');
        const adsSlot = ref('');

        async function loadData(){
            await appInfoProvider.loadDeleteHistory(appInfoParameterHolder);
            //if(props.adClient == '0'){
                adsClient.value = appInfoProvider.appInfo.data.frontendConfigSetting.adClient;
            // }else{
            //     adsClient.value = props.adClient.toString();
            // }
            //if(props.adSlot == '0'){
                adsSlot.value = appInfoProvider.appInfo.data.frontendConfigSetting.adSlot;
            //}else{
                //adsSlot.value = props.adClient.toString();
            //}
            console.log("Adsense");
            console.log(adsSlot.value);
            console.log(adsClient.value);
        }
        
        
        onMounted( () =>{
            loadData();
            let inlineScript   = document.createElement("script");
            inlineScript.type  = "text/javascript";
            inlineScript.text  = '(adsbygoogle = window.adsbygoogle || []).push({});'
            document.getElementsByTagName('body')[0].appendChild(inlineScript);
        })
        return{
            adsClient,
            adsSlot
        }
    }
}
</script>