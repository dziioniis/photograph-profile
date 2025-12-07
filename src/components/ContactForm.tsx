'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const FormContainer = styled(motion.form)`
  max-width: 600px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
`;

const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-family: ${({ theme }) => theme.fonts.primary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  transition: border-color ${({ theme }) => theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-family: ${({ theme }) => theme.fonts.primary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  min-height: 150px;
  resize: vertical;
  transition: border-color ${({ theme }) => theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.background};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border-radius: ${({ theme }) => theme.borderRadius.base};
  transition: all ${({ theme }) => theme.transitions.base};

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.textLight};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Message = styled.div<{ $type: 'success' | 'error' }>`
  padding: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  background-color: ${({ $type }) => ($type === 'success' ? '#d4edda' : '#f8d7da')};
  color: ${({ $type }) => ($type === 'success' ? '#155724' : '#721c24')};
  border: 1px solid ${({ $type }) => ($type === 'success' ? '#c3e6cb' : '#f5c6cb')};
`;

export default function ContactForm() {
  const t = useTranslations('contact.form');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        eventType: '',
        eventDate: '',
        message: '',
      });
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <FormContainer
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {status === 'success' && (
        <Message $type="success">{t('success')}</Message>
      )}

      {status === 'error' && <Message $type="error">{t('error')}</Message>}

      <FormGroup>
        <Label htmlFor="name">{t('name')} *</Label>
        <Input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="email">{t('email')} *</Label>
        <Input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="phone">{t('phone')}</Label>
        <Input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="eventType">{t('eventType')}</Label>
        <Input
          type="text"
          id="eventType"
          name="eventType"
          placeholder={t('placeholder.eventType')}
          value={formData.eventType}
          onChange={handleChange}
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="eventDate">{t('eventDate')}</Label>
        <Input
          type="date"
          id="eventDate"
          name="eventDate"
          value={formData.eventDate}
          onChange={handleChange}
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="message">{t('message')} *</Label>
        <TextArea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        />
      </FormGroup>

      <SubmitButton type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? t('sending') : t('submit')}
      </SubmitButton>
    </FormContainer>
  );
}
