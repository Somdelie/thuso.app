const { default: mongoose } = require("mongoose");

const jobSchema = new mongoose.Schema({
  companyName: String,
  title: String,
  type: String,
  location: String,
  experience: String,
  description: String,
  skills: String,
  recruiterId: String,
  applicants: [
    {
      name: String,
      email: String,
      userId: String,
      status: String,
    },
  ],
});

const Job = mongoose.models.Job || mongoose.model("Job", jobSchema);

export default Job;
