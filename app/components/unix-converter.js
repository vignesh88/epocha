import Ember from 'ember';
import moment from 'moment';

export default Ember.Component.extend({
  updateTime: function() {
    var _this = this;

    // Update the time every second.
    var updateClock = Ember.run.later(function() {
      _this.set('currentTime', moment().unix());
      _this.updateTime();
    }, 1000);
    this.set('updateClock', updateClock);
  }.on('init'),

  currentTime: moment().unix(),
  isNotPaused: true,

  humanDate: function() {
    return moment.unix(this.get('currentTime'));
  }.property('currentTime'),

  humanDateUtc: function() {
    return moment.unix(this.get('currentTime')).utc();
  }.property('currentTime'),

  actions: {
    pause: function() {
      Ember.run.cancel(this.get('updateClock'));
      this.set('isNotPaused', false);
    },
    play: function() {
      this.set('isNotPaused', true);
      this.updateTime();
    }
  }
});