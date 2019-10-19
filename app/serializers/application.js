import DS from "ember-data";

export default class ApplicationSerializer extends DS.JSONAPISerializer {
  normalizeResponse(_, __, data) {
    return data;
  }
}
