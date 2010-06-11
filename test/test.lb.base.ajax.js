/*
 * test.lb.base.ajax.js - Unit Tests of lb.base.ajax module
 *
 * Author:    Eric Bréchemier <legalbox@eric.brechemier.name>
 * Copyright: Legal Box (c) 2010, All Rights Reserved
 * License:   BSD License - http://creativecommons.org/licenses/BSD/
 * Version:   2010-06-10
 *
 * Based on Test Runner from bezen.org JavaScript library
 * CC-BY: Eric Bréchemier - http://bezen.org/javascript/
 */

/*requires lb.base.ajax.js */
/*requires bezen.assert.js */
/*requires bezen.object.js */
/*requires bezen.array.js */
/*requires bezen.testrunner.js */
/*requires goog.net.MockXmlHttp */
/*jslint nomen:false, white:false, onevar:false, plusplus:false */
/*global lb, bezen, goog, window */
(function() {
  // Builder of
  // Closure object for Test of lb.base.ajax

  // Define aliases
  var assert = bezen.assert,
      object = bezen.object,
      empty = bezen.array.empty,
      testrunner = bezen.testrunner,
      MockXmlHttp = goog.net.MockXmlHttp;

  function testNamespace(){

    assert.isTrue( object.exists(window,'lb','base','ajax'),
                                       "lb.base.ajax namespace was not found");
  }

  function testSend(){
    var ut = lb.base.ajax.send;

    empty( MockXmlHttp.all );

    var url = '/events/';
    var data = {name: 'message', data: [{id:1, title:'Test'}]};
    var responses = [];
    var callback = function(response){
      responses.push(response);
    };
    ut(url, data, callback);

    assert.equals( MockXmlHttp.all.length, 1, "one instance of XHR expected");
    var xhr = MockXmlHttp.all[0];
    assert.equals( xhr._.url, url,   "same url expected in XHR call");
    assert.equals( xhr._.method, 'POST',      "POST method expected");
    assert.equals( xhr._.async, true, "  asynchronous call expected");

    // trigger asynchronous response
    xhr.complete();
    assert.objectEquals(responses, [data],      "echo of given data expected");

    var failCallback = function(){
      throw new Error('Test failure in XHR callback');
    };
    ut (url, data, failCallback);
    assert.equals( MockXmlHttp.all.length, 2, "two instances of XHR expected");
    xhr = MockXmlHttp.all[1];
    // trigger asynchronous response - should not fail
    xhr.complete();
  }

  var tests = {
    testNamespace: testNamespace,
    testSend: testSend
  };

  testrunner.define(tests, "lb.base.ajax");
  return tests;

}());
