const express = require("express");
const router = express.Router();
const studentModel = require("../models/student");
const { check, validationResult } = require("express-validator/check");
const auth = require("../middleware/auth");
//Query Parameter
router.get("/", auth, async (req, res) => {
  console.log("Get Student API is called...");
  //console.log(req.query.scity);

  try {
    const student = await studentModel.find({ sname: req.query.sname });
    res.send(student);
  } catch (error) {
    res.send(error);
  }
});

router.get("/list", auth, async (req, res) => {
  console.log("Get All Students API is called..");

  try {
    const students = await studentModel.find();
    res.send(students);
  } catch (error) {
    res.send(error);
  }
});

//Path Parameter
router.get("/:sno", auth, async (req, res) => {
  console.log("Get Student By ID API is called...");

  try {
    const student = await studentModel.findOne({ sno: req.params.sno });
    res.send(student);
  } catch (error) {
    res.send(error);
  }
});

router.post(
  "/",

  [
    //Validate if semail is email
    check("semail", "Please provide valid email address.").isEmail(),
    //Validate if sno is number
    check("sno", "Student number must be valid numeric value").isNumeric(),
    //Validate if sname has min 5 chars
    check(
      "sname",
      "Student name must have min 5 and max 120 characters."
    ).isLength({
      min: 5,
      max: 120,
    }),
  ],
  auth,
  async (req, res) => {
    console.log("Post Student API is called...");

    //Validate your request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //Create Student Model
    const student = studentModel({
      sno: req.body.sno,
      sname: req.body.sname,
      semail: req.body.semail,
      enrolldate: req.body.enrolldate,
      sdob: req.body.sdob,
      scity: req.body.scity,
    });

    try {
      const save = await student.save();
      res.send(save);
    } catch (error) {
      res.send(error);
    }
  }
);

router.put("/:sname", auth, async (req, res) => {
  console.log("Update Student API is called...");

  try {
    const student = await studentModel.updateOne(
      { sname: req.params.sname },
      {
        $set: req.body,
      }
    );
    res.send(student);
  } catch (error) {
    res.send(error);
  }
});

router.delete("/:sno", auth, async (req, res) => {
  console.log("Delete Student API is called...");

  try {
    const save = await studentModel.remove({ sno: req.params.sno });
    res.send(save);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
