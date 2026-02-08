document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("orderHistoryContainer");
  const filter = document.getElementById("hawkerFilter");
  const clearBtn = document.getElementById("clearOrders");
  const modal = document.getElementById("orderModal");
  const modalBody = document.getElementById("modalBody");
  const closeModal = document.getElementById("closeModal");

  // -------------------------------
  // FAKE ORDER DATA (SEED ONCE)
  // -------------------------------
  const fakeOrders = [
    {
      id: "ORD-10001",
      stall: "Tian Tian Chicken Rice",
      hawker: "Maxwell Food Centre",
      items: [{ name: "Chicken Rice", price: 6.5 }],
      total: 6.5,
      status: "Completed",
      date: "2026-02-01"
    },
    {
      id: "ORD-10002",
      stall: "Satay Stall",
      hawker: "Lau Pa Sat",
      items: [{ name: "Chicken Satay (10 sticks)", price: 12 }],
      total: 12,
      status: "Completed",
      date: "2026-02-02"
    },
    {
      id: "ORD-10003",
      stall: "Roast Meat Store",
      hawker: "Chinatown Complex",
      items: [{ name: "Roast Duck Rice", price: 8 }],
      total: 8,
      status: "Completed",
      date: "2026-02-03"
    },
    {
      id: "ORD-10004",
      stall: "Laksa House",
      hawker: "Maxwell Food Centre",
      items: [{ name: "Laksa", price: 5.5 }],
      total: 5.5,
      status: "Completed",
      date: "2026-02-04"
    },
    {
      id: "ORD-10005",
      stall: "Char Kway Teow Stall",
      hawker: "Old Airport Road",
      items: [{ name: "Char Kway Teow", price: 6 }],
      total: 6,
      status: "Completed",
      date: "2026-02-05"
    },
    {
      id: "ORD-10006",
      stall: "Prata King",
      hawker: "Tekka Centre",
      items: [{ name: "Plain Prata", price: 3 }],
      total: 3,
      status: "Completed",
      date: "2026-02-06"
    },
    {
      id: "ORD-10007",
      stall: "Mee Pok Stall",
      hawker: "Chinatown Complex",
      items: [{ name: "Bak Chor Mee", price: 5 }],
      total: 5,
      status: "Completed",
      date: "2026-02-07"
    },
    {
      id: "ORD-10008",
      stall: "Nasi Lemak Stall",
      hawker: "Tekka Centre",
      items: [{ name: "Nasi Lemak", price: 4.5 }],
      total: 4.5,
      status: "Completed",
      date: "2026-02-08"
    },
    {
      id: "ORD-10009",
      stall: "Wanton Mee House",
      hawker: "Maxwell Food Centre",
      items: [{ name: "Wanton Mee", price: 5 }],
      total: 5,
      status: "Completed",
      date: "2026-02-09"
    },
    {
      id: "ORD-10010",
      stall: "Hokkien Mee Stall",
      hawker: "Old Airport Road",
      items: [{ name: "Hokkien Mee", price: 6 }],
      total: 6,
      status: "Completed",
      date: "2026-02-10"
    },
    // 5 more orders
    {
      id: "ORD-10011",
      stall: "Chicken Rice Express",
      hawker: "Lau Pa Sat",
      items: [{ name: "Chicken Rice", price: 6 }],
      total: 6,
      status: "Completed",
      date: "2026-02-11"
    },
    {
      id: "ORD-10012",
      stall: "Satay Stall",
      hawker: "Lau Pa Sat",
      items: [{ name: "Mutton Satay", price: 14 }],
      total: 14,
      status: "Completed",
      date: "2026-02-12"
    },
    {
      id: "ORD-10013",
      stall: "Laksa House",
      hawker: "Chinatown Complex",
      items: [{ name: "Laksa", price: 5.5 }],
      total: 5.5,
      status: "Completed",
      date: "2026-02-13"
    },
    {
      id: "ORD-10014",
      stall: "Prata King",
      hawker: "Tekka Centre",
      items: [{ name: "Egg Prata", price: 4 }],
      total: 4,
      status: "Completed",
      date: "2026-02-14"
    },
    {
      id: "ORD-10015",
      stall: "Char Kway Teow Stall",
      hawker: "Maxwell Food Centre",
      items: [{ name: "Char Kway Teow", price: 6 }],
      total: 6,
      status: "Completed",
      date: "2026-02-15"
    }
  ];

  // Seed data ONCE
  if (!localStorage.getItem("orders")) {
    localStorage.setItem("orders", JSON.stringify(fakeOrders));
  }

  function getOrders() {
    return JSON.parse(localStorage.getItem("orders")) || [];
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
        <p><strong>Hawker:</strong> ${order.hawker}</p>
        <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
        <p><strong>Date:</strong> ${order.date}</p>
        <button class="details-btn">View Details</button>
      `;

      card.querySelector(".details-btn").onclick = () => {
        modalBody.innerHTML = `
          <p><strong>Order ID:</strong> ${order.id}</p>
          <ul>
            ${order.items.map(i => `<li>${i.name} - $${i.price}</li>`).join("")}
          </ul>
          <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
        `;
        modal.classList.remove("hidden");
      };

      container.appendChild(card);
    });
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

  renderOrders();
});
