type ModelListParameterHolderInterface = {
    keyword: string;
    orderBy: string;
    orderType: string;
}

export default class ModelListParameterHolder implements ModelListParameterHolderInterface{

    keyword: string = '';
    manufacturerId: string = '';
    orderBy: string = '';
    orderType: string = '';
    

    ModelListParameterHolder() {
        this.keyword = '';
        this.manufacturerId = '';
        this.orderBy = '';
        this.orderType = '';

        return this;
    }

    toMap(): {} {
        const map = {};
        map['keyword'] = this.keyword;
        map['manufacturer_id'] = this.manufacturerId;
        map['order_by'] = this.orderBy;
        map['order_type'] = this.orderType;

        return map;
    }
}