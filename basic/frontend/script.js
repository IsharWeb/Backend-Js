// Get current path from URL
const path = window.location.pathname;

// Hide all sections initially
document.getElementById("home").style.display = "none";
document.getElementById("port").style.display = "none";
document.getElementById("noathe").style.display = "none";

// Show section based on route
if (path === "/") {
  document.getElementById("home").style.display = "block";
} else if (path === "/port") {
  document.getElementById("port").style.display = "block";
} else if (path === "/noathe") {
  document.getElementById("noathe").style.display = "block";
}
