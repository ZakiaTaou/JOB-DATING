import sequelize from "../config/database.js";
import User from "./User.js";
import Candidate from "./Candidate.js";
import Recruiter from "./Recruiter.js";
import JobOffer from "./JobOffer.js";
import Swipe from "./Swipe.js";
import Match from "./Match.js";
import Message from "./Message.js";

// User <-> Candidate (1:1)
User.hasOne(Candidate, {
  foreignKey: "userId",
  as: "candidateProfile",
});
Candidate.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

// User <-> Recruiter (1:1)
User.hasOne(Recruiter, {
  foreignKey: "userId",
  as: "recruiterProfile",
});
Recruiter.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

// Recruiter <-> JobOffer (1:N)
Recruiter.hasMany(JobOffer, {
  foreignKey: "recruiterId",
  as: "jobOffers"
});
JobOffer.belongsTo(Recruiter, {
  foreignKey: "recruiterId",
  as: "recruiter"
});

// User <-> Swipe (1:N)
User.hasMany(Swipe, {
  foreignKey: "userId",
  as: "swipes"
});
Swipe.belongsTo(User, {
  foreignKey: "userId",
  as: "user"
});

// Candidate <-> Match (1:N)
Candidate.hasMany(Match, {
  foreignKey: "candidateId",
  as: "matches"
});
Match.belongsTo(Candidate, {
  foreignKey: "candidateId",
  as: "candidate"
});

// JobOffer <-> Match (1:N)
JobOffer.hasMany(Match, {
  foreignKey: "jobOfferId",
  as: "matches"
});
Match.belongsTo(JobOffer, {
  foreignKey: "jobOfferId",
  as: "jobOffer"
});

// Match <-> Message (1:N)
Match.hasMany(Message, {
  foreignKey: "matchId",
  as: "messages"
});
Message.belongsTo(Match, {
  foreignKey: "matchId",
  as: "match"
});

// User <-> Message (1:N)
User.hasMany(Message, {
  foreignKey: "senderId",
  as: "sentMessages"
});
Message.belongsTo(User, {
  foreignKey: "senderId",
  as: "sender"
});

export {
    sequelize,
    User,
    Candidate,
    Recruiter,
    JobOffer,
    Swipe,
    Match,
    Message
};