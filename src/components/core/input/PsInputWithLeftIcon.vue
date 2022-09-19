<template>
    <div class="relative ">
        <input class="
                    w-full                    
                    ps-10
                    text-xs
                    "
                    :class="[theme, height]" 
                    :type="type" 
                    :value="value" @input="handleInput($event.target.value)" :placeholder="placeholder"/>
        <div class="absolute inset-y-0 flex items-center rtl:right-0 ms-4" :class="psValueHolder.languageCode == 'ar' ? 'right-0' : 'left-0'">
            <slot name="icon" class="me-4"></slot>
        </div>
    </div>
</template>

<script lang='ts'>
import { PsValueProvider } from '@/store/modules/core/PsValueProvider';
export default {        
    name: "PsInputWithLeftIcon",
    props: {
        "value" : String,
        "type" : {
            type: String,
            default: "text"
        },
        "height" : {
            type: String,
            default: ""
        },
        "theme" : {
            type: String,
            default: "outline-none focus:outline-none py-2 ps-4 form-input bg-primary-000 dark:bg-primaryDark-black text-secondary-500 dark:text-secondaryDark-white "
        }, 
        "placeholder": String
    },
    setup(_, {emit}) {
        const psValueHolder = PsValueProvider.psValueHolder;
        function handleInput(v : any) {                
            emit('update:value', v);
        }

        return { handleInput,psValueHolder };
    }
}
</script>























