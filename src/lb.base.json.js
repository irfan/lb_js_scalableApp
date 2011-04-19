/*
 * Namespace: lb.base.json
 * JSON (JavaScript Object Notation) Adapter Module for Base Library
 *
 * Author:
 * Eric Bréchemier <legalbox@eric.brechemier.name>
 *
 * Copyright:
 * Legal-Box SAS (c) 2010-2011, All Rights Reserved
 *
 * License:
 * BSD License
 * http://creativecommons.org/licenses/BSD/
 *
 * Version:
 * 2011-01-05
 */
/*requires lb.base.js */
/*jslint white:false, plusplus:false */
/*global lb, goog */
// preserve the module, if already loaded
lb.base.json = lb.base.json || (function() {
  // Builder of
  // Closure for lb.base.json module

  // Declare alias
      /*requires closure/goog.json.js */
  var json = goog.json;

  function parse(string){
    // Function: parse(string): object|array
    // Parse a JSON string into corresponding object or array.
    //
    // Parameter:
    //   string - string, a JSON string
    //
    // Returns:
    //   object|array, the object or array resulting from parsing

    return json.parse(string);
  }

  function serialize(object){
    // Function: serialize(object): string
    // Serialize a JSON object or array into a JSON string.
    //
    // Parameter:
    //   object - object|array, a JavaScript object or array.
    //            No function should be present in properties of a provided
    //            object or any object within.
    //
    // Returns:
    //   string, a string resulting from serialization of given object or array
    // (end)

    return json.serialize(object);
  }

  return { // public API
    parse: parse,
    serialize: serialize
  };
}());