import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Button } from '../components/ui/button';
import { HelpCircle, Phone, Mail, Clock } from 'lucide-react';
import { faqData } from '../mock';
import { Link } from 'react-router-dom';

const FAQ = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-[#e60028] to-[#c00020] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <HelpCircle className="text-white" size={32} />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Questions fréquentes
          </h1>
          <p className="text-lg text-gray-600">
            Trouvez rapidement les réponses à vos questions sur la mise à jour Secur'Pass
          </p>
        </div>

        {/* FAQ Accordion */}
        <Card className="shadow-xl border-none mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900">Questions les plus fréquentes</CardTitle>
            <CardDescription>Cliquez sur une question pour voir la réponse</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqData.map((faq) => (
                <AccordionItem key={faq.id} value={`item-${faq.id}`}>
                  <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-[#e60028]">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-lg border-none hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-[#e60028]/10 rounded-lg flex items-center justify-center mb-3">
                <Phone className="text-[#e60028]" size={24} />
              </div>
              <CardTitle className="text-lg text-[#002855]">Par téléphone</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-2">Appelez-nous au</p>
              <p className="text-2xl font-bold text-gray-900">09 69 39 00 00</p>
              <p className="text-sm text-gray-500 mt-2">Appel non surtaxé</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-none hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-[#e60028]/10 rounded-lg flex items-center justify-center mb-3">
                <Mail className="text-[#e60028]" size={24} />
              </div>
              <CardTitle className="text-lg text-[#002855]">Par email</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-2">Écrivez-nous à</p>
              <p className="text-lg font-semibold text-gray-900 break-all">support@securipass.fr</p>
              <p className="text-sm text-gray-500 mt-2">Réponse sous 24h</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-none hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-[#e60028]/10 rounded-lg flex items-center justify-center mb-3">
                <Clock className="text-[#e60028]" size={24} />
              </div>
              <CardTitle className="text-lg text-[#002855]">Horaires</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-2">Service disponible</p>
              <p className="text-lg font-semibold text-gray-900">24h/24, 7j/7</p>
              <p className="text-sm text-gray-500 mt-2">Assistance continue</p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Alert */}
        <Alert className="border-[#e60028] bg-[#e60028]/5">
          <AlertDescription className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-gray-900 font-medium">
              Vous n'avez pas trouvé de réponse ? Commencez votre mise à jour maintenant.
            </span>
            <Button
              asChild
              className="bg-[#e60028] hover:bg-[#c00020] text-white font-semibold whitespace-nowrap"
            >
              <Link to="/login">Mettre à jour</Link>
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
};

export default FAQ;
