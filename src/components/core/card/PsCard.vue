<template>
  <div class="overflow-hidden bg-primary-000 dark:bg-primaryDark-black  dark:border-black" 
    :class="enabledHover ? 'hover:shadow-hoverCardShadow' : '' " key="">
    <slot class=""></slot>
  </div>
</template>

<script lang='ts'>
export default {
    name : "PsCard",
    props: {
        enabledHover : {
            type : Boolean,
            default : false 
        },
    }
};
</script>