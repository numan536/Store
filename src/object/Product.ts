import { PsObject } from "@/object/core/PsObject";
import DefaultPhoto from "./DefaultPhoto";
import Manufacturer from "./Manufacturer";
import Model from "./Model";
import ItemColor from "./ItemColor";
import FuelType from "./FuelType";
import BuildType from "./BuildType";
import SellerType from "./SellerType";
import ItemType from "./ItemType";
import ItemPriceType from "./ItemPriceType";
import ItemCurrency from "./ItemCurrency";
import ItemLocation from "./ItemLocation";
import ItemLocationTownship from "./ItemLocationTownship";
import ConditionOfItem from "./ConditionOfItem";
import Transmission from "./Transmission";
import User from "./User";

export default class Product extends PsObject<Product> {

    id : string = '';
    itemTypeId : string = '';
    itemPriceTypeId : string = '';
    itemCurrencyId : string = '';
    itemLocationId : string = '';
    itemLocationTownshipId : string = '';
    conditionOfItemId : string = '';
    colorId : string = '';
    fuelTypeId : string = '';
    buildTypeId : string = '';
    modelId : string = '';
    manufacturerId : string = '';
    sellerTypeId : string = '';
    transmissionId : string = '';
    description : string = '';
    highlightInformation : string = '';
    price : string = '';
    businessMode : string = '';
    isSoldOut : string = '';
    title : string = '';
    address : string = '';
    lat : string = '';
    lng : string = '';
    status : string = '';
    addedDate : string = '';
    addedUserId : string = '';
    updatedDate : string = '';
    updatedUserId : string = '';
    updatedFlag : string = '';
    touchCount : string = '';
    favouriteCount : string = '';
    plateNumber : string = '';
    enginePower : string = '';
    steeringPosition : string = '';
    noOfOwner : string = '';
    trimName : string = '';
    vehicleId : string = '';
    priceUnit : string = '';
    year : string = '';
    licenceStatus : string = '';
    maxPassengers : string = '';
    noOfDoors : string = '';
    mileage : string = '';
    licenseExpirationDate : string = '';
    isPaid : string = '';
    dynamicLink : string = '';
    paymentType : string = '';
    addedDateStr : string = '';
    paidStatus : string = '';
    discountPrice : string = '';
    photoCount : string = '';
    videoCount : string = '';
    defaultPhoto : DefaultPhoto = new DefaultPhoto();
    video: DefaultPhoto = new DefaultPhoto();
    videoThumbnail: DefaultPhoto = new DefaultPhoto();
    manufacturer : Manufacturer = new Manufacturer();
    model : Model = new Model();
    itemType : ItemType = new ItemType();
    itemPriceType : ItemPriceType = new ItemPriceType();
    itemCurrency : ItemCurrency = new ItemCurrency();
    itemLocation : ItemLocation = new ItemLocation();
    itemLocationTownship : ItemLocationTownship = new ItemLocationTownship();
    conditionOfItem : ConditionOfItem = new ConditionOfItem();
    itemColor : ItemColor = new ItemColor();
    fuelType : FuelType = new FuelType();
    buildType : BuildType = new BuildType();
    sellerType : SellerType = new SellerType();
    transmission : Transmission = new Transmission();
    user : User = new User();
    isFavourited : string = '' ;
    isOwner : string = '';
    discountRate : string = '';
    adType : string = '';

    init(

        id : string,
        itemTypeId : string,
        itemPriceTypeId : string,
        itemCurrencyId : string,
        itemLocationId : string,
        itemLocationTownshipId : string,
        conditionOfItemId : string,
        colorId : string,
        fuelTypeId : string,
        buildTypeId : string,
        modelId : string,
        manufacturerId : string,
        sellerTypeId : string,
        transmissionId : string,
        description : string,
        highlightInformation : string,
        price : string,
        businessMode : string,
        isSoldOut : string,
        title : string,
        address : string,
        lat : string,
        lng : string,
        status : string,
        addedDate : string,
        addedUserId : string,
        updatedDate : string,
        updatedUserId : string,
        updatedFlag : string,
        touchCount : string,
        favouriteCount : string,
        plateNumber : string,
        enginePower : string,
        steeringPosition : string,
        noOfOwner : string,
        trimName : string,
        vehicleId : string,
        priceUnit : string,
        year : string,
        licenceStatus : string,
        maxPassengers : string,
        noOfDoors : string,
        mileage : string,
        licenseExpirationDate : string,
        isPaid : string,
        dynamicLink : string,
        paymentType : string,
        addedDateStr : string,
        paidStatus : string,
        discountPrice : string,
        photoCount : string,
        videoCount : string,
        defaultPhoto : DefaultPhoto,
        video: DefaultPhoto,
        videoThumbnail: DefaultPhoto,
        manufacturer : Manufacturer,
        model : Model,
        itemType : ItemType,
        itemPriceType : ItemPriceType,
        itemCurrency : ItemCurrency,
        itemLocation : ItemLocation,
        itemLocationTownship : ItemLocationTownship,
        conditionOfItem : ConditionOfItem,
        itemColor : ItemColor,
        fuelType : FuelType,
        buildType : BuildType,
        sellerType : SellerType,
        transmission : Transmission,
        user : User,
        isFavourited : string,
        isOwner : string,    
        discountRate : string,  
        adType : string,

    ) {
        this.id = id;
        this.manufacturerId = manufacturerId;
        this.modelId = modelId;
        this.itemTypeId = itemTypeId;
        this.itemPriceTypeId = itemPriceTypeId;
        this.itemCurrencyId = itemCurrencyId;
        this.itemLocationId = itemLocationId;
        this.itemLocationTownshipId = itemLocationTownshipId;
        this.conditionOfItemId = conditionOfItemId;
        this.colorId = colorId;
        this.fuelTypeId = fuelTypeId;
        this.buildTypeId = buildTypeId;
        this.sellerTypeId = sellerTypeId;
        this.transmissionId = transmissionId;
        this.description = description;
        this.highlightInformation  = highlightInformation;
        this.price = price;
        this.businessMode = businessMode;
        this.isSoldOut = isSoldOut;
        this.title = title;
        this.address = address;
        this.lat = lat;
        this.lng = lng;
        this.status = status;
        this.addedDate = addedDate;
        this.addedUserId = addedUserId;
        this.updatedDate = updatedDate;
        this.updatedUserId = updatedUserId;
        this.updatedFlag = updatedFlag;
        this.touchCount = touchCount;
        this.favouriteCount = favouriteCount;
        this.plateNumber = plateNumber;
        this.enginePower = enginePower;
        this.steeringPosition = steeringPosition;
        this.noOfOwner = noOfOwner;
        this.trimName = trimName;
        this.vehicleId = vehicleId;
        this.priceUnit = priceUnit;
        this.year = year;
        this.licenceStatus = licenceStatus;
        this.maxPassengers = maxPassengers;
        this.noOfDoors = noOfDoors;
        this.mileage = mileage;
        this.licenseExpirationDate = licenseExpirationDate;
        this.isPaid = isPaid;
        this.dynamicLink = dynamicLink;
        this.paymentType = paymentType;
        this.addedDateStr = addedDateStr;
        this.paidStatus = paidStatus;
        this.discountPrice = discountPrice;
        this.photoCount = photoCount;
        this.videoCount = videoCount;
        this.defaultPhoto = defaultPhoto;
        this.video = video;
        this.videoThumbnail = videoThumbnail;
        this.manufacturer = manufacturer;
        this.model = model;
        this.itemType = itemType;
        this.itemPriceType = itemPriceType;
        this.itemCurrency = itemCurrency;
        this.itemLocation = itemLocation;
        this.itemLocationTownship = itemLocationTownship;
        this.conditionOfItem = conditionOfItem;
        this.itemColor = itemColor;
        this.fuelType = fuelType;
        this.buildType = buildType;
        this.sellerType = sellerType;
        this.transmission = transmission;
        this.user = user;
        this.isFavourited = isFavourited ;
        this.isOwner = isOwner;
        this.discountRate = discountRate;
        this.adType = adType;
        
        return this;

    }

    getPrimaryKey(): string {
        return this.id;
    }

    toMap(object: Product): any {
        const map = {};

        map['id'] = object.id;
        map['manufacturer_id'] = object.manufacturerId;
        map['model_id'] = object.modelId;
        map['item_type_id'] = object.itemTypeId;
        map['item_price_type_id'] = object.itemPriceTypeId;
        map['item_currency_id'] = object.itemCurrencyId;
        map['item_location_id'] = object.itemLocationId;
        map['item_location_township_id'] = object.itemLocationTownshipId;
        map['condition_of_item_id'] = object.conditionOfItemId;
        map['color_id'] = object.colorId;
        map['fuel_type_id'] = object.fuelTypeId;
        map['build_type_id'] = object.buildTypeId;
        map['seller_type_id'] = object.sellerTypeId;
        map['description'] = object.description;
        map['highlight_info '] = object.highlightInformation;
        map['price'] = object.price;
        map['transmission_id'] = object.transmissionId;
        map['business_mode'] = object.businessMode;
        map['is_sold_out'] = object.isSoldOut;
        map['title'] = object.title;
        map['address'] = object.address;
        map['lat'] = object.lat;
        map['lng'] = object.lng;
        map['status'] = object.status;
        map['added_date'] = object.addedDate;
        map['added_user_id'] = object.addedUserId;
        map['updated_date'] = object.updatedDate;
        map['updated_user_id'] = object.updatedUserId;
        map['updated_flag'] = object.updatedFlag;
        map['touch_count'] = object.touchCount;
        map['favourite_count'] = object.favouriteCount;
        map['plate_number'] = object.plateNumber;
        map['engine_power'] = object.enginePower;
        map['steering_position'] = object.steeringPosition;
        map['no_of_owner'] = object.noOfOwner;
        map['trim_name'] = object.trimName;
        map['vehicle_id'] = object.vehicleId;
        map['price_unit'] = object.priceUnit;
        map['year'] = object.year;
        map['licence_status'] = object.licenceStatus;
        map['max_passengers'] = object.maxPassengers;
        map['no_of_doors'] = object.noOfDoors;
        map['mileage'] = object.mileage;
        map['license_expiration_date'] = object.licenseExpirationDate;
        map['is_paid'] = object.isPaid;
        map['dynamic_link'] = object.dynamicLink;
        map['payment_type'] = object.paymentType;
        map['added_date_str'] = object.addedDateStr;
        map['paid_status'] = object.paidStatus;
        map['discounted_price'] = object.discountPrice;
        map['photo_count'] = object.photoCount;
        map['video_count'] = object.videoCount;
        map['default_photo'] = new DefaultPhoto().toMap(object.defaultPhoto);
        map['default_video'] = new DefaultPhoto().toMap(object.video);
        map['default_video_icon'] = new DefaultPhoto().toMap(object.videoThumbnail);
        map['manufacturer'] = new Manufacturer().toMap(object.manufacturer);
        map['model'] = new Model().toMap(object.model);
        map['item_type'] = new ItemType().toMap(object.itemType);
        map['item_price_type'] = new ItemPriceType().toMap(object.itemPriceType);
        map['item_currency'] = new ItemCurrency().toMap(object.itemCurrency);
        map['item_location'] = new ItemLocation().toMap(object.itemLocation);
        map['item_location_township'] = new ItemLocationTownship().toMap(object.itemLocationTownship);
        map['condition_of_item'] = new ConditionOfItem().toMap(object.conditionOfItem);
        map['color'] = new ItemColor().toMap(object.itemColor);
        map['fuel_type'] = new FuelType().toMap(object.fuelType);
        map['build_type'] = new BuildType().toMap(object.buildType);
        map['seller_type'] = new SellerType().toMap(object.sellerType);
        map['transmission'] = new Transmission().toMap(object.transmission);
        map['user'] = new User().toMap(object.user);
        map['is_favourited'] = object.isFavourited ;
        map['is_owner'] = object.isOwner;
        map['discount_rate_by_percentage'] = object.discountRate;
        map['ad_type'] = object.adType;

      


        return map;
    }

    toMapList(objectList: Product[]): any[] {
        const mapList: any[] = [];
        for (let i = 0; i < objectList.length; i++) {
            if (objectList[i] != null) {
                mapList.push(this.toMap(objectList[i]));
            }
        }

        return mapList;
    }

    fromMap(obj: any) {
        return new Product().init(

            obj.id,
            obj.item_type_id,
            obj.item_price_type_id,
            obj.item_currency_id,
            obj.item_location_id,
            obj.item_location_township_id,
            obj.condition_of_item_id,
            obj.color_id,
            obj.fuel_type_id,
            obj.build_type_id,
            obj.model_id,
            obj.manufacturer_id,
            obj.seller_type_id,
            obj.transmission_id,
            obj.description,
            obj.highlight_info,
            obj.price,
            obj.business_mode,
            obj.is_sold_out,
            obj.title,
            obj.address,
            obj.lat,
            obj.lng,
            obj.status,
            obj.added_date,
            obj.added_user_id,
            obj.updated_date,
            obj.updated_user_id,
            obj.updated_flag,
            obj.touch_count,
            obj.favourite_count,
            obj.plate_number,
            obj.engine_power,
            obj.steering_position,
            obj.no_of_owner,
            obj.trim_name,
            obj.vehicle_id,
            obj.price_unit,
            obj.year,
            obj.licence_status,
            obj.max_passengers,
            obj.no_of_doors,
            obj.mileage,
            obj.license_expiration_date,
            obj.is_paid,
            obj.dynamic_link,
            obj.payment_type,
            obj.added_date_str,
            obj.paid_status,
            obj.discounted_price,
            obj.photo_count,
            obj.video_count,
            new DefaultPhoto().fromMap(obj.default_photo),
            new DefaultPhoto().fromMap(obj.default_video),
            new DefaultPhoto().fromMap(obj.default_video_icon),
            new Manufacturer().fromMap(obj.manufacturer),
            new Model().fromMap(obj.model),
            new ItemType().fromMap(obj.item_type),
            new ItemPriceType().fromMap(obj.item_price_type),
            new ItemCurrency().fromMap(obj.item_currency),
            new ItemLocation().fromMap(obj.item_location),
            new ItemLocationTownship().fromMap(obj.item_location_township),
            new ConditionOfItem().fromMap(obj.condition_of_item),
            new ItemColor().fromMap(obj.color),
            new FuelType().fromMap(obj.fuel_type),
            new BuildType().fromMap(obj.build_type),
            new SellerType().fromMap(obj.seller_type),
            new Transmission().fromMap(obj.transmission),
            new User().fromMap(obj.user),
            obj.is_favourited,
            obj.is_owner,
            obj.discount_rate_by_percentage,
            obj.ad_type
            
        );
    }

    fromMapList(objList: any[]): Product[] {
        const productList: Product[] = [];
        for (const obj in objList) {
            if (obj != null) {
                productList.push(this.fromMap(obj));
            }
        }

        return productList;
    }
}
