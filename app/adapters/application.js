import DS from "ember-data";

export default class ApplicationAdapter extends DS.JSONAPIAdapter {
  async findRecord(_, { modelName }, id) {
    await new Promise(resolve => {
      setTimeout(resolve, 4000);
    });
    return {
      data: {
        type: modelName,
        id,
        attributes: {
          name: "Chris Thoburn",
          age: 31 + Math.floor(Math.random() * 100)
        }
      }
    };
  }
}
