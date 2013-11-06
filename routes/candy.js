var fs = require('fs');

function getData() {

  // can this get cached or something?
  return (fs.readFileSync('./data.json', { encoding: 'utf8', flag: 'r' }));
}

exports.index = function(req, res) {
  var data = { objects: JSON.parse(getData()) };

  if (req.query.form) {
    data.form = req.query.form;
  }

  res.render('candy', data);
};

exports.generate = function(req, res) {
  console.log("Request Body:\n" + JSON.stringify(req.body, null, '\t'));

  var file = fs.createWriteStream('./output/' + req.body.file + '.json', { flags: 'wx'});

  file.on('error', function(err) {
    console.log("ERROR: " + err);
  });

  file.write(JSON.stringify(req.body.field, null, '\t'));
  file.end();

  res.redirect('/candy');
};
