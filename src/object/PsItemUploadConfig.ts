import { PsObject } from "./core/PsObject";

export default class PsItemUploadConfig extends PsObject<PsItemUploadConfig>{

   
    itemTypeId : string = '';
    itemPriceTypeId : string = '';
    conditionOfItemId : string = '';
    image : string = '';
    video : string = '';
    videoIcon : string = '';
    discountRate : string = '';
    businessMode : string = '';
    highlightInfo : string = '';
    colorId : string = '';
    fuelTypeId : string = '';
    buildTypeId : string = '';
    sellerTypeId : string = '';
    transmissionId : string = '';
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
    address : string = '';
    
   
    init(
        
        itemTypeId : string,
        itemPriceTypeId : string,
        conditionOfItemId : string,
        image : string,
        video : string,
        videoIcon : string,
        discountRate : string,
        businessMode : string,
        highlightInfo : string,
        colorId : string,
        fuelTypeId : string,
        buildTypeId : string,
        sellerTypeId : string,
        transmissionId : string,
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
        address : string,
        

       

    ) {
        
        this.itemTypeId = itemTypeId;
        this.itemPriceTypeId = itemPriceTypeId;
        this.conditionOfItemId = conditionOfItemId;
        this.image = image;
        this.video = video;
        this.videoIcon = videoIcon;
        this.discountRate = discountRate;
        this.businessMode = businessMode;
        this.highlightInfo = highlightInfo;
        this.colorId = colorId;
        this.fuelTypeId = fuelTypeId;
        this.buildTypeId = buildTypeId;
        this.sellerTypeId = sellerTypeId;
        this.transmissionId = transmissionId;
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
        this.address = address;
        

        return this;

    }

    getPrimaryKey(): string {
        return this.itemTypeId;
    }

    toMap(object: PsItemUploadConfig): any {
        const map = {};
       
        map['item_type_id'] = object.itemTypeId;
        map['item_price_type_id'] = object.itemPriceTypeId;
        map['condition_of_item_id'] = object.conditionOfItemId;
        map['image'] = object.image;
        map['video'] = object.video;
        map['video_icon'] = object.videoIcon;
        map['discount_rate_by_percentage'] = object.discountRate;
        map['business_mode'] = object.businessMode;
        map['highlight_info'] = object.highlightInfo;
        map['color_id'] = object.colorId;
        map['fuel_type_id'] = object.fuelTypeId;
        map['build_type_id'] = object.buildTypeId;
        map['seller_type_id'] = object.sellerTypeId;
        map['transmission_id'] = object.transmissionId;
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
        map['licence_expiration_date'] = object.licenseExpirationDate;
        map['address'] = object.address;
        
        
        return map;
    }

    toMapList(objectList: PsItemUploadConfig[]) : any[] {
        const mapList : any[] = [];
        for(let i = 0; i < objectList.length; i++) {
            if(objectList[i] != null) {
                mapList.push(this.toMap(objectList[i]));
            }
        }

        return mapList;
    }

    fromMap(obj: any) {
        return new PsItemUploadConfig().init(

            obj.item_type_id,
            obj.item_price_type_id,
            obj.condition_of_item_id,
            obj.image,
            obj.video,
            obj.video_icon,
            obj.discount_rate_by_percentage,
            obj.business_mode,
            obj.highlight_info,
            obj.color_id,
            obj.fuel_type_id,
            obj.build_type_id,
            obj.seller_type_id,
            obj.transmission_id,
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
            obj.licence_expiration_date,
            obj.address
            

       );
    }   
    fromMapList(objList : any[] ) : PsItemUploadConfig[] {
        const psItemConfigList : PsItemUploadConfig[] = [];
        for(const obj in objList) {
            if(obj != null) {
                psItemConfigList.push(this.fromMap(obj));
            }
        }

        return psItemConfigList;
    }
    

}