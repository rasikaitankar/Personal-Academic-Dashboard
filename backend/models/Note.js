router.post('/notes', (req, res) => {
  console.log("🔥 Incoming request:", req.body);

  const note = req.body.note;
  let name = req.body.name;

  if (!note) {
    return res.status(400).json({ error: "Note is required" });
  }

  if (!name || name.trim() === "") {
    name = "Anonymous";
  }

  db.run(
    "INSERT INTO notes (name, note) VALUES (?, ?)",
    [name, note],
    function (err) {
      if (err) {
        console.error("❌ DB ERROR:", err);
        return res.status(500).json({ error: err.message });
      }

      console.log("✅ Note inserted");
      res.json({ success: true });
    }
  );
});