document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector(".product-container");

    // Fetch products from server
    fetch("/api/products")
        .then((res) => res.json())
        .then((data) => {
            container.innerHTML = ""; // Clear old content
            data.forEach((product) => {
                const card = `
                    <div class="col s12 m4">
                        <div class="card">
                            <div class="card-image">
                                <img src="${product.image}" alt="${product.title}">
                            </div>
                            <div class="card-content">
                                <span class="card-title">${product.title}</span>
                                <p>${product.description}</p>
                            </div>
                        </div>
                    </div>
                `;
                container.innerHTML += card;
            });
        })
        .catch((err) => {
            console.error("Error fetching products:", err);
            M.toast({ html: "Failed to load products!", classes: "red" });
        });

    // Click toast
    const button = document.querySelector(".btn");
    if (button) {
        button.addEventListener("click", () => {
            M.toast({ html: "Button Clicked!", classes: "rounded" });
        });
    }
});
