export function addToCartLocal(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // check if product already exists
    const existing = cart.find(item => item._id === product._id);

    if (existing) {
        existing.qty += 1;      // quantity increase
    } else {
        cart.push({ ...product, qty: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
}
