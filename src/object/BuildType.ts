import { PsObject } from "@/object/core/PsObject";

export default class BuildType extends PsObject<BuildType> {

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

    toMap(object: BuildType): any {
        const map = {};

        map['id'] = object.id;
        map['car_type'] = object.name;
        map['status'] = object.status;
        map['added_date'] = object.addedDate;
        map['added_user_id'] = object.addedUserId;
        map['updated_date'] = object.updatedDate;
        map['updated_user_id'] = object.updatedUserId;
        map['updated_flag'] = object.updatedFlag;
        

        return map;
    }

    toMapList(objectList: BuildType[]): any[] {
        const mapList: any[] = [];
        for (let i = 0; i < objectList.length; i++) {
            if (objectList[i] != null) {
                mapList.push(this.toMap(objectList[i]));
            }
        }

        return mapList;
    }

    fromMap(obj: any) {
        return new BuildType().init(
            obj.id,
            obj.car_type,
            obj.status,
            obj.added_date,
            obj.added_user_id,
            obj.updated_date,
            obj.updated_user_id,
            obj.updated_flag
            
           
        );
    }

    fromMapList(objList: any[]): BuildType[] {
        const buildType: BuildType[] = [];
        for (const obj in objList) {
            if (obj != null) {
                buildType.push(this.fromMap(obj));
            }
        }

        return buildType;
    }
}
