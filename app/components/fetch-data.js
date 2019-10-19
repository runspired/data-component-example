import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { inject as service } from "@ember/service";

class RequestState {
  @tracked isLoading = false;
}

export default class FetchDataComponent extends Component {
  @tracked _currentData = null;
  @service store;

  get data() {
    this.requestIfNecessary();
    return this._currentData;
  }

  async requestIfNecessary() {
    const { args, requestMap, requestState, store } = this;
    const { type, id } = args;
    if (!type || !id) {
      return;
    }
    const trueId = `urn:${type}:${id}`;

    let typeMap = requestMap.get(type);
    if (!typeMap) {
      typeMap = new Map();
      requestMap.set(type, typeMap);
    }
    let request = typeMap.get(trueId);
    if (!request) {
      request = {
        data: null,
        promise: store.findRecord(type, trueId)
      };
      typeMap.set(trueId, request);
      requestState.isLoading = true;
      let data = await request.promise;
      request.data = data;
      if (this.args.id === id) {
        this._currentData = data;
        requestState.isLoading = false;
      }
    } else if (this._currentData !== request.data) {
      this._currentData = request.data;
    }
  }

  constructor() {
    super(...arguments);
    this.requestMap = new Map();
    this.requestState = new RequestState();
  }
}
