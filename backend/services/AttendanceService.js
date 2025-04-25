const Jornada = require("../models/Jornada");

async function punchIn(userId) {
  const existing = await Jornada.findOne({ userId, status: "ongoing" });
  if (existing) {
    throw new Error("Ya hay una jornada iniciada");
  }

  const today = new Date();
  const jornada = await Jornada.create({
    userId,
    date: today,
    start: today,
    status: "ongoing",
  });

  return { message: "Entrada registrada", jornada };
}

async function punchOut(userId) {
  const jornada = await Jornada.findOne({ userId, status: "ongoing" });
  if (!jornada) {
    throw new Error("No hay una jornada iniciada");
  }

  const end = new Date();
  const durationMs = end - jornada.start;

  const hours = Math.floor(durationMs / (1000 * 60 * 60));
  const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((durationMs % (1000 * 60)) / 1000);

  jornada.hours = hours + minutes / 60 + seconds / 3600;

  jornada.end = end;
  jornada.status = "completed";

  await jornada.save();

  const formattedDuration = [
    String(hours).padStart(2, "0"),
    String(minutes).padStart(2, "0"),
    String(seconds).padStart(2, "0"),
  ].join(":");

  return { message: "Salida registrada", jornada, duration: formattedDuration };
}

async function getHistory(userId) {
  return Jornada.find({ userId }).sort({ date: -1 }).lean();
}

async function getSummary(userId) {
  const all = await Jornada.find({ userId, status: "completed" }).lean();

  const secondsPerDay = all.reduce((acc, j) => {
    const day = j.date.toISOString().slice(0, 10);
    const durationMs = new Date(j.end) - new Date(j.start);
    const secs = Math.floor(durationMs / 1000);
    acc[day] = (acc[day] || 0) + secs;
    return acc;
  }, {});

  const summary = {};
  for (const [day, secs] of Object.entries(secondsPerDay)) {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    summary[day] =
      String(h).padStart(2, "0") +
      ":" +
      String(m).padStart(2, "0") +
      ":" +
      String(s).padStart(2, "0");
  }

  return summary;
}

module.exports = { punchIn, punchOut, getHistory, getSummary };
