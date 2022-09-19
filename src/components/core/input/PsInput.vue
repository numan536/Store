<template>
    <input 
        class=" lg:text-sm text-xs" 
        :type="type" 
        :value="value"   
        :class="theme"     
        :maxlength="maxlength"
        @input="handleInput($event.target.value)" />    
</template>

<script lang='ts'>
export default {
    name : "PsInput",
    props: {
        "value" : String,
        "type" : {
            type: String,
            default: "text"
        },  
        "theme" : {
            type: String,
            default : "ring-primary-300 dark:ring-primaryDark-100 border border-primary-500 dark:border-primaryDark-accent focus:outline-none focus:ring-1 py-2 ps-4 form-input bg-primary-000 dark:bg-primaryDark-black text-secondary-500 dark:text-secondaryDark-white "
                
        },  
        "maxlength" : {
            type : Number,
            default : 99999999
        },
        "onInput" : Function         
    },
    
    setup( props , { emit}) {
        function handleInput(v) { 
            emit('update:value', v);
            
            if(props.onInput != null) {
                props.onInput(v);
            }
        }

        return {
            handleInput
        }
    }
}
</script>