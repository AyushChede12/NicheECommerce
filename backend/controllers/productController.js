const Product = require("../models/product");

//get All products
exports.getAllProducts = async (req, res) => {
    try {
        const { q, category, min, max } = req.query;
        let filter = {};

        if (q) {
            filter.name = { $regex: q, $options: "i" };
        }

        if (category) {
            filter.category = category;
        }

        if (min || max) {
            filter.price = {};
            if (min) filter.price.$gte = Number(min);
            if (max) filter.price.$lte = Number(max);
        }

        const products = await Product.find(filter);
        res.json(products);

    } catch (err) {
        res.status(500).json({ message: "Error Fetching Products", err });
    }
};


// Create Product
exports.createProducts = async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body;

        const images = req.files ? req.files.map(file => file.filename) : [];

        const prod = new Product({
            name,
            description,
            price,
            category,
            stock,
            images
        });

        const newProd = await prod.save();

        res.status(201).json({
            message: "Product Created Successfully",
            product: newProd
        });
    } catch (err) {
        res.status(500).json({ message: "Error Creating Product", err });
    }
};

// Get Product By ID
exports.getProductsById = async (req, res) => {
    try {
        const pro = await Product.findById(req.params.id);
        if (!pro) return res.status(404).json({ message: "Product Not Found" });

        res.json(pro);
    } catch (err) {
        res.status(500).json({ message: "Error Fetching Data", err });
    }
};

// Update Product
exports.updateProduct = async (req, res) => {
    try {
        const images = req.files ? req.files.map(f => f.filename) : [];

        const updateData = { ...req.body };

        if (images.length > 0) {
            updateData.images = images;
        }

        const prod = await Product.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        if (!prod) return res.status(404).json({ message: "Product Not Found" });

        res.json(prod);
    } catch (err) {
        res.status(500).json({ message: "Error Updating Product", err });
    }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
    try {
        const deleted = await Product.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Product Not Found" });

        res.json({ message: "Product Deleted Successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error Deleting Product", err });
    }
};
