var express = require('express');

var morgan = require('morgan');
var mongoose = require('mongoose');
var config = require('./config/main');

var bodyParser = require('body-parser');
var path = require('path');

var cors = require('cors');
var aglio = require('aglio');
var fs = require('fs');


var Quote = require('./models/quote');
var Action = require('./models/action');
var WubbyName = require('./models/wubbyname');
var SentenceObject = require('./models/object');

// Initialize http server
const app = express();


app.use(morgan('/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

mongoose.connect(config.database);

// Create API group routes
var apiRoutes = express.Router();

apiRoutes.post('/getQuote', function(req, res) {
  Quote.findOne({
    _id: req.body.id
  }, function(err, quote) {
    if (err) throw err;
    if (!quote) {
      res.send({ success: false, message: 'Quote not found!' });
    } else {
      res.json({
        success: true,
        text: quote.content
      });
    }
  });
});

// Register new users
apiRoutes.post('/saveQuote', function(req, res) {
  if(!req.body.quote) {
    res.json({ success: false, message: 'Please provide a quote' });
  } else {
    var newQuote = new Quote({
      content: req.body.quote
    });

    // Attempt to save the quote
    newQuote.save(function(err, quote) {
      if (err) {
        return res.json({ success: false, message: 'Something went wrong!', error: err});
      }
      res.json({ success: true, message: 'Successfully saved quote!', id: quote._id });
    });
  }
});

apiRoutes.post('/saveWubbyName', function(req, res) {
  if(!req.body.wubbyname) {
    res.json({ success: false, message: 'Please provide a quote' });
  } else {
    var newWubbyName = new WubbyName({
      content: req.body.wubbyname
    });

    // Attempt to save the name
    newWubbyName.save(function(err, name) {
      if (err) {
        return res.json({ success: false, message: 'Something went wrong!', error: err});
      }
      res.json({ success: true, message: 'Successfully saved name!', id: name._id });
    });
  }
});

apiRoutes.post('/saveAction', function(req, res) {
  if(!req.body.action) {
    res.json({ success: false, message: 'Please provide an action' });
  } else {
    var newAction = new Action({
      content: req.body.action
    });

    // Attempt to save the name
    newAction.save(function(err, action) {
      if (err) {
        return res.json({ success: false, message: 'Something went wrong!', error: err});
      }
      res.json({ success: true, message: 'Successfully saved action!', id: action._id });
    });
  }
});

apiRoutes.post('/saveSentenceObject', function(req, res) {
  if(!req.body.sentenceObject) {
    res.json({ success: false, message: 'Please provide an object' });
  } else {
    var newSentenceObject = new SentenceObject({
      content: req.body.sentenceObject
    });

    // Attempt to save the name
    newSentenceObject.save(function(err, obj) {
      if (err) {
        return res.json({ success: false, message: 'Something went wrong!', error: err});
      }
      res.json({ success: true, message: 'Successfully saved object!', id: obj._id });
    });
  }
});


function getRandom(callback) {

  var obj = {};

  WubbyName.random(function(err, wubbyname) {
    obj.wubbyname = wubbyname.content;

    Action.random(function(err, action) {
      obj.action = action.content;


      SentenceObject.random(function(err, sentenceobject) {
        obj.sentenceobject = sentenceobject.content;

        callback(null, obj);

      });


    });

  });
}

apiRoutes.get('/randomQuote', function(req, res) {
  getRandom(function(err, result) {
    res.send(result);
  });
});

apiRoutes.get('/wubbyname', function(req, res) {
  WubbyName.find({

  }, function(err, name) {
    res.send(name);
  });
});

apiRoutes.get('/sentenceaction', function(req, res) {
  Action.find({

  }, function(err, action) {
    res.send(action);
  });
});

apiRoutes.get('/sentenceobject', function(req, res) {
  SentenceObject.find({

  }, function(err, obj) {
    res.send(obj);
  });
});

// Set url for API group routes
app.use('/api', apiRoutes);

// Handle / route
app.get('/', function(req, res) {
  //TODO: Redirect to frontend

  res.send('Wubby Generator Express Server');
});


const server = app.listen(3000, () => {
  const { address, port } = server.address();
  console.log(`Listening at http://${address}:${port}`);
});
