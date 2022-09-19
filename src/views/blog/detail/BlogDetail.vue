<template>
    <ps-content-container class="sm:mt-32 lg:mt-36 mt-28 mb-16">
        <template #content>
            <div class="flex flex-col">
                <div class="flex items-center  "> 
                    <ps-route-link
                        :to="{name: 'dashboard'}"> 
                        <ps-label textColor="text-secondary-400 dark:text-secondaryDark-grey "
                            class="hover:underline cursor-pointer font-medium text-xxs"> 
                                {{ $t("blog_detail__home") }}
                        </ps-label>      
                    </ps-route-link>
                    <ps-icon textColor="text-secondary-400 dark:text-secondaryDark-grey " name="rightArrow" class=' mx-0 sm:mx-2'/>
                        <ps-route-link
                        :to="{name: 'blog-list'}"> 
                        <ps-label  textColor="text-secondary-400 dark:text-secondaryDark-grey "
                            class="hover:underline cursor-pointer font-medium text-xxs"> 
                                {{ $t("blog_detail__blog") }}
                        </ps-label>  
                        </ps-route-link>
                
                    <ps-icon textColor="text-secondary-400 dark:text-secondaryDark-grey " name="rightArrow" class=' mx-0 sm:mx-2'/>
                
                    <ps-label  textColor="text-secondary-400 dark:text-secondaryDark-grey "
                        class=" font-medium text-xxs"> 
                        {{blogProvider.blog?.data?.name}}
                    </ps-label>  
                </div>
                
                <div class="mb-4 mt-3">
                <ps-label-header-4 class="font-medium"> {{ $t("blog_detail__blog") }} </ps-label-header-4>
                <!-- <ps-label class="mt-2 mb-4 text-center"> {{ $t("blog_list__get_latest_update") }} </ps-label> -->
                </div>

                <div class=" w-full my-2 mb-12 flex flex-row space-x-4">
                    <div class=" flex flex-col" :class="blogListProvider.blogList.data?.length > 1 ? 'w-full sm:w-96 lg:w-160' : 'flex-grow'"> 
                        <ps-label class="text-base font-medium "> {{blogProvider.blog?.data?.name}} </ps-label>
                        <ps-label class="text-xs font-light mb-2 mt-1" textColor="text-secondary-400 dark:text-secondaryDark-grey"> {{blogProvider.blog?.data?.addedDateStr}} </ps-label>
                        <img alt="Placeholder" width="300px" height="200px" class="block w-full lg:h-80 h-64 sm:h-72  object-cover" :src="blogProvider.imageUrl( blogProvider.blog?.data?.defaultPhoto?.imgPath )" @error="blogProvider.defaultCarImage">
                        <div class="">
                            
                            <div class="mt-4" v-if="blogProvider.blog.data != null">
                                <ps-label class="text-xs font-light " textColor="text-secondary-400 dark:text-secondaryDark-grey" > 
                                    <span v-html="blogProvider.blog.data.description"> </span>
                                </ps-label>
                            </div>
                        </div>
                    </div>
                    <div class="flex-grow  hidden sm:block" v-if="blogListProvider.blogList.data?.length > 1"> 
                        <ps-label class="text-xs pb-2 lg:text-sm font-light">  {{ $t("blog_detail__related_title") }} </ps-label>
                        <div class="no-scrollbar overflow-y-auto h-128">
                            <div class="w-full mb-3" v-for="blog in blogListProvider.blogList.data" :key="blog.id">
                                <blog-vertical-item v-if="blog.id != blogProvider.blog?.data?.id"  :blog="blog" />
                            </div>
                        </div>
                    </div>
                    
                </div>
                <!-- google adsense desktop view -->
                <!-- google adsense desktop view -->

                <div class="w-mobile sm:w-median lg:w-large h-auto mx-auto">
                    <ps-ad-sense adFormat="horizontal"></ps-ad-sense>
                </div>

            </div>
        </template>
    </ps-content-container>
</template>

<script lang="ts">
//Vue
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import PsIcon from '@/components/core/icons/PsIcon.vue';
import PsContentContainer from "@/components/layouts/container/PsContentContainer.vue";
import PsRouteLink from '@/components/core/link/PsRouteLink.vue';
import PsAdSense from '@/components/core/adsense/PsAdSense.vue';
import PsLabel from '@/components/core/label/PsLabel.vue';
import PsLabelHeader4 from '@/components/core/label/PsLabelHeader4.vue';
import BlogVerticalItem from "@/components/modules/blog/BlogVerticalItem.vue";

//Models
import { createBlogProviderState } from '@/store/modules/blog/BlogProvider';
import PsConst from '@/object/constant/ps_constants';
import { PsValueProvider } from "@/store/modules/core/PsValueProvider";
// import PsUtils from '@/utils/PsUtils';


export default {
    name : "BlogDetailView",
    components : {
        PsContentContainer,
        PsRouteLink,
        // PsLabelTitle,
        PsLabel,
        PsLabelHeader4,
        BlogVerticalItem,
        PsIcon,
        PsAdSense
    },
    setup() {
        const route = useRoute();
        const blogId = route.params.blog_id.toString();
        // Inject Provider
        const blogProvider = createBlogProviderState();
        const blogListProvider = createBlogProviderState();
        const psValueHolder = PsValueProvider.psValueHolder;
        // const locationId = ref(psValueHolder.locationId);
        const loginUserId = psValueHolder.getLoginUserId();

        // PsUtils.log(blogListProvider);

        
        onMounted(() => {
            loadData();              
        });

        async function loadData(){
            // PsUtils.log(blogListProvider);
            await blogProvider.loadBlog(blogId,PsConst.NO_LOGIN_USER);

            if(blogProvider.blog.data.blogCity.isEmptyObject != '1' && blogProvider.blog.data.itemLocationId != ''){
                //  PsUtils.log(blogProvider.blog.data.itemLocationId);
                blogListProvider.paramHolder.locationId = blogProvider.blog.data.itemLocationId;
                await blogListProvider.loadBlogList(loginUserId, blogListProvider.paramHolder);
                // PsUtils.log(blogListProvider);
            }
            

        }
        
        return {
            blogProvider,
            blogListProvider
        }
    }
}
</script>