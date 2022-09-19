<template>
    <div v-if="blog" class=" pb-2 bg-primary-000 dark:bg-primaryDark-black w-full h-full shadow-cardShadow " v-on:click="onClick != null ? onClick(blog) : null">
        <ps-route-link :to="{ name: 'blog-detail', params: { blog_id: blog.id, blog_name: blog.name  }}">
        <img alt="Placeholder" class="cursor-pointer block w-full lg:h-40 h-36 object-cover" width="360px" height="100px" v-lazy="blogProvider.imageUrl(blog ? blog.defaultPhoto.imgPath : '',3) " @error="blogProvider.defaultCarImage">
        <div class="cursor-pointer mt-2 px-0.5 lg:px-2" >
            <ps-label class="font-bold text-sm lg:text-sm" v-html="blog.name "> </ps-label>
            <p class="mt-2  lg:text-xs text-xs">
                <ps-label class="font-light text-xxs lg:text-xxs " textColor="text-secondary-400  dark:text-secondaryDark-grey"> {{ blog.addedDateStr }} </ps-label>
            </p> 
        </div>
        </ps-route-link>

    </div>
</template>

<script lang="ts">
import PsLabel from '@/components/core/label/PsLabel.vue';
import { createBlogProviderState } from "@/store/modules/blog/BlogProvider";
import Blog from '@/object/Blog';
import PsRouteLink from '@/components/core/link/PsRouteLink.vue';


import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronCircleUp,faChevronCircleDown } from '@fortawesome/free-solid-svg-icons'
library.add( faChevronCircleUp,faChevronCircleDown)

export default {
    name : "BloVerticalItem",
    components : {
        PsLabel,
        PsRouteLink
    },
    props : {
        blog : { type : Blog } ,
        onClick : Function
    },
    setup() {
        // Inject Provider
        const blogProvider = createBlogProviderState();
        return {
            blogProvider,
        }
    }
}
</script>