exports.control = function( req, res ){
  var model = {};

  model.results = "SUCCEED";

  console.log( req.body );

  return model;
}
