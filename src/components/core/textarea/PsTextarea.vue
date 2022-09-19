<template>
    <textarea class="shadow-sm text-sm"
                :rows="rows"
                :class="theme"
                :value="value"
                @input="handleInput($event.target.value)"
    ></textarea>
</template>

<script lang='ts'>
export default {
    name : 'PsTextArea',
    props: {
        "rows" : {
            type: Number,
            default: 3
        },  
        "value" : String,
        "type" : {
            type: String,
            default: "text"
        },  
        "theme" : {
            type: String,
            default : "ring-primary-300 dark:ring-primaryDark-100 border border-primary-500 dark:border-primaryDark-accent focus:outline-none focus:outline-none focus:ring-1 py-2 ps-4 form-input bg-primary-000 dark:bg-primaryDark-black text-secondary-500 dark:text-secondaryDark-white "
                
        },           
    },
    setup(_, {emit}) {
        function handleInput(v) {              
            emit('update:value', v);
        }

        return {
            handleInput
        }
    }
};
</script>