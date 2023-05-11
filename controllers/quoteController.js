require("dotenv").config();
const axios = require("axios");
const apiKey = process.env.NINJA_KEY;
const express = require("express");
const router = express.Router();

const getQuote = async (req, res) => {
	axios
		.get("https://api.api-ninjas.com/v1/quotes?category=food", { headers: { "X-Api-Key": apiKey } })
		.then(function (response) {
			if (response.status !== 200 || !response.data) {
				return res.status(404).json("Tekkis viga!");
			}
			return res.send(response.data);
		})
		.catch(function (error) {
			console.log(error);
			return res.status(500).json("Tekkis viga!");
		});
};

router.get("/", getQuote);

module.exports = router;
