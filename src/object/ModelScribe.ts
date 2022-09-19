import { PsObject } from "./core/PsObject";

export default class ModelScribe extends PsObject<ModelScribe>{
    userId: string = '';
    manufacturerId: string = '';
    modelIds: string[] = [];

    init(
        userId: string,
        manufacturerId: string,
        modelIds: string[]

    ) {
        this.userId = userId;
        this.manufacturerId = manufacturerId;
        this.modelIds = modelIds;

        return this;

    }

    getPrimaryKey(): string {
        return '';
    }

    toMap(object: ModelScribe): any {
        const map = {};
        map['user_id'] = object.userId;
        map['manufacturer_id'] = object.manufacturerId;
        map['model_ids'] = object.modelIds;
        
        return map;
    }

    toMapList(objectList: ModelScribe[]) : any[] {
        const mapList : any[] = [];
        for(let i = 0; i < objectList.length; i++) {
            if(objectList[i] != null) {
                mapList.push(this.toMap(objectList[i]));
            }
        }

        return mapList;
    }

    fromMap(obj: any) {
        return new ModelScribe().init(

            obj.user_id,
            obj.manufacturer_id,
            obj.model_ids,

       );
    }   
    fromMapList(objList : any[] ) : ModelScribe[] {
        const subCategoryList : ModelScribe[] = [];
        for(const obj in objList) {
            if(obj != null) {
                subCategoryList.push(this.fromMap(obj));
            }
        }

        return subCategoryList;
    }
}