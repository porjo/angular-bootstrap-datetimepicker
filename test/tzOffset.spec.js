/*globals describe, beforeEach, it, expect, module, inject, jQuery, moment */

 /**
 * @license angular-bootstrap-datetimepicker
 * (c) 2013 Knight Rider Consulting, Inc. http://www.knightrider.com
 * License: MIT
 */

/**
 *
 *    @author        Dale "Ducky" Lotts
 *    @since        7/21/13
 */

describe('initial date of "2020-01-01T00:00:00.000", tzOffset=60, minView="hour", minuteStep: 15', function () {
  'use strict';
  var $rootScope, $compile, element;
  beforeEach(module('ui.bootstrap.datetimepicker'));
  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $rootScope.date = moment("2020-01-01T00:00:00.000").toDate();
    $rootScope.offset = 60;
    element = $compile('<datetimepicker data-datetimepicker-config="{ startView: \'hour\', minView: \'hour\', minuteStep: 15 }" data-tz-offset="offset" data-ng-model="date"></datetimepicker>')($rootScope);
    $rootScope.$digest();
  }));
  it('clicking the 4th `.hour` element (3:00) will set the date value to "2020-01-01T02:00:00.000"', function () {
    expect(jQuery('.switch', element).text()).toBe('2020-Jan-01');

    expect(jQuery('.active', element).length).toBe(1);
    expect(jQuery('.hour', element).length).toBe(24);

    var selectedElement = jQuery(jQuery('.hour', element)[3]);
    selectedElement.trigger('click');

    expect(jQuery('.active', element).text()).toBe('3:00');
    expect($rootScope.date).toEqual(moment("2020-01-01T02:00:00.000").toDate());
  });
  it('unsetting tzOffset then selecting 4th `.hour` element (3:00) will cause date value to be "2020-01-01T03:00:00.000"', function () {
    delete $rootScope.offset;
    $rootScope.$apply();
    var selectedElement = jQuery(jQuery('.hour', element)[3]);
    selectedElement.trigger('click');
    expect($rootScope.date).toEqual(moment("2020-01-01T03:00:00.000").toDate());
  });
  it('setting tzOffset to 120 then selecting 1st `.hour` element (0:00) will cause date value to be "2019-12-31T22:00:00.000"', function () {
    $rootScope.offset = 120;
    $rootScope.$apply();
    var selectedElement = jQuery(jQuery('.hour', element)[0]);
    selectedElement.trigger('click');
    expect($rootScope.date).toEqual(moment("2019-12-31T22:00:00.000").toDate());
  });
});
