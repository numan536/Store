<template>

    <div  v-if="itemId == '0' || dataReady == true " class=''>
        
    
        <div class="mt-76 mb-20 min-h-36 " v-if="showCell == 1">

        <!-- Start Choose Photo and Video --> 
            <div class="w-full flex flex-col ">
                <!-- First Screen for photo -->
                <div class="flex justify-center ">
                    <!-- Start Select Item Photo Horizontal -->
                    <div class="flex-shink-0 w-76 relative ">
                        <draggable-container :list="galleryProvider.galleryList.data ? galleryProvider.galleryList.data : previewImages.data" :onChange= "dragClick">
                            <div class="me-4 mt-2 cursor-pointer" v-for='index in imageCount' :key='index'>
                                <div :class=" index== 1 ? 'w-76 h-40' : 'w-16 h-8'" class="relative">
                                    <input type="file" accept=".jpg,.jpeg,.png" @change="onImageSelected($event)" ref="image" style="display: none;">
                                    <div class="absolute w-full h-full ">
                                        <div v-if="getImageUrl(index) == ''" class="w-full h-full border-primary-500 dark:border-primaryDark-accent border-dashed border-2 flex flex-col justify-center items-center" @click="defaultClick(index)"> 
                                            <font-awesome-icon :icon="['fas', 'image']" class=" text-primary-500 dark:text-primaryDark-accent " :class=" index== 1 ? 'text-xl' : 'text-sm'"   />
                                            <ps-label v-if="index == 1" class="font-medium text-xs lg:text-xs flex-shink-0" textColor="text-primary-500 dark:text-primaryDark-accent"> {{ $t("item_entry__photo_title") }} </ps-label> 
                                        </div>
                                        <img v-else alt="Placeholder" width="300px" height="300px" class=" w-full h-full object-cover" :src="getImageUrl(index)" @error="galleryProvider.defaultCarImage" @click="defaultClick(index)"  />
                                    </div>
                                    <div class="relative pt-4 ms-10" >
                                        <div @click="imageDelete(index)" v-if="index > 1 && getImageUrl(index) !=''" class="cursor-pointer bg-primary-000 rounded-full dark:bg-primaryDark-black py-0.5 px-2">
                                            <font-awesome-icon :icon="['fas', 'trash-alt']" class=" text-secondary-500 dark:text-secondaryDark-white text-xs"  />
                                        </div>
                                    </div>

                               </div>
                    
                            </div>
                        </draggable-container>
                    </div> 
                    <!-- End Select Item Photo Horizontal -->
                </div>
                <!-- End First Screen for photo -->
                <!-- Start for video -->
                <div v-if="appInfoProvider?.appInfo?.data?.frontendConfigSetting?.isEnableVideoSetting == '1'"  class="flex justify-center ">
                    <div class="flex flex-shink-0">
                        <div class="mt-16 w-76 h-40 relative cursor-pointer"  for="upload-video">
                            <input type="file" size=1 max=1 accept=".mov,.mp4"  @change="onVideoSelected" ref="video" id="upload-video" style="display: none;"  />
                            <div @click="onVideoClick" class=" w-full h-20 rounded-2xl flex items-center justify-center absolute">
                                <div v-if="previewVideo.data == '' && getVideoUrl() ==''" class="w-76 h-40 border-primary-500 dark:border-primaryDark-accent border-dashed border-2 flex flex-col justify-center items-center"> 
                                    <font-awesome-icon :icon="['fas', 'video']" class=" text-primary-500 dark:text-primaryDark-accent text-xl"  />
                                    <ps-label class="font-medium text-xs lg:text-xs flex-shink-0" textColor="text-primary-500 dark:text-primaryDark-accent"> {{ $t("item_entry__video_title") }} </ps-label> 
                                </div>
                                <img v-if="previewVideo.data == '' && getVideoUrl() !=''" alt="Placeholder"  width="300px" height="300px"  class=" w-76 h-40 object-cover " :src="getVideoUrl()" @error="galleryProvider.defaultCarImage" />
                                <img v-else v-for='video in previewVideo.data' :key="video" alt="Placeholder" width="300px" height="300px" class=" w-76 h-40 object-cover" v-lazy="video" @click="defaultClick"  />
                            </div>
                            <div @click="videoDelete()" v-if="previewVideo.data != '' || getVideoUrl() !=''" class="cursor-pointer relative mt-28 ms-68 bg-primary-000 rounded-full dark:bg-primaryDark-black  py-1.5 px-2.5">
                                <font-awesome-icon :icon="['fas', 'trash-alt']" class=" text-secondary-500 dark:text-secondaryDark-white lg:text-base text-sm"  />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- End Choose Photo and Video-->
            <div class="w-76 mx-auto flex flex-row justify-between">
                <div />
                <ps-button class="shadow-buttonShadow hover:shadow-none w-32" :theme="showInput.photoStatus ? 'bg-primary-500 dark:bg-primaryDark-accent text-textLight ' : 'bg-secondary-300 text-textLight '"  textSize="lg:text-sm sm:text-xs text-xs " @click="nextClick1"> {{ $t("item_entry__next") }} </ps-button>
            </div>
        </div>
        <div class="mt-76 mb-20 min-h-36 " v-if="showCell == 2">

            <div class="w-76 mx-auto flex flex-col">
                <!-- for title -->
                <div v-if="showInput.titleStatus && manageInput.includes('titleStatus')">
                    <ps-label class=" font-medium text-xs lg:text-xs" id="title">{{ $t("item_entry__title") }}   </ps-label>
                    <ps-input class="mt-1 w-full" type="text" v-bind:placeholder="$t('item_entry__title')" v-model:value="paramHolder1.title" @keyup.enter="showNext('titleStatus')" @keypress="validateTitle"></ps-input>
                    <ps-label class="text-xs mt-1  w-full" textColor="text-primary-500 dark:text-primaryDark-accent " v-if="validation.titleStatus"> {{ $t("item_entry__title_required_error") }} </ps-label>
                </div>
                <!-- end title -->

                <!-- for type dropdown-->
                <div v-if="showInput.itemTypeStatus && manageInput.includes('itemTypeStatus')">
                    <ps-label class="lg:mt-8 mt-6  font-medium text-xs lg:text-xs  "> {{ $t("item_entry__type") }}  </ps-label>
                    <ps-dropdown align="left" class='mt-1  w-full' @onClick="loadItemType" >
                        <template #select>
                        
                            <ps-dropdown-select :showCenter="true"  :selectedValue="paramHolder1.itemTypeName" />
                            
                        </template>
                        <template #list >
                            <div
                                class="rounded-md shadow-xs w-56 " >
                                <div class="pt-2 z-30 ">
                                    <div v-if="itemTypeProvider.itemTypeList.data == null">
                                        <ps-label class='p-2 flex' @click="loadItemType">{{ $t("item_entry__loading") }} </ps-label >
                                    </div>
                                    <div v-else>
                                        <div v-for="selectData in itemTypeProvider.itemTypeList.data" 
                                        :key="selectData.id" 
                                        class="w-56 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  
                                        @click="itemTypeFilterClicked(selectData)" >
                                            
                                            <ps-label class="ms-2" :class="selectData.id == paramHolder1.id ? ' font-bold' : ''"  > {{selectData.name}} </ps-label>
                                            
                                        </div>
                                    </div>
                                </div>                                
                            </div>
                        </template>
                        <template #loadmore>
                                
                            <div class="mb-2 w-56">

                                <div  v-if="itemTypeProvider.itemTypeList.data != null
                                    && itemTypeProvider.loading.value == true" class='mt-4 ms-4 flex'>
                                    <ps-label-caption > {{ $t("item_entry__loading") }}</ps-label-caption>
                                </div>

                                <ps-label class="flex mt-4 ms-4 mb-2 underline font-bold cursor-pointer" :class="itemTypeProvider.isNoMoreRecord ? 'hidden' : ''"  @click="loadItemType" > {{ $t("item_entry__load_more") }} </ps-label>
                            </div>
                            
                        </template>
                    </ps-dropdown>
                    <ps-label class="text-xs mt-1  w-full" textColor="text-primary-500 dark:text-primaryDark-accent " v-if="validation.itemTypeStatus"> {{ $t("item_entry__item_type_required_error") }} </ps-label>
                </div>
                <!-- end type dropdown-->

                <!-- for seller type dropdown-->
                <div v-if="showInput.sellerTypeStatus && manageInput.includes('sellerTypeStatus')">
                    <ps-label class="lg:mt-8 mt-6  font-medium text-xs lg:text-xs  "> {{ $t("item_entry__sellertype") }}  </ps-label>
                    <ps-dropdown align="left" class='mt-1  w-full' @onClick="loadSellerType" >
                        <template #select>
                        
                            <ps-dropdown-select :showCenter="true"  :selectedValue="paramHolder1.sellerTypeName" />
                            
                        </template>
                        <template #list >
                            <div
                                class="rounded-md shadow-xs w-56 " >
                                <div class="pt-2 z-30 ">
                                    <div v-if="sellerTypeProvider.sellerTypeList.data == null">
                                        <ps-label class='p-2 flex' @click="loadSellerType">{{ $t("item_entry__loading") }} </ps-label >
                                    </div>
                                    <div v-else>
                                        <div v-for="selectData in sellerTypeProvider.sellerTypeList.data" 
                                        :key="selectData.id" 
                                        class="w-56 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  
                                        @click="sellerTypeFilterClicked(selectData)" >
                                            
                                            <ps-label class="ms-2" :class="selectData.id == paramHolder1.id ? ' font-bold' : ''"  > {{selectData.name}} </ps-label>
                                            
                                        </div>
                                    </div>
                                </div>                                
                            </div>
                        </template>
                        <template #loadmore>
                                
                            <div class="mb-2 w-56">

                                <div  v-if="sellerTypeProvider.sellerTypeList.data != null
                                    && sellerTypeProvider.loading.value == true" class='mt-4 ms-4 flex'>
                                    <ps-label-caption > {{ $t("item_entry__loading") }}</ps-label-caption>
                                </div>

                                <ps-label class="flex mt-4 ms-4 mb-2 underline font-bold cursor-pointer" :class="sellerTypeProvider.isNoMoreRecord ? 'hidden' : ''"   @click="loadSellerType" > {{ $t("item_entry__load_more") }} </ps-label>
                            </div>
                            
                        </template>
                    </ps-dropdown>
                    <ps-label class="text-xs mt-1  w-full" textColor="text-primary-500 dark:text-primaryDark-accent " v-if="validation.sellerTypeStatus"> {{ $t("item_entry__seller_type_required_error") }} </ps-label>
                </div>
                <!-- end seller type dropdown-->


                <!-- for price type -->
                <div v-if="showInput.itemPriceTypeStatus && manageInput.includes('itemPriceTypeStatus')">
                    <ps-label class="lg:mt-8 mt-6  font-medium text-xs lg:text-xs  "> {{ $t("item_entry__item_price_type") }}   </ps-label>
                    <ps-dropdown align="left" class='mt-1  w-full' @onClick="loadItemPriceType" >
                        <template #select>
                            <ps-dropdown-select :showCenter="true"  :selectedValue="paramHolder1.itemPriceTypeName" />
                        </template>
                        <template #list >
                            <div class="rounded-md shadow-xs w-56 " >
                                <div class="pt-2 z-30 ">
                                    <div v-if="itemPriceTypeProvider.itemPriceTypeList.data == null">
                                        <ps-label class='p-2 flex' @click="loadItemPriceType"> {{ $t("item_entry__loading") }} </ps-label >
                                    </div>
                                    <div v-else>
                                        <div v-for="pricetype in itemPriceTypeProvider.itemPriceTypeList.data" :key="pricetype.id" 
                                        class="w-56 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  
                                        @click="itemPriceTypeFilterClicked(pricetype)" >
                                            <ps-label class="ms-2" :class="pricetype.id==paramHolder1.itemPriceTypeId ? ' font-bold' : ''"  > {{pricetype.name}} </ps-label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <template #loadmore>
                                
                            <div class="mb-2 w-56">

                                <div  v-if="itemPriceTypeProvider.itemPriceTypeList.data != null
                                    && itemPriceTypeProvider.loading.value == true" class='mt-4 ms-4 flex'>
                                    <ps-label-caption > {{ $t("item_entry__loading") }} </ps-label-caption>
                                </div>

                                <ps-label class="flex mt-4 ms-4 mb-2 underline font-bold cursor-pointer" :class="itemPriceTypeProvider.isNoMoreRecord ? 'hidden' : ''"  @click="loadItemPriceType" >{{ $t("item_entry__load_more") }} </ps-label>
                            </div>
                            
                        </template>
                    </ps-dropdown>
                    <ps-label class="text-xs mt-1  w-full" textColor="text-primary-500 dark:text-primaryDark-accent " v-if="validation.itemPriceTypeStatus"> {{ $t("item_entry__price_type_required_error") }} </ps-label>
                </div>
                <!-- end price type -->
                
                <!-- for price_unit -->
                <div v-if="showInput.priceUnitStatus && manageInput.includes('priceUnitStatus')">
                    <ps-label class="lg:mt-8 mt-6  font-medium text-xs lg:text-xs  ">{{ $t("item_entry__price_unit") }}   </ps-label>
                    <ps-input class="lg:mt-1  w-full" type="text" v-bind:placeholder="$t('item_entry__price_unit')" v-model:value="paramHolder1.priceUnit" @keyup.enter="showNext('priceUnitStatus')" @keypress="validatePriceUnit"></ps-input>
                    <ps-label class="text-xs mt-1  w-full" textColor="text-primary-500" v-if="validation.priceUnitStatus"> {{ $t("item_entry__price_unit_required_error") }} </ps-label>
                </div>
                <!-- end price_unit -->


                <div class="flex flex-row justify-between lg:mt-8 mt-6" >
                    <!-- for currency symbol dropdown -->
                    <div v-if="showInput.itemCurrencyStatus && manageInput.includes('itemCurrencyStatus')" class='w-36'>
                        <div >
                            <ps-label class=" w-full font-medium text-xs lg:text-xs  "> {{ $t("item_entry__currency_symbol") }}  </ps-label>
                            <ps-dropdown align="left" class='mt-1  w-full' @onClick="loadCurrency" >
                                <template #select>
                                    <ps-dropdown-select :showCenter="true"  :selectedValue="paramHolder1.currencyShortForm" />
                                </template>
                                <template #list >
                                    <div class="rounded-md shadow-xs w-56 " >
                                        <div class="pt-2 z-30 ">
                                            <div v-if="itemcurrencyProvider.itemCurrencyList.data == null">
                                                <ps-label class='p-2 flex' @click="loadCurrency">  {{ $t("item_entry__loading") }} </ps-label >
                                            </div>
                                            <div v-else>
                                                <div v-for="itemcurrency in itemcurrencyProvider.itemCurrencyList.data" :key="itemcurrency.id" 
                                                class="w-56 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  
                                                @click="currencyFilterClicked(itemcurrency)" >
                                                    <ps-label class="ms-2" :class="itemcurrency.id==paramHolder1.itemCurrencyId ? ' font-bold' : ''"  > {{itemcurrency.currencySymbol}} </ps-label>
                                                </div>
                                            </div>
                                        </div>                                
                                    </div>
                                </template>
                                <template #loadmore>
                                        
                                    <div class="mb-2 w-56">

                                        <div  v-if="itemcurrencyProvider.itemCurrencyList.data != null
                                            && itemcurrencyProvider.loading.value == true" class='mt-4 ms-4 flex'>
                                            <ps-label-caption >  {{ $t("item_entry__loading") }} </ps-label-caption>
                                        </div>

                                        <ps-label class="flex mt-4 ms-4 mb-2 underline font-bold cursor-pointer"  :class="itemcurrencyProvider.isNoMoreRecord ? 'hidden' : ''" @click="loadCurrency" >  {{ $t("item_entry__load_more") }} </ps-label>
                                    </div>
                                    
                                </template>
                            </ps-dropdown>
                            <ps-label class="text-xs mt-1  w-full" textColor="text-primary-500 dark:text-primaryDark-accent " v-if="validation.itemCurrencyStatus"> {{ $t("item_entry__currency_symbol_required_error") }} </ps-label>
                        </div>
                    </div>
                    <!-- end currency symbol -->

                    <!-- for price -->
                    <div v-if="showInput.priceStatus && manageInput.includes('priceStatus')" class='w-36'>
                        <div >
                            <ps-label class=" w-full font-medium text-xs lg:text-xs  ">{{ $t("item_entry__price") }}   </ps-label>
                            <ps-input class="mt-1  w-full" type="text" v-bind:placeholder="$t('item_entry__price')" v-model:value="paramHolder1.price" @keyup.enter="showNext('priceStatus')" @keypress="validatePrice"></ps-input>
                            <ps-label class="text-xs mt-1  w-full" textColor="text-primary-500 dark:text-primaryDark-accent " v-if="validation.priceStatus"> {{ $t("item_entry__price_required_error") }} </ps-label>
                        </div>
                    </div>
                    <!-- end price -->
                   
                </div>

                 <!-- for discount rate -->
                 <div v-if="showInput.discountStatus && manageInput.includes('discountStatus')">
                    <ps-label class="lg:mt-8 mt-6  font-medium text-xs lg:text-xs  ">{{ $t("item_entry__discount_rate") }} </ps-label>
                    <ps-input class=" mt-1  w-full" type="text" v-bind:placeholder="$t('item_entry__discount_rate')" v-model:value="paramHolder1.discountRate" @keyup.enter="showNext('discountStatus')"></ps-input>
                    <!-- <ps-label class="text-xs mt-1  w-full" textColor="text-primary-500 dark:text-primaryDark-accent " v-if="validation.discountStatus"> {{ $t("item_entry__price_required_error") }} </ps-label> -->
                </div>
                <!-- end discount rate -->

                <!-- for item condition -->
                <div v-if="showInput.conditionOfItemStatus && manageInput.includes('conditionOfItemStatus')">
                    <ps-label class="lg:mt-8 mt-6  font-medium text-xs lg:text-xs  "> {{ $t("item_entry__item_condition") }}  </ps-label>
                    <ps-dropdown align="left" class='mt-1  w-full' @onClick="loadCondition" >
                        <template #select>
                            <ps-dropdown-select :showCenter="true"  :selectedValue="paramHolder1.conditionOfItemName" />
                        </template>
                        <template #list >
                            <div class="rounded-md shadow-xs w-56 " >
                                <div class="pt-2 z-30 ">
                                    <div v-if="itemConditionProvider.conditionList.data == null">
                                        <ps-label class='p-2 flex' @click="loadCondition"> {{ $t("item_entry__loading") }} </ps-label >
                                    </div>
                                    <div v-else>
                                        <div v-for="itemcondition in itemConditionProvider.conditionList.data" :key="itemcondition.id" 
                                        class="w-56 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  
                                        @click="conditionFilterClicked(itemcondition)" >
                                            <ps-label class="ms-2" :class="itemcondition.id==paramHolder1.conditionOfItemId ? ' font-bold' : ''"  > {{itemcondition.name}} </ps-label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <template #loadmore>
                                
                            <div class="mb-2 w-56">

                                <div  v-if="itemConditionProvider.conditionList.data != null
                                    && itemConditionProvider.loading.value == true" class='mt-4 ms-4 flex'>
                                    <ps-label-caption > {{ $t("item_entry__loading") }} </ps-label-caption>
                                </div>

                                <ps-label class="flex mt-4 ms-4 mb-2 underline font-bold cursor-pointer" :class="itemConditionProvider.isNoMoreRecord ? 'hidden' : ''"  @click="loadCondition" >{{ $t("item_entry__load_more") }} </ps-label>
                            </div>
                            
                        </template>
                    </ps-dropdown>
                    <ps-label class="text-xs mt-1  w-full" textColor="text-primary-500 dark:text-primaryDark-accent " v-if="validation.conditionOfItemStatus"> {{ $t("item_entry__item_condition_required_error") }} </ps-label>
                </div>
                <!-- end item condition -->

                <div class="flex flex-row justify-between lg:mt-8 mt-6" >
                    <!-- for mileage -->
                    <div v-if="showInput.mileageStatus && manageInput.includes('mileageStatus')" class='w-36'>
                        <div >
                            <ps-label class="  font-medium text-xs lg:text-xs  ">{{ $t("item_entry__mileage") }}   </ps-label>
                            <ps-input class="mt-1  w-full" type="text" v-bind:placeholder="$t('item_entry__mileage')" v-model:value="paramHolder1.mileage"  @keyup.enter="showNext('mileageStatus')" @keypress="validateMileage"></ps-input>
                            <ps-label class="text-xs mt-1  w-full" textColor="text-primary-500 dark:text-primaryDark-accent " v-if="validation.mileageStatus"> {{ $t("item_entry__mileage_required_error") }} </ps-label>
                        </div>
                    </div>
                    <!-- end mileage -->

                    <!-- for plate number -->
                    <div v-if="showInput.plateNumberStatus && manageInput.includes('plateNumberStatus')">
                         <div class='w-36'>
                            <ps-label class="w-full  font-medium text-xs lg:text-xs  "> {{ $t("item_entry__plate_number") }} </ps-label>
                            <ps-input class="lg:mt-1  w-full" v-bind:placeholder="$t('item_entry__plate_number')" :rows="5" v-model:value="paramHolder1.plateNumber" @keyup.enter="showNext('plateNumberStatus')" @keypress="validatePlateNumber"></ps-input>
                            <ps-label class="text-xs mt-1  w-full" textColor="text-primary-500" v-if="validation.plateNumberStatus"> {{ $t("item_entry__plate_number_required_error") }} </ps-label>
                        </div>
                    </div>
                    <!-- end plate number -->
                
                </div>

                <!-- for highlight information textarea -->
                <div v-if="showInput.highlightIngoStatus && manageInput.includes('highlightIngoStatus')">
                    <ps-label class="lg:mt-8 mt-6  font-medium text-xs lg:text-xs  "> {{ $t("item_entry__highlight_info") }} </ps-label>
                    <ps-textarea class="mt-1  w-full" v-bind:placeholder="$t('item_entry__highlight_info')" :rows="5" v-model:value="paramHolder1.highlightInformation" @keyup.enter="showNext('highlightIngoStatus')" ></ps-textarea>
                </div>    
                <!-- end highlight information -->

                <!-- for description textarea -->
                <div v-if="showInput.descriptionStatus && manageInput.includes('descriptionStatus')">
                    <ps-label class="lg:mt-8 mt-6  font-medium text-xs lg:text-xs  "> {{ $t("item_entry__description") }} </ps-label>
                    <ps-textarea class="mt-1  w-full" type="text" v-bind:placeholder="$t('item_entry__description')" v-model:value="paramHolder1.description" @keyup.enter="showNext('descriptionStatus')"></ps-textarea>
                    <ps-label class="text-xs mt-1  w-full" textColor="text-primary-500 dark:text-primaryDark-accent " v-if="validation.descriptionStatus"> {{ $t("item_entry__description_required_error") }} </ps-label>
                </div>
                <!-- end description -->

                <!-- for location dropdown -->
                <div v-if="showInput.itemLocationStatus && manageInput.includes('itemLocationStatus')">
                    <ps-label class="lg:mt-8 mt-6  font-medium text-xs lg:text-xs "> {{ $t("item_entry__location") }}  </ps-label>
                    <ps-dropdown align="left" class='mt-1  w-full mb-2' @onClick="loadLocation" v-on:keyup.enter="filterKeywordUpate(locationKeyword)" >
                        <template #select>
                            <ps-dropdown-select :showCenter="true"  :selectedValue="paramHolder1.itemLocationName" />
                        </template>
                        <template #filter >
                            <div class="w-56">
                                <ps-input-with-right-icon class="rounded-full flex-1 " v-model:value="locationKeyword" v-bind:placeholder="$t('item_entry__keyword')" >
                                    <template #icon>
                                        <ps-icon name="search" class='cursor-pointer' @click="filterKeywordUpate(locationKeyword)"/>
                                    </template>
                                </ps-input-with-right-icon>
                            </div>
                        </template>
                        <template #list >
                            <div class="rounded-md shadow-xs w-56 " >
                                <div class="pt-2 z-30 ">
                                    <div v-if="itemlocationProvider.loading.value == true" class='mt-4 ms-4 mb-4'>
                                        <ps-label-caption @click="loadLocation"> {{ $t("item_entry__loading") }} </ps-label-caption>
                                    </div>
                                        
                                    <div v-for="selectData in itemlocationProvider.itemLocationList.data" :key="selectData.id" class="w-56 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  @click="locationFilterClicked(selectData)" >
                                        <ps-label class="ms-2" :class="selectData.id== paramHolder1.itemLocationId ? ' font-bold text-primary-700' : ''"  > {{selectData.name}} </ps-label>
                                    </div>
                                </div>
                                
                            </div>
                        </template>
                        <template #loadmore>
                                
                            <div class="mb-2 w-56">

                                <div  v-if="itemlocationProvider.itemLocationList.data != null
                                    && itemlocationProvider.loading.value == true" class='mt-4 ms-4 flex'>
                                    <ps-label-caption >{{ $t("item_entry__loading") }} </ps-label-caption>
                                </div>

                                <ps-label class="flex mt-4 ms-4 mb-2 underline font-bold cursor-pointer" :class="itemlocationProvider.isNoMoreRecord ? 'hidden' : ''" @click="loadLocation" > {{ $t("item_entry__load_more") }} </ps-label>
                            </div>
                            
                        </template>
                    </ps-dropdown>
                    <ps-label class="text-xs mt-1  w-full" textColor="text-primary-500 dark:text-primaryDark-accent " v-if="validation.itemLocationStatus"> {{ $t("item_entry__location_required_error") }} </ps-label>
                </div>

                <!-- for location Township dropdown -->
                <div v-if="showInput.locationTownshipStatus && manageInput.includes('locationTownshipStatus')">
                    <ps-label class="lg:mt-8 mt-6  font-medium text-xs lg:text-xs "> {{ $t("item_entry__location_township") }}  </ps-label>
                    <ps-dropdown align="left" class='mt-1  w-full' @onClick="loadLocationTownship(paramHolder1.itemLocationId)" >
                        <template #select>
                            <ps-dropdown-select :showCenter="true"  :selectedValue="paramHolder1.locationTownshipName" />
                        </template>
                        <template #filter >
                            <div class="w-56">
                                <ps-input-with-right-icon class="rounded-xl flex-1 " @keyup.enter="filtersubLocationUpdate(sublocationKeyword)" v-model:value="sublocationKeyword" v-bind:placeholder= "$t('item_entry__location_township')" >
                                <template #icon>
                                    <ps-icon textColor="text-secondary-400 dark:text-secondaryDark-grey" name="search" class='cursor-pointer' @click="filtersubLocationUpdate(sublocationKeyword)"/>
                                </template>
                                </ps-input-with-right-icon>            
                            </div>
                        </template>
                        <template #list >
                            <div class="rounded-md shadow-xs w-56" >
                                <div class="pt-2 z-30">
                                    <div v-if="locationTownshipProvider.locationTownshipList.data == null">
                                        <div v-if="paramHolder1.itemLocationId == ''">
                                            <ps-label class='p-2 flex' textColor="text-primary-500"> {{ $t("item_entry__select_location_first") }}</ps-label>
                                        </div>
                                        <div v-else>
                                            <ps-label class='p-2 flex' @click="loadLocationTownship(paramHolder1.itemLocationId)" > {{ $t("item_entry__loading") }} </ps-label >
                                        </div>
                                    </div>
                                    <div v-else>
                                        <div v-for="locationTownship in locationTownshipProvider.locationTownshipList.data" :key="locationTownship.id" 
                                        class="w-56 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  
                                        @click="locationTownshipFilterClicked(locationTownship)" >                                            
                                            <ps-label class="ms-2" :class="locationTownship.id == paramHolder1.locationTownshipId ? ' font-bold' : ''"  > {{locationTownship.townshipName}} </ps-label>                                                                                        
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </template>
                        <template #loadmore>
                                
                            <div class="mb-2 w-56">

                                <div  v-if="locationTownshipProvider.locationTownshipList.data != null
                                    && locationTownshipProvider.loading.value == true" class='mt-4 ms-4 flex'>
                                    <ps-label-caption >  {{ $t("item_entry__loading") }} </ps-label-caption>
                                </div>

                                <ps-label v-if="paramHolder1.itemLocationId != ''" class="flex mt-4 ms-4 mb-2 underline font-bold cursor-pointer" :class="locationTownshipProvider.isNoMoreRecord ? 'hidden' : ''"  @click="loadLocationTownship(paramHolder1.itemLocationId)" >  {{ $t("item_entry__load_more") }} </ps-label>
                            </div>
                            
                        </template>
                    </ps-dropdown>
                    <ps-label class="text-xs mt-1  w-full" textColor="text-primary-500 dark:text-primaryDark-accent " v-if="validation.locationTownshipStatus"> {{ $t("item_entry__location_township_required_error") }} </ps-label>
                </div>
                <!-- end location Township -->

                <!-- for address textarea -->
                 <div v-if="showInput.addressStatus && manageInput.includes('addressStatus')">
                    <ps-label class="lg:mt-8 mt-6  font-medium text-xs lg:text-xs  "> {{ $t("item_entry__address") }} </ps-label>
                    <ps-textarea class="mt-1  w-full" type="text" v-bind:placeholder="$t('item_entry__address')" v-model:value="paramHolder1.address"  @keyup.enter="showNext('addressStatus')"></ps-textarea>
                </div>
                <!-- end address -->

                 <!-- for licence_status -->
                <div v-if="showInput.isLicenceStatus && manageInput.includes('isLicenceStatus')">
                    <ps-label class="w-full font-medium text-xs lg:text-xs lg:mt-8 mt-6 ">{{ $t("item_entry__licence_status") }}   </ps-label>
                      <ps-dropdown align="left" class='mt-1  w-full' >
                        <template #select>
                            <ps-dropdown-select :showCenter="true"  :selectedValue="paramHolder1.isLicenceStatusBool ?  $t('item_entry__yes') :  $t('item_entry__no')" />
                        </template>
                        <template #list >
                            <div class="rounded-md shadow-xs w-56 " >
                                <div class="pt-2 z-30 ">
                                    
                                    <div class="w-56 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  
                                    @click="licenceFilterClicked('1')" >
                                        <ps-label class="ms-2" :class="paramHolder1.isLicenceStatusBool ? ' font-bold' : ''"  > {{ $t("item_entry__yes")  }} </ps-label>
                                    </div>
                                                                            <div class="w-56 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  
                                    @click="licenceFilterClicked('0')" >
                                        <ps-label class="ms-2" :class="!paramHolder1.isLicenceStatusBool ? ' font-bold' : ''"  > {{ $t("item_entry__no")  }}  </ps-label>
                                    </div>
                                    
                                </div>
                            </div>
                        </template>
                    </ps-dropdown>
                    <!-- <ps-checkbox-value  v-bind:title="$t('item_entry__is_licence')" class="font-medium text-xs sm:text-xxs lg:text-sm mt-1  w-full" v-model:value="paramHolder1.isLicenceStatusBool" /> -->
                </div>
                <!-- end licence_status -->
                    
                <div class="flex flex-row justify-between lg:mt-8 mt-6" >
                    <!-- for number_of_owner -->
                    <div v-if="showInput.noOfOwnerStatus && manageInput.includes('noOfOwnerStatus')" class='w-36'>
                        <div >
                            <ps-label class="  font-medium text-xs lg:text-xs  ">{{ $t("item_entry__number_of_owner") }}   </ps-label>
                            <ps-input class="mt-1  w-full" type="text" v-bind:placeholder="$t('item_entry__number_of_owner')" v-model:value="paramHolder1.noOfOwner" @keyup.enter="showNext('noOfOwnerStatus')" @keypress="validateNoOfOwner"></ps-input>
                            <ps-label class="text-xs mt-1  w-full" textColor="text-primary-500 dark:text-primaryDark-accent " v-if="validation.noOfOwnerStatus"> {{ $t("item_entry__number_of_owner_required_error") }} </ps-label>
                        </div>
                    </div>
                    <!-- end number_of_owner -->
                    <!-- for licence_expiration_date -->
                    <div v-if="showInput.licenceExpirationStatus && manageInput.includes('licenceExpirationStatus')">
                        <div class='w-36'>
                            <ps-label class="w-full font-medium text-xs lg:text-xs  ">{{ $t("item_entry__licence_expiration_date") }}   </ps-label>
                            <div class="flex">
                                <ps-date-picker ref="startDate" :pickedDateProps="pickedDate"/>
                            </div> 
                        </div>  
                    </div>
                    <!-- end licence_expiration_date -->
                </div>
                    
                <!-- for isShop -->
                <div v-if="showInput.isShopStatus && manageInput.includes('isShopStatus')">
                    <ps-label class="lg:mt-8 mt-6  font-medium text-xs lg:text-xs  ">{{ $t("item_entry__shop_setting") }}   </ps-label>
                    <div class="mt-1 flex flex-wrap space-x-4" >
                        <ps-radio v-for=" selectData  in isShopSetting" 
                            :key="selectData.id" 
                            :value="selectData" 
                            v-model:selectedValue="isShop"
                            :title="selectData.name" 
                            :onChange = "isShopFilterClicked"
                            class="font-light text-xs lg:text-xs text-secondary-400 dark:text-secondaryDark-grey"></ps-radio>
                        </div>
                    <!-- <ps-checkbox-value  v-bind:title="$t('item_entry__is_shop')" class="font-medium text-xs sm:text-xxs lg:text-sm mt-1  w-full" v-model:value="paramHolder1.businessModeBool" /> -->
                    <!-- <ps-label class="text-xs mt-1  w-full" textColor="text-primary-500 dark:text-primaryDark-accent " v-if="validation.isShopStatus"> {{ $t("item_entry__is_shop_required_error") }} </ps-label> -->
                </div>
                <!-- end isShop -->

                <div v-if="showInput.mapStatus && manageInput.includes('mapStatus')">
                    <div class="flex flex-col justify-start lg:mt-8 mt-6  font-medium text-xs lg:text-xs">
                        <ps-label class="  font-medium text-xs lg:text-xs  "> {{ $t("item_entry__pick_location") }} </ps-label>
                        <div class="mt-1 p-4 pt-2 rounded-md bg-primary-000 dark:bg-primaryDark-black">
                            <ps-label-caption-2 class="mb-2" > {{ $t("item_entry__map_caption") }} </ps-label-caption-2>
                            <map-with-pin-picker v-if="appInfoProvider?.appInfo?.data?.frontendConfigSetting?.googleMap == '1'" :lat="parseFloat(paramHolder1.latitude + '')" :lng="parseFloat(paramHolder1.longitude + '')" class="h-68" :onChange="updateCoordinates" />
                            <open-street-map v-if="appInfoProvider?.appInfo?.data?.frontendConfigSetting?.openStreetMap == '1'" :lat="parseFloat(paramHolder1.latitude + '')" :lng="parseFloat(paramHolder1.longitude + '')" class="h-68" :onChange="updateLeafletCoordinates" />
                        </div>
                    </div>
                </div>
                    <!-- end location -->



            </div>
            <div class="w-76 lg:mt-8 mt-6 mx-auto flex flex-row justify-between">
                <ps-button class="shadow-buttonShadow hover:shadow-none w-32" textSize="lg:text-sm sm:text-xs text-xs " @click="prevClick2"> {{ $t("item_entry__previous") }} </ps-button>
                <ps-button class="shadow-buttonShadow hover:shadow-none w-32" :theme="showInput.nextStatus ? 'bg-primary-500 dark:bg-primaryDark-accent text-textLight ' : 'bg-secondary-300 text-textLight '" textSize="lg:text-sm sm:text-xs text-xs " @click="nextClick2"> {{ $t("item_entry__next") }} </ps-button>
            </div>
        </div>
        <div class="mt-76 mb-20 min-h-36" v-if="showCell == 3">

            <div class="w-76 mx-auto flex flex-col ">
                <!-- for manufacturer dropdown -->
                <div v-if="showInput.manufacturerStatus && manageInput.includes('manufacturerStatus')">
                    <ps-label class="lg:mt-8 mt-6  font-medium text-xs lg:text-xs  "> {{ $t("item_entry__manufacturer") }}  </ps-label>
                    <ps-dropdown align="left" class='mt-1  w-full' @onClick="loadManufacturer">
                        <template #select>
                        
                            <ps-dropdown-select :showCenter="true" :selectedValue="paramHolder1.manufacturerName" />
                            
                        </template>
                        <template #list >
                            <div
                                class="rounded-md shadow-xs w-56 " >
                                <div class="pt-2 z-30 ">
                                    <div v-if="manufacturerProvider.itemList.data == null">
                                        <ps-label class='p-2 flex' @click="loadManufacturer">{{ $t("item_entry__loading") }} </ps-label >
                                    </div>
                                    <div v-else>
                                        <div v-for="selectData in manufacturerProvider.itemList.data" 
                                        :key="selectData.id" 
                                        class="w-56 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  
                                        @click="manufacturerFilterClicked(selectData)" >
                                            
                                            <ps-label class="ms-2" :class="selectData.id == paramHolder1.manufacturerId ? ' font-bold' : ''"  > {{selectData.name}} </ps-label>
                                            
                                        </div>
                                    </div>
                                </div>                                
                            </div>
                        </template>
                        <template #loadmore>
                                
                            <div class="mb-2 w-56">

                                <div  v-if="manufacturerProvider.itemList.data != null
                                    && manufacturerProvider.loading.value == true" class='mt-4 ms-4 flex'>
                                    <ps-label-caption > {{ $t("item_entry__loading") }}</ps-label-caption>
                                </div>

                                <ps-label class="flex mt-4 ms-4 mb-2 underline font-bold cursor-pointer" :class="manufacturerProvider.isNoMoreRecord ? 'hidden' : ''"  @click="loadManufacturer" > {{ $t("item_entry__load_more") }} </ps-label>
                            </div>
                            
                        </template>
                    </ps-dropdown>
                    <ps-label class="text-xs mt-1  w-full" textColor="text-primary-500 dark:text-primaryDark-accent " v-if="validation.manufacturerStatus"> {{ $t("item_entry__manufacturer_required_error") }} </ps-label>
                </div>    
                <!-- end manufacturer -->

                <!-- for Model dropdown -->
                <div v-if="showInput.modelStatus && manageInput.includes('modelStatus')">
                    <ps-label class="lg:mt-8 mt-6  font-medium text-xs lg:text-xs  "> {{ $t("item_entry__model") }}  </ps-label>
                    <ps-dropdown align="left" class='mt-1  w-full' @onClick="loadModel(paramHolder1.manufacturerId)" >
                        <template #select>
                            <ps-dropdown-select :showCenter="true"  :selectedValue="paramHolder1.modelName" />
                        </template>
                         <template #filter >
                            <div class="w-56">
                                <ps-input-with-right-icon class="rounded-xl flex-1 " @keyup.enter="filterModelUpdate(modelKeyword)" v-model:value="modelKeyword" v-bind:placeholder= "$t('item_entry__model')" >
                                <template #icon>
                                    <ps-icon textColor="text-secondary-400 dark:text-secondaryDark-grey" name="search" class='cursor-pointer' @click="filterModelUpdate(modelKeyword)"/>
                                </template>
                                </ps-input-with-right-icon>            
                            </div>
                        </template>
                        <template #list >
                            <div class="rounded-md shadow-xs w-56" >
                                <div class="pt-2 z-30">
                                    <div v-if="modelProvider.modelList.data == null">
                                        <div v-if="paramHolder1.manufacturerId == ''">
                                            <ps-label class='p-2 flex' textColor="text-primary-500"> {{ $t("item_entry__select_manufacturer_first") }}</ps-label>
                                        </div>
                                        <div v-else>
                                            <ps-label class='p-2 flex' @click="loadModel(paramHolder1.manufacturerId)" > {{ $t("item_entry__loading") }} </ps-label >
                                        </div>
                                    </div>
                                    <div v-else>
                                        <div v-for="selectSubmanufacturer in modelProvider.modelList.data" :key="selectSubmanufacturer.id" 
                                        class="w-56 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  
                                        @click="modelFilterClicked(selectSubmanufacturer)" >                                            
                                            <ps-label class="ms-2" :class="selectSubmanufacturer.id == paramHolder1.modelId ? ' font-bold' : ''"  > {{selectSubmanufacturer.name}} </ps-label>                                                                                        
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </template>
                        <template #loadmore>
                                
                            <div class="mb-2 w-56">

                                <div  v-if="modelProvider.modelList.data != null
                                    && modelProvider.loading.value == true" class='mt-4 ms-4 flex'>
                                    <ps-label-caption >  {{ $t("item_entry__loading") }} </ps-label-caption>
                                </div>

                                <ps-label v-if="paramHolder1.manufacturerId != ''" class="flex mt-4 ms-4 mb-2 underline font-bold cursor-pointer" :class="modelProvider.isNoMoreRecord ? 'hidden' : ''"  @click="loadModel(paramHolder1.manufacturerId)" >  {{ $t("item_entry__load_more") }} </ps-label>
                            </div>
                            
                        </template>
                    </ps-dropdown>
                    <ps-label class="text-xs mt-1  w-full" textColor="text-primary-500 dark:text-primaryDark-accent " v-if="validation.modelStatus"> {{ $t("item_entry__model_required_error") }} </ps-label>
                </div>
                <!-- end model -->

                <!-- for build type dropdown-->
                <div v-if="showInput.buildTypeStatus && manageInput.includes('buildTypeStatus')">
                    <ps-label class="lg:mt-8 mt-6  font-medium text-xs lg:text-xs  "> {{ $t("item_entry__buildtype") }}  </ps-label>
                    <ps-dropdown align="left" class='mt-1  w-full' @onClick="loadBuildType" >
                        <template #select>
                        
                            <ps-dropdown-select :showCenter="true"  :selectedValue="paramHolder1.buildTypeName" />
                            
                        </template>
                        <template #list >
                            <div
                                class="rounded-md shadow-xs w-56 " >
                                <div class="pt-2 z-30 ">
                                    <div v-if="buildTypeProvider.buildTypeList.data == null">
                                        <ps-label class='p-2 flex' @click="loadBuildType">{{ $t("item_entry__loading") }} </ps-label >
                                    </div>
                                    <div v-else>
                                        <div v-for="selectData in buildTypeProvider.buildTypeList.data" 
                                        :key="selectData.id" 
                                        class="w-56 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  
                                        @click="buildTypeFilterClicked(selectData)" >
                                            
                                            <ps-label class="ms-2" :class="selectData.id == paramHolder1.id ? ' font-bold' : ''"  > {{selectData.name}} </ps-label>
                                            
                                        </div>
                                    </div>
                                </div>                                
                            </div>
                        </template>
                        <template #loadmore>
                                
                            <div class="mb-2 w-56">

                                <div  v-if="buildTypeProvider.buildTypeList.data != null
                                    && buildTypeProvider.loading.value == true" class='mt-4 ms-4 flex'>
                                    <ps-label-caption > {{ $t("item_entry__loading") }}</ps-label-caption>
                                </div>

                                <ps-label class="flex mt-4 ms-4 mb-2 underline font-bold cursor-pointer" :class="buildTypeProvider.isNoMoreRecord ? 'hidden' : ''"  @click="loadBuildType" > {{ $t("item_entry__load_more") }} </ps-label>
                            </div>
                            
                        </template>
                    </ps-dropdown>
                    <ps-label class="text-xs mt-1  w-full" textColor="text-primary-500 dark:text-primaryDark-accent " v-if="validation.buildTypeStatus"> {{ $t("item_entry__build_type_required_error") }} </ps-label>
                </div>
                <!-- end build type dropdown-->

                <!-- for year -->
                <div v-if="showInput.yearStatus && manageInput.includes('yearStatus')">
                    <ps-label class="lg:mt-8 mt-6  font-medium text-xs lg:text-xs  ">{{ $t("item_entry__year") }}   </ps-label>
                    <ps-input class="mt-1  w-full" type="text" v-bind:placeholder="$t('item_entry__year')" v-model:value="paramHolder1.year" @keyup.enter="showNext('yearStatus')" @keypress="validateYear"></ps-input>
                    <ps-label class="text-xs mt-1  w-full" textColor="text-primary-500 dark:text-primaryDark-accent " v-if="validation.yearStatus"> {{ $t("item_entry__year_required_error") }} </ps-label>
                </div>
                <!-- end year -->

                <!-- for engine power -->
                <div v-if="showInput.enginePowerStatus && manageInput.includes('enginePowerStatus')">
                    <ps-label class="lg:mt-8 mt-6  font-medium text-xs lg:text-xs  "> {{ $t("item_entry__engine_power") }} </ps-label>
                    <ps-input class="mt-1  w-full" v-bind:placeholder="$t('item_entry__engine_power')" :rows="5" v-model:value="paramHolder1.enginePower" @keyup.enter="showNext('enginePowerStatus')" @keypress="validateEnginePower"></ps-input>
                    <ps-label class="text-xs mt-1  w-full" textColor="text-primary-500 dark:text-primaryDark-accent " v-if="validation.enginePowerStatus"> {{ $t("item_entry__engine_power_required_error") }} </ps-label>
                </div>
                <!-- end ngine power -->

                <!-- for transmission dropdown-->
                <div v-if="showInput.transmissionStatus && manageInput.includes('transmissionStatus')">
                    <ps-label class="lg:mt-8 mt-6  font-medium text-xs lg:text-xs  "> {{ $t("item_entry__transmission") }}  </ps-label>
                    <ps-dropdown align="left" class='mt-1  w-full' @onClick="loadTransmission" >
                        <template #select>
                        
                            <ps-dropdown-select :showCenter="true"  :selectedValue="paramHolder1.transmissionName" />
                            
                        </template>
                        <template #list >
                            <div
                                class="rounded-md shadow-xs w-56 " >
                                <div class="pt-2 z-30 ">
                                    <div v-if="transmissionProvider.transmissionList.data == null">
                                        <ps-label class='p-2 flex' @click="loadTransmission">{{ $t("item_entry__loading") }} </ps-label >
                                    </div>
                                    <div v-else>
                                        <div v-for="selectData in transmissionProvider.transmissionList.data" 
                                        :key="selectData.id" 
                                        class="w-56 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  
                                        @click="transmissionFilterClicked(selectData)" >
                                            
                                            <ps-label class="ms-2" :class="selectData.id == paramHolder1.id ? ' font-bold' : ''"  > {{selectData.name}} </ps-label>
                                            
                                        </div>
                                    </div>
                                </div>                                
                            </div>
                        </template>
                        <template #loadmore>
                                
                            <div class="mb-2 w-56">

                                <div  v-if="transmissionProvider.transmissionList.data != null
                                    && transmissionProvider.loading.value == true" class='mt-4 ms-4 flex'>
                                    <ps-label-caption > {{ $t("item_entry__loading") }}</ps-label-caption>
                                </div>

                                <ps-label class="flex mt-4 ms-4 mb-2 underline font-bold cursor-pointer" :class="transmissionProvider.isNoMoreRecord ? 'hidden' : ''"  @click="loadTransmission" > {{ $t("item_entry__load_more") }} </ps-label>
                            </div>
                            
                        </template>
                    </ps-dropdown>
                    <ps-label class="text-xs mt-1  w-full" textColor="text-primary-500 dark:text-primaryDark-accent " v-if="validation.transmissionStatus"> {{ $t("item_entry__transmission_required_error") }} </ps-label>
                </div>
                <!-- end transmission dropdown-->

                <!-- for fuel dropdown-->
                <div v-if="showInput.fuelTypeStatus && manageInput.includes('fuelTypeStatus')">
                    <ps-label class="lg:mt-8 mt-6  font-medium text-xs lg:text-xs  "> {{ $t("item_entry__fueltype") }}  </ps-label>
                    <ps-dropdown align="left" class='mt-1  w-full' @onClick="loadFuelType" >
                        <template #select>
                        
                            <ps-dropdown-select :showCenter="true"  :selectedValue="paramHolder1.fuelTypeName" />
                            
                        </template>
                        <template #list >
                            <div
                                class="rounded-md shadow-xs w-56 " >
                                <div class="pt-2 z-30 ">
                                    <div v-if="fuelTypeProvider.fuelTypeList.data == null">
                                        <ps-label class='p-2 flex' @click="loadFuelType">{{ $t("item_entry__loading") }} </ps-label >
                                    </div>
                                    <div v-else>
                                        <div v-for="selectData in fuelTypeProvider.fuelTypeList.data" 
                                        :key="selectData.id" 
                                        class="w-56 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  
                                        @click="fuelTypeFilterClicked(selectData)" >
                                            
                                            <ps-label class="ms-2" :class="selectData.id == paramHolder1.id ? ' font-bold' : ''"  > {{selectData.name}} </ps-label>
                                            
                                        </div>
                                    </div>
                                </div>                                
                            </div>
                        </template>
                        <template #loadmore>
                                
                            <div class="mb-2 w-56">

                                <div  v-if="fuelTypeProvider.fuelTypeList.data != null
                                    && fuelTypeProvider.loading.value == true" class='mt-4 ms-4 flex'>
                                    <ps-label-caption > {{ $t("item_entry__loading") }}</ps-label-caption>
                                </div>

                                <ps-label class="flex mt-4 ms-4 mb-2 underline font-bold cursor-pointer"  :class="fuelTypeProvider.isNoMoreRecord ? 'hidden' : ''" @click="loadFuelType" > {{ $t("item_entry__load_more") }} </ps-label>
                            </div>
                            
                        </template>
                    </ps-dropdown>
                    <ps-label class="text-xs mt-1  w-full" textColor="text-primary-500 dark:text-primaryDark-accent " v-if="validation.fuelTypeStatus"> {{ $t("item_entry__fuel_type_required_error") }} </ps-label>
                </div>
                <!-- end fuel dropdown-->

                <!-- for steering_position -->
                <div v-if="showInput.steeringPositionStatus && manageInput.includes('steeringPositionStatus')">
                    <ps-label class="lg:mt-8 mt-6  font-medium text-xs lg:text-xs  ">{{ $t("item_entry__steering_position") }}   </ps-label>
                    <ps-input class="mt-1  w-full" type="text" v-bind:placeholder="$t('item_entry__steering_position')" v-model:value="paramHolder1.steeringPosition" @keyup.enter="showNext('steeringPositionStatus')" @keypress="validateSteeringPosition"></ps-input>
                    <ps-label class="text-xs mt-1  w-full" textColor="text-primary-500 dark:text-primaryDark-accent " v-if="validation.steeringPositionStatus"> {{ $t("item_entry__steering_position_required_error") }} </ps-label>
                </div>
                <!-- end steering_position -->

                <!-- for color dropdown-->
                <div v-if="showInput.colorStatus && manageInput.includes('colorStatus')">
                    <ps-label class="lg:mt-8 mt-6  font-medium text-xs lg:text-xs  "> {{ $t("item_entry__color") }}  </ps-label>
                    <ps-dropdown align="left" class='mt-1  w-full' @onClick="loadColor" >
                        <template #select>
                        
                            <ps-dropdown-select :showCenter="true"  :selectedValue="paramHolder1.colorValue" />
                            
                        </template>
                        <template #list >
                            <div
                                class="rounded-md shadow-xs w-56 " >
                                <div class="pt-2 z-30 ">
                                    <div v-if="colorProvider.itemColorList.data == null">
                                        <ps-label class='p-2 flex' @click="loadColor">{{ $t("item_entry__loading") }} </ps-label >
                                    </div>
                                    <div v-else>
                                        <div v-for="selectData in colorProvider.itemColorList.data" 
                                        :key="selectData.id" 
                                        class="w-56 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  
                                        @click="colorFilterClicked(selectData)" >
                                            
                                            <ps-label class="ms-2" :class="selectData.id == paramHolder1.id ? ' font-bold' : ''"  > {{selectData.colorValue}} </ps-label>
                                            
                                        </div>
                                    </div>
                                </div>                                
                            </div>
                        </template>
                        <template #loadmore>
                                
                            <div class="mb-2 w-56">

                                <div  v-if="colorProvider.itemColorList.data != null
                                    && colorProvider.loading.value == true" class='mt-4 ms-4 flex'>
                                    <ps-label-caption > {{ $t("item_entry__loading") }}</ps-label-caption>
                                </div>

                                <ps-label class="flex mt-4 ms-4 mb-2 underline font-bold cursor-pointer"  :class="colorProvider.isNoMoreRecord ? 'hidden' : ''" @click="loadColor" > {{ $t("item_entry__load_more") }} </ps-label>
                            </div>
                            
                        </template>
                    </ps-dropdown>
                    <ps-label class="text-xs mt-1  w-full" textColor="text-primary-500 dark:text-primaryDark-accent " v-if="validation.colorStatus"> {{ $t("item_entry__color_required_error") }} </ps-label>
                </div>
                <!-- end color dropdown-->

                <!-- for trim_name -->
                <div v-if="showInput.trimNameStatus && manageInput.includes('trimNameStatus')">
                    <ps-label class="lg:mt-8 mt-6  font-medium text-xs lg:text-xs  ">{{ $t("item_entry__trim_name") }}   </ps-label>
                    <ps-input class="mt-1  w-full" type="text" v-bind:placeholder="$t('item_entry__trim_name')" v-model:value="paramHolder1.trimName"  @keyup.enter="showNext('trimNameStatus')" @keypress="validateTrim"></ps-input>
                    <ps-label class="text-xs mt-1  w-full" textColor="text-primary-500 dark:text-primaryDark-accent " v-if="validation.trimNameStatus"> {{ $t("item_entry__trim_name_required_error") }} </ps-label>
                </div>
                <!-- end trim_name -->

                <!-- for vehicle_id -->
                <div v-if="showInput.vehicleIdStatus && manageInput.includes('vehicleIdStatus')">
                    <ps-label class="lg:mt-8 mt-6  font-medium text-xs lg:text-xs  ">{{ $t("item_entry__vehicle_id") }}   </ps-label>
                    <ps-input class="mt-1  w-full" type="text" v-bind:placeholder="$t('item_entry__vehicle_id')" v-model:value="paramHolder1.vehicleId"  @keyup.enter="showNext('vehicleIdStatus')" @keypress="validateVehicleId"></ps-input>
                    <ps-label class="text-xs mt-1  w-full" textColor="text-primary-500 dark:text-primaryDark-accent " v-if="validation.vehicleIdStatus"> {{ $t("item_entry__vehicle_id_required_error") }} </ps-label>
                </div>
                <!-- end vehicle_id -->

                <!-- for no_of_doors -->
                <div v-if="showInput.noOfDoorsStatus && manageInput.includes('noOfDoorsStatus')">
                    <ps-label class="lg:mt-8 mt-6  font-medium text-xs lg:text-xs  ">{{ $t("item_entry__no_of_doors") }}   </ps-label>
                    <ps-input class="mt-1  w-full" type="text" v-bind:placeholder="$t('item_entry__no_of_doors')" v-model:value="paramHolder1.noOfDoors"  @keyup.enter="showNext('noOfDoorsStatus')" @keypress="validateNoOfDoor"></ps-input>
                    <ps-label class="text-xs mt-1  w-full" textColor="text-primary-500 dark:text-primaryDark-accent " v-if="validation.noOfDoorsStatus"> {{ $t("item_entry__no_of_doors_required_error") }} </ps-label>
                </div>
                <!-- end no_of_doors -->

                <!-- for max_passengers -->
                <div v-if="showInput.maxPassengersStatus && manageInput.includes('maxPassengersStatus')">
                    <ps-label class="lg:mt-8 mt-6  font-medium text-xs lg:text-xs  ">{{ $t("item_entry__max_passengers") }}   </ps-label>
                    <ps-input class="lg:mt-1  w-full" type="text" v-bind:placeholder="$t('item_entry__max_passengers')" v-model:value="paramHolder1.maxPassengers" @keyup.enter="showNext('maxPassengersStatus')" @keypress="validateMaxPassenger"></ps-input>
                    <ps-label class="text-xs mt-1  w-full" textColor="text-primary-500" v-if="validation.maxPassengersStatus"> {{ $t("item_entry__max_passengers_required_error") }} </ps-label>
                </div>
                <!-- end max_passengers -->



            </div>
            <div class="w-76 lg:mt-8 mt-6 mx-auto flex flex-row justify-between">
                <ps-button class="shadow-buttonShadow hover:shadow-none w-32" textSize="lg:text-sm sm:text-xs text-xs " @click="prevClick3"> {{ $t("item_entry__previous") }} </ps-button>
                <ps-button class="shadow-buttonShadow hover:shadow-none w-32" :theme="showInput.createStatus ? 'bg-primary-500 dark:bg-primaryDark-accent text-textLight ' : 'bg-secondary-300 text-textLight '" textSize="lg:text-sm sm:text-xs text-xs " @click="submitClicked"> {{ itemId == '0' ? $t("item_entry__submit") : $t("item_entry__update")  }} </ps-button>
            </div>
        </div>
        <div class=" bg-background dark:bg-backgroundDark w-full pt-4 pb-2 lg:pt-8" :class="atTopOfPage ? 'fixed top-24 ' : 'fixed top-12 '" >
            <div class="w-mobile sm:w-median lg:w-large mx-auto">    
                <div class="flex items-center "> 
                    <ps-route-link
                        :to="{name: 'dashboard'}"> 
                        <ps-label textColor="text-secondary-400 dark:text-secondaryDark-grey "
                            class="hover:underline cursor-pointer font-medium text-xxs"> 
                                    {{ $t("list__home") }}
                        </ps-label>      
                    </ps-route-link>

                    <ps-icon name="rightArrow" class='text-secondary-400 dark:text-secondaryDark-grey  mx-2'/>
                    <ps-label v-if="itemId == '0'" textColor="text-secondary-400 dark:text-secondaryDark-grey " class="font-medium text-xxs">  {{ $t("item_entry__listing_entry") }} </ps-label>
                    <ps-label v-else textColor="text-secondary-400 dark:text-secondaryDark-grey " class="font-medium text-xxs">  {{ $t("item_entry__update_entry") }} </ps-label>

                </div>
                
                <!-- Item entry title -->
                <div class="flex justify-center">
                    <ps-label v-if="itemId == '0' " textColor="text-secondary-600 dark:text-secondaryDark-white" class="flex-grow-0 font-medium text-2xl lg:text-3xl">{{ $t("item_entry__sell_car") }} </ps-label>
                    <ps-label v-else textColor="text-secondary-600 dark:text-secondaryDark-white" class="flex-grow-0 font-medium text-2xl lg:text-3xl">{{ $t("item_entry__update_car") }} </ps-label>
                </div>
                <!-- End Item entry title -->

                <div class="grid grid-cols-3 my-4">
                    <div class="flex flex-col justify-cener">
                        <ps-label class="text-sm py-2 px-3.5 rounded-full flex-shink-0 mx-auto" textColor="text-white" :class="showCell == 1 ? 'bg-primary-500 dark:bg-primaryDark-accent' : 'bg-secondary-300 '" > 1 </ps-label>
                        <ps-label class="lg:text-sm sm:text-xs text-xxs flex-shink-0 mx-auto mt-1" :textColor="showCell == 1 ? 'text-secondary-500 dark:text-secondaryDark-white' : 'text-secondary-400 dark:text-secondaryDark-grey '" > {{ $t("item_entry__upload_image") }} </ps-label>
                    </div>
                    <div class="flex flex-col justify-cener">
                        <ps-label class="text-sm py-2 px-3.5 rounded-full flex-shink-0 mx-auto" textColor="text-white" :class="showCell == 2 ? 'bg-primary-500 dark:bg-primaryDark-accent' : 'bg-secondary-300 '" > 2 </ps-label>
                        <ps-label class="lg:text-sm sm:text-xs text-xxs flex-shink-0 mx-auto mt-1" :textColor="showCell == 2 ? 'text-secondary-500 dark:text-secondaryDark-white' : 'text-secondary-400 dark:text-secondaryDark-grey '" > {{ $t("item_entry__fill_information") }} </ps-label>
                    </div>
                    <div class="flex flex-col justify-cener">
                        <ps-label class="text-sm py-2 px-3.5 rounded-full flex-shink-0 mx-auto" textColor="text-white" :class="showCell == 3 ? 'bg-primary-500 dark:bg-primaryDark-accent' : 'bg-secondary-300 '" > 3 </ps-label>
                        <ps-label class="lg:text-sm sm:text-xs text-xxs flex-shink-0 mx-auto mt-1" :textColor="showCell == 3 ? 'text-secondary-500 dark:text-secondaryDark-white' : 'text-secondary-400 dark:text-secondaryDark-grey '" > {{ $t("item_entry__fill_specification") }} </ps-label>
                    </div>
                </div>
            </div>
        
        </div>
    
        <ps-confirm-dialog ref="ps_confirm_dialog" />

        <ps-loading-dialog ref="ps_loading_dialog" />

        <ps-error-dialog ref="ps_error_dialog" />

        <ps-warning-dialog ref="ps_warning_dialog" />
        <limit-item-modal ref="limit_item_modal" />
    </div>

</template>

<script lang="ts">
// Vue
import {reactive, ref, onMounted,onUnmounted, defineAsyncComponent} from 'vue';
import router from '@/router';
import { useRoute } from 'vue-router';
import LimitItemModal from '@/components/modules/item/LimitItemModal.vue';
import PsLabel from '@/components/core/label/PsLabel.vue'
import PsButton from '@/components/core/buttons/PsButton.vue';
import PsLabelCaption from '@/components/core/label/PsLabelCaption.vue';
import PsLabelCaption2 from '@/components/core/label/PsLabelCaption2.vue';
import PsInput from '@/components/core/input/PsInput.vue';
import PsInputWithRightIcon from '@/components/core/input/PsInputWithRightIcon.vue';
import PsIcon from '@/components/core/icons/PsIcon.vue';
import PsDropdown from '@/components/core/dropdown/PsDropdown.vue';
import PsDropdownSelect from '@/components/core/dropdown/PsDropdownSelect.vue';
import PsTextarea from '@/components/core/textarea/PsTextarea.vue';
import PsLoadingDialog from '@/components/core/dialog/PsLoadingDialog.vue';
import PsErrorDialog from '@/components/core/dialog/PsErrorDialog.vue';
import PsConfirmDialog from '@/components/core/dialog/PsConfirmDialog.vue';
import PsWarningDialog from '@/components/core/dialog/PsWarningDialog.vue';
// import PsCheckboxValue from '@/components/core/checkbox/PsCheckboxValue.vue';
import PsRadio from '@/components/core/radio/PsRadio.vue';
import PsRouteLink from '@/components/core/link/PsRouteLink.vue';
// import PsTimePicker from '@/components/core/picker/PsTimePicker.vue';
import PsDatePicker from '@/components/core/picker/PsDatePicker.vue';
import DraggableContainer from '@/components/core/draggable/DraggableContainer.vue';

// Models
import { createManufacturerProviderState } from '@/store/modules/manufacturer/ManufacturerProvider';
import { createModelProviderState } from '@/store/modules/model/ModelProvider';
import { createItemCurrencyProviderState } from '@/store/modules/item/ItemCurrencyProvider';
import { createItemTypeProviderState } from '@/store/modules/itemType/ItemTypeProvider';
import { createItemLocationProviderState } from '@/store/modules/itemlocation/ItemLocationProvider';
import { createItemLocationTownshipProviderState } from '@/store/modules/itemLocationTownship/ItemLocationTownshipProvider';
import { createItemPriceTypeProviderState } from '@/store/modules/itemPriceType/ItemPriceTypeProvider';
import { createProductProviderState } from '@/store/modules/item/ProductProvider';
import { createItemConditionProviderState } from '@/store/modules/item/ItemConditionProvider';
import { createGalleryProviderState } from '@/store/modules/gallery/GalleryProvider';
import { useUserProviderState } from '@/store/modules/user/UserProvider';

import { createTransmissionProviderState } from '@/store/modules/transmission/TransmissionProvider';
import { createFuelTypeProviderState } from '@/store/modules/fuelType/FuelTypeProvider';
import { createBuildTypeProviderState } from '@/store/modules/buildType/BuildTypeProvider';
import { createSellerTypeProviderState } from '@/store/modules/sellerType/SellerTypeProvider';
import { createItemColorProviderState } from '@/store/modules/itemcolor/ItemColorProvider';
import { usePsAppInfoProviderState } from '@/store/modules/appinfo/AppInfoProvider';

// Params Holders
import ItemEntryParameterHolder from '@/object/holder/ItemEntryParameterHolder';
import ModelListParameterHolder from '@/object/holder/ModelListParameterHolder';
import LocationTownshipParameterHolder from '@/object/holder/LocationTownshipParameterHolder';
import PsConst from '@/object/constant/ps_constants';
import { PsValueProvider } from '@/store/modules/core/PsValueProvider';
import LocationParameterHolder from '@/object/holder/LocationParameterHolder';
import PsStatus from '@/api/common/PsStatus';
import DefaultPhoto from '@/object/DefaultPhoto';
import AppInfoParameterHolder from '@/object/holder/AppInfoParameterHolder';

//language
import { i18n } from '@/assets/locales/index';
import PsUtils from '@/utils/PsUtils';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrashAlt,faImage,faVideo } from '@fortawesome/free-solid-svg-icons';
library.add(faTrashAlt,faImage,faVideo)

const MapWithPinPicker = defineAsyncComponent(() => import('@/components/layouts/map/MapWithPinPicker.vue'));
const OpenStreetMap = defineAsyncComponent(() => import('@/components/layouts/map/OpenStreetMap.vue'))

export default {
    name : "ItemEntryView",
    components : {
        // PsTimePicker,
        PsDatePicker,
        PsButton,
        PsLabelCaption,
        PsLabelCaption2,
        PsLabel,
        PsInput,
        PsDropdown,
        PsDropdownSelect,
        PsTextarea,
        MapWithPinPicker,
        PsLoadingDialog,
        PsErrorDialog,
        PsConfirmDialog,
        PsInputWithRightIcon,
        LimitItemModal,
        PsIcon,
        PsWarningDialog,
        PsRadio,
        PsRouteLink,
        DraggableContainer,
        OpenStreetMap
    },
    setup() {
      
        // Variables Init
        const itemProvider = createProductProviderState();
        const appInfoProvider = usePsAppInfoProviderState();
        const atTopOfPage = ref(true);
        let manageInput = [''];
        const showInput = ref({
            photoStatus : false,
            titleStatus : false,
            itemTypeStatus : false,
            colorStatus : false,
            fuelTypeStatus : false,
            buildTypeStatus : false,
            sellerTypeStatus : false,
            transmissionStatus : false,
            conditionOfItemStatus : false,
            itemPriceTypeStatus : false,
            itemCurrencyStatus : false,
            priceStatus : false,
            discountStatus : false,
            dealOptionStatus : false,
            isShopStatus : false,
            isLicenceStatus : false,
            licenceExpirationStatus : false,
            itemLocationStatus : false,
            locationTownshipStatus : false,
            plateNumberStatus : false,
            enginePowerStatus :  false,
            steeringPositionStatus : false,
            noOfOwnerStatus : false,
            trimNameStatus : false,
            vehicleIdStatus : false,
            priceUnitStatus : false,
            yearStatus : false,
            maxPassengersStatus : false,
            noOfDoorsStatus : false,
            mileageStatus : false,
            addressStatus : false,
            manufacturerStatus : false,
            modelStatus : false,
            highlightIngoStatus : false,
            descriptionStatus : false,
            nextStatus : false,
            createStatus : false,
            mapStatus: false
        });


        const validation = ref({
            titleStatus : false,
            manufacturerStatus : false,
            modelStatus : false,
            itemTypeStatus : false,
            colorStatus : false,
            fuelTypeStatus : false,
            buildTypeStatus : false,
            sellerTypeStatus : false,
            transmissionStatus : false,
            conditionOfItemStatus : false,
            // brandStatus : false,
            itemPriceTypeStatus : false,
            itemCurrencyStatus : false,
            priceStatus : false,
            dealOptionStatus : false,
            isShopStatus : false,
            isLicenceStatus : false,
            itemLocationStatus : false,
            locationTownshipStatus : false,
            plateNumberStatus : false,
            enginePowerStatus :  false,
            steeringPositionStatus : false,
            noOfOwnerStatus : false,
            trimNameStatus : false,
            vehicleIdStatus : false,
            priceUnitStatus : false,
            yearStatus : false,
            maxPassengersStatus : false,
            noOfDoorsStatus : false,
            mileageStatus : false,
            descriptionStatus : false
        });

        const showCell = ref(1);

        let isShop = ref({
            id:"0", 
            name: i18n.global.t('item_entry__no')
        });
        const isShopSetting = [
            {
                id:"1", 
                name: i18n.global.t('item_entry__is_shop')
            },{
                id:"0", 
                name: i18n.global.t('item_entry__no')
            }
        ]
     
        const imageCount = ref(1);
        const image = ref();
        let twoObject = ref(false);
        const video = ref();
        const previewImages = reactive({
            data : [] as any
        });

        const previewVideo = reactive({
            data : [] as any
        });
        let selectedFile = new Array();

        let selectImgIndex = ref(0);

        let selectedFileVideo;
        let selectedFileVideoThumb;

        let imgId = new Array();

        const psValueHolder = PsValueProvider.psValueHolder;
        const loginUserId = psValueHolder.getLoginUserId();
        const ps_warning_dialog = ref();

        if(loginUserId == null || loginUserId == '' || loginUserId == PsConst.NO_LOGIN_USER) {
            router.push({ name : "login"});
        }
        const startDate = ref();
        // const startTimeH = ref('0');
        // const startTimeM = ref('0');
        // const startTimeAmpm = ref('1');
        const pickedDate = ref(new Date());
        const modelHolder = new ModelListParameterHolder();
        const paramHolder1 = ref(new ItemEntryParameterHolder());
        const locationKeyword = ref('');
        const sublocationKeyword = ref('');
        const modelKeyword = ref("");
        const paramHolder = new LocationParameterHolder().getDefaultParameterHolder();
        const subparamHolder = new LocationTownshipParameterHolder();

        paramHolder1.value.latitude =  psValueHolder.locationLat == null || psValueHolder.locationLat == '' ? '0' : psValueHolder.locationLat;
        paramHolder1.value.longitude =  psValueHolder.locationLng == null || psValueHolder.locationLng == '' ? '0' : psValueHolder.locationLng;       
        const route = useRoute();

        // Inject Providers
        const manufacturerProvider = createManufacturerProviderState();
        const modelProvider = createModelProviderState();
        const itemlocationProvider = createItemLocationProviderState();
        const galleryProvider = createGalleryProviderState();
        const itemTypeProvider = createItemTypeProviderState();
        const itemConditionProvider = createItemConditionProviderState();
        const itemPriceTypeProvider = createItemPriceTypeProviderState();
        const locationTownshipProvider = createItemLocationTownshipProviderState();
        const itemcurrencyProvider = createItemCurrencyProviderState();

        const colorProvider = createItemColorProviderState();
        const fuelTypeProvider = createFuelTypeProviderState();
        const buildTypeProvider = createBuildTypeProviderState();
        const sellerTypeProvider = createSellerTypeProviderState();
        const transmissionProvider = createTransmissionProviderState();

        const userProvider = useUserProviderState();
        // Get Route Data
        const itemId = route.query.item_id?.toString() ?? '0';
        const map_with_pin_picker_modal = ref();
        const ps_loading_dialog = ref();
        const ps_error_dialog = ref();
        const ps_confirm_dialog = ref();
        const limit_item_modal = ref();

        const dataReady = ref(false);

        onMounted (async () => {
            window.addEventListener('scroll', handleScroll);
            const appInfoParameterHolder = new AppInfoParameterHolder();
            appInfoParameterHolder.userId = loginUserId;
            await appInfoProvider.loadDeleteHistory(appInfoParameterHolder);
            if(appInfoProvider?.appInfo?.data.psAppSetting?.isPaidApp == PsConst.ONE && userProvider.user?.data?.postCount == PsConst.LIMITED && userProvider.user?.data?.remainingPost == '0') {
                limit_item_modal.value.openModal();
            }
            if( parseInt(appInfoProvider.appInfo.data.psAppSetting.maxImgUploadOfItem) >=1 ){
                imageCount.value = parseInt(appInfoProvider.appInfo.data.psAppSetting.maxImgUploadOfItem);
            }
            if(itemId != '0') {
                
                loadItemForEdit();
            }
            // if(appInfoProvider.appInfo.data.psItemUploadConfig.image== PsConst.ONE) {
                manageInput.push('photoStatus');
            // }
            // if(appInfoProvider.appInfo.data.psItemUploadConfig.title== PsConst.ONE) {
                manageInput.push('titleStatus');
            // }
            if(appInfoProvider.appInfo.data.psItemUploadConfig.itemTypeId== PsConst.ONE) {
                manageInput.push('itemTypeStatus');
            }
            if(appInfoProvider.appInfo.data.psItemUploadConfig.sellerTypeId== PsConst.ONE) {
                manageInput.push('sellerTypeStatus');
            }
            if(appInfoProvider.appInfo.data.psItemUploadConfig.itemPriceTypeId== PsConst.ONE) {
                manageInput.push('itemPriceTypeStatus');
            }
            if(appInfoProvider.appInfo.data.psItemUploadConfig.priceUnit== PsConst.ONE) {
                manageInput.push('priceUnitStatus');
            }
            // if(appInfoProvider.appInfo.data.psItemUploadConfig.itemCurrencyId== PsConst.ONE) {
                manageInput.push('itemCurrencyStatus');
            // }
            // if(appInfoProvider.appInfo.data.psItemUploadConfig.price== PsConst.ONE) {
                manageInput.push('priceStatus');
            // }
            if(appInfoProvider.appInfo.data.psItemUploadConfig.discountRate== PsConst.ONE) {
                manageInput.push('discountStatus');
            }
            if(appInfoProvider.appInfo.data.psItemUploadConfig.conditionOfItemId== PsConst.ONE) {
                manageInput.push('conditionOfItemStatus');
            }
            if(appInfoProvider.appInfo.data.psItemUploadConfig.mileage== PsConst.ONE) {
                manageInput.push('mileageStatus');
            }
            if(appInfoProvider.appInfo.data.psItemUploadConfig.plateNumber== PsConst.ONE) {
                manageInput.push('plateNumberStatus');
            }
            if(appInfoProvider.appInfo.data.psItemUploadConfig.highlightInfo== PsConst.ONE) {
                manageInput.push('highlightIngoStatus');
            }
            // if(appInfoProvider.appInfo.data.psItemUploadConfig.description== PsConst.ONE) {
                manageInput.push('descriptionStatus');
            // }
            // if(appInfoProvider.appInfo.data.psItemUploadConfig.itemLocationId== PsConst.ONE) {
                manageInput.push('itemLocationStatus');
            // }
            if(appInfoProvider.appInfo.data.psAppSetting.isSubLocation== PsConst.ONE) {
                manageInput.push('locationTownshipStatus');
            }
            if(appInfoProvider.appInfo.data.psItemUploadConfig.address== PsConst.ONE) {
                manageInput.push('addressStatus');
            }
            if(appInfoProvider.appInfo.data.psItemUploadConfig.licenceStatus== PsConst.ONE) {
                manageInput.push('isLicenceStatus');
            }
            if(appInfoProvider.appInfo.data.psItemUploadConfig.noOfOwner== PsConst.ONE) {
                manageInput.push('noOfOwnerStatus');
            }
            if(appInfoProvider.appInfo.data.psItemUploadConfig.licenseExpirationDate== PsConst.ONE) {
                manageInput.push('licenceExpirationStatus');
            }
            if(appInfoProvider.appInfo.data.psItemUploadConfig.businessMode== PsConst.ONE) {
                manageInput.push('isShopStatus');
            }
            // if(appInfoProvider.appInfo.data.psItemUploadConfig.lat== PsConst.ONE) {
                manageInput.push('mapStatus');
            // }
            manageInput.push('nextStatus');
            // if(appInfoProvider.appInfo.data.psItemUploadConfig.manufacturerId== PsConst.ONE) {
                manageInput.push('manufacturerStatus');
            // }
            // if(appInfoProvider.appInfo.data.psItemUploadConfig.modelId== PsConst.ONE) {
                manageInput.push('modelStatus');
            // }
            if(appInfoProvider.appInfo.data.psItemUploadConfig.buildTypeId== PsConst.ONE) {
                manageInput.push('buildTypeStatus');
            }
            if(appInfoProvider.appInfo.data.psItemUploadConfig.year== PsConst.ONE) {
                manageInput.push('yearStatus');
            }
            if(appInfoProvider.appInfo.data.psItemUploadConfig.enginePower== PsConst.ONE) {
                manageInput.push('enginePowerStatus');
            }
            if(appInfoProvider.appInfo.data.psItemUploadConfig.transmissionId== PsConst.ONE) {
                manageInput.push('transmissionStatus');
            }
            if(appInfoProvider.appInfo.data.psItemUploadConfig.fuelTypeId== PsConst.ONE) {
                manageInput.push('fuelTypeStatus');
            }
            if(appInfoProvider.appInfo.data.psItemUploadConfig.steeringPosition== PsConst.ONE) {
                manageInput.push('steeringPositionStatus');
            }
            if(appInfoProvider.appInfo.data.psItemUploadConfig.colorId== PsConst.ONE) {
                manageInput.push('colorStatus');
            }
            if(appInfoProvider.appInfo.data.psItemUploadConfig.trimName== PsConst.ONE) {
                manageInput.push('trimNameStatus');
            }
            if(appInfoProvider.appInfo.data.psItemUploadConfig.vehicleId== PsConst.ONE) {
                manageInput.push('vehicleIdStatus');
            }
            if(appInfoProvider.appInfo.data.psItemUploadConfig.noOfDoors== PsConst.ONE) {
                manageInput.push('noOfDoorsStatus');
            }
            if(appInfoProvider.appInfo.data.psItemUploadConfig.maxPassengers== PsConst.ONE) {
                manageInput.push('maxPassengersStatus');
            }
            manageInput.push('createStatus');

        });
        onUnmounted(() => {
            window.removeEventListener('scroll', handleScroll);
        })

        async function loadItemForEdit() {

            showInput.value.photoStatus = true;

            for(let tempData in showInput.value){
                showInput.value[tempData] = true;
            }
            
            const item = await itemProvider.loadItem(itemId, loginUserId);
            if(item.status == PsStatus.SUCCESS) {
                paramHolder1.value.title = item.data.title;
                paramHolder1.value.manufacturerId = item.data.manufacturerId;
                paramHolder1.value.manufacturerName = item.data.manufacturer.name;

                paramHolder1.value.colorId = item.data.colorId;
                paramHolder1.value.colorValue = item.data.itemColor.colorValue;
                paramHolder1.value.fuelTypeId = item.data.fuelTypeId;
                paramHolder1.value.fuelTypeName = item.data.fuelType.name;
                paramHolder1.value.buildTypeId = item.data.buildTypeId;
                paramHolder1.value.buildTypeName = item.data.buildType.name;
                paramHolder1.value.sellerTypeId = item.data.sellerTypeId;
                paramHolder1.value.sellerTypeName = item.data.sellerType.name;
                paramHolder1.value.transmissionId = item.data.transmissionId;
                paramHolder1.value.transmissionName = item.data.transmission.name;

                paramHolder1.value.modelId = item.data.modelId;
                paramHolder1.value.modelName = item.data.model.name;
                paramHolder1.value.itemTypeId = item.data.itemTypeId;
                paramHolder1.value.itemTypeName = item.data.itemType.name;
                paramHolder1.value.conditionOfItemId = item.data.conditionOfItemId;
                paramHolder1.value.conditionOfItemName = item.data.conditionOfItem.name;
                // paramHolder1.value.brand = item.data.brand;
                paramHolder1.value.itemPriceTypeId = item.data.itemPriceTypeId;
                paramHolder1.value.itemPriceTypeName = item.data.itemPriceType.name;


                paramHolder1.value.itemCurrencyId = item.data.itemCurrencyId;
                paramHolder1.value.currencyShortForm = item.data.itemCurrency.currencyShortForm;

                paramHolder1.value.price = item.data.price;

                paramHolder1.value.highlightInformation = item.data.highlightInformation;
                paramHolder1.value.description = item.data.description;

                // paramHolder1.value.dealOptionId = item.data.dealOptionId;
                // paramHolder1.value.dealOptionName = item.data.dealOption.name;
                // paramHolder1.value.remark = item.data.dealOptionRemark;

                paramHolder1.value.itemLocationId = item.data.itemLocationId;
                paramHolder1.value.itemLocationName = item.data.itemLocation.name;
                paramHolder1.value.locationTownshipId = item.data.itemLocationTownshipId;
                paramHolder1.value.locationTownshipName = item.data.itemLocationTownship.townshipName;

                // paramHolder1.value.businessModeBool = item.data.businessMode == '1';
                if(item.data.businessMode == '1'){
                    isShop.value =  { id:'1', name : i18n.global.t('item_entry__is_shop')};
                }

                paramHolder1.value.isLicenceStatusBool = item.data.licenceStatus == '1';

                paramHolder1.value.address = item.data.address;

                paramHolder1.value.plateNumber = item.data.plateNumber;
                paramHolder1.value.enginePower = item.data.enginePower;
                paramHolder1.value.steeringPosition = item.data.steeringPosition;
                paramHolder1.value.noOfOwner = item.data.noOfOwner;
                paramHolder1.value.trimName = item.data.trimName;
                paramHolder1.value.vehicleId = item.data.vehicleId;
                paramHolder1.value.priceUnit = item.data.priceUnit;
                paramHolder1.value.year = item.data.year;
                paramHolder1.value.licenceStatus = item.data.licenceStatus;
                paramHolder1.value.maxPassengers = item.data.maxPassengers;
                paramHolder1.value.noOfDoors = item.data.noOfDoors;
                paramHolder1.value.mileage = item.data.mileage;
                paramHolder1.value.licenceExpirationDate = item.data.licenseExpirationDate;

                // if(item.data.licenseExpirationDate != '' || item.data.licenseExpirationDate != null){
                    pickedDate.value = new Date(item.data.licenseExpirationDate);
                // }



                paramHolder1.value.latitude = item.data.lat;
                paramHolder1.value.longitude = item.data.lng;

                paramHolder1.value.id = item.data.id;

                PsUtils.log(paramHolder1.value);
                dataReady.value = true;

            }

            const gallery = await galleryProvider.loadGalleryList(appInfoProvider.appInfo.data.frontendConfigSetting.isEnableVideoSetting,itemId,PsConst.ITEM_TYPE, new DefaultPhoto());
            if(gallery != null) {
                const imgList = gallery.data;

                for( let i = 0; i < imgList.length; i++){
                        imgId[i] = imgList[i].imgId;
                }

            }
        }
        function handleScroll(){
            // when the user scrolls, check the pageYOffset
            if(window.pageYOffset>30){
                // user is scrolled
                if(atTopOfPage.value) atTopOfPage.value = false;
            }else{
                // user is at top of page
                if(!atTopOfPage.value) atTopOfPage.value = true;
            }
        }

        function loadLocation() {
            itemlocationProvider.loadItemLocationList(loginUserId, paramHolder);
        }

        function updateCoordinates(location) {
            paramHolder1.value.latitude = location.latLng.lat().toString();
            paramHolder1.value.longitude = location.latLng.lng().toString();

        }

        function filterKeywordUpate(value) {
            itemlocationProvider.filterKeywordUpate(value,loginUserId, paramHolder);
        }
        function filterModelUpdate(value){
            modelHolder.keyword = value;
            modelProvider.filtermodelUpdate(loginUserId,modelHolder);
        }
        function filtersubLocationUpdate(value) {
            subparamHolder.keyword = value;
            locationTownshipProvider.filtersubLocationUpdate(loginUserId,subparamHolder);
        }

        function locationFilterClicked(value) {
            
            subparamHolder.locationId = value.id;
            paramHolder1.value.itemLocationId = value.id;
            paramHolder1.value.itemLocationName = value.name;
            paramHolder1.value.latitude = value.lat;
            paramHolder1.value.longitude = value.lng;
            paramHolder1.value.locationTownshipId = '';
            paramHolder1.value.locationTownshipName = '';
            validation.value.itemLocationStatus = false;
            showNext('itemLocationStatus');

        }
        function locationTownshipFilterClicked(value) {
            
        
            paramHolder1.value.locationTownshipId = value.id;
            paramHolder1.value.locationTownshipName = value.townshipName;
            validation.value.locationTownshipStatus = false;
            showNext('locationTownshipStatus');

        }


        function loadManufacturer(){
            manufacturerProvider.loadItemList(PsConst.NO_LOGIN_USER, manufacturerProvider.paramHolder);
        }
        function loadModel(manufacturerId) { 
            modelProvider.loadModelList(manufacturerId);      
        }
        function loadItemType() {
            itemTypeProvider.loadItemTypeList( );
        }
        function loadCondition() {
            itemConditionProvider.loadItemConditionList();
        }
        function loadItemPriceType() {
            itemPriceTypeProvider.loadItemPriceTypeList( );
        }
        function loadLocationTownship(locationId) {
            locationTownshipProvider.loadItemLocationTownshipList(locationId);
        }
        function loadCurrency() {
            itemcurrencyProvider.loadItemCurrencyList();
        }
        function loadColor() {
            colorProvider.loadItemColorList( );
        }
        function loadFuelType() {
            fuelTypeProvider.loadFuelTypeList( );
        }
        function loadBuildType() {
            buildTypeProvider.loadBuildTypeList( );
        }
        function loadSellerType() {
            sellerTypeProvider.loadSellerTypeList( );
        }
        function loadTransmission() {
            transmissionProvider.loadTransmissionList( );
        }


        function modelFilterClicked(value) {
            
            paramHolder1.value.modelId = value.id;
            paramHolder1.value.modelName = value.name;
            validation.value.modelStatus = false;
            showNext('modelStatus');

        }

        function manufacturerFilterClicked(value) {
            modelHolder.manufacturerId = value.id;
            paramHolder1.value.manufacturerId = value.id;
            paramHolder1.value.manufacturerName = value.name;
            validation.value.manufacturerStatus = false;
            paramHolder1.value.modelId = '';
            paramHolder1.value.modelName = '';
            modelProvider.offset = 0;
            showNext('manufacturerStatus');
            
        }
        function colorFilterClicked(value) {
            
            paramHolder1.value.colorId = value.id;
            paramHolder1.value.colorValue = value.colorValue;
            validation.value.colorStatus = false;
            showNext('colorStatus');

        }
        function fuelTypeFilterClicked(value) {
            
            paramHolder1.value.fuelTypeId = value.id;
            paramHolder1.value.fuelTypeName = value.name;
            validation.value.fuelTypeStatus = false;
            showNext('fuelTypeStatus');

        }
        function sellerTypeFilterClicked(value) {
            
            paramHolder1.value.sellerTypeId = value.id;
            paramHolder1.value.sellerTypeName = value.name;
            validation.value.sellerTypeStatus = false;
            showNext('sellerTypeStatus');

        }
        function buildTypeFilterClicked(value) {
            
            paramHolder1.value.buildTypeId = value.id;
            paramHolder1.value.buildTypeName = value.name;
            validation.value.buildTypeStatus = false;
            showNext('buildTypeStatus');

        }
        function transmissionFilterClicked(value) {
            
            paramHolder1.value.transmissionId = value.id;
            paramHolder1.value.transmissionName = value.name;
            validation.value.transmissionStatus = false;
            showNext('transmissionStatus');

        }
        function itemTypeFilterClicked(value) {
            
            paramHolder1.value.itemTypeId = value.id;
            paramHolder1.value.itemTypeName = value.name;
            validation.value.itemTypeStatus = false;
            showNext('itemTypeStatus');

        }
        function licenceFilterClicked(value){
            if(value == '1'){
                paramHolder1.value.isLicenceStatusBool = true;
            }else{
                paramHolder1.value.isLicenceStatusBool = false;
            }
             showNext('isLicenceStatus');
        }
        function conditionFilterClicked(value) {
            paramHolder1.value.conditionOfItemId = value.id;
            paramHolder1.value.conditionOfItemName = value.name;
            validation.value.conditionOfItemStatus = false;
            showNext('conditionOfItemStatus');

        }
        function itemPriceTypeFilterClicked(value) {
            
            paramHolder1.value.itemPriceTypeId = value.id;
            paramHolder1.value.itemPriceTypeName = value.name;
            validation.value.itemPriceTypeStatus = false;
            showNext('itemPriceTypeStatus');

        }
        function dealOptionFilterClicked(value) {
            paramHolder1.value.dealOptionId = value.id ;
            paramHolder1.value.dealOptionName = value.name;
            validation.value.dealOptionStatus = false;
            showNext('dealOptionStatus');
        }
        function currencyFilterClicked(value) {
            paramHolder1.value.itemCurrencyId = value.id ;
            paramHolder1.value.currencyShortForm = value.currencySymbol;
            validation.value.itemCurrencyStatus = false;
            showNext('itemCurrencyStatus');
        }
        function isShopFilterClicked(value) {
            isShop.value = value;
            // alert(isShop.id);
        }

        function updateLocation(lat, lng) {
            if(lat == null || lng == null) {
                return;
            }

            paramHolder1.value.latitude = lat;
            paramHolder1.value.longitude = lng;
        }

            
        function defaultClick(index) {
            
            selectImgIndex.value = index;
            image.value.click();
            
        }
        function onVideoClick() {
            video.value.click();
        }
        
        function onImageSelected(event ) {

            let obj = {'id': 0, 'imgUrl': '','file': ''};
            obj.id = selectImgIndex.value;
            
            for(let i=1; i<selectImgIndex.value; i++) {
                const id = previewImages.data[i-1] ? previewImages.data[i-1]?.id : 0;
                if(id == 0){
                    if(galleryProvider.galleryList.data == null){
                        previewImages.data.push({'id': i, 'imgUrl': '', 'file': ''});
                    } else {
                        twoObject.value = true;
                        previewImages.data.push({'id': galleryProvider.galleryList.data[i-1].imgId, 'imgUrl': galleryProvider.galleryList.data[i-1].imgPath, 'file': ''});
                    }
                   
                }
            }
           
            const selectedFiles = event.target.files;
          
            const reader = new FileReader
            reader.onload = e => {
                obj["imgUrl"] = e.target ? e.target.result ? e.target.result.toString() : '' : '';
                previewImages.data.push(obj)
                
            }
            reader.readAsDataURL(selectedFiles[0])

            selectedFile[selectImgIndex.value-1] = selectedFiles[0];
            obj["file"] = selectedFiles[0];
            
            console.log(previewImages.data);
            showInput.value.photoStatus = true;
        }
        function dragClick(value) {
            console.log(value);
           console.log(galleryProvider.galleryList.data);
        }

        async function submitItem() {

            // limit ad post check
            // if(appInfoProvider?.appInfo?.data.psAppSetting?.isPaidApp == PsConst.ONE) {
                //do item upload
                if(appInfoProvider?.appInfo?.data.psAppSetting?.isPaidApp == PsConst.ONE && userProvider.user?.data?.postCount == PsConst.LIMITED && userProvider.user?.data?.remainingPost == '0') {
                    limit_item_modal.value.openModal();
                }
                else {
                    PsUtils.log(paramHolder1.value);
                    paramHolder1.value.businessMode = isShop.value.id;

                    paramHolder1.value.licenceStatus =paramHolder1.value.isLicenceStatusBool ? '1' : '0';

                    paramHolder1.value.addedUserId = loginUserId;
                    ps_loading_dialog.value.openModal();
                    ps_loading_dialog.value.message = i18n.global.t('item_entry__uploading_item');
                    let returnData;
                    try {
                        returnData = await itemProvider.submitItemEntry(loginUserId, paramHolder1.value);
                        // PsUtils.log('check4');
                    }catch(e) {
                        PsUtils.log(e);
                    }
                    PsUtils.log(returnData);

                    if(returnData != undefined && returnData.status == PsStatus.SUCCESS) {
                        if(returnData.data.id != '') {
                            if(previewImages.data.length > 0) {
                                for(let i=0; i<previewImages.data.length; i++) {
                                    //for add item entry and edit rechoose image
                                    if(previewImages.data[i].file == ''){
                                        imgId[i] = previewImages.data[i].id;
                                    } else {
                                        imgId[i] = '';
                                    }
                                    ps_loading_dialog.value.setMessage(i18n.global.t('item_entry__uploading_image'));
                                    
                                    await itemProvider.postItemImageUpload(loginUserId,itemProvider.product.data.id, PsConst.ITEM_TYPE,  i+1, "Image", previewImages.data[i].file, imgId[i] );
                                }
                            } else {
                                console.log(galleryProvider.galleryList?.data);
                                for(let j=0; j<galleryProvider.galleryList?.data.length; j++) {
                                    if(galleryProvider.galleryList?.data[j] != undefined){
                                        let imgPath = '';
                                        let orderIndex = j+1;
                                        ps_loading_dialog.value.setMessage(i18n.global.t('item_entry__uploading_image'));
                                    
                                        await itemProvider.postItemImageUpload(loginUserId,itemProvider.product.data.id, PsConst.ITEM_TYPE,  orderIndex, "Image", imgPath, galleryProvider.galleryList?.data[j].imgId );
                                    }
                                    
                                }
                            }
                            //for edit drag gallery list
                            // if(twoObject.value == false){
                            //     if(galleryProvider.galleryList?.data.length > 0) {
                            //         for(let j=0; j<galleryProvider.galleryList?.data.length; j++) {
                            //             if(galleryProvider.galleryList?.data[j] != undefined){
                            //                 dragObject[j] = galleryProvider.galleryList?.data[j].imgId.toString()
                            //             }
                                        
                            //         }
                            //     }
                            //     if(dragObject.length > 0) {
                            //         for(let j=0; j<dragObject.length; j++) {
                            //             let dragIndex = j + 1;
                            //             reorderImages.data.push({'img_id': dragObject[j], 'ordering': dragIndex.toString()})
                            //         }
                            //     }
                            //     //update gallery ordering
                            //     if (reorderImages.data.length > 0) {
                            //         await itemProvider.postReorderItemImage(loginUserId,reorderImages.data);
                            //     }
                            // }
                            

                            if(selectedFileVideo != undefined && selectedFileVideo != ''){
                                ps_loading_dialog.value.setMessage(i18n.global.t('item_entry__uploading_video'));
                                await itemProvider.postItemVideoUpload(itemProvider.product.data.id, selectedFileVideo,loginUserId);
                            }

                            if(selectedFileVideoThumb != undefined && selectedFileVideoThumb != ''){
                                ps_loading_dialog.value.setMessage(i18n.global.t('item_entry__uploading_video_thumb'));
                                await itemProvider.postItemVideoThumbUpload(itemProvider.product.data.id, selectedFileVideoThumb,loginUserId);
                            }
                            ps_loading_dialog.value.closeModal();

                            // Redirect
                            router.push({ name : "dashboard"});
                        }       
                    }else {
                        ps_loading_dialog.value.closeModal();
                        ps_error_dialog.value.openModal('', returnData.message);
                        
                    }  
                }
            
            

        }

        function getImageUrl(index) {
            
            if(galleryProvider != null
                && galleryProvider.galleryList != null
                && galleryProvider.galleryList.data != null
                && galleryProvider.galleryList.data.length >= index) {
                    if(galleryProvider.galleryList.data[index-1].imgPath && galleryProvider.galleryList.data[index-1].imgPath != ''){
                        return galleryProvider.imageUrl(galleryProvider.galleryList.data[index-1].imgPath ?? '',2);
                    }else{
                        return '';
                    }
                
            }else if(previewImages.data != null && previewImages.data.length >= index){
                if (previewImages.data[index-1]?.file =='') {
                    return galleryProvider.imageUrl(previewImages.data[index-1]?.imgUrl ?? '',2);
                } else {
                    return previewImages.data[index-1]?.imgUrl;
                }
                
            }else {
                return '';
            }

        } 
        function getImageId(index) {
            
            if(galleryProvider != null
                && galleryProvider.galleryList != null
                && galleryProvider.galleryList.data != null
                && galleryProvider.galleryList.data.length >= index) {
                return galleryProvider.galleryList.data[index-1].imgId;
            }else {
                return '';
            }

        } 

        function getVideoUrl() {
            if(itemProvider != null
                && itemProvider.product != null
                && itemProvider.product.data != null
                && itemProvider.product.data.videoThumbnail != null) {
                    if(itemProvider.product.data.videoThumbnail.imgPath && itemProvider.product.data.videoThumbnail.imgPath != ''){
                        return itemProvider.imageUrl(itemProvider.product.data.videoThumbnail.imgPath ,2);
                    }else{
                        return '';
                    }
                
            }else {
                return '';
            }
        }
        function getVideoId() {
            if(itemProvider != null
                && itemProvider.product != null
                && itemProvider.product.data != null
                && itemProvider.product.data.video != null) {
                    return itemProvider.product.data.video.imgId;
            }else {
                return '';
            }
        }
        function getVideoThumbnailId() {
            if(itemProvider != null
                && itemProvider.product != null
                && itemProvider.product.data != null
                && itemProvider.product.data.videoThumbnail != null) {
                    return itemProvider.product.data.videoThumbnail.imgId;
            }else {
                return '';
            }
        }

        function onVideoSelected(event) {
            
            const selectedFiles = event.target.files;

            if(selectedFiles && selectedFiles.length > 1) {
                window.alert("Over 1 Video");
            }else {
                previewVideo.data = [];
                if(selectedFiles && selectedFiles[0]) {                
                    const fileReader = new FileReader
                    fileReader.onload = () => {                            
                        const file = selectedFiles[0];
                        const blob = new Blob([ fileReader.result ?? ''], {type: file.type});
                        const url = URL.createObjectURL(blob);
                        const video = document.createElement('video');
                        video.oncanplay = function () {
                                
                            if(video.duration > 60) {
                                selectedFileVideo = undefined;
                                ps_warning_dialog.value.openModal('Video Upload!', "Video must be less than a minute.");
                                return false;
                            }else {
                                
                                const timeupdate = function() {
                                    if (snapImage()) {
                                        video.removeEventListener('timeupdate', timeupdate);
                                        video.pause();
                                    }
                                };
                                video.addEventListener('loadeddata', function() {
                                    if (snapImage()) {
                                    video.removeEventListener('timeupdate', timeupdate);
                                    }
                                });
                                const snapImage  = function() {
                                    const canvas = document.createElement('canvas') as HTMLCanvasElement;
                                    canvas.width = video.videoWidth;
                                    canvas.height = video.videoHeight;
                                    canvas.getContext('2d')!.drawImage(video, 0, 0, canvas.width, canvas.height);
                                    const image = canvas.toDataURL();
                                
                                    const fileData = dataURLtoFile(image);
        
                                    const success = image.length > 100000;
                                    if (success) {
                                        previewVideo.data.push(image);
                                        URL.revokeObjectURL(url);
                                    }
                                    selectedFileVideoThumb = fileData;
                                    return success;
                                    
                                };
                                video.addEventListener('timeupdate', timeupdate);
                                
                                selectedFileVideo = selectedFiles[0];
                            
                            }
                        }

                        video.preload = 'metadata';
                        video.src = url;
                        // Load video in Safari / IE11
                        video.muted = true;
                        // video.playsInline = true;
                        video.play();
                        
                        
                    };
                    fileReader.readAsArrayBuffer(selectedFiles[0]);
                }                
            }
        }

        function dataURLtoFile(dataurl) {
            let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            const imgExt = mime.split('/');
            const fileName = Date.now() +'.'+imgExt[1];
            while(n--){
            u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], fileName, {type:mime});
        }

        function validateTitle(e) {
            const pattern = /^\/$|(\/[a-zA-Z_0-9-]+)+$/;
            const res = pattern.test(e.target.value);
            if (!res) {
                validation.value.titleStatus = false;
            } else {
                validation.value.titleStatus = true;
            }
        }
        function validatePriceUnit(e) {
            const pattern = /^\/$|(\/[a-zA-Z_0-9-]+)+$/;
            const res = pattern.test(e.target.value);
            if (!res) {
                validation.value.priceUnitStatus = false;
            } else {
                validation.value.priceUnitStatus = true;
            }
        }
        function validateMileage(e) {
            const pattern = /^\/$|(\/[a-zA-Z_0-9-]+)+$/;
            const res = pattern.test(e.target.value);
            if (!res) {
                validation.value.mileageStatus = false;
            } else {
                validation.value.mileageStatus = true;
            }
        }
        function validateNoOfOwner(e) {
            const pattern = /^\/$|(\/[a-zA-Z_0-9-]+)+$/;
            const res = pattern.test(e.target.value);
            if (!res) {
                validation.value.noOfOwnerStatus = false;
            } else {
                validation.value.noOfOwnerStatus = true;
            }
        }
        function validateYear(e) {
            const pattern = /^\/$|(\/[a-zA-Z_0-9-]+)+$/;
            const res = pattern.test(e.target.value);
            if (!res) {
                validation.value.yearStatus = false;
            } else {
                validation.value.yearStatus = true;
            }
        }
        function validateEnginePower(e) {
            const pattern = /^\/$|(\/[a-zA-Z_0-9-]+)+$/;
            const res = pattern.test(e.target.value);
            if (!res) {
                validation.value.enginePowerStatus = false;
            } else {
                validation.value.enginePowerStatus = true;
            }
        }
        function validateSteeringPosition(e) {
            const pattern = /^\/$|(\/[a-zA-Z_0-9-]+)+$/;
            const res = pattern.test(e.target.value);
            if (!res) {
                validation.value.steeringPositionStatus = false;
            } else {
                validation.value.steeringPositionStatus = true;
            }
        }
        function validateTrim(e) {
            const pattern = /^\/$|(\/[a-zA-Z_0-9-]+)+$/;
            const res = pattern.test(e.target.value);
            if (!res) {
                validation.value.trimNameStatus = false;
            } else {
                validation.value.trimNameStatus = true;
            }
        }
        function validateVehicleId(e) {
            const pattern = /^\/$|(\/[a-zA-Z_0-9-]+)+$/;
            const res = pattern.test(e.target.value);
            if (!res) {
                validation.value.vehicleIdStatus = false;
            } else {
                validation.value.vehicleIdStatus = true;
            }
        }
        function validateNoOfDoor(e) {
            const pattern = /^\/$|(\/[a-zA-Z_0-9-]+)+$/;
            const res = pattern.test(e.target.value);
            if (!res) {
                validation.value.noOfDoorsStatus = false;
            } else {
                validation.value.noOfDoorsStatus = true;
            }
        }
        function validateMaxPassenger(e) {
            const pattern = /^\/$|(\/[a-zA-Z_0-9-]+)+$/;
            const res = pattern.test(e.target.value);
            if (!res) {
                validation.value.maxPassengersStatus = false;
            } else {
                validation.value.maxPassengersStatus = true;
            }
        }
        function validatePlateNumber(e) {
            const pattern = /^\/$|(\/[a-zA-Z_0-9-]+)+$/;
            const res = pattern.test(e.target.value);
            if (!res) {
                validation.value.plateNumberStatus = false;
            } else {
                validation.value.plateNumberStatus = true;
            }
        }

        function validatePrice(e) {
            const pattern = /^\/$|(\/[a-zA-Z_0-9-]+)+$/;
            const res = pattern.test(e.target.value);
            if (!res) {
                validation.value.priceStatus = false;
            } else {
                validation.value.priceStatus = true;
            }
        }

        async function submitClicked() {

            if(!showInput.value.createStatus){
                return;
            }

            // PsUtils.log('check1');

            await userProvider.getUser(loginUserId);

            //Start validating check
            
        
            let errorStatus = true;

            if (paramHolder1.value.manufacturerId == '' || paramHolder1.value.manufacturerId == undefined) {
                validation.value.manufacturerStatus = true;
                errorStatus = false;
            }

            if (paramHolder1.value.modelId == '' || paramHolder1.value.modelId == undefined) {
                validation.value.modelStatus = true;
                errorStatus = false;
            }

            // End
            if(!errorStatus) {
                window.scrollTo(0, 0);
                return;
            }
            // PsUtils.log('check2');
            submitItem();
            
        }
        function imageDelete(value){
            
            if(previewImages.data == ''){
                ps_confirm_dialog.value.openModal(
                    i18n.global.t('ps_confirm_dialog__confirm'),
                    i18n.global.t('ps_confirm_dialog__are_you_confirm'),
                    i18n.global.t('ps_confirm_dialog__yes'),
                    i18n.global.t('ps_confirm_dialog__no'),
                    () => {
                        imgId[value-1] = '';
                        doDeleteImage(getImageId(value));
                    },
                    () => {
                        PsUtils.log("Cancel");
                    }
                );
            }else{
                previewImages.data.splice(value-1, 1);
                if(previewImages.data == ''){
                    showInput.value.photoStatus = false;
                }
            }
            console.log(previewImages.data);
        }
        function videoDelete(){
            
            if(previewVideo.data == ''){
                ps_confirm_dialog.value.openModal(
                    i18n.global.t('ps_confirm_dialog__confirm'),
                    i18n.global.t('ps_confirm_dialog__are_you_confirm'),
                    i18n.global.t('ps_confirm_dialog__yes'),
                    i18n.global.t('ps_confirm_dialog__no'),
                    () => {
                        doDeleteVideo(getVideoId(),getVideoThumbnailId());
                    },
                    () => {
                        PsUtils.log("Cancel");
                    }
                );
            }else{
                previewVideo.data = [];
            }
        

        }
        async function doDeleteImage(value){
            ps_loading_dialog.value.openModal();

            const status = await galleryProvider.deleteImage(value, loginUserId);
            PsUtils.log(status);
            await galleryProvider.resetGalleryList(itemId,PsConst.ITEM_TYPE);
            ps_loading_dialog.value.closeModal();
        }
        async function doDeleteVideo(video, icon){
            ps_loading_dialog.value.openModal();
            const status = await galleryProvider.deleteVideo(video, loginUserId);
            await galleryProvider.deleteVideo(icon, loginUserId);
            PsUtils.log(status);
            ps_loading_dialog.value.closeModal();
        }

        function nextClick1(){
            
            if(!showInput.value.photoStatus){
                return;
            }
            
            window.scrollTo(0, 0);
            showCell.value = 2;
            showNext('photoStatus');
        }
        function prevClick2(){
            window.scrollTo(0, 0);

            showCell.value = 1;
        }
        function nextClick2(){

            if(!showInput.value.nextStatus){
                return;
            }

            window.scrollTo(0, 0);
            let errorStatus = true;
            if (paramHolder1.value.title == '' || paramHolder1.value.title == undefined) {
                validation.value.titleStatus = true;
                console.log('t');
                errorStatus = false;
            }

            // if (paramHolder1.value.itemTypeId == '' || paramHolder1.value.itemTypeId == undefined) {
            //     validation.value.itemTypeStatus = true;
            //     errorStatus = false;
            // }

            // if (paramHolder1.value.conditionOfItemId == '' || paramHolder1.value.conditionOfItemId == undefined) {
            //     validation.value.conditionOfItemStatus = true;
            //     errorStatus = false;
            // }

            // if (paramHolder1.value.itemPriceTypeId == '' || paramHolder1.value.itemPriceTypeId == undefined) {
            //     validation.value.itemPriceTypeStatus = true;
            //     errorStatus = false;
            // }

            if (paramHolder1.value.itemCurrencyId == '' || paramHolder1.value.itemCurrencyId == undefined) {
                validation.value.itemCurrencyStatus = true;
                console.log('c');
                errorStatus = false;
            }

            if (paramHolder1.value.price == '' || paramHolder1.value.price == undefined) {
                validation.value.priceStatus = true;
                console.log('p');
                errorStatus = false;
            }

            if (paramHolder1.value.itemLocationId == '' || paramHolder1.value.itemLocationId == undefined) {
                validation.value.itemLocationStatus = true;
                console.log('lo');
                errorStatus = false;
            }

            if (paramHolder1.value.description == '' || paramHolder1.value.description == undefined) {
                validation.value.descriptionStatus = true;
                console.log('des');
                errorStatus = false;
            }

            // if (paramHolder1.value.locationTownshipId == '' || paramHolder1.value.locationTownshipId == undefined) {
            //     validation.value.locationTownshipStatus = true;
            //     errorStatus = false;
            // }

            // if (paramHolder1.value.sellerTypeId == '' || paramHolder1.value.sellerTypeId == undefined) {
            //     validation.value.sellerTypeStatus = true;
            //     errorStatus = false;
            // }

            // if (paramHolder1.value.plateNumber == '' || paramHolder1.value.plateNumber == undefined) {
            //     validation.value.plateNumberStatus = true;
            //     errorStatus = false;
            // }


            // if (paramHolder1.value.priceUnit == '' || paramHolder1.value.priceUnit == undefined) {
            //     validation.value.priceUnitStatus = true;
            //     errorStatus = false;
            // }

            // if (paramHolder1.value.mileage == '' || paramHolder1.value.mileage == undefined) {
            //     validation.value.mileageStatus = true;
            //     errorStatus = false;
            // }
            if(appInfoProvider.appInfo.data.psItemUploadConfig.licenseExpirationDate== PsConst.ONE){
            
                const day = parseInt(startDate.value.pickedDate.getDate(), 10);
                const month = parseInt(startDate.value.pickedDate.getMonth(), 10) ;
                const year = parseInt(startDate.value.pickedDate.getFullYear(), 10);

                const selectedDate = new Date(year, month, day).getTime();

                paramHolder1.value.licenceExpirationDate = PsUtils.timeStampToDateStringYMD(selectedDate);
            }
            // End
            if(!errorStatus) {
                window.scrollTo(0, 0);
                return;
            }
            showCell.value = 3;
        }
        function prevClick3(){
            window.scrollTo(0, 0);

            showCell.value = 2;
        }
        function showNext(value){
            let index = manageInput.indexOf(value);
            index = index + 1;
            if(manageInput[index] == 'titleStatus'){
                showInput.value.titleStatus = true;
            }
            else if(manageInput[index] == 'itemTypeStatus'){
                showInput.value.itemTypeStatus = true;
            }
            else if(manageInput[index] == 'sellerTypeStatus'){
                showInput.value.sellerTypeStatus = true;
            }
            else if(manageInput[index] == 'itemPriceTypeStatus'){
                showInput.value.itemPriceTypeStatus = true;
            }
            else if(manageInput[index] == 'priceUnitStatus'){
                showInput.value.priceUnitStatus = true;
            }
            else if(manageInput[index] == 'itemCurrencyStatus'){
                showInput.value.itemCurrencyStatus = true;
            }
            else if(manageInput[index] == 'priceStatus'){
                showInput.value.priceStatus = true;
            }
            else if(manageInput[index] == 'discountStatus'){
                showInput.value.discountStatus = true;
            }
            else if(manageInput[index] == 'conditionOfItemStatus'){
                showInput.value.conditionOfItemStatus = true;
            }
            else if(manageInput[index] == 'mileageStatus'){
                showInput.value.mileageStatus = true;
            }
            else if(manageInput[index] == 'noOfOwnerStatus'){
                showInput.value.noOfOwnerStatus = true;
                showNext('noOfOwnerStatus');
            }
            else if(manageInput[index] == 'isLicenceStatus'){
                showInput.value.isLicenceStatus = true;
                showNext('isLicenceStatus');
            }
            else if(manageInput[index] == 'plateNumberStatus'){
                showInput.value.plateNumberStatus = true;
            }
            else if(manageInput[index] == 'licenceExpirationStatus'){
                showInput.value.licenceExpirationStatus = true;
                showNext('licenceExpirationStatus');
            }
            else if(manageInput[index] == 'isShopStatus'){
                showInput.value.isShopStatus = true;
                showNext('isShopStatus');
            }
            else if(manageInput[index] == 'highlightIngoStatus'){
                showInput.value.highlightIngoStatus = true;
            }
            else if(manageInput[index] == 'descriptionStatus'){
                showInput.value.descriptionStatus = true;
            }
            else if(manageInput[index] == 'itemLocationStatus'){
                showInput.value.itemLocationStatus = true;
            }
            else if(manageInput[index] == 'locationTownshipStatus'){
                showInput.value.locationTownshipStatus = true;
            }
            else if(manageInput[index] == 'addressStatus'){
                showInput.value.addressStatus = true;
            }
            else if(manageInput[index] == 'mapStatus'){
                showInput.value.mapStatus = true;
                showNext('mapStatus');
            }
            else if(manageInput[index] == 'nextStatus'){
                showInput.value.nextStatus = true;
                showNext('nextStatus');
            }
            else if(manageInput[index] == 'manufacturerStatus'){
                showInput.value.manufacturerStatus = true;
            }
             else if(manageInput[index] == 'modelStatus'){
                showInput.value.modelStatus = true;
            }
             else if(manageInput[index] == 'buildTypeStatus'){
                showInput.value.buildTypeStatus = true;
            }
            else if(manageInput[index] == 'yearStatus'){
                showInput.value.yearStatus = true;
            }
            else if(manageInput[index] == 'enginePowerStatus'){
                showInput.value.enginePowerStatus = true;
            }
            else if(manageInput[index] == 'transmissionStatus'){
                showInput.value.transmissionStatus = true;
            }
            else if(manageInput[index] == 'fuelTypeStatus'){
                showInput.value.fuelTypeStatus = true;
            }
            else if(manageInput[index] == 'steeringPositionStatus'){
                showInput.value.steeringPositionStatus = true;
            }
            else if(manageInput[index] == 'colorStatus'){
                showInput.value.colorStatus = true;
            }
            else if(manageInput[index] == 'trimNameStatus'){
                showInput.value.trimNameStatus = true;
            }
            else if(manageInput[index] == 'vehicleIdStatus'){
                showInput.value.vehicleIdStatus = true;
            }
            else if(manageInput[index] == 'noOfDoorsStatus'){
                showInput.value.noOfDoorsStatus = true;
            }
            else if(manageInput[index] == 'maxPassengersStatus'){
                showInput.value.maxPassengersStatus = true;
            }
            else if(manageInput[index] == 'createStatus'){
                showInput.value.createStatus = true;
            }
        }
        function updateLeafletCoordinates(location) {
           
            paramHolder1.value.latitude = location.lat.toString();
            paramHolder1.value.longitude = location.lng.toString();

        }

        return {
            isShop,
            isShopSetting,
            startDate,
            showInput,
            manageInput,
            atTopOfPage,
            prevClick3,
            nextClick2,
            prevClick2,
            nextClick1,
            pickedDate,
            itemId,
            dataReady,
            paramHolder1,
            manufacturerProvider,
            modelProvider,
            itemTypeProvider,
            colorProvider,
            fuelTypeProvider,
            buildTypeProvider,
            sellerTypeProvider,
            transmissionProvider,
            itemConditionProvider,
            itemPriceTypeProvider,
            userProvider,
            locationTownshipProvider,
            itemcurrencyProvider,

            ps_warning_dialog,
            map_with_pin_picker_modal,
            ps_loading_dialog,
            ps_error_dialog,
            ps_confirm_dialog,
            limit_item_modal,
            locationKeyword,
            sublocationKeyword,
            modelKeyword,
            itemlocationProvider,
            loadLocation,
            appInfoProvider,

            filterKeywordUpate,
            filterModelUpdate,
            filtersubLocationUpdate,
            locationFilterClicked,
            manufacturerFilterClicked,
            modelFilterClicked,
            itemTypeFilterClicked,
            conditionFilterClicked,
            itemPriceTypeFilterClicked,
            dealOptionFilterClicked,
            locationTownshipFilterClicked,
            currencyFilterClicked,
            isShopFilterClicked,
            colorFilterClicked,
            licenceFilterClicked,
            fuelTypeFilterClicked,
            buildTypeFilterClicked,
            sellerTypeFilterClicked,
            transmissionFilterClicked,
            submitClicked,
            updateLocation,
            updateCoordinates,
            updateLeafletCoordinates,

            onVideoSelected,
            onImageSelected,
            defaultClick,
            loadManufacturer,
            loadModel,
            loadItemType,
            loadCondition,
            loadColor,
            loadFuelType,
            loadBuildType,
            loadSellerType,
            loadTransmission,
            loadItemPriceType,
            loadLocationTownship,
            loadCurrency,
            video,
            image,
            onVideoClick,

            imageCount,
            previewImages,
            previewVideo,

            getImageUrl,
            getVideoUrl,
            galleryProvider,
            submitItem,
            itemProvider,
            validation,
            validateTitle,
            validatePriceUnit,
            validateMileage,
            validateNoOfOwner,
            validateMaxPassenger,
            validatePlateNumber,
            validateNoOfDoor,
            validateVehicleId,
            validateTrim,
            validateSteeringPosition,
            validateEnginePower,
            validateYear,
            validatePrice,
            imageDelete,
            videoDelete,
            showCell,
            showNext,
            dragClick
        }
    }
}

</script>