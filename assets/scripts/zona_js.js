// Scrip 2

/*
Selectable
Copyright (c) 2017 Karl Saunders (http://mobius.ovh)
Licensed under MIT (http://www.opensource.org/licenses/mit-license.php)

Version: 0.17.8

*/
(function (G, w) {
  "object" === typeof exports
    ? (module.exports = w("Selectable"))
    : "function" === typeof define && define.amd
    ? define([], w)
    : (G.Selectable = w("Selectable"));
})(
  "undefined" !== typeof global ? global : this.window || this.global,
  function () {
    function G(a, c) {
      var b = [];
      c.forEach(function (e) {
        e = Math.hypot(
          e.rect.x1 - parseInt(a.clientX),
          e.rect.y1 - parseInt(a.clientY)
        );
        b.push(parseInt(e));
      });
      var d = b.indexOf(Math.min.apply(Math, b));
      return c[d].node;
    }
    function w(a, c) {
      return (
        a && a !== document.documentElement && (c(a) ? a : w(a.parentNode, c))
      );
    }
    function C(a) {
      return "[object Object]" === Object.prototype.toString.call(a);
    }
    function x(a) {
      return (
        Array.isArray(a) || a instanceof HTMLCollection || a instanceof NodeList
      );
    }
    function H(a, c) {
      for (var b in c)
        if (c.hasOwnProperty(b)) {
          var d = c[b];
          d && C(d) ? ((a[b] = a[b] || {}), H(a[b], d)) : (a[b] = d);
        }
      return a;
    }
    function E(a, c) {
      var b = a.style;
      if (a) {
        if (void 0 === c) return window.getComputedStyle(a);
        if (C(c))
          for (var d in c)
            d in b || (d = "-webkit-" + d),
              (a.style[d] =
                c[d] +
                ("string" == typeof c[d] ? "" : "opacity" === d ? "" : "px"));
      }
    }
    function F(a) {
      var c = window;
      a = a.getBoundingClientRect();
      var b =
          document.documentElement || document.body.parentNode || document.body,
        d = void 0 !== c.pageXOffset ? c.pageXOffset : b.scrollLeft;
      c = void 0 !== c.pageYOffset ? c.pageYOffset : b.scrollTop;
      return {
        x1: a.left + d,
        x2: a.left + a.width + d,
        y1: a.top + c,
        y2: a.top + a.height + c,
        height: a.height,
        width: a.width,
      };
    }
    function K(a, c, b) {
      var d;
      return function () {
        b = b || this;
        if (!d)
          return (
            a.apply(b, arguments),
            (d = !0),
            setTimeout(function () {
              d = !1;
            }, c)
          );
      };
    }
    var I = "classList" in document.documentElement,
      g = {
        add: function (a, c) {
          I
            ? a.classList.add(c)
            : g.contains(a, c) || (a.className = a.className.trim() + " " + c);
        },
        remove: function (a, c) {
          I
            ? a.classList.remove(c)
            : g.contains(a, c) &&
              (a.className = a.className.replace(
                new RegExp(
                  "(^|\\s)" + c.split(" ").join("|") + "(\\s|$)",
                  "gi"
                ),
                " "
              ));
        },
        contains: function (a, c) {
          if (a)
            return I
              ? a.classList.contains(c)
              : !!a.className &&
                  !!a.className.match(new RegExp("(\\s|^)" + c + "(\\s|$)"));
        },
      },
      y = function (a) {
        return !!a.ctrlKey || !!a.metaKey;
      },
      z = ["x", "y"],
      u = { x: "x1", y: "y1" },
      A = { x: "x2", y: "y2" },
      J = function (a) {
        this.version = "0.17.8";
        this.v = this.version.split(".").map(function (c) {
          return parseInt(c, 10);
        });
        this.touch =
          "ontouchstart" in window ||
          (window.DocumentTouch && document instanceof DocumentTouch);
        this.init(a);
      };
    J.prototype = {
      init: function (a) {
        var c = this;
        this.config = H(
          {
            filter: ".ui-selectable",
            tolerance: "touch",
            appendTo: document.body,
            touch: !0,
            toggleTouch: !0,
            toggle: !1,
            autoRefresh: !0,
            throttle: 50,
            lassoSelect: "normal",
            autoScroll: { threshold: 0, increment: 10 },
            saveState: !1,
            ignore: !1,
            maxSelectable: !1,
            lasso: {
              border: "1px dotted #000",
              backgroundColor: "rgba(52, 152, 219, 0.2)",
            },
            keys: ["shiftKey", "ctrlKey", "metaKey", ""],
            classes: {
              lasso: "ui-lasso",
              selected: "ui-selected",
              container: "ui-container",
              selecting: "ui-selecting",
              selectable: "ui-selectable",
              deselecting: "ui-deselecting",
            },
          },
          a
        );
        this.origin = { x: 0, y: 0 };
        this.mouse = { x: 0, y: 0 };
        var b = this.config;
        this.autoscroll = C(b.autoScroll);
        this.lasso = !1;
        b.lasso &&
          C(b.lasso) &&
          ((this.lasso = document.createElement("div")),
          (this.lasso.className = b.classes.lasso),
          E(
            this.lasso,
            H(
              { position: "absolute", boxSizing: "border-box", opacity: 0 },
              b.lasso
            )
          ));
        this.touch && (b.toggle = b.toggleTouch);
        b.touch || (this.touch = !1);
        this.events = {};
        c = this;
        "_start _touchstart _drag _end _keyup _keydown _blur _focus"
          .split(" ")
          .forEach(function (d) {
            c.events[d] = c[d].bind(c);
          });
        this.events._refresh = K(this.refresh, b.throttle, this);
        this.autoscroll && (this.events._scroll = this._onScroll.bind(this));
        this.setContainer();
        this.scroll = {
          x: this.bodyContainer
            ? window.pageXOffset
            : this.container.scrollLeft,
          y: this.bodyContainer ? window.pageYOffset : this.container.scrollTop,
        };
        x(b.filter)
          ? (this.nodes = [].slice.call(b.filter))
          : "string" === typeof b.filter &&
            (this.nodes = [].slice.call(
              this.container.querySelectorAll(b.filter)
            ));
        this.nodes.forEach(function (d) {
          g.add(d, b.classes.selectable);
        });
        this.update();
        this.enable();
        setTimeout(function () {
          b.saveState && c.state("save");
          c.emit(15 > c.v[1] ? "selectable.init" : "init");
        }, 10);
      },
      update: function () {
        this._loadItems();
        this.refresh();
        this.emit(15 > this.v[1] ? "selectable.update" : "update", this.items);
      },
      refresh: function () {
        var a = window.innerWidth,
          c = window.innerHeight,
          b = this.bodyContainer
            ? window.pageXOffset
            : this.container.scrollLeft,
          d = this.bodyContainer
            ? window.pageYOffset
            : this.container.scrollTop;
        this.offsetWidth = this.container.offsetWidth;
        this.offsetHeight = this.container.offsetHeight;
        this.clientWidth = this.container.clientWidth;
        this.clientHeight = this.container.clientHeight;
        this.scrollWidth = this.container.scrollWidth;
        this.scrollHeight = this.container.scrollHeight;
        this.boundingRect = F(this.container);
        this.bodyContainer &&
          ((this.boundingRect.x2 = a), (this.boundingRect.y2 = c));
        this.scroll = {
          x: b,
          y: d,
          max: {
            x: this.scrollWidth - (this.bodyContainer ? a : this.clientWidth),
            y: this.scrollHeight - (this.bodyContainer ? c : this.clientHeight),
          },
          size: { x: this.clientWidth, y: this.clientHeight },
          scrollable: {
            x: this.scrollWidth > this.offsetWidth,
            y: this.scrollHeight > this.offsetHeight,
          },
        };
        for (a = 0; a < this.nodes.length; a++)
          this.items[a].rect = F(this.nodes[a]);
        this.emit(15 > this.v[1] ? "selectable.refresh" : "refresh");
      },
      bind: function () {
        var a = this.events;
        this.unbind();
        if (this.touch) {
          if (
            (this.on(this.container, "touchstart", a._touchstart),
            this.on(document, "touchend", a._end),
            this.on(document, "touchcancel", a._end),
            !1 !== this.lasso)
          )
            this.on(document, "touchmove", a._drag);
        } else if (
          (this.on(this.container, "mousedown", a._start),
          this.on(document, "mouseup", a._end),
          this.on(document, "keydown", a._keydown),
          this.on(document, "keyup", a._keyup),
          this.on(this.container, "mouseenter", a._focus),
          this.on(this.container, "mouseover", a._focus),
          this.on(this.container, "mouseleave", a._blur),
          !1 !== this.lasso)
        )
          this.on(document, "mousemove", a._drag);
        if (this.autoscroll)
          this.on(
            this.bodyContainer ? window : this.container,
            "scroll",
            a._scroll
          );
        this.on(window, "resize", a._refresh);
        this.on(window, "scroll", a._refresh);
      },
      unbind: function () {
        var a = this.events;
        this.off(this.container, "mousedown", a._start);
        this.off(document, "mousemove", a._drag);
        this.off(document, "mouseup", a._end);
        this.off(document, "keydown", a._keydown);
        this.off(document, "keyup", a._keyup);
        this.off(this.container, "mouseenter", a._focus);
        this.off(this.container, "mouseleave", a._blur);
        this.autoscroll &&
          this.off(
            this.bodyContainer ? window : this.container,
            "scroll",
            a._scroll
          );
        this.off(this.container, "touchstart", a._start);
        this.off(document, "touchend", a._end);
        this.off(document, "touchcancel", a._end);
        this.off(document, "touchmove", a._drag);
        this.off(window, "resize", a._refresh);
        this.off(window, "scroll", a._refresh);
      },
      setContainer: function (a) {
        var c = this.config;
        if (this.container) {
          var b = this.container;
          this.unbind();
        }
        a = a || c.appendTo;
        "string" === typeof a
          ? (this.container = document.querySelector(a))
          : a instanceof Element && a.nodeName && (this.container = a);
        g.add(this.container, c.classes.container);
        this.container._selectable = this;
        b && (g.remove(b, c.classes.container), delete b._selectable);
        this.bodyContainer = this.container === document.body;
        this._loadItems();
        this.autoscroll &&
          "static" === E(this.container).position &&
          !this.bodyContainer &&
          (this.container.style.position = "relative");
        this.bind();
      },
      select: function (a, c, b) {
        c = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : !1;
        b = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : !0;
        if (x(a)) {
          for (
            var d = this.getSelectedItems().length, e = 0;
            e < a.length &&
            !(this.config.maxSelectable && d >= this.config.maxSelectable);
            e++
          )
            this.select(a[e], !1, !1), d++;
          b && this.config.saveState && this.state("save");
          return this.getSelectedItems();
        }
        if ((a = this.get(a))) {
          if (
            this.config.toggle &&
            "drag" === this.config.toggle &&
            !c &&
            a.selected &&
            !this.cmdDown
          )
            return this.deselect(a, !1);
          d = a.node;
          e = this.config.classes;
          g.remove(d, e.selecting);
          g.add(d, e.selected);
          a.selecting = !1;
          a.selected = !0;
          a.startselected = !0;
          b && this.config.saveState && this.state("save");
          this.emit(15 > this.v[1] ? "selectable.select" : "selecteditem", a);
          return a;
        }
        return !1;
      },
      deselect: function (a, c) {
        if (x(a)) {
          for (var b = 0; b < a.length; b++) this.deselect(a[b], !1);
          c && this.config.saveState && this.state("save");
          return this.getSelectedItems();
        }
        if ((a = this.get(a))) {
          b = a.node;
          var d = this.config.classes;
          a.selecting = !1;
          a.selected = !1;
          a.deselecting = !1;
          a.startselected = !1;
          g.remove(b, d.deselecting);
          g.remove(b, d.selecting);
          g.remove(b, d.selected);
          c && this.config.saveState && this.state("save");
          this.emit(
            15 > this.v[1] ? "selectable.deselect" : "deselecteditem",
            a
          );
          return a;
        }
        return !1;
      },
      toggle: function (a) {
        if ((a = this.get(a))) {
          x(a) || (a = [a]);
          for (var c = 0; c < a.length; c++)
            a[c].selected ? this.deselect(a[c], !1) : this.select(a[c], !1, !1);
          this.config.saveState && this.state("save");
        }
      },
      add: function (a) {
        var c = [];
        "string" === typeof a &&
          (a = [].slice.call(this.container.querySelectorAll(a)));
        x(a) || (a = [a]);
        for (var b = 0; b < a.length; b++)
          0 > this.nodes.indexOf(a[b]) &&
            a[b] instanceof Element &&
            (c.push(a[b]), g.add(a[b], this.config.classes.selectable));
        this.nodes = this.nodes.concat(c);
        this.update();
        for (b = 0; b < c.length; b++) this.emit("addeditem", this.get(c[b]));
      },
      remove: function (a, c) {
        if ((a = this.get(a))) {
          if (x(a))
            for (var b = a.length - 1; 0 <= b; b--) this.remove(a[b], 0 < b);
          else {
            b = a.node;
            var d = this.config.classes,
              e = g.remove;
            e(b, d.selectable);
            e(b, d.deselecting);
            e(b, d.selecting);
            e(b, d.selected);
            this.nodes.splice(this.nodes.indexOf(a.node), 1);
            this.emit("removeditem", a);
          }
          c || this.update();
          return !0;
        }
        return !1;
      },
      selectAll: function () {
        if (
          this.config.maxSelectable &&
          this.config.maxSelectable < this.items.length
        )
          return this._maxReached();
        for (var a = 0; a < this.items.length; a++)
          this.select(this.items[a], !0, !1);
        this.config.saveState && this.state("save");
      },
      invert: function () {
        var a = this.getItems();
        if (this.config.maxSelectable && this.config.maxSelectable < a.length)
          return this._maxReached();
        for (a = 0; a < this.items.length; a++) {
          var c = this.items[a];
          c.selected ? this.deselect(c, !1) : this.select(c, !1, !1);
        }
        this.config.saveState && this.state("save");
      },
      clear: function (a) {
        a = 0 < arguments.length && void 0 !== arguments[0] ? !1 : !0;
        for (var c = this.items.length - 1; 0 <= c; c--)
          this.deselect(this.items[c], !1);
        a && this.config.saveState && this.state("save");
      },
      get: function (a) {
        var c = !1;
        "string" === typeof a &&
          (a = [].slice.call(this.container.querySelectorAll(a)));
        if (x(a)) {
          c = [];
          for (var b = 0; b < a.length; b++) {
            var d = this.get(a[b]);
            d && c.push(d);
          }
        } else
          isNaN(a)
            ? a instanceof Element
              ? (c = this.items[this.nodes.indexOf(a)])
              : C(a) && 0 <= this.items.indexOf(a) && (c = a)
            : 0 <= this.items.indexOf(this.items[a]) && (c = this.items[a]);
        return c;
      },
      getItems: function () {
        return this.items;
      },
      getNodes: function () {
        return this.nodes;
      },
      getSelectedItems: function (a) {
        return this.getItems().filter(function (c) {
          return a ? !c.selected : c.selected;
        });
      },
      getSelectedNodes: function () {
        return this.getSelectedItems().map(function (a) {
          return a.node;
        });
      },
      state: function (a) {
        var c = !1,
          b = !1;
        switch (a) {
          case "save":
            this.states = this.states || [];
            this.states.push(this.getSelectedNodes());
            b = this.config.saveState;
            b = "isInteger" in Number ? Number.isInteger(b) : !isNaN(b);
            b &&
              this.states.length > this.config.saveState &&
              this.states.shift();
            this.currentState = this.states.length - 1;
            b = !0;
            break;
          case "undo":
            0 < this.currentState && (this.currentState--, (b = c = !0));
            break;
          case "redo":
            this.currentState < this.states.length - 1 &&
              (this.currentState++, (b = c = !0));
            break;
          case "clear":
            (this.states = []), (this.currentState = !1);
        }
        c &&
          (this.clear(!1), this.select(this.states[this.currentState], !1, !1));
        b &&
          this.emit(
            (15 > this.v[1] ? "selectable.state." : "state.") + a,
            this.states[this.currentState],
            this.states
          );
      },
      enable: function () {
        if (!this.enabled) {
          var a = this.config.keys;
          this.enabled = !0;
          this.canShift = 0 <= a.indexOf("shiftKey");
          this.canCtrl = 0 <= a.indexOf("ctrlKey");
          this.canMeta = 0 <= a.indexOf("metaKey");
          this.bind();
          g.add(this.container, this.config.classes.container);
          this.emit(15 > this.v[1] ? "selectable.enable" : "enabled");
        }
        return this.enabled;
      },
      disable: function () {
        this.enabled &&
          ((this.enabled = !1),
          this.unbind(),
          g.remove(this.container, this.config.classes.container),
          this.emit(15 > this.v[1] ? "selectable.disable" : "disabled"));
        return this.enabled;
      },
      destroy: function () {
        this.disable();
        this.listeners = !1;
        this.clear();
        this.state("clear");
        this.remove(this.items);
        this.events = null;
      },
      on: function (a, c, b) {
        "string" === typeof a
          ? ((this.listeners = this.listeners || {}),
            (this.listeners[a] = this.listeners[a] || []),
            this.listeners[a].push(c))
          : a.addEventListener(c, b, !1);
      },
      off: function (a, c, b) {
        "string" === typeof a
          ? ((this.listeners = this.listeners || {}),
            !1 !== a in this.listeners &&
              this.listeners[a].splice(this.listeners[a].indexOf(c), 1))
          : a.removeEventListener(c, b);
      },
      emit: function (a) {
        this.listeners = this.listeners || {};
        if (!1 !== a in this.listeners)
          for (var c = 0; c < this.listeners[a].length; c++)
            this.listeners[a][c].apply(
              this,
              Array.prototype.slice.call(arguments, 1)
            );
      },
      _maxReached: function () {
        return this.emit("maxitems");
      },
      _touchstart: function (a) {
        this.off(this.container, "mousedown", this.events.start);
        this._start(a);
      },
      _start: function (a) {
        var c = this,
          b = this._getEvent(a),
          d = this.config,
          e,
          k = y(a) && (this.canCtrl || this.canMeta),
          m = this.canShift && !!a.shiftKey,
          l = this.getSelectedItems().length,
          h = d.maxSelectable;
        if (h && l >= h && (k || m)) return this._maxReached();
        if (
          !(
            !this.container.contains(a.target) ||
            3 === a.which ||
            0 < a.button ||
            d.disabled
          )
        ) {
          if (
            (this.scroll.scrollable.y &&
              b.pageX > this.boundingRect.x1 + this.scroll.size.x) ||
            (this.scroll.scrollable.x &&
              b.pageY > this.boundingRect.y1 + this.scroll.size.y)
          )
            return !1;
          if (this.config.ignore) {
            l = !1;
            var f = this.config.ignore;
            Array.isArray(f) || (f = [f]);
            for (h = 0; h < f.length; h++)
              if (a.target.closest(f[h])) {
                l = !0;
                break;
              }
            if (l) return !1;
          }
          l = w(a.target, function (n) {
            return n === c.container || g.contains(n, d.classes.selectable);
          });
          if (!l) return !1;
          -1 ===
            ["INPUT", "SELECT", "BUTTON", "TEXTAREA", "OPTION"].indexOf(
              a.target.tagName
            ) && a.preventDefault();
          this.dragging = !0;
          this.origin = {
            x: b.pageX + (this.bodyContainer ? 0 : this.scroll.x),
            y: b.pageY + (this.bodyContainer ? 0 : this.scroll.y),
            scroll: { x: this.scroll.x, y: this.scroll.y },
          };
          this.lasso && this.container.appendChild(this.lasso);
          l !== this.container
            ? ((b = this.get(l)),
              (b.selecting = !0),
              g.add(l, d.classes.selecting))
            : "sequential" == d.lassoSelect && (l = G(b, this.items));
          d.autoRefresh && this.refresh();
          if (m && this.startEl && l !== this.container) {
            h = this.items;
            b = this.getNodes().indexOf(l);
            f = this.getNodes().indexOf(this.startEl);
            for (var p = b < f ? 1 : -1; (b += p) && b !== f; )
              h[b].selecting = !0;
          }
          for (h = 0; h < this.items.length; h++)
            (b = this.items[h]),
              (f = b.node),
              (p = f === l),
              b.selected &&
                ((b.startselected = !0),
                (d.toggle || k ? !p : p || m) ||
                  (g.remove(f, d.classes.selected),
                  (b.selected = !1),
                  g.add(f, d.classes.deselecting),
                  (b.deselecting = !0))),
              p && (e = b);
          this.startEl = l;
          this.emit(15 > this.v[1] ? "selectable.start" : "start", a, e);
        }
      },
      _drag: function (a) {
        var c = this.config;
        if (!(c.disabled || !this.dragging || (a.shiftKey && this.canShift))) {
          var b = this._getEvent(a);
          y(a);
          this.mouse = { x: b.pageX, y: b.pageY };
          this.current = {
            x1: this.origin.x,
            y1: this.origin.y,
            x2: this.mouse.x + (this.bodyContainer ? 0 : this.scroll.x),
            y2: this.mouse.y + (this.bodyContainer ? 0 : this.scroll.y),
          };
          for (var d = 0; d < z.length; d++) {
            var e = z[d];
            if (this.current[u[e]] > this.current[A[e]]) {
              var k = this.current[A[e]];
              this.current[A[e]] = this.current[u[e]];
              this.current[u[e]] = k;
            }
          }
          this.coords = {
            x1: this.current.x1,
            x2: this.current.x2 - this.current.x1,
            y1: this.current.y1,
            y2: this.current.y2 - this.current.y1,
          };
          if ("normal" === c.lassoSelect)
            for (d = 0; d < this.items.length; d++)
              this._highlight(
                this.items[d],
                y(a) && (this.canCtrl || this.canMeta),
                b
              );
          else "sequential" === c.lassoSelect && this._sequentialSelect(b);
          this.autoscroll &&
            (this.bodyContainer ||
              ((this.coords.x1 -= this.boundingRect.x1),
              (this.coords.y1 -= this.boundingRect.y1)),
            this._autoScroll());
          this.lasso &&
            (this.bodyContainer ||
              !this.autoscroll ||
              this.config.autoScroll.lassoOverflow ||
              this._limitLasso(),
            E(this.lasso, {
              left: this.coords.x1,
              top: this.coords.y1,
              width: this.coords.x2,
              height: this.coords.y2,
              opacity: 1,
            }));
          this.emit(
            15 > this.v[1] ? "selectable.drag" : "drag",
            a,
            this.coords
          );
        }
      },
      _end: function (a) {
        if (this.dragging) {
          this.dragging = !1;
          var c = this.config,
            b = a.target,
            d = this._getEvent(a),
            e = [],
            k = [],
            m = this.getSelectedItems().length,
            l = c.maxSelectable;
          this.lasso &&
            this.container.contains(this.lasso) &&
            this.container.removeChild(this.lasso);
          this.lasso &&
            (E(this.lasso, {
              opacity: 0,
              left: 0,
              width: 0,
              top: 0,
              height: 0,
            }),
            (b = document.elementFromPoint(d.pageX, d.pageY)),
            b || (b = this.container));
          b = w(b, function (p) {
            return g.contains(p, c.classes.selectable);
          });
          d = !1;
          for (var h = 0; h < this.items.length; h++) {
            var f = this.items[h];
            c.toggle &&
              f.node === b &&
              f.node === this.startEl &&
              f.selecting &&
              f.startselected &&
              ((f.deselecting = !0), (f.selecting = !1));
            f.deselecting && (k.push(f), this.deselect(f, !1));
            f.selecting &&
              (l && m + e.length >= l
                ? ((f.selecting = !1),
                  g.remove(f.node, c.classes.selecting),
                  (d = !0))
                : (e.push(f), this.select(f, !1, !1)));
          }
          c.saveState && this.state("save");
          this.emit(15 > this.v[1] ? "selectable.end" : "end", a, e, k);
          if (d) return this._maxReached();
        }
      },
      _keydown: function (a) {
        this.cmdDown = y(a) && (this.canCtrl || this.canMeta);
        var c = !1;
        void 0 !== a.key
          ? (c = a.key)
          : void 0 !== a.keyCode && (c = a.keyCode);
        if (c)
          if (this.cmdDown && this.focused)
            switch (c) {
              case 65:
              case "a":
              case "A":
                a.preventDefault();
                this.selectAll();
                break;
              case 89:
              case "y":
              case "Y":
                this.state("redo");
                break;
              case 90:
              case "z":
              case "Z":
                this.state("undo");
            }
          else
            switch (c) {
              case 32:
              case " ":
                this.toggle(document.activeElement);
            }
      },
      _keyup: function (a) {
        this.cmdDown = y(a) && (this.canCtrl || this.canMeta);
      },
      _onScroll: function (a) {
        this.scroll.x = this.bodyContainer
          ? window.pageXOffset
          : this.container.scrollLeft;
        this.scroll.y = this.bodyContainer
          ? window.pageYOffset
          : this.container.scrollTop;
        for (a = 0; a < this.items.length; a++)
          this.items[a].rect = F(this.items[a].node);
      },
      _loadItems: function () {
        var a,
          c = this.config;
        this.nodes = [].slice.call(
          this.container.querySelectorAll("." + c.classes.selectable)
        );
        this.items = [];
        if (this.nodes.length)
          for (var b = 0; b < this.nodes.length; b++) {
            var d = this.nodes[b];
            g.add(d, c.classes.selectable);
            var e = {
                node: d,
                rect: F(d),
                startselected: !1,
                selected: g.contains(d, c.classes.selected),
                selecting: g.contains(d, c.classes.selecting),
                deselecting: g.contains(d, c.classes.deselecting),
              },
              k = this._get2DTransformation(d);
            if (k) {
              var m = d;
              var l = (a = 0);
              do
                (a += m.offsetTop || 0),
                  (l += m.offsetLeft || 0),
                  (m = m.offsetParent);
              while (m);
              m = l;
              l = k.translate;
              var h = k.origin,
                f = k.scale,
                p = h.x;
              h = h.y;
              var n = d.offsetWidth / 2,
                r = d.offsetHeight / 2;
              d = m + (n - p) * f + p;
              var q = a + (r - h) * f + h;
              n *= f;
              f *= r;
              f = [
                { x: d - n, y: q - f },
                { x: d + n, y: q - f },
                { x: d + n, y: q + f },
                { x: d - n, y: q + f },
              ];
              for (d = 0; 3 >= d; d++) {
                q = f;
                n = d;
                r = f[d].x + l.x;
                var D = f[d].y + l.y,
                  B = m + p + l.x,
                  t = a + h + l.y,
                  v = k.angle;
                v = (v * Math.PI) / 180;
                q[n] = {
                  x: Math.cos(v) * (r - B) - Math.sin(v) * (D - t) + B,
                  y: Math.sin(v) * (r - B) + Math.cos(v) * (D - t) + t,
                };
              }
              e.transform = { rect: f };
            }
            this.items.push(e);
          }
      },
      _getEvent: function (a) {
        return this.touch
          ? "touchend" === a.type
            ? a.changedTouches[0]
            : a.touches[0]
          : a;
      },
      _autoScroll: function () {
        var a = this.config.autoScroll,
          c = a.increment;
        a = a.threshold;
        var b = { x: 0, y: 0 };
        this.bodyContainer &&
          ((this.mouse.x -= this.scroll.x), (this.mouse.y -= this.scroll.y));
        for (var d = 0; d < z.length; d++) {
          var e = z[d];
          this.mouse[e] >= this.boundingRect[A[e]] - a &&
          this.scroll[e] < this.scroll.max[e]
            ? (b[e] = c)
            : this.mouse[e] <= this.boundingRect[u[e]] + a &&
              0 < this.scroll[e] &&
              (b[e] = -c);
        }
        this.bodyContainer
          ? window.scrollBy(b.x, b.y)
          : ((this.container.scrollTop += b.y),
            (this.container.scrollLeft += b.x));
      },
      _limitLasso: function () {
        for (var a = 0; a < z.length; a++) {
          var c = z[a],
            b = this.boundingRect[u[c]] + this.scroll.size[c];
          if (this.mouse[c] >= b && this.scroll[c] >= this.scroll.max[c]) {
            var d = this.origin[c] - this.boundingRect[u[c]] - this.scroll[c];
            this.coords[u[c]] = this.origin[c] - this.boundingRect[u[c]];
            this.coords[A[c]] = b - d - this.boundingRect[u[c]];
          }
          this.mouse[c] <= this.boundingRect[u[c]] &&
            0 >= this.scroll[c] &&
            ((this.coords[u[c]] = 0),
            (this.coords[A[c]] = this.origin[c] - this.boundingRect[u[c]]));
        }
      },
      _sequentialSelect: function (a) {
        var c = this.config.classes,
          b = document.elementFromPoint(a.pageX, a.pageY - window.pageYOffset);
        if (b && (b = b.closest("." + c.selectable))) {
          if (this.mouse.y > this.origin.y) {
            var d = this.nodes.indexOf(this.startEl);
            var e = this.nodes.indexOf(b);
          } else
            this.mouse.y < this.origin.y &&
              ((d = this.nodes.indexOf(b)),
              (e = this.nodes.indexOf(this.startEl)));
          for (b = 0; b < this.items.length; b++) {
            var k = this.items[b];
            b >= d && b <= e
              ? this._highlight(k, y(a) && (this.canCtrl || this.canMeta))
              : ((k.selecting = !1), k.node.classList.remove(c.selecting));
          }
        }
      },
      _highlight: function (a, c, b) {
        b = this.config;
        var d = a.node,
          e = !1,
          k = this.bodyContainer ? 0 : this.scroll.x,
          m = this.bodyContainer ? 0 : this.scroll.y;
        if ("normal" === b.lassoSelect)
          if ("touch" === b.tolerance)
            if (a.transform)
              a: {
                (e = [
                  { x: this.origin.x, y: this.origin.y },
                  { x: this.mouse.x + k, y: this.origin.y },
                  { x: this.mouse.x + k, y: this.mouse.y + m },
                  { x: this.origin.x, y: this.mouse.y + m },
                ]),
                  (k = a.transform.rect);
                var l,
                  h,
                  f,
                  p = [e, k];
                for (m = 0; m < p.length; m++) {
                  var n = p[m];
                  for (l = 0; l < n.length; l++) {
                    var r = n[l];
                    var q = n[(l + 1) % n.length];
                    var D = q.y - r.y,
                      B = r.x - q.x;
                    r = q = void 0;
                    for (h = 0; h < e.length; h++) {
                      var t = D * e[h].x + B * e[h].y;
                      (void 0 === r || t < r) && (r = t);
                      (void 0 === q || q < t) && (q = t);
                    }
                    var v = (f = void 0);
                    for (h = 0; h < k.length; h++)
                      (t = D * k[h].x + B * k[h].y),
                        (void 0 === v || t < v) && (v = t),
                        (void 0 === f || f < t) && (f = t);
                    if (q < v || f < r) {
                      e = !1;
                      break a;
                    }
                  }
                }
                e = !0;
              }
            else
              e = !(
                a.rect.x1 + k > this.current.x2 ||
                a.rect.x2 + k < this.current.x1 ||
                a.rect.y1 + m > this.current.y2 ||
                a.rect.y2 + m < this.current.y1
              );
          else
            "fit" === b.tolerance &&
              (e =
                a.rect.x1 + k > this.current.x1 &&
                a.rect.x2 + k < this.current.x2 &&
                a.rect.y1 + m > this.current.y1 &&
                a.rect.y2 + m < this.current.y2);
        else e = !0;
        e
          ? (a.selected &&
              !b.toggle &&
              (g.remove(d, b.classes.selected), (a.selected = !1)),
            a.deselecting &&
              (!b.toggle || (b.toggle && "drag" !== b.toggle)) &&
              (g.remove(d, b.classes.deselecting), (a.deselecting = !1)),
            a.selecting || (g.add(d, b.classes.selecting), (a.selecting = !0)))
          : (a.selecting &&
              (g.remove(d, b.classes.selecting),
              (a.selecting = !1),
              c && a.startselected
                ? (g.add(d, b.classes.selected), (a.selected = !0))
                : a.startselected &&
                  !b.toggle &&
                  (g.add(d, b.classes.deselecting), (a.deselecting = !0))),
            !d.selected ||
              c ||
              a.startselected ||
              (g.remove(d, b.classes.selected),
              (a.selected = !1),
              g.add(d, b.classes.deselecting),
              (a.deselecting = !0)));
      },
      _focus: function (a) {
        this.focused = !0;
        g.add(this.container, "ui-focused");
      },
      _blur: function (a) {
        this.focused = !1;
        g.remove(this.container, "ui-focused");
      },
      _get2DTransformation: function (a) {
        a = window.getComputedStyle(a, null);
        var c =
          a.getPropertyValue("-webkit-transform") ||
          a.getPropertyValue("-moz-transform") ||
          a.getPropertyValue("-ms-transform") ||
          a.getPropertyValue("-o-transform") ||
          a.getPropertyValue("transform") ||
          !1;
        if (c && "none" !== c) {
          c = c.split("(")[1].split(")")[0].split(", ");
          var b = parseFloat(c[0]),
            d = parseFloat(c[1]),
            e = Math.sqrt(b * b + d * d);
          a = a.transformOrigin.split(" ").map(function (k) {
            return parseFloat(k);
          });
          return {
            angle: Math.round((180 / Math.PI) * Math.atan2(d, b)),
            scale: e,
            origin: { x: parseFloat(a[0]), y: parseFloat(a[1]) },
            translate: { x: parseFloat(c[4]), y: parseFloat(c[5]) },
          };
        }
        return !1;
      },
    };
    return J;
  }
);
