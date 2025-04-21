import React, { useState, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { api } from '../api';
import Modal from './PopUp';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from "react-i18next";

const Contact: React.FC = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({ username: '', gmail: '', comment: '' });
    const [verificationCode, setVerificationCode] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [formError, setFormError] = useState<string | null>(null);
    const verificationInputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const contactMutation = useMutation({
        mutationFn: (data: typeof formData) => api.post('/contacts/', data),
        onSuccess: () => {
            setIsModalOpen(true);
            setErrorMessage(null);
            setFormError(null);
        },
        onError: () => setErrorMessage(t('contact.wrong_code')),
    });

    const verificationMutation = useMutation({
        mutationFn: (data: { gmail: string; verification_code: string }) =>
            api.post('/contacts/verify-email/', data),
        onSuccess: () => {
            setIsModalOpen(false);
            setVerificationCode('');
            setErrorMessage(null);
            toast.success(t('contact.send_success'), {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: true,
                theme: "light",
            });
        },
        onError: () => setErrorMessage(t('contact.wrong_code')),
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.username || !formData.gmail || !formData.comment) {
            setFormError(t('contact.fill_fields'));
            return;
        }
        setFormError(null);
        contactMutation.mutate(formData);
    };

    const handleVerificationSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        verificationMutation.mutate({ gmail: formData.gmail, verification_code: verificationCode });
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setFormData({ username: '', gmail: '', comment: '' });
        setVerificationCode('');
        setErrorMessage(null);
    };

    return (
        <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4 py-10" id="contact">
            <ToastContainer />
            <div className="max-w-5xl w-full bg-white shadow-xl rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Info Block */}
                <div className="bg-blue-600 text-white p-8 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold mb-4">{t("titles.contact_us")}</h2>
                    <p className="text-blue-100 mb-6">{t("contact.c_information")}</p>
                    <ul className="space-y-4 text-blue-50 text-lg">
                        <li><strong>{t("contact.address")}:</strong> Gyrat Market</li>
                        <li><strong>{t("contact.phone")}:</strong> +99361983821</li>
                        <li><strong>{t("contact.gmail")}:</strong> gyratmarket@gmail.com</li>
                    </ul>
                </div>

                {/* Right Form Block */}
                <div className="p-8">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">{t("contact.send_message_title")}</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {formError && <p className="text-red-500 text-sm">{formError}</p>}
                        <input
                            type="text"
                            id="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder={t("contact.p_name")}
                        />
                        <input
                            type="email"
                            id="gmail"
                            value={formData.gmail}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder={t("contact.p_gmail")}
                        />
                        <textarea
                            id="comment"
                            value={formData.comment}
                            onChange={handleInputChange}
                            rows={4}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder={t("contact.p_message")}
                        ></textarea>
                        {contactMutation.isError && (
                            <p className="text-red-500 text-sm">{errorMessage}</p>
                        )}
                        <button
                            type="submit"
                            disabled={contactMutation.isPending}
                            className={`w-full py-3 rounded-md font-bold text-white transition duration-200 ${
                                contactMutation.isPending ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                        >
                            {contactMutation.isPending ? t("contact.sending") : t("contact.send")}
                        </button>
                    </form>
                </div>
            </div>

            {/* Verification Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                hasError={verificationMutation.isError}
                isPending={verificationMutation.isPending}
                inputRef={verificationInputRef}
            >
                <h2 className="text-xl font-semibold mb-4 text-center">{t("contact.verify_gmail")}</h2>
                <form onSubmit={handleVerificationSubmit} className="space-y-4">
                    <input
                        type="text"
                        id="verificationCode"
                        ref={verificationInputRef}
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Your Verification Code"
                    />
                    {verificationMutation.isError && (
                        <p className="text-red-500 text-sm">{errorMessage}</p>
                    )}
                    <button
                        type="submit"
                        disabled={verificationMutation.isPending}
                        className={`w-full py-3 rounded-md font-bold text-white transition duration-200 ${
                            verificationMutation.isPending ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                    >
                        {verificationMutation.isPending ? t("contact.verifying_gmail") : t("contact.verify_gmail")}
                    </button>
                </form>
            </Modal>
        </section>
    );
};

export default Contact;
