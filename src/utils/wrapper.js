exports.wrapper = fn => (req, res, next) => fn(req, res, next).catch(next)

/*
1) wrapper(fn1)
2) fn2(req, req, next) {
  fn1(req, res, next).catch(next)
}

function (fn) {
  return function(req, res, next) {
    fn(req, res, next).catch(err)
   }
}
*/
