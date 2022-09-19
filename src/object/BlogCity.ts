
import { PsObject } from "@/object/core/PsObject";


export default class BlogCity extends PsObject<BlogCity> {

    id: string = '';
    name: string = '';
    odering: string = '';
    status: string = '';
    lat: string = '';
    lng: string = '';
    addedDate: string = '';
    isEmptyObject: string = '';

    init(

        id: string,
        name: string,
        odering: string,
        status: string,
        addedDate: string,
        lat: string,
        lng: string,
        isEmptyObject: string,
        

    ) {
        this.id = id;
        this.name = name;
        this.odering = odering;
        this.status = status;
        this.addedDate = addedDate;
        this.lat = lat;
        this.lng = lng;
        this.isEmptyObject = isEmptyObject;

        return this;

    }

    getPrimaryKey(): string {
        return this.id;
    }

    toMap(object: BlogCity): any {
        const map = {};

        map['id'] = object.id;
        map['name'] = object.name;
        map['ordering'] = object.odering;
        map['lat'] = object.lat;
        map['lng'] = object.lng;
        map['status'] = object.status;
        map['added_date'] = object.addedDate;
        map['is_empty_object'] = object.isEmptyObject;
       


        return map;
    }

    toMapList(objectList: BlogCity[]): any[] {
        const mapList: any[] = [];
        for (let i = 0; i < objectList.length; i++) {
            if (objectList[i] != null) {
                mapList.push(this.toMap(objectList[i]));
            }
        }

        return mapList;
    }

    fromMap(obj: any) {
        return new BlogCity().init(
            obj.id,
            obj.name,
            obj.odering,
            obj.status,
            obj.lat,
            obj.lng,
            obj.added_date,
            obj.is_empty_object,
            
        );
    }

    fromMapList(objList: any[]): BlogCity[] {
        const blogCity: BlogCity[] = [];
        for (const obj in objList) {
            if (obj != null) {
                blogCity.push(this.fromMap(obj));
            }
        }

        return blogCity;
    }
}
