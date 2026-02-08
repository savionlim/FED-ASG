document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("orderHistoryContainer");
  const filter = document.getElementById("hawkerFilter");
  const clearBtn = document.getElementById("clearOrders");
  const modal = document.getElementById("orderModal");
  const modalBody = document.getElementById("modalBody");
  const closeModal = document.getElementById("closeModal");

  function generateOrderId() {
    return "ORD-" + Math.floor(Math.random() * 100000);
  }

  function getOrders() {
    return JSON.parse(localStorage.getItem("orders")) || [];
  }

  function saveOrderFromCart() {
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) return;

    const total = cart.reduce((sum, item) => sum + item.price, 0);

    const newOrder = {
      id: generateOrderId(),
      stall: "Tian Tian Chicken Rice",
      hawker: "Maxwell Food Centre",
      items: cart,
      total: total,
      status: "Completed",
      date: new Date().toISOString().split("T")[0]
    };

    const orders = getOrders();
    orders.push(newOrder);

    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.removeItem("cart");
  }

  function renderOrders(selected = "all") {
    container.innerHTML = "";
    const orders = getOrders();

    const filtered =
      selected === "all"
        ? orders
        : orders.filter(o => o.hawker === selected);

    if (filtered.length === 0) {
      container.innerHTML = "<p class='empty'>No orders found.</p>";
      return;
    }

    filtered.forEach(order => {
      const card = document.createElement("div");
      card.className = "order-card";
      card.innerHTML = `
        <h3>${order.stall}</h3>
        <p><strong>Order ID:</strong> ${order.id}</p>
        <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
        <p><strong>Status:</strong> <span class="status completed">${order.status}</span></p>
        <p><strong>Date:</strong> ${order.date}</p>
        <button class="details-btn">View Details</button>
      `;

      card.querySelector(".details-btn").onclick = () => showDetails(order);
      container.appendChild(card);
    });
  }

  function showDetails(order) {
    modalBody.innerHTML = `
      <p><strong>Order ID:</strong> ${order.id}</p>
      <ul>
        ${order.items.map(i => `<li>${i.name} - $${i.price}</li>`).join("")}
      </ul>
      <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
    `;
    modal.classList.remove("hidden");
  }

  closeModal.onclick = () => modal.classList.add("hidden");
  window.onclick = e => {
    if (e.target === modal) modal.classList.add("hidden");
  };

  clearBtn.onclick = () => {
    if (confirm("Clear all order history?")) {
      localStorage.removeItem("orders");
      renderOrders();
    }
  };

  filter.onchange = e => renderOrders(e.target.value);

  // Run once on load
  saveOrderFromCart();
  renderOrders();
});

