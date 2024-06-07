const token = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const { Router } = require("express");
const router = Router();
const prisma = new PrismaClient();
const maxAge = 3 * 24 * 3600 * 1000;
const jwt = (id) => {
  return token.sign({ id }, "secret", {
    expiresIn: maxAge,
  });
};
const { autentif } = require("../middleware/middleware");

//CREARE
router.post("/clientPost", async (req, res) => {
  try {
    const nume = req.body.nume;
    const CNP = req.body.CNP;
    const client = await prisma.client.create({
      data: {
        nume: nume,
        CNP: CNP,
      },
    });
    if (client !== undefined) {
      const jwtt = jwt(client.id);
      res.cookie("jwt", jwtt, { httpOnly: true, maxAge: 3 * 24 * 3600 * 1000 });
      res.status(201).json({ adina: "ok" });
    }
  } catch (err) {
    console.log(err);
  }
});

//READ
router.get("/clientGet", autentif, async (req, res) => {
  try {
    const clients = await prisma.client.findMany();
    res.status(200).json(clients);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//UPDATE
router.put("/clientPut/:id", async (req, res) => {
  try {
    const clientId = req.params.id;
    const { nume, CNP } = req.body;

    // Verifică dacă clientul există
    const existingClient = await prisma.client.findUnique({
      where: {
        id: clientId,
      },
    });

    // Dacă clientul nu există, returnează un mesaj de eroare
    if (!existingClient) {
      return res.status(404).json({ error: "Client not found" });
    }

    // Actualizează datele clientului
    const updatedClient = await prisma.client.update({
      where: {
        id: clientId,
      },
      data: {
        nume: nume,
        CNP: CNP,
      },
    });

    // Returnează răspunsul cu clientul actualizat
    res.status(200).json(updatedClient);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//DELETE
router.delete("/client/:id", async (req, res) => {
  try {
    const clientId = req.params.id;

    const client = await prisma.client.findUnique({
      where: {
        id: clientId,
      },
    });

    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }

    await prisma.client.delete({
      where: {
        id: clientId,
      },
    });

    res.status(200).json({ message: "Client deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
