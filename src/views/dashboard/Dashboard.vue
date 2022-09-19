<template>
    <div class="">
        
        <div class="">

            <div class="sm:mt-24 mt-24 lg:mt-24 w-full">

                <div class="bg-black sm:h-64 h-40">
            
                    <div class="relative bg-black  " :class="appInfoProvider?.appInfo?.data?.psItemUploadConfig.conditionOfItemId== PsConst.ONE ? 'sm:h-48 h-32' : 'sm:h-58 h-32'">
                        <div class="absolute opacity-50">
                            <img alt="Placeholder" width="100%" height="auto"  class="w-screen sm:h-64 h-40 object-cover" :src="require('@/assets/images/'+appInfoProvider?.appInfo?.data?.frontendConfigSetting?.bannerSrc)">
                        </div>
                        <div class="relative w-mobile sm:w-median lg:w-large mx-auto" >
                            <div class=" flex flex-col items-center content-center pt-12 sm:pt-16">
                                <ps-label class="mt-2 text-base sm:text-2xl lg:text-4xl" textColor="text-textLight">{{ $t("dashboard__make_your_choice") }}</ps-label>
                                <ps-label class="mt-2 text-xxs sm:text-xs lg:text-sm"  textColor="text-textLight"> {{ $t("dashboard__make_your_choice_text") }}</ps-label>
                            </div>
                            
                        </div>
                    </div>
                    <div class="relative w-mobile sm:w-median lg:w-large mx-auto">
                        <div class=" w-11/12 mx-auto shadow-barShadow ">
                            <div class=" w-full flex flex-col">
                                <div v-if="appInfoProvider?.appInfo?.data?.psItemUploadConfig.conditionOfItemId== PsConst.ONE" class="flex "> 
                                    <div class="flex flex-row" v-if="conditionId==PsConst.USED_CONDITION_ID">
                                        <ps-label @click="onClickcondition(PsConst.NEW_CONDITION_ID)" class="bg-primary-400 dark:bg-primaryDark-100 px-8 py-3 font-medium cursor-pointer" textColor="text-textLight "> {{ $t("dashboard__new_cars") }} </ps-label>
                                        <ps-label class="bg-background px-8 py-3 text-sm lg:text-base font-medium cursor-pointer" textColor="text-textDark dark:text-textWhite"> {{ $t("dashboard__used_cars") }} </ps-label>
                                        
                                    </div>
                                    <div class="flex flex-row" v-else>
                                        <ps-label class="bg-background px-8 py-3 font-medium cursor-pointer" textColor="text-textDark dark:text-textWhite">{{ $t("dashboard__new_cars") }} </ps-label>
                                        <ps-label @click="onClickcondition(PsConst.USED_CONDITION_ID)" class="text-sm lg:text-base bg-primary-400 dark:bg-primaryDark-100 px-8 py-3 font-medium cursor-pointer" textColor="text-textLight "> {{ $t("dashboard__used_cars") }} </ps-label>
                                        
                                    </div>
                                </div>
                                <div class=" flex sm:flex-row flex-col bg-primary-000 dark:bg-primaryDark-black">
                                    <div class="flex-grow">
                                        <ps-input-with-left-icon theme="outline-none bg-primary-000 dark:bg-primaryDark-black text-secondary-500 dark:text-secondaryDark-white" height="h-10" v-on:keyup.enter="searchClicked"  v-model:value="searchKeyword" :placeholder= "$t('dashboard__search')" >
                                            <template #icon>
                                                <ps-icon textColor="text-secondary-400 dark:text-secondaryDark-grey" name="search" class='cursor-pointer'  />
                                            </template>
                                        </ps-input-with-left-icon>
                                    </div>

                                    <div class="flex">
                                        <div class="sm:flex-grow-0 flex-grow mx-auto">
                                            <ps-button v-bind:title="$t('dashboard__search')" class="w-full py-2 sm:py-3 bg-primary-500 dark:bg-primaryDark-accent hover:bg-primary-400 " rounded="" @click="searchClicked">
                                                <ps-label class="text-xs lg:text-sm px-8 font-medium" textColor="text-textLight "> {{ $t("dashboard__search") }} </ps-label>
                                            </ps-button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            <div class="mb-4 w-mobile sm:w-median lg:w-large mx-auto flex justify-center" :class="appInfoProvider?.appInfo?.data?.psItemUploadConfig.conditionOfItemId== PsConst.ONE ? 'sm:mt-12 mt-36' : 'sm:mt-12 mt-16'">
                <div @click="showAdvanceSearch = !showAdvanceSearch " class="flex-grow-0 cursor-pointer flex justify-center">
                    <ps-label class="flex-grow-0 text-xs font-medium " textColor="text-primary-500 dark:text-primaryDark-accent" > {{ $t("dashboard__advanced_option") }} </ps-label>
                    <font-awesome-icon v-if="showAdvanceSearch" :icon="['fas', 'chevron-circle-up']" class="text-primary-500 dark:text-primaryDark-accent ms-1 mt-0.5 text-xs"  />
                    <font-awesome-icon v-else :icon="['fas', 'chevron-circle-down']" class="text-primary-500 dark:text-primaryDark-accent ms-1 mt-0.5 text-xs"  />
                </div>
            </div>
            <div v-if="showAdvanceSearch" class="mb-4  w-mobile sm:w-median lg:w-large mx-auto ">
                <div class="grid grid-cols-4 gap-2 sm:gap-3.5 lg:gap-4 mt-4">                            
                    <div class="w-full col-span-4 sm:col-span-2 grid grid-cols-2 gap-x-2 sm:gap-x-3.5 lg:gap-x-4 ">
                        <ps-label class=" col-span-1 font-medium text-sm" textColor="text-secondary-400 dark:text-secondaryDark-grey">  {{ $t("dashboard__price_range") }} </ps-label>
                        <ps-input type="text" class="w-full col-span-1 col-start-1" v-bind:placeholder="$t('dashboard__min')" v-model:value="minPrice" @keypress="checkPrice($event)" />
                        <ps-input type="text" class="w-full col-span-1 " v-bind:placeholder="$t('dashboard__max')" v-model:value="maxPrice" @keypress="checkPrice($event)" />
                     </div>
                     <div v-if="appInfoProvider?.appInfo?.data?.psItemUploadConfig.year== PsConst.ONE" 
                      class="w-full col-span-4 sm:col-span-2 grid grid-cols-2 gap-x-2 sm:gap-x-3.5 lg:gap-x-4 ">
                        <ps-label class=" col-span-1 font-medium text-sm " textColor="text-secondary-400 dark:text-secondaryDark-grey">  {{ $t("dashboard__year") }} </ps-label>
                        <ps-input type="text" class="w-full col-span-1 col-start-1" v-bind:placeholder="$t('dashboard__min')" v-model:value="minYear" @keypress="checkPrice($event)" />
                        <ps-input type="text" class="w-full col-span-1 " v-bind:placeholder="$t('dashboard__max')" v-model:value="maxYear" @keypress="checkPrice($event)" />
                     </div>
                     <div v-else class="col-span-4 sm:col-span-2 flex flex-col sm:grid grid-cols-2 gap-x-2 sm:gap-x-3.5 lg:gap-x-4" >
                         <div class="w-full flex-col">
                            <ps-label class="mt-3 sm:mt-0 lg:text-sm font-medium text-sm" textColor="text-secondary-400 dark:text-secondaryDark-grey"> {{ $t("dashboard__manufacturer") }} </ps-label>
                            <ps-dropdown align="left" class='mt-1  w-full' @onClick="loadManufacturer">
                                <template #select>
                                
                                    <ps-dropdown-select :showCenter="true" :selectedValue="manufacturerName" />
                                    
                                </template>
                                <template #list >
                                    <div
                                        class="rounded-md shadow-xs w-56 " >
                                        <div class="pt-2 z-30 ">
                                            <div v-if="manufacturerProvider.itemList.data == null">
                                                <ps-label class='p-2 flex' @click="loadManufacturer">{{ $t("list__loading") }} </ps-label >
                                            </div>
                                            <div v-else>
                                                <div v-for="selectData in manufacturerProvider.itemList.data" 
                                                :key="selectData.id" 
                                                class="w-56 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  
                                                @click="manufacturerFilterClicked(selectData)" >
                                                    
                                                    <ps-label class="ms-2" :class="selectData.id == manufacturerId ? ' font-bold' : ''"  > {{selectData.name}} </ps-label>
                                                    
                                                </div>
                                            </div>
                                        </div>                                
                                    </div>
                                </template>
                                <template #loadmore>
                                        
                                    <div class="mb-2 w-56">

                                        <div  v-if="manufacturerProvider.itemList.data != null
                                            && manufacturerProvider.loading.value == true" class='mt-4 ms-4 flex'>
                                            <ps-label-caption > {{ $t("list__loading") }}</ps-label-caption>
                                        </div>

                                        <ps-label class="flex mt-4 ms-4 mb-2 underline font-bold cursor-pointer" :class="manufacturerProvider.isNoMoreRecord ? 'hidden' : ''"  @click="loadManufacturer" > {{ $t("list__load_more") }} </ps-label>
                                    </div>
                                    
                                </template>
                            </ps-dropdown>
                        </div>
                         <div class="w-full flex-col">
                            <ps-label class="mt-3 sm:mt-0 lg:text-sm font-medium text-sm" textColor="text-secondary-400 dark:text-secondaryDark-grey"> {{ $t("dashboard__model") }} </ps-label>
                            <ps-dropdown align="left" class='mt-1  w-full' @onClick="loadModel(manufacturerId)" >
                                <template #select>
                                    <ps-dropdown-select :showCenter="true"  :selectedValue="modelName" />
                                </template>
                                <template #filter >
                                    <div class="w-56">
                                        <ps-input-with-right-icon class="rounded-xl flex-1 " @keyup.enter="filterModelUpdate(modelKeyword)" v-model:value="modelKeyword" v-bind:placeholder= "$t('item_list__search_model')" >
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
                                                <div v-if="manufacturerId == ''">
                                                    <ps-label class='p-2 flex' textColor="text-primary-500"> {{ $t("item_entry__select_manufacturer_first") }}</ps-label>
                                                </div>
                                                <div v-else>
                                                    <ps-label class='p-2 flex' @click="loadModel(manufacturerId)" > {{ $t("list__loading") }} </ps-label >
                                                </div>
                                            </div>
                                            <div v-else>
                                                <div v-for="selectSubmanufacturer in modelProvider.modelList.data" :key="selectSubmanufacturer.id" 
                                                class="w-56 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  
                                                @click="modelFilterClicked(selectSubmanufacturer)" >                                            
                                                    <ps-label class="ms-2" :class="selectSubmanufacturer.id == modelId ? ' font-bold' : ''"  > {{selectSubmanufacturer.name}} </ps-label>                                                                                        
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </template>
                                <template #loadmore>
                                        
                                    <div class="mb-2 w-56">

                                        <div  v-if="modelProvider.modelList.data != null
                                            && modelProvider.loading.value == true" class='mt-4 ms-4 flex'>
                                            <ps-label-caption >  {{ $t("list__loading") }} </ps-label-caption>
                                        </div>

                                        <ps-label v-if="manufacturerId != ''" class="flex mt-4 ms-4 mb-2 underline font-bold cursor-pointer" :class="modelProvider.isNoMoreRecord ? 'hidden' : ''"  @click="loadModel(manufacturerId)" >  {{ $t("list__load_more") }} </ps-label>
                                    </div>
                                    
                                </template>
                            </ps-dropdown>
                        </div>
                    </div>
                    
                        
                </div>
                <div class="flex flex-col sm:grid grid-cols-4 gap-x-2 sm:gap-x-3.5 lg:gap-x-4 mt-4">  
                    <div v-if="appInfoProvider?.appInfo?.data?.psItemUploadConfig.fuelTypeId== PsConst.ONE" 
                     class="w-full flex-col">
                        <ps-label class="mt-3 lg:mt-3 lg:text-sm font-medium text-sm" textColor="text-secondary-400 dark:text-secondaryDark-grey"> {{ $t("dashboard__fuel_type") }} </ps-label>
                        
                        <ps-dropdown align="left" class='mt-1 lg:mt-1 w-full ' @onClick="loadFuelType" >
                            <template #select>
                                <ps-dropdown-select :selectedValue="fuelTypeName" />  
                            </template>
                            <template #list >
                                <div class="rounded-md shadow-xs w-56 " >
                                    <div class="pt-2 z-30 ">
                                        <div v-if="fuelTypeProvider.fuelTypeList.data == null">
                                            <ps-label class='p-2 flex' @click="loadFuelType"> {{ $t("list__loading") }} </ps-label>
                                        </div>
                                        <div v-else>
                                            <div class="w-72 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  
                                            @click="fueltypeFilterClicked({id:'', name:'All'})" >
                                                <ps-label class="ms-2" :class="fuelTypeId=='' ? ' font-medium' : 'font-light'"  > {{ $t("dashboard__all") }}  </ps-label>
                                            </div>
                                            <div v-for="selectData in fuelTypeProvider.fuelTypeList.data" 
                                            :key="selectData.id" 
                                            class="w-72 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  
                                            @click="fueltypeFilterClicked(selectData)" >
                                                <ps-label class="ms-2" :class="selectData.id==fuelTypeId ? ' font-medium' : 'font-light'"  > {{selectData.name}} </ps-label>
                                            </div>
                                        </div>
                                    </div>                                        
                                </div>
                            </template>
                            <template #loadmore>
                                
                                <div class="mb-2 w-56">

                                    <div  v-if="fuelTypeProvider.fuelTypeList.data != null
                                        && fuelTypeProvider.loading.value == true" class='mt-4 ms-4 flex'>
                                        <ps-label-caption > {{ $t("list__loading") }} </ps-label-caption>
                                    </div>

                                    <ps-label class="mt-4 ms-4 mb-2 underline font-medium cursor-pointer flex" @click="loadFuelType" > {{ $t("list__load_more") }} </ps-label>
                                </div>
                                
                            </template>
                        </ps-dropdown>
                    </div>
                    <div v-if="appInfoProvider?.appInfo?.data?.psItemUploadConfig.transmissionId== PsConst.ONE" 
                    class="w-full flex-col">
                        <ps-label class="mt-3 lg:mt-3 lg:text-sm font-medium text-sm" textColor="text-secondary-400 dark:text-secondaryDark-grey"> {{ $t("dashboard__transmission") }}  </ps-label>
                        <ps-dropdown align="left" class='mt-1 lg:mt-1 w-full ' @onClick="loadTransmission" >
                            <template #select>
                                <ps-dropdown-select :selectedValue="transmissionName" />  
                            </template>
                            <template #list >
                                <div class="rounded-md shadow-xs w-56 " >
                                    <div class="pt-2 z-30 ">
                                        <div v-if="transmissionProvider.transmissionList.data == null">
                                            <ps-label class='p-2 flex' @click="loadTransmission"> {{ $t("list__loading") }} </ps-label>
                                        </div>
                                        <div v-else>
                                            <div class="w-72 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  
                                            @click="transmissionFilterClicked({id:'', name:'All'})" >
                                                <ps-label class="ms-2" :class="transmissionId=='' ? ' font-medium' : 'font-light'"  > {{ $t("dashboard__all") }}  </ps-label>
                                            </div>
                                            <div v-for="selectData in transmissionProvider.transmissionList.data" 
                                            :key="selectData.id" 
                                            class="w-72 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  
                                            @click="transmissionFilterClicked(selectData)" >
                                                <ps-label class="ms-2" :class="selectData.id==transmissionId ? ' font-medium' : 'font-light'"  > {{selectData.name}} </ps-label>
                                            </div>
                                        </div>
                                    </div>                                    
                                </div>
                            </template>
                            <template #loadmore>
                                
                                <div class="mb-2 w-56">

                                    <div  v-if="transmissionProvider.transmissionList.data != null
                                        && transmissionProvider.loading.value == true" class='mt-4 ms-4 flex'>
                                        <ps-label-caption > {{ $t("list__loading") }} </ps-label-caption>
                                    </div>

                                    <ps-label class="mt-4 ms-4 mb-2 underline font-medium cursor-pointer flex"  @click="loadTransmission" > {{ $t("list__load_more") }} </ps-label>
                                </div>
                                
                            </template>
                        </ps-dropdown>
                    </div>
                    <div v-if="appInfoProvider?.appInfo?.data?.psItemUploadConfig.buildTypeId== PsConst.ONE"
                     class="w-full flex-col">
                        <ps-label class="mt-3 lg:mt-3 lg:text-sm font-medium text-sm" textColor="text-secondary-400 dark:text-secondaryDark-grey"> {{ $t("dashboard__build_type") }}  </ps-label>
                        <ps-dropdown align="left" class='mt-1 lg:mt-1 w-full ' @onClick="loadBuildType" >
                            <template #select>
                                <ps-dropdown-select :selectedValue="buildTypeName" />  
                            </template>
                            <template #list >
                                <div class="rounded-md shadow-xs w-56 " >
                                    <div class="pt-2 z-30 ">
                                        <div v-if="buildTypeProvider.buildTypeList.data == null">
                                            <ps-label class='p-2 flex' @click="loadBuildType"> {{ $t("list__loading") }} </ps-label>
                                        </div>
                                        <div v-else>
                                            <div class="w-72 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  
                                            @click="buildtypeFilterClicked({id:'', name:'All'})" >
                                                <ps-label class="ms-2" :class="buildTypeId=='' ? ' font-medium' : 'font-light'"  > {{ $t("dashboard__all") }}  </ps-label>
                                            </div>
                                            <div v-for="selectData in buildTypeProvider.buildTypeList.data" 
                                            :key="selectData.id" 
                                            class="w-72 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  
                                            @click="buildtypeFilterClicked(selectData)" >
                                                <ps-label class="ms-2" :class="selectData.id==buildTypeId ? ' font-medium' : 'font-light'"  > {{selectData.name}} </ps-label>
                                            </div>
                                        </div>
                                    </div>                                    
                                </div>
                            </template>
                            <template #loadmore>
                                
                                <div class="mb-2 w-56">

                                    <div  v-if="buildTypeProvider.buildTypeList.data != null
                                        && buildTypeProvider.loading.value == true" class='mt-4 ms-4 flex'>
                                        <ps-label-caption > {{ $t("list__loading") }} </ps-label-caption>
                                    </div>

                                    <ps-label class="mt-4 ms-4 mb-2 underline font-medium cursor-pointer flex" @click="loadBuildType" > {{ $t("list__load_more") }} </ps-label>
                                </div>
                                
                            </template>
                        </ps-dropdown>
                    </div>
                    <div  class="w-full flex-col">
                        <ps-label class="mt-3 lg:mt-3 lg:text-sm font-medium text-sm" textColor="text-secondary-400 dark:text-secondaryDark-grey"> {{ $t("dashboard__location") }} </ps-label>
                        <ps-dropdown align="left" class='mt-1 lg:mt-1 w-full ' @onClick="loadLocationList" >
                            <template #select>
                                <ps-dropdown-select :selectedValue="locationName" />                                    
                            </template>
                            <template #list >
                                <div class="rounded-md shadow-xs w-56 " >
                                    <div class="pt-2 z-30">
                                        <div v-if="itemlocationProvider.itemLocationList.data == null">
                                            <ps-label class='p-2 flex' @click="loadLocationList"> {{ $t("list__loading") }} </ps-label>
                                        </div>
                                        <div v-else>
                                            <div 
                                            class="w-72 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  
                                            @click="locationFilterClicked({id:'', name:'All'})" >
                                                <ps-label class="ms-2" :class="locationId=='' ? ' font-medium' : 'font-light'"  > {{ $t("dashboard__all") }}  </ps-label>
                                            </div>
                                            <div v-for="selectData in itemlocationProvider.itemLocationList.data" :key="selectData.id" 
                                            class="w-72 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  
                                            @click="locationFilterClicked(selectData)" >
                                                <ps-label class="ms-2" :class="selectData.id==locationId ? ' font-medium' : 'font-light'"  > {{selectData.name}} </ps-label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <template #loadmore>
                                
                                <div class="mb-2 w-56">

                                    <div  v-if="itemlocationProvider.itemLocationList.data != null
                                        && itemlocationProvider.loading.value == true" class='mt-4 ms-4 flex'>
                                        <ps-label-caption > {{ $t("list__loading") }} </ps-label-caption>
                                    </div>

                                    <ps-label class="mt-4 ms-4 mb-2 underline font-medium cursor-pointer flex"  @click="loadLocationList" > {{ $t("list__load_more") }} </ps-label>
                                </div>
                                
                            </template>
                        </ps-dropdown>
                    </div>

                </div>
            </div>
            
            <div>

                <div class="mb-6 mt-8  w-mobile sm:w-median lg:w-large mx-auto">
                    <div > 
                        <ps-label textColor="text-secondary-600 dark:text-secondaryDark-white" class="text-base sm:text-2xl lg:text-3xl font-medium "  >{{ $t("dashboard__manufacturer_header") }}</ps-label>   
                    </div>
                    <div class="grid lg:grid-cols-6 sm:grid-cols-4 grid-cols-2  gap-2 sm:gap-3.5 lg:gap-4 mt-6 gap-y-4" v-if="manufacturerProvider.itemList.data != null">
                        <div v-for="manufacturer in manufacturerProvider.itemList.data.slice(0,12)" :key="manufacturer.id" class="w-full hidden sm:block">
                            <ps-route-link
                                :to="{name: 'item-list', 
                                query: { 
                                    manufacturer_id: manufacturer.id, 
                                    manufacturer_name: manufacturer.name, } }" > 
                                <manufacturer-horizontal-item :istruncate="true" :manufacturer="manufacturer" />
                            </ps-route-link> 
                        </div>

                        <div v-for="manufacturer in manufacturerProvider.itemList.data.slice(0,8)" :key="manufacturer.id" class="w-full block sm:hidden">
                            <ps-route-link
                                :to="{name: 'item-list', 
                                query: { 
                                    manufacturer_id: manufacturer.id, 
                                    manufacturer_name: manufacturer.name, } }"> 
                                <manufacturer-horizontal-item :istruncate="true" :manufacturer="manufacturer" />
                            </ps-route-link> 
                        </div>
                
                    </div>

                    <div class="flex justify-end mt-4">
                            <ps-route-link :to="{name: 'manufacturer-list'}">
                                <ps-button class="flex flex-row " theme="bg-primary-500 dark:bg-primaryDark-accent text-textLight capitalize px-4 py-1 shadow-buttonShadow hover:shadow-none"> {{ $t("dashboard__view_all") }} 
                                    <ps-icon class="ms-1 mt-1" textColor="text-textLight"  name="arrowNarrowRight" h="20" w="24"/> </ps-button>
                            </ps-route-link>                            
                    </div>
                </div>
            </div>

            <!-- Start feature items -->
            <div  v-if="itempaidProvider.productList?.data != null">
                
                <div class=" mt-8 mb-12 w-mobile sm:w-median lg:w-large mx-auto">
                        
                    <div class="mt-12">
                        <ps-label textColor="text-secondary-600 dark:text-secondaryDark-white" class="text-base sm:text-2xl lg:text-3xl font-medium " > {{ $t("dashboard__feature_items") }} </ps-label> 
                    </div>      
                    <div class="w-full mt-4">
                        <div v-if="itempaidProvider.productList?.data != null">
                            <div class="grid lg:grid-cols-12 sm:grid-cols-3 grid-cols-4  gap-4 sm:gap-3.5 lg:gap-4">

                                <div class="w-full  col-span-4 sm:col-span-1 lg:col-span-3" v-for="item in itempaidProvider.productList.data.slice(0,8)" :key="item.id">

                                    <item-horizontal-item @clickFav="resetDataFeature"  :item="item" />
                                    
                                </div>

                            </div>
                        </div>
                        <div v-else-if="itempaidProvider.productList != null && itempaidProvider.loading.value ">
                           <div class="grid lg:grid-cols-12 sm:grid-cols-3 grid-cols-4  gap-4 sm:gap-3.5 lg:gap-4">
                        
                                <div class="w-full  col-span-4 sm:col-span-1 lg:col-span-3" v-for="i in 10" :key="i">
                                    
                                    <item-horizontal-skeletor-item />
                                    
                                </div>
                        
                            </div>
                        </div>
                    </div>

                <div class="flex justify-end mt-4">
                        <ps-route-link :to="{name: 'item-list', query: paidParams['query'] }" >
                            <ps-button class="flex flex-row " theme="bg-primary-500 dark:bg-primaryDark-accent text-textLight capitalize px-4 py-1 shadow-buttonShadow hover:shadow-none"> 
                                {{ $t("dashboard__view_all") }}
                                <ps-icon class="ms-1 mt-1" textColor="text-textLight" name="arrowNarrowRight" h="20" w="24"/> 
                                </ps-button>
                        </ps-route-link>
                    </div>
                </div>
 
            </div>
            <!-- End feature items -->

            <!-- Start discount items -->
            <div  v-if="discountListProvider.productList?.data != null && appInfoProvider.appInfo.data.psItemUploadConfig.discountRate== PsConst.ONE">
                
                <div class=" mt-12 w-mobile sm:w-median lg:w-large mx-auto">
                
                    <div class="">
                        <ps-label-header-4 class="font-medium " > {{ $t("dashboard__discount_items") }} </ps-label-header-4> 
                    </div>      
                    <div class="w-full mt-4">
                        <div v-if="discountListProvider.productList?.data != null">
                            <div class="grid lg:grid-cols-12 sm:grid-cols-3 grid-cols-4  gap-4 sm:gap-3.5 lg:gap-4">

                                <div class="w-full  col-span-4 sm:col-span-1 lg:col-span-3" v-for="item in discountListProvider.productList.data.slice(0,8)" :key="item.id">

                                    <!-- <ps-route-link :to="{ name: 'item', params: { itemName: item.title.split(' ').join('-').toLowerCase() }, query: { item_id: item.id, item_name: item.title.split(' ').join('-').toLowerCase()  }}"> -->
                                        <item-horizontal-item  @clickFav="resetDataDiscount"  :item="item" />
                                    <!-- </ps-route-link> -->
                                    
                                </div>

                            </div>
                        </div>
                        <div v-else-if="discountListProvider.productList != null && discountListProvider.loading.value ">
                            <div class="grid lg:grid-cols-12 sm:grid-cols-3 grid-cols-4  gap-4 sm:gap-3.5 lg:gap-4">
                        
                                <div class="w-full  col-span-4 sm:col-span-1 lg:col-span-3" v-for="i in 10" :key="i">
                                    
                                    <item-horizontal-skeletor-item />
                                    
                                </div>
                        
                            </div>
                        </div>
                    </div>

                <div class="flex justify-end mt-4">
                        <ps-route-link :to="{name: 'item-list', query: discountParams['query'] }" >
                            <ps-button class="flex flex-row " theme="bg-primary-500 dark:bg-primaryDark-accent text-textLight dark:text-textDark capitalize px-4 py-1"> 
                                {{ $t("dashboard__view_all") }} 
                                <ps-icon class="ms-1 mt-1" textColor="text-textLight dark:text-textDark" name="arrowNarrowRight" h="20" w="24"/> 
                                </ps-button>
                        </ps-route-link>
                    </div>
                </div>
 
            </div>
            <!-- End discount items -->
            
            <!-- Start recent Posts -->
            <div  v-if="itemrecentProvider.itemList?.data != null">
                
               <div class=" mt-8 mb-12 w-mobile sm:w-median lg:w-large mx-auto">
                        
                    <div class="mt-12">
                        <ps-label textColor="text-secondary-600 dark:text-secondaryDark-white" class="text-base sm:text-2xl lg:text-3xl font-medium " > {{ $t("dashboard__recent_items") }} </ps-label> 
                    </div>      
                    <div class="w-full mt-4">
                        <div v-if="itemrecentProvider.itemList?.data != null">
                            <div class="grid lg:grid-cols-12 sm:grid-cols-3 grid-cols-4  gap-4 sm:gap-3.5 lg:gap-4">

                                <div class="w-full  col-span-4 sm:col-span-1 lg:col-span-3" v-for="item in itemrecentProvider.itemList.data.slice(0,8)" :key="item.id">

                                        <item-horizontal-item @clickFav="resetDataRecent" :item="item" />
                                    
                                </div>

                            </div>
                        </div>
                        <div v-else-if="itemrecentProvider.itemList != null && itemrecentProvider.loading.value ">
                            <div class="grid lg:grid-cols-12 sm:grid-cols-3 grid-cols-4  gap-4 sm:gap-3.5 lg:gap-4">
                        
                                <div class="w-full  col-span-4 sm:col-span-1 lg:col-span-3" v-for="i in 10" :key="i">
                                    
                                    <item-horizontal-skeletor-item />
                                    
                                </div>
                        
                            </div>
                        </div>
                    </div>

                <div class="flex justify-end mt-4">
                        <ps-route-link :to="{name: 'item-list', query: recentParams['query'] }" >
                            <ps-button class="flex flex-row " theme="bg-primary-500 dark:bg-primaryDark-accent text-textLight capitalize px-4 py-1 shadow-buttonShadow hover:shadow-none"> 
                                {{ $t("dashboard__view_all") }} 
                                <ps-icon class="ms-1 mt-1" textColor="text-textLight"  name="arrowNarrowRight" h="20" w="24"/> 
                                </ps-button>
                        </ps-route-link>
                    </div>
                </div>

                
                
            </div>
            <!-- End recent Posts -->

            <!-- google adsense desktop view -->

            <div class="w-mobile sm:w-median lg:w-large mx-auto mt-2">
                <ps-ad-sense adFormat="horizontal"></ps-ad-sense>
            </div>

            
            <!-- Start Popular Posts -->
            <div  v-if="itempopularProvider.itemList?.data != null">

                <div class=" mt-8 mb-12 w-mobile sm:w-median lg:w-large mx-auto">
                        
                    <div class="mt-12">
                        <ps-label textColor="text-secondary-600 dark:text-secondaryDark-white" class="text-base sm:text-2xl lg:text-3xl font-medium " > {{ $t("dashboard__popular_items") }}  </ps-label> 
                        
                    </div>
                    <div class="  mt-4">
                        <div v-if="itempopularProvider.itemList?.data != null">
                            <div class="grid lg:grid-cols-12 sm:grid-cols-3 grid-cols-4  gap-4 sm:gap-3.5 lg:gap-4 ">

                                <div class="w-full  col-span-4 sm:col-span-1 lg:col-span-3" v-for="item in itempopularProvider.itemList.data.slice(0,8)" :key="item.id">

                                   
                                        <item-horizontal-item @clickFav="resetDataPopular" :item="item" />

                                </div>
                              
                            </div>
                        </div>
                        <div v-else-if="itempopularProvider.itemList != null && itempopularProvider.loading.value ">
                            <div class="grid lg:grid-cols-12 sm:grid-cols-3 grid-cols-4  gap-4 sm:gap-3.5 lg:gap-4">
                        
                                <div class="w-full  col-span-4 sm:col-span-1 lg:col-span-3" v-for="i in 10" :key="i">
                                    
                                    <item-horizontal-skeletor-item />
                                    
                                </div>
                        
                            </div>
                        </div>

                            <div class="flex justify-end mt-4">
                                <ps-route-link :to="{name: 'item-list', query: popularParams['query'] }" >
                                    <ps-button class="flex flex-row " theme="bg-primary-500 dark:bg-primaryDark-accent text-textLight capitalize px-4 py-1 shadow-buttonShadow hover:shadow-none"> 
                                        {{ $t("dashboard__view_all") }}
                                        <ps-icon class="ms-1 mt-1" textColor="text-textLight" name="arrowNarrowRight" h="20" w="24"/> 
                                        </ps-button>
                                </ps-route-link>
                            </div>
                        

                    </div>
                    
                </div>

            </div>
            <!-- End Popular Posts -->

            <!-- item from followers -->
            <div v-if="itemFollowerProvider.itemList?.data != null" >
                <div class="w-mobile sm:w-median lg:w-large mx-auto mt-12">
                    
                    <ps-label textColor="text-secondary-600 dark:text-secondaryDark-white" class="text-base sm:text-2xl lg:text-3xl font-medium " >  {{ $t("dashboard__items_from_followers") }}  </ps-label> 

                    <div class="">
                        <div class="w-full mt-6" >
                            <div class="">
                                <div v-if="itemFollowerProvider.itemList?.data != null">
                                    <div class="grid lg:grid-cols-12 sm:grid-cols-3 grid-cols-4  gap-4 sm:gap-3.5 lg:gap-4">

                                        <div class="w-full  col-span-4 sm:col-span-1 lg:col-span-3" v-for="item in itemFollowerProvider.itemList.data.slice(0,8)" :key="item.id">
                                    
                                            
                                                <item-horizontal-item @clickFav="resetDataFollower" :item="item" />
                    
                                            
                                        </div>

                                    </div>
                                </div>
                                <div v-else-if="itemFollowerProvider.itemList != null && itemFollowerProvider.loading.value ">
                                    <div class="grid lg:grid-cols-12 sm:grid-cols-3 grid-cols-4  gap-4 sm:gap-3.5 lg:gap-4">
                                
                                        <div class="w-full  col-span-4 sm:col-span-1 lg:col-span-3" v-for="i in 10" :key="i">
                                            
                                            <item-horizontal-skeletor-item />
                                            
                                        </div>
                                
                                    </div>
                                </div>

                            </div>                       

                        </div>

                        <div class="justify-end flex mt-4">
                            <div class="flex-grow-0">
                                <ps-route-link :to="{name: 'follower-items' }" class="flex-grow-0">
                                    <ps-button class="flex flex-row " theme="bg-primary-500 dark:bg-primaryDark-accent text-textLight capitalize px-4 py-1 shadow-buttonShadow hover:shadow-none"> 
                                        {{ $t("dashboard__view_all") }} 
                                        <ps-icon class="ms-1 mt-1" textColor="text-textLight" name="arrowNarrowRight" h="20" w="24"/> 
                                        </ps-button>
                                </ps-route-link>
                            </div>
                        </div>

                    </div>
                    
                    
                </div>
            </div>
            <!-- end item from follower -->
            
            <!-- Start Blog Posts -->
            <div v-if="blogProvider.blogList != null && blogProvider.blogList.data != null">
                <div class="w-mobile sm:w-median lg:w-large mx-auto">
                    <div class="mt-8">
                        <ps-label textColor="text-secondary-600 dark:text-secondaryDark-white" class="text-base sm:text-2xl lg:text-3xl font-medium " > {{ $t("dashboard__sell_your_car_easily") }} </ps-label> 
                    </div>
                        

                    <div class=" pb-10 mt-4">
                        <div class="">
                            <div class="w-full" >
                                <div class="grid lg:grid-cols-12 sm:grid-cols-3 grid-cols-4  gap-4 sm:gap-3.5 lg:gap-4" >
                                    <!-- Column -->
                                    <!-- temporary trancate  -->
                                    <div class="w-full lg:col-span-3 sm:col-span-1 col-span-4 " v-for="blog in blogProvider.blogList.data.slice(0,4)" :key="blog.id" >

                                        
                                        <blog-horizontal-item  :blog="blog" />
                                        
                                        
                                    </div>
                                    <!-- END Column -->

                                </div>
                            </div>

                            <div class="justify-end flex mt-4">
                                <div class="flex-grow-0">
                                    <ps-route-link :to="{ name: 'blog-list'}" class="flex-grow-0">
                                        <ps-button class="flex flex-row " theme="bg-primary-500 dark:bg-primaryDark-accent text-textLight capitalize px-4 py-1 shadow-buttonShadow hover:shadow-none"> 
                                            {{ $t("dashboard__view_all") }} 
                                            <ps-icon class="ms-1 mt-1" textColor="text-textLight " name="arrowNarrowRight" h="20" w="24"/> 
                                            </ps-button>
                                    </ps-route-link>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <!-- End Blog Posts -->
            <!-- Start User List -->
            <div v-if="userProvider.userList != null && userProvider.userList.data != null">
                <div class="w-mobile sm:w-median lg:w-large mx-auto">
                    <div class="mt-8">
                        <ps-label-header-4 class="font-medium " > {{ $t("dashboard__account_list") }} </ps-label-header-4> 
                    </div>
                        

                    <div class=" pb-10 mt-4">
                        <div class="">
                            <div class="w-full" >
                                <div class="grid lg:grid-cols-12 sm:grid-cols-8 grid-cols-4  gap-4 sm:gap-3.5 lg:gap-4" >
                                    <!-- Column -->
                                    <!-- temporary trancate  -->
                                    <div class="w-full col-span-4 " v-for="user in userProvider.userList.data.slice(0,3)" :key="user.userId" >

                                        <!-- <ps-route-link :to="{ name: 'other-profile', params: {user_id: user.userId } }"> -->
                                            <user-search-list-horizontal  @clickFollow="refleshUserData"  :user="user" />
                                        <!-- </ps-route-link> -->
                                        
                                    </div>
                                    <!-- END Column -->

                                </div>
                            </div>

                            <div class="justify-end flex mt-4">
                                <div class="flex-grow-0">
                                    <ps-route-link :to="{ name: 'account-list'}" class="flex-grow-0">
                                        <ps-button class="flex flex-row " theme="bg-primary-500 dark:bg-primaryDark-accent text-textLight dark:text-textDark capitalize px-4 py-1"> 
                                            {{ $t("dashboard__view_all") }} 
                                            <ps-icon class="ms-1 mt-1" textColor="text-textLight dark:text-textDark" name="arrowNarrowRight" h="20" w="24"/> 
                                            </ps-button>
                                    </ps-route-link>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <!-- End User list -->

            <div class=" bg-primary-000 dark:bg-primaryDark-black pb-4">
                <div class="relative w-mobile sm:w-median lg:w-large mx-auto pt-10" >
                    <div class="flex justify-center mb-6">
                    <ps-label textColor="text-secondary-600 dark:text-secondaryDark-white" class="text-2xl sm:text-3xl lg:text-4xl font-medium flex-grow-0"  >{{ $t("dashboard__sell_your_car_easily") }}</ps-label> 
                    </div>
                    <div class=" grid grid-cols-4  gap-2 sm:gap-3.5 lg:gap-4 ">
                        <div class=" opacity-80 flex flex-col items-center w-full col-span-4 sm:col-span-1 my-2  px-1 py-2 lg:p-4 ">
                            <div class=" rounded-full p-2    mb-2">
                                <ps-icon textColor="text-primary-500 dark:text-primaryDark-accent" name="edit" h="32" w="32" />
                            </div>
                            <div class="flex-1 w-full">
                                <div class="  flex justify-center">
                                    <ps-label class="flex-grow-0 py-1 font-medium lg:text-base text-sm" > {{ $t("dashboard__create") }} </ps-label>
                                </div>
                                <ps-label class = " px-10 sm:px-2 text-center  sm:text-xs text-xxs font-light"  > {{ $t("dashboard__create_text") }}  </ps-label>
                            </div>
                        </div>

                        <div class=" opacity-80 flex flex-col items-center w-full col-span-4 sm:col-span-1 my-2  px-1 py-2 lg:p-4 ">
                            <div class="dark:text-primaryDark-accent text-primary-500 mb-2 rounded-full p-2  ">
                                <font-awesome-icon :icon="['fas', 'bullhorn']" class="text-primary-500 dark:text-primaryDark-accent text-2xl " />
                            </div>
                            <div class="flex-1 w-full ">
                                    <div class="  flex justify-center">
                                    <ps-label class="flex-grow-0 py-1 font-medium lg:text-base text-sm" > {{ $t("dashboard__promote") }} </ps-label>
                                </div>
                                <ps-label class = " px-10 sm:px-2 text-center font-light sm:text-xs text-xxs"  > {{ $t("dashboard__promote_text") }}  </ps-label>
                            </div>
                        </div>

                        <div class=" opacity-80 flex flex-col items-center w-full col-span-4 sm:col-span-1 my-2  px-1 py-2 lg:p-4 ">
                            <div class=" mb-2 rounded-full p-2  ">
                                    <ps-icon textColor="text-primary-500 dark:text-primaryDark-accent" name="chat" h="32" w="32" />
                            </div>
                            <div class="flex-1 w-full ">
                                    <div class="  flex justify-center">
                                    <ps-label class="flex-grow-0 py-1 font-medium lg:text-base text-sm" > {{ $t("dashboard__negotiate") }} </ps-label>
                                </div>
                                <ps-label class = " px-10 sm:px-2 text-center  sm:text-xs text-xxs font-light" > {{ $t("dashboard__negotiate_text") }}  </ps-label>
                            </div>
                        </div>

                        <div class=" opacity-80 flex flex-col items-center w-full col-span-4 sm:col-span-1 my-2  px-1 py-2 lg:p-4 ">
                            <div class=" dark:text-primaryDark-accent text-primary-500 mb-2 rounded-full p-2  ">
                                <font-awesome-icon :icon="['fas', 'handshake']" class="text-primary-500 dark:text-primaryDark-accent text-2xl"  />
                            </div>
                            <div class="flex-1 w-full items-center ">
                                    <div class="  flex justify-center">
                                    <ps-label class="flex-grow-0 py-1 font-medium lg:text-base text-sm" > {{ $t("dashboard__accomplished") }} </ps-label>
                                </div>
                                <ps-label class = " px-10 sm:px-2 text-center sm:text-xs text-xxs font-light " > {{ $t("dashboard__accomplished_text") }}  </ps-label>
                            </div>
                        </div>

                        
                    </div>
                    
                </div>
            </div>
        </div>

        <ps-confirm-dialog ref='ps_confirm_dialog' />
        <ps-loading-dialog ref="ps_loading_dialog"  :isClickOut='false'/> 

    </div>
</template>

<script lang="ts">

// Libs
import { ref, defineAsyncComponent, onMounted, onUnmounted } from 'vue';
import 'vue3-carousel/dist/carousel.css';
import { useI18n } from 'vue-i18n';

import router from "@/router";
import PsCoreAuth from "@/global/PsCoreAuth";
import "vue-skeletor/dist/vue-skeletor.css";

// Components
import PsAdSense from '@/components/core/adsense/PsAdSense.vue';
import PsButton from '@/components/core/buttons/PsButton.vue';
import PsLabel from '@/components/core/label/PsLabel.vue';
import PsLabelCaption from '@/components/core/label/PsLabelCaption.vue';
import PsIcon from '@/components/core/icons/PsIcon.vue';
import ManufacturerHorizontalItem from "@/components/modules/manufacturer/ManufacturerHorizontalItem.vue";
import BlogHorizontalItem from "@/components/modules/blog/BlogHorizontalItem.vue";
import ItemHorizontalSkeletorItem from "@/components/modules/item/ItemHorizontalSkeletorItem.vue";
import PsLoadingDialog from '@/components/core/dialog/PsLoadingDialog.vue';
import PsConfirmDialog from '@/components/core/dialog/PsConfirmDialog.vue';
import PsRouteLink from '@/components/core/link/PsRouteLink.vue';
import PsInputWithLeftIcon from '@/components/core/input/PsInputWithLeftIcon.vue';
import PsInput from '@/components/core/input/PsInput.vue';
import PsDropdown from '@/components/core/dropdown/PsDropdown.vue';
import PsDropdownSelect from '@/components/core/dropdown/PsDropdownSelect.vue';
import UserSearchListHorizontal from "@/components/modules/user/UserSearchListHorizontal.vue";


// Providers
import { createItemConditionProviderState } from '@/store/modules/item/ItemConditionProvider';
import { createFuelTypeProviderState } from '@/store/modules/fuelType/FuelTypeProvider';
// import { createManufacturerProviderState } from '@/store/modules/manufacturer/ManufacturerProvider';
import { createModelProviderState } from '@/store/modules/model/ModelProvider';
import { createBuildTypeProviderState } from '@/store/modules/buildType/BuildTypeProvider';
import { createTransmissionProviderState } from '@/store/modules/transmission/TransmissionProvider';
import { useRecentItemProviderState } from "@/store/modules/item/RecentItemProvider";
import { useManufacturerProviderState } from "@/store/modules/manufacturer/ManufacturerProvider";
import { useItemLocationProviderState } from '@/store/modules/itemlocation/ItemLocationProvider';
import { useBlogProviderState } from "@/store/modules/blog/BlogProvider";
import { PsValueProvider } from "@/store/modules/core/PsValueProvider";
import { createProductProviderState } from "@/store/modules/item/ProductProvider";
import { createUserListProviderState } from "@/store/modules/user/UserListProvider";
import { usePsAppInfoProviderState } from '@/store/modules/appinfo/AppInfoProvider';

// Holders
import UserListParameterHolder from '@/object/holder/UserListParameterHolder';
import ModelListParameterHolder from '@/object/holder/ModelListParameterHolder';
import LocationParameterHolder from '@/object/holder/LocationParameterHolder';
import { usePopularItemProviderState } from '@/store/modules/item/PopularItemProvider';
import { useFollowerItemProviderState } from '@/store/modules/item/FollowerItemProvider';
import ProductParameterHolder from '@/object/holder/ProductParameterHolder';
import AppInfoParameterHolder from '@/object/holder/AppInfoParameterHolder';

import PsConfig from '@/config/PsConfig';
import PsConst from '@/object/constant/ps_constants';
import PsUtils from '@/utils/PsUtils';

const ItemHorizontalItem = defineAsyncComponent(() => import('@/components/modules/item/ItemHorizontalItem.vue'))

import { library } from '@fortawesome/fontawesome-svg-core';
import { faBullhorn,faHandshake,faChevronCircleUp,faChevronCircleDown } from '@fortawesome/free-solid-svg-icons'
library.add(faBullhorn,faHandshake,faChevronCircleUp,faChevronCircleDown)

export default {
    name : "DashboardView",
    components: {
        ItemHorizontalItem,
        ManufacturerHorizontalItem,
        UserSearchListHorizontal,
        PsRouteLink,
        PsLabelCaption,
        PsButton,
        PsLabel,
        PsIcon,
        BlogHorizontalItem,
        ItemHorizontalSkeletorItem,
        PsLoadingDialog,
        PsConfirmDialog,
        PsInputWithLeftIcon,
        PsInput,
        PsDropdown,
        PsDropdownSelect,
        PsAdSense
        
    },
    setup() {

        // Inject Provider
        const blogProvider = useBlogProviderState();
        const psValueHolder = PsValueProvider.psValueHolder;
        const ps_loading_dialog = ref();
        const ps_confirm_dialog = ref();

        psValueHolder.updateExpiryTimeForAction(); // only call from dashboard

        const searchKeyword = ref("");
        const showAdvanceSearch = ref(false);
        const minPrice = ref("");
        const maxPrice = ref("");
        const minYear = ref("");
        const maxYear = ref("");
        const fuelTypeId = ref("");
        const fuelTypeName = ref("");
        const manufacturerId = ref("");
        const manufacturerName = ref("");
        const modelId = ref("");
        const modelName = ref("");
        const modelKeyword = ref("");
        const buildTypeId = ref("");
        const buildTypeName = ref("");
        const locationId = ref("");
        const locationName = ref("");
        const transmissionId = ref("");
        const transmissionName = ref("");
        // const locationName = ref(psValueHolder.locationName);
        // const locationId = ref(psValueHolder.locationId);
        const t = useI18n;

        const itemlocationProvider = useItemLocationProviderState();
        const fuelTypeProvider = createFuelTypeProviderState();
        // const manufacturerProvider = createManufacturerProviderState();
        const modelProvider = createModelProviderState();
        const buildTypeProvider = createBuildTypeProviderState();
        const transmissionProvider = createTransmissionProviderState();
        const itemConditionProvider = createItemConditionProviderState();
        const appInfoProvider = usePsAppInfoProviderState();
        const conditionId = ref('');
            const conditionName = ref('');
        
        async function loadCondition(){
            await itemConditionProvider.loadItemConditionList();
            conditionId.value = itemConditionProvider.conditionList.data[0].id;
            conditionName.value = itemConditionProvider.conditionList.data[0].name;
        }
        
        // Inject Item Provider
        const itempopularProvider = usePopularItemProviderState();
        const itemFollowerProvider = useFollowerItemProviderState();
        const itemrecentProvider = useRecentItemProviderState();
        const manufacturerProvider = useManufacturerProviderState();
        const itempaidProvider = createProductProviderState();
        const discountListProvider = createProductProviderState();
        const userProvider = createUserListProviderState();

        itempopularProvider.id = "Id from Dashboard";
        itemFollowerProvider.id = "Id from Dashboard";
        itemrecentProvider.id = "Id from Dashboard";
        const loginUserId = psValueHolder.getLoginUserId();

        const paramHolder = new LocationParameterHolder().getDefaultParameterHolder();
        const paidHolder = new ProductParameterHolder().getPaidItemParameterHolder();
        const discountHolder = new ProductParameterHolder().getDiscountParameterHolder();
        const modelHolder = new ModelListParameterHolder();
        const latitude  =  psValueHolder.locationLat == null || psValueHolder.locationLat == '' ? '0' : psValueHolder.locationLat;
        const longitude =  psValueHolder.locationLng == null || psValueHolder.locationLng == '' ? '0' : psValueHolder.locationLng;
        itemrecentProvider.paramHolder.lat = latitude.toString();
        itemrecentProvider.paramHolder.lng = longitude.toString();
        
        const userListHolder = new UserListParameterHolder();
        // itemrecentProvider.paramHolder.locationId = locationId.value;
        // itemrecentProvider.paramHolder.itemLocationTownship = psValueHolder.subLocationId;
        // itemrecentProvider.paramHolder.locationName = psValueHolder.locationName;
        // itemrecentProvider.paramHolder.itemLocationTownshipName = psValueHolder.subLocationName;
        

        itempopularProvider.paramHolder.lat = latitude.toString();
        itempopularProvider.paramHolder.lng = longitude.toString();
        
        // itempopularProvider.paramHolder.locationId = locationId.value;
        // itempopularProvider.paramHolder.itemLocationTownship = psValueHolder.subLocationId;
        // itempopularProvider.paramHolder.locationName = psValueHolder.locationName;
        // itempopularProvider.paramHolder.itemLocationTownshipName = psValueHolder.subLocationName;   

        // itemFollowerProvider.paramHolder.locationId = locationId.value;
        // itemFollowerProvider.paramHolder.itemLocationTownshipId = psValueHolder.subLocationId;

        const itemListParamHolder = new ProductParameterHolder().getRecentParameterHolder();


        let recentParams = itemrecentProvider.paramHolder.getUrlParamsAndQuery();
        let popularParams = itempopularProvider.paramHolder.getUrlParamsAndQuery();
        let paidParams =  paidHolder.getUrlParamsAndQuery();
        let discountParams =  discountHolder.getUrlParamsAndQuery();

        
        //load Blog List
        blogProvider.paramHolder.locationId = locationId.value;
        PsUtils.log("blog list");
        PsUtils.log(blogProvider.paramHolder);
        
        async function loadData(){
            
            await itempaidProvider.loadPaidProductList(loginUserId,paidHolder);
            await discountListProvider.resetItemList(loginUserId,discountHolder);
            await itemrecentProvider.loadItemList(loginUserId, itemrecentProvider.paramHolder);
            await itempopularProvider.loadItemList(loginUserId, itempopularProvider.paramHolder);
            if(loginUserId != '' && loginUserId != PsConst.NO_LOGIN_USER) {
                itemFollowerProvider.loadItemList(loginUserId, itemFollowerProvider.paramHolder);
                PsUtils.log(itemFollowerProvider);
            }
            PsUtils.log(itemrecentProvider);
            PsUtils.log(itempopularProvider);
        }
        async function resetDataAll(){

            ps_loading_dialog.value.openModal();
            await itempaidProvider.resetPaidProductList(loginUserId,paidHolder);
            await discountListProvider.resetItemList(loginUserId,paidHolder);
            await itempopularProvider.resetProductList(loginUserId, itempopularProvider.paramHolder);
            await itemrecentProvider.resetProductList(loginUserId, itemrecentProvider.paramHolder);
            if(loginUserId != '' && loginUserId != PsConst.NO_LOGIN_USER) {
                await itemFollowerProvider.resetProductList(loginUserId, itemFollowerProvider.paramHolder);
            }      
            await blogProvider.resetBlogList(loginUserId, blogProvider.paramHolder);
            ps_loading_dialog.value.closeModal();
        }
        async function resetDataFeature(){

            ps_loading_dialog.value.openModal();
            await itempaidProvider.refleshPaidProductList(loginUserId,paidHolder);
            
            ps_loading_dialog.value.closeModal();
        }
        async function resetDataRecent(){

            ps_loading_dialog.value.openModal();
            await itemrecentProvider.refleshItemList(loginUserId, itemrecentProvider.paramHolder);
            
            ps_loading_dialog.value.closeModal();
        }
        async function resetDataPopular(){

            ps_loading_dialog.value.openModal();
            await itempopularProvider.refleshItemList(loginUserId, itempopularProvider.paramHolder);
            
            ps_loading_dialog.value.closeModal();
        }
        async function resetDataFollower(){

            ps_loading_dialog.value.openModal();
            await itemFollowerProvider.refleshItemList(loginUserId, itemFollowerProvider.paramHolder);
            
            ps_loading_dialog.value.closeModal();
        }

        function filterModelUpdate(value){
            modelHolder.keyword = value;
            modelProvider.filtermodelUpdate(loginUserId,modelHolder);
        }

        onMounted(async () => {
            loadData();
            
            const appInfoParameterHolder = new AppInfoParameterHolder();
            appInfoParameterHolder.userId = loginUserId;
            await appInfoProvider.loadDeleteHistory(appInfoParameterHolder);
            if(appInfoProvider.appInfo.data.psItemUploadConfig.conditionOfItemId== PsConst.ONE) {
                loadCondition();
            }
            
            itemrecentProvider.paramHolder.mile = appInfoProvider.appInfo.data.frontendConfigSetting.mile;
            itempopularProvider.paramHolder.mile = appInfoProvider.appInfo.data.frontendConfigSetting.mile;

            manufacturerProvider.loadItemList(PsConst.NO_LOGIN_USER, manufacturerProvider.paramHolder);
            
            blogProvider.resetBlogList(loginUserId, blogProvider.paramHolder);
            userProvider.loadUserSearchList( loginUserId, userListHolder);
        });
        onUnmounted(() => {
            PsUtils.log('unmounting success')
        });

        function searchClicked() {
            PsUtils.log("Search : " + searchKeyword.value);

            // Assign Keyword to recent provider
            itemListParamHolder.searchTerm = searchKeyword.value.toString();
            itemListParamHolder.status = '1';
            itemListParamHolder.conditionOfItemId = conditionId.value;
            itemListParamHolder.itemConditionName = conditionName.value;
            itemListParamHolder.minPrice = minPrice.value;
            itemListParamHolder.maxPrice = maxPrice.value;
            itemListParamHolder.minYear = minYear.value;
            itemListParamHolder.maxYear = maxYear.value;

            itemListParamHolder.fuelTypeId = fuelTypeId.value;
            itemListParamHolder.fuelTypeName = fuelTypeName.value;
            itemListParamHolder.manufacturerId = manufacturerId.value;
            itemListParamHolder.manufacturerName = manufacturerName.value;
            itemListParamHolder.modelId = modelId.value;
            itemListParamHolder.modelName = modelName.value;
            itemListParamHolder.transmissionId = transmissionId.value;
            itemListParamHolder.transmissionName = transmissionName.value;
            itemListParamHolder.buildTypeId = buildTypeId.value;
            itemListParamHolder.buildTypeName = buildTypeName.value;
            itemListParamHolder.itemLocationId = locationId.value;
            itemListParamHolder.itemLocationName = locationName.value;

            // Prepare Query and Push to Next Screen
            const params = itemListParamHolder.getUrlParamsAndQuery();
            params['name'] = 'item-list';

            // Clear Search Term
            itemListParamHolder.searchTerm = '';
            
            router.push(params);

            
        }

        function loadLocationList() {

            itemlocationProvider.loadItemLocationList(psValueHolder.getLoginUserId(), paramHolder);
        }

        function onClickcondition(id){
            conditionId.value = id;
            if(id == itemConditionProvider.conditionList.data[0].id){
                conditionName.value = itemConditionProvider.conditionList.data[0].name;
            }else if(id == itemConditionProvider.conditionList.data[1].id){
                conditionName.value = itemConditionProvider.conditionList.data[1].name;
            }else{
                conditionName.value = "Not Found";
            }
        }
        function checkPrice(e) {

            const char = String.fromCharCode(e.keyCode); // Get the character
            if(/^[0-9]+$/.test(char)) return true; // Match with regex 
            else e.preventDefault(); // If not match, don't add to input text 
            
        }
        function loadFuelType() {
            fuelTypeProvider.loadFuelTypeList( );
        }
        function loadManufacturer(){
            manufacturerProvider.loadItemList(PsConst.NO_LOGIN_USER, manufacturerProvider.paramHolder);
        }
        function loadModel(manufacturerId) { 
            modelProvider.loadModelList(manufacturerId);      
        }
        function loadBuildType() {
            buildTypeProvider.loadBuildTypeList( );
        }
        function loadTransmission() {
            transmissionProvider.loadTransmissionList( );
        }
        function fueltypeFilterClicked(value) {
            
            fuelTypeId.value = value.id;
            fuelTypeName.value = value.name;

        }
        function modelFilterClicked(value) {
            
            modelId.value = value.id;
            modelName.value = value.name;

        }
        function manufacturerFilterClicked(value) {
            
            modelHolder.manufacturerId = value.id;
            manufacturerId.value = value.id;
            manufacturerName.value = value.name;
            modelId.value = '';
            modelName.value = '';
            modelProvider.offset = 0;

        }
        function buildtypeFilterClicked(value) {
            
            buildTypeId.value = value.id;
            buildTypeName.value = value.name;

        }
        function locationFilterClicked(value) {
            
            locationId.value = value.id;
            locationName.value = value.name;


        }
        function transmissionFilterClicked(value) {
            
            transmissionId.value = value.id;
            transmissionName.value = value.name;

        }
        async function refleshUserData(){

            ps_loading_dialog.value.openModal();
            await userProvider.refleshUserSearchList( loginUserId,userListHolder);

            
            ps_loading_dialog.value.closeModal();
        }
        async function resetDataDiscount(){
            ps_loading_dialog.value.openModal();
            await discountListProvider.refleshItemList(loginUserId,paidHolder);
            
            ps_loading_dialog.value.closeModal();
        }

        return {
            resetDataDiscount,
            refleshUserData,
            discountListProvider,
            filterModelUpdate,
            manufacturerProvider,
            modelProvider,
            PsCoreAuth,
            itempopularProvider,
            itemFollowerProvider,
            itemrecentProvider,
            appInfoProvider,
            PsValueProvider,
            blogProvider,
            itempaidProvider,
            itemlocationProvider,
            userProvider,
            searchKeyword,
            searchClicked,
            loadLocationList,
            recentParams,
            popularParams,
            paidParams,
            discountParams,
            ps_loading_dialog,
            ps_confirm_dialog,
            loginUserId,
            resetDataAll,
            resetDataRecent,
            resetDataPopular,
            resetDataFollower,
            resetDataFeature,
            PsConst,
            conditionId,
            onClickcondition,
            showAdvanceSearch,
            minPrice,
            maxPrice,
            minYear,
            maxYear,
            checkPrice,
            loadFuelType,
            loadManufacturer,
            loadModel,
            loadBuildType,
            loadTransmission,
            fuelTypeProvider,
            buildTypeProvider,
            transmissionProvider,
            transmissionFilterClicked,
            locationFilterClicked,
            buildtypeFilterClicked,
            fueltypeFilterClicked,
            modelFilterClicked,
            manufacturerFilterClicked,
            fuelTypeId,
            fuelTypeName,
            manufacturerName,
            manufacturerId,
            modelId,
            modelKeyword,
            modelName,
            buildTypeId,
            buildTypeName,
            locationId,
            locationName,
            transmissionId,
            transmissionName,
            t,
            PsConfig
        };
    },
};
</script>