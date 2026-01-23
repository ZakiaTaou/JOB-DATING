// ============================================
// backend/seeders/seed.js
// ============================================
import { User, Candidate, Recruiter, JobOffer, Swipe,sequelize } from '../models/index.js';
import bcrypt from 'bcryptjs';

const seed = async () => {
  try {
    console.log('🌱 Démarrage du seeding...\n');

    // Synchroniser la base de données (créer les tables)
    await sequelize.sync({ force: true });
    console.log('✅ Base de données synchronisée\n');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('Password123!', salt);

    // ============================================
    // 1. Créer des utilisateurs
    // ============================================
    console.log('👥 Création des utilisateurs...');
    
    const users = await User.bulkCreate([
      {
        email: 'candidate1@test.com',
        password: hashedPassword,
        role: 'candidate'
      },
      {
        email: 'candidate2@test.com',
        password: hashedPassword,
        role: 'candidate'
      },
      {
        email: 'candidate3@test.com',
        password: hashedPassword,
        role: 'candidate'
      },
      {
        email: 'recruiter1@test.com',
        password: hashedPassword,
        role: 'recruiter'
      },
      {
        email: 'recruiter2@test.com',
        password: hashedPassword,
        role: 'recruiter'
      }
    ]);

    console.log('✅ 5 utilisateurs créés\n');

    // ============================================
    // 2. Créer des profils candidats
    // ============================================
    console.log('👨‍💻 Création des profils candidats...');

    await Candidate.bulkCreate([
      {
        userId: users[0].id,
        firstName: 'Ahmed',
        lastName: 'Benali',
        phone: '+212612345678',
        bio: 'Développeur Full Stack passionné avec 3 ans d\'expérience en JavaScript, React et Node.js',
        skills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Git', 'Docker'],
        experience: [
          {
            title: 'Développeur Full Stack',
            company: 'Tech Innovators',
            startDate: '2021-01-01',
            endDate: '2024-01-01',
            description: 'Développement d\'applications web modernes avec React et Node.js'
          },
          {
            title: 'Développeur Junior',
            company: 'StartupIT',
            startDate: '2020-06-01',
            endDate: '2020-12-31',
            description: 'Stage de développement web'
          }
        ],
        education: [
          {
            degree: 'Licence en Informatique',
            school: 'Université Hassan II',
            year: '2020'
          }
        ],
        location: 'Casablanca',
        availability: 'immediate'
      },
      {
        userId: users[1].id,
        firstName: 'Fatima',
        lastName: 'Zahra',
        phone: '+212687654321',
        bio: 'Développeuse Mobile spécialisée en React Native avec 2 ans d\'expérience',
        skills: ['React Native', 'TypeScript', 'Firebase', 'Redux', 'Expo', 'JavaScript'],
        experience: [
          {
            title: 'Développeuse Mobile',
            company: 'Mobile Solutions',
            startDate: '2022-03-01',
            endDate: null,
            description: 'Développement d\'applications mobiles cross-platform pour iOS et Android'
          }
        ],
        education: [
          {
            degree: 'Master en Génie Logiciel',
            school: 'ENSAM Casablanca',
            year: '2022'
          }
        ],
        location: 'Rabat',
        availability: '1-months'
      },
      {
        userId: users[2].id,
        firstName: 'Youssef',
        lastName: 'Alami',
        phone: '+212661234567',
        bio: 'Développeur Backend Node.js avec expertise en architecture microservices',
        skills: ['Node.js', 'Express', 'PostgreSQL', 'Docker', 'Kubernetes', 'AWS'],
        experience: [
          {
            title: 'Backend Developer',
            company: 'CloudTech',
            startDate: '2020-09-01',
            endDate: null,
            description: 'Développement d\'APIs REST et microservices'
          }
        ],
        education: [
          {
            degree: 'Ingénieur en Informatique',
            school: 'INPT Rabat',
            year: '2020'
          }
        ],
        location: 'Rabat',
        availability: '2-months'
      }
    ]);

    console.log('✅ 3 candidats créés\n');

    // ============================================
    // 3. Créer des profils recruteurs
    // ============================================
    console.log('🏢 Création des profils recruteurs...');

    const recruiters = await Recruiter.bulkCreate([
      {
        userId: users[3].id,
        companyName: 'Tech Innovators',
        description: 'Entreprise spécialisée dans le développement de solutions web et mobile innovantes. Nous accompagnons nos clients dans leur transformation digitale.',
        industry: 'IT & Software',
        companySize: '51-200',
        website: 'https://techinnovators.ma',
        location: 'Casablanca',
        phone: '+212522345678'
      },
      {
        userId: users[4].id,
        companyName: 'Digital Solutions',
        description: 'Agence digitale créative spécialisée dans le développement web, mobile et le marketing digital. Innovation et créativité au service de vos projets.',
        industry: 'Digital Marketing',
        companySize: '11-50',
        website: 'https://digitalsolutions.ma',
        location: 'Rabat',
        phone: '+212537456789'
      }
    ]);

    console.log('✅ 2 recruteurs créés\n');

    // ============================================
    // 4. Créer des offres d'emploi
    // ============================================
    console.log('💼 Création des offres d\'emploi...');

    await JobOffer.bulkCreate([
      {
        recruiterId: recruiters[0].id,
        title: 'Développeur Full Stack JavaScript',
        description: 'Nous recherchons un développeur Full Stack expérimenté pour rejoindre notre équipe dynamique.\n\nResponsabilités:\n- Développer des applications web avec React et Node.js\n- Collaborer avec l\'équipe design et produit\n- Participer aux code reviews\n- Maintenir et améliorer les applications existantes\n\nProfil recherché:\n- Minimum 2 ans d\'expérience en développement web\n- Maîtrise de JavaScript, React, Node.js\n- Connaissance de MongoDB\n- Expérience avec Git\n- Bon esprit d\'équipe',
        requiredSkills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Git'],
        contractType: 'CDI',
        location: 'Casablanca',
        salary: { min: 15000, max: 25000, currency: 'MAD' },
        isActive: true
      },
      {
        recruiterId: recruiters[0].id,
        title: 'Développeur Mobile React Native',
        description: 'Poste de développeur mobile pour créer des applications iOS et Android innovantes.\n\nMissions:\n- Développer des applications mobiles cross-platform\n- Optimiser les performances\n- Intégrer des APIs REST\n- Assurer la qualité du code\n\nProfil:\n- 3+ ans d\'expérience en React Native\n- Maîtrise de TypeScript\n- Connaissance de Redux\n- Portfolio d\'applications publiées',
        requiredSkills: ['React Native', 'TypeScript', 'Redux', 'JavaScript'],
        contractType: 'CDI',
        location: 'Casablanca',
        salary: { min: 18000, max: 28000, currency: 'MAD' },
        isActive: true
      },
      {
        recruiterId: recruiters[1].id,
        title: 'Développeur Front-End React',
        description: 'Rejoignez notre équipe créative pour développer des interfaces modernes et intuitives.\n\nVos missions:\n- Créer des interfaces utilisateurs avec React\n- Traduire les maquettes Figma en code\n- Optimiser les performances\n- Assurer la compatibilité cross-browser\n\nProfil:\n- 1-2 ans d\'expérience en React\n- Connaissance HTML5, CSS3, JavaScript\n- Maîtrise de Tailwind CSS\n- Sensibilité UI/UX',
        requiredSkills: ['React', 'JavaScript', 'HTML', 'CSS', 'Tailwind'],
        contractType: 'CDD',
        location: 'Rabat',
        salary: { min: 12000, max: 18000, currency: 'MAD' },
        isActive: true
      },
      {
        recruiterId: recruiters[1].id,
        title: 'Développeur Backend Node.js Senior',
        description: 'Développement d\'APIs et microservices performants et scalables.\n\nResponsabilités:\n- Concevoir et développer des APIs REST\n- Architecture microservices\n- Optimisation des bases de données\n- Déploiement avec Docker et Kubernetes\n- Mentoring des développeurs juniors\n\nProfil:\n- 5+ ans d\'expérience en Node.js\n- Expert en Express, PostgreSQL\n- Maîtrise de Docker et Kubernetes\n- Expérience en architecture distribuée',
        requiredSkills: ['Node.js', 'Express', 'PostgreSQL', 'Docker', 'Kubernetes'],
        contractType: 'CDI',
        location: 'Rabat',
        salary: { min: 20000, max: 30000, currency: 'MAD' },
        isActive: true
      },
      {
        recruiterId: recruiters[0].id,
        title: 'Stage Développeur Web (6 mois)',
        description: 'Stage de 6 mois pour apprendre le développement web moderne au sein d\'une équipe expérimentée.\n\nCe que vous allez apprendre:\n- Développement web avec React\n- Bonnes pratiques de programmation\n- Travail en équipe agile\n- Git et collaboration\n\nProfil:\n- Étudiant en informatique (Bac+3 minimum)\n- Bases en HTML, CSS, JavaScript\n- Motivé et curieux\n- Bon niveau d\'anglais technique',
        requiredSkills: ['HTML', 'CSS', 'JavaScript', 'React'],
        contractType: 'Stage',
        location: 'Casablanca',
        salary: { min: 3000, max: 4000, currency: 'MAD' },
        isActive: true
      },
      {
        recruiterId: recruiters[1].id,
        title: 'Développeur Flutter',
        description: 'Développeur mobile Flutter pour créer des applications performantes.\n\nMissions:\n- Développer des applications Flutter\n- Intégration d\'APIs\n- Tests unitaires et d\'intégration\n- Publication sur les stores\n\nProfil:\n- 2+ ans en Flutter/Dart\n- Connaissance Firebase\n- Expérience en déploiement',
        requiredSkills: ['Flutter', 'Dart', 'Firebase', 'Mobile'],
        contractType: 'CDI',
        location: 'Rabat',
        salary: { min: 16000, max: 24000, currency: 'MAD' },
        isActive: true
      }
    ]);

    console.log('✅ 6 offres d\'emploi créées\n');

    // ============================================
    // Résumé
    // ============================================
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🎉 Seeding terminé avec succès!\n');
    console.log('📊 Résumé:');
    console.log('   👥 5 utilisateurs');
    console.log('   👨‍💻 3 candidats');
    console.log('   🏢 2 recruteurs');
    console.log('   💼 6 offres d\'emploi\n');
    console.log('🔑 Comptes de test:');
    console.log('   📧 Candidats:');
    console.log('      • candidate1@test.com / Password123!');
    console.log('      • candidate2@test.com / Password123!');
    console.log('      • candidate3@test.com / Password123!\n');
    console.log('   📧 Recruteurs:');
    console.log('      • recruiter1@test.com / Password123!');
    console.log('      • recruiter2@test.com / Password123!\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  } catch (error) {
    console.error('❌ Erreur lors du seeding:', error);
  } finally {
    await sequelize.close();
    process.exit(0);
  }
};

// Exécuter le seeding
seed();
