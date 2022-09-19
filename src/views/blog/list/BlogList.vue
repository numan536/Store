<template>
<div>
  <ps-content-container class="sm:mt-32 lg:mt-36 mt-28">
    <template #content>
      <!-- Blog list -->
      <div class="flex flex-col mb-4">
         <div class="flex items-center  "> 
            <ps-route-link
                :to="{name: 'dashboard'}"> 
                <ps-label textColor="text-secondary-400 dark:text-secondaryDark-grey "
                    class="hover:underline cursor-pointer font-medium text-xxs"> 
                        {{ $t("item_list__home") }}
                </ps-label>      
            </ps-route-link>
            
            <ps-icon name="rightArrow" class='text-secondary-400 dark:text-secondaryDark-grey mx-0 sm:mx-2'/>
        
            <ps-label  textColor="text-secondary-400 dark:text-secondaryDark-grey "
                class="font-medium text-xxs"> 
                {{ $t("blog_list__blog") }}
            </ps-label>  
          </div>
        <div class="mb-4 mt-3">
          <ps-label-header-4 class="font-medium"> {{ $t("blog_list__blog") }} </ps-label-header-4>
          <!-- <ps-label class="mt-2 mb-4 text-center"> {{ $t("blog_list__get_latest_update") }} </ps-label> -->
        </div>
        <div class="flex flex-row mb-16 ">
          <div class='w-full h-auto' >
            <ps-ad-sense class="mb-4" adFormat="horizontal"></ps-ad-sense>
            <div class="grid grid-cols-1 sm:grid-cols-3  gap-x-2 lg:gap-x-4 lg:gap-y-8 gap-y-4">

              <!-- Column -->
              <div class="w-full" v-for="blog in blogProvider.blogList.data" :key="blog.id">

                
                  <blog-horizontal-item  :blog="blog" />
               
              </div>
              <!-- END Column -->

            </div>

                
            <div v-if="blogProvider.loading.value == false" class=" items-center justify-end flex">
              <ps-button class="shadow-buttonShadow hover:shadow-none w-36 flex-grow-0 mt-6" @click="loadMore" :class="blogProvider.isNoMoreRecord ? 'hidden' : ''"> {{ $t("blog_list__load_more") }} </ps-button>
            </div>
            <div v-else class=" items-center justify-center flex">
              <ps-button   class="w-60 flex-grow-0 mt-36" :disabled="true"> {{ $t("blog_list__loading") }} </ps-button>
            </div>

          </div>
        </div>
      </div>
      <!-- End Blog List -->
      <div class="">
        <ps-ad-sense adFormat="horizontal"></ps-ad-sense>
    </div>
    </template>
  </ps-content-container>
   <!-- google adsense desktop view -->
   <div class="">
      <ps-ad-sense adFormat="horizontal"></ps-ad-sense>
    </div>
</div>
</template>

<script lang="ts">

// Vue
// import { ref } from 'vue';

import PsContentContainer from "@/components/layouts/container/PsContentContainer.vue";
import PsButton from '@/components/core/buttons/PsButton.vue';
import PsLabel from '@/components/core/label/PsLabel.vue';
import PsLabelHeader4 from '@/components/core/label/PsLabelHeader4.vue';
import PsRouteLink from '@/components/core/link/PsRouteLink.vue';
import PsIcon from '@/components/core/icons/PsIcon.vue';
import PsAdSense from '@/components/core/adsense/PsAdSense.vue';

// Models
import { createBlogProviderState } from "@/store/modules/blog/BlogProvider";

// Modules
import BlogHorizontalItem from "@/components/modules/blog/BlogHorizontalItem.vue";
import { PsValueProvider } from "@/store/modules/core/PsValueProvider";

export default {
  name: "BlogListView",
  components: {
    PsContentContainer,
    BlogHorizontalItem,
    PsButton,
    PsLabel,
    PsLabelHeader4,
    PsRouteLink,
    PsIcon,
    PsAdSense
  },
  setup() {
  
    const blogProvider = createBlogProviderState();
    const psValueHolder = PsValueProvider.psValueHolder;
    // const locationId = ref(psValueHolder.locationId);
    const loginUserId = psValueHolder.getLoginUserId();

    // blogProvider.paramHolder.locationId = locationId.value;
    blogProvider.loadBlogList(loginUserId, blogProvider.paramHolder);

    function loadMore() {             
      blogProvider.loadBlogList(loginUserId, blogProvider.paramHolder);
    }

    return {
      blogProvider,
      loadMore
    };
  },
};
</script>