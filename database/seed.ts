import { db } from "./db";

export const seedParts = () => {
  // 🔹 Cek dulu biar tidak double insert
  const existing = db.getFirstSync(
    "SELECT COUNT(*) as count FROM parts"
  ) as any;

  if (existing?.count > 0) {
    console.log("Parts already seeded");
    return;
  }

  const parts = [
    // 🔵 MATIC
    ["Oli mesin", "Matic"],
    ["Oli gardan", "Matic"],
    ["V-Belt", "Matic"],
    ["Aki", "Matic"],
    ["CVT", "Matic"],

    // 🟡 MANUAL
    ["Oli mesin", "Manual"],
    ["Setelan klep", "Manual"],
    ["Kampas rem depan", "Manual"],
    ["Kampas rem belakang", "Manual"],
    ["Rantai & gear set", "Manual"],
    ["Kampas kopling otomatis (semi kopling)", "Manual"],

    // 🔴 KOPLING / SPORT
    ["Oli mesin", "Kopling"],
    ["Rantai & Gear set", "Kopling"],
    ["Kampas kopling manual", "Kopling"],
    ["Kampas rem depan", "Kopling"],
    ["Kampas rem belakang", "Kopling"],
    ["Setelan Tuas kopling", "Kopling"],
    
  ];

  parts.forEach(([name, type]) => {
    db.runSync(
      "INSERT INTO parts (name, motor_type) VALUES (?, ?)",
      [name, type]
    );
  });

  console.log("Parts seeded!");
};