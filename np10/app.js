const expenses = [
  { id: 1, amount: "1200", category: "rent", date: "2024-01-05" },
  { id: 2, amount: 300, category: "food", date: "2024-01-10" },
  { id: 3, amount: "150", category: "transport", date: "2024-02-02" },
  { id: 4, amount: 800, category: "rent", date: "2024-02-05" },
  { id: 5, amount: "200", category: "food", date: "2024-02-20" },
  { id: 6, amount: 100, category: "food", date: "2024-01-25" },
  { id: 7, amount: "400", category: null, date: "2024-01-15" },
];

// console.log(new Date(expenses[0].date).getMonth());

const normalizeExpense = (expenses) => {
  return expenses.map((e) => ({
    ...e,
    amount: Number(e.amount),
    category: e.category ?? "other",
    date: new Date(e.date),
  }));
};

const filterByMonth = (expenses, monthIndex) => {
  return expenses.filter((e) => e.date.getMonth() === monthIndex);
};

const calculateTotal = (expenses) => {
  return expenses.reduce((acc, e) => acc + e.amount, 0);
};

const normalized = normalizeExpense(expenses);
const januaryExpense = filterByMonth(normalized, 0);
const totalJanuary = calculateTotal(januaryExpense);
console.log(totalJanuary);

// group and sum
const groupByCategory = (expenses) => {
  return expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {});
};
const categoryTotal = groupByCategory(normalized);
console.log(categoryTotal);

const sortByAmountDesc = (expenses) => {
  return [...expenses].sort((a, b) => b.amount - a.amount);
};

const sorted = sortByAmountDesc(normalized);
const top3 = sorted.slice(0, 3);
console.log(sorted);
console.log(top3);

const groupByMonth = (expenses) => {
  return expenses.reduce((acc, e) => {
    const key = `${e.date.getFullYear()}-${String(
      e.date.getMonth() + 1
    ).padStart(2, "0")}`;
    if (!acc[key]) {
      acc[key] = { total: 0, count: 0 };
    }
    acc[key].total = acc[key].total + e.amount;
    acc[key].count = acc[key].count + 1;
    return acc;
  }, {});
};

const monthlySummary = groupByMonth(normalized);
console.log(monthlySummary);

const updateMonthlyTotal = (summary, expense) => {
  const key = `${expense.date.getFullYear()}-${String(
    expense.date.getMonth() + 1
  ).padStart(2, "0")}`;
  if (!summary[key]) {
    summary[key] = { total: 0, count: 0 };
  }
  summary[key].total += expense.amount;
  summary[key].count += 1;
  return summary;
};

const cart = [
  { id: 1, name: "Laptop", price: 50000, qty: 2 },
  { id: 2, name: "Mouse", price: 500, qty: 2 },
];

// id: 2 --> qunatity + 1

const updatedCart = (cart, id) => {
  return cart.map((item) =>
    item.id === id ? { ...item, qty: item.qty + 1 } : item
  );
};
console.log(updatedCart(cart, 1));

// Remove a product only if qty becomes 0 after decrement.
const newCart = (cart, id) => {
  return cart
    .map((item) => {
      return item.id === id ? { ...item, qty: item.qty - 1 } : item;
    })
    .filter((item) => item.qty > 0);
};
console.log(newCart(cart, 1));

const orders = [
  { id: 1, amount: 1200, status: "delivered" },
  { id: 2, amount: 800, status: "cancelled" },
  { id: 3, amount: 1500, status: "delivered" },
  { id: 4, amount: 500, status: "pending" },
];
// Calculate revenue, but only from delivered orders.

const calculateRevenue = (orders) => {
  return orders.reduce(
    (acc, order) =>
      order.status === "delivered" ? (acc += order.amount) : acc,
    0
  );
};

console.log(calculateRevenue(orders));

const updatedOrders = orders.map((order) => ({
  ...order,
  isHighValue: order.amount > 1000 && order.status === "delivered",
}));
console.log(updatedOrders);

// “Mark users inactive if lastActive is older than 24 hours.”
let sessions = [
  { userId: 1, active: true, lastActive: 1700000000 },
  { userId: 2, active: true, lastActive: 1690000000 },
];

const updateSessions = (sessions) => {
  return sessions.map((session) => {
    return {
      ...session,
      active:
        Math.floor(Date.now() / 1000) - session.lastActive <= 24 * 60 * 60,
    };
  });
};
console.log(updateSessions(sessions));

// “Mark notification with id = 2 as read.”
let notifications = [
  { id: 1, message: "Welcome", read: false },
  { id: 2, message: "Order shipped", read: false },
];

const updatedNotifications = (notifications, id) => {
  return notifications.map((notification) => {
    return notification.id === id
      ? { ...notification, read: true }
      : notification;
  });
};
console.log(updatedNotifications(notifications, 2));

// “Add a new message without mutating existing messages.”
let messages = [{ id: 1, text: "Hi", sender: "user" }];
const updatedMessages = (messages, newMessage) => {
  return [...messages, newMessage];
};
const newMessage = { id: 2, text: "Hello", sender: "bot" };
console.log(updatedMessages(messages, newMessage));

// “Increase stock of B2 by 5.”
let inventory = [
  { sku: "A1", stock: 10 },
  { sku: "B2", stock: 0 },
];
const updatedInventory = (inventory, sku) => {
  return inventory.map((inv) =>
    inv.sku === sku ? { ...inv, stock: inv.stock + 5 } : inv
  );
};
console.log(updatedInventory(inventory, "B2"));

// “Log out all users (set online = false).”
let users = [
  { id: 1, name: "A", online: true },
  { id: 2, name: "B", online: true },
];
const logoutAll = (users) => {
  return users.map((user) => ({ ...user, online: false }));
};
console.log(logoutAll(users));

// “Mark task id = 12 as done.”
let projects = [
  {
    id: 1,
    tasks: [
      { id: 11, done: false },
      { id: 12, done: false },
    ],
  },
];

const updatedProjects = (projects, id) => {
  return projects.map((project) => {
    return {
      ...project,
      tasks: project.tasks.map((task) =>
        task.id === id ? { ...task, done: true } : task
      ),
    };
  });
};
console.log(updatedProjects(projects, 12));

// “Update city to Mumbai without mutating.”
let form = {
  name: "John",
  address: { city: "Delhi", zip: "110001" },
};

const updatedForm = (form) => {
  return {
    ...form,
    address: {
      ...form.address,
      city: "Mumbai",
    },
  };
};
console.log(updatedForm(form));

// “Toggle dark_mode.”
let flags = [{ key: "dark_mode", enabled: false }];
const ToggleDarkMode = (flags) => {
  return flags.map((flag) =>
    flag.key === "dark_mode" ? { ...flag, enabled: !flag.enabled } : flag
  );
};
console.log(ToggleDarkMode(flags));

// “Calculate monthly revenue from active subscriptions only.”
const subscriptions = [
  { user: "A", price: 500, active: true },
  { user: "B", price: 300, active: false },
  { user: "C", price: 300, active: true },
];

const monthlyRevenue = (subscriptions) => {
  return subscriptions.reduce(
    (acc, sub) => (sub.active ? (acc += sub.price) : acc),
    0
  );
};
console.log(monthlyRevenue(subscriptions));

// “Add 10% bonus only for eligible employees.”
const employees = [
  { id: 1, salary: 50000, bonusEligible: true },
  { id: 2, salary: 40000, bonusEligible: false },
];

const updatedEmployees = (employees, bonus) => {
  return employees.map((emp) =>
    emp.bonusEligible
      ? {
          ...emp,
          salary: emp.salary + (emp.salary / 100) * bonus,
        }
      : emp
  );
};
console.log(updatedEmployees(employees, 10));

// “Apply 5% discount only if total cart value > 20,000.”
const cartItems = [
  { product: "Phone", price: 20000, qty: 1 },
  { product: "Case", price: 500, qty: 2 },
];

const applyDiscount = (cart, discount) => {
  const total = cart.reduce((acc, item) => (acc += item.price * item.qty), 0);
  if (total > 20000) {
    return total - (total / 100) * discount;
  }
  return total;
};
console.log(applyDiscount(cartItems, 5));

// “Calculate account balance.”
const transactions = [
  { id: 1, amount: 5000, type: "credit" },
  { id: 2, amount: 2000, type: "debit" },
];

const calculateBalance = (transactions) => {
  return transactions.reduce((acc, transaction) => {
    return transaction.type === "credit"
      ? acc + transaction.amount
      : acc - transaction.amount;
  }, 0);
};
console.log(calculateBalance(transactions));

// “Assign pass or fail based on marks ≥ 50.”
const students = [
  { name: "A", marks: 85 },
  { name: "B", marks: 45 },
];
const updatedStudentsInfo = (students, minMark) => {
  return students.map((student) => ({ ...student, passed: student.marks >= minMark }));
};
console.log(updatedStudentsInfo(students,50));
