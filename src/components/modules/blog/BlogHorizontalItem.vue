<template>
    <div v-if="blog" class=" pb-2 bg-primary-000 dark:bg-primaryDark-black w-full h-full shadow-cardShadow hover:shadow-hoverCardShadow" v-on:click="onClick != null ? onClick(blog) : null">
        <ps-route-link :to="{ name: 'blog-detail', params: { blog_id: blog.id, blog_name: blog.name  }}">
        <img alt="Placeholder" class="cursor-pointer block w-full h-40 sm:h-36 lg:h-40 object-cover" width="360px" height="100px" v-lazy="blogProvider.imageUrl(blog ? blog.defaultPhoto.imgPath : '',3) " @error="blogProvider.defaultCarImage">
        <div v-if="showALL" class="cursor-pointer mt-2 px-2" >
            <ps-label class="font-medium text-base sm:text-xs lg:text-base" v-html=" blog.name"> </ps-label>
            <p class="mt-2  text-xs">
                <ps-label textColor="text-secondary-400 dark:text-secondaryDark-grey" class="font-light text-xs sm:text-xxs lg:text-xs" v-html="blog.description">  </ps-label>
            </p> 
        </div>
        <div v-else class="cursor-pointer mt-2 px-2" >
            <ps-label class="font-medium text-base sm:text-xs lg:text-base" v-html="blog.name "> </ps-label>
            <p class="mt-2   text-xs">
                <ps-label textColor="text-secondary-400 dark:text-secondaryDark-grey" class="font-light text-xs sm:text-xxs lg:text-xs" v-html=" blog.description.length > 120 ? blog.description.slice(0,120)+' ....' : blog.description ">  </ps-label>
            </p> 
        </div>
        </ps-route-link>

        <div class="mt-2 px-2 flex items-end justify-end">
        <ps-label v-if="showALL == false" @click="showALL=true" class="flex-grow-0 text-xxs font-medium cursor-pointer" textColor="text-primary-500 dark:text-primaryDark-accent"> 
            {{ $t("blog_horizontal_item__see_more") }}
            <font-awesome-icon :icon="['fas', 'chevron-circle-right']" class="text-primary-500 dark:text-primaryDark-accent ms-1 mt-0.5 text-xxs"  />
             </ps-label>
        <ps-label v-else @click="showALL=false" class="flex-grow-0 text-xxs font-medium cursor-pointer" textColor="text-primary-500 dark:text-primaryDark-accent"> 
            {{ $t("blog_horizontal_item__see_less") }}
            <font-awesome-icon :icon="['fas', 'chevron-circle-up']" class="text-primary-500 dark:text-primaryDark-accent ms-1 mt-0.5 text-xxs"  />
             </ps-label>
        </div>
    </div>
</template>

<script lang="ts">
import PsLabel from '@/components/core/label/PsLabel.vue';
import { createBlogProviderState } from "@/store/modules/blog/BlogProvider";
import Blog from '@/object/Blog';
import PsRouteLink from '@/components/core/link/PsRouteLink.vue';


import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronCircleUp,faChevronCircleRight } from '@fortawesome/free-solid-svg-icons'
library.add( faChevronCircleUp,faChevronCircleRight)

import { ref } from 'vue';

export default {
    name : "BlogHorizontalItem",
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
        const showALL = ref(false);
        return {
            blogProvider,
            showALL
        }
    }
}
</script>