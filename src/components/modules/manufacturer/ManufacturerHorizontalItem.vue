<template>
   <div class="text-center cursor-pointer flex flex-row space-x-2" >
        <div class='flex justify-center w-8 h-8'>
            <img alt="Placeholder" class="w-8 h-8 " width="100px" height="100px" v-lazy="manufacturerProvider.imageUrl(manufacturer ? manufacturer.defaultIcon.imgPath : '',2) " @error="manufacturerProvider.defaultCarImage">
        </div>
        <div class="items-center mt-2">
            <ps-label class="my-auto text-sm" :textColor="istruncate ? 'w-20 truncate text-secondary-500 dark:text-secondaryDark-accent' : 'w-24 break-words text-secondary-500 dark:text-secondaryDark-accent'" > {{ manufacturer ? manufacturer.name : '' }}  </ps-label>
        </div>
    </div>
</template>

<script lang="ts">
import { createManufacturerProviderState } from "@/store/modules/manufacturer/ManufacturerProvider";
import { defineComponent } from "vue";
import PsLabel from '@/components/core/label/PsLabel.vue';
import Manufacturer from "@/object/Manufacturer";

export default defineComponent ({
    name : "ManufacturerHorizontalItem",
    props : {
        manufacturer : { type : Manufacturer, default : new Manufacturer } ,
        istruncate : { type : Boolean, default : false } ,
    },
    components : {
       PsLabel
    },
    setup() {
        // Inject Provider
        const manufacturerProvider = createManufacturerProviderState();
        
        return {
            manufacturerProvider
        }

    }
});
</script>