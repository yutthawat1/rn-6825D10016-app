import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';

function calcFare(km: number, trafficMin: number): number {
  if (km <= 0) return 0;

  let fare = 35;
  let remaining = km - 1;

  const tiers: { limit: number; rate: number }[] = [
    { limit: 9,        rate: 6.5  }, // กม.ที่ 2-10
    { limit: 10,       rate: 7.0  }, // กม.ที่ 11-20
    { limit: 20,       rate: 8.0  }, // กม.ที่ 21-40
    { limit: 20,       rate: 8.5  }, // กม.ที่ 41-60
    { limit: 20,       rate: 9.0  }, // กม.ที่ 61-80
    { limit: Infinity, rate: 10.5 }, // กม.ที่ 81 ขึ้นไป
  ];

  for (const tier of tiers) {
    if (remaining <= 0) break;
    const used = Math.min(remaining, tier.limit);
    fare += used * tier.rate;
    remaining -= used;
  }

  fare += trafficMin * 3;

  return fare;
}

export default function TaxiFare() {
  const [distance, setDistance] = useState('');
  const [traffic, setTraffic] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [distError, setDistError] = useState('');
  const [trafficError, setTrafficError] = useState('');

  const validate = (): boolean => {
    let valid = true;

    const dist = parseFloat(distance);
    if (!distance || isNaN(dist) || dist <= 0) {
      setDistError('กรุณากรอกระยะทางที่ถูกต้อง (มากกว่า 0)');
      valid = false;
    } else {
      setDistError('');
    }

    const traf = parseFloat(traffic);
    if (!traffic || isNaN(traf) || traf < 0) {
      setTrafficError('กรุณากรอกเวลารถติดที่ถูกต้อง (ไม่ติดลบ)');
      valid = false;
    } else {
      setTrafficError('');
    }

    return valid;
  };

  const handleCalculate = () => {
    if (!validate()) return;
    const fare = calcFare(parseFloat(distance), parseFloat(traffic));
    setResult(fare);
  };

  const handleCancel = () => {
    setDistance('');
    setTraffic('');
    setResult(null);
    setDistError('');
    setTrafficError('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Taxi Fare</Text>
      </View>
      <View style={styles.iconContainer}>
        <Text style={styles.taxiEmoji}>🚕</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.titleTh}>คำนวณค่าโดยสารแท็กซี่</Text>

        <View style={styles.fieldWrap}>
          <Text style={styles.label}>ระยะทาง (กิโลเมตร) 🗺️</Text>
          <TextInput
            style={[styles.input, distError ? styles.inputError : null]}
            placeholder="กรุณากรอกระยะทาง"
            keyboardType="decimal-pad"
            value={distance}
            onChangeText={setDistance}
          />
          {distError ? <Text style={styles.errorMsg}>{distError}</Text> : null}
        </View>

        <View style={styles.fieldWrap}>
          <Text style={styles.label}>เวลารถติด (นาที) ⏰</Text>
          <TextInput
            style={[styles.input, trafficError ? styles.inputError : null]}
            placeholder="กรุณากรอกเวลารถติด"
            keyboardType="numeric"
            value={traffic}
            onChangeText={setTraffic}
          />
          {trafficError ? <Text style={styles.errorMsg}>{trafficError}</Text> : null}
        </View>

        <TouchableOpacity style={styles.btnCalc} onPress={handleCalculate}>
          <Text style={styles.btnText}>คำนวณค่าโดยสาร</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnCancel} onPress={handleCancel}>
          <Text style={styles.btnText}>ยกเลิก</Text>
        </TouchableOpacity>

        <View style={styles.resultBox}>
          <Text style={styles.resultLabel}>ค่าโดยสารแท็กซี่</Text>
          <Text style={styles.resultAmount}>
            {result !== null ? result.toFixed(2) : '0.00'}
          </Text>
          <Text style={styles.resultUnit}>บาท</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const YELLOW = '#F5A623';
const GRAY = '#888888';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    backgroundColor: YELLOW,
    paddingVertical: 16,
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  iconContainer: {
    paddingVertical: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%',
  },
  taxiEmoji: {
    fontSize: 80,
  },
  card: {
    backgroundColor: '#fff',
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 28,
  },
  titleTh: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
    textAlign: 'center',
    marginBottom: 20,
  },
  fieldWrap: {
    marginBottom: 14,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    backgroundColor: '#fafafa',
    color: '#333',
  },
  inputError: {
    borderColor: '#e53935',
    backgroundColor: '#fff5f5',
  },
  errorMsg: {
    color: '#e53935',
    fontSize: 12,
    marginTop: 4,
  },
  btnCalc: {
    backgroundColor: YELLOW,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 10,
  },
  btnCancel: {
    backgroundColor: GRAY,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 16,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  resultBox: {
    backgroundColor: '#FFF8E7',
    borderWidth: 1.5,
    borderColor: YELLOW,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  resultLabel: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  resultAmount: {
    fontSize: 40,
    fontWeight: '700',
    color: YELLOW,
    lineHeight: 48,
  },
  resultUnit: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
  },
});
