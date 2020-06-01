(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.BezierMovement = factory());
}(this, (function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var linear = function linear(p1, p2, t) {
    var _p = _slicedToArray(p1, 2),
        x1 = _p[0],
        y1 = _p[1];

    var _p2 = _slicedToArray(p2, 2),
        x2 = _p2[0],
        y2 = _p2[1];

    var x = x1 + (x2 - x1) * t;
    var y = y1 + (y2 - y1) * t;
    return {
      x: x,
      y: y
    };
  };
  var quadratic = function quadratic(p1, p2, cp, t) {
    var _p3 = _slicedToArray(p1, 2),
        x1 = _p3[0],
        y1 = _p3[1];

    var _p4 = _slicedToArray(p2, 2),
        x2 = _p4[0],
        y2 = _p4[1];

    var _cp = _slicedToArray(cp, 2),
        cx = _cp[0],
        cy = _cp[1];

    var x = (1 - t) * (1 - t) * x1 + 2 * t * (1 - t) * cx + t * t * x2;
    var y = (1 - t) * (1 - t) * y1 + 2 * t * (1 - t) * cy + t * t * y2;
    return {
      x: x,
      y: y
    };
  };
  var cubic = function cubic(p1, p2, cp1, cp2, t) {
    var _p5 = _slicedToArray(p1, 2),
        x1 = _p5[0],
        y1 = _p5[1];

    var _p6 = _slicedToArray(p2, 2),
        x2 = _p6[0],
        y2 = _p6[1];

    var _cp2 = _slicedToArray(cp1, 2),
        cx1 = _cp2[0],
        cy1 = _cp2[1];

    var _cp3 = _slicedToArray(cp2, 2),
        cx2 = _cp3[0],
        cy2 = _cp3[1];

    var x = x1 * (1 - t) * (1 - t) * (1 - t) + 3 * cx1 * t * (1 - t) * (1 - t) + 3 * cx2 * t * t * (1 - t) + x2 * t * t * t;
    var y = y1 * (1 - t) * (1 - t) * (1 - t) + 3 * cy1 * t * (1 - t) * (1 - t) + 3 * cy2 * t * t * (1 - t) + y2 * t * t * t;
    return {
      x: x,
      y: y
    };
  };

  var isDef = function isDef(val) {
    return typeof val !== 'undefined';
  };

  var contains = function contains(arr, item) {
    return arr.indexOf(item) >= 0;
  };

  var isEmpty = function isEmpty(arr) {
    return arr.length === 0;
  };

  var BezierMovement = /*#__PURE__*/function () {
    function BezierMovement(options) {
      _classCallCheck(this, BezierMovement);

      // set default
      this.type = 'quadratic';
      this.autoPlay = false;
      this.trackPoints = [];
      this.fixedPoints = [];
      this.container = document.body;
      this.setOptions(options);

      if (this.autoPlay) {
        this.play();
      }
    }

    _createClass(BezierMovement, [{
      key: "refreshTrack",
      value: function refreshTrack() {
        this.removeTrack();
        this.genTrack();
        return this;
      }
    }, {
      key: "removeTrack",
      value: function removeTrack() {
        this.trackPoints.forEach(function (point) {
          point.remove();
        });
        this.trackPoints = [];
        return this;
      }
    }, {
      key: "genTrack",
      value: function genTrack() {
        var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

        var t = this._calcT(count, t);

        var points = this._calcBezierPoint(t);

        var point = document.createElement('div');
        this.trackPoints.push(point);
        point.className = 'track-point';
        point.style.position = 'absolute';
        point.style.left = points.x + 'px';
        point.style.top = points.y + 'px';
        this.container.appendChild(point);

        if (t < 1) {
          count++;
          this.genTrack(count);
        }

        return this;
      }
    }, {
      key: "toggleTrack",
      value: function toggleTrack(flag) {
        this.trackPoints.forEach(function (point) {
          point.style.display = flag ? 'block' : 'none';
        });
        return this;
      }
    }, {
      key: "_setOptionValue",
      value: function _setOptionValue(key, val) {
        var enums = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
        var required = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

        if (isDef(val)) {
          if (!isEmpty(enums) && !contains(enums, val)) {
            throw new Error("[error]: the value of the ".concat(key, " option must be one of ").concat(enums, "."));
          }

          this[key] = val || this[key];
        } else if (required) {
          throw new Error("[error]: the value of the ".concat(key, " option is required."));
        }
      }
    }, {
      key: "setOptions",
      value: function setOptions(options) {
        var optionsConfig = {
          type: [['linear', 'quadratic', 'cubic']],
          target: [[], true],
          container: [[], true],
          start: [[], true],
          end: [[], true],
          autoPlay: [[true, false]],
          fixedPoints: [[], true],
          onEnd: [[], false]
        };

        if (options.type) {
          this._setOptionValue.apply(this, ['type', options.type].concat(optionsConfig.type));

          delete options.type;
        }

        if (options.fixedPoints) {
          var len = options.fixedPoints.length;
          var type = this.type;
          var fixedPointsSelections = [['linear', 0, 'zero'], ['quadratic', 1, 'one'], ['cubic', 2, 'two']];
          fixedPointsSelections.forEach(function (selection) {
            if (type === selection[0] && len !== selection[1]) {
              throw new Error("[error]: the length of fixedPoints should be ".concat(selection[2], " when type is ").concat(selection[0], "."));
            }
          });

          this._setOptionValue.apply(this, ['fixedPoints', options.fixedPoints].concat(optionsConfig.fixedPoints));

          delete options.fixedPoints;
        }

        for (var _i = 0, _Object$entries = Object.entries(options); _i < _Object$entries.length; _i++) {
          var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
              key = _Object$entries$_i[0],
              val = _Object$entries$_i[1];

          if (isDef(optionsConfig[key])) {
            this._setOptionValue.apply(this, [key, val].concat(optionsConfig[key]));
          } else {
            throw new Error("[error]: the ".concat(key, " option isn't existed."));
          }
        }

        return this;
      }
    }, {
      key: "bezier",
      value: function bezier(type) {
        if (type === 'linear') {
          return linear;
        } else if (type === 'quadratic') {
          return quadratic;
        } else {
          return cubic;
        }
      }
    }, {
      key: "_calcBezierPoint",
      value: function _calcBezierPoint(t) {
        var type = this.type,
            start = this.start,
            end = this.end;
        var result;

        if (type === 'linear') {
          result = linear(start, end, t);
        } else if (type === 'quadratic') {
          result = quadratic(start, end, this.fixedPoints[0], t);
        } else {
          result = cubic(start, end, this.fixedPoints[0], this.fixedPoints[1], t);
        }

        return result;
      }
    }, {
      key: "_calcT",
      value: function _calcT(count) {
        return 1 / 30 * count;
      }
    }, {
      key: "setCalcT",
      value: function setCalcT(fn) {
        this._calcT = fn;
        return this;
      }
    }, {
      key: "_move",
      value: function _move(target, count) {
        var _this = this;

        var t = this._calcT(count, t);

        var points = this._calcBezierPoint(t);

        target.style.left = points.x + 'px';
        target.style.top = points.y + 'px';

        if (t < 1) {
          count++;
          requestAnimationFrame(function () {
            _this._move(target, count);
          });
        } else {
          if (isDef(this.onEnd)) {
            this.onEnd();
          }
        }
      }
    }, {
      key: "play",
      value: function play() {
        var _this2 = this;

        var target = this.target,
            start = this.start,
            end = this.end;

        if ([target, start, end].every(isDef)) {
          var count = 0;
          target.style.position = 'absolute';
          requestAnimationFrame(function () {
            _this2._move(target, count);
          });
        } else {
          throw new Error('[error]: the target, start and end option must be defined.');
        }

        return this;
      }
    }]);

    return BezierMovement;
  }();

  return BezierMovement;

})));
