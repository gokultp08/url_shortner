import { Router } from "express";
import urlServices from "../services/url-services";

const router = Router();

router.post("/", urlServices.createShortUrl);

router.get("/:shortUrl", urlServices.getUrlFromShortUrl);

export default router;
