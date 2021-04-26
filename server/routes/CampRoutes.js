const url = require('url');
const Camp = require("../models/Camp.js");
const CampService = require("../services/CampService.js");

module.exports = function (app) {
//    /camps?category=some&status=other
//    /camps?category=bike
//    /camps?category=some&status=other

app.get("/camps", (req, res, next) => {
        var campService = new CampService();
        const queryObject = url.parse(req.url,true).query;

        (async () => {
          try {
            res.json(JSON.stringify(await campService.getCamps(queryObject.category,queryObject.status)));
          } catch (error) {
            if (error instanceof EvalError || error instanceof TypeError) {
              res.status(400).send({
                message: error.message,
              });
            } else {
              res.status(500).send({
                message: "Internal server error",
              });
            }
          }
        })();
      });
    
      app.delete("/camps/:id", (req, res, next) => {
        var campService = new CampService();
    
        (async () => {
          try {
            await campService.deleteCampById(req.params.id);
            res.status(200).send({
              message: "Deleted",
            });
          } catch (error) {
            if (error instanceof EvalError || error instanceof TypeError) {
              res.status(400).send({
                message: error.message,
              });
            } else {
              res.status(500).send({
                message: "Internal server error",
              });
            }
          }
        })();
      });
    
      app.post("/camps", (req, res, next) => {
        var campService = new CampService();
    
        (async () => {
          try {
            
            await campService.insertCamp(
              new Camp(
                null,
                req.body.name, 
                req.body.description, 
                req.body.location, 
                req.body.schedule,
                new Date(req.body.startDate),
                req.body.category, 
                parseInt(req.body.capacity),
                parseInt(req.body.price),
                parseInt(req.body.minAge),
                parseInt(req.body.maxAge),
                req.body.requiredEquipment,
                parseInt(req.body.duration)
              )
            );
            res.status(200).send({
              message: "Created",
            });
          } catch (error) {
            if (error instanceof TypeError || error instanceof EvalError) {
              res.status(400).send({
                message: error.message,
              });
            } else {
              res.status(500).send({
                message: "Internal server error",
              });
            }
          }
        })();
      });
    
      app.put("/camps/:id", (req, res, next) => {
        var campService = new CampService();
    
        (async () => {
          try {
            await campService.updateCampById(
              new Camp(
                parseInt(req.params.id),
                req.body.name, 
                req.body.description, 
                req.body.location, 
                req.body.schedule,
                new Date(req.body.startDate),
                req.body.category, 
                parseInt(req.body.capacity),
                parseInt(req.body.price),
                parseInt(req.body.minAge),
                parseInt(req.body.maxAge),
                req.body.requiredEquipment,
                parseInt(req.body.duration)
              )
            );
            res.status(200).send({
              message: "Updated",
            });
          } catch (error) {
            if (error instanceof EvalError || error instanceof TypeError) {
                console.log(error.message);
              res.status(400).send({
                message: error.message,
              });
            } else {
              res.status(500).send({
                message: "Internal server error",
              });
            }
          }
        })();
      });
    
      app.get("/camps/:id", (req, res, next) => {
        var campService = new CampService();
    
        (async () => {
          try {
            res.json(JSON.stringify(await campService.getCampById(parseInt(req.params.id))));
          } catch (error) {
            if (error instanceof EvalError || error instanceof TypeError) {
              res.status(400).send({
                message: error.message,
              });
            } else {
              res.status(500).send({
                message: "Internal server error",
              });
            }
          }
        })();
      });

}