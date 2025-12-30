import React, { useState } from 'react';
import { Mail, ArrowRight, MapPin, AlertCircle, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Contact: React.FC = () => {
  const { t } = useLanguage();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    let isValid = true;
    const newErrors = { name: '', email: '', message: '' };

    if (!formData.name.trim()) {
      newErrors.name = t.contact.form.errors.nameReq;
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = t.contact.form.errors.emailReq;
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t.contact.form.errors.emailInv;
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = t.contact.form.errors.msgReq;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // Simulate API call
      setTimeout(() => {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        // Reset success message after 5 seconds
        setTimeout(() => setIsSubmitted(false), 5000);
      }, 500);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <footer id="contact" className="py-24 bg-black relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-5xl md:text-7xl font-bold mb-8">{t.contact.titlePre} <span className="text-brand-bronze">{t.contact.titleHighlight}</span></h2>
            <p className="text-xl text-gray-400 mb-12 max-w-md">
              {t.contact.subtitle}
            </p>
            
            <div className="flex flex-col gap-6">
              <a href="mailto:hello@revorgs.com" className="flex items-center gap-4 text-2xl hover:text-brand-bronze transition-colors group">
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-brand-bronze group-hover:border-brand-bronze transition-all">
                  <Mail size={20} />
                </div>
                hello@revorgs.com
              </a>
              <div className="flex items-center gap-4 text-xl text-gray-400">
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
                  <MapPin size={20} />
                </div>
                San Francisco, CA
              </div>
            </div>
          </div>

          <div className="bg-brand-charcoal p-8 md:p-12 rounded-3xl border border-white/5 min-h-[500px] flex flex-col justify-center">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center text-center animate-fade-in">
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 mb-6">
                  <CheckCircle size={40} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{t.contact.form.successTitle}</h3>
                <p className="text-gray-400 max-w-xs">{t.contact.form.successText}</p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="mt-8 px-6 py-2 bg-white/5 hover:bg-white/10 rounded-full text-sm font-medium transition-colors"
                >
                  {t.contact.form.sendAgain}
                </button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">{t.contact.form.name}</label>
                  <input 
                    id="name"
                    name="name"
                    type="text" 
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full bg-black/30 border rounded-lg p-4 text-white focus:outline-none transition-all duration-300 ${
                      errors.name 
                        ? 'border-red-500/50 focus:border-red-500' 
                        : 'border-white/10 focus:border-brand-bronze'
                    }`}
                    placeholder={t.contact.form.namePh}
                  />
                  {errors.name && (
                    <div className="flex items-center gap-1 mt-2 text-red-500 text-sm animate-fade-in-up">
                      <AlertCircle size={14} />
                      <span>{errors.name}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">{t.contact.form.email}</label>
                  <input 
                    id="email"
                    name="email"
                    type="email" 
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full bg-black/30 border rounded-lg p-4 text-white focus:outline-none transition-all duration-300 ${
                      errors.email 
                        ? 'border-red-500/50 focus:border-red-500' 
                        : 'border-white/10 focus:border-brand-bronze'
                    }`}
                    placeholder={t.contact.form.emailPh} 
                  />
                  {errors.email && (
                    <div className="flex items-center gap-1 mt-2 text-red-500 text-sm animate-fade-in-up">
                      <AlertCircle size={14} />
                      <span>{errors.email}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">{t.contact.form.message}</label>
                  <textarea 
                    id="message"
                    name="message"
                    rows={4} 
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full bg-black/30 border rounded-lg p-4 text-white focus:outline-none transition-all duration-300 ${
                      errors.message 
                        ? 'border-red-500/50 focus:border-red-500' 
                        : 'border-white/10 focus:border-brand-bronze'
                    }`}
                    placeholder={t.contact.form.messagePh} 
                  />
                  {errors.message && (
                    <div className="flex items-center gap-1 mt-2 text-red-500 text-sm animate-fade-in-up">
                      <AlertCircle size={14} />
                      <span>{errors.message}</span>
                    </div>
                  )}
                </div>

                <button 
                  type="submit"
                  className="w-full bg-brand-bronze text-white font-bold py-4 rounded-lg hover:bg-amber-700 transition-colors flex items-center justify-center gap-2 group"
                >
                  {t.contact.form.submit} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; 2024 RevOrgs Studio. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;