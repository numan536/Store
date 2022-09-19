type ManufacturerListParameterHolderInterface = {
    keyword: string;
    oderBy: string;
    oderType: string;
}

export default class ManufacturerListParameterHolder implements ManufacturerListParameterHolderInterface{

    keyword: string = '';
    oderBy: string = '';
    oderType: string = '';
    

    ManufacturerListParameterHolder() {
        this.keyword = '';
        this.oderBy = 'name';
        this.oderType = 'asc';

        return this;
    }

    toMap(): {} {
        const map = {};
        map['keyword'] = this.keyword;
        map['order_by'] = this.oderBy;
        map['order_type'] = this.oderType;

        return map;
    }
}