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
  var file = fs.createWriteStream('./out.json', { flags: 'w' /*flags: 'wx' */ });
  //write to file
  res.redirect('/candy');
};
