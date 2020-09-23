const db = require('../models');
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: 'Content can not be empty!'
        });
        return;
    }

    // create a Tutorial
    const tutorial = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false,
    };

    // Save Tutorial in th database
    Tutorial.create(tutorial)
        .then(data => {
          res.send(data);
      })
      .catch(err => {
          res.status(500).send({
              message:
                err.message || 'Some error occured while creating the Tutorial'
          });
      });

};

// Retrieve all tutorials from the databse.
export.findAll = (req, res) => {
    const title = req.query.title;
    let condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

    Tutorial.findAll({ where: condition })
      .then(data => {
        req.send(data);
      })
      .catch(err => {
        req.status(500).send({
          message:
            err.message || "Some error while retrieving tutorials."
        })
      })
};

// Find a single Tutorial by id in the request
export.findOne = (req, res) => {
    const id = req.params.id;

  Tutorial.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};

// Update a Tutorial by id in the request
export.update = (req, res) => {
    const id = req.params.id;

    Tutorial.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tutorial was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Tutorial with id=" + id
        });
      });
  }; 
};

// Delete a Tutorial with the specified id in the request
export.delete = (req, res) => {
    const id =req.params.id;

    Tutorial destroy({
        where: { id: id }
    })
         .then(num => {
             if (num == 1) {
                 req.send({
                     message: "Tutorial deleted succesful"
                 })
             }
         })
};

// Delete all Tutorials from the database.
export.deleteAll = (req, res) => {
  Tutorial.destroy({
    where: {},
    truncate: false
  })
     .then(nums => {
       req.send({ message: `${nums} Tutorials were deleted success`})
     })
     .catch(err => {
       req.status(500).send({
         message:
           err.message || "Some error occured while removed tutorials."
       })
     })
};

// Find all published Tutorials
export.findAllPublished = (req, res) => {
  Tutorial.findAll({ where: { published:true } })
    .then(data => {
      req.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occured while retrieving tutorials published."
      })
    })
};