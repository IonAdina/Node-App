const { Router } = require("express");
const router = Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create
router.post("/motocicletaPost", async (req, res) => {
  try {
    const { marca, an, idInchiriere } = req.body;
    const motocicleta = await prisma.motocicleta.create({
      data: {
        marca: marca,
        an: an,
        idInchiriere: idInchiriere,
      },
    });
    res.status(201).json(motocicleta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Read
router.get("/motocicletaGet", async (req, res) => {
  try {
    const motociclete = await prisma.motocicleta.findMany();
    res.status(200).json(motociclete);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update
router.put("/motocicletaUpdate/:id", async (req, res) => {
  try {
    const motocicletaId = req.params.id;
    const { marca, an } = req.body;
    const updatedMotocicleta = await prisma.motocicleta.update({
      where: {
        id: motocicletaId,
      },
      data: {
        marca: marca,
        an: an,
      },
    });
    res.status(200).json(updatedMotocicleta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete
router.delete("/motocicletaDelete/:id", async (req, res) => {
  try {
    const motocicletaId = req.params.id;
    await prisma.motocicleta.delete({
      where: {
        id: motocicletaId,
      },
    });
    res.status(200).json({ message: "Motocicleta deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
