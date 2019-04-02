const Sms = require("../models/sms");

exports.createSms = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const sms = new Sms({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + "/images/" + req.file.filename,
    creator: req.userData.userId
  });
  sms
    .save()
    .then(createdSms => {
      res.status(201).json({
        message: "Sms added successfully",
        sms: {
          ...createdSms,
          id: createdSms._id
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Creating a sms failed!"
      });
    });
};

exports.updateSms = (req, res, next) => {
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename;
  }
  const sms = new Sms({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath,
    creator: req.userData.userId
  });
  Sms.updateOne({
      _id: req.params.id,
      creator: req.userData.userId
    }, sms)
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({
          message: "Update successful!"
        });
      } else {
        res.status(401).json({
          message: "Not authorized!"
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Couldn't udpate sms!"
      });
    });
};

exports.getSmsList = (req, res, next) => {
  const pageSize = Number(+req.query.pagesize);
  const currentPage = Number(+req.query.page);
  const sorttype = req.query.sorttype;
  const sortfield = req.query.sortfield;

  let sort = {};
  sort[sortfield] = sorttype;

  const smsQuery = Sms.find();
  let fetchedSmsList;
  if (pageSize && currentPage) {
    smsQuery.skip(pageSize * (currentPage - 1)).limit(pageSize).sort(sort);
  }
  smsQuery
    .then(documents => {
      fetchedSmsList = documents;
      return Sms.countDocuments();
    })
    .then(count => {
      res.status(200).json({
        message: "Sms list fetched successfully!",
        smsList: fetchedSmsList,
        maxSmsList: count
      });
    })
    .catch(error => {
      console.log(error);

      res.status(500).json({
        message: "Fetching smsList failed!"
      });
    });
};

exports.getSms = (req, res, next) => {
  Sms.findById(req.params.id)
    .then(sms => {
      if (sms) {
        res.status(200).json(sms);
      } else {
        res.status(404).json({
          message: "Sms not found!"
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching sms failed!"
      });
    });
};

exports.deleteSms = (req, res, next) => {
  Sms.deleteOne({
      _id: req.params.id,
    })
    .then(result => {
      console.log(result);
      if (result.n > 0) {
        res.status(200).json({
          message: "Deletion successful!"
        });
      } else {
        res.status(401).json({
          message: "Not authorized!"
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Deleting smsList failed!"
      });
    });
};