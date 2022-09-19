type ModelScribeParameterHolderInterface = {
    userId: string;
    manufacturerId: string;
    modelIds: string[];
}

export default class ModelScribeParameterHolder implements ModelScribeParameterHolderInterface{

    userId: string = '';
    manufacturerId: string = '';
    modelIds: string[] = [];
    
    ModelScribeParameterHolder() {
        this.userId = '';
        this.manufacturerId = '';
        this.modelIds = [];

        return this;
    }

    toMap(): {} {
        const map = {
            "user_id": this.userId,
            "manufacturer_id": this.manufacturerId,
            "model_ids": this.modelIds
        }

        return map;
    }
}