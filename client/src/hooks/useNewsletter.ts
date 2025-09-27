import { useState, useEffect } from 'react';
import { Account } from '@/api/account.api';
import { useUser } from './user.hook';

interface NewsletterPreferences {
  promotional: boolean;
  orderUpdates: boolean;
  newProducts: boolean;
  exclusiveOffers: boolean;
  securityAlerts: boolean;
}

interface NewsletterData {
  id: number;
  email: string;
  preferences: NewsletterPreferences;
}

export function useNewsletter() {
  const [preferences, setPreferences] = useState<NewsletterPreferences>({
    promotional: true,
    orderUpdates: true,
    newProducts: false,
    exclusiveOffers: true,
    securityAlerts: true,
  });
  const [userEmail, setUserEmail] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();

  const fetchPreferences = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data: NewsletterData = await Account.getNewsletterPreferences();
      setPreferences(data.preferences);
      setUserEmail(data.email);
    } catch (err) {
      setError('Erro ao carregar preferências');
      console.error('Erro ao buscar preferências:', err);
    } finally {
      setLoading(false);
    }
  };

  const updatePreferences = async (newPreferences: NewsletterPreferences) => {
    if (!user) return;

    try {
      setSaving(true);
      setError(null);
      const data: NewsletterData = await Account.updateNewsletterPreferences(newPreferences);
      setPreferences(data.preferences);
      setUserEmail(data.email);
    } catch (err) {
      setError('Erro ao salvar preferências');
      console.error('Erro ao atualizar preferências:', err);
      throw err;
    } finally {
      setSaving(false);
    }
  };

  const updatePreference = (key: keyof NewsletterPreferences, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const setPreferencesState = (newPreferences: NewsletterPreferences) => {
    setPreferences(newPreferences);
  };

  useEffect(() => {
    fetchPreferences();
  }, [user]);

  return {
    preferences,
    userEmail,
    loading,
    saving,
    error,
    updatePreferences,
    updatePreference,
    setPreferences: setPreferencesState,
    refetch: fetchPreferences,
  };
}
