import { Op } from "sequelize";
import {
  Candidate,
  JobOffer,
  Recruiter,
  Swipe,
  User,
} from "../models/index.js";

export const createCandidateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    if (req.user.role !== "candidate") {
      return res.status(403).json({
        success: false,
        message: "Seuls les candidats peuvent créer un profil candidat",
      });
    }

    const existingProfile = await Candidate.findOne({ where: { userId } });
    if (existingProfile) {
      return res.status(400).json({
        success: false,
        message: "Un profil candidat existe déjà pour cet utilisateur",
      });
    }

    const {
      firstName,
      lastName,
      phone,
      bio,
      skills,
      experience,
      education,
      cvUrl,
      profilePicture,
      location,
      availability,
    } = req.body;

    const profile = await Candidate.create({
      userId,
      firstName,
      lastName,
      phone,
      bio,
      skills: skills || [],
      experience: experience || [],
      education: education || [],
      cvUrl,
      profilePicture,
      location,
      availability,
    });

    res.status(201).json({
      success: true,
      message: "Profil candidat créé avec succès",
      data: profile,
    });
  } catch (error) {
    console.error("Erreur création profil candidat:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la création du profil",
      error: error.message,
    });
  }
};

export const updateCandidateProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    if (req.user.role !== "candidate") {
      return res.status(403).json({
        success: false,
        message: "Accès refusé",
      });
    }

    const profile = await Candidate.findOne({ where: { userId } });
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profil candidat non trouvé",
      });
    }

    const {
      firstName,
      lastName,
      phone,
      bio,
      skills,
      experience,
      education,
      cvUrl,
      profilePicture,
      location,
      availability,
    } = req.body;

    await profile.update({
      firstName: firstName || profile.firstName,
      lastName: lastName || profile.lastName,
      phone: phone || profile.phone,
      bio: bio || profile.bio,
      skills: skills || profile.skills,
      experience: experience || profile.experience,
      education: education || profile.education,
      cvUrl: cvUrl || profile.cvUrl,
      profilePicture: profilePicture || profile.profilePicture,
      location: location || profile.location,
      availability: availability || profile.availability,
    });

    res.status(200).json({
      success: true,
      message: "Profil mis à jour avec succès",
      data: profile,
    });
  } catch (error) {
    console.error("Erreur mise à jour profil candidat:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la mise à jour du profil",
      error: error.message,
    });
  }
};

export const getCandidateProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const profile = await Candidate.findByPk(id, {
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "email", "role", "createdAt"],
        },
      ],
    });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profil candidat non trouvé",
      });
    }

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    console.error("Erreur récupération profil candidat:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération du profil",
      error: error.message,
    });
  }
};

export const getMyCandidateProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const profile = await Candidate.findOne({
      where: { userId },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "email", "role"],
        },
      ],
    });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profil candidat non trouvé",
      });
    }

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    console.error("Erreur récupération profil:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération du profil",
      error: error.message,
    });
  }
};

export const getJobsToSwipe = async (req, res) => {
  try {
    const candidateUserId = req.user.id;
    const swipedJobs = await Swipe.findAll({
      where: {
        userId: candidateUserId,
        targetType: "job_offer",
      },
      attributes: ["targetId"],
    });

    const excludedIds = swipedJobs.map((s) => s.targetId);

    const jobs = await JobOffer.findAll({
      where: {
        id: {
          [Op.notIn]: excludedIds.length ? excludedIds : [0],
        },
      },
      include: [
        {
          model: Recruiter,
          as: "recruiter",
        },
      ],
    });

    res.json({ success: true, data: jobs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const swipeJob = async (req, res) => {
  try {
    const candidateUserId = req.user.id;
    const { jobId } = req.params;
    const { action } = req.body;

    if (!["like", "dislike"].includes(action)) {
      return res.status(400).json({ message: "Invalid action" });
    }

    const swipe = await Swipe.create({
      userId: candidateUserId,
      targetId: jobId,
      targetType: "job_offer",
      action,
    });
    res.status(201).json({ success: true, data: swipe });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
