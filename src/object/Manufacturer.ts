import DefaultIcon from "./DefaultIcon";
import { PsObject } from "@/object/core/PsObject";
import DefaultPhoto from "./DefaultPhoto";


export default class Manufacturer extends PsObject<Manufacturer> {

    id : string = '';
    name : string = '';
    status : string = '';
    addedDate : string = '';
    addedUserId : string = '';
    updatedDate : string = '';
    updatedUserId : string = '';
    updatedFlag : string = '';
    addedDateStr : string = '';
    defaultPhoto: DefaultPhoto = new DefaultPhoto();
    defaultIcon: DefaultIcon = new DefaultIcon();
   

    init(
        id : string,
        name : string,
        status : string,
        addedDate : string,
        addedUserId : string,
        updatedDate: string,
        updatedUserId: string,
        updatedFlag : string,    
        addedDateStr : string,
        defaultPhoto: DefaultPhoto,
        defaultIcon: DefaultIcon        
    ) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.addedDate = addedDate;
        this.addedUserId = addedUserId;
        this.updatedDate = updatedDate;
        this.updatedUserId = updatedUserId;
        this.updatedFlag = updatedFlag;
        this.addedDateStr = addedDateStr;
        this.defaultPhoto = defaultPhoto;
        this.defaultIcon = defaultIcon;
       

        return this;

    }

    getPrimaryKey(): string {
        return this.id;
    }

    toMap(object: Manufacturer): any {
        const map = {};

        map['id'] = object.id;
        map['name'] = object.name;
        map['status'] = object.status;
        map['added_date'] = object.addedDate;
        map['added_user_id'] = object.addedUserId;
        map['updated_date'] = object.updatedDate;
        map['updated_user_id'] = object.updatedUserId;
        map['updated_flag'] = object.updatedFlag;
        map['added_date_str'] = object.addedDateStr;
        map['default_photo'] = new DefaultPhoto().toMap(object.defaultPhoto);
        map['default_icon'] = new DefaultIcon().toMap(object.defaultIcon);
        

        return map;
    }

    toMapList(objectList: Manufacturer[]): any[] {
        const mapList: any[] = [];
        for (let i = 0; i < objectList.length; i++) {
            if (objectList[i] != null) {
                mapList.push(this.toMap(objectList[i]));
            }
        }

        return mapList;
    }

    fromMap(obj: any) {
        return new Manufacturer().init(
            obj.id,
            obj.name,
            obj.status,
            obj.added_date,
            obj.added_user_id,
            obj.updated_date,
            obj.updated_user_id,
            obj.updated_flag,
            obj.added_date_str,
            new DefaultPhoto().fromMap(obj.default_photo),
            new DefaultIcon().fromMap(obj.default_icon),
           
        );
    }

    fromMapList(objList: any[]): Manufacturer[] {
        const manufacturer: Manufacturer[] = [];
        for (const obj in objList) {
            if (obj != null) {
                manufacturer.push(this.fromMap(obj));
            }
        }

        return manufacturer;
    }
}
