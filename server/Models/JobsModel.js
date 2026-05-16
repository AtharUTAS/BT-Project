import JobsModel from "./Models/JobsModel.js";

// ================== GET JOBS ==================
app.get("/jobs", async (req, res) => {
  try {
    let jobs = await JobsModel.findOne();

    // إذا ما فيه بيانات، أنشئ default
    if (!jobs) {
      jobs = await JobsModel.create({
        software: [],
        network: [],
        cyber: [],
        ai: []
      });
    }

    res.send(jobs);
  } catch (err) {
    res.status(500).send({ msg: "Error fetching jobs" });
  }
});