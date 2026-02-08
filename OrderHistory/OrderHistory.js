const ordersData = [
  {
    id: "ORD-1001",
    hawker: "Maxwell Food Centre",
    stall: "Tian Tian Chicken Rice",
    items: ["Chicken Rice"],
    total: 6.5,
    status: "Completed",
    date: "2026-01-30"
  },
  {
    id: "ORD-1002",
    hawker: "Lau Pa Sat",
    stall: "Satay Stall",
    items: ["Chicken Satay", "Mutton Satay"],
    total: 12,
    status: "Completed",
    date: "2026-02-01"
  },
  {
    id: "ORD-1003",
    hawker: "Chinatown Complex",
    stall: "Roast Meat Store",
    items: ["Roast Pork Rice"],
    total: 8,
    status: "Preparing",
    date: "2026-02-02"
  },
  {
    id: "ORD-1004",
    hawker: "Tekka Centre",
    stall: "Indian Muslim Food",
    items: ["Nasi Briyani"],
    total: 7,
    status: "Completed",
    date: "2026-02-03"
  },
  {
    id: "ORD-1005",
    hawker: "Old Airport Road",
    stall: "Char Kway Teow Stall",
    items: ["Char Kway Teow"],
    total: 5.5,
    status: "Completed",
    date: "2026-02-04"
  },
  {
    id: "ORD-1006",
    hawker: "Tiong Bahru Market",
    stall: "Laksa Stall",
    items: ["Laksa"],
    total: 6,
    status: "Preparing",
    date: "2026-02-05"
  }
];

// duplicate to reach 15
while (ordersData.length < 15) {
  ordersData.push({ ...ordersData[ordersData.length % 6], id: "ORD-" + (1000 + ordersData.length + 1) });
}

const container = document.getElementById("orderHistoryContainer");
const hawkerFilter = document.getElementById("hawkerFilter");
const statusFilter = document.getElementById("statusFilter");
const sortFilter = document.getElementById("sortFilter");

function renderOrders() {
  let filtered = [...ordersData];

  if (hawkerFilter.value !== "all") {
    filtered = filtered.filter(o => o.hawker === hawkerFilter.value);
  }

  if (statusFilter.value !== "all") {
    filtered = filtered.filter(o => o.status === statusFilter.value);
  }

  filtered.sort((a, b) =>
    sortFilter.value === "new"
      ? new Date(b.date) - new Date(a.date)
      : new Date(a.date) - new Date(b.date)
  );

  container.innerHTML = "";

  if (filtered.length === 0) {
    container.innerHTML = `<p class="empty">No orders found.</p>`;
    return;
  }

  filtered.forEach(order => {
    const div = document.createElement("div");
    div.className = "order-card";
    div.innerHTML = `
      <h3>${order.stall}</h3>
      <p><strong>Order ID:</strong> ${order.id}</p>
      <p><strong>Hawker:</strong> ${order.hawker}</p>
      <div class="items"><strong>Items:</strong> ${order.items.join(", ")}</div>
      <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
      <p><strong>Status:</strong>
        <span class="status ${order.status.toLowerCase()}">${order.status}</span>
      </p>
      <p><strong>Date:</strong> ${order.date}</p>
    `;
    container.appendChild(div);
  });
}

hawkerFilter.onchange = renderOrders;
statusFilter.onchange = renderOrders;
sortFilter.onchange = renderOrders;

document.getElementById("clearOrders").onclick = () => {
  if (confirm("Clear all order history?")) {
    ordersData.length = 0;
    renderOrders();
  }
};

renderOrders();
