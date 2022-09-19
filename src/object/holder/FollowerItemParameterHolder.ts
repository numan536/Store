export default class FollowerItemParameterHolder {


    itemLocationId: string = '';
    itemLocationTownshipId: string = '';

    FollowerItemParameterHolder() {

        this.itemLocationId = '';
        this.itemLocationTownshipId = '';
    }

    toMap(): {} {
        const map = {};

        map['item_location_id'] = this.itemLocationId;
        map['item_location_township_id'] = this.itemLocationTownshipId;

        return map;
    }
}