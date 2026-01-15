// ============================================
// backend/models/User.js
// ============================================
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import bcrypt from "bcryptjs";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("candidate", "recruiter"),
      allowNull: false,
    },
  },
  {
    tableName: "users",
    timestamps: true,
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed("password")) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  }
);

User.prototype.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword,this.password);
}

User.prototype.toJSON = function(){
    const values = {...this.get()};
    delete values.password;
    return values;
}

export default User;

// ============================================
// backend/models/Candidate.js
// ============================================
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Candidate = sequelize.define(
  "Candidate",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: "users",
        key: "id"
      },
      onDelete: "CASCADE",
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    skills: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
    },
    experience: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
      // Format: [{title, company, startDate, endDate, description}]
    },
    education: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
      // Format: [{degree, school, year}]
    },
    cvUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    profilePicture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    availability: {
      type: DataTypes.ENUM("immediate", "1-months", "2-months", "3-months"),
      allowNull: true,
    },
  },
  {
    tableName: "candidates",
    timestamps: true,
  }
);
export default Candidate;


// ============================================
// backend/models/Recruiter.js
// ============================================
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Recruiter = sequelize.define(
  "Recruiter",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: "users",
        key: "id"
      },
      onDelete: "CASCADE",
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    industry: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    companySize: {
      type: DataTypes.ENUM("1-10", "11-50", "51-200", "201-500", "500+"),
      allowNull: true,
    },
    website: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "recruiters",
    timestamps: true,
  }
);
export default Recruiter;


// ============================================
// backend/models/JobOffer.js
// ============================================
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const JobOffer = sequelize.define(
  "JobOffer",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    recruiterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "recruiters",
        key: "id"
      },
      onDelete: "CASCADE",
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    requiredSkills: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
    },
    contractType: {
      type: DataTypes.ENUM("CDI", "CDD", "Freelance", "Stage", "Alternance"),
      allowNull: false,
      defaultValue: "CDI",
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    salary: {
      type: DataTypes.JSON,
      allowNull: true,
      // Format: {min: number, max: number, currency: string}
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "job_offers",
    timestamps: true,
  }
);
export default JobOffer;
// ============================================
// backend/models/Swipe.js
// ============================================
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Swipe = sequelize.define(
  "Swipe",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    targetId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    targetType: {
      type: DataTypes.ENUM("candidate", "job_offer"),
      allowNull: false,
    },
    action: {
      type: DataTypes.ENUM("like", "dislike"),
      allowNull: false,
    },
  },
  {
    tableName: "swipes",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["userId", "targetId", "targetType"],
      },
    ],
  }
);
export default Swipe;

// ============================================
// backend/models/Match.js
// ============================================
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Match = sequelize.define(
  "Match",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    candidateId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "candidates",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    jobOfferId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "job_offers",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    status: {
      type: DataTypes.ENUM("active", "archived", "rejected"),
      allowNull: false,
      defaultValue: "active",
    },
    matchedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "matches",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["candidateId", "jobOfferId"],
      },
    ],
  }
);
export default Match

// ============================================
// backend/models/Message.js
// ============================================
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Message = sequelize.define(
  "Message",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    matchId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "matches",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    readAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "messages",
    timestamps: true,
  }
);
export default Message;

// ============================================
// backend/models/index.js
// ============================================
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