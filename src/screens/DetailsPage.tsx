

import React from 'react';
import {
  StyleSheet,
  Text,
  View,

} from 'react-native';
import { useSelector } from 'react-redux';
import WrapperView from './WrapperView';

function DetailsPage(): JSX.Element {
  const details = useSelector((state: any) => state.details.details);
  return (
    <WrapperView>
      <View style={styles.container}>
        <Text style={styles.title}>Submitted Successfully!</Text>
        <Text style={styles.label}>First Name: <Text style={styles.value}>{details.firstName}</Text></Text>
        <Text style={styles.label}>Last Name: <Text style={styles.value}>{details.lastName}</Text></Text>
        <Text style={styles.label}>Email: <Text style={styles.value}>{details.email}</Text></Text>
        <Text style={styles.label}>Mobile: <Text style={styles.value}>{details.mobile}</Text></Text>
        <Text style={styles.label}>Country: <Text style={styles.value}>{details.country}</Text></Text>
      </View>
    </WrapperView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { fontSize: 24, fontWeight: 'bold', padding: 16 },
  label: { fontSize: 16, padding: 8 },
  value: { fontWeight: 'bold' }
});

export default DetailsPage;
