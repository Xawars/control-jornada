const {
  punchIn,
  punchOut,
  getHistory,
  getSummary,
} = require("../services/AttendanceService");

const FORMAT_OPTIONS = {
  timeZone: "America/Bogota",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
};

exports.punchIn = async (req, res, next) => {
  try {
    const { message, jornada } = await punchIn(req.user.id);
    const j = jornada.toObject();
    j.date = j.date.toLocaleString("es-CO", FORMAT_OPTIONS);
    j.start = j.start.toLocaleString("es-CO", FORMAT_OPTIONS);
    res.status(201).json({ message, jornada: j });
  } catch (err) {
    next(err);
  }
};

exports.punchOut = async (req, res, next) => {
  try {
    const { message, jornada, duration } = await punchOut(req.user.id);
    const j = jornada.toObject();
    j.date = j.date.toLocaleString("es-CO", FORMAT_OPTIONS);
    j.start = j.start.toLocaleString("es-CO", FORMAT_OPTIONS);
    j.end = j.end.toLocaleString("es-CO", FORMAT_OPTIONS);
    res.json({ message, jornada: j, duration });
  } catch (err) {
    next(err);
  }
};

exports.getHistory = async (req, res, next) => {
  try {
    const history = await getHistory(req.user.id);
    const formatted = history.map((j) => ({
      ...j,
      date: j.date.toLocaleString("es-CO", FORMAT_OPTIONS),
      start: j.start.toLocaleString("es-CO", FORMAT_OPTIONS),
      end: j.end ? j.end.toLocaleString("es-CO", FORMAT_OPTIONS) : null,
    }));
    res.json({ history: formatted });
  } catch (err) {
    next(err);
  }
};

exports.getSummary = async (req, res, next) => {
  try {
    const summary = await getSummary(req.user.id);
    res.json({ summary });
  } catch (err) {
    next(err);
  }
};
