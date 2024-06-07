const { Router } = require("express");
const router = Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create
router.post("/inchirieriPost", async (req, res) => {
  try {
    const { perioada, pret_inchiriere, idClient } = req.body;
    const inchiriere = await prisma.inchirieri.create({
      data: {
        perioada: perioada,
        pret_inchiriere: pret_inchiriere,
        idClient: idClient,
      },
    });
    res.status(201).json(inchiriere);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Read
router.get("/inchirieriGet", async (req, res) => {
  try {
    const inchirieri = await prisma.inchirieri.findMany();
    res.status(200).json(inchirieri);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update
router.put("/inchirieriUpdate/:id", async (req, res) => {
  try {
    const inchiriereId = req.params.id;
    const { perioada, pret_inchiriere } = req.body;
    const updatedInchiriere = await prisma.inchirieri.update({
      where: {
        id: inchiriereId,
      },
      data: {
        perioada: perioada,
        pret_inchiriere: pret_inchiriere,
      },
    });
    res.status(200).json(updatedInchiriere);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete
router.delete("/inchirieriDelete/:id", async (req, res) => {
  try {
    const inchiriereId = req.params.id;
    await prisma.inchirieri.delete({
      where: {
        id: inchiriereId,
      },
    });
    res.status(200).json({ message: "Inchiriere deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
