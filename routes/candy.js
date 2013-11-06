var fs = require('fs');

exports.index = function(req, res) {
  var data = { 
    //these need to get pulled from somewhere, need to have reusable pieces (location, dob)
    objects: {
      'user': { 
        'name': 'user', 
        'fields': ['email', 'password', 'username'] 
      },
      'location' : { 
        'name': 'location',
        'fields': ['country', 'state', 'city'] 
      },
      'dob' : { 
        'name': 'dob',
        'fields': ['month', 'day', 'year'] 
      }
    }
  };

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
