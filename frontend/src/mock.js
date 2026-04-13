// Mock data for Secur'Pass application

export const mockUsers = [
  {
    id: '1',
    clientNumber: '12345678',
    lastName: 'Dupont',
    dateOfBirth: '1985-03-15',
    currentPassword: 'Password123!',
    email: 'jean.dupont@email.fr'
  },
  {
    id: '2',
    clientNumber: '87654321',
    lastName: 'Martin',
    dateOfBirth: '1990-07-22',
    currentPassword: 'Secure2024!',
    email: 'marie.martin@email.fr'
  }
];

export const securityFeatures = [
  {
    id: 1,
    title: 'Cryptage renforcé',
    description: 'Vos données sont protégées par un cryptage de niveau bancaire.',
    icon: 'shield-check'
  },
  {
    id: 2,
    title: 'Authentification à deux facteurs',
    description: 'Double vérification pour une sécurité maximale de votre compte.',
    icon: 'smartphone'
  },
  {
    id: 3,
    title: 'Détection des menaces',
    description: 'Surveillance continue pour identifier toute activité suspecte.',
    icon: 'eye'
  },
  {
    id: 4,
    title: 'Notifications en temps réel',
    description: 'Alertes instantanées pour toute modification de sécurité.',
    icon: 'bell'
  }
];

export const updateSteps = [
  {
    id: 1,
    title: 'Authentification',
    description: 'Connectez-vous avec vos identifiants actuels',
    status: 'completed'
  },
  {
    id: 2,
    title: 'Vérification',
    description: 'Confirmez votre identité avec vos informations personnelles',
    status: 'current'
  },
  {
    id: 3,
    title: 'Nouveau Secur\'Pass',
    description: 'Créez votre nouveau mot de passe sécurisé',
    status: 'pending'
  },
  {
    id: 4,
    title: 'Confirmation',
    description: 'Validation et activation de votre nouveau Secur\'Pass',
    status: 'pending'
  }
];

export const faqData = [
  {
    id: 1,
    question: 'Pourquoi dois-je mettre à jour mon Secur\'Pass ?',
    answer: 'Pour renforcer la sécurité de votre compte et vous protéger contre les menaces numériques évolutives. Cette mise à jour intègre les dernières technologies de sécurité bancaire.'
  },
  {
    id: 2,
    question: 'Quels sont les critères pour un Secur\'Pass sécurisé ?',
    answer: 'Votre nouveau Secur\'Pass doit contenir au moins 12 caractères, incluant des majuscules, minuscules, chiffres et caractères spéciaux. Évitez les informations personnelles facilement identifiables.'
  },
  {
    id: 3,
    question: "Que faire si j'ai oublié mon ancien Secur'Pass ?",
    answer: 'Utilisez l\'option "Code secret oublié" sur la page de connexion. Vous recevrez un lien de réinitialisation par email ou SMS selon vos préférences.'
  },
  {
    id: 4,
    question: 'La mise à jour est-elle obligatoire ?',
    answer: 'Oui, pour garantir la sécurité de tous nos clients, cette mise à jour est obligatoire avant le 31 décembre 2025. Après cette date, l\'accès avec l\'ancien Secur\'Pass ne sera plus possible.'
  },
  {
    id: 5,
    question: 'Combien de temps prend la mise à jour ?',
    answer: 'La procédure complète prend généralement moins de 5 minutes. Assurez-vous d\'avoir vos informations d\'identification à portée de main.'
  }
];

export const advantagesData = [
  {
    id: 1,
    title: 'Sécurité renforcée',
    description: 'Protection maximale contre les cybermenaces grâce aux technologies de pointe',
    icon: 'lock-keyhole'
  },
  {
    id: 2,
    title: 'Simplicité d\'utilisation',
    description: 'Interface intuitive pour une mise à jour rapide et sans complications',
    icon: 'mouse-pointer-click'
  },
  {
    id: 3,
    title: 'Accompagnement personnalisé',
    description: 'Nos conseillers sont disponibles pour vous aider à chaque étape',
    icon: 'headset'
  }
];

// Mock authentication function
export const authenticateUser = (clientNumber, lastName, dateOfBirth) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockUsers.find(
        u => u.clientNumber === clientNumber && 
             u.lastName.toLowerCase() === lastName.toLowerCase() &&
             u.dateOfBirth === dateOfBirth
      );
      
      if (user) {
        resolve({
          success: true,
          user: {
            id: user.id,
            clientNumber: user.clientNumber,
            email: user.email
          }
        });
      } else {
        reject({
          success: false,
          message: 'Identifiants incorrects. Veuillez vérifier vos informations.'
        });
      }
    }, 1000);
  });
};

// Mock password update function
export const updatePassword = (userId, oldPassword, newPassword) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockUsers.find(u => u.id === userId);
      
      if (!user) {
        reject({
          success: false,
          message: 'Utilisateur non trouvé.'
        });
        return;
      }
      
      if (user.currentPassword !== oldPassword) {
        reject({
          success: false,
          message: 'Ancien mot de passe incorrect.'
        });
        return;
      }
      
      // Update password in mock data
      user.currentPassword = newPassword;
      
      resolve({
        success: true,
        message: 'Votre Secur\'Pass a été mis à jour avec succès.'
      });
    }, 1500);
  });
};
