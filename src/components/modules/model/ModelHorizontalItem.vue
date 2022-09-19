<template>
    <div class="flex flex-col mt-2 w-full h-auto cursor-pointer">
        <div class="relative bg-primary-800 rounded-md">
            <div class="absolute opacity-50">
                <img alt="Placeholder" width="150px" height="100px" class="w-screen block mx-auto h-24 object-cover rounded-md" :src="modelProvider.imageUrl(model ? model.defaultPhoto.imgPath : '',2) " @error="modelProvider.defaultCarImage">

            </div>
            <div class="relative justify-end flex">
                <custom-checkbox :checked="model?.id" :value="model?.id" 
                    v-model:selectedValue="checkedSelectedList" v-if="scribe"></custom-checkbox>
            </div>
           <div class="mx-auto pt-10 relative">
                <ps-label class="absolute w-full text-sm text-center leading-4" textColor="text-textLight"> {{model ? model.name : ''}} </ps-label>
            </div>

        </div>  
    </div>
{{checkedSelectedList}}
</template>

<script lang="ts">
import { createModelProviderState } from "@/store/modules/model/ModelProvider";
import { defineComponent, reactive } from "vue";
import PsLabel from '@/components/core/label/PsLabel.vue';
import Model from "@/object/Model";
import CustomCheckbox from '@/components/core/checkbox/CustomCheckbox.vue';

export default defineComponent ({
    name : "CategoryHorizontalItem",
    props : {
        model : { type : Model } ,
        scribe : { 
            type : Boolean,
            default : false
        },
        onClick : Function
    },
    components : {
       PsLabel,
       CustomCheckbox
    },
    setup() {
        // Inject Provider
        const modelProvider = createModelProviderState();
        const checkedSelectedList = reactive([]);
        
        return {
            modelProvider,
            checkedSelectedList
        }

    }
});
</script>
