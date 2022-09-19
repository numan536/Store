<template>
    <div >
       
        <div class="sm:mt-32 lg:mt-36 mt-28">
            
            <div class="w-mobile sm:w-median lg:w-large mx-auto flex flex-wrap sm:flex-row justify-between  mb-4 ">
                <div class="flex items-center "> 
                    <ps-route-link
                        :to="{name: 'dashboard'}"> 
                        <ps-label textColor="text-secondary-400 dark:text-secondaryDark-grey "
                            class="hover:underline cursor-pointer font-medium text-xxs"> 
                                 {{ $t("item_detail__home") }}
                        </ps-label>      
                    </ps-route-link>

                    <ps-icon v-if="appInfoProvider?.appInfo?.data?.psItemUploadConfig.conditionOfItemId== PsConst.ONE" textColor="text-secondary-400 dark:text-secondaryDark-grey " name="rightArrow" class=' mx-0 sm:mx-2'/>
                    <ps-route-link v-if="appInfoProvider?.appInfo?.data?.psItemUploadConfig.conditionOfItemId== PsConst.ONE" :to="{ 
                        name: 'item-list',
                        query: { 
                            condition_of_item_id: productProvider.product?.data?.conditionOfItem?.id, 
                            item_condition_name: productProvider.product?.data?.conditionOfItem?.name }  }">
                        <ps-label textColor="text-secondary-400 dark:text-secondaryDark-grey "
                            class="hover:underline cursor-pointer font-medium text-xxs"> 
                                {{ productProvider.product.data ? productProvider.product?.data?.conditionOfItem?.name : '' }}
                        </ps-label>
                    </ps-route-link>
                    
                    <ps-icon name="rightArrow" class='text-secondary-400 dark:text-secondaryDark-grey   mx-0 sm:mx-2'/>
                    <ps-route-link
                        :to="{name: 'item-list', 
                        query: { 
                        id: productProvider.product?.data?.manufacturer?.id, 
                        name: productProvider.product?.data?.manufacturer?.name } }"> 
                        <ps-label textColor="text-secondary-400 dark:text-secondaryDark-grey "
                            class="hover:underline cursor-pointer font-medium text-xxs"> 
                                {{ productProvider.product.data ? productProvider.product?.data?.manufacturer?.name : '' }}
                        </ps-label>      
                    </ps-route-link>

                    <ps-icon name="rightArrow" class='text-secondary-400 dark:text-secondaryDark-grey   mx-0 sm:mx-2'/>
                    <ps-label textColor="text-secondary-400 dark:text-secondaryDark-grey " class="font-medium text-xxs"> {{ productProvider.product.data ? productProvider.product?.data?.title : '' }} </ps-label>
                </div>
                <div class="flex space-x-2 flex-row w-full sm:w-auto mt-2 sm:mt-0">
                    <div class="flex-grow sm:hidden">

                    </div>
                    <div v-if="loginUserId != productProvider.product?.data?.user?.userId">
                        <ps-button class="flex items-center normal-case " textSize="text-xs" @click="reportItemClicked" theme="text-primary-500 dark:text-primaryDark-accent border border-primary-500 dark:border-primaryDark-accent p-2 rounded-2xl" >
                        <font-awesome-icon :icon="['fas', 'flag']" class="text-primary-500 dark:text-primaryDark-accent text-xs me-1"  />
                        <span class="hidden sm:block">{{ $t("item_detail__report") }}</span>
                        </ps-button>
                    </div>
                    <ps-button class="flex items-center normal-case " textSize="text-xs" @click="shareClicked(productProvider.product?.data?.dynamicLink)" theme="text-textLight bg-primary-500 dark:bg-primaryDark-accent p-2 rounded-2xl" >
                        <font-awesome-icon :icon="['fas', 'share']" class="text-textLight text-xs me-1"  />
                        <span class="hidden sm:block">{{ $t("item_detail__share") }}</span>
                    </ps-button>
                </div>
            </div>

            <!-- Start Item gallery -->
            <div class="w-full cursor-pointer" >
                <!-- Start Gallery Swiper -->
                <div class="z-0" >
                    <gallery-horizontal-swiper  :totalCount="totalCount" :imageCount="imageCount" :galleryList="galleryProvider.galleryList.data" :isLoading="galleryProvider.galleryList.data == null && dataReady ? false : true" @clickImage="showGalleryDetail" class='z-0' />
                </div>
                <!-- End Gallery Swiper -->
            </div>
            <!-- End item gallery -->
            <div class="w-mobile sm:w-median lg:w-large mx-auto" >
            
            <div class="w-full mt-8 grid lg:grid-cols-10 grid-cols-8  gap-4 sm:gap-3.5 lg:gap-0 justify-between container">
                
                <div class="hidden sm:flex col-span-8 sm:col-span-4  lg:col-span-5 w-full">
                    <div class="flex flex-col">
                        <div class="flex flex-wrap">
                            <ps-label class="lg:text-base text-sm font-medium sm:mt-3 mt-1 me-1" textColor="text-secondary-600 dark:text-secondaryDark-white" > {{ productProvider.product.data ? productProvider.product?.data?.title : '' }} </ps-label> 
                            <ps-label class="lg:text-xxs text-3xs font-medium p-1 bg-primary-500 dark:bg-primaryDark-accent lg:h-5 h-4" textColor="text-textLight " > {{ productProvider.product?.data?.isSoldOut == '1' ? $t("item_detail__sold_out") : $t("item_detail__available") }}  </ps-label> 
                        </div>
                        
                        <div class=" mt-2">
                            <div class="flex flex-wrap">
                                <div class="flex flex-col">
                                    <div v-if="productProvider.product.data && productProvider.product?.data?.discountRate!='0' && appInfoProvider?.appInfo?.data?.psItemUploadConfig.discountRate== PsConst.ONE" class="flex flex-col  ">  
                                        <div class="flex flex-row">
                                            <ps-label class="line-through font-medium text-base" > {{ productProvider.product.data ? productProvider.product?.data?.itemCurrency.currencySymbol : '' }} {{ formatPrice(productProvider.product?.data ? productProvider.product?.data?.price : '') }} </ps-label>
                                            <ps-label class=" ps-1 font-medium text-base" > {{ ' - '+parseFloat(productProvider.product?.data.discountRate)+'%' }} </ps-label>
                                        </div> 
                                        <ps-label class="lg:text-3xl text-2xl font-medium pt-1" textColor="text-primary-500 dark:text-primaryDark-accent" > {{ productProvider.product.data ? productProvider.product?.data?.itemCurrency.currencySymbol : '' }} {{ formatPrice(productProvider.product?.data ? parseFloat(productProvider.product?.data?.price)-(parseFloat(productProvider.product?.data?.price)*(parseFloat(productProvider.product?.data?.discountRate)/100)) : '') }} </ps-label>
                                        
                                    </div>
                                    <div v-else class=" ">                    
                                        <ps-label class="lg:text-3xl text-2xl font-medium " textColor="text-primary-500 dark:text-primaryDark-accent"> {{ productProvider.product?.data ? productProvider.product?.data?.itemCurrency.currencySymbol : '' }} {{ formatPrice(productProvider.product?.data ? productProvider.product?.data?.price : '') }} </ps-label>
                                    </div>
                                </div>
                                <!-- <ps-label class="lg:text-3xl text-2xl font-medium " textColor="text-primary-500 dark:text-primaryDark-accent" >{{productProvider.product?.data?.itemCurrency?.currencySymbol}} {{formatPrice(productProvider.product?.data ? productProvider.product?.data?.price : '')}} </ps-label> -->
                                <ps-label v-if="appInfoProvider?.appInfo?.data?.psItemUploadConfig.itemPriceTypeId== PsConst.ONE" class="sm:ml-2 ml-0 mt-3 lg:text-xs text-xxs font-light" textColor="text-secondary-400 dark:text-secondaryDark-grey" > {{ productProvider.product.data ? productProvider.product?.data?.itemPriceType?.name : '' }} </ps-label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-span-8 sm:col-span-4 lg:col-start-7 lg:col-span-4 w-full">
                    <!-- Start favourite icon and chat button -->
                    <div v-if="loginUserId != productProvider.product?.data?.user?.userId" class="flex flex-row justify-end mt-2">
                        
                        <ps-label class="font-light lg:text-xs text-xs me-3" > {{ productProvider.product.data ? productProvider.product?.data.favouriteCount : '' }} {{ $t("item_detail__likes") }} </ps-label>

                        <ps-label  @click="favouriteClicked">
                                <ps-icon name="favourite" w="16" h="16" class="text-primary-500 dark:text-primaryDark-accent " v-if="productProvider.product?.data?.isFavourited == '1'"/>
                                <font-awesome-icon :icon="['far', 'heart']" class="text-primary-500 dark:text-primaryDark-accent text-sm" v-else  />

                        </ps-label>
                       
                    </div>
                    <!-- End favourite icon and chat button -->
                    <div v-if="isPromote" class=" flex flex-row space-x-6 justify-end">
                        <!-- Start delete and edit button -->
                        <div class="flex flex-row space-x-4 text-sm font-medium mt-2">
                            <ps-label @click="deleteClicked()" class="shadow-buttonShadow hover:shadow-none cursor-pointer flex items-center justify-center me-2 py-2 px-3 bg-primary-500 dark:bg-primaryDark-accent " textColor="text-textLight ">
                            <font-awesome-icon :icon="['fas', 'trash-alt']" class="text-textLight text-lg"  />
                            </ps-label>
                            <ps-route-link class="flex flex-grow lg:me-2 me-1" :to="{ name: 'item-entry' ,query: { item_id: productProvider.product?.data?.id }}">
                                <ps-label class="shadow-buttonShadow hover:shadow-none flex items-center justify-center me-2 py-2 px-3 bg-primary-500 dark:bg-primaryDark-accent" textColor="text-textLight  ">
                                    <font-awesome-icon :icon="['fas', 'edit']" class="text-textLight text-lg"  />
                                </ps-label>
                            </ps-route-link>
                            
                        </div>
                        <!-- End delete and edit button -->
                        <!-- Start promote button -->
                        <div class="flex-grow-0 text-sm font-medium mt-2">
                            <ps-button  textSize="text-sm " class="w-full px-5 py-3 flex items-center justify-center" theme="shadow-buttonShadow hover:shadow-none text-textLight bg-primary-500 dark:bg-primaryDark-accent"  @click="promoteClicked">
                                <span class="">{{ $t("item_detail__promote_now") }}</span>
                            </ps-button>
                        </div>
                        <!-- End promote button -->
                    </div>
                    <div v-else class="w-full">
                        <!-- Start delete and edit button -->
                        <div v-if="loginUserId == productProvider.product?.data?.user?.userId" class="cursor-pointer flex flex-row justify-end text-sm font-medium mt-2">
                            <ps-label @click="deleteClicked()" class="shadow-buttonShadow hover:shadow-none me-2 flex w-1/4 items-center justify-center py-3 px-3 bg-primary-500 dark:bg-primaryDark-accent " textColor="text-textLight  ">
                            <font-awesome-icon :icon="['fas', 'trash-alt']" class="text-textLight text-lg "  />
                            </ps-label>
                            <ps-route-link class="ms-6 me-1 flex w-1/4" :to="{ name: 'item-entry' ,query: { item_id: productProvider.product?.data?.id }}">
                                <ps-label class="shadow-buttonShadow hover:shadow-none flex w-full items-center justify-center p-3 bg-primary-500 dark:bg-primaryDark-accent " textColor="text-textLight ">
                                    <font-awesome-icon :icon="['fas', 'edit']" class="text-textLight text-lg "  />
                                </ps-label>
                            </ps-route-link>
                            
                        </div>
                        <!-- End delete and edit button -->
                    </div>
                    <div v-if="productProvider.product?.data && productProvider.product.data.isSoldOut == PsConst.ZERO && productProvider.product?.data?.user?.userId == loginUserId" class="my-3">
                        <ps-button  textSize="lg:text-md sm:text-xs text-xxs" class="shadow-buttonShadow hover:shadow-none w-full sm:py-3 flex items-center justify-center" theme="text-textLight dark:text-textDark bg-primary-500 dark:bg-primaryDark-accent"  @click="markAsSold()">
                            <span class=" block">{{ $t("item_detail__mark_as_sold") }}</span>
                        </ps-button>
                    </div>  
                            
                </div>
                <!-- statistic Pscard -->
                <div v-if="productProvider.product?.data?.user?.userId == loginUserId" class="w-full col-span-8 block sm:hidden">
                    <div class="bg-primary-000 dark:bg-primaryDark-black p-4">
                        <div class="flex flex-row">
                            <ps-icon name="signal" class="text-secondary-500 dark:text-secondaryDark-white"></ps-icon>
                            <p class="ml-2 font-medium">
                                <ps-label class="text-base "> {{ $t("item_detail__statistic") }} </ps-label>
                            </p>
                        </div>
                        <div class="mt-2">
                            <div class="flex flex-row items-center justify-around">
                                <div class="flex flex-col space-y-0.5 items-center">
                                    
                                    <ps-label class="font-medium text-2xl"> {{productProvider.product?.data?.touchCount}} </ps-label>
                                    <div class="flex flex-row">
                                        <font-awesome-icon :icon="['fas', 'eye']" class="text-secondary-400 dark:text-secondaryDark-grey text-base "  />
                                        <ps-label class="ms-1 font-light text-sm" textColor="text-secondary-400 dark:text-secondaryDark-grey"> {{ $t("item_detail__views") }} </ps-label>
                                    </div>
                                </div>
                                <div class="h-12 border border-gray-500 dark:border-dark-200" />
                                <div class="flex flex-col space-y-0.5 items-center">
                                    
                                    <ps-label class="font-medium text-2xl"> {{productProvider.product?.data?.favouriteCount}} </ps-label>
                                    <div class="flex flex-row">
                                        <ps-icon name="favourite" class="text-secondary-400 dark:text-secondaryDark-grey" w='14' h='14'></ps-icon>
                                        <ps-label class="ms-1 font-light text-sm" textColor="text-secondary-400 dark:text-secondaryDark-grey"> {{ $t("item_detail__favourite") }} </ps-label>
                                    </div>
                                </div>
                            </div> 
                        </div> 
                    </div>
                </div> 
                <!-- end statistic Pscard -->
                <div class="col-span-8 flex sm:hidden w-full">
                    <div class="flex flex-col">
                        <div class="flex flex-wrap">
                            <ps-label class="lg:text-base text-sm font-medium sm:mt-3 mt-1 me-1" textColor="text-secondary-600 dark:text-secondaryDark-white" > {{ productProvider.product.data ? productProvider.product?.data?.title : '' }} </ps-label> 
                            <ps-label class="lg:text-xxs text-3xs font-medium p-1 bg-primary-500 dark:bg-primaryDark-accent lg:h-5 h-4" textColor="text-textLight " > {{ productProvider.product?.data?.isSoldOut == '1' ? $t("item_detail__sold_out") : $t("item_detail__available") }}  </ps-label> 
                        </div>
                        <div class=" mt-2">
                            <div class="flex flex-wrap">
                                <div class="flex flex-col">
                                    <div v-if="productProvider.product.data && productProvider.product?.data?.discountRate!='0' && appInfoProvider?.appInfo?.data?.psItemUploadConfig.discountRate== PsConst.ONE" class="flex flex-col  ">  
                                        <div class="flex flex-row">
                                            <ps-label class="line-through font-medium text-base" > {{ productProvider.product.data ? productProvider.product?.data?.itemCurrency.currencySymbol : '' }} {{ formatPrice(productProvider.product?.data ? productProvider.product?.data?.price : '') }} </ps-label>
                                            <ps-label class=" ps-1 font-medium text-base" > {{ ' - '+parseFloat(productProvider.product?.data.discountRate)+'%' }} </ps-label>
                                        </div> 
                                        <ps-label class="lg:text-3xl text-2xl font-medium pt-1" textColor="text-primary-500 dark:text-primaryDark-accent" > {{ productProvider.product.data ? productProvider.product?.data?.itemCurrency.currencySymbol : '' }} {{ formatPrice(productProvider.product?.data ? parseFloat(productProvider.product?.data?.price)-(parseFloat(productProvider.product?.data?.price)*(parseFloat(productProvider.product?.data?.discountRate)/100)) : '') }} </ps-label>
                                        
                                    </div>
                                    <div v-else class=" ">                    
                                        <ps-label class="lg:text-3xl text-2xl font-medium " textColor="text-primary-500 dark:text-primaryDark-accent"> {{ productProvider.product?.data ? productProvider.product?.data?.itemCurrency.currencySymbol : '' }} {{ formatPrice(productProvider.product?.data ? productProvider.product?.data?.price : '') }} </ps-label>
                                    </div>
                                </div>
                                <!-- <ps-label class="lg:text-3xl text-2xl font-medium " textColor="text-primary-500 dark:text-primaryDark-accent" >{{productProvider.product?.data?.itemCurrency?.currencySymbol}} {{formatPrice(productProvider.product?.data ? productProvider.product?.data?.price : '')}} </ps-label> -->
                                <ps-label v-if="appInfoProvider?.appInfo?.data?.psItemUploadConfig.itemPriceTypeId== PsConst.ONE" class="sm:ml-2 ml-0 mt-3 lg:text-xs text-xxs font-light" textColor="text-secondary-400 dark:text-secondaryDark-grey" > {{ productProvider.product.data ? productProvider.product?.data?.itemPriceType?.name : '' }} </ps-label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                
            <div class="w-full grid lg:grid-cols-10 sm:grid-cols-8 grid-cols-4  gap-x-4 sm:gap-x-3.5 lg:gap-x-0 justify-between container">
                
                <div class="col-span-4 sm:col-span-5  lg:col-span-5 w-full pb-8">

                    <div class="space-x-2 flex my-2">
                       <ps-label class="font-medium lg:text-xs text-xxs" textColor="text-secondary-400 dark:text-secondaryDark-grey " > {{ $t("item_detail__posed_on") }} {{ productProvider.product.data ? productProvider.product?.data.addedDate : '' }} </ps-label>
                        
                    </div>
                    <div v-if="appInfoProvider?.appInfo?.data?.psItemUploadConfig.businessMode== PsConst.ONE">
                        <div v-if=" productProvider.product?.data?.businessMode == '1' " class="flex flex-row space-x-2">
                            <font-awesome-icon :icon="['fas', 'store']" class="text-primary-500 dark:text-primaryDark-accent text-xl "  />
                            
                                <ps-label class="font-medium mt-1" textColor="text-xs text-secondary-500 dark:text-secondaryDark-white"> {{ $t("item_detail__is_shop") }} </ps-label>
                        </div>
                        <div v-else class="flex flex-row space-x-2">
                            <font-awesome-icon :icon="['fas', 'store-slash']" class="text-primary-500 dark:text-primaryDark-accent text-xl "  />
                            
                            <ps-label class="font-medium mt-1" textColor="text-xs text-secondary-500 dark:text-secondaryDark-white"> {{ $t("item_detail__not_shop") }} </ps-label>
                        </div>
                    </div>

                    <div class="my-4 shadow-cardShadow bg-background dark:bg-primaryDark-black">
                        <div class="flex flex-row" >
                            <div class="w-1/2">
                                <ps-label v-if="showSpecification" class="text-center py-2" > {{ $t("item_detail__specification") }} </ps-label>
                                <ps-label v-else @click="showSpecification = !showSpecification" textColor="text-textLight " class="text-center bg-primary-400 dark:bg-primaryDark-100 cursor-pointer py-2" > {{ $t("item_detail__specification") }} </ps-label>  
                            </div>
                             <div class="w-1/2">
                                <ps-label v-if="showSpecification" @click="showSpecification = !showSpecification" textColor="text-textLight " class="py-2 text-center bg-primary-400 dark:bg-primaryDark-100 cursor-pointer" > {{ $t("item_detail__information") }} </ps-label>
                                <ps-label v-else  class="text-center py-2"> {{ $t("item_detail__information") }} </ps-label>  
                            </div>
                        </div>
                        <div v-if="showSpecification">
                            <div class="px-6 pb-6">
                                <div class="mt-3 grid grid-cols-3 gap-4" v-if="productProvider.product?.data && productProvider.product.data.manufacturer.name != ''">
                                    <ps-label class="font-medium text-xs" textColor="text-secondary-400 dark:text-secondaryDark-grey "> {{ $t("item_detail__manufacturer") }} </ps-label>
                                    <ps-label class="col-span-2 font-medium text-xs" textColor="text-secondary-500 dark:text-secondaryDark-white"> {{ productProvider.product.data ? productProvider.product?.data?.manufacturer?.name : '' }} </ps-label>
                                </div>
                                <div class="mt-3 grid grid-cols-3 gap-4" v-if="productProvider.product?.data && productProvider.product.data.model.name != ''">
                                    <ps-label class="font-medium text-xs" textColor="text-secondary-400 dark:text-secondaryDark-grey "> {{ $t("item_detail__model") }} </ps-label>
                                    <ps-label class="col-span-2 font-medium text-xs" textColor="text-secondary-500 dark:text-secondaryDark-white"> {{ productProvider.product.data ? productProvider.product?.data?.model?.name : '' }} </ps-label>
                                </div><div class="mt-3 grid grid-cols-3 gap-4" v-if="productProvider.product?.data && productProvider.product.data.year != '' && appInfoProvider?.appInfo?.data?.psItemUploadConfig.year == PsConst.ONE">
                                    <ps-label class="font-medium text-xs" textColor="text-secondary-400 dark:text-secondaryDark-grey "> {{ $t("item_detail__year") }} </ps-label>
                                    <ps-label class="col-span-2 font-medium text-xs" textColor="text-secondary-500 dark:text-secondaryDark-white"> {{ productProvider.product.data ? productProvider.product?.data?.year : '' }} </ps-label>
                                </div>
                                <div class="mt-3 grid grid-cols-3 gap-4" v-if="productProvider.product?.data && productProvider.product.data.buildType.name != '' && appInfoProvider?.appInfo?.data?.psItemUploadConfig.buildTypeId == PsConst.ONE">
                                    <ps-label class="font-medium text-xs" textColor="text-secondary-400 dark:text-secondaryDark-grey "> {{ $t("item_detail__build_type") }} </ps-label>
                                    <ps-label class="col-span-2 font-medium text-xs" textColor="text-secondary-500 dark:text-secondaryDark-white"> {{ productProvider.product.data ? productProvider.product?.data?.buildType?.name : '' }} </ps-label>
                                </div>
                                <div class="mt-3 grid grid-cols-3 gap-4" v-if="productProvider.product?.data && productProvider.product.data.itemColor.colorValue != '' && appInfoProvider?.appInfo?.data?.psItemUploadConfig.colorId == PsConst.ONE">
                                    <ps-label class="font-medium text-xs" textColor="text-secondary-400 dark:text-secondaryDark-grey "> {{ $t("item_detail__color") }} </ps-label>
                                    <ps-label class="col-span-2 font-medium text-xs" textColor="text-secondary-500 dark:text-secondaryDark-white"> {{ productProvider.product.data ? productProvider.product?.data?.itemColor?.colorValue : '' }} </ps-label>
                                </div>

                                <div class="mt-5" />

                                <div class="mt-3 grid grid-cols-3 gap-4" v-if="productProvider.product?.data && productProvider.product.data.enginePower != '' && appInfoProvider?.appInfo?.data?.psItemUploadConfig.enginePower == PsConst.ONE">
                                    <ps-label class="font-medium text-xs" textColor="text-secondary-400 dark:text-secondaryDark-grey "> {{ $t("item_detail__engine_power") }} </ps-label>
                                    <ps-label class="col-span-2 font-medium text-xs" textColor="text-secondary-500 dark:text-secondaryDark-white"> {{ productProvider.product.data ? productProvider.product?.data?.enginePower : '' }} </ps-label>
                                </div>
                                <div class="mt-3 grid grid-cols-3 gap-4" v-if="productProvider.product?.data && productProvider.product.data.fuelType.name != '' && appInfoProvider?.appInfo?.data?.psItemUploadConfig.fuelTypeId == PsConst.ONE">
                                    <ps-label class="font-medium text-xs" textColor="text-secondary-400 dark:text-secondaryDark-grey "> {{ $t("item_detail__fuel_type") }} </ps-label>
                                    <ps-label class="col-span-2 font-medium text-xs" textColor="text-secondary-500 dark:text-secondaryDark-white"> {{ productProvider.product.data ? productProvider.product?.data?.fuelType?.name : '' }} </ps-label>
                                </div>
                                <div class="mt-3 grid grid-cols-3 gap-4" v-if="productProvider.product?.data && productProvider.product.data.transmission.name != '' && appInfoProvider?.appInfo?.data?.psItemUploadConfig.transmissionId == PsConst.ONE">
                                    <ps-label class="font-medium text-xs" textColor="text-secondary-400 dark:text-secondaryDark-grey "> {{ $t("item_detail__transmission") }} </ps-label>
                                    <ps-label class="col-span-2 font-medium text-xs" textColor="text-secondary-500 dark:text-secondaryDark-white"> {{ productProvider.product.data ? productProvider.product?.data?.transmission?.name : '' }} </ps-label>
                                </div>
                                <div class="mt-3 grid grid-cols-3 gap-4" v-if="productProvider.product?.data && productProvider.product.data.steeringPosition != '' && appInfoProvider?.appInfo?.data?.psItemUploadConfig.steeringPosition == PsConst.ONE">
                                    <ps-label class="font-medium text-xs" textColor="text-secondary-400 dark:text-secondaryDark-grey "> {{ $t("item_detail__steering_position") }} </ps-label>
                                    <ps-label class="col-span-2 font-medium text-xs" textColor="text-secondary-500 dark:text-secondaryDark-white"> {{ productProvider.product.data ? productProvider.product?.data?.steeringPosition : '' }} </ps-label>
                                </div>

                                <div class="mt-5" />

                                <div class="mt-3 grid grid-cols-3 gap-4" v-if="productProvider.product?.data && productProvider.product.data.trimName != '' && appInfoProvider?.appInfo?.data?.psItemUploadConfig.trimName == PsConst.ONE">
                                    <ps-label class="font-medium text-xs" textColor="text-secondary-400 dark:text-secondaryDark-grey "> {{ $t("item_detail__trim_name") }} </ps-label>
                                    <ps-label class="col-span-2 font-medium text-xs" textColor="text-secondary-500 dark:text-secondaryDark-white"> {{ productProvider.product.data ? productProvider.product?.data?.trimName : '' }} </ps-label>
                                </div>
                                <div class="mt-3 grid grid-cols-3 gap-4" v-if="productProvider.product?.data && productProvider.product.data.vehicleId != '' && appInfoProvider?.appInfo?.data?.psItemUploadConfig.vehicleId == PsConst.ONE">
                                    <ps-label class="font-medium text-xs" textColor="text-secondary-400 dark:text-secondaryDark-grey "> {{ $t("item_detail__vehicle_id") }} </ps-label>
                                    <ps-label class="col-span-2 font-medium text-xs" textColor="text-secondary-500 dark:text-secondaryDark-white"> {{ productProvider.product.data ? productProvider.product?.data?.vehicleId : '' }} </ps-label>
                                </div>
                                <div class="mt-3 grid grid-cols-3 gap-4" v-if="productProvider.product?.data && productProvider.product.data.maxPassengers != '' && appInfoProvider?.appInfo?.data?.psItemUploadConfig.maxPassengers == PsConst.ONE">
                                    <ps-label class="font-medium text-xs" textColor="text-secondary-400 dark:text-secondaryDark-grey "> {{ $t("item_detail__max_passengers") }} </ps-label>
                                    <ps-label class="col-span-2 font-medium text-xs" textColor="text-secondary-500 dark:text-secondaryDark-white"> {{ productProvider.product.data ? productProvider.product?.data?.maxPassengers : '' }} </ps-label>
                                </div>
                                <div class="mt-3 grid grid-cols-3 gap-4" v-if="productProvider.product?.data && productProvider.product.data.noOfDoors != '' && appInfoProvider?.appInfo?.data?.psItemUploadConfig.noOfDoors == PsConst.ONE">
                                    <ps-label class="font-medium text-xs" textColor="text-secondary-400 dark:text-secondaryDark-grey "> {{ $t("item_detail__no_of_doors") }} </ps-label>
                                    <ps-label class="col-span-2 font-medium text-xs" textColor="text-secondary-500 dark:text-secondaryDark-white"> {{ productProvider.product.data ? productProvider.product?.data?.noOfDoors : '' }} </ps-label>
                                </div>
                            </div>
                        </div>
                        <div v-else class="px-6 pb-6">
                            <div class="mt-3 grid grid-cols-3 gap-4" v-if="productProvider.product?.data && productProvider.product.data.conditionOfItem.name != '' && appInfoProvider?.appInfo?.data?.psItemUploadConfig.conditionOfItemId == PsConst.ONE">
                                    <ps-label class="font-medium text-xs" textColor="text-secondary-400 dark:text-secondaryDark-grey "> {{ $t("item_detail__condition") }} </ps-label>
                                    <ps-label class="col-span-2 font-medium text-xs" textColor="text-secondary-500 dark:text-secondaryDark-white"> {{ productProvider.product.data ? productProvider.product?.data?.conditionOfItem?.name : '' }} </ps-label>
                                </div>
                                <div class="mt-3 grid grid-cols-3 gap-4" v-if="productProvider.product?.data && productProvider.product.data.mileage != '' && appInfoProvider?.appInfo?.data?.psItemUploadConfig.mileage == PsConst.ONE">
                                    <ps-label class="font-medium text-xs" textColor="text-secondary-400 dark:text-secondaryDark-grey "> {{ $t("item_detail__mileage") }} </ps-label>
                                    <ps-label class="col-span-2 font-medium text-xs" textColor="text-secondary-500 dark:text-secondaryDark-white"> {{ productProvider.product.data ? productProvider.product?.data?.mileage : '' }} </ps-label>
                                </div><div class="mt-3 grid grid-cols-3 gap-4" v-if="productProvider.product?.data && productProvider.product.data.licenceStatus != '' && appInfoProvider?.appInfo?.data?.psItemUploadConfig.licenceStatus == PsConst.ONE">
                                    <ps-label class="font-medium text-xs" textColor="text-secondary-400 dark:text-secondaryDark-grey "> {{ $t("item_detail__licence_status") }} </ps-label>
                                    <ps-label class="col-span-2 font-medium text-xs" textColor="text-secondary-500 dark:text-secondaryDark-white"> {{ productProvider.product?.data?.licenceStatus=='0' ?  $t("item_detail__no") : $t("item_detail__yes") }} </ps-label>
                                </div>
                                <div class="mt-3 grid grid-cols-3 gap-4" v-if="productProvider.product?.data && productProvider.product.data.plateNumber != '' && appInfoProvider?.appInfo?.data?.psItemUploadConfig.plateNumber == PsConst.ONE">
                                    <ps-label class="font-medium text-xs" textColor="text-secondary-400 dark:text-secondaryDark-grey "> {{ $t("item_detail__plate_number") }} </ps-label>
                                    <ps-label class="col-span-2 font-medium text-xs" textColor="text-secondary-500 dark:text-secondaryDark-white"> {{ productProvider.product.data ? productProvider.product?.data?.plateNumber : '' }} </ps-label>
                                </div>
                                <div class="mt-3 grid grid-cols-3 gap-4" v-if="productProvider.product?.data && productProvider.product.data.licenseExpirationDate != '' && appInfoProvider?.appInfo?.data?.psItemUploadConfig.licenseExpirationDate == PsConst.ONE">
                                    <ps-label class="font-medium text-xs" textColor="text-secondary-400 dark:text-secondaryDark-grey "> {{ $t("item_detail__license_expiration_date") }} </ps-label>
                                    <ps-label class="col-span-2 font-medium text-xs" textColor="text-secondary-500 dark:text-secondaryDark-white"> {{ productProvider.product.data ? productProvider.product?.data?.licenseExpirationDate : '' }} </ps-label>
                                </div>
                        </div>
                        
                     </div>

                    <div v-if="appInfoProvider?.appInfo?.data.psItemUploadConfig?.highlightInfo==PsConst.ONE" class="w-full my-6">
                        <ps-label class="px-5 text-sm font-medium" > {{ productProvider.product.data ? productProvider.product?.data?.highlightInformation : '' }} </ps-label>
                    </div>

                    <ps-label v-if="productProvider.product?.data && productProvider.product.data.description != ''" class="text-base " > {{ $t("item_detail__description") }} </ps-label>
                    <ps-label class="text-xs font-light mt-2" textColor="text-secondary-400 dark:text-secondaryDark-grey " > {{ productProvider.product.data ? productProvider.product?.data?.description : '' }} </ps-label>


                </div>

                <div class="hidden lg:block" /> 
                <div class="col-span-4 sm:col-span-3  lg:col-span-4 w-full">

                     <!-- statistic Pscard -->
                    <div v-if="productProvider.product?.data?.user?.userId == loginUserId" class="hidden sm:block mb-8 mt-2">
                        <div class="bg-primary-000 dark:bg-primaryDark-black p-4">
                            <div class="flex flex-row">
                                <ps-icon name="signal" class="text-secondary-500 dark:text-secondaryDark-white"></ps-icon>
                                <p class="ml-2 font-medium">
                                    <ps-label class="text-base "> {{ $t("item_detail__statistic") }} </ps-label>
                                </p>
                            </div>
                            <div class="mt-2">
                                <div class="flex flex-row items-center justify-around">
                                    <div class="flex flex-col space-y-0.5 items-center">
                                        
                                        <ps-label class="font-medium text-2xl"> {{productProvider.product?.data?.touchCount}} </ps-label>
                                        <div class="flex flex-row">
                                            <font-awesome-icon :icon="['fas', 'eye']" class="text-secondary-400 dark:text-secondaryDark-grey text-base "  />
                                            <ps-label class="ms-1 font-light text-sm" textColor="text-secondary-400 dark:text-secondaryDark-grey"> {{ $t("item_detail__views") }} </ps-label>
                                        </div>
                                    </div>
                                    <div class="h-12 border border-gray-500 dark:border-dark-200" />
                                    <div class="flex flex-col space-y-0.5 items-center">
                                        
                                        <ps-label class="font-medium text-2xl"> {{productProvider.product?.data?.favouriteCount}} </ps-label>
                                        <div class="flex flex-row">
                                            <ps-icon name="favourite" class="text-secondary-400 dark:text-secondaryDark-grey" w='14' h='14'></ps-icon>
                                            <ps-label class="ms-1 font-light text-sm" textColor="text-secondary-400 dark:text-secondaryDark-grey"> {{ $t("item_detail__favourite") }} </ps-label>
                                        </div>
                                    </div>
                                </div> 
                            </div> 
                        </div>
                    </div> 
                    <!-- end statistic Pscard -->

                    <!-- admin Pscard -->
                    <ps-card v-if="productProvider.product?.data?.user?.userId != loginUserId" class="">
                        <div class="px-4 pt-4 bg-primary-000 dark:bg-primaryDark-black">
                            <ps-route-link :to="{ name: 'other-profile', params: {user_id: productProvider.product?.data?.user?.userId } }">
                            <div class="flex flex-row" >
                                <div class="flex-grow w-full" >
                                    <div class="flex items-start no-underline text-black cursor-pointer">
                                        <div class="w-10 h-10 ">
                                            <img alt="admin" class="rounded-full bg-transparent w-10 h-10  flex items-center object-cover" :src="productProvider.imageUrl( productProvider.product?.data?.user?.userProfilePhoto ,2)" @error="productProvider.defaultProfileImage" >
                                            
                                        </div>
                                        <div class="w-full flex flex-col ">
                                            <div class="w-full flex flex-row justify-between">
                                                <div class=" flex mt-2 ms-1.5">
                                                    <ps-label class="font-medium text-base " > {{ productProvider.product.data ? productProvider.product?.data?.user?.userName : '' }} </ps-label>
                                                    <img alt="Placeholder" class="mx-1 w-3 h-3" width="15" height="10" src="@/assets/images/mark2.png" v-if="productProvider.product?.data?.user?.isVerifybluemark == '1'">    
                                                </div>
                                                
                                                <div>
                                                    <ps-route-link class="" :to="{ 
                                                        name: 'chat',
                                                        query: { 
                                                            buyer_user_id : loginUserId,
                                                            seller_user_id : productProvider.product?.data?.addedUserId,
                                                            item_name : productProvider.product?.data?.title,
                                                            item_id : productProvider.product?.data?.id,
                                                            item_image_name : productProvider.product?.data?.defaultPhoto.imgPath,
                                                            item_price : getPrice(),
                                                            currency : productProvider.product?.data?.itemCurrency.currencySymbol,
                                                            condition : productProvider.product?.data?.conditionOfItem.name,
                                                            price_type : productProvider.product?.data?.itemPriceType.name,
                                                            chat_flag : PsConst.CHAT_FROM_SELLER,
                                                            is_sold_out : productProvider.product?.data?.isSoldOut,

                                                        }
                                                    }">
                                                    <ps-button class="w-full flex font-medium items-center justify-center" theme="bg-primary-500 dark:bg-primaryDark-accent text-textLight " textSize="text-sm " >
                                                        <font-awesome-icon :icon="['fas', 'comment-alt']" class="text-textLight text-lg lg:me-2"  />
                                                        <span class="lg:flex hidden" >{{ $t("item_detail__chat") }}</span>
                                                    </ps-button>
                                                    </ps-route-link>
                                        
                                                </div>
                                            </div>
                                            <ps-route-link :to="{ name: 'review-list',query: { user_id: productProvider.product?.data?.user?.userId } }">
                                            <div class="flex items-center mt-0">
                                                
                                                <rating :grade="productProvider.product.data ? productProvider.product?.data?.user?.overallRating:0" :maxStars="5" :hasCounter="true" />
                                                <ps-label class="font-light ml-2 text-xs" > {{productProvider.product.data ? productProvider.product?.data?.user?.overallRating:0}} </ps-label>
                                            </div>
                                            </ps-route-link>
                                            <ps-label v-if="productProvider.product.data && productProvider.product.data?.user?.isShowEmail == '1' " class="font-light text-xs mt-1"> {{  productProvider.product.data ? productProvider.product?.data?.user?.userEmail:'' }} </ps-label>
                                        <ps-label v-if="productProvider.product.data && productProvider.product.data?.user?.isShowPhone == '1' " class="font-light text-xs mt-1"> {{  productProvider.product.data ? productProvider.product?.data?.user?.userPhone:'' }} </ps-label>
                                            <ps-label class="font-light text-xs mt-1.5"> {{  productProvider.product.data ? productProvider.product?.data?.user?.userAboutMe:'' }} </ps-label>
                                        </div>
                                    </div>
                                </div>  
                                
                            </div>
                            </ps-route-link>
                        </div> 
                    </ps-card>
                    <!-- end admin Pscard -->

                    <!-- item location Pscard -->
                    <div v-if="productProvider.product?.data" class="mt-0 mb-4 p-4 bg-primary-000 dark:bg-primaryDark-black">
                        <ps-label  class=" text-base mb-1.5"  > {{ $t("item_detail__item_location") }} </ps-label>
                        <div class="flex flex-row"  v-if="productProvider.product?.data?.address != '' && appInfoProvider?.appInfo?.data.psItemUploadConfig?.address==PsConst.ONE">
                            <ps-icon name="location" class="text-secondary-400 dark:text-secondaryDark-grey" h="20" w="20" ></ps-icon>
                            <p class="ml-2">
                                <ps-label class="font-light text-sm  my-2" textColor="text-secondary-400 dark:text-secondaryDark-grey" > {{ productProvider.product?.data?.address }} </ps-label>
                            </p>
                        </div>
                        

                        <map-with-pin-picker v-if="appInfoProvider?.appInfo?.data.frontendConfigSetting.googleMap == PsConst.ONE" :lat="parseFloat(productProvider.product?.data?.lat + '')" :lng="parseFloat(productProvider.product?.data?.lng + '')" :draggable="false" />

                        <open-street-map v-if="appInfoProvider?.appInfo?.data.frontendConfigSetting.openStreetMap == PsConst.ONE" class="h-68" :lat="parseFloat(productProvider.product?.data?.lat + '')" :lng="parseFloat(productProvider.product?.data?.lng + '')" :dragValue="false" />
                    </div>
                    <!-- end item location Pscard -->
                    <!-- safety tips  -->
                    <div v-if="loginUserId != productProvider.product?.data?.user?.userId" class="my-2 mt-4 p-4 bg-primary-000 dark:bg-primaryDark-black ">
                        <div class="flex flex-row">
                            <ps-icon name="safety" class="text text-secondary-500 dark:text-secondaryDark-white"></ps-icon>
                            <p class="ml-2">
                                <ps-label class="text-base" > {{ $t("item_detail__safety_tips") }}  </ps-label>
                            </p>
                        </div>
                        
                            
                        <ps-label class="p-2 text-sm font-light" > {{ showSafetyTip ? aboutUsProvider.aboutus?.data?.safetyTips : aboutUsProvider.aboutus?.data?.safetyTips.slice(0,175)+'....' }} </ps-label>
                        <div class="flex items-end justify-end">
                        <ps-label v-if="showSafetyTip == false" @click="showSafetyTip=true" class="flex-grow-0 text-xxs font-medium cursor-pointer" textColor="text-primary-500 dark:text-primaryDark-accent"> 
                            {{ $t("item_detail__see_more") }} 
                            <font-awesome-icon :icon="['fas', 'chevron-circle-right']" class="text-primary-500 dark:text-primaryDark-accent ms-1 mt-0.5 text-xxs"  />
                        </ps-label>
                        <ps-label v-else @click="showSafetyTip=false" class="flex-grow-0 text-xxs font-medium cursor-pointer" textColor="text-primary-500 dark:text-primaryDark-accent"> 
                            {{ $t("item_detail__see_less") }} 
                            <font-awesome-icon :icon="['fas', 'chevron-circle-up']" class="text-primary-500 dark:text-primaryDark-accent ms-1 mt-0.5 text-xxs"  />
                        </ps-label>
                        </div>
                    </div>        
                    <!-- end safety tips  -->
                    
                </div>
            </div>
            </div>
        </div>
        
    
    <!-- google adsense desktop view -->
    <div class="w-mobile sm:w-median lg:w-large mx-auto mt-2">
        <ps-ad-sense adFormat="horizontal"></ps-ad-sense>
    </div>
    <map-with-pin-modal ref="map_with_pin_modal" />
    <ps-loading-dialog ref="ps_loading_dialog" />
    <ps-confirm-dialog ref="ps_confirm_dialog" />
    <ps-error-dialog ref="ps_error_dialog" />
    <gallery-detail-horizontal-swiper ref="gallery_detail"  />
    <promote-item-modal ref="promote_item_modal" />
    <share-to-social-modal ref="share_modal" />
    </div>
</template>

<script  lang="ts">
//Libs
import { useRoute } from 'vue-router';
import router from "@/router";

// Objects
import PsConst from '@/object/constant/ps_constants';
import { ref, defineAsyncComponent, onMounted } from 'vue';

// Components
import PsLabel from '@/components/core/label/PsLabel.vue';
// import PsLabelCaption2 from '@/components/core/label/PsLabelCaption2.vue';
// import PsLabelCaption3 from '@/components/core/label/PsLabelCaption3.vue';
import PsIcon from '@/components/core/icons/PsIcon.vue';
import PsCard from '@/components/core/card/PsCard.vue';
import PsButton from '@/components/core/buttons/PsButton.vue';
import GalleryHorizontalSwiper from '@/components/modules/gallery/GalleryHorizontalSwiper.vue';
import GalleryDetailHorizontalSwiper from '@/components/modules/gallery/GalleryDetailHorizontalSwiper.vue';
import Rating from '@/components/core/rating/Rating.vue';
import PsLoadingDialog from '@/components/core/dialog/PsLoadingDialog.vue';
import PsConfirmDialog from '@/components/core/dialog/PsConfirmDialog.vue';
import PsErrorDialog from '@/components/core/dialog/PsErrorDialog.vue';
import PromoteItemModal from '@/components/modules/item/PromoteItemModal.vue';
import MapWithPinModal from '@/components/layouts/map/MapWithPinModal.vue';
import ShareToSocialModal from '@/components/layouts/share/ShareToSocialModal.vue';
import PsRouteLink from '@/components/core/link/PsRouteLink.vue';
import PsAdSense from '@/components/core/adsense/PsAdSense.vue';


// Models
import { createProductProviderState } from '@/store/modules/item/ProductProvider';
import { PsValueProvider } from '@/store/modules/core/PsValueProvider';
import { createGalleryProviderState } from '@/store/modules/gallery/GalleryProvider';
import { createAboutUsProviderState } from "@/store/modules/aboutus/AboutUsProvider";
import { createFavouriteItemProviderState } from "@/store/modules/item/FavouriteItemProvider";
import { usePsAppInfoProviderState } from '@/store/modules/appinfo/AppInfoProvider';
import { createTouchCountProviderState } from '@/store/modules/item/TouchCountProvider';
import { createOfferProviderState } from '@/store/modules/offer/OfferProvider';

// Holders
import ReportItemHolder from '@/object/holder/ReportItemHolder';
import MarkSoldOutItemParameterHolder from '@/object/holder/MarkSoldOutItemParameterHolder'
import AppInfoParameterHolder from '@/object/holder/AppInfoParameterHolder';
import TouchCountParameterHolder from "@/object/holder/TouchCountParameterHolder";
import { i18n } from '@/assets/locales/index';
import PsUtils from '@/utils/PsUtils';
import { createReportedItemProviderState } from '@/store/modules/item/ReportedItemProvider';
import PsStatus from '@/api/common/PsStatus';
import format from 'number-format.js'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faTrashAlt,faEdit,faStore,faStoreSlash,faEye,faShare,faChevronCircleUp,faChevronCircleRight,faCommentAlt,faFlag } from '@fortawesome/free-solid-svg-icons';
library.add(faHeart,faTrashAlt,faEdit,faStore,faStoreSlash,faEye,faShare,faChevronCircleUp,faChevronCircleRight,faCommentAlt,faFlag)

const MapWithPinPicker = defineAsyncComponent(() => import('@/components/layouts/map/MapWithPinPicker.vue'))
const OpenStreetMap = defineAsyncComponent(() => import('@/components/layouts/map/OpenStreetMap.vue'))

export default {
    name : "ItemDetailView",
    components : {
        PsConfirmDialog,
        PsLabel,
        // PsLabelCaption2,
        // PsLabelCaption3,
        PsIcon,
        PsCard,
        PsButton,
        GalleryHorizontalSwiper,
        Rating,
        PsLoadingDialog,
        PsErrorDialog,
        GalleryDetailHorizontalSwiper,
        PromoteItemModal,
        MapWithPinModal,
        ShareToSocialModal,
        PsRouteLink,
        PsAdSense,
        OpenStreetMap
    },
    setup() {
        const route = useRoute();
        // Get Route Data
        const itemId = route.query.item_id?.toString() ?? '';
        const itemName = route.query.item_name?.toString() ?? '';
     
        // Inject Providers
        const productProvider = createProductProviderState();
        const galleryProvider = createGalleryProviderState();
        const aboutUsProvider = createAboutUsProviderState();
        const reportedItemProvider = createReportedItemProviderState();
        const FavouriteItemProvider = createFavouriteItemProviderState();
        const touchCountProvider = createTouchCountProviderState();
        const offerProvider = createOfferProviderState();

        const showSafetyTip = ref(false);
        const showSpecification = ref(true);
        const dataReady = ref(false);

        const imageCount = ref(1);
        let totalCount = ref(0);

        // Init Variables
        const psValueHolder = PsValueProvider.psValueHolder;
        
        const reportItemHolder =new ReportItemHolder();
        const markAsSoldHolder = new MarkSoldOutItemParameterHolder();
        const loginUserId = ref(psValueHolder.getLoginUserId());
        const ps_loading_dialog = ref();
        const ps_confirm_dialog = ref();
        const ps_error_dialog = ref();
        const gallery_detail = ref();
        const isPromote = ref(false);
        const isAllPaymentDisable = ref();
        const promote_item_modal = ref();
        const map_with_pin_modal = ref();
        const share_modal = ref();
        const holder = new TouchCountParameterHolder();
        const isVideoSetting = ref(false);

        onMounted(() => {
            // Load Item Data
            loadDataForItemDetail();
            holder.itemId = itemId;
            holder.userId = loginUserId.value;
            touchCountProvider.postTouchCount(holder);
        });
        

        async function loadDataForItemDetail() {
            aboutUsProvider.loadAboutUs();
            await productProvider.loadItem(itemId, loginUserId.value );
            PsUtils.log(productProvider.product.data);
            await galleryProvider.loadGalleryList(appInfoProvider.appInfo.data.frontendConfigSetting.isEnableVideoSetting,itemId,PsConst.ITEM_TYPE, productProvider.product?.data.videoThumbnail);
            if(productProvider.product?.data.isOwner == PsConst.ONE &&
                productProvider.product?.data.status == PsConst.ONE &&
                (productProvider.product?.data.paidStatus == PsConst.ADSNOTAVAILABLE || 
                productProvider.product?.data?.paidStatus == PsConst.ADSFINISHED) &&
                !isAllPaymentDisable.value) {
                isPromote.value = true;
               
            }else {
                isPromote.value = false;
                                
            }
            dataReady.value = true;
        }

        if(!isAllPaymentDisable.value) {
            isAllPaymentDisableFun();
        }

        const appInfoProvider = usePsAppInfoProviderState();
        const appInfoParameterHolder = new AppInfoParameterHolder();
        appInfoParameterHolder.userId = PsValueProvider.psValueHolder.getLoginUserId();
        
        async function loadAppInfo(){
            await appInfoProvider.loadDeleteHistory(appInfoParameterHolder);
            if(appInfoProvider.appInfo.data.frontendConfigSetting.isEnableVideoSetting == PsConst.ONE){
                isVideoSetting.value = true;
            }
            if( parseInt(appInfoProvider.appInfo.data.psAppSetting.maxImgUploadOfItem) >=1 ){
                imageCount.value = parseInt(appInfoProvider.appInfo.data.psAppSetting.maxImgUploadOfItem);
                //for video upload
                totalCount.value = imageCount.value + 1;
                
            }
        }
        loadAppInfo();
       
        function isAllPaymentDisableFun() {
            
            if(appInfoProvider?.appInfo?.data != null &&
                appInfoProvider?.appInfo?.data.inAppPurchasedEnabled == PsConst.ZERO &&
                appInfoProvider?.appInfo?.data.stripeEnable == PsConst.ZERO &&
                appInfoProvider?.appInfo?.data.paypalEnable == PsConst.ZERO &&
                appInfoProvider?.appInfo?.data.payStackEnabled == PsConst.ZERO &&
                appInfoProvider?.appInfo?.data.razorEnable == PsConst.ZERO &&
                appInfoProvider?.appInfo?.data.offlineEnabled == PsConst.ZERO ) {
                    isAllPaymentDisable.value = true;
                } else {
                    isAllPaymentDisable.value = false;
                }
        }

        function promoteClicked() {
            promote_item_modal.value.openModal(
                productProvider.product?.data?.id
            );
        }

        function showGalleryDetail(gallery, galleryList ){

            let tempGallery = JSON.parse(JSON.stringify(gallery));
            let tempGalleryList = JSON.parse(JSON.stringify(galleryList));

            if(productProvider.product.data.video.imgId != '' && isVideoSetting.value == true){

                if(gallery == galleryList[0]){
                    tempGallery = productProvider.product.data.video;
                }
                
                tempGalleryList.shift();
                tempGalleryList.unshift(productProvider.product.data.video);
            }
            PsUtils.log(tempGalleryList);
          
            gallery_detail.value.openModal(tempGallery , tempGalleryList);
        }

        async function favouriteClicked() {
           
            if(psValueHolder.isUserLoggedIn()){
                ps_loading_dialog.value.openModal();
                if( productProvider.product.data.isFavourited == '1' ){
                    ps_loading_dialog.value.message = i18n.global.t('item_detail__removing_item_from_favourite');
                }else{
                    ps_loading_dialog.value.message = i18n.global.t('item_detail__adding_item_to_favourite');
                }
                
                await FavouriteItemProvider.postFavourite(itemId, loginUserId.value);
               
                await loadDataForItemDetail();
                ps_loading_dialog.value.closeModal();
            }
            else{
                let tempParams = {};
                tempParams = route.query;
                tempParams['redirect'] = route.name;
                router.push({name : 'login', query : tempParams, params : route.params });
            }
            
        }

        // Report Item Functions
        function deleteClicked() {
            ps_confirm_dialog.value.openModal(
                i18n.global.t('item_detail__confirm'),
                i18n.global.t('item_detail__confirm_to_delete_item'),
                i18n.global.t('item_detail__delete'),
                i18n.global.t('item_detail__cancel'),
                () => {
                    doDelete()
                },
                () => {
                    PsUtils.log("Cancel");
                }
            );
            
        }
        async function doDelete(){
            
            const item = await productProvider.userDeleteItem(itemId);
            if(item.status == PsStatus.SUCCESS){
                router.push({
                    name: "dashboard",
                });
            }
            else{
                ps_error_dialog.value.openModal(item.message);
             
            }
            
        }

        // Report Item Functions
        function reportItemClicked() {
            if(psValueHolder.isUserLoggedIn()){
                ps_confirm_dialog.value.openModal(
                    i18n.global.t('item_detail__confirm'),
                    i18n.global.t('item_detail__confirm_to_report_item'),
                    i18n.global.t('item_detail__report'),
                    i18n.global.t('item_detail__cancel'),
                    () => {
                        doReport();
                    },
                    () => {
                        PsUtils.log("Cancel");
                    }
                );
            }
            else{
                let tempParams = {};
                tempParams = route.query;
                tempParams['redirect'] = route.name;
                router.push({name : 'login', query : tempParams, params : route.params });
            }
            
            
        }
        async function doReport(){
            reportItemHolder.itemId = itemId;
            reportItemHolder.reportedUserId = loginUserId.value;
            const item = await reportedItemProvider.addReportItem(reportItemHolder);
            if(item.message == "You have already reported to this item."){
                ps_error_dialog.value.openModal(item.message);
              
            }
            else{
                router.push({
                    name: "dashboard",
                });
            }
            
        }
        function shareClicked(url){ 
            share_modal.value.openModal(url, itemId, itemName);
        }
        function formatPrice(value) {
            if(value.toString() == '0') {
                return i18n.global.t('item_price__free');
            }else {
                return format(appInfoProvider.appInfo.data.frontendConfigSetting.priceFormat, value)
            }
        }
        async function markAsSold(){
        
            if(psValueHolder.isUserLoggedIn()){
                ps_confirm_dialog.value.openModal(
                    i18n.global.t('item_detail__confirm'),
                    i18n.global.t('item_detail__confirm_to_mark_as_sold'),
                    i18n.global.t('item_detail__mark_as_sold'),
                    i18n.global.t('item_detail__cancel'),
                    async () => {
                        markAsSoldHolder.itemId = productProvider.product?.data?.id;

                        ps_loading_dialog.value.openModal();

                        await offerProvider.markAsSoldFromDetail(loginUserId.value, markAsSoldHolder);
                        await loadDataForItemDetail();

                        ps_loading_dialog.value.closeModal();
                    },
                    () => {
                        PsUtils.log("Cancel");
                    }
                );
        
                
            }else{
                let tempParams = {};
                tempParams = route.query;
                tempParams['redirect'] = route.name;
                router.push({name : 'login', query : tempParams, params : route.params });
            }
        }
        function getPrice(){
            if(productProvider.product.data && productProvider.product.data.discountRate!='0' && appInfoProvider.appInfo.data.psItemUploadConfig.discountRate== PsConst.ONE){
                return parseFloat(productProvider.product.data.price)-(parseFloat(productProvider.product.data.price)*(parseFloat(productProvider.product.data.discountRate)/100));
            }else{
                return productProvider.product?.data?.price;
            }
        }

        return {
            getPrice,
            dataReady,
            appInfoProvider,
            loginUserId,
            itemId,
            markAsSold,
            itemName,
            productProvider,
            galleryProvider,
            aboutUsProvider,
            favouriteClicked,
            ps_loading_dialog,
            reportItemClicked,
            ps_confirm_dialog,
            ps_error_dialog,
            showGalleryDetail,
            gallery_detail,
            isPromote,
            promoteClicked,
            promote_item_modal,
            map_with_pin_modal,
            share_modal,
            shareClicked,
            deleteClicked,
            PsConst,
            MapWithPinPicker,
            showSafetyTip,
            showSpecification,
            formatPrice,
            totalCount,
            imageCount

        }
    }
}
</script>