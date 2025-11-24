module.exports = {
    env: {
        es6: true,
        node: true,
    },
    parserOptions: {
        ecmaVersion: "latest",     // hoặc 2022, để hỗ trợ cú pháp mới nhất
        sourceType: "module",      // 👈 Bắt buộc khi dùng import/export
    },
    extends: [
        "eslint:recommended",
        "google",
    ],
    rules: {
        "no-restricted-globals": ["error", "name", "length"],
        "prefer-arrow-callback": "error",
        "quotes": ["error", "double", { allowTemplateLiterals: true }],
    },
};
