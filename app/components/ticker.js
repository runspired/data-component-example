import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";

export default class TickerComponent extends Component {
  @tracked count = 1;

  constructor() {
    super(...arguments);
    this._interval = setInterval(() => {
      this.count++;
    }, this.args.timeBetween || 5000);
  }

  willDestroy() {
    cancelInterval(this._interval);
  }
}
