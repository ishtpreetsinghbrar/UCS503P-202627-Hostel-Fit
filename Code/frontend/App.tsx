import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

const apiBaseUrl = process.env.EXPO_PUBLIC_API_BASE_URL ?? 'http://localhost:4000/api';

type HealthResponse = {
  service: string;
  status: 'ok';
  timestamp: string;
};

export default function App() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const checkApiHealth = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch(`${apiBaseUrl}/health`);

      if (!response.ok) {
        throw new Error(`The API responded with status ${response.status}.`);
      }

      const payload = (await response.json()) as HealthResponse;
      setHealth(payload);
    } catch {
      setHealth(null);
      setErrorMessage('Unable to reach the HostelFit API. Check the API URL and server status.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void checkApiHealth();
  }, [checkApiHealth]);

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="light" />
      <View style={styles.content}>
        <Text style={styles.eyebrow}>HOSTELFIT</Text>
        <Text style={styles.title}>Project foundation is ready.</Text>
        <Text style={styles.description}>
          This screen verifies that the Expo mobile app can communicate with the HostelFit API.
        </Text>

        <View style={styles.statusCard}>
          {isLoading ? (
            <ActivityIndicator color="#29DDDA" />
          ) : (
            <Text style={styles.statusText}>{health ? 'API connected' : 'API unavailable'}</Text>
          )}
          {!isLoading && health ? (
            <Text style={styles.detail}>{health.service} is healthy.</Text>
          ) : null}
          {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={() => void checkApiHealth()}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Check connection again</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#16FFBB',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  buttonText: {
    color: '#0A081B',
    fontSize: 16,
    fontWeight: '700',
  },
  content: {
    flex: 1,
    gap: 20,
    justifyContent: 'center',
    padding: 24,
  },
  description: {
    color: '#C7D1DD',
    fontSize: 16,
    lineHeight: 24,
  },
  detail: {
    color: '#C7D1DD',
    fontSize: 15,
  },
  error: {
    color: '#FFB4AB',
    fontSize: 14,
    lineHeight: 20,
  },
  eyebrow: {
    color: '#29DDDA',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 2,
  },
  screen: {
    backgroundColor: '#0A081B',
    flex: 1,
  },
  statusCard: {
    backgroundColor: '#15132A',
    borderColor: '#2B3354',
    borderRadius: 16,
    borderWidth: 1,
    gap: 8,
    minHeight: 118,
    justifyContent: 'center',
    padding: 20,
  },
  statusText: {
    color: '#F0FCFF',
    fontSize: 18,
    fontWeight: '700',
  },
  title: {
    color: '#F0FCFF',
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 39,
  },
});
