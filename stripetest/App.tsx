import React, {useState} from 'react';
import {SafeAreaView, Text, Button, View, StyleSheet} from 'react-native';

import ElementsExample from './Elements';
import {API_URL} from './Constants';

type Mode =
  | 'PaymentSheet'
  | 'FuturePayments'
  | 'Elements'
  | 'PaymentSheetSubscription'
  | null;

const App = () => {
  const [key, setKey] = React.useState('');
  const [mode, setMode] = useState<Mode>(null);

  React.useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${API_URL}/stripe-key`);
        const {publishableKey} = await response.json();
        setKey(publishableKey);
      } catch (e) {
        throw new Error(
          'Unable to fetch publishable key. Is your server running?',
        );
      }
    })();
  });

  switch (mode) {
    case 'Elements':
      return (
        <ElementsExample
          publishableKey={key}
          goBack={() => {
            setMode(null);
          }}
        />
      );
    default:
      return (
        <SafeAreaView style={styles.container}>
          <Text style={styles.center}>Welcome to stripe payment gateway</Text>
          <View style={styles.buttonsContainer}>
            <Button
              title="Example"
              onPress={() => {
                setMode('Elements');
              }}
            />
          </View>
        </SafeAreaView>
      );
  }
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    flex: 1,
    justifyContent: 'space-around',
    width: '80%',
  },
  center: {
    fontSize: 20,
    textAlign: 'center',
  },
  buttonsContainer: {
    alignSelf: 'center',
    justifyContent: 'space-around',
    width: '80%',
    height: '50%',
  },
});

export default App;
