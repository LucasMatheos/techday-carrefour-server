"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
exports.routes = express_1.default.Router();
exports.routes.get("/postalcode", async (req, res) => {
    const postalCode = req.query.postalCode;
    const postalCodeEndPoint = `https://mercado.carrefour.com.br/api/checkout/pub/regions?country=BRA&postalCode=${postalCode}`;
    try {
        const nearbySeller = await axios_1.default.get(postalCodeEndPoint);
        const nearbySellerData = nearbySeller.data;
        return res.status(201).json(nearbySellerData);
    }
    catch (err) {
        res.status(404).send({ error: "Postal code not found" });
    }
});
exports.routes.get("/products", async (req, res) => {
    const sellerName = req.query.sellerName;
    const productsEndpoint = `https://mercado.carrefour.com.br/api/catalog_system/pub/products/search?fq=${sellerName}`;
    try {
        const products = await axios_1.default.get(productsEndpoint);
        const productsData = products.data;
        return res.status(201).json(productsData);
    }
    catch (err) {
        res.status(404).send({ error: "Seller name not found" });
    }
});
//http://localhost:3333/postalcode?postalCode=53130540
//https://localhost:3333/postalcode?postalCode=55555555
