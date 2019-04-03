const Sms = require("../models/sms");

exports.getSmsList = (req, res, next) => {
  const pageSize = Number(+req.query.pagesize);
  const currentPage = Number(+req.query.page);
  const sorttype = req.query.sorttype;
  const sortfield = req.query.sortfield;

  const startDate = new Date(req.query.startDate);
  const endDate = new Date(req.query.endDate);


  let sort = {};
  sort[sortfield] = sorttype;

  let query = {};
  if (!!startDate && !!endDate && startDate < endDate) {
    query = {
      start_date: {
        $gte: startDate
      },
      end_date: {
        $lte: endDate
      }
    }
  }

  console.log(query);

  const smsQuery = Sms.find(query);
  let fetchedSmsList;
  if (pageSize && currentPage) {
    smsQuery.skip(pageSize * (currentPage - 1)).limit(pageSize).sort(sort);
  }
  smsQuery
    .then(documents => {
      fetchedSmsList = documents;
      return Sms.countDocuments(query);
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