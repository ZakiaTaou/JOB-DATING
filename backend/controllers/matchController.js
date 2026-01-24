import { Match, JobOffer, Candidate, Recruiter } from "../models/index.js";

/* =========================
   CANDIDATE MATCHES
========================= */
export const getCandidateMatches = async (req, res) => {
  try {
    const userId = req.user.id;

    const candidate = await Candidate.findOne({ where: { userId } });
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    const matches = await Match.findAll({
      where: { candidateId: candidate.id },
      include: [
        {
          model: JobOffer,
          include: [
            {
              model: Recruiter,
              as: "recruiter",
            },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json({ success: true, data: matches });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   RECRUITER MATCHES
========================= */
export const getRecruiterMatches = async (req, res) => {
  try {
    const userId = req.user.id;

    const recruiter = await Recruiter.findOne({ where: { userId } });
    if (!recruiter) {
      return res.status(404).json({ message: "Recruiter not found" });
    }

    const matches = await Match.findAll({
      include: [
        {
          model: JobOffer,
          where: { recruiterId: recruiter.id },
          include: [
            {
              model: Candidate,
            },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json({ success: true, data: matches });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

