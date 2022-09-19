import { PsObject } from "@/object/core/PsObject";

export default class FuelType extends PsObject<FuelType> {

    id : string = '';
    name : string = '';
    status : string = '';
    addedDate : string = '';
    addedUserId : string = '';
    updatedDate : string = '';
    updatedUserId : string = '';
    updatedFlag : string = '';

    init(
        id : string,
        name : string,
        status : string,
        addedDate : string,
        addedUserId : string,
        updatedDate: string,
        updatedUserId: string,
        updatedFlag : string,     
    ) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.addedDate = addedDate;
        this.addedUserId = addedUserId;
        this.updatedDate = updatedDate;
        this.updatedUserId = updatedUserId;
        this.updatedFlag = updatedFlag;
       
        return this;

    }

    getPrimaryKey(): string {
        return this.id;
    }

    toMap(object: FuelType): any {
        const map = {};

        map['id'] = object.id;
        map['fuel_name'] = object.name;
        map['status'] = object.status;
        map['added_date'] = object.addedDate;
        map['added_user_id'] = object.addedUserId;
        map['updated_date'] = object.updatedDate;
        map['updated_user_id'] = object.updatedUserId;
        map['updated_flag'] = object.updatedFlag;
        

        return map;
    }

    toMapList(objectList: FuelType[]): any[] {
        const mapList: any[] = [];
        for (let i = 0; i < objectList.length; i++) {
            if (objectList[i] != null) {
                mapList.push(this.toMap(objectList[i]));
            }
        }

        return mapList;
    }

    fromMap(obj: any) {
        return new FuelType().init(
            obj.id,
            obj.fuel_name,
            obj.status,
            obj.added_date,
            obj.added_user_id,
            obj.updated_date,
            obj.updated_user_id,
            obj.updated_flag
            
           
        );
    }

    fromMapList(objList: any[]): FuelType[] {
        const fuelType: FuelType[] = [];
        for (const obj in objList) {
            if (obj != null) {
                fuelType.push(this.fromMap(obj));
            }
        }

        return fuelType;
    }
}
