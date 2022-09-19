<template>
    <div class=" w-full md:w-auto cursor-pointer my-2">
        <!-- Pscard -->
        <ps-card class="flex flex-col my-2 bg-white dark:bg-primaryDark-black " :enabledHover="true">
            <div class="px-4 mt-4">
                <rating-view :grade="rate ? rate.rating:0" :maxStars="5" :hasCounter="true" />
                <!-- <ps-label-title-3 class="mt-2"> {{rate ? rate.fromUser.userName:''}} </ps-label-title-3> -->
                <span class="flex">
                    <ps-label-title-3 class="mt-2" > {{rate ? rate.fromUser.userName:''}} </ps-label-title-3>
                    <img v-if="rate != null && rate.fromUser.isVerifybluemark == '1'" alt="Placeholder" class="mx-1 w-4 h-4 object-fill" width="15px" height="10px" src="@/assets/images/mark2.png" >
                </span>
                <ps-label class="mt-2 mb-2"> {{rate ? rate.title:''}} </ps-label>
                <ps-label class="mt-2 mb-4"> {{rate ? rate.description:''}} </ps-label>
            </div>
        </ps-card>
        <!-- end Pscard -->
    </div>
</template>

<script lang="ts">

import PsLabel from '@/components/core/label/PsLabel.vue';
import PsLabelTitle3 from '@/components/core/label/PsLabelTitle3.vue';
import PsCard from '@/components/core/card/PsCard.vue';
import RatingView from '@/components/core/rating/Rating.vue';

import { createRatingListProviderState } from "@/store/modules/rating/RatingListProvider";
import Rating from '@/object/Rating';

export default {
    name : "RatingHorizontal",
    components : {        
        PsLabel,
        PsCard,
        PsLabelTitle3,
        RatingView
    },
    props : {
        rate : { type : Rating } ,
        onClick : Function
    },
    setup() {
        // Inject Provider
        const ratinglistProvider = createRatingListProviderState();
        return {
            ratinglistProvider
        }
    }
}
</script>