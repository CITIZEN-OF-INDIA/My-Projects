const form = document.getElementById('menuForm');
const totalCostElement = document.getElementById('totalCost');
const paymentSection = document.getElementById('paymentSection');
const finalMessage = document.getElementById('finalMessage');

form.addEventListener('change', updateTotal);

function updateTotal() {
  let total = 0;
  const items = form.querySelectorAll('input[type="checkbox"]:checked');
  items.forEach(item => {
    total += parseFloat(item.value);
  });
  totalCostElement.textContent = `Total: ₹${total}`;
}

function showPayment() {
  const selectedItems = form.querySelectorAll('input[type="checkbox"]:checked');
  if (selectedItems.length === 0) {
    alert("Please select at least one item to order.");
    return;
  }
  paymentSection.style.display = 'block';
}

function placeOrder(method) {
  finalMessage.textContent = `Order placed successfully using "₹{method}". Thank you!`;
}
