/* ROUTE CONTROL */
let routingControl = null;

/* MENU TOGGLE */
const menuBtn = document.getElementById("menu-btn");
const popupNav = document.getElementById("popup-nav");
const overlay = document.getElementById("overlay");

menuBtn.addEventListener("click", () => {
  popupNav.classList.toggle("show");
  overlay.classList.toggle("active");
});
overlay.addEventListener("click", () => {
  popupNav.classList.remove("show");
  overlay.classList.remove("active");
});

/* MAP INIT */
const map = L.map("map", { zoomControl: false }).setView([15.355, 121.0], 13);
L.control.zoom({ position: "topright" }).addTo(map);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

/* TOURIST LOCATIONS */
const locations = [
  { 
    name: "Municipal Hall",
    lat: 15.36529,
    lng: 121.01422,
    description: "   The Peñaranda Municipal Hall is the main government building of \n Peñaranda, a municipality in Nueva Ecija, Central Luzon, Philippines. Located in Barangay Sinasajan, In front of the building stands a historical marker that summarizes the town’s origins, including its former name (Mapisong) and its naming after José María Peñaranda, a Spanish civil engineer.",
    image: "../1Images/minicipalhall.JPG"
  },
  { 
    name: "Peñaranda Arc",
    lat: 15.35402,
    lng: 120.98146,
    description: "The Peñaranda Arch is a welcome landmark located at the entrance of Peñaranda, Nueva Ecija. It serves as a gateway to the town, featuring the name “PEÑARANDA” prominently across the structure along with the municipal seal. The arch marks the boundary of the municipality and symbolizes the town’s heritage, which traces back to its original name, Mapisong..",
    image: "../1Images/penarandaarc.jpg"
  },
  { 
    name: "Peñaranda Irrigation",
    lat: 15.34847,
    lng: 121.00990,
    description: "The Peñaranda Irrigation System (Penris) is a major historic irrigation infrastructure in Peñaranda, Nueva Ecija. Built between 1925 and 1930, it helps irrigate thousands of hectares of farmland in the region..",
    image: "../1Images/irrigation.jpg"
  },
  { 
    name: "Saint Francis Church",
    lat: 15.35370,
    lng: 121.00218,
    description: "St. Francis of Assisi Parish is a historic Catholic church in Peñaranda, Nueva Ecija. Founded in 1853 and completed in 1889, it features Baroque architecture and serves as one of the town’s most important religious and cultural landmarks..",
    image: "../1Images/church.jpg"
  },
  { 
    name: "One Bella Food Park",
    lat: 15.35642,
    lng: 120.98493,
    description: "One Bella Food Park is located at Gapan Fort Magsaysay, Road Corner Street, Peñaranda, Nueva Ecija where it  offers a wide variety of dishes in a spacious open-air setting, making it an ideal spot for relaxed family dinners. You can explore plenty of Instagram-worthy photo areas while the kids enjoy their time at the playground, creating a fun and memorable experience for everyone.",
    image: "../1Images/foodpark.jpg"
  },
  { 
    name: "Razon Farm and Resort",
    lat: 15.37313,
    lng: 121.00276,
    description: "Razon Farm and Resort is located at LIWASAN Opposite Barangay Hall, Peñaranda, Nueva Ecija where it offers a relaxing countryside escape featuring refreshing pools, cozy cottages, and spacious outdoor areas perfect for family outings and group gatherings. Surrounded by greenery and fresh air, the resort provides a peaceful environment with amenities for swimming, picnics, events, and leisure activities—an ideal destination for guests looking to unwind and enjoy nature.",
    image: "../1Images/razon.jpg"
  },
  { 
    name: "Kristine Rica Resort",
    lat: 15.37032,
    lng: 121.01420,
    description: "Kristine Rica Resort is located at Sinisajan, Peñaranda, Nueva Ecija it is a family-friendly destination featuring refreshing swimming pools, comfortable cottages, and spacious areas for relaxation and gatherings. It offers a laid-back atmosphere perfect for day trips, celebrations, and weekend getaways, giving guests a relaxing place to swim, unwind, and enjoy quality time with loved ones.",
    image: "../1Images/kristinerica.jpg"
  },
  { 
    name: "D' Mariner's Resort",
    lat: 15.34289,
    lng: 121.01048,
    description: "D Mariners Resort is located at Barangay San Josef, Lacuna St, Peñaranda, Nueva Ecija, where it brings a coastal-inspired getaway to guests with its inviting pools, breezy open spaces, and relaxing atmosphere. Designed for both fun and leisure, the resort offers spots perfect for swimming and casual gatherings. Whether you’re visiting for a quick dip or a full day of unwinding, D Mariners Resort delivers a refreshing escape with a touch of seaside charm.",
    image: "../1Images/mariners.jpg"
  },
  { 
    name: "Jerry De Alicia Farm & Resort",
    lat: 15.36561,
    lng: 120.99814,
    description: "Jerry de Alicia Resort is located at Las Piñas, Peñaranda, Nueva Ecija, where it offers a welcoming retreat with its clean, well-kept pools, spacious lounging areas, and family-friendly ambiance. Known for its relaxed provincial charm, the resort provides an ideal setting for casual celebrations, weekend bonding, and refreshing day trips. With its peaceful surroundings and comfortable amenities, Jerry de Alicia Resort gives guests a simple yet memorable place to unwind and enjoy.",
    image: "../1Images/jerry.jpg"
  },
   { 
    name: "Victoria's Events Place and Resort",
    lat: 15.33551,
    lng: 121.01834,
    description: "Victoria Events is located at Barangay Callos, Peñaranda, Nueva Ecija Place is a small yet charming venue ideal for intimate gatherings and special celebrations. With its clean, well-arranged space and welcoming atmosphere, it’s a great choice for birthdays, meetings, and family events. Despite its size, the venue offers a comfortable and pleasant setting that makes every occasion feel special.",
    image: "../1Images/victoria.jpg"
  },
  { 
    name: "Villa Nitashlie Private Resort",
    lat: 15.33762,
    lng: 121.00678,
    description: "Villa Natashlie is located at Sitio Sto. Nino, Penaranda, Nueva Ecija, it is a small, cozy resort ideal for private gatherings and intimate celebrations. With its peaceful atmosphere, inviting pool, and exclusive setting, it offers a comfortable space for families and friends to relax, celebrate, and enjoy quality time together.",
    image: "../1Images/villanatashlie.jpg"
  },
  { 
    name: "Terraza Del Rio Private Resort & Events Place",
    lat: 15.33805,
    lng: 121.01705,
    description: "Events Place located at Barangay Callos, Peñaranda, Nueva Ecija, It is a peaceful riverside venue ideal for family getaways, celebrations, and special events. The resort offers private pools, cozy accommodations, and spacious event areas.",
    image: "../1Images/teraza.jpg"
  },
];

/* ICONS */
const circleIcon = L.divIcon({ className: "blue-circle", iconSize:[24,24] });
const bluePin = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25,41], iconAnchor:[12,41], popupAnchor:[1,-34]
});

/* SIDE PANEL */
const sidePanel = document.getElementById("side-panel");
const panelContent = document.getElementById("panel-content");
const closeBtn = sidePanel.querySelector(".close-btn");
closeBtn.addEventListener("click", () => {
  sidePanel.classList.remove("show");

  // Alisin ang route kung meron
  if (routingControl) {
    map.removeControl(routingControl);
    routingControl = null; // reset para puwede ulit gumawa ng bagong route
  }
});
/* USER LOCATION TRACKING */
let userMarker = null;
let accuracyCircle = null;
let firstUpdate = true;

const glowingIcon = L.divIcon({ className: "glow-marker", iconSize:[20,20] });

if (navigator.geolocation) {
  navigator.geolocation.watchPosition(
    (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      const accuracy = pos.coords.accuracy;

      const newLatLng = [lat, lng];

      if (!userMarker) userMarker = L.marker(newLatLng, { icon: glowingIcon }).addTo(map);
      else userMarker.setLatLng(newLatLng);

      if (!accuracyCircle) {
        accuracyCircle = L.circle(newLatLng, {
          radius: accuracy, color: "#1e90ff",
          fillColor: "#1e90ff", fillOpacity: 0.3
        }).addTo(map);
      } else {
        accuracyCircle.setLatLng(newLatLng);
        accuracyCircle.setRadius(accuracy);
      }

      if (firstUpdate) {
        map.setView(newLatLng, 16);
        firstUpdate = false;
      }
    },
    () => alert("Unable to access your location."),
    { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
  );
} else {
  alert("Geolocation not supported.");
}

/* CREATE ROUTE FUNCTION */
function createRoute(toLatLng) {
  if (!userMarker) {
    alert("User location not yet determined!");
    return;
  }

  if (routingControl) {
    map.removeControl(routingControl);
  }

  routingControl = L.Routing.control({
    waypoints: [
      userMarker.getLatLng(),
      L.latLng(toLatLng.lat, toLatLng.lng)
    ],
    lineOptions: {
      styles: [{ color: 'red', opacity: 0.9, weight: 5 }]
    },
    createMarker: function(i, wp) {
      return L.marker(wp.latLng);
    },
    routeWhileDragging: false,
    draggableWaypoints: false,
    addWaypoints: false
  }).addTo(map);
}

/* TOURIST MARKERS WITH PANEL & ROUTE */
locations.forEach((loc) => {
  let isPin = false;
  let marker = L.marker([loc.lat, loc.lng], { icon: circleIcon }).addTo(map);
  marker.bindTooltip(loc.name, { direction: "top", opacity: 0.8 });

  function handleClick() {
    const el = marker.getElement();
    if (!el) return;
    el.classList.add("shrink");

    setTimeout(() => {
      map.removeLayer(marker);

      marker = L.marker([loc.lat, loc.lng], { icon: isPin ? circleIcon : bluePin }).addTo(map);
      isPin = !isPin;

      marker.on("click", handleClick);

      // IMAGE + description
      panelContent.innerHTML = `
        <h2 style="font-size:30px; font-weight:bold;">${loc.name}</h2>
        <img src="${loc.image}" alt="${loc.name}">
        <p style="font-size:20px">${loc.description}</p>
      `;

      sidePanel.classList.add("show");

      // CREATE ROUTE
      createRoute({ lat: loc.lat, lng: loc.lng });
    }, 300);
  }

  marker.on("click", handleClick);
});

/* SEARCH BAR FUNCTIONALITY */
const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase().trim();
  searchResults.innerHTML = "";

  if (!query) {
    searchResults.style.display = "none";
    return;
  }

  const matches = locations.filter((loc) =>
    loc.name.toLowerCase().includes(query)
  );

  if (matches.length === 0) {
    searchResults.style.display = "none";
    return;
  }

  searchResults.style.display = "block";

  matches.forEach((loc) => {
    const resultItem = document.createElement("div");
    resultItem.textContent = loc.name;

    resultItem.addEventListener("click", () => {
      map.setView([loc.lat, loc.lng], 17);

      panelContent.innerHTML = `
        <h2 style="font-size:30px; font-weight:bold;">${loc.name}</h2>
        <img src="${loc.image}" alt="${loc.name}">
        <p style="font-size:20px">${loc.description}</p>
      `;
      sidePanel.classList.add("show");

      searchResults.style.display = "none";
      searchInput.value = "";

      // CREATE ROUTE
      createRoute({ lat: loc.lat, lng: loc.lng });
    });

    searchResults.appendChild(resultItem);
  });
});

// Hide search results when clicking outside
document.addEventListener("click", (e) => {
  const searchContainer = document.getElementById("search-container");
  if (!searchContainer.contains(e.target)) {
    searchResults.style.display = "none";
  }
});
