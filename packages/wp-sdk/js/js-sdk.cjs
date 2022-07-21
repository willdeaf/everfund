var e = require('body-scroll-lock'),
  n = require('element-closest')
require('core-js/features/array/includes'),
  require('core-js/features/array/fill'),
  require('core-js/features/promise'),
  require('core-js/features'),
  require('element-remove')
var o = require('goober')
function t(e) {
  return e && 'object' == typeof e && 'default' in e ? e : { default: e }
}
var a = /*#__PURE__*/ t(n),
  r = new /*#__PURE__*/ ((function () {
    function n() {
      ;(this.donationWidgetOpen = !1),
        (this.onSuccess = function () {}),
        (this.onFailure = function () {}),
        (this.onClose = function () {}),
        (this.version = void 0),
        (this.version = '2.0.0'),
        this.setupButtonListeners(),
        this.setupIframeListeners(),
        a.default(window)
    }
    var t = n.prototype
    return (
      (t.modal = function (e) {
        var n = e.code,
          o = e.domain,
          t = e.closeOnSuccess,
          a = e.onSuccess,
          r = e.onFailure,
          i = e.onClose
        console.warn(
          'everfund.modal is deprecated in the next update, please use everfund.donationWidget instead'
        ),
          this.donationWidget({
            code: n,
            domain: o,
            closeOnSuccess: t,
            onSuccess: a,
            onFailure: r,
            onClose: i,
          })
      }),
      (t.donationWidget = function (n) {
        var t = n.code,
          a = n.domain,
          r = n.closeOnSuccess,
          i = n.onSuccess,
          s = n.onFailure,
          d = n.onClose
        i && (this.onSuccess = i),
          s && (this.onFailure = s),
          d && (this.onClose = d)
        var c = window.location.origin,
          l = function (e) {
            var n = []
            for (var o in e)
              e[o] &&
                e.hasOwnProperty(o) &&
                n.push(encodeURIComponent(o) + '=' + encodeURIComponent(e[o]))
            return n.join('&')
          }
        try {
          var u = document.createElement('iframe')
          ;(u.src =
            'https://' +
            (a || 'evr.fund') +
            '/' +
            t +
            '/modal?' +
            l({ embed_origin: c, embeded: !0, close_on_success: r })),
            (u.allowPaymentRequest = !0)
          var m = o.css({
            border: 'none',
            width: '100%',
            margin: 0,
            height: '100%',
          })
          ;(u.id = 'ef-modal'),
            (u.className = m),
            u.addEventListener('load', function () {
              var e = document.querySelector('.ldsRing'),
                n = document.querySelector('.embedModal')
              null == e || e.remove(), (n.style.transform = 'opacity(1)')
            })
          var p = document.createElement('div'),
            f = o.css({
              pointerEvents: 'all',
              zIndex: '9999999',
              display: 'flex',
              width: '100%',
              transform: 'opacity(0)',
              transition: 'transform 0.3s ease',
              overflowY: 'auto',
              '-webkit-overflow-scrolling': 'touch',
              height: '100%',
            })
          ;(p.className = 'embedModal ' + f), p.appendChild(u)
          var v = document.createElement('div')
          e.disableBodyScroll(v)
          var h = document.createElement('div'),
            b = o.keyframes({
              '0%': { transform: 'rotate(0deg)' },
              '100%': { transform: 'rotate(360deg)' },
            }),
            g = o.css({
              display: 'inline-block',
              position: 'absolute',
              left: 'calc(50% - 32px)',
              top: 'calc(50% - 32px)',
              width: '64px',
              height: '64px',
              '& div': {
                boxSizing: 'border-box',
                display: 'block',
                position: 'absolute',
                width: '51px',
                height: '51px',
                margin: '6px',
                border: '6px solid white',
                borderRadius: '50%',
                animation: b + ' 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite',
                borderColor: 'white transparent transparent transparent',
              },
              '& div:nth-child(1)': { animationDelay: ' -0.45s' },
              '& div:nth-child(2)': { animationDelay: ' -0.3s' },
              '& div:nth-child(3)': { animationDelay: ' -0.15s' },
            })
          h.className = 'ldsRing ' + g
          var y = document.createElement('div')
          Array(4)
            .fill(4)
            .forEach(function () {
              h.appendChild(y)
            })
          var w = o.css({
            position: 'fixed',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            background: 'rgba(0, 0, 0, 0.7)',
            zIndex: '9999998',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'stretch',
            backdropFilter: 'blur(8px)',
          })
          ;(v.className = 'embedContainer ' + w),
            v.appendChild(h),
            v.appendChild(p),
            document.body.appendChild(v)
        } catch (e) {
          console.log(e),
            window.location.replace(
              'https://' +
                (a || 'evr.fund') +
                '/' +
                t +
                '/modal?' +
                l({ return_url: c })
            )
        }
      }),
      (t.setupButtonListeners = function () {
        document.addEventListener(
          'click',
          function (n) {
            var o = n.target.closest('[data-ef-modal]')
            if (o && !r.donationWidgetOpen) {
              n.preventDefault(), n.stopPropagation()
              var t = o.getAttribute('data-ef-modal')
              t
                ? (new RegExp(
                    '^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$',
                    'i'
                  ).test(t) &&
                    (console.warn(
                      "Everfund: url's are deprecated please use a code instead"
                    ),
                    (t = new URL(t).pathname.replace('/', ''))),
                  (r.donationWidgetOpen = !0),
                  r.donationWidget({
                    code: t,
                    onSuccess: function () {},
                    onFailure: function () {},
                    onClose: function () {
                      e.clearAllBodyScrollLocks()
                    },
                  }))
                : console.error(
                    'Everfund: data-ef-modal is required! eg <button data-ef-modal="rjww"> modal </button>'
                  )
            }
          },
          !1
        )
      }),
      (t.setupIframeListeners = function () {
        window.addEventListener(
          'message',
          function (n) {
            var o = document.querySelector('.embedContainer')
            switch (n.data.message) {
              case 'everfund:ready':
                var t = document.querySelector('#ldsRing'),
                  a = document.querySelector('.embedModal')
                null == t || t.remove(), (a.style.transform = 'opacity(1)')
                break
              case 'everfund:success':
                r.onSuccess(n.data.content)
                break
              case 'everfund:failure':
                r.onFailure(n.data.content)
                break
              case 'everfund:close':
                o && e.enableBodyScroll(o),
                  o && o.remove(),
                  (r.donationWidgetOpen = !1),
                  r.onClose()
            }
          },
          !1
        )
      }),
      n
    )
  })())()
module.exports = r
//# sourceMappingURL=js-sdk.cjs.map
