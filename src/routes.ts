import express from "express";
import axios from "axios";

export const routes = express.Router();

routes.get("/postalcode", async (req, res) => {
  const postalCode = req.query.postalCode;
  const postalCodeEndPoint = `https://mercado.carrefour.com.br/api/checkout/pub/regions?country=BRA&postalCode=${postalCode}`;

  try {
    const nearbySeller = await axios.get(postalCodeEndPoint);
    const nearbySellerData = nearbySeller.data;

    return res.status(201).json(nearbySellerData);
  } catch (err) {
    res.status(404).send({ error: "Postal code not found" });
  }
});

routes.get("/products", async (req, res) => {
  const sellerName = req.query.sellerName;
  const productsEndpoint = `https://mercado.carrefour.com.br/api/catalog_system/pub/products/search?fq=${sellerName}`;

  try {
    const products = await axios.get(productsEndpoint);
    const productsData = products.data;

    return res.status(201).json(productsData);
  } catch (err) {
    res.status(404).send({ error: "Seller name not found" });
  }
});


//http://localhost:3333/postalcode?postalCode=53130540
//https://localhost:3333/postalcode?postalCode=55555555