'use strict';

describe('Service: Messageservice', function () {

  // load the service's module
  beforeEach(module('chattyApp'));

  // instantiate service
  var Messageservice;
  beforeEach(inject(function (_Messageservice_) {
    Messageservice = _Messageservice_;
  }));

  it('should do something', function () {
    expect(!!Messageservice).toBe(true);
  });

});
