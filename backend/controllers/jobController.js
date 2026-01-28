import { JobOffer, Recruiter, User } from "../models/index.js";
import { Op } from "sequelize";

export const createJob = async (req, res) => {
  try {
    const userId = req.user.id;

    if (req.user.role !== "recruiter") {
      return res.status(403).json({
        success: false,
        message: "Seuls les recruteurs peuvent créer des offres",
      });
    }

    const recruiter = await Recruiter.findOne({ where: { userId } });
    if (!recruiter) {
      return res.status(404).json({
        success: false,
        message:
          "Profil recruteur non trouvé. Veuillez créer votre profil d'abord.",
      });
    }

    const {
      title,
      description,
      requiredSkills,
      contractType,
      location,
      salary,
      isActive,
    } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Le titre et la description sont requis",
      });
    }

    const job = await JobOffer.create({
      recruiterId: recruiter.id,
      title,
      description,
      requiredSkills: requiredSkills || [],
      contractType: contractType || "CDI",
      location,
      salary,
      isActive: isActive !== undefined ? isActive : true,
    });

    const jobWithRecruiter = await JobOffer.findByPk(job.id, {
      include: [
        {
          model: Recruiter,
          as: "recruiter",
          include: [
            {
              model: User,
              as: "user",
              attributes: ["id", "email"],
            },
          ],
        },
      ],
    });

    res.status(201).json({
      success: true,
      message: "Offre créée avec succès",
      data: jobWithRecruiter,
    });
  } catch (error) {
    console.error("Erreur création offre:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la création de l'offre",
      error: error.message,
    });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await JobOffer.findAll({
      include: [
        {
          model: Recruiter,
          as: "recruiter",
          attributes: ["id", "companyName", "logo", "location", "industry"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs,
    });
  } catch (error) {
    console.error("Erreur récupération offres:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des offres",
      error: error.message,
    });
  }
};

export const getJobById = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await JobOffer.findByPk(id, {
      include: [
        {
          model: Recruiter,
          as: "recruiter",
          include: [
            {
              model: User,
              as: "user",
              attributes: ["id", "email"],
            },
          ],
        },
      ],
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Offre non trouvée",
      });
    }

    res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error) {
    console.error("Erreur récupération offre:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération de l'offre",
      error: error.message,
    });
  }
};

export const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    if (req.user.role !== "recruiter") {
      return res.status(403).json({
        success: false,
        message: "Accès refusé",
      });
    }

    const recruiter = await Recruiter.findOne({ where: { userId } });
    if (!recruiter) {
      return res.status(404).json({
        success: false,
        message: "Profil recruteur non trouvé",
      });
    }

    const job = await JobOffer.findByPk(id);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Offre non trouvée",
      });
    }

    if (job.recruiterId !== recruiter.id) {
      return res.status(403).json({
        success: false,
        message: "Vous n'êtes pas autorisé à modifier cette offre",
      });
    }

    const {
      title,
      description,
      requiredSkills,
      contractType,
      location,
      salary,
      isActive,
    } = req.body;

    await job.update({
      title: title || job.title,
      description: description || job.description,
      requiredSkills: requiredSkills || job.requiredSkills,
      contractType: contractType || job.contractType,
      location: location || job.location,
      salary: salary || job.salary,
      isActive: isActive !== undefined ? isActive : job.isActive,
    });

    const updatedJob = await JobOffer.findByPk(id, {
      include: [
        {
          model: Recruiter,
          as: "recruiter",
          attributes: ["id", "companyName", "logo"],
        },
      ],
    });

    res.status(200).json({
      success: true,
      message: "Offre mise à jour avec succès",
      data: updatedJob,
    });
  } catch (error) {
    console.error("Erreur mise à jour offre:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la mise à jour de l'offre",
      error: error.message,
    });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    if (req.user.role !== "recruiter") {
      return res.status(403).json({
        success: false,
        message: "Accès refusé",
      });
    }

    const recruiter = await Recruiter.findOne({ where: { userId } });
    if (!recruiter) {
      return res.status(404).json({
        success: false,
        message: "Profil recruteur non trouvé",
      });
    }

    const job = await JobOffer.findByPk(id);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Offre non trouvée",
      });
    }

    if (job.recruiterId !== recruiter.id) {
      return res.status(403).json({
        success: false,
        message: "Vous n'êtes pas autorisé à supprimer cette offre",
      });
    }

    await job.destroy();

    res.status(200).json({
      success: true,
      message: "Offre supprimée avec succès",
    });
  } catch (error) {
    console.error("Erreur suppression offre:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la suppression de l'offre",
      error: error.message,
    });
  }
};

export const getJobsByRecruiter = async (req, res) => {
  try {
    const { recruiterId } = req.params;

    const recruiter = await Recruiter.findByPk(recruiterId);
    if (!recruiter) {
      return res.status(404).json({
        success: false,
        message: "Recruteur non trouvé",
      });
    }

    const jobs = await JobOffer.findAll({
      where: { recruiterId },
      include: [
        {
          model: Recruiter,
          as: "recruiter",
          attributes: ["id", "companyName", "logo", "location"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs,
    });
  } catch (error) {
    console.error("Erreur récupération offres recruteur:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des offres",
      error: error.message,
    });
  }
};

export const getMyJobs = async (req, res) => {
  try {
    const userId = req.user.id;

    if (req.user.role !== "recruiter") {
      return res.status(403).json({
        success: false,
        message: "Accès refusé",
      });
    }

    const recruiter = await Recruiter.findOne({ where: { userId } });
    if (!recruiter) {
      return res.status(404).json({
        success: false,
        message: "Profil recruteur non trouvé",
      });
    }

    const jobs = await JobOffer.findAll({
      where: { recruiterId: recruiter.id },
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs,
    });
  } catch (error) {
    console.error("Erreur récupération mes offres:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des offres",
      error: error.message,
    });
  }
};
