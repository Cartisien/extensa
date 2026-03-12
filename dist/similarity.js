"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalize = normalize;
exports.cosine = cosine;
exports.dot = dot;
exports.l2 = l2;
exports.topK = topK;
function normalize(v) {
    const norm = Math.sqrt(v.reduce((s, x) => s + x * x, 0));
    if (norm === 0)
        return v.slice();
    return v.map(x => x / norm);
}
function cosine(a, b) {
    let dot = 0, na = 0, nb = 0;
    for (let i = 0; i < a.length; i++) {
        dot += a[i] * b[i];
        na += a[i] * a[i];
        nb += b[i] * b[i];
    }
    const denom = Math.sqrt(na) * Math.sqrt(nb);
    return denom === 0 ? 0 : dot / denom;
}
function dot(a, b) {
    return a.reduce((s, v, i) => s + v * b[i], 0);
}
function l2(a, b) {
    return Math.sqrt(a.reduce((s, v, i) => s + (v - b[i]) ** 2, 0));
}
function topK(query, candidates, k) {
    return candidates
        .map((c, index) => ({ index, score: cosine(query, c) }))
        .sort((a, b) => b.score - a.score)
        .slice(0, k);
}
