import { db } from "./db";

export const seedParts = () => {
  const existing = db.getFirstSync(
    "SELECT COUNT(*) as count FROM parts",
  ) as any;

  if (existing?.count > 0) {
    console.log("Parts already seeded");
    return;
  }

  const parts = [
    ["Oli mesin", "Matic", 2000],
    ["Oli gardan", "Matic", 8000],
    ["V-Belt", "Matic", 25000],
    ["Aki", "Matic", 20000],
    ["CVT", "Matic", 10000],

    ["Oli mesin", "Manual", 2000],
    ["Setelan klep", "Manual", 10000],
    ["Kampas rem depan", "Manual", 15000],
    ["Kampas rem belakang", "Manual", 15000],
    ["Rantai & gear set", "Manual", 20000],

    ["Oli mesin", "Kopling", 2000],
    ["Rantai & Gear set", "Kopling", 20000],
    ["Kampas kopling manual", "Kopling", 25000],
  ];

  parts.forEach(([name, type, interval]) => {
    db.runSync(
      "INSERT INTO parts (name, motor_type, interval_km) VALUES (?, ?, ?)",
      [name, type, interval],
    );
  });

  console.log("Parts seeded!");
};
