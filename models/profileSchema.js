const { default: mongoose } = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  userId: String,
  role: String,
  email: String,
  isPremiumUser: Boolean,
  memberShipType: String,
  memberShipStartDate: String,
  memberShipEndDate: String,
  recruiterInfo: {
    name: String,
    companyName: String,
    companyRole: String,
  },
  candidateInfo: {
    documentPhoto: String,
    resume: String,
    name: String,
    currentCompany: String,
    currentJobLocation: String,
    preferredJobLocation: String,
    currentSalary: String,
    noticePeriod: String,
    skills: String,
    totalExperience: String,
    collegeLocation: String,
    graduatedYear: String,
    linkedinProfile: String,
    isPremiumUser: Boolean,
  },
});

const Profile =
  mongoose.models.Profile || mongoose.model("Profile", ProfileSchema);

export default Profile;
