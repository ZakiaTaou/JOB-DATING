import { Recruiter, User, Candidate, Swipe, Match } from "../models/index.js";
import { Op } from "sequelize";
export const createRecruiterProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    if (req.user.role !== "recruiter") {
      return res.status(403).json({
        success: false,
        message: "Seuls les recruteurs peuvent créer un profil recruteur",
      });
    }

    const existingProfile = await Recruiter.findOne({ where: { userId } });
    if (existingProfile) {
      return res.status(400).json({
        success: false,
        message: "Un profil recruteur existe déjà pour cet utilisateur",
      });
    }

    const {
      companyName,
      industry,
      description,
      logo,
      companySize,
      website,
      location,
      phone,
    } = req.body;

    if (!companyName || !description) {
      return res.status(400).json({
        success: false,
        message: "Le nom de l'entreprise et la description sont requis",
      });
    }

    const profile = await Recruiter.create({
      userId,
      companyName,
      industry,
      description,
      logo,
      companySize,
      website,
      location,
      phone,
    });

    res.status(201).json({
      success: true,
      message: "Profil recruteur créé avec succès",
      data: profile,
    });
  } catch (error) {
    console.error("Erreur création profil recruteur:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la création du profil",
      error: error.message,
    });
  }
};

export const updateRecruiterProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    if (req.user.role !== "recruiter") {
      return res.status(403).json({
        success: false,
        message: "Accès refusé",
      });
    }

    const profile = await Recruiter.findOne({ where: { userId } });
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profil recruteur non trouvé",
      });
    }

    const {
      companyName,
      industry,
      description,
      logo,
      companySize,
      website,
      location,
      phone,
    } = req.body;

    await profile.update({
      companyName: companyName || profile.companyName,
      industry: industry || profile.industry,
      description: description || profile.description,
      logo: logo || profile.logo,
      companySize: companySize || profile.companySize,
      website: website || profile.website,
      location: location || profile.location,
      phone: phone || profile.phone,
    });

    res.status(200).json({
      success: true,
      message: "Profil mis à jour avec succès",
      data: profile,
    });
  } catch (error) {
    console.error("Erreur mise à jour profil recruteur:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la mise à jour du profil",
      error: error.message,
    });
  }
};

export const getRecruiterProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const profile = await Recruiter.findByPk(id, {
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
        message: "Profil recruteur non trouvé",
      });
    }

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    console.error("Erreur récupération profil recruteur:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération du profil",
      error: error.message,
    });
  }
};

export const getMyRecruiterProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const profile = await Recruiter.findOne({
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
        message: "Profil recruteur non trouvé",
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

export const getCandidatesToSwipe = async (req, res) => {
  try {
    const recruiterUserId = req.user.id;

    const swipedCandidates = await Swipe.findAll({
      where: {
        userId: recruiterUserId,
        targetType: "candidate",
      },
      attributes: ["targetId"],
    });

    const excludedIds = swipedCandidates.map((s) => s.targetId);

    const candidates = await Candidate.findAll({
      where: {
        id: {
          [Op.notIn]: excludedIds.length ? excludedIds : [0],
        },
      },
    });

    res.json({ success: true, data: candidates });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const swipeCandidate = async (req, res) => {
  try {
    const recruiterUserId = req.user.id;
    const { candidateId } = req.params;
    const { jobOfferId, action } = req.body;

    if (action !== "like" && action !== "dislike") {
      return res.status(400).json({ message: "Invalid action" });
    }

    const swipe = await Swipe.create({
      userId: recruiterUserId,
      targetId: candidateId,
      targetType: "candidate",
      action,
    });

    if (action === "like") {
      const candidateUser = await Candidate.findByPk(candidateId);
      const candidateSwipe = await Swipe.findOne({
        where: {
          userId: candidateUser.userId,
          targetId: jobOfferId,
          targetType: "job_offer",
          action: "like",
        },
      });

      if (candidateSwipe) {
        const match = await Match.findOrCreate({
          where: {
            candidateId,
            jobOfferId,
          },
        });

        return res.json({
          success: true,
          match: true,
          data: match[0],
        });
      }
    }

    res.json({ success: true, match: false });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
