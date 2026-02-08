function goBack() {
  window.location.href = "../MainPage.html";
}

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

// duplicate until 15 orders
while (ordersData.length < 15) {
  const base = ordersData[ordersData.length % 6];
  ordersData.push({
    ...base,
    id: "ORD-" + (1000 + ordersData.length + 1)
  });
}

const container = document.getElementById("orderHistoryContainer");
const hawkerFilter = document.getElementById("hawkerFilter");
const statusFilter = document.getElementById("statusFilter");
const sortFilter = document.getElementById("sortFilter");

function renderOrders() {
  let list = [...ordersData];

  if (hawkerFilter.value !== "all") {
    list = list.filter(o => o.hawker === hawkerFilter.value);
  }

  if (statusFilter.value !== "all") {
    list = list.filter(o => o.status === statusFilter.value);
  }

  list.sort((a, b) =>
    sortFilter.value === "new"
      ? new Date(b.date) - new Date(a.date)
      : new Date(a.date) - new Date(b.date)
  );

  container.innerHTML = "";

  if (list.length === 0) {
    container.innerHTML = `<p class="empty">No orders found.</p>`;
    return;
  }

  list.forEach(order => {
    const card = document.createElement("div");
    card.className = "order-card";
    card.innerHTML = `
      <h3>${order.stall}</h3>
      <p><strong>Order ID:</strong> ${order.id}</p>
      <p><strong>Hawker:</strong> ${order.hawker}</p>
      <p><strong>Items:</strong> ${order.items.join(", ")}</p>
      <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
      <p><strong>Status:</strong>
        <span class="status ${order.status.toLowerCase()}">
          ${order.status}
        </span>
      </p>
      <p><strong>Date:</strong> ${order.date}</p>
    `;
    container.appendChild(card);
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

