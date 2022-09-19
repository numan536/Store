import DefaultIcon from "./DefaultIcon";
import { PsObject } from "@/object/core/PsObject";
import DefaultPhoto from "./DefaultPhoto";
import Manufacturer from "./Manufacturer";

export default class Model extends PsObject<Model> {

    id : string = '';
    manufacturerId : string = '';
    name : string = '';
    status : string = '';
    addedDate : string = '';
    addedUserId : string = '';
    updatedDate : string = '';
    updatedUserId : string = '';
    updatedFlag : string = '';
    addedDateStr : string = '';
    isSubScribe: string = '';
    defaultPhoto: DefaultPhoto = new DefaultPhoto();
    // defaultIcon: DefaultIcon = new DefaultIcon();
    // manufacturer: Manufacturer = new Manufacturer();

    init(
        id : string,
        name : string,
        manufacturerId : string,
        status : string,
        addedDate : string,
        addedUserId : string,
        updatedDate: string,
        updatedUserId: string,
        updatedFlag : string,    
        addedDateStr : string,
        isSubScribe: string,
        defaultPhoto: DefaultPhoto,
        // defaultIcon: DefaultIcon,
        // manufacturer: Manufacturer
    ) {
        this.id = id;
        this.name = name;
        this.manufacturerId = manufacturerId;
        this.status = status;
        this.addedDate = addedDate;
        this.addedUserId = addedUserId;
        this.updatedDate = updatedDate;
        this.updatedUserId = updatedUserId;
        this.updatedFlag = updatedFlag;
        this.addedDateStr = addedDateStr;
        this.isSubScribe = isSubScribe;
        this.defaultPhoto = defaultPhoto;
        // this.defaultIcon = defaultIcon;
        // this.manufacturer = manufacturer;
       

        return this;

    }

    getPrimaryKey(): string {
        return this.id;
    }

    toMap(object: Model): any {
        const map = {};

        map['id'] = object.id;
        map['name'] = object.name;
        map['manufacturer_id'] = object.name;
        map['status'] = object.status;
        map['added_date'] = object.addedDate;
        map['added_user_id'] = object.addedUserId;
        map['updated_date'] = object.updatedDate;
        map['updated_user_id'] = object.updatedUserId;
        map['updated_flag'] = object.updatedFlag;
        map['added_date_str'] = object.addedDateStr;
        map['is_subscribed_fe'] = object.isSubScribe;
        map['default_photo'] = new DefaultPhoto().toMap(object.defaultPhoto);
        // map['default_icon'] = new DefaultIcon().toMap(object.defaultIcon);
        // map['manufacturer'] = new Manufacturer().toMap(object.manufacturer);
        

        return map;
    }

    toMapList(objectList: Model[]): any[] {
        const mapList: any[] = [];
        for (let i = 0; i < objectList.length; i++) {
            if (objectList[i] != null) {
                mapList.push(this.toMap(objectList[i]));
            }
        }

        return mapList;
    }

    fromMap(obj: any) {
        return new Model().init(
            obj.id,
            obj.name,
            obj.manufacturer_id,
            obj.status,
            obj.added_date,
            obj.added_user_id,
            obj.updated_date,
            obj.updated_user_id,
            obj.updated_flag,
            obj.added_date_str,
            obj.is_subscribed_fe,
            new DefaultPhoto().fromMap(obj.default_photo),
            // new DefaultIcon().fromMap(obj.default_icon),
            // new Manufacturer().fromMap(obj.manufacturer)
           
        );
    }

    fromMapList(objList: any[]): Model[] {
        const model: Model[] = [];
        for (const obj in objList) {
            if (obj != null) {
                model.push(this.fromMap(obj));
            }
        }

        return model;
    }
}
