const { pick, map } = require('lodash');

class MongooseHelper {
    static async selectOneWithPick(mongooseModel, where, select) {
        const selectArray = select.split(' ');
        const item = (await mongooseModel.findOne(where, select)).toJSON();
        return pick(item, selectArray);
    }

    static async selectWithPick(mongooseModel, where, select) {
        const selectArray = select.split(' ');
        const items = (await mongooseModel.find(where, select)).toJSON();
        return map(items, item => pick(item, selectArray));
    }
}

module.exports.MongooseHelper = MongooseHelper;
