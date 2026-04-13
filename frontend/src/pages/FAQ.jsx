import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Phone, Mail } from 'lucide-react';

const faqData = [
  {
    question: "Pourquoi dois-je mettre à jour mon Certicode Plus ?",
    answer: "Pour renforcer la sécurité de votre compte et vous protéger contre les menaces numériques évolutives. Cette mise à jour intègre les dernières technologies de sécurité bancaire."
  },
  {
    question: "Quels sont les critères pour un Certicode Plus sécurisé ?",
    answer: "Votre nouveau Certicode Plus doit être activé via l'application mobile La Banque Postale. Assurez-vous que votre numéro de téléphone est à jour."
  },
  {
    question: "Que faire si j'ai oublié mon mot de passe ?",
    answer: "Utilisez l'option \"Identifiant / Mot de passe oublié\" sur la page de connexion. Vous recevrez un lien de réinitialisation par email ou SMS."
  },
  {
    question: "La mise à jour est-elle obligatoire ?",
    answer: "Oui, pour garantir la sécurité de tous nos clients, cette mise à jour est obligatoire. Après la date limite, l'accès sans Certicode Plus activé ne sera plus possible pour les opérations sensibles."
  },
  {
    question: "Combien de temps prend la mise à jour ?",
    answer: "La procédure complète prend généralement moins de 5 minutes. Assurez-vous d'avoir vos informations d'identification à portée de main."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4" data-testid="faq-page">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Aide et questions fréquentes</h1>
          <p className="text-gray-600">Trouvez rapidement les réponses à vos questions sur Certicode Plus</p>
        </div>

        <div className="space-y-3 mb-10">
          {faqData.map((item, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                data-testid={`faq-item-${index}`}
              >
                <span className="font-semibold text-gray-900 pr-4">{item.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="text-[#003DA5] flex-shrink-0" size={20} />
                ) : (
                  <ChevronDown className="text-gray-400 flex-shrink-0" size={20} />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Besoin d'aide supplémentaire ?</h3>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <div className="flex items-center gap-3">
              <Phone className="text-[#003DA5]" size={20} />
              <p className="text-lg font-semibold text-gray-900">09 69 39 99 98</p>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="text-[#003DA5]" size={20} />
              <p className="text-lg font-semibold text-gray-900 break-all">support@labanquepostale.fr</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
