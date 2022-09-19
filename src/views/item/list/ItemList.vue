<template>
<div>
    <div class="w-mobile sm:w-median lg:w-large mx-auto sm:mt-32 lg:mt-36 mt-28 mb-16">
        <div>
            <div class="flex flex-col ">
                <div class="flex items-center "> 
                    <ps-route-link
                        :to="{name: 'dashboard'}"> 
                        <ps-label textColor="text-secondary-400 dark:text-secondaryDark-grey "
                            class="hover:underline cursor-pointer font-medium text-xxs"> 
                                {{ $t("item_list__home") }}
                        </ps-label>      
                    </ps-route-link>
                    
                    <div v-if="itemProvider.paramHolder.manufacturerId.length > 1" class="flex items-center">
                        <ps-icon name="rightArrow" class='text-secondary-400 dark:text-secondaryDark-white mx-0 sm:mx-2'/>
                    
                        <ps-label @click="manufacturerFilterClicked({id:itemProvider.paramHolder.manufacturerId, name:itemProvider.paramHolder.manufacturerName})" 
                            textColor="text-secondary-400 dark:text-secondaryDark-grey " class="hover:underline cursor-pointer font-medium text-xxs"> 
                            {{ itemProvider.paramHolder.manufacturerName }}
                        </ps-label>  
                    </div>    
                    
                    <div v-if="itemProvider.paramHolder.modelId.length > 1 " class="flex items-center">
                        <ps-icon name="rightArrow" class='text-secondary-400 dark:text-secondaryDark-white mx-0 sm:mx-2'/>
                        
                        <ps-label textColor="text-secondary-400 dark:text-secondaryDark-grey "
                            class=" font-medium text-xxs"> 
                                {{ itemProvider.paramHolder.modelName }}
                        </ps-label>
                    </div>

                </div>
                   
            </div>

            <div class="relative">

                <div class="flex flex-row justify-between">
                    <div v-if="itemProvider.paramHolder.conditionOfItemId == PsConst.USED_CONDITION_ID && appInfoProvider?.appInfo.data?.psItemUploadConfig?.conditionOfItemId == PsConst.ONE" class=" mb-6 lg:mb-8 h-6">
                        <ps-label class="lg:text-2xl text-xl font-medium sm:text-xl" > {{ $t("item_list__used_cars") }} </ps-label>
                    </div>
                    <div v-else-if="itemProvider.paramHolder.conditionOfItemId == PsConst.NEW_CONDITION_ID && appInfoProvider?.appInfo.data?.psItemUploadConfig?.conditionOfItemId == PsConst.ONE"  class=" mb-6 lg:mb-8 h-6">
                        <ps-label class="lg:text-2xl text-xl font-medium sm:text-xl" > {{ $t("item_list__new_cars") }} </ps-label>
                    </div>
                    <div v-else-if="currentsorting.name == 'Popular'" class=" mb-6 lg:mb-8 h-6">
                        <ps-label class="lg:text-2xl text-xl font-medium sm:text-xl" > {{ $t("item_list__popular_now") }} </ps-label>
                    </div>
                    <div v-else-if="currentsorting.name == 'Latest'" class=" mb-6 lg:mb-8 h-6">
                        <ps-label class="lg:text-2xl text-xl font-medium sm:text-xl" > {{ $t("item_list__new_to_market") }} </ps-label>
                    </div>
                    <div v-else class=" mb-6 lg:mb-8 h-6">
                        <ps-label class="lg:text-2xl text-xl font-medium sm:text-xl" > {{ $t("item_list__let_s_explore") }} </ps-label>
                    </div>
                    <div v-if="!showFilter" class="flex sm:hidden">
                        <div class=" bg-white pt-3 px-3 border border-primary-500 " @click="toggleShowFilter">
                            <!-- For Mobile -->
                            <font-awesome-icon :icon="['fas', 'filter']" class="text-primary-500 dark:text-primaryDark-accent text-xs "  />
                        </div>
                    </div>

                   
                </div>
                <!-- start user keyword search -->
                <div class="flex  justify-between mb-2">
                    <div> </div>
                    <div class="flex content-center items-center mt-2">   

                        <div class="w-40 sm:w-68 h-10">
                            <ps-input type="text" class="w-full" name="search" v-bind:placeholder="$t('item_list__user_search')" v-model:value="userListHolder.keyword" @keyup.enter="usernameFilterClicked" />
                        </div>
                        
                        <ps-dropdown align="left" class="ms-2 w-31 h-10">
                            <template #select>
                                <ps-label class=" h-full">
                                    <button
                                    type="button"
                                    class="inline-flex items-center content-start justify-between w-full h-10 
                                    px-4  bg-primary-000 text-sm leading-5 font-medium text-secondary-500 
                                    hover:text-secondary-400 focus:outline-none focus:border-blue-300 
                                    focus:shadow-outline-blue active:bg-gray-100 active:text-secondary-600 transition 
                                    ease-in-out duration-150 btn-focus
                                    dark:bg-primaryDark-black dark:border-backgrounddark-500   "
                                    aria-haspopup="true"
                                    aria-expanded="true">
                                    <font-awesome-icon :icon="['fas', 'filter']" class="text-sm  "  />
                                    <ps-label class=" text-start text-xs sm:text-xxs lg:text-xs mx-2"> {{activeSortingName ? activeSortingName : 'Sorting'}} </ps-label>
                                    <ps-icon textColor="text-secondary-400 dark:text-secondaryDark-grey" name="downArrow"   />
                                    </button>
                                </ps-label>                      
                            </template>
                            <template #list >
                                <div class="rounded-md shadow-xs w-56 " >
                                    <div class="pt-2 z-30">
                                    
                                        <div>
                                           
                                            <div v-for="sort in usersorting" :key="sort.id" 
                                                class="w-72 flex py-4 px-2 hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer items-center"  
                                                    @click="usersortingFilterClicked(sort)" >
                                                <ps-label class="ms-2" :class="sort.id==activeSortingId ? ' font-medium' : 'font-light'"  > {{sort.name}} </ps-label>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </template>
                        </ps-dropdown>

                    </div>
                   
                </div>
                <!-- end user keyword search -->
                <div class="pb-2 sm:pt-0 grid lg:grid-cols-12 sm:grid-cols-8 grid-cols-4  gap-4 sm:gap-3.5 lg:gap-4 ">

                    <!-- Filter For Normal and Large Screen -->
                    <div class='w-full lg:col-span-3 sm:col-span-2 col-span-2 hidden sm:flex flex-col' >
                        
                        <div class="flex flex-row items-center justify-between w-full">
                            <ps-label class="font-medium text-md lg:text-xl"> {{ $t("item_list__filter_by") }} </ps-label>
                            
                            <ps-label class="font-light cursor-pointer text-xs" textColor="text-primary-500 dark:text-primaryDark-accent" @click="clearAllFilter"> {{ $t("item_list__clear_filter") }} </ps-label>
                        </div>

                        <div class="w-full flex flex-col">
                            <ps-label class="mt-3 lg:mt-3 text-xs font-medium ">  {{ $t("item_list__sorting") }} </ps-label>
                            <div class="flex flex-row w-full text-sm font-medium">
                                <ps-radio v-for=" selectData  in itemProvider.paramHolder.sortingList" 
                                    :key="selectData.id" 
                                    :value="selectData" 
                                    v-model:selectedValue="currentsorting"
                                    :title="selectData.name" 
                                    :onChange = "sortingFilterClicked"
                                    class="text-sm lg:me-6 sm:me-2 mt-1 lg:mt-1"></ps-radio>
                            </div>
                        </div>

                        <div class="w-full flex flex-row" v-if="appInfoProvider?.appInfo.data?.psItemUploadConfig?.discountRate == PsConst.ONE">
                            <ps-checkbox-value title="" 
                            class="mt-3 lg:mt-3 text-xs font-medium " v-model:value="isDiscount" 
                            @click="isDiscountFilterClicked" />
                            <ps-label  class="mt-3 lg:mt-3 text-xs font-medium ">{{ $t("item_list__is_discount") }}</ps-label>
                        </div>

                        <div class="w-full">
                            <ps-label class="mt-3 lg:mt-3 text-xs font-medium ">  {{ $t("item_list__name") }} </ps-label>
                            <ps-input type="text" class="w-full mt-1 lg:mt-1 lg:text-sm text-xs" v-bind:placeholder="$t('item_list__name')" v-model:value="itemProvider.paramHolder.searchTerm" @keyup.enter="nameFilterClicked" />
                        </div>

                        <!-- Price Range -->
                        <div class="w-full">
                            
                            <ps-label class="mt-3 lg:mt-3 text-xs font-medium ">  {{ $t("item_list__price_range") }} </ps-label>
                            <ps-input type="text" class="w-full mt-1" v-bind:placeholder="$t('item_list__min')" v-model:value="itemProvider.paramHolder.minPrice" @keypress="checkPrice($event)" @keyup.enter="pricerangeItemFilterClicked" />
                            <ps-input type="text" class="w-full mt-1" v-bind:placeholder="$t('item_list__max')" v-model:value="itemProvider.paramHolder.maxPrice" @keypress="checkPrice($event)" @keyup.enter="pricerangeItemFilterClicked"/>
    
                        </div>

                        <div class="w-full" v-if="appInfoProvider?.appInfo.data?.psItemUploadConfig?.year == PsConst.ONE">
                            
                            <ps-label class="mt-3 lg:mt-3 text-xs font-medium ">  {{ $t("item_list__year") }} </ps-label>
                            <ps-input type="text" class="w-full mt-1" v-bind:placeholder="$t('item_list__min')" v-model:value="itemProvider.paramHolder.minYear" @keypress="checkPrice($event)" @keyup.enter="yearFilterClicked" />
                            <ps-input type="text" class="w-full mt-1" v-bind:placeholder="$t('item_list__max')" v-model:value="itemProvider.paramHolder.maxYear" @keypress="checkPrice($event)" @keyup.enter="yearFilterClicked"/>
    
                        </div>
                        
                        <!-- Manufacturer -->
                        <ps-label class="mt-3 lg:mt-3 text-xs font-medium "> {{ $t("item_list__manufacturer") }} </ps-label>
                        <ps-dropdown align="left" class='mt-1 lg:mt-1 w-full ' @onClick="loadManufacturer" >
                            <template #select>
                                <ps-dropdown-select :selectedValue="itemProvider.paramHolder.manufacturerName" />                                    
                            </template>
                            <template #list >
                                <div class="rounded-md shadow-xs w-56 " >
                                    <div class="pt-2 z-30">
                                        <div v-if="manufacturerProvider.itemList.data == null">
                                            <ps-label class='p-2 flex' @click="loadManufacturer"> {{ $t("list__loading") }} </ps-label>
                                        </div>
                                        <div v-else>
                                            <div 
                                            class="w-72 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  
                                            @click="manufacturerFilterClicked({id:'', name:'All'})" >
                                                <ps-label class="ms-2 text-xs" :class="itemProvider.paramHolder.manufacturerId=='' ? ' font-medium' : 'font-light'"  > {{ $t("item_list__all") }}  </ps-label>
                                            </div>
                                            <div v-for="selectData in manufacturerProvider.itemList.data" :key="selectData.id" 
                                            class="w-72 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  
                                            @click="manufacturerFilterClicked(selectData)" >
                                                <ps-label class="ms-2 text-xs" :class="selectData.id==itemProvider.paramHolder.manufacturerId ? ' font-medium' : 'font-light'"  > {{selectData.name}} </ps-label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <template #loadmore>
                                
                                <div class="mb-2 w-56">

                                    <div  v-if="manufacturerProvider.itemList.data != null
                                        && manufacturerProvider.loading.value == true" class='mt-4 ms-4 flex'>
                                        <ps-label-caption > {{ $t("list__loading") }} </ps-label-caption>
                                    </div>

                                    <ps-label class="mt-4 ms-4 mb-2 underline font-medium cursor-pointer flex" :class="manufacturerProvider.isNoMoreRecord ? 'hidden' : ''"  @click="loadManufacturer" > {{ $t("list__load_more") }} </ps-label>
                                </div>
                                
                            </template>
                        </ps-dropdown>
                        
                        <!-- for sub manufacturer dropdown -->
                        <ps-dropdown align="left" class='mt-1' @click="loadModel(itemProvider.paramHolder.manufacturerId)" >
                            <template #select>
                                <ps-dropdown-select :selectedValue="itemProvider.paramHolder.modelName
                                " />                                    
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
                                <div class="rounded-md shadow-xs w-56 " >
                                    <div class="pt-2 z-30 ">
                                        <div v-if="modelProvider.modelList.data == null">
                                            <ps-label class='p-2 flex' > {{ $t("list__loading") }} </ps-label>
                                        </div>
                                        <div v-else>
                                            <div class="w-72 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  
                                            @click="modelFilterClicked({id:'', name:'All'})" >
                                                <ps-label class="ms-2 text-xs" :class="itemProvider.paramHolder.modelId=='' ? ' font-medium' : 'font-light'"  > {{ $t("item_list__all") }}  </ps-label>
                                            </div>
                                            <div v-for="selectSubCat in modelProvider.modelList.data" :key="selectSubCat.id" 
                                            class="w-72 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  
                                                @click="modelFilterClicked(selectSubCat)" >
                                                <ps-label class="ms-2 text-xs" :class="selectSubCat.id==itemProvider.paramHolder.modelId ? ' font-medium' : 'font-light'"  > {{selectSubCat.name}} </ps-label>
                                            </div>
                                        </div>
                                    </div>                                        
                                </div>
                            </template>
                            <template #loadmore>
                                
                                <div class="mb-2 w-56">

                                    <div  v-if="modelProvider.modelList.data != null
                                        && modelProvider.loading.value == true" class='mt-4 ms-4 flex'>
                                        <ps-label-caption > {{ $t("list__loading") }} </ps-label-caption>
                                    </div>

                                    <ps-label class="mt-4 ms-4 mb-2 underline font-medium cursor-pointer flex" :class="modelProvider.isNoMoreRecord ? 'hidden' : ''"  @click="loadModel(itemProvider.paramHolder.manufacturerId)" > {{ $t("list__load_more") }} </ps-label>
                                </div>
                                
                            </template>
                        </ps-dropdown>
                        <!-- end sub manufacturer -->
  
                        <!-- Item Conditions -->
                        <div class="w-full" v-if="appInfoProvider?.appInfo.data?.psItemUploadConfig?.conditionOfItemId == PsConst.ONE">
                        <ps-label class="mt-3 lg:mt-3 text-xs font-medium "> {{ $t("item_list__item_condition") }} </ps-label>
                        
                        <ps-dropdown align="left" class='mt-1 lg:mt-1 w-full ' @onClick="loadCondition" >
                            <template #select>
                                <ps-dropdown-select :selectedValue="itemProvider.paramHolder.itemConditionName" />  
                            </template>
                            <template #list >
                                <div class="rounded-md shadow-xs w-56 " >
                                    <div class="pt-2 z-30 ">
                                        <div v-if="itemConditionProvider.conditionList.data == null">
                                            <ps-label class='p-2 flex' @click="loadCondition"> {{ $t("list__loading") }} </ps-label>
                                        </div>
                                        <div v-else>
                                            <div class="w-72 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  
                                            @click="conditionFilterClicked({id:'', name:'All'})" >
                                                <ps-label class="ms-2 text-xs" :class="itemProvider.paramHolder.conditionOfItemId=='' ? ' font-medium' : 'font-light'"  > {{ $t("item_list__all") }}  </ps-label>
                                            </div>
                                            <div v-for="itemcondition in itemConditionProvider.conditionList.data" 
                                            :key="itemcondition.id" 
                                            class="w-72 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  
                                            @click="conditionFilterClicked(itemcondition)" >
                                                <ps-label class="ms-2 text-xs" :class="itemcondition.id==itemProvider.paramHolder.conditionOfItemId ? ' font-medium' : 'font-light'"  > {{itemcondition.name}} </ps-label>
                                            </div>
                                        </div>
                                    </div>                                        
                                </div>
                            </template>
                            <template #loadmore>
                                
                                <div class="mb-2 w-56">

                                    <div  v-if="itemConditionProvider.conditionList.data != null
                                        && itemConditionProvider.loading.value == true" class='mt-4 ms-4 flex'>
                                        <ps-label-caption > {{ $t("list__loading") }} </ps-label-caption>
                                    </div>

                                    <ps-label class="mt-4 ms-4 mb-2 underline font-medium cursor-pointer flex" :class="itemConditionProvider.isNoMoreRecord ? 'hidden' : ''"  @click="loadCondition" > {{ $t("list__load_more") }} </ps-label>
                                </div>
                                
                            </template>
                        </ps-dropdown>
                        </div>


                        <!-- Type -->
                        <div class="w-full" v-if="appInfoProvider?.appInfo.data?.psItemUploadConfig?.itemTypeId == PsConst.ONE">
                        <ps-label class="mt-3 lg:mt-3 text-xs font-medium "> {{ $t("item_list__type") }}  </ps-label>
                        <ps-dropdown align="left" class='mt-1 lg:mt-1 w-full ' @onClick="loadItemType" >
                            <template #select>
                                <ps-dropdown-select :selectedValue="itemProvider.paramHolder.itemTypeName" />  
                            </template>
                            <template #list >
                                <div class="rounded-md shadow-xs w-56 " >
                                    <div class="pt-2 z-30 ">
                                        <div v-if="itemTypeProvider.itemTypeList.data == null">
                                            <ps-label class='p-2 flex' @click="loadItemType"> {{ $t("list__loading") }} </ps-label>
                                        </div>
                                        <div v-else>
                                            <div class="w-72 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  
                                            @click="itemtypeFilterClicked({id:'', name:'All'})" >
                                                <ps-label class="ms-2 text-xs" :class="itemProvider.paramHolder.itemTypeId=='' ? ' font-medium' : 'font-light'"  > {{ $t("item_list__all") }}  </ps-label>
                                            </div>
                                            <div v-for="selectData in itemTypeProvider.itemTypeList.data" 
                                            :key="selectData.id" 
                                            class="w-72 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  
                                            @click="itemtypeFilterClicked(selectData)" >
                                                <ps-label class="ms-2 text-xs" :class="selectData.id==itemProvider.paramHolder.itemTypeId ? ' font-medium' : 'font-light'"  > {{selectData.name}} </ps-label>
                                            </div>
                                        </div>
                                    </div>                                    
                                </div>
                            </template>
                            <template #loadmore>
                                
                                <div class="mb-2 w-56">

                                    <div  v-if="itemTypeProvider.itemTypeList.data != null
                                        && itemTypeProvider.loading.value == true" class='mt-4 ms-4 flex'>
                                        <ps-label-caption > {{ $t("list__loading") }} </ps-label-caption>
                                    </div>

                                    <ps-label class="mt-4 ms-4 mb-2 underline font-medium cursor-pointer flex"   @click="loadItemType" :class="itemTypeProvider.isNoMoreRecord ? 'hidden' : ''" > {{ $t("list__load_more") }} </ps-label>
                                </div>
                                
                            </template>
                        </ps-dropdown>
                        </div>

                         <!-- Color -->
                         <div class="w-full" v-if="appInfoProvider?.appInfo.data?.psItemUploadConfig?.colorId == PsConst.ONE">
                        <ps-label class="mt-3 lg:mt-3 text-xs font-medium "> {{ $t("item_list__color") }}  </ps-label>
                        <ps-dropdown align="left" class='mt-1 lg:mt-1 w-full ' @onClick="loadColor" >
                            <template #select>
                                <ps-dropdown-select :selectedValue="itemProvider.paramHolder.colorValue" />  
                            </template>
                            <template #list >
                                <div class="rounded-md shadow-xs w-56 " >
                                    <div class="pt-2 z-30 ">
                                        <div v-if="colorProvider.itemColorList.data == null">
                                            <ps-label class='p-2 flex' @click="loadColor"> {{ $t("list__loading") }} </ps-label>
                                        </div>
                                        <div v-else>
                                            <div class="w-72 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  
                                            @click="colorFilterClicked({id:'', colorValue:'All'})" >
                                                <ps-label class="ms-2 text-xs" :class="itemProvider.paramHolder.colorId=='' ? ' font-medium' : 'font-light'"  > {{ $t("item_list__all") }}  </ps-label>
                                            </div>
                                            <div v-for="selectData in colorProvider.itemColorList.data" 
                                            :key="selectData.id" 
                                            class="w-72 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  
                                            @click="colorFilterClicked(selectData)" >
                                                <ps-label class="ms-2 text-xs" :class="selectData.id==itemProvider.paramHolder.colorId ? ' font-medium' : 'font-light'"  > {{selectData.colorValue}} </ps-label>
                                            </div>
                                        </div>
                                    </div>                                    
                                </div>
                            </template>
                            <template #loadmore>
                                
                                <div class="mb-2 w-56">

                                    <div  v-if="colorProvider.itemColorList.data != null
                                        && colorProvider.loading.value == true" class='mt-4 ms-4 flex'>
                                        <ps-label-caption > {{ $t("list__loading") }} </ps-label-caption>
                                    </div>

                                    <ps-label class="mt-4 ms-4 mb-2 underline font-medium cursor-pointer flex"   @click="loadColor" :class="colorProvider.isNoMoreRecord ? 'hidden' : ''" > {{ $t("list__load_more") }} </ps-label>
                                </div>
                                
                            </template>
                        </ps-dropdown>
                        </div>

                        <!--Fuel Type -->
                         <div class="w-full" v-if="appInfoProvider?.appInfo.data?.psItemUploadConfig?.fuelTypeId == PsConst.ONE">
                        <ps-label class="mt-3 lg:mt-3 text-xs font-medium "> {{ $t("item_list__fuel_type") }}  </ps-label>
                        <ps-dropdown align="left" class='mt-1 lg:mt-1 w-full ' @onClick="loadFuelType" >
                            <template #select>
                                <ps-dropdown-select :selectedValue="itemProvider.paramHolder.fuelTypeName" />  
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
                                                <ps-label class="ms-2 text-xs" :class="itemProvider.paramHolder.fuelTypeId=='' ? ' font-medium' : 'font-light'"  > {{ $t("item_list__all") }}  </ps-label>
                                            </div>
                                            <div v-for="selectData in fuelTypeProvider.fuelTypeList.data" 
                                            :key="selectData.id" 
                                            class="w-72 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  
                                            @click="fueltypeFilterClicked(selectData)" >
                                                <ps-label class="ms-2 text-xs" :class="selectData.id==itemProvider.paramHolder.fuelTypeId ? ' font-medium' : 'font-light'"  > {{selectData.name}} </ps-label>
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

                                    <ps-label class="mt-4 ms-4 mb-2 underline font-medium cursor-pointer flex"   @click="loadFuelType" :class="fuelTypeProvider.isNoMoreRecord ? 'hidden' : ''"> {{ $t("list__load_more") }} </ps-label>
                                </div>
                                
                            </template>
                        </ps-dropdown>
                        </div>

                        <!--Buld Type -->
                         <div class="w-full" v-if="appInfoProvider?.appInfo.data?.psItemUploadConfig?.buildTypeId == PsConst.ONE">
                        <ps-label class="mt-3 lg:mt-3 text-xs font-medium "> {{ $t("item_list__build_type") }}  </ps-label>
                        <ps-dropdown align="left" class='mt-1 lg:mt-1 w-full ' @onClick="loadBuildType" >
                            <template #select>
                                <ps-dropdown-select :selectedValue="itemProvider.paramHolder.buildTypeName" />  
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
                                                <ps-label class="ms-2 text-xs" :class="itemProvider.paramHolder.buildTypeId=='' ? ' font-medium' : 'font-light'"  > {{ $t("item_list__all") }}  </ps-label>
                                            </div>
                                            <div v-for="selectData in buildTypeProvider.buildTypeList.data" 
                                            :key="selectData.id" 
                                            class="w-72 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  
                                            @click="buildtypeFilterClicked(selectData)" >
                                                <ps-label class="ms-2 text-xs" :class="selectData.id==itemProvider.paramHolder.buildTypeId ? ' font-medium' : 'font-light'"  > {{selectData.name}} </ps-label>
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

                                    <ps-label class="mt-4 ms-4 mb-2 underline font-medium cursor-pointer flex"   @click="loadBuildType" :class="buildTypeProvider.isNoMoreRecord ? 'hidden' : ''"> {{ $t("list__load_more") }} </ps-label>
                                </div>
                                
                            </template>
                        </ps-dropdown>
                        </div>
                        <!--Seller Type -->
                         <div class="w-full" v-if="appInfoProvider?.appInfo.data?.psItemUploadConfig?.sellerTypeId == PsConst.ONE">
                        <ps-label class="mt-3 lg:mt-3 text-xs font-medium "> {{ $t("item_list__seller_type") }}  </ps-label>
                        <ps-dropdown align="left" class='mt-1 lg:mt-1 w-full ' @onClick="loadSellerType" >
                            <template #select>
                                <ps-dropdown-select :selectedValue="itemProvider.paramHolder.sellerTypeName" />  
                            </template>
                            <template #list >
                                <div class="rounded-md shadow-xs w-56 " >
                                    <div class="pt-2 z-30 ">
                                        <div v-if="sellerTypeProvider.sellerTypeList.data == null">
                                            <ps-label class='p-2 flex' @click="loadSellerType"> {{ $t("list__loading") }} </ps-label>
                                        </div>
                                        <div v-else>
                                            <div class="w-72 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  
                                            @click="sellertypeFilterClicked({id:'', name:'All'})" >
                                                <ps-label class="ms-2 text-xs" :class="itemProvider.paramHolder.sellerTypeId=='' ? ' font-medium' : 'font-light'"  > {{ $t("item_list__all") }}  </ps-label>
                                            </div>
                                            <div v-for="selectData in sellerTypeProvider.sellerTypeList.data" 
                                            :key="selectData.id" 
                                            class="w-72 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  
                                            @click="sellertypeFilterClicked(selectData)" >
                                                <ps-label class="ms-2 text-xs" :class="selectData.id==itemProvider.paramHolder.sellerTypeId ? ' font-medium' : 'font-light'"  > {{selectData.name}} </ps-label>
                                            </div>
                                        </div>
                                    </div>                                    
                                </div>
                            </template>
                            <template #loadmore>
                                
                                <div class="mb-2 w-56">

                                    <div  v-if="sellerTypeProvider.sellerTypeList.data != null
                                        && sellerTypeProvider.loading.value == true" class='mt-4 ms-4 flex'>
                                        <ps-label-caption > {{ $t("list__loading") }} </ps-label-caption>
                                    </div>

                                    <ps-label class="mt-4 ms-4 mb-2 underline font-medium cursor-pointer flex" :class="sellerTypeProvider.isNoMoreRecord ? 'hidden' : ''"  @click="loadSellerType" > {{ $t("list__load_more") }} </ps-label>
                                </div>
                                
                            </template>
                        </ps-dropdown>
                        </div>

                        <!-- Transmission -->
                        <div class="w-full" v-if="appInfoProvider?.appInfo.data?.psItemUploadConfig?.transmissionId == PsConst.ONE">
                        <ps-label class="mt-3 lg:mt-3 text-xs font-medium "> {{ $t("item_list__transmission") }}  </ps-label>
                        <ps-dropdown align="left" class='mt-1 lg:mt-1 w-full ' @onClick="loadTransmission" >
                            <template #select>
                                <ps-dropdown-select :selectedValue="itemProvider.paramHolder.transmissionName" />  
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
                                                <ps-label class="ms-2 text-xs" :class="itemProvider.paramHolder.transmissionId=='' ? ' font-medium' : 'font-light'"  > {{ $t("item_list__all") }}  </ps-label>
                                            </div>
                                            <div v-for="selectData in transmissionProvider.transmissionList.data" 
                                            :key="selectData.id" 
                                            class="w-72 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  
                                            @click="transmissionFilterClicked(selectData)" >
                                                <ps-label class="ms-2 text-xs" :class="selectData.id==itemProvider.paramHolder.transmissionId ? ' font-medium' : 'font-light'"  > {{selectData.name}} </ps-label>
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

                                    <ps-label class="mt-4 ms-4 mb-2 underline font-medium cursor-pointer flex" :class="transmissionProvider.isNoMoreRecord ? 'hidden' : ''"  @click="loadTransmission" > {{ $t("list__load_more") }} </ps-label>
                                </div>
                                
                            </template>
                        </ps-dropdown>
                        </div>

                        <!-- Price Type -->
                        <div class="w-full" v-if="appInfoProvider?.appInfo.data?.psItemUploadConfig?.itemPriceTypeId == PsConst.ONE">
                        <ps-label class="mt-3 lg:mt-3 text-xs font-medium "> {{ $t("item_list__price_type") }} </ps-label>
                        <ps-dropdown align="left" class='mt-1 lg:mt-1 w-full ' @onClick="loadItemPriceType" >
                            <template #select>
                                <ps-dropdown-select :selectedValue="itemProvider.paramHolder.itemPriceTypeName" />  
                            </template>
                            <template #list >
                                <div class="rounded-md shadow-xs w-56 " >
                                    <div class="pt-2 z-30 ">
                                        <div v-if="itemPriceTypeProvider.itemPriceTypeList.data == null">
                                            <ps-label class='p-2 flex' @click="loadItemPriceType"> {{ $t("list__loading") }} </ps-label>
                                        </div>
                                        <div v-else>
                                            <div class="w-72 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  
                                            @click="itemPriceTypeFilterClicked({id:'', name:'All'})" >
                                                <ps-label class="ms-2 text-xs" :class="itemProvider.paramHolder.itemPriceTypeId=='' ? ' font-medium' : 'font-light'"  > {{ $t("item_list__all") }}  </ps-label>
                                            </div>
                                            <div v-for="itempricetype in itemPriceTypeProvider.itemPriceTypeList.data" 
                                            :key="itempricetype.id" 
                                            class="w-72 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  
                                            @click="itemPriceTypeFilterClicked(itempricetype)" >
                                                <ps-label class="ms-2 text-xs" :class="itempricetype.id==itemProvider.paramHolder.itemPriceTypeId ? ' font-medium' : 'font-light'"  > {{itempricetype.name}} </ps-label>
                                            </div>
                                        </div>
                                    </div>                                        
                                </div>
                            </template>
                            <template #loadmore>
                                
                                <div class="mb-2 w-56">

                                    <div  v-if="itemPriceTypeProvider.itemPriceTypeList.data != null
                                        && itemPriceTypeProvider.loading.value == true" class='mt-4 ms-4 flex'>
                                        <ps-label-caption > {{ $t("list__loading") }} </ps-label-caption>
                                    </div>

                                    <ps-label class="mt-4 ms-4 mb-2 underline font-medium cursor-pointer flex"   @click="loadItemPriceType" :class="itemPriceTypeProvider.isNoMoreRecord ? 'hidden' : ''" > {{ $t("list__load_more") }} </ps-label>
                                </div>
                                
                            </template>
                        </ps-dropdown>
                        </div>

                        <!-- Sold item -->
                        
                        <ps-label class="mt-3 lg:mt-3 text-xs font-medium "> {{ $t("item_list__sold_item") }} </ps-label>
                        <ps-dropdown align="left" class='mt-1 lg:mt-1'>
                            <template #select>
                                <ps-dropdown-select :selectedValue="soldItemName" />  
                            </template>
                            <template #list >
                                <div class="rounded-md shadow-xs w-56 " >
                                    <div class="pt-2 z-30 ">
                                        <div v-if="soldOutItem == null">
                                            <ps-label class='p-2 flex'> {{ $t("list__loading") }} </ps-label>
                                        </div>
                                        <div v-else>
                                            <div class="w-72 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  
                                            @click="soldItemFilterClicked({id:'', name:'All'})" >
                                                <ps-label class="ms-2 text-xs" :class="soldItemId =='' ? ' font-medium' : 'font-light'"  > {{ $t("item_list__all") }}  </ps-label>
                                            </div>
                                            <div v-for="sold in soldOutItem" 
                                            :key="sold.id" 
                                            class="w-72 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  
                                            @click="soldItemFilterClicked(sold)" >
                                                <ps-label class="ms-2 text-xs" :class="sold.id==soldItemId ? ' font-medium' : 'font-light'"  > {{sold.name}} </ps-label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </ps-dropdown>
                        <!-- end item sold -->
                        
                        <!-- Location -->
                        <ps-label class="mt-3 lg:mt-3 text-xs font-medium "> {{ $t("item_list__location") }} </ps-label>
                        <ps-dropdown align="left" class='mt-1 lg:mt-1 w-full ' @onClick="loadLocation" >
                            <template #select>
                                <ps-dropdown-select :selectedValue="itemProvider.paramHolder.itemLocationName" />                                    
                            </template>
                            <template #list >
                                <div class="rounded-md shadow-xs w-56 " >
                                    <div class="pt-2 z-30">
                                        <div v-if="itemlocationProvider.itemLocationList.data == null">
                                            <ps-label class='p-2 flex' @click="loadLocation"> {{ $t("list__loading") }} </ps-label>
                                        </div>
                                        <div v-else>
                                            <div 
                                            class="w-72 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  
                                            @click="itemlocFilterClicked('', 'All')" >
                                                <ps-label class="ms-2 text-xs" :class="itemProvider.paramHolder.itemLocationId=='' ? ' font-medium' : 'font-light'"  > {{ $t("item_list__all") }}  </ps-label>
                                            </div>
                                            <div v-for="selectData in itemlocationProvider.itemLocationList.data" :key="selectData.id" 
                                            class="w-72 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  
                                            @click="itemlocFilterClicked(selectData.id, selectData.name)" >
                                                <ps-label class="ms-2 text-xs" :class="selectData.id==itemProvider.paramHolder.itemLocationId ? ' font-medium' : 'font-light'"  > {{selectData.name}} </ps-label>
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

                                    <ps-label class="mt-4 ms-4 mb-2 underline font-medium cursor-pointer flex" :class="itemlocationProvider.isNoMoreRecord ? 'hidden' : ''"  @click="loadLocation" > {{ $t("list__load_more") }} </ps-label>
                                </div>
                                
                            </template>
                        </ps-dropdown>
                                
                        <!-- for sub Location -->
                        <ps-dropdown align="left" class='mt-1 ' @click="loadSubLocation(itemProvider.paramHolder.itemLocationId)" v-if="appInfoProvider.appInfo.data?.psAppSetting?.isSubLocation == '1'">
                            <template #select>
                                <ps-dropdown-select :selectedValue="itemProvider.paramHolder.itemLocationTownshipName
                                " />                                    
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
                                <div class="rounded-md shadow-xs w-56 " >
                                    <div class="pt-2 z-30 ">
                                        <div v-if="subLocationProvider.locationTownshipList.data == null">
                                            <ps-label class='p-2 flex' > {{ $t("list__loading") }} </ps-label>
                                        </div>
                                        <div v-else>
                                            <div class="w-72 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  
                                            @click="subLocFilterClicked({id:'', name:'All'})" >
                                                <ps-label class="ms-2 text-xs" :class="itemProvider.paramHolder.itemLocationTownship=='' ? ' font-medium' : 'font-light'"  > {{ $t("item_list__all") }}  </ps-label>
                                            </div>
                                            <div v-for="selectSubLoc in subLocationProvider.locationTownshipList.data" :key="selectSubLoc.id" 
                                            class="w-72 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  
                                                @click="subLocFilterClicked(selectSubLoc)" >
                                                <ps-label class="ms-2 text-xs" :class="selectSubLoc.id==itemProvider.paramHolder.itemLocationTownship ? ' font-medium' : 'font-light'"  > {{selectSubLoc.townshipName}} </ps-label>
                                            </div>
                                        </div>
                                    </div>                                        
                                </div>
                            </template>
                            <template #loadmore>
                                
                                <div class="mb-2 w-56">

                                    <div  v-if="subLocationProvider.locationTownshipList.data != null
                                        && subLocationProvider.loading.value == true" class='mt-4 ms-4 flex'>
                                        <ps-label-caption > {{ $t("list__loading") }} </ps-label-caption>
                                    </div>

                                    <ps-label class="mt-4 ms-4 mb-2 underline font-medium cursor-pointer flex"  :class="subLocationProvider.isNoMoreRecord ? 'hidden' : ''"  @click="loadSubLocation(itemProvider.paramHolder.itemLocationId)" > {{ $t("list__load_more") }} </ps-label>
                                </div>
                                
                            </template>
                        </ps-dropdown>
                        <!-- end sub Location -->

                        <ps-label @click="mapFilterClicked()" class=" mt-3 lg:mt-3 w-full cursor-pointer bg-primary-500 dark:bg-primaryDark-accent  py-3 text-center text-xs lg:text-sm" textColor="text-textLight "> 
                            <font-awesome-icon :icon="['fas', 'map-marked-alt']" class="text-textLight text-lg me-2"  />
                                {{ $t("item_list__pick_location") }}
                        </ps-label>
  
                                
                        <ps-button theme="bg-primary-500 dark:bg-primaryDark-accent text-textLight py-3" class="w-full text-center mt-5 lg:mt-8 mb-2" @click="filterButtonClicked"> {{ $t("item_list__filter") }} </ps-button>
                                

                    </div>
                    <!-- End Filter For Normal and Large Screen -->

                    <!-- Content -->
                    <div class=' mt-12 lg:mt-0 lg:col-span-9 sm:col-span-6 col-span-4' > 

                         <div class="grid lg:grid-cols-9 grid-cols-12 gap-4 mb-4" v-if="userProvider.userList?.data != null">
                            <div class="col-span-3 w-full" v-for="user in userProvider.userList.data" :key="user.userId">
                                <ps-route-link :to="{ name: 'other-profile', params: {user_id: user.userId } }">
                                <div class="flex w-full flex-col">
                                    <img alt="Placeholder"  width="30px" height="30px"  class="rounded-full w-16 h-16 lg:w-24 lg:h-24 object-cover mx-auto" :src="userProvider.imageUrl(user ? user.userProfilePhoto : '',2)" @error="userProvider.defaultProfileImage" >
                                    <div class="flex flex-col mt-2 lg:mt-3 justify-center"> 
                                        <ps-label class=" text-center lg:text-sm text-xs font-medium"> {{  user ? user.userName:'' }} </ps-label>
                                        <img v-if="user != null && user.isVerifybluemark == '1'" alt="Placeholder" class="mx-1 w-4 h-4 object-fill" width="15px" height="10px" src="@/assets/images/mark2.png" >
                                    </div>
                                </div>
                                </ps-route-link>
                            </div>
                        </div>
                            
                        <div class="grid grid-cols-6 gap-4 sm:gap-3.5 lg:gap-4">
                           
                            <div class="col-span-6 w-full" v-if="itemProvider.productList?.code.toString() == notDataCode && itemProvider.productList.data == null">
                                <div class="flex flex-col text-center content-center">
                                    <ps-label-title class="mt-16"> {{ $t("list__no_result") }} </ps-label-title>
                                    <ps-label class="mt-2 mb-112 sm:mb-20"> {{ $t("list__adjust_the_filter_message") }} </ps-label>
                                </div>
                            </div>
                                
                            <!-- Column -->
                            <div class="col-span-6 sm:col-span-3 lg:col-span-2 w-full" v-for="item in itemProvider.productList.data" :key="item.id">
                                
                                <item-horizontal-item  @clickFav="refleshData" :item="item" class="infobox-item-properties" />
                                    
                            </div>
                            <!-- END Column -->

                        </div>
                       
                        <div v-if="itemProvider.productList?.code != null && itemProvider.productList?.code.toString() != notDataCode ">
                            
                            <div class="flex flex-wrap justify-center"> 
                                <ps-button v-if="itemProvider.loading.value == false" theme="bg-primary-500 dark:bg-primaryDark-accent text-textLight " class="w-60 mx-auto mt-8" @click="loadItemList" :class="itemProvider.isNoMoreRecord ? 'hidden' : ''"> {{ $t("list__load_more") }} </ps-button>
                                <ps-button v-else class="w-60 mx-auto mt-8" theme="bg-primary-500 dark:bg-primaryDark-accent text-textLight " @click="loadItemList" :disabled="true">{{ $t("list__loading") }}</ps-button>
                            </div>
                        </div>

                    </div>
                    <!-- End Content -->

                    <!-- Filter For Small Screen -->
                    <div class='w-mobile sm:w-median lg:w-large mx-auto absolute sm:hidden' >

                        <div class=" cursor-pointer"  >
                            <transition @enter="enter" @leave="leave">
                                <div class="flex flex-col w-full h-auto bg-background dark:bg-backgroundDark border border-primary-500" v-if="showFilter">
                                    <div class=" flex justify-end p-2 " @click="toggleShowFilter">
                                        <!-- For Mobile -->
                                        <font-awesome-icon :icon="['fas', 'times']" class="text-primary-500 dark:text-primaryDark-accent text-sm "  />
                                    </div>
                                    <div class='flex flex-col w-full  px-14 pb-3 pt-2' >
                                        
                                        <div class="flex flex-row items-center justify-between w-full">
                                            <ps-label class="font-medium text-base">  {{ $t("item_list__filter_by") }} </ps-label>
                                            
                                            <ps-label class="font-light cursor-pointer text-xs" textColor="text-primary-500 dark:text-primaryDark-accent" @click="clearAllFilter"> {{ $t("item_list__clear_filter") }} </ps-label>
                                        </div>

                                        <div class="w-full flex flex-col">
                                            <ps-label class="mt-4 font-medium text-xs ">  {{ $t("item_list__sorting") }} </ps-label>
                                            <div class="flex flex-row w-full mt-1 text-sm font-medium">
                                                <ps-radio v-for=" selectData  in itemProvider.paramHolder.sortingList" 
                                                    :key="selectData.id" 
                                                    :value="selectData" 
                                                    v-model:selectedValue="currentsorting"
                                                    :title="selectData.name" 
                                                    :onChange = "sortingFilterClicked"
                                                    class="text-sm  mt-1 me-2"></ps-radio>
                                            </div>
                                        </div>

                                        <div class="w-full flex flex-row" v-if="appInfoProvider?.appInfo.data?.psItemUploadConfig?.discountRate == PsConst.ONE">
                                            <ps-checkbox-value title="" 
                                            class="mt-3 lg:mt-3 text-xs font-medium " v-model:value="isDiscount" 
                                            @click="isDiscountFilterClicked" />
                                            <ps-label  class="mt-3 lg:mt-3 text-xs font-medium ">{{ $t("item_list__is_discount") }}</ps-label>
                                        </div>

                                        <div class="w-full">
                                            <ps-label class="mt-4 font-medium text-xs ">  {{ $t("item_list__name") }} </ps-label>
                                            <ps-input type="text" class="w-full mt-1 text-xs" v-bind:placeholder="$t('item_list__name')" v-model:value="itemProvider.paramHolder.searchTerm" @keyup.enter="nameFilterClicked" />
                                        </div>

                                        <!-- Price Range -->
                                        <div class="w-full">
                                            
                                            <ps-label class="mt-4 font-medium text-xs ">  {{ $t("item_list__price_range") }} </ps-label>
                                            <ps-input type="text" class="w-full" v-bind:placeholder="$t('item_list__min')" v-model:value="itemProvider.paramHolder.minPrice" @keypress="checkPrice($event)" @keyup.enter="pricerangeItemFilterClicked" />
                                            <ps-input type="text" class="w-full mt-1" v-bind:placeholder="$t('item_list__max')" v-model:value="itemProvider.paramHolder.maxPrice" @keypress="checkPrice($event)" @keyup.enter="pricerangeItemFilterClicked"/>
                                            
                                        </div>
                                        <div class="w-full" v-if="appInfoProvider?.appInfo.data?.psItemUploadConfig?.year == PsConst.ONE">
                                
                                            <ps-label class="mt-4 font-medium text-xs ">  {{ $t("item_list__year") }} </ps-label>
                                            <ps-input type="text" class="w-full mt-1" v-bind:placeholder="$t('item_list__min')" v-model:value="itemProvider.paramHolder.minYear" @keypress="checkPrice($event)" @keyup.enter="yearFilterClicked" />
                                            <ps-input type="text" class="w-full mt-1" v-bind:placeholder="$t('item_list__max')" v-model:value="itemProvider.paramHolder.maxYear" @keypress="checkPrice($event)" @keyup.enter="yearFilterClicked"/>
                    
                                        </div>
                                        
                                        <!-- Manufacturer -->
                                        <ps-label class="mt-4 font-medium text-xs "> {{ $t("item_list__manufacturer") }} </ps-label>
                                        <ps-dropdown align="right" class='mt-1 w-full' @onClick="loadManufacturer" >
                                            <template #select>
                                                <ps-dropdown-select :selectedValue="itemProvider.paramHolder.manufacturerName" />                                    
                                            </template>
                                            <template #list >
                                                <div class="rounded-md shadow-xs w-56 " >
                                                    <div class="pt-2 z-30">
                                                        <div v-if="manufacturerProvider.itemList.data == null">
                                                            <ps-label class='p-2 flex' @click="loadManufacturer"> {{ $t("list__loading") }} </ps-label>
                                                        </div>
                                                        <div v-else>
                                                            <div 
                                                            class="w-72 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  
                                                            @click="manufacturerFilterClicked({id:'', name:'All'})" >
                                                                <ps-label class="ms-2 text-xs" :class="itemProvider.paramHolder.manufacturerId=='' ? ' font-medium' : 'font-light'"  > {{ $t("item_list__all") }}  </ps-label>
                                                            </div>
                                                            <div v-for="selectData in manufacturerProvider.itemList.data" :key="selectData.id" 
                                                            class="w-72 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  
                                                            @click="manufacturerFilterClicked(selectData)" >
                                                                <ps-label class="ms-2 text-xs" :class="selectData.id==itemProvider.paramHolder.manufacturerId ? ' font-medium' : 'font-light'"  > {{selectData.name}} </ps-label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </template>
                                            <template #loadmore>
                                                
                                                <div class="mb-2 w-56">

                                                    <div  v-if="manufacturerProvider.itemList.data != null
                                                        && manufacturerProvider.loading.value == true" class='mt-4 ms-4 flex'>
                                                        <ps-label-caption > {{ $t("list__loading") }} </ps-label-caption>
                                                    </div>

                                                    <ps-label class="mt-4 ms-4 mb-2 underline font-medium cursor-pointer flex" :class="manufacturerProvider.isNoMoreRecord ? 'hidden' : ''" @click="loadManufacturer" > {{ $t("list__load_more") }} </ps-label>
                                                </div>
                                                
                                            </template>
                                        </ps-dropdown>
                                        
                                        <!-- for model dropdown -->
                                        <ps-dropdown align="right" class='mt-1 w-full' @click="loadModel(itemProvider.paramHolder.manufacturerId)" >
                                            <template #select>
                                                <ps-dropdown-select :selectedValue="itemProvider.paramHolder.modelName
                                                " />                                    
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
                                                <div class="rounded-md shadow-xs w-56 " >
                                                    <div class="pt-2 z-30 ">
                                                        <div v-if="modelProvider.modelList.data == null">
                                                            <ps-label class='p-2 flex' > {{ $t("list__loading") }} </ps-label>
                                                        </div>
                                                        <div v-else>
                                                            <div class="w-72 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  
                                                            @click="modelFilterClicked({id:'', name:'All'})" >
                                                                <ps-label class="ms-2 text-xs" :class="itemProvider.paramHolder.modelId=='' ? ' font-medium' : 'font-light'"  > {{ $t("item_list__all") }}  </ps-label>
                                                            </div>
                                                            <div v-for="selectSubCat in modelProvider.modelList.data" :key="selectSubCat.id" 
                                                            class="w-72 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  
                                                                @click="modelFilterClicked(selectSubCat)" >
                                                                <ps-label class="ms-2 text-xs" :class="selectSubCat.id==itemProvider.paramHolder.modelId ? ' font-medium' : 'font-light'"  > {{selectSubCat.name}} </ps-label>
                                                            </div>
                                                        </div>
                                                    </div>                                        
                                                </div>
                                            </template>
                                            <template #loadmore>
                                                
                                                <div class="mb-2 w-56">

                                                    <div  v-if="modelProvider.modelList.data != null
                                                        && modelProvider.loading.value == true" class='mt-4 ms-4 flex'>
                                                        <ps-label-caption > {{ $t("list__loading") }} </ps-label-caption>
                                                    </div>

                                                    <ps-label class="mt-4 ms-4 mb-2 underline font-medium cursor-pointer flex" :class="modelProvider.isNoMoreRecord ? 'hidden' : ''"  @click="loadModel(itemProvider.paramHolder.manufacturerId)" > {{ $t("list__load_more") }} </ps-label>
                                                </div>
                                                
                                            </template>
                                        </ps-dropdown>
                                        <!-- end model -->
            
                                        <!-- Item Conditions -->
                                        <div class="w-full" v-if="appInfoProvider?.appInfo.data?.psItemUploadConfig?.conditionOfItemId == PsConst.ONE">
                                        <ps-label class="mt-4 font-medium text-xs "> {{ $t("item_list__item_condition") }} </ps-label>
                                        
                                        <ps-dropdown align="right" class='mt-1 w-full ' @onClick="loadCondition" >
                                            <template #select>
                                                <ps-dropdown-select :selectedValue="itemProvider.paramHolder.itemConditionName" />  
                                            </template>
                                            <template #list >
                                                <div class="rounded-md shadow-xs w-56 " >
                                                    <div class="pt-2 z-30 ">
                                                        <div v-if="itemConditionProvider.conditionList.data == null">
                                                            <ps-label class='p-2 flex' @click="loadCondition"> {{ $t("list__loading") }} </ps-label>
                                                        </div>
                                                        <div v-else>
                                                            <div class="w-72 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  
                                                            @click="conditionFilterClicked({id:'', name:'All'})" >
                                                                <ps-label class="ms-2 text-xs" :class="itemProvider.paramHolder.conditionOfItemId=='' ? ' font-medium' : 'font-light'"  > {{ $t("item_list__all") }}  </ps-label>
                                                            </div>
                                                            <div v-for="itemcondition in itemConditionProvider.conditionList.data" 
                                                            :key="itemcondition.id" 
                                                            class="w-72 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  
                                                            @click="conditionFilterClicked(itemcondition)" >
                                                                <ps-label class="ms-2 text-xs" :class="itemcondition.id==itemProvider.paramHolder.conditionOfItemId ? ' font-medium' : 'font-light'"  > {{itemcondition.name}} </ps-label>
                                                            </div>
                                                        </div>
                                                    </div>                                        
                                                </div>
                                            </template>
                                            <template #loadmore>
                                                
                                                <div class="mb-2 w-56">

                                                    <div  v-if="itemConditionProvider.conditionList.data != null
                                                        && itemConditionProvider.loading.value == true" class='mt-4 ms-4 flex'>
                                                        <ps-label-caption > {{ $t("list__loading") }} </ps-label-caption>
                                                    </div>

                                                    <ps-label class="mt-4 ms-4 mb-2 underline font-medium cursor-pointer flex" :class="itemConditionProvider.isNoMoreRecord ? 'hidden' : ''"  @click="loadCondition" > {{ $t("list__load_more") }} </ps-label>
                                                </div>
                                                
                                            </template>
                                        </ps-dropdown>
                                        </div>

                                        <!-- Type -->
                                        <div class="w-full" v-if="appInfoProvider?.appInfo.data?.psItemUploadConfig?.itemTypeId == PsConst.ONE">
                                        <ps-label class="mt-4 font-medium text-xs "> {{ $t("item_list__type") }}  </ps-label>
                                        <ps-dropdown align="right" class='mt-1 w-full ' @onClick="loadItemType" >
                                            <template #select>
                                                <ps-dropdown-select :selectedValue="itemProvider.paramHolder.itemTypeName" />  
                                            </template>
                                            <template #list >
                                                <div class="rounded-md shadow-xs w-56 " >
                                                    <div class="pt-2 z-30 ">
                                                        <div v-if="itemTypeProvider.itemTypeList.data == null">
                                                            <ps-label class='p-2 flex' @click="loadItemType"> {{ $t("list__loading") }} </ps-label>
                                                        </div>
                                                        <div v-else>
                                                            <div class="w-72 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  
                                                            @click="itemtypeFilterClicked({id:'', name:'All'})" >
                                                                <ps-label class="ms-2 text-xs" :class="itemProvider.paramHolder.itemTypeId=='' ? ' font-medium' : 'font-light'"  > {{ $t("item_list__all") }}  </ps-label>
                                                            </div>
                                                            <div v-for="selectData in itemTypeProvider.itemTypeList.data" 
                                                            :key="selectData.id" 
                                                            class="w-72 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  
                                                            @click="itemtypeFilterClicked(selectData)" >
                                                                <ps-label class="ms-2 text-xs" :class="selectData.id==itemProvider.paramHolder.itemTypeId ? ' font-medium' : 'font-light'"  > {{selectData.name}} </ps-label>
                                                            </div>
                                                        </div>
                                                    </div>                                    
                                                </div>
                                            </template>
                                            <template #loadmore>
                                                
                                                <div class="mb-2 w-56">

                                                    <div  v-if="itemTypeProvider.itemTypeList.data != null
                                                        && itemTypeProvider.loading.value == true" class='mt-4 ms-4 flex'>
                                                        <ps-label-caption > {{ $t("list__loading") }} </ps-label-caption>
                                                    </div>

                                                    <ps-label class="mt-4 ms-4 mb-2 underline font-medium cursor-pointer flex" :class="itemTypeProvider.isNoMoreRecord ? 'hidden' : ''"  @click="loadItemType" > {{ $t("list__load_more") }} </ps-label>
                                                </div>
                                                
                                            </template>
                                        </ps-dropdown>
                                        </div>

                                        <!-- Color -->
                                         <div class="w-full" v-if="appInfoProvider?.appInfo.data?.psItemUploadConfig?.colorId == PsConst.ONE">
                                        <ps-label class="mt-4 font-medium text-xs "> {{ $t("item_list__color") }}  </ps-label>
                                        <ps-dropdown align="left" class='mt-1 w-full ' @onClick="loadColor" >
                                            <template #select>
                                                <ps-dropdown-select :selectedValue="itemProvider.paramHolder.colorValue" />  
                                            </template>
                                            <template #list >
                                                <div class="rounded-md shadow-xs w-56 " >
                                                    <div class="pt-2 z-30 ">
                                                        <div v-if="colorProvider.itemColorList.data == null">
                                                            <ps-label class='p-2 flex' @click="loadColor"> {{ $t("list__loading") }} </ps-label>
                                                        </div>
                                                        <div v-else>
                                                            <div class="w-72 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  
                                                            @click="colorFilterClicked({id:'', colorValue:'All'})" >
                                                                <ps-label class="ms-2 text-xs" :class="itemProvider.paramHolder.colorId=='' ? ' font-medium' : 'font-light'"  > {{ $t("item_list__all") }}  </ps-label>
                                                            </div>
                                                            <div v-for="selectData in colorProvider.itemColorList.data" 
                                                            :key="selectData.id" 
                                                            class="w-72 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  
                                                            @click="colorFilterClicked(selectData)" >
                                                                <ps-label class="ms-2 text-xs" :class="selectData.id==itemProvider.paramHolder.colorId ? ' font-medium' : 'font-light'"  > {{selectData.colorValue}} </ps-label>
                                                            </div>
                                                        </div>
                                                    </div>                                    
                                                </div>
                                            </template>
                                            <template #loadmore>
                                                
                                                <div class="mb-2 w-56">

                                                    <div  v-if="colorProvider.itemColorList.data != null
                                                        && colorProvider.loading.value == true" class='mt-4 ms-4 flex'>
                                                        <ps-label-caption > {{ $t("list__loading") }} </ps-label-caption>
                                                    </div>

                                                    <ps-label class="mt-4 ms-4 mb-2 underline font-medium cursor-pointer flex"   :class="colorProvider.isNoMoreRecord ? 'hidden' : ''" @click="loadColor" > {{ $t("list__load_more") }} </ps-label>
                                                </div>
                                                
                                            </template>
                                        </ps-dropdown>
                                        </div>

                                        <!--Fuel Type -->
                                        <div class="w-full" v-if="appInfoProvider?.appInfo.data?.psItemUploadConfig?.fuelTypeId == PsConst.ONE">
                                        <ps-label class="mt-4 font-medium text-xs "> {{ $t("item_list__fuel_type") }}  </ps-label>
                                        <ps-dropdown align="left" class='mt-1 w-full ' @onClick="loadFuelType" >
                                            <template #select>
                                                <ps-dropdown-select :selectedValue="itemProvider.paramHolder.fuelTypeName" />  
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
                                                                <ps-label class="ms-2 text-xs" :class="itemProvider.paramHolder.fuelTypeId=='' ? ' font-medium' : 'font-light'"  > {{ $t("item_list__all") }}  </ps-label>
                                                            </div>
                                                            <div v-for="selectData in fuelTypeProvider.fuelTypeList.data" 
                                                            :key="selectData.id" 
                                                            class="w-72 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  
                                                            @click="fueltypeFilterClicked(selectData)" >
                                                                <ps-label class="ms-2 text-xs" :class="selectData.id==itemProvider.paramHolder.fuelTypeId ? ' font-medium' : 'font-light'"  > {{selectData.name}} </ps-label>
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

                                                    <ps-label class="mt-4 ms-4 mb-2 underline font-medium cursor-pointer flex" :class="fuelTypeProvider.isNoMoreRecord ? 'hidden' : ''"  @click="loadFuelType" > {{ $t("list__load_more") }} </ps-label>
                                                </div>
                                                
                                            </template>
                                        </ps-dropdown>
                                        </div>

                                        <!--Buld Type -->
                                         <div class="w-full" v-if="appInfoProvider?.appInfo.data?.psItemUploadConfig?.buildTypeId == PsConst.ONE">
                                        <ps-label class="mt-4 font-medium text-xs "> {{ $t("item_list__build_type") }}  </ps-label>
                                        <ps-dropdown align="left" class='mt-1 w-full ' @onClick="loadBuildType" >
                                            <template #select>
                                                <ps-dropdown-select :selectedValue="itemProvider.paramHolder.buildTypeName" />  
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
                                                                <ps-label class="ms-2 text-xs" :class="itemProvider.paramHolder.buildTypeId=='' ? ' font-medium' : 'font-light'"  > {{ $t("item_list__all") }}  </ps-label>
                                                            </div>
                                                            <div v-for="selectData in buildTypeProvider.buildTypeList.data" 
                                                            :key="selectData.id" 
                                                            class="w-72 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  
                                                            @click="buildtypeFilterClicked(selectData)" >
                                                                <ps-label class="ms-2 text-xs" :class="selectData.id==itemProvider.paramHolder.buildTypeId ? ' font-medium' : 'font-light'"  > {{selectData.name}} </ps-label>
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

                                                    <ps-label class="mt-4 ms-4 mb-2 underline font-medium cursor-pointer flex" :class="buildTypeProvider.isNoMoreRecord ? 'hidden' : ''"  @click="loadBuildType" > {{ $t("list__load_more") }} </ps-label>
                                                </div>
                                                
                                            </template>
                                        </ps-dropdown>
                                        </div>

                                        <!--Seller Type -->
                                        <div class="w-full" v-if="appInfoProvider?.appInfo.data?.psItemUploadConfig?.sellerTypeId == PsConst.ONE">
                                        <ps-label class="mt-4 font-medium text-xs "> {{ $t("item_list__seller_type") }}  </ps-label>
                                        <ps-dropdown align="left" class='mt-1 w-full ' @onClick="loadSellerType" >
                                            <template #select>
                                                <ps-dropdown-select :selectedValue="itemProvider.paramHolder.sellerTypeName" />  
                                            </template>
                                            <template #list >
                                                <div class="rounded-md shadow-xs w-56 " >
                                                    <div class="pt-2 z-30 ">
                                                        <div v-if="sellerTypeProvider.sellerTypeList.data == null">
                                                            <ps-label class='p-2 flex' @click="loadSellerType"> {{ $t("list__loading") }} </ps-label>
                                                        </div>
                                                        <div v-else>
                                                            <div class="w-72 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  
                                                            @click="sellertypeFilterClicked({id:'', name:'All'})" >
                                                                <ps-label class="ms-2 text-xs" :class="itemProvider.paramHolder.sellerTypeId=='' ? ' font-medium' : 'font-light'"  > {{ $t("item_list__all") }}  </ps-label>
                                                            </div>
                                                            <div v-for="selectData in sellerTypeProvider.sellerTypeList.data" 
                                                            :key="selectData.id" 
                                                            class="w-72 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  
                                                            @click="sellertypeFilterClicked(selectData)" >
                                                                <ps-label class="ms-2 text-xs" :class="selectData.id==itemProvider.paramHolder.sellerTypeId ? ' font-medium' : 'font-light'"  > {{selectData.name}} </ps-label>
                                                            </div>
                                                        </div>
                                                    </div>                                    
                                                </div>
                                            </template>
                                            <template #loadmore>
                                                
                                                <div class="mb-2 w-56">

                                                    <div  v-if="sellerTypeProvider.sellerTypeList.data != null
                                                        && sellerTypeProvider.loading.value == true" class='mt-4 ms-4 flex'>
                                                        <ps-label-caption > {{ $t("list__loading") }} </ps-label-caption>
                                                    </div>

                                                    <ps-label class="mt-4 ms-4 mb-2 underline font-medium cursor-pointer flex" :class="sellerTypeProvider.isNoMoreRecord ? 'hidden' : ''"   @click="loadSellerType" > {{ $t("list__load_more") }} </ps-label>
                                                </div>
                                                
                                            </template>
                                        </ps-dropdown>
                                        </div>

                                        <!-- Transmission -->
                                        <div class="w-full" v-if="appInfoProvider?.appInfo.data?.psItemUploadConfig?.transmissionId == PsConst.ONE">
                                        <ps-label class="mt-4 font-medium text-xs "> {{ $t("item_list__transmission") }}  </ps-label>
                                        <ps-dropdown align="left" class='mt-1 w-full ' @onClick="loadTransmission" >
                                            <template #select>
                                                <ps-dropdown-select :selectedValue="itemProvider.paramHolder.transmissionName" />  
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
                                                                <ps-label class="ms-2 text-xs" :class="itemProvider.paramHolder.transmissionId=='' ? ' font-medium' : 'font-light'"  > {{ $t("item_list__all") }}  </ps-label>
                                                            </div>
                                                            <div v-for="selectData in transmissionProvider.transmissionList.data" 
                                                            :key="selectData.id" 
                                                            class="w-72 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  
                                                            @click="transmissionFilterClicked(selectData)" >
                                                                <ps-label class="ms-2 text-xs" :class="selectData.id==itemProvider.paramHolder.transmissionId ? ' font-medium' : 'font-light'"  > {{selectData.name}} </ps-label>
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

                                                    <ps-label class="mt-4 ms-4 mb-2 underline font-medium cursor-pointer flex" :class="transmissionProvider.isNoMoreRecord ? 'hidden' : ''"   @click="loadTransmission" > {{ $t("list__load_more") }} </ps-label>
                                                </div>
                                                
                                            </template>
                                        </ps-dropdown>
                                        </div>

                                        <!-- Price Type -->
                                        <div class="w-full" v-if="appInfoProvider?.appInfo.data?.psItemUploadConfig?.itemPriceTypeId == PsConst.ONE">
                                        <ps-label class="mt-4 font-medium text-xs "> {{ $t("item_list__price_type") }} </ps-label>
                                        <ps-dropdown align="right" class='mt-1 w-full ' @onClick="loadItemPriceType" >
                                            <template #select>
                                                <ps-dropdown-select :selectedValue="itemProvider.paramHolder.itemPriceTypeName" />  
                                            </template>
                                            <template #list >
                                                <div class="rounded-md shadow-xs w-56 " >
                                                    <div class="pt-2 z-30 ">
                                                        <div v-if="itemPriceTypeProvider.itemPriceTypeList.data == null">
                                                            <ps-label class='p-2 flex' @click="loadItemPriceType"> {{ $t("list__loading") }} </ps-label>
                                                        </div>
                                                        <div v-else>
                                                            <div class="w-72 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  
                                                            @click="itemPriceTypeFilterClicked({id:'', name:'All'})" >
                                                                <ps-label class="ms-2 text-xs" :class="itemProvider.paramHolder.itemPriceTypeId=='' ? ' font-medium' : 'font-light'"  > {{ $t("item_list__all") }}  </ps-label>
                                                            </div>
                                                            <div v-for="itempricetype in itemPriceTypeProvider.itemPriceTypeList.data" 
                                                            :key="itempricetype.id" 
                                                            class="w-72 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  
                                                            @click="itemPriceTypeFilterClicked(itempricetype)" >
                                                                <ps-label class="ms-2 text-xs" :class="itempricetype.id==itemProvider.paramHolder.itemPriceTypeId ? ' font-medium' : 'font-light'"  > {{itempricetype.name}} </ps-label>
                                                            </div>
                                                        </div>
                                                    </div>                                        
                                                </div>
                                            </template>
                                            <template #loadmore>
                                                
                                                <div class="mb-2 w-56">

                                                    <div  v-if="itemPriceTypeProvider.itemPriceTypeList.data != null
                                                        && itemPriceTypeProvider.loading.value == true" class='mt-4 ms-4 flex'>
                                                        <ps-label-caption > {{ $t("list__loading") }} </ps-label-caption>
                                                    </div>

                                                    <ps-label class="mt-4 ms-4 mb-2 underline font-medium cursor-pointer flex" :class="itemPriceTypeProvider.isNoMoreRecord ? 'hidden' : ''"   @click="loadItemPriceType" > {{ $t("list__load_more") }} </ps-label>
                                                </div>
                                                
                                            </template>
                                        </ps-dropdown>
                                        </div>

                                        <!-- Sold item -->
                                        <ps-label class="mt-4 font-medium text-xs "> {{ $t("item_list__sold_item") }} </ps-label>
                                        <ps-dropdown align="right" class='mt-1 w-full'>
                                            <template #select>
                                                <ps-dropdown-select :selectedValue="soldItemName" />  
                                            </template>
                                            <template #list >
                                                <div class="rounded-md shadow-xs w-56 " >
                                                    <div class="pt-2 z-30 ">
                                                        <div v-if="soldOutItem == null">
                                                            <ps-label class='p-2 flex'> {{ $t("list__loading") }} </ps-label>
                                                        </div>
                                                        <div v-else>
                                                            <div class="w-72 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  
                                                            @click="soldItemFilterClicked({id:'', name:'All'})" >
                                                                <ps-label class="ms-2 text-xs" :class="soldItemId =='' ? ' font-medium' : 'font-light'"  > {{ $t("item_list__all") }}  </ps-label>
                                                            </div>
                                                            <div v-for="sold in soldOutItem" 
                                                            :key="sold.id" 
                                                            class="w-72 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  
                                                            @click="soldItemFilterClicked(sold)" >
                                                                <ps-label class="ms-2 text-xs" :class="sold.id==soldItemId ? ' font-medium' : 'font-light'"  > {{sold.name}} </ps-label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </template>
                                        </ps-dropdown>
                                        <!-- end item sold -->
                                        
                                        <!-- Location -->
                                        <ps-label class="mt-4 font-medium text-xs "> {{ $t("item_list__location") }} </ps-label>
                                        <ps-dropdown align="right" class='mt-1 w-full ' @onClick="loadLocation" >
                                            <template #select>
                                                <ps-dropdown-select :selectedValue="itemProvider.paramHolder.itemLocationName" />                                    
                                            </template>
                                            <template #list >
                                                <div class="rounded-md shadow-xs w-56 " >
                                                    <div class="pt-2 z-30">
                                                        <div v-if="itemlocationProvider.itemLocationList.data == null">
                                                            <ps-label class='p-2 flex' @click="loadLocation"> {{ $t("list__loading") }} </ps-label>
                                                        </div>
                                                        <div v-else>
                                                            <div 
                                                            class="w-72 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  
                                                            @click="itemlocFilterClicked('', 'All')" >
                                                                <ps-label class="ms-2 text-xs" :class="itemProvider.paramHolder.itemLocationId=='' ? ' font-medium' : 'font-light'"  > {{ $t("item_list__all") }}  </ps-label>
                                                            </div>
                                                            <div v-for="selectData in itemlocationProvider.itemLocationList.data" :key="selectData.id" 
                                                            class="w-72 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  
                                                            @click="itemlocFilterClicked(selectData.id, selectData.name)" >
                                                                <ps-label class="ms-2 text-xs" :class="selectData.id==itemProvider.paramHolder.itemLocationId ? ' font-medium' : 'font-light'"  > {{selectData.name}} </ps-label>
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

                                                    <ps-label class="mt-4 ms-4 mb-2 underline font-medium cursor-pointer flex" :class="itemlocationProvider.isNoMoreRecord ? 'hidden' : ''"  @click="loadLocation" > {{ $t("list__load_more") }} </ps-label>
                                                </div>
                                                
                                            </template>
                                        </ps-dropdown>
                                                
                                        <!-- for sub Location -->
                                        <ps-dropdown align="right" class='mt-1 w-full ' @click="loadSubLocation(itemProvider.paramHolder.itemLocationId)" v-if="appInfoProvider.appInfo.data?.psAppSetting?.isSubLocation == '1'">
                                            <template #select>
                                                <ps-dropdown-select :selectedValue="itemProvider.paramHolder.itemLocationTownshipName
                                                " />                                    
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
                                                <div class="rounded-md shadow-xs w-56 " >
                                                    <div class="pt-2 z-30 ">
                                                        <div v-if="subLocationProvider.locationTownshipList.data == null">
                                                            <ps-label class='p-2 flex' > {{ $t("list__loading") }} </ps-label>
                                                        </div>
                                                        <div v-else>
                                                            <div class="w-72 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  
                                                            @click="subLocFilterClicked({id:'', name:'All'})" >
                                                                <ps-label class="ms-2 text-xs" :class="itemProvider.paramHolder.itemLocationTownship=='' ? ' font-medium' : 'font-light'"  > {{ $t("item_list__all") }}  </ps-label>
                                                            </div>
                                                            <div v-for="selectSubLoc in subLocationProvider.locationTownshipList.data" :key="selectSubLoc.id" 
                                                            class="w-72 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  
                                                                @click="subLocFilterClicked(selectSubLoc)" >
                                                                <ps-label class="ms-2 text-xs" :class="selectSubLoc.id==itemProvider.paramHolder.itemLocationTownship ? ' font-medium' : 'font-light'"  > {{selectSubLoc.townshipName}} </ps-label>
                                                            </div>
                                                        </div>
                                                    </div>                                        
                                                </div>
                                            </template>
                                            <template #loadmore>
                                                
                                                <div class="mb-2 w-56">

                                                    <div  v-if="subLocationProvider.locationTownshipList.data != null
                                                        && subLocationProvider.loading.value == true" class='mt-4 ms-4 flex'>
                                                        <ps-label-caption > {{ $t("list__loading") }} </ps-label-caption>
                                                    </div>

                                                    <ps-label class="mt-4 ms-4 mb-2 underline font-medium cursor-pointer flex" :class="subLocationProvider.isNoMoreRecord ? 'hidden' : ''"  @click="loadSubLocation(itemProvider.paramHolder.itemLocationId)" > {{ $t("list__load_more") }} </ps-label>
                                                </div>
                                                
                                            </template>
                                        </ps-dropdown>
                                        <!-- end sub Location -->

                                        <ps-label @click="mapFilterClicked()" class=" mt-4 w-full cursor-pointer bg-primary-500 dark:bg-primaryDark-accent  py-3 text-center rounded-xl text-xs " textColor="text-textLight"> 
                                            <font-awesome-icon :icon="['fas', 'map-marked-alt']" class="text-textLight text-lg me-2"  />
                                                {{ $t("item_list__pick_location") }}
                                        </ps-label>
                                                
                                        <ps-button theme="bg-primary-500 dark:bg-primaryDark-accent text-textLight py-3 " textSize="text-xs" class="w-full text-center mt-5 mb-2" @click="filterButtonClicked"> {{ $t("item_list__filter") }} </ps-button>
                                                
                                    </div>
                                </div>
                            </transition>
                        </div>
                    </div>
                </div>
                
            </div>
            <!-- google adsense desktop view -->
            <div class="hidden md:block">
                <ps-ad-sense adFormat="horizontal"></ps-ad-sense>
            </div>

        </div>
    </div>

    <ps-error-dialog ref="ps_error_dialog" />
    <ps-loading-dialog ref="ps_loading_dialog" class='z-40' />
    <map-with-circle-filter-modal ref="map_with_circle_filter_modal" />
</div>
</template>

<script lang="ts">

// // Vue
import { useRoute } from 'vue-router'
import router from "@/router";
import { onMounted,onUnmounted, ref,reactive ,defineAsyncComponent } from 'vue';

// Core UI
import PsLabel from '@/components/core/label/PsLabel.vue';
import PsLabelTitle from '@/components/core/label/PsLabelTitle.vue';
import PsIcon from '@/components/core/icons/PsIcon.vue';
import PsButton from '@/components/core/buttons/PsButton.vue';
import PsInput from '@/components/core/input/PsInput.vue';
import PsDropdown from '@/components/core/dropdown/PsDropdown.vue';
import PsDropdownSelect from '@/components/core/dropdown/PsDropdownSelect.vue';
import PsLoadingDialog from '@/components/core/dialog/PsLoadingDialog.vue';
import PsErrorDialog from '@/components/core/dialog/PsErrorDialog.vue';
import MapWithCircleFilterModal from '@/components/layouts/map/MapWithCircleFilterModal.vue';
import PsRouteLink from '@/components/core/link/PsRouteLink.vue';
import PsRadio from '@/components/core/radio/PsRadio.vue';
import PsAdSense from '@/components/core/adsense/PsAdSense.vue';
import PsInputWithRightIcon from '@/components/core/input/PsInputWithRightIcon.vue';
import PsCheckboxValue from '@/components/core/checkbox/PsCheckboxValue.vue';


// Models
import { createModelProviderState } from '@/store/modules/model/ModelProvider';
import { useProductProviderState } from '@/store/modules/item/ProductProvider';
import { useManufacturerProviderState } from '@/store/modules/manufacturer/ManufacturerProvider';
import { useItemLocationProviderState } from '@/store/modules/itemlocation/ItemLocationProvider';
import { createItemLocationTownshipProviderState } from '@/store/modules/itemLocationTownship/ItemLocationTownshipProvider';
import { createItemTypeProviderState } from '@/store/modules/itemType/ItemTypeProvider';
import { createItemColorProviderState } from '@/store/modules/itemcolor/ItemColorProvider';
import { createFuelTypeProviderState } from '@/store/modules/fuelType/FuelTypeProvider';
import { createBuildTypeProviderState } from '@/store/modules/buildType/BuildTypeProvider';
import { createSellerTypeProviderState } from '@/store/modules/sellerType/SellerTypeProvider';
import { createTransmissionProviderState } from '@/store/modules/transmission/TransmissionProvider';
import { createItemPriceTypeProviderState } from '@/store/modules/itemPriceType/ItemPriceTypeProvider';
import { createItemConditionProviderState } from '@/store/modules/item/ItemConditionProvider';
import AppInfoParameterHolder from '@/object/holder/AppInfoParameterHolder';
import { usePsAppInfoProviderState } from '@/store/modules/appinfo/AppInfoProvider';
import { createUserListProviderState } from "@/store/modules/user/UserListProvider";

// Params Holders
import { PsValueProvider } from '@/store/modules/core/PsValueProvider';
import PsLabelCaption from '@/components/core/label/PsLabelCaption.vue';
import PsConst from '@/object/constant/ps_constants';
import LocationParameterHolder from '@/object/holder/LocationParameterHolder';
import Velocity from "velocity-animate";
import ModelListParameterHolder from '@/object/holder/ModelListParameterHolder';
import LocationTownshipParameterHolder from '@/object/holder/LocationTownshipParameterHolder';
import UserListParameterHolder from '@/object/holder/UserListParameterHolder';

//language
import { i18n } from '@/assets/locales/index';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faMapMarkedAlt,faFilter,faTimes } from '@fortawesome/free-solid-svg-icons';
library.add(faMapMarkedAlt,faFilter,faTimes)


const ItemHorizontalItem = defineAsyncComponent(() => import('@/components/modules/item/ItemHorizontalItem.vue'));

export default {
    name : "ItemListView",
    components : {
        PsLabel,
        PsLabelTitle,
        PsCheckboxValue,
        ItemHorizontalItem,
        PsButton,
        PsRadio,
        PsInput,
        PsDropdown,
        PsDropdownSelect,
        PsLabelCaption,
        PsLoadingDialog,
        PsErrorDialog,
        MapWithCircleFilterModal,
        PsRouteLink,
        PsIcon,
        PsAdSense,
        PsInputWithRightIcon
    }, 
    setup() {
    
        /**
         * Init Providers & Refs
         */
        const modelProvider = createModelProviderState();
        const manufacturerProvider = useManufacturerProviderState();
        const itemlocationProvider = useItemLocationProviderState();
        const subLocationProvider = createItemLocationTownshipProviderState();
        const itemProvider = useProductProviderState();
        const appInfoProvider = usePsAppInfoProviderState();
        const itemTypeProvider = createItemTypeProviderState();
        const colorProvider = createItemColorProviderState();
        const fuelTypeProvider = createFuelTypeProviderState();
        const buildTypeProvider = createBuildTypeProviderState();
        const sellerTypeProvider = createSellerTypeProviderState();
        const transmissionProvider = createTransmissionProviderState();
        const itemPriceTypeProvider = createItemPriceTypeProviderState();
        const itemConditionProvider = createItemConditionProviderState();
        const userProvider = createUserListProviderState();
        const locationKeyword = ref('');
        const psValueHolder = PsValueProvider.psValueHolder;
        const ps_loading_dialog = ref();
        const map_with_circle_filter_modal = ref();
        const loginUserId = psValueHolder.getLoginUserId();
        const paramHolder = new LocationParameterHolder().getDefaultParameterHolder();
        const modelHolder = new ModelListParameterHolder();
        const subparamHolder = new LocationTownshipParameterHolder();
        const userListHolder = new UserListParameterHolder();
        const ps_error_dialog = ref();
        const radius = ref("0");
        const soldOutItem = ref([
            {
                id: "0",name : "Not Yet Sold"
            },
            {
                id: "1",name : "Sold"
            }
        ]);
        const soldItemId = ref('');
        const soldItemName = ref('');
        const sublocationKeyword = ref('');
        const modelKeyword = ref("");

        const filtering = ref(false);

        const showFilter = ref(false);
        
        const notDataCode =  PsConst.ERROR_CODE_10001;
        let activeSortingId = ref('');
        let activeSortingName = ref('');
        const usersorting = [
            { 
                id:"0", 
                orderBy:"user_name", 
                orderType:PsConst.FILTERING__ASC, 
                name:"Ascending"
            },
            { 
                id:"1", 
                orderBy:"user_name", 
                orderType:PsConst.FILTERING__DESC, 
                name:"Decending"
            }
        ];
        
        /**
         * Init Data
         */
        const route = useRoute();
        let isDiscount = ref(false);
        
        itemProvider.paramHolder.parseParamsAndQuery(route.params, route.query);

        let currentsorting = reactive({
            id:"0", 
            orderBy:PsConst.FILTERING__ADDED_DATE, 
            orderType:PsConst.FILTERING__DESC, 
            name:"Latest"
        });


        if(itemProvider.paramHolder.sortingName == 'POPULAR'){
            currentsorting = reactive({
            id:"1", 
            orderBy:PsConst.FILTERING_TRENDING, 
            orderType:PsConst.FILTERING__DESC, 
            name:"Popular"
        });
        }

        /**
         * Loading Data
         */
        onMounted(async () => {
            
            setTimeout(async ()=>{
                if(router.currentRoute.value.meta.metaTags.fromHistory) {
                    // refleshData();
                }else {
                    if(itemProvider.paramHolder.isDiscount == '1'){
                        isDiscount.value = true;
                    }
                    itemProvider.paramHolder.parseParamsAndQuery(route.params, route.query);
                    if(itemProvider.paramHolder.manufacturerId != '') {
                        loadModel(itemProvider.paramHolder.manufacturerId);
                    }
                    await sortingFilterClicked(currentsorting);
                }
            },1000);
        });
         onUnmounted(() => {

        });

        function loadModel(manufacturerId) { 
            modelProvider.loadModelList(manufacturerId);      
        }

        function loadSubLocation(itemLocationId) { 
            subLocationProvider.loadItemLocationTownshipList(itemLocationId);      
        }

        function loadItemType() {
            itemTypeProvider.loadItemTypeList( );
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

        function loadItemPriceType() {
            itemPriceTypeProvider.loadItemPriceTypeList( );
        }

        function loadCondition() {
            itemConditionProvider.loadItemConditionList();
        }

        function loadItemList() {             
            itemProvider.loadItemList(psValueHolder.getLoginUserId(), itemProvider.paramHolder);
        }

        function loadManufacturer() {
            manufacturerProvider.loadItemList(PsConst.NO_LOGIN_USER, manufacturerProvider.paramHolder);
        }

        function loadLocation() {
            itemlocationProvider.loadItemLocationList(psValueHolder.getLoginUserId(), paramHolder);
        }
        // async function loadUserDataList() {
          
        //    await userProvider.loadUserSearchList( userListHolder);

        // }

        /**
         * Actions
         */
        async function usernameFilterClicked() {

            ps_loading_dialog.value.openModal();
            await userProvider.resetUserSearchList( loginUserId,userListHolder);

            
            ps_loading_dialog.value.closeModal();
        }
        async function refleshUserData(){

            ps_loading_dialog.value.openModal();
            await userProvider.refleshUserSearchList( loginUserId,userListHolder);

            
            ps_loading_dialog.value.closeModal();
        }

        async function usersortingFilterClicked(value) {
            
            activeSortingId.value = value.id;
            activeSortingName.value = value.name;
            userListHolder.orderBy = value.orderBy;
            userListHolder.orderType = value.orderType;
            refleshUserData()
            
            
        }

        async function sortingFilterClicked(value) {
            currentsorting = value;
            itemProvider.paramHolder.orderBy = value.orderBy;
            itemProvider.paramHolder.orderType = value.orderType;
            itemProvider.paramHolder.sortingId = value.id;
            itemProvider.paramHolder.sortingName = value.name;
                   
            await loadDataList();
        }

        function soldItemFilterClicked(value) {
            
            itemProvider.paramHolder.isSoldOut = value.id;
            
            soldItemId.value = value.id;
            soldItemName.value = value.name;
            
            loadDataList();
        }
       

        function conditionFilterClicked(value) {
            itemProvider.paramHolder.conditionOfItemId = value.id;
            itemProvider.paramHolder.itemConditionName = value.name;
           
            loadDataList();
        }


        
        function checkPrice(e) {

            const char = String.fromCharCode(e.keyCode); // Get the character
            if(/^[0-9]+$/.test(char)) return true; // Match with regex 
            else e.preventDefault(); // If not match, don't add to input text 
            
        }
        function checklocation(e) {

            const char = String.fromCharCode(e.keyCode); // Get the character
            if(/^[0-9]*\.?[0-9]*$/.test(char)) return true; // Match with regex 
            else e.preventDefault(); // If not match, don't add to input text 
            
        }

        function pricerangeItemFilterClicked() {  
            
            if(itemProvider.paramHolder.minPrice != '' && itemProvider.paramHolder.maxPrice != '') {
                const maxPrice : number = parseFloat(itemProvider.paramHolder.maxPrice.toString());
                const minPrice : number = parseFloat(itemProvider.paramHolder.minPrice.toString())
                if( minPrice >= maxPrice) {
                    ps_error_dialog.value.openModal(
                        i18n.global.t('item_list__warning'),
                        i18n.global.t('item_list__invalid_min_max_prices'));
                    return;
                }
            }

            loadDataList();
        }
        function yearFilterClicked() {  
            
            if(itemProvider.paramHolder.minYear != '' && itemProvider.paramHolder.maxYear != '') {
                const maxYear : number = parseFloat(itemProvider.paramHolder.maxYear.toString());
                const minYear : number = parseFloat(itemProvider.paramHolder.minYear.toString())
                if( minYear >= maxYear) {
                    ps_error_dialog.value.openModal(
                        i18n.global.t('item_list__warning'),
                        i18n.global.t('item_list__invalid_min_max_prices'));
                    return;
                }
            }

            loadDataList();
        }



        function nameFilterClicked() {
           
            loadDataList();
        }

        function modelFilterClicked(value) {
            
            itemProvider.paramHolder.modelId = value.id;
            itemProvider.paramHolder.modelName = value.name;
      
            loadDataList();
        }

        function manufacturerFilterClicked(value) {
            modelHolder.manufacturerId = value.id;
            itemProvider.paramHolder.manufacturerId = value.id;
            itemProvider.paramHolder.manufacturerName = value.name;

            itemProvider.paramHolder.modelId = '';
            itemProvider.paramHolder.modelName = '';

            loadDataList();
            modelProvider.resetModelList(value.id);
            
        }

        function itemlocFilterClicked(id, name) {

            
            subparamHolder.locationId = id;
            itemProvider.paramHolder.itemLocationId = id;
            itemProvider.paramHolder.itemLocationName = name;

            itemProvider.paramHolder.itemLocationTownship = '';
            itemProvider.paramHolder.itemLocationTownshipName = '';

            loadDataList();
            subLocationProvider.resetItemLocationTownshipList(id);
            
        }
        function isDiscountFilterClicked() {
            itemProvider.paramHolder.isDiscount = isDiscount.value == false ? '1' : '0';
            // if(isDiscount.value == false){
            //     alert('not check')
            // }else{
            //     alert('check')
            // }
            loadDataList();
        }

        function subLocFilterClicked(value) {
            
            itemProvider.paramHolder.itemLocationTownship = value.id;
            itemProvider.paramHolder.itemLocationTownshipName = value.townshipName;
           
            loadDataList();
        }

        function itemtypeFilterClicked(value) {
            
            itemProvider.paramHolder.itemTypeId = value.id;
            itemProvider.paramHolder.itemTypeName = value.name;

            loadDataList();
        }
        function colorFilterClicked(value) {
            
            itemProvider.paramHolder.colorId = value.id;
            itemProvider.paramHolder.colorValue = value.colorValue;

            loadDataList();
        }
        function fueltypeFilterClicked(value) {
            
            itemProvider.paramHolder.fuelTypeId = value.id;
            itemProvider.paramHolder.fuelTypeName = value.name;

            loadDataList();
        }
        function buildtypeFilterClicked(value) {
            
            itemProvider.paramHolder.buildTypeId = value.id;
            itemProvider.paramHolder.buildTypeName = value.name;

            loadDataList();
        }
        function sellertypeFilterClicked(value) {
            
            itemProvider.paramHolder.sellerTypeId = value.id;
            itemProvider.paramHolder.sellerTypeName = value.name;

            loadDataList();
        }
        function transmissionFilterClicked(value) {
            
            itemProvider.paramHolder.transmissionId = value.id;
            itemProvider.paramHolder.transmissionName = value.name;

            loadDataList();
        }
         function itemPriceTypeFilterClicked(value) {
            
            itemProvider.paramHolder.itemPriceTypeId = value.id;
            itemProvider.paramHolder.itemPriceTypeName = value.name;

            loadDataList();
        }

        function mapFilterClicked(){
            let lat : number = 0;
            let lng : number = 0; 
            let mile : number = 1;
            
            if(itemProvider.paramHolder.lat == undefined || itemProvider.paramHolder.lat == '') {
                lat = parseFloat((psValueHolder.locationLat == null || psValueHolder.locationLat == '' ? '0' : psValueHolder.locationLat).toString());
                lng = parseFloat((psValueHolder.locationLng == null || psValueHolder.locationLng == '' ? '0' : psValueHolder.locationLng).toString());                       
            }else {
                lat = parseFloat(itemProvider.paramHolder.lat.toString());
                lng = parseFloat(itemProvider.paramHolder.lng.toString());
                mile = parseFloat(itemProvider.paramHolder.mile.toString());
            }
      
           map_with_circle_filter_modal.value.openModal(lat,lng, mile, updateLocation);
            
        }
        function updateLocation(lat, lng, mile) {
            if(lat == null || lng == null) {
                return;
            }

            itemProvider.paramHolder.lat = lat;
            itemProvider.paramHolder.lng = lng;
            itemProvider.paramHolder.mile = mile;
            loadDataList();
        } 
        function filterButtonClicked(){
            loadDataList();
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
            subLocationProvider.filtersubLocationUpdate(loginUserId,subparamHolder);
        }
        let tmpLat = '';
        let tmpLng = '';
        async function loadDataList() {

            if(showFilter.value == true){
                showFilter.value = false;
            }
            ps_loading_dialog.value.openModal();

            if(itemProvider.paramHolder.mile == '0' || itemProvider.paramHolder.mile.toString() == '') {
                
                tmpLat = itemProvider.paramHolder.lat.toString();
                tmpLng = itemProvider.paramHolder.lng.toString();
                itemProvider.paramHolder.lat = '';
                itemProvider.paramHolder.lng = '';
            }else {
                if(itemProvider.paramHolder.lat == undefined || itemProvider.paramHolder.lat.toString() == '') {
                    if( psValueHolder != null && psValueHolder.locationLat != null && psValueHolder.locationLng != null ) {
                        tmpLat = psValueHolder.locationLat.toString();
                        tmpLng = psValueHolder.locationLng.toString();
                        itemProvider.paramHolder.lat = tmpLat;
                        itemProvider.paramHolder.lng = tmpLng;
                    }
                }
            }
            
            await itemProvider.resetItemList(psValueHolder.getLoginUserId(), itemProvider.paramHolder);

            ps_loading_dialog.value.closeModal();
            isFiltering();
        }
        function toggleShowFilter(){
            showFilter.value = !showFilter.value;
        }
        async function clearAllFilter() {
            // Search Terms
            itemProvider.paramHolder.searchTerm = '';
            
            // Price Range
            itemProvider.paramHolder.minPrice = '';
            itemProvider.paramHolder.maxPrice = '';

            // Year
            itemProvider.paramHolder.minYear = '';
            itemProvider.paramHolder.maxYear = '';

            // Manufacturer
            itemProvider.paramHolder.manufacturerId = '';
            itemProvider.paramHolder.manufacturerName = '';

            // Model
            itemProvider.paramHolder.modelId = '';
            itemProvider.paramHolder.modelName = '';

            // Item Type
            itemProvider.paramHolder.itemTypeId = '';
            itemProvider.paramHolder.itemTypeName = '';

            // Color
            itemProvider.paramHolder.colorId = '';
            itemProvider.paramHolder.colorValue = '';
            // Fuel Type
            itemProvider.paramHolder.fuelTypeId = '';
            itemProvider.paramHolder.fuelTypeName = '';
            // Build Type
            itemProvider.paramHolder.buildTypeId = '';
            itemProvider.paramHolder.buildTypeName = '';
            // Seller Type
            itemProvider.paramHolder.sellerTypeId = '';
            itemProvider.paramHolder.sellerTypeName = '';
            // Transmission
            itemProvider.paramHolder.transmissionId = '';
            itemProvider.paramHolder.transmissionName = '';

            // Item Conditions
            itemProvider.paramHolder.conditionOfItemId = '';
            itemProvider.paramHolder.itemConditionName = '';

            // Item Price Type
            itemProvider.paramHolder.itemPriceTypeId = '';
            itemProvider.paramHolder.itemPriceTypeName = '';

            itemProvider.paramHolder.itemLocationId = '';
            itemProvider.paramHolder.itemLocationName = 'All';
            itemProvider.paramHolder.itemLocationTownship = '';
            itemProvider.paramHolder.itemLocationTownshipName = '';
            itemProvider.paramHolder.lat = '';
            itemProvider.paramHolder.lng = '';
            itemProvider.paramHolder.mile = '';
            loadDataList();
            
        }
        function isFiltering() {
            
            filtering.value = false;
            if(
            itemProvider.paramHolder.searchTerm != '' ||
            itemProvider.paramHolder.minPrice != '' ||
            itemProvider.paramHolder.maxPrice != '' ||
            itemProvider.paramHolder.manufacturerId != '' ||
            itemProvider.paramHolder.modelId != '' ||
            itemProvider.paramHolder.itemTypeId != '' ||
            itemProvider.paramHolder.colorId != '' ||
            itemProvider.paramHolder.fuelTypeId != '' ||
            itemProvider.paramHolder.buildTypeId != '' ||
            itemProvider.paramHolder.sellerTypeId != '' ||
            itemProvider.paramHolder.transmissionId != '' ||
            itemProvider.paramHolder.conditionOfItemId != '' ||
            itemProvider.paramHolder.itemPriceTypeId != '' ||
            itemProvider.paramHolder.itemLocationId != '' ||
            itemProvider.paramHolder.itemLocationTownship != '' ||
            itemProvider.paramHolder.lat != '' ||
            itemProvider.paramHolder.lng != '' ||
            itemProvider.paramHolder.mile != '' ){
                filtering.value = true;
            }
            
            
        }

        const appInfoParameterHolder = new AppInfoParameterHolder();
        appInfoParameterHolder.userId = loginUserId;
        appInfoProvider.loadDeleteHistory(appInfoParameterHolder);
        const arrowIcon = ref("downArrow");
        function enter(el, done) {
            arrowIcon.value = "upArrow";
			Velocity(
				el,
				"slideDown",
				{
				duration: 300
				},
				{
				complete: done
				}
			);
        }
        
		function leave(el, done) {
            arrowIcon.value = "downArrow";
			Velocity(
				el,
				"slideUp",
				{
				duration: 300
				},
				{
				complete: done
				}
			);
        }
        async function refleshData(){

            ps_loading_dialog.value.openModal();
            await itemProvider.refleshItemList(psValueHolder.getLoginUserId(), itemProvider.paramHolder);
            
            ps_loading_dialog.value.closeModal();
        }

        return {
            refleshData,
            ps_loading_dialog,
            ps_error_dialog,
            map_with_circle_filter_modal,

            modelProvider,            
            itemProvider,
            itemlocationProvider,
            subLocationProvider,
            itemTypeProvider,
            colorProvider,
            fuelTypeProvider,
            buildTypeProvider,
            sellerTypeProvider,
            transmissionProvider,
            itemPriceTypeProvider,
            itemConditionProvider,
            manufacturerProvider,
            userProvider,
            userListHolder,

            loadItemList,
            loadManufacturer,
            loadModel,
            loadItemType,
            loadColor,
            loadFuelType,
            loadBuildType,
            loadSellerType,
            loadTransmission,
            loadItemPriceType,
            loadCondition,
            
            nameFilterClicked,
            usersortingFilterClicked,
            usersorting,
            usernameFilterClicked,
            manufacturerFilterClicked,
            modelFilterClicked,
            isDiscountFilterClicked,
            itemtypeFilterClicked,
            colorFilterClicked,
            fueltypeFilterClicked,
            buildtypeFilterClicked,
            sellertypeFilterClicked,
            transmissionFilterClicked,
            conditionFilterClicked,
            itemPriceTypeFilterClicked,
            sortingFilterClicked,
            pricerangeItemFilterClicked,
            yearFilterClicked,
            clearAllFilter,
            mapFilterClicked,
            filterButtonClicked,
            notDataCode,
            filterKeywordUpate,
            filterModelUpdate,
            filtersubLocationUpdate,
            locationKeyword,
            sublocationKeyword,
            modelKeyword,
            checkPrice,
            checklocation,
            radius,
            loadLocation,
            itemlocFilterClicked,
            subLocFilterClicked,
            loadSubLocation,
            appInfoProvider,
            currentsorting,
            activeSortingName,
            activeSortingId,
            filtering,
            soldOutItem,
            soldItemId,
            soldItemName,
            soldItemFilterClicked,
            showFilter,
            toggleShowFilter,
            enter,
            leave,
            loadDataList,
            PsConst,
            isDiscount
        }
    }
}
</script>