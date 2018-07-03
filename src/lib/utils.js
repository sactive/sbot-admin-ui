import axios from 'axios';
import _ from "lodash";
import extend from "extend";
const Util = {};


//basic config
Util.fetch = axios.create({
  timeout: 30 * 1000,
  responseType: "blob" // force blob at the beginning, anyway
});


Util.clone = function (data) {
  return _.cloneDeep(data);
};

Util.getQuery = function (queryName) {
  let reg = new RegExp("(^|&)" + queryName + "=([^&]*)(&|$)");
  let r = window.location.search.substr(1).match(reg);
  if (!r) {
    return null;
  }
  return decodeURI(r[2]);
};

Util.extend = extend;
Util.each = _.each;


export default Util;