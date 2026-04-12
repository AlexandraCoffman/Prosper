"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireClerkAuth = void 0;
const express_1 = require("@clerk/express");
const requireClerkAuth = (req, res, next) => {
    const { userId } = (0, express_1.getAuth)(req);
    if (!userId) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    next();
};
exports.requireClerkAuth = requireClerkAuth;
