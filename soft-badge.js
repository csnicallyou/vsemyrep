let badgeBackgroundColor = "#ff00ff"; // начальный цвет
let badgeTextColor = "#000";

function updateBadgeColor(newColor) {
    badgeBackgroundColor = newColor;
    badgeTextColor = newColor === "#000000" ? "#fff" : "#000";
    const badge = document.querySelector("#women-web > div");
    const webringLinks = document.querySelectorAll("#women-web a, #women-web span");
    if (badge) {
        badge.style.backgroundColor = badgeBackgroundColor;
        badge.style.color = badgeTextColor;
    }
    webringLinks.forEach(link => {
        if (link.style) {
            link.style.backgroundColor = badgeBackgroundColor;
            link.style.color = badgeTextColor;
        }
    });
}


(function() {
  const badge = document.createElement("div");
    badge.setAttribute("style", `font-family: monospace;font-size:12px;color:${badgeTextColor};background-color:${badgeBackgroundColor};display:inline-block;padding:0;margin:0;border:0;`);
  const link = document.createElement("a");
  link.href = "https://womenoftheinternet.neocities.org/";
  link.target = "_blank";
    link.setAttribute("style", "text-decoration:none;color:#000;font-family:monospace;");
  link.innerHTML = "women of the internet webring";
  badge.appendChild(link);
    const spacer = document.createElement("span");
     spacer.innerHTML = " &#9734 "
    spacer.setAttribute("style", "font-family:monospace;color:#000;");
      badge.appendChild(spacer);
  const badgeList = document.getElementById("women-web");
    badgeList.appendChild(badge);
})();