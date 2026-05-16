import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import TaxiFare from "./taxi_fare";

export default function Index() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // หน้ารีโหลด
    const timer = setTimeout(() => setReady(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (ready) return <TaxiFare />;

  return (
    <View style={styles.container}>
      {/* Taxi Icon */}
      <Image
        source={require("../../assets/images/taxi.png")}
        style={styles.taxiImg}
      />

      {/* Title */}
      <Text style={styles.title}>Taxi Fare Calculator</Text>
      <Text style={styles.subtitle}>คำนวณค่าโดยสารแท็กซี่</Text>

      {/* Loading Spinner */}
      <ActivityIndicator size="small" color="#32cd32" style={styles.spinner} />

      {/* Profile Section */}
      <View style={styles.profileWrap}>
        {/* ใส่รูปฮุฮิ */}
        <Image
          source={require("../../assets/images/me.jpg")}
          style={styles.avatar}
        />
        <Text style={styles.profileName}>ยุทธวัฒน์ ทองไว</Text>
        <Text style={styles.profileId}>6852D10016</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e0fde0",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 40,
  },
  taxiImg: {
    width: 110,
    height: 110,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#4A90D9",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: "#888",
    marginBottom: 24,
  },
  spinner: {
    marginBottom: 60,
  },
  profileWrap: {
    alignItems: "center",
    position: "absolute",
    bottom: 40,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginBottom: 8,
    backgroundColor: "#ddd",
  },
  profileName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  profileId: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
  },
});
