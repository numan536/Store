<template>
    <button :type="type" :disabled="disabled" 
        class="items-center theme px-4 py-2  
            font-medium capitalize tracking-widest 
            active:bg-gray-900 focus:outline-none
            focus:border-gray-900 focus:shadow-outline-gray
            transition ease-in-out duration-150" 
       :class="[disabled ? 'bg-primary-500 dark:bg-primaryDark-accent text-textLight' : theme, rounded, textSize]">
        <slot class=""></slot>
    </button>
</template>

<script lang='ts'>
    export default {
        name: "PsButton",
        props: {
            type: {
                type: String,
                default: 'submit',
            },
            theme : {
                type: String,
                default: 'bg-primary-500 dark:bg-primaryDark-accent text-textLight '
            },
            rounded : {
                type : String,
                default : "rounded-none" 
            },
            disabled: {
                type: Boolean,
                default: false
            },
            textSize :{
                type: String,
                default: 'lg:text-sm sm:text-xs text-sm'
            }
        }
    }
</script>
